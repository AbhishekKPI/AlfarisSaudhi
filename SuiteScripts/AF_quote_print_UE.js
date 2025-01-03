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
    define(['N/log', 'N/record', 'N/search', 'N/format', 'N/task', 'N/redirect', 'N/ui/serverWidget'],
        function(log, record, search, format, task, redirect, serverWidget) {
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
                var currentRecord = scriptContext.newRecord
                var recid = scriptContext.newRecord.id;
                var ssID = 446;
                var subsidiary = currentRecord.getValue({
                    fieldId: 'subsidiary',
                });
                log.debug("subsidiary", subsidiary);

                if (scriptContext.type == "copy") {
                    currentRecord.setValue({
                        fieldId: "custbody_trans_custom_number_triggered",
                        value: false
                    });
                }

                if (scriptContext.type == "create") {
                    var customform = currentRecord.getValue({
                        fieldId: 'customform',
                    });
                    try {
                        if (customform == 100) {
                            scriptContext.form.getField({
                                id: 'custbody_allow_lump_sum'
                            }).updateDisplayType({
                                displayType: serverWidget.FieldDisplayType.NORMAL
                            });
                        }
                    } catch (e) {
                        log.error('error', e.toString());
                    }
                }

                if (subsidiary == '11' || subsidiary == "15" || subsidiary == "8" || subsidiary == "16") {
                    ssID = 2388;
                }

                var status = currentRecord.getValue({
                    fieldId: 'status',
                });
                var customform = "";

                if (scriptContext.type == "view") { 
                    if (recid) {
                        var QueRec = record.load({
                            type: "estimate",
                            id: recid
                        });
                        var customform = QueRec.getValue({
                            fieldId: 'customform',
                        });
                    }
                }


                var withHeaderSsID = 2387;
                if (subsidiary == '11' || subsidiary == "15" || subsidiary == "8") {
                    withHeaderSsID = 2386;
                }
                status = currentRecord.getValue({
                    fieldId: 'status',
                });
                if (status != "Closed" && customform == "150" && (subsidiary == "11" || subsidiary == "8" || subsidiary == "16")) {
                    if (scriptContext.type == "view") {
                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf1',
                            label: 'ED-Print',
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + ssID + '&deploy=1&recordID=' + recid + '&end=true\')'
                        });

                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf2',
                            label: 'ED-Print On Letterhead',
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + withHeaderSsID + '&deploy=1&recordID=' + recid + '&end=true\')'
                        });
                    }
                }

                if (status != "Closed" && customform == "106") {
                    if (scriptContext.type == "view") {
                        scriptContext.form.addButton({
                            id: 'custpage_print_pdf3',
                            label: 'Rent-Print Option',
                            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=476&deploy=1&recordID=' + recid + '&end=true\')'
                        });
                    }
                }
                log.debug("withHeaderSsID", withHeaderSsID);


                // if (status != "Closed" && customform == "150" && subsidiary =="11") {
                //     if (scriptContext.type == "view") {
                //         scriptContext.form.addButton({
                //             id: 'custpage_print_pdf1_ed_division',
                //             label: 'ED-Print',
                //             functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + ssID + '&deploy=1&recordID=' + recid + '&end=true\')'
                //         });
                //     }
                //     if (scriptContext.type == "view") {
                //         scriptContext.form.addButton({
                //             id: 'custpage_print_pdf1_ed_division',
                //             label: 'ED-Print on Letterhead',
                //             functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + ssID + '&deploy=1&recordID=' + recid + '&end=true\')'
                //         });
                //     }
                // } 
            }
            return {
                beforeLoad: printbeforeLoad

            };
        });