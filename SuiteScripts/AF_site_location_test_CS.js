/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/ui/dialog'],
    function (search, dialog) {
        function saveRecord(context) {
            var currentRecord = context.currentRecord;
            var siteName = currentRecord.getValue({
                fieldId: 'name'
            });
            var currentRecordId = currentRecord.id;
            
            log.debug("siteName", siteName);
            log.debug("currentRecordId", currentRecordId);

            var customrecord_af_site_loc_test_listSearchObj = search.create({
                type: "customrecord_af_site_loc_test_list",
                filters: [
                    ["name", "is", siteName]
                ],
                columns: [
                    search.createColumn({name: "internalid", label: "Internal ID"}),
                    search.createColumn({name: "name", label: "Name"})
                ]
            });

            var searchResultCount = 0;
            customrecord_af_site_loc_test_listSearchObj.run().each(function(result) {
                var resultId = result.getValue({name: 'internalid'});
                if (resultId !== currentRecordId) {
                    searchResultCount++;
                }
                return true;
            });

            log.debug("customrecord_af_site_loc_test_listSearchObj result count", searchResultCount);

            if (searchResultCount > 0) {
                dialog.alert({
                    title: 'Duplicate Name',
                    message: 'A record with this name already exists. Please use a different name.'
                });
                return false;
            }

            return true;
        }

        return {
            saveRecord: saveRecord
        };
    }
);