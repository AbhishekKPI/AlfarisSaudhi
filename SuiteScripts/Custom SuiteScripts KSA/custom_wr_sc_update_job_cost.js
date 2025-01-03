function updateJobCost() {
    var recordId = nlapiGetContext().getSetting('SCRIPT', 'custscript_wrid');
    var timeStamp = nlapiGetContext().getSetting('SCRIPT', 'custscript_wr_timesheet');
    var soRec = nlapiLoadRecord("salesorder", recordId);
    var lineCount = soRec.getLineItemCount("item");
    var filter = new Array();
    var cols = new Array();
    cols[0] = new nlobjSearchColumn("item", null);
    cols[1] = new nlobjSearchColumn("custcol_project_ref", null);
    filter[0] = new nlobjSearchFilter("type", null, 'anyof', 'SalesOrd');
    filter[1] = new nlobjSearchFilter("status", 'custcol_project_ref', 'anyof', 1);
    filter[2] = new nlobjSearchFilter("custcol_total_project_cost", null, 'is', 'F');
    filter[3] = new nlobjSearchFilter("internalidnumber", null, 'equalto', recordId);
    var updprjcost = nlapiSearchRecord("salesorder", null, filter, cols);
    if (updprjcost) {
        var internalidarr = [];
        var internalidarritem = [];
        for (var j = 0; j < updprjcost.length; j++) {
            var itemVal = updprjcost[j].getValue('item');
            var projcRef = updprjcost[j].getValue('custcol_project_ref');
            internalidarr.push(projcRef);
        }
        var grandTotal = 0;
        if (internalidarr.length >= 0) {
            var grandArr = [];
            for (var i = 0; i < internalidarr.length; i++) {
                var pr = internalidarr[i];
                grandTotal = nlapiLookupField('job', pr, 'custentity_total_project_cost');
                if (lineCount) {
                    for (var kk = 1; kk <= lineCount; kk++) {
                        var linePrj = soRec.getLineItemValue("item", "custcol_project_ref", kk);
                        if (linePrj == pr) {
                            soRec.setLineItemValue('item', 'custcol_total_project_cost', kk, 'T');
                            soRec.setLineItemValue('item', 'custcol_project_cost', kk, grandTotal);
                        }
                    }
                }
            }
        }
    }
    if (recordId) {
        nlapiSubmitRecord(soRec, false, true);
        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_trans_rec_id', recordId);
        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_message', "Complete");
    }
}

