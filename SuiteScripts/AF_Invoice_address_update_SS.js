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
                    type: "invoice",
                    filters:
                        [

                            ["internalid", "anyof", "670373"],
                            "AND",
                            ["mainline", "is", "T"],
                        ],
                    columns:
                        [
                            search.createColumn({ name: "internalid", label: "Internal ID" }),
                            search.createColumn({
                                name: "internalid",
                                join: "customerMain",
                                label: "Internal ID"
                            })
                        ]
                });
                var searchResultCount = invoiceSearchObj.runPaged().count;
                log.debug("invoiceSearchObj result count", searchResultCount);
                invoiceSearchObj.run().each(function (result) {

                    var invRecId = result.getValue({
                        name: "internalid",
                    })
                    var custRecId = result.getValue({
                        name: "internalid",
                        join: "customerMain",
                        label: "Internal ID"
                    })

                    var custRec = record.load({
                        type: "customer",
                        id: custRecId,
                        isDynamic: false
                    });
                    var invRec = record.load({
                        type: "invoice",
                        id: invRecId,
                        isDynamic: false
                    });


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
                            log.debug("defaultBilling", defaultBilling);

                            var defaultShipping = custRec.getSublistValue({
                                sublistId: 'addressbook',
                                fieldId: 'defaultshipping',
                                line: c

                            });

                            log.debug("defaultShipping", defaultShipping);

                            if (defaultBilling == true) {
                                var defaultBillingId = custRec.getSublistValue({
                                    sublistId: 'addressbook',
                                    fieldId: 'id',
                                    line: c
                                });
                                log.debug("defaultBillingId", defaultBillingId);

                            }

                            if (defaultShipping == true) {
                                var defaultShippingId = custRec.getSublistValue({
                                    sublistId: 'addressbook',
                                    fieldId: 'id',
                                    line: c
                                });
                                log.debug("defaultShippingId", defaultShippingId);
                            }
                            

                        }
                    }

                    if (defaultBilling) {
                        invRec.setValue({
                            fieldId: "billaddresslist",
                            value: defaultBillingId
                        });
                    }
                    if (defaultShipping) {
                        invRec.setValue({
                            fieldId: "shipaddresslist",
                            value: defaultShippingId
                        })
                    }
                    invRec.save();


                    // .run().each has a limit of 4,000 results
                    return true;
                });


            } catch (e) {
                log.debug('error', e.toString());

            }
        }

        return { execute }

    });
