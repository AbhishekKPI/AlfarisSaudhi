/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 
 * Module Description
 * Deployment for  Invoice Rec (Payment creation and JV apply)
 * Includes getInputData, map
 *
 * Version    Date            Author        Remarks
 * 2.0.0      25 Jun 2024     manish        Created for Payment account update
 
 */
define(['N/log', 'N/runtime', 'N/record', 'N/search', 'N/task', 'N/format', "N/file"],
 
    function (log, runtime, record, search, task, format, file) {
 
        /**
         * Marks the beginning of the Map/Reduce process and generates input data.
         *
         * @typedef {Object} ObjectRef
         * @property {number} id - Internal ID of the record instance
         * @property {string} type - Record type id
         *
         * @return {Array|Object|Search|RecordRef} inputSummary
         * @since 2015.1
         */
        function getInputData() {
            try {
                var invArr = [];
                var invoiceSearchObj = search.create({
                    type: "invoice",
                    settings:[{"name":"consolidationtype","value":"ACCTTYPE"}],
                    filters:
                    [
                       ["type","anyof","CustInvc"], 
                       "AND", 
                       ["subsidiary","anyof","22","23"], 
                       "AND", 
                       ["approvalstatus","noneof","2"], 
                       "AND", 
                       ["internalid","anyof","799833"], 
                       "AND", 
                       ["mainline","is","T"]
                    ],
                    columns:
                    [
                       search.createColumn({name: "internalid",summary: "GROUP", label: "Internal ID"})
                    ]
                 });
                 var searchResultCount = invoiceSearchObj.runPaged().count;
                 log.debug("invoiceSearchObj result count",searchResultCount);
                 invoiceSearchObj.run().each(function(result){

                    var invId = result.getValue({
                        name: "internalid",
                        summary: "GROUP"
                    })
 
                    invArr.push({
                        "invId": invId,
                    })

                    return true;
                 });
                 log.debug("invArr", invArr)
                } catch (error) {
                    log.error('error', error.toString());
                }
     
                return invArr;
 
        }
 
        /**
          * Executes when the map entry point is triggered and applies to each key/value pair.
          *
          * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
          * @since 2015.1
          */
        function map(context) {
            var rowJson = JSON.parse(context.value);
            var invId = rowJson.invId;
 
            log.debug("Invoice id", invId)
 
            var invRec = record.load({
                type: "invoice",
                id: invId,
                isDynamic: true,

            });

            invRec.setValue({
                fieldId: "approvalstatus",
                value: 2
            })
 
            invRec.save({
                ignoreMandatoryFields: true
            })
 
        }
        /**
        * Executes when the summarize entry point is triggered and applies to the result set.
        *
        * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
        * @since 2015.1
        */
 
        function reduce(context) {
        }
 
        function summarize(summary) {
        }
 
        return {
            getInputData: getInputData,
            map: map,
            //    reduce: reduce,
            //    summarize: summarize
        };
 
    });