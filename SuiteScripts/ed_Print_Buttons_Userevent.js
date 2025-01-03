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
define(['N/log', 'N/record', 'N/search', 'N/format', 'N/task', 'N/redirect', 'N/runtime'],
    function (log, record, search, format, task, redirect, runtime) {
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

            if (scriptContext.type == "view") {

                var customform = currentRecord.getValue({
                    fieldId: 'customform'
                });
                subsidiary = currentRecord.getValue({
                    fieldId: 'subsidiary',
                });
                var customer = currentRecord.getValue({
                    fieldId: 'entity',
                });
                var location = currentRecord.getValue({
                    fieldId: 'location',
                });

                if (subsidiary == '11') {

                    if (scriptContext.type == "view") {

                        if (subsidiary == "11" || customform == "116") {
                            if (!((subsidiary === "8" || subsidiary === "16") && (location === "8" || location === "21"))) {
                                scriptContext.form.addButton({
                                    id: 'custpage_credit_print_pdf',
                                    label: 'ED-Print',
                                    functionName: ' window.open(\'/app/site/hosting/scriptlet.nl?script=2399&deploy=1&recid=' + recid + '&end=true\')'
                                });
                            }
                        }
                        var currentUser = runtime.getCurrentUser().id;
                        log.debug("currentUser", currentUser);
                    }

                    if (scriptContext.type == "view") {
                        if (subsidiary == "11" || customform == "116") {
                            if (!((subsidiary === "8" || subsidiary === "16") && (location === "8" || location === "21"))) {
                                scriptContext.form.addButton({
                                    id: 'custpage_newcredit_lh_pdf',
                                    label: 'ED-PrintOnLetterHeader',
                                    functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2400&deploy=1&recid=' + recid + '&end=true\')'
                                });
                            }
                        }
                    }
                }
            }
        }
        return {
            beforeLoad: printbeforeLoad

        };
    });