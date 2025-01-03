/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
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
        function BeforeLoadAction(scriptContext) {
            try {
                /*** for print ****/
                var currUser = runtime.getCurrentUser();
                var currUserId = currUser.id;
                var recid = scriptContext.newRecord.id;
                //  if (currUserId == 20) {
                var currentRecord = scriptContext.newRecord;
                log.debug('type', scriptContext.type);
                var Results = '';
                
                if (scriptContext.type != 'create' || scriptContext.type != 'copy') {
                    var item_ds = [];
                    var ds_data = new Array();
                    var itemCount = currentRecord.getLineCount({
                        sublistId: 'item'
                    });
                    // for (var i = 1; i <= itemCount; i++) {
                    //      var POrdReq = currentRecord.getCurrentSublistValue({
                    //         sublistId: 'item',
                    //         fieldId: 'linkedorder'
                    //         });
                    // }
                    //   log.debug('POrdReq', POrdReq);
                    var columns = [];
                    columns.push(search.createColumn({
                        name: "appliedtotransaction",
                        summary: "GROUP",
                        label: "Applied To Transaction"
                    }));

                    var filters = [];
                    filters.push(search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: currentRecord.id
                    }));
                    filters.push(search.createFilter({
                        name: 'mainline',
                        operator: search.Operator.ANYOF,
                        values: false
                    }));
                    filters.push(search.createFilter({
                        name: 'taxline',
                        operator: search.Operator.ANYOF,
                        values: false
                    }));
                    filters.push(search.createFilter({
                        name: 'shipping',
                        operator: search.Operator.ANYOF,
                        values: false
                    }));
                    filters.push(search.createFilter({
                        name: 'appliedtolinktype',
                        operator: search.Operator.ANYOF,
                        values: "POrdReq"
                    }));

                    var dsSearchObj = {};
                    dsSearchObj.type = 'purchaseorder';
                    dsSearchObj.filters = filters;
                    dsSearchObj.columns = columns;
                    var Search = search.create(dsSearchObj);
                    var ResultSet = Search.run();
                    Results = ResultSet.getRange(0, 1000);
                    if (Results.length >= 1) {
                        log.debug('Results', JSON.stringify(Results));
                        for (var i = 0; i < Results.length; i++) {
                            // var reqNum = Results[i].getValue('appliedtotransaction');
                            var reqNum = Results[i].getText({
                                name: "appliedtotransaction",
                                summary: "GROUP"
                            });
                            log.debug('reqNum', reqNum);
                            var dsVal = scriptContext.form.addField({
                                id: 'custpage_ds_print',
                                type: serverWidget.FieldType.TEXTAREA,
                                label: 'Linked Order'
                            });
                            dsVal.defaultValue = reqNum;
                            dsVal.updateDisplayType({
                                displayType: serverWidget.FieldDisplayType.NORMAL
                            });
                        }
                    }
                }
                //  }
                /*** for print ****/
            } catch (e) {
                log.error('error', e.toString());
            }
        }
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function BeforeSubmitAction(scriptContext) {

        }
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function AfterSubmitAction(scriptContext) { }
        return {
            beforeLoad: BeforeLoadAction,
            beforeSubmit: BeforeSubmitAction,
            afterSubmit: AfterSubmitAction
        };
    });