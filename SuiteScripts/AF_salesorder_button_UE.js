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
define(['N/log', 'N/record', 'N/search', 'N/format', 'N/task', 'N/redirect', "N/runtime"],
    function(log, record, search, format, task, redirect, runtime) {
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
            var ssID = 2392;
            subsidiary = currentRecord.getValue({
                fieldId: 'subsidiary',
            });
            var customform = currentRecord.getValue({
                fieldId: 'customform',
            });
            log.debug("recid", recid);


            if (scriptContext.type == "view") {
            
                    var SORec = record.load({
                        type: 'salesorder',
                        id: recid
                    });
                    var custFrmSO = SORec.getValue({
                        fieldId: 'customform'
                    });
            
            }


            log.debug("currentRecord", currentRecord);
            log.debug("ssID", ssID);
            log.debug("subsidiary", subsidiary);

            if (subsidiary == '11' || subsidiary == '8' || subsidiary == '16') {
                ssID = 2389;
            }
            if (scriptContext.type == "view") {
                if (custFrmSO == 151 && ( subsidiary == "11" || subsidiary == "8" ||subsidiary == "16")) {
                // if (customform == "102" || subsidiary == "11" ||subsidiary == "16") {
                    log.debug("subsidiary inside", subsidiary);
                    scriptContext.form.addButton({
                        id: 'custpage_print_pdf',
                        label: 'ED-Print',
                        functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + ssID + '&deploy=1&recordID=' + recid + '&end=true\')'
                    });
                }
            }

            var letterHeadSsID = 441;
            subsidiary = currentRecord.getValue({
                fieldId: 'subsidiary',
            });
            if (subsidiary == '11' || subsidiary == '8' || subsidiary == '16') {
                letterHeadSsID = 2390;
            }
            if (scriptContext.type == "view") {
                if (custFrmSO == 151 && ( subsidiary == "11" || subsidiary == "8" ||subsidiary == "16")) {
                // if (customform == "102" || subsidiary == "11" || subsidiary == "16") {
                    scriptContext.form.addButton({
                        id: 'custpage_print_pdf',
                        label: 'ED-Print On LetterHead',
                        functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + letterHeadSsID + '&deploy=1&recordID=' + recid + '&end=true\')'
                    });
                }
            }


            if(scriptContext.type == "edit" || scriptContext.type == "create"){
                var customer = currentRecord.getValue({
                    fieldId: 'entity',
                });

                log.debug("enity", customer);
            }

        }
        return {
            beforeLoad: printbeforeLoad

        };
    });