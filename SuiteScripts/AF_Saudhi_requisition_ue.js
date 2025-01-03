/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log', 'N/search', 'N/task', 'N/redirect', 'N/ui/serverWidget', 'N/error', 'N/format', 'N/url', 'N/runtime'],

    function (record, log, search, task, redirect, serverWidget, error, format, url, runtime) {

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
            try {
                var currentRecord = scriptContext.newRecord;
                var name = scriptContext.fieldId;
                var sublistId = scriptContext.sublistId
                var recId = scriptContext.newRecord.id;
                var currentRole = runtime.getCurrentUser().role;
                var currentId = runtime.getCurrentUser().id;
                if (scriptContext.type == "view") {

                    // hiding escalution tab it should visible only for administrator role
                    // if (createdBy == currentId && currentRole != "3") {
                    var hideSubtab = scriptContext.form.addField({
                        id: 'custpage_hide_subtab',
                        label: 'Hidden',
                        type: serverWidget.FieldType.INLINEHTML
                    });

                  
                    var status = currentRecord.getText({
                        fieldId: "custbody_custom_approval_status"
                    })

                    var src = "";
                    src += "$('.uir-record-status').html('"+status+"');";


                    hideSubtab.defaultValue = "<script>jQuery(function($){require([], function(){" + src + ";})})</script>";
                }
                // }
            }
            catch (e) {
                log.debug("error", e.toString())
            }

        }
        function BeforeSubmitAction(scriptContext) {

        }

        function afterSubmit(scriptContext) {


        }
        return {
            beforeLoad: BeforeLoadAction,
            // beforeSubmit: BeforeSubmitAction,
            // afterSubmit: afterSubmit
        };
    });


// var delay = (function () {
//     //  log.debug("Testing....Delay");
//     var timer = 0;
//     return function (callback, ms) {
//         clearTimeout(timer);
//         timer = setTimeout(callback, ms);

//     };
// })();

