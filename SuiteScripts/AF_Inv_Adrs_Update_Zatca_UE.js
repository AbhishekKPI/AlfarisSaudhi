/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope SameAccount

* Module Description
* Deployment for Custom Record :  SalesOrder  
* Includes bdobeforeLoadAction,bdoBeforeSubmitAction, bdoAfterSubmitAction
*
* Version    Date            Author        Remarks
* 2.0.0      10 Nov 2020     Swalih        Created for  SalesOrder

*/
define(['N/record', 'N/search', 'N/format', 'N/task', 'N/ui/serverWidget', 'N/redirect', 'N/runtime', 'N/error', 'N/log', 'N/url'],
    function (record, search, format, task, serverWidget, redirect, runtime, error, log, url) {
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */


        function beforeLoadAction(scriptContext) {

        }




        function beforeSubmitAction(scriptContext) {
            try {

                var currentRecord = scriptContext.newRecord;
                var recId = currentRecord.id;

                if (scriptContext.type == "create" || scriptContext.type == "edit") {
                    var aprrovalStatus = currentRecord.getValue({
                        fieldId: "approvalstatus"
                    })
                    if (aprrovalStatus == 1) {
                        currentRecord.setValue({
                            fieldId: "custbody_psg_ei_template",
                            value: ""
                        })
                        currentRecord.setValue({
                            fieldId: "custbody_psg_ei_sending_method",
                            value: ""
                        })
                    }

                    currentRecord.setValue({
                        fieldId: "custbody_ksa_supply_date",
                        value: currentRecord.getValue("trandate")
                    })
                    currentRecord.setValue({
                        fieldId: "custbody_ksa_payment_means_type_code",
                        value: 3
                    })


                    var custRecId = currentRecord.getValue({
                        fieldId: "entity"
                    })
                    log.debug("custRecId", custRecId);


                    var custRec = record.load({
                        type: "customer",
                        id: custRecId,
                        isDynamic: false
                    });

                    var isperson = custRec.getValue({
                        fieldId: "isperson"
                    })
                    log.debug("isperson", isperson);

                    if (isperson == "T") {
                        currentRecord.setValue({
                            fieldId: "custbody_ksa_subtype",
                            value: 2
                        })
                    } else {
                        currentRecord.setValue({
                            fieldId: "custbody_ksa_subtype",
                            value: 1
                        })
                    }





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
                        currentRecord.setValue({
                            fieldId: "billaddresslist",
                            value: defaultBillingId
                        });
                    }
                    if (defaultShipping) {
                        currentRecord.setValue({
                            fieldId: "shipaddresslist",
                            value: defaultShippingId
                        })
                    }
                }
            } catch (e) {
                log.error('error', e.toString());
            }
        }


        function afterSubmitAction(scriptContext) {

        }
        return {
            beforeLoad: beforeLoadAction,
            beforeSubmit: beforeSubmitAction,

        };
    });