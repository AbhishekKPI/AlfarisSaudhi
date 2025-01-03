/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * 
 * Deployment for  Cheques
 * Includes printbeforeLoad
 *
 * Version    Date            Author        Remarks
 * 2.0.0      08 Mar 2021     priyesh       Created for print
 */
define(['N/record', 'N/ui/serverWidget', 'N/log', 'N/search', 'N/redirect', 'N/url', 'N/format', 'N/runtime', 'N/currentRecord', 'N/task'],
    function (record, serverWidget, log, search, redirect, url, format, runtime, currentRecord, task) {
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         * 
         **/

        function printbeforeLoad(scriptContext) {
            var recid = scriptContext.newRecord.id;
            var currentRecord = scriptContext.newRecord
            var ssID = 2396; //custom_print_invoice_suitelet ----- 382 in old acc
            var ssIDLH = 2398; //custom_print_invoice_suitelet_LH ---- 451 in old acc

            if (scriptContext.type == 'copy') {
                currentRecord.setValue({
                    fieldId: "custbody_af_new_invoice_ref",
                    value: ""
                })
            }








            if (scriptContext.type == "view") {

                var invoiceRec = record.load({
                    type: 'invoice',
                    id: recid,
                    isDynamic: true,
                });
                var customform = invoiceRec.getValue({
                    fieldId: 'customform'
                });
                var subsidiary = currentRecord.getValue({
                    fieldId: 'subsidiary',
                });
                var location = currentRecord.getValue({
                    fieldId: 'location',
                });
                var appStatus = currentRecord.getValue({
                    fieldId: 'approvalstatus',
                });
                var userId = runtime.getCurrentUser().id;
                var userRole = runtime.getCurrentUser().role;
                log.debug("userId===", userId)
                log.debug("userRole===", userRole)



                if ((subsidiary == "8" || subsidiary == "16") && (location == "8" || location == "21") && appStatus == "2" && (userRole == 3 || userId == "125662" || userId == "9" || userId == "822")) {
                    log.debug("getting inside new print button")
                    scriptContext.form.addButton({
                        id: 'custpage_new_invoice_pdf',
                        label: 'New Invoice',
                        functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + 3005 + '&deploy=1&recordID=' + recid + '&end=true\')'
                    });

                }

                // if (subsidiary == '11' || subsidiary == '8') {
                //      ssID = 2393;
                //     // ssIDLH = 2394;
                //    // ssID = 2425;
                //     ssIDLH = 2394;
                // }
                // updated

                if (subsidiary == '11' || subsidiary == '8' || subsidiary == '16' || subsidiary == '22' || subsidiary == '23') {
                    ssID = 2393;
                    // ssIDLH = 2394;
                    // ssID = 2425;
                    ssIDLH = 2394;
                }

                if (scriptContext.type == "view") {

                    if ((subsidiary == "11" || subsidiary == "16" || subsidiary == '23') && customform == "154") {
                        if (!((subsidiary === "8" || subsidiary === "16") && (location === "8" || location === "21"))) {
                            // if (subsidiary == "11" || customform == "154" ) {
                            scriptContext.form.addButton({
                                id: 'custpage_print_pdf',
                                label: 'ED-Print',
                                functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + ssID + '&deploy=1&recordID=' + recid + '&end=true\')'
                            });
                        }
                    }
                    var currentUser = runtime.getCurrentUser().id;
                    log.debug("currentUser", currentUser);
                }

                if (scriptContext.type == "view") {
                    if ((subsidiary == "11" || subsidiary == "16" || subsidiary == '23') && customform == "154") {
                        if (!((subsidiary === "8" || subsidiary === "16") && (location === "8" || location === "21"))) {
                            // if (subsidiary == "11" || customform == "154" ) {
                            scriptContext.form.addButton({
                                id: 'custpage_printOnletterheader_pdf',
                                label: 'ED-PrintOnLetterHeader',
                                functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + ssIDLH + '&deploy=1&recordID=' + recid + '&end=true\')'
                            });
                        }
                    }

                    if (subsidiary == 12) {
                        
                            scriptContext.form.addButton({
                                id: 'custpage_printew_pdf',
                                label: 'Print',
                                functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2403&deploy=1&recordID=' + recid + '&end=true\')'
                            });
                        
                    }
                }

                //stand alone invoice
                if ((subsidiary == "11" || subsidiary == "16" || subsidiary == '23') && customform == 168) {
                    if (!((subsidiary === "8" || subsidiary === "16") && (location === "8" || location === "21"))) {
                        scriptContext.form.addButton({
                            id: 'custpage_printew_pdf',
                            label: 'ED-Print',
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2575&deploy=1&recordID=' + recid + '&end=true\')'
                        });
                        scriptContext.form.addButton({
                            id: 'custpage_printew_pdf',
                            label: 'ED-PrintOnLetterHeader',
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2576&deploy=1&recordID=' + recid + '&end=true\')'
                        });
                    }
                }


            }


        }

        function beforeSubmitAction(scriptContext) {
            var currentRecord = scriptContext.newRecord;
            var recId = currentRecord.id;
            var subsidiary = currentRecord.getValue({
                fieldId: 'subsidiary',
            });
            var location = currentRecord.getValue({
                fieldId: 'location',
            });
            if (scriptContext.type == "create") {
                if ((subsidiary == "8" || subsidiary == "16") && (location == "8" || location == "21")) {
                    currentRecord.setValue({
                        fieldId: "approvalstatus",
                        value: 2
                    })
                }
            }
        }
        return {
            beforeLoad: printbeforeLoad,
            beforeSubmit: beforeSubmitAction,

        };
    });

function stamp() {
    var tStamp = Math.floor(Date.now() / 1000);
    return tStamp;
}