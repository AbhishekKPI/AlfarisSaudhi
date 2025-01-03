/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log', 'N/search', 'N/task', 'N/redirect', 'N/ui/serverWidget', 'N/error', 'N/format/i18n', 'N/url'],

    function (record, log, search, task, redirect, serverWidget, error, format, url) {

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
            var recType = curRec.type;
            log.debug("recType", recType)

            log.debug("curRec", curRec);
            log.debug("recId", recId);

            var subsidiary = curRec.getValue({
                fieldId: 'subsidiary'
            });
            var location = curRec.getValue({
                fieldId: 'location'
            });
            var customform = curRec.getValue({
                fieldId: 'customform'
            });
            log.debug("customform", customform);
            //  
            if (scriptContext.type == "view") {
                if (recType == "salesorder") {
                    var SORec = record.load({
                        type: 'salesorder',
                        id: recId
                    });
                    var custFrmSO = SORec.getValue({
                        fieldId: 'customform'
                    });
                }
                //invoice
                if (recType == "invoice") {

                    var invRec = record.load({
                        type: 'invoice',
                        id: recId
                    });
                    var custFrmInv = invRec.getValue({
                        fieldId: 'customform'
                    });
                    log.debug("custFrmInv", custFrmInv);

                }
            }
            if (scriptContext.type == "view") {
                if (recType == "salesorder") {
                    if (custFrmSO == 158 && (subsidiary == '13' || subsidiary == '1' || subsidiary == "8" || subsidiary == "22")) {
                        var recId = curRec.id;
                        var recType = curRec.type;

                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf',
                            label: 'CDR - Print',
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2444&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2536&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                        });
                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf2',
                            label: 'CDR - Print On Letterhead',
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2445&deploy=1&recordID=' + recId +  '&recordType=' + recType + '&end=true\')'
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2537&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                        });

                    }
                }

                if (recType == "invoice") {
                    if ((custFrmInv == 154) && (subsidiary == '13' || subsidiary == '1' || subsidiary == '8' || subsidiary == "22")) {
                        log.debug("getting inside----")
                        var recId = curRec.id;
                        var recType = curRec.type;
                        if (!((subsidiary === "8" || subsidiary === "16") && (location === "8" || location === "21"))) {
                            scriptContext.form.addButton({
                                id: 'custpage_print_pdf',
                                label: 'CDR - Print',
                                // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2439&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                                // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2539&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                                //functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=546&deploy=1&deploy=1&recid=' + recId + '&recordType=' + recType + '&end=true\')'
                                functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2578&deploy=1&recid=' + recId + '&recordType=' + recType + '&end=true\')'

                            });
                            scriptContext.form.addButton({
                                id: 'custpage_print_pdf2',
                                label: 'CDR - Print On Letterhead',
                                // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2440&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                                // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2540&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                                //functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=547&deploy=1&recid=' + recId + '&recordType=' + recType + '&end=true\')'
                                functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2579&deploy=1&recid=' + recId + '&recordType=' + recType + '&end=true\')'

                            });
                        }
                    }
                }

                /** abhishek 31_08_2023 begin  */

                /** purpose:- print needed with and without letterhead  for WR RECORD TYPE: work request and custome form:142 */

                if ((custFrmInv == 142)) {
                    log.debug("getting inside----")
                    var recId = curRec.id;
                    var recType = curRec.type;
                    if (!((subsidiary === "8" || subsidiary === "16") && (location === "8" || location === "21"))) {
                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf',
                            label: 'Invoice - Print',
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2439&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2539&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                            //functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=546&deploy=1&deploy=1&recid=' + recId + '&recordType=' + recType + '&end=true\')'
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2698&deploy=1&recid=' + recId + '&recordType=' + recType + '&end=true\')'

                        });
                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf2',
                            label: 'Invoice - Print On Letterhead',
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2440&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                            // functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2540&deploy=1&recordID=' + recId + '&recordType=' + recType + '&end=true\')'
                            //functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=547&deploy=1&recid=' + recId + '&recordType=' + recType + '&end=true\')'
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=2699&deploy=1&recid=' + recId + '&recordType=' + recType + '&end=true\')'

                        });
                    }
                }

                /** abhishek 31_08_2023 end */

            }







        }

        function beforeSubmitAction(scriptContext) {
            var curRec = scriptContext.newRecord;
            var recId = scriptContext.newRecord.id;
            var recType = curRec.type;
            log.debug("recType", recType)
            log.debug("curRec", curRec);
            log.debug("recId", recId);

            var subsidiary = curRec.getValue({
                fieldId: 'subsidiary'
            });
            var location = curRec.getValue({
                fieldId: 'location'
            });

            if (scriptContext.type == "create") {
                if ((subsidiary == "8" || subsidiary == "16") && (location == "8" || location == "21")) {
                    curRec.setValue({
                        fieldId: 'approvalstatus',
                        value: 2
                    });
                }


            }
        }







        function capitalize(string, a) {

            var tempstr = string.toLowerCase();

            if (a == false || a == undefined)

                return tempstr.replace(tempstr[0], tempstr[0].toUpperCase());

            else {

                return tempstr.split(" ").map(function (i) {

                    return i[0].toUpperCase() + i.substring(1)

                }).join(" ");

            }

        }



        function strReplace(str) {

            return str.replace(/,/g, "");

        }



        return {
            beforeLoad: BeforeLoadAction,
            beforeSubmit: beforeSubmitAction

            // capitalize: capitalize

        };

    });













