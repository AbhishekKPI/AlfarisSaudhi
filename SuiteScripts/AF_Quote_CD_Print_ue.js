/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log', 'N/search', 'N/task', 'N/redirect', 'N/ui/serverWidget', 'N/error', 'N/format/i18n', 'N/url', 'N/runtime'],

    function(record, log, search, task, redirect, serverWidget, error, format, url, runtime) {

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */
        function BeforeLoadAction(scriptContext) {
            var curRec = scriptContext.newRecord;
            var recId = scriptContext.newRecord.id;

            log.debug("curRec", curRec);
            log.debug("recId", recId);

            var sub = curRec.getValue({
                fieldId: 'subsidiary'
            });


            if (scriptContext.type == "view") {

                var quoteRec = record.load({
                    type: 'estimate',
                    id: recId
                });
                log.debug("quoteRec", quoteRec);

                var custFrm = quoteRec.getValue({
                    fieldId: 'customform'
                });
                var combined = quoteRec.getValue({
                    fieldId: 'custbody_combined_project'
                });
                log.debug("custFrm", custFrm);
                if (custFrm == 157 && (sub == '13' || sub == '1' || sub == '8')) {
                    log.debug("getting insideeee", custFrm);
                    var recId = curRec.id;
                    var recType = curRec.type;
                    if (!combined) {
                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf',
                            label: 'CDR - Print',
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2439&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2574&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                        });
                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf2',
                            label: 'CDR - Print On Letterhead',
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2440&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2573&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                        });
                    } else {
                        // var userID = nlapiGetContext().getUser();
                        // var userID = nlapiGetUser().id();
                        var userID = runtime.getCurrentUser().id;
                        log.debug("userID", userID);
                        // if (userID == 84922) {

                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf',
                            label: 'CDR - Print',
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2439&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2693&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                        });
                        // var printOnLetterHead_recID = recId;

                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf2',
                            label: 'CDR - Print On Letterhead',
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2440&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2693&deploy=1&recordidPOLH=' + recId + '&recordType=' + recType + '&end=true\')'
                        });
                        // }

                    }

                }

            }







        }







        function capitalize(string, a) {

            var tempstr = string.toLowerCase();

            if (a == false || a == undefined)

                return tempstr.replace(tempstr[0], tempstr[0].toUpperCase());

            else {

                return tempstr.split(" ").map(function(i) {

                    return i[0].toUpperCase() + i.substring(1)

                }).join(" ");

            }

        }



        function strReplace(str) {

            return str.replace(/,/g, "");

        }



        return {
            beforeLoad: BeforeLoadAction,


            // capitalize: capitalize

        };

    });