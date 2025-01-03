/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/format', 'N/log', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{format} format
 * @param{log} log
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (format, log, record, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            log.debug("inside function------");

            try {

                var invoiceSearchObj = search.create({
                    type: "customer",
                    filters:
                        [

                            ["stage", "anyof", "CUSTOMER"],
                            "AND",
                            ["internalid", "noneof", "22705", "20017", "20488", "21004", "19979", "21625", "404282", "485826", "456364", "16774", "17215", "430745", "350590", "317217", "290629", "23084", "22997","992"],
                            "AND",
                            ["hasduplicates", "is", "F"],
                            "AND",
                            ["contact.internalidnumber", "isnotempty", ""],
                            "AND",
                            ["contact.email", "isnotempty", ""]
                        ],
                    columns:
                        [
                            search.createColumn({ name: "internalid", label: "Internal ID",  })
                        ]
                });

                var totalUpdates = 0;
                var loopDone = 0;
                var searchResultCount = invoiceSearchObj.runPaged().count;
                log.debug("invoiceSearchObj result count", searchResultCount);
                invoiceSearchObj.run().each(function (result) {

                    var custRecId = result.getValue({
                        name: "internalid",
                        label: "Internal ID",
                        
                    })
                    log.debug("custRecId", custRecId)

                    var custRec = record.load({
                        type: "customer",
                        id: custRecId,
                        isDynamic: false
                    });


                    var compName = custRec.getValue("companyname")
                    var vatRegNo = custRec.getValue("vatregnumber")

                    custRec.setValue({
                        fieldId: "custentity_psg_ei_entity_edoc_standard",
                        value: 2
                    })
                    custRec.setValue({
                        fieldId: "custentity_edoc_gen_trans_pdf",
                        value: true
                    })
                    custRec.setValue({
                        fieldId: "custentity_psg_ei_auto_select_temp_sm",
                        value: true
                    })

                    custRec.setValue({
                        fieldId: "custentity_ksa_arabic_entity_name",
                        value: compName
                    })

                    custRec.setValue({
                        fieldId: "custentity_ksa_buyerid",
                        value: vatRegNo
                    })
                    custRec.setValue({
                        fieldId: "custentity_ksa_customer_schemeid",
                        value: 2
                    })
                    custRec.setValue({
                        fieldId: "custentity_ksa_invoice_pdf_template",
                        value: 160
                    })




                    var addrLineCount = custRec.getLineCount({
                        sublistId: "addressbook"

                    });
                    log.debug("addrLineCount", addrLineCount);
                    if (addrLineCount > 0) {

                        for (var c = 0; c < addrLineCount; c++) {

                            var defaultBilling = custRec.getSublistValue({
                                sublistId: 'addressbook',
                                fieldId: 'defaultbilling',
                                line: c

                            });


                            var defaultShipping = custRec.getSublistValue({
                                sublistId: 'addressbook',
                                fieldId: 'defaultshipping',
                                line: c

                            });

                            if (defaultBilling == true) {
                                var defaultBillingId = custRec.getSublistValue({
                                    sublistId: 'addressbook',
                                    fieldId: 'id',
                                    line: c
                                });


                                var addrRec = custRec.getSublistSubrecord({
                                    sublistId: 'addressbook',
                                    fieldId: 'addressbookaddress',
                                    line: c

                                });


                                var billingAddress = addrRec.getValue({
                                    fieldId: 'addrtext'
                                });


                                custRec.setValue({
                                    fieldId: "custentity_ksa_arabic_bill_address",
                                    value: billingAddress
                                });


                            }

                            if (defaultShipping == true) {
                                var defaultShippingId = custRec.getSublistValue({
                                    sublistId: 'addressbook',
                                    fieldId: 'id',
                                    line: c
                                });

                                var addrRec = custRec.getSublistSubrecord({
                                    sublistId: 'addressbook',
                                    fieldId: 'addressbookaddress',
                                    line: c

                                });
                                var shippingAddress = addrRec.getValue({
                                    fieldId: 'addrtext'
                                });


                                custRec.setValue({
                                    fieldId: "custentity_ksa_arabic_shipping_address",
                                    value: shippingAddress
                                })

                            }

                        }
                    }



                    var contactSublist = custRec.getLineCount({
                        sublistId: "recmachcustrecord_psg_ei_email_recipient_cust"
                    });
                    log.debug("contactSublist", contactSublist)


                    var contactRecId = custRec.getSublistValue({
                        sublistId: 'contactroles',
                        fieldId: 'contact',
                        line: 0
                    });
                    log.debug("contactRecId", contactRecId)

                    // if (contactRecId) {
                    //     var fieldLookUp = search.lookupFields({
                    //         type: "contact",
                    //         id: contactRecId,
                    //         columns: ['email']
                    //     });

                    //     var emailAdd = fieldLookUp["email"];
                    //     log.debug("emailAdd", emailAdd)

                    // }
                    if (contactRecId) {
                        custRec.setSublistValue({
                            sublistId: 'recmachcustrecord_psg_ei_email_recipient_cust',
                            fieldId: 'custrecord_psg_ei_email_recipient_cont',
                            line: 0,
                            value: contactRecId
                        });
                    }

                    loopDone = loopDone + 1;
                    log.debug("loopDone", loopDone)

                    if (contactRecId) {

                        custRec.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        });
                        totalUpdates = totalUpdates + 1;
                        log.debug("Total Customer Updated is ", totalUpdates)

                    }
                    // .run().each has a limit of 4,000 results
                    return true;
                });

            } catch (e) {
                log.debug('error', e.toString());

            }
        }

        return { execute }

    });
