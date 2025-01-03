/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/url', 'N/search', 'N/runtime', 'N/format'],

    function (record, url, search, runtime, format) {
        /**
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         *  @param {string} scriptContext.fieldId - Field name
         *  @param {string} scriptContext.type - Trigger type
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

            return true;
        }

        function saveRecordAction(scriptContext) {
        //     var currentRecord = scriptContext.currentRecord;
        //     if(scriptContext.type == "create"){
        //     var curInvSub = currentRecord.getValue({
        //         fieldId: "subsidiary"
        //     })


        //     if (curInvSub == '22' || curInvSub == '23') {
        //         alert("Please Select Valid Subsidiary")
        //         return false

        //     }
        // }

            return true
        }

        return {
            pageInit: pageInit,
            saveRecord: saveRecordAction,
        };

    });