/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount

 * Module Description
 * Deployment for PO
 * Includes FieldChangedAction
 *
 * Version    Date            Author         Remarks
 * 2.0.0      3 MAR 2022      Anjali     Created for PO
 
*/


define(['N/log', 'N/search', 'N/format', 'N/runtime', 'N/record'],
    function (log, search, format, runtime, record) {
        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {string} scriptContext.fieldId - Field name
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         * 
         * 
         */
        var mode=" "
        function pageInitAction(scriptContext) {
            var currentRecord = scriptContext.currentRecord;
            mode=scriptContext.mode
            if (mode == 'create' || mode == 'copy' || mode == 'edit') {
                var poId = currentRecord.getField({
                    fieldId: 'tranid'
                });
                log.debug("poId", poId);
                console.log("poId", poId);
                poId.isDisabled = true;
            }
        }


        function FieldChangedAction(scriptContext) {
            // try {
            var currentRecord = scriptContext.currentRecord;
            //  log.debug("currentRecord", currentRecord);

            var name = scriptContext.fieldId;
            var sublistId = scriptContext.sublistId;

            // if (name == "subsidiary") {
            //     var subsidiary = currentRecord.getValue({
            //         fieldId: 'subsidiary'
            //     });
            //     log.debug("subsidiary", subsidiary);
            //     var customForm = currentRecord.getValue({
            //         fieldId: 'customform'
            //     });
            //     log.debug("customForm", customForm);

            //     if (subsidiary == 4 && customForm == 148) {
            //         var subsidiary = currentRecord.getValue({
            //             fieldId: 'subsidiary'
            //         });
            //         log.debug("subsidiary", subsidiary);
            //         var po = currentRecord.getValue({
            //             fieldId: 'tranid'
            //         });
            //         log.debug("po", po);

            //         var newpo = po.replace("PO", "POSG");
            //         log.debug("newpo", newpo);

            //         var newpoSet = currentRecord.setValue({
            //             fieldId: 'tranid',
            //             value: newpo,
            //             ignoreFieldChange: true,
            //             forceSyncSourcing: true,
            //         });
            //         log.debug("newpoSet", newpoSet);

            //     }

            // }


            // } catch (e) {
            //     log.error(e.name);
            // } //try catch ends here
        }

        function SaveRecordAction(scriptContext) {
            var currentRecord = scriptContext.currentRecord;
            var customForm = currentRecord.getValue({
                fieldId: 'customform'
            });
            log.debug("customForm", customForm);
            var subsidiary = currentRecord.getValue({
                fieldId: 'subsidiary'
            });
            log.debug("subsidiary", subsidiary);

            var po = currentRecord.getValue({
                fieldId: 'tranid'
            });
            log.debug("po", po);
            if (subsidiary != 4 && customForm == 105) {
                var po = currentRecord.getValue({
                    fieldId: 'tranid'
                });
                log.debug("po", po);

                var newpo = po.replace("POSG", "PO");
                log.debug("newpo", newpo);

                var newpoSet = currentRecord.setValue({
                    fieldId: 'tranid',
                    value: newpo
                });
                log.debug("newpoSet", newpoSet);
            }


            return true;
        }



        return {
            pageInit: pageInitAction,
            fieldChanged: FieldChangedAction,
            saveRecord: SaveRecordAction
        }

    });