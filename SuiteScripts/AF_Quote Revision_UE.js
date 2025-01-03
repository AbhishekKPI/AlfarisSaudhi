function beforeLoadQRAction(type, form, request) {

    nlapiGetField('tranid').setDisplayType('disabled');
    if (type == 'view') {

        var socreated = false;
        var res = nlapiSearchRecord("salesorder", null, ["createdfrom", "anyof", nlapiGetRecordId()]);
        if (res) {
            if (res.length > 0) {
                socreated = true;
            }
            //testing 1
            
        }
        if (nlapiGetFieldValue("custbody_inactive_based_on_the") == "T") {
            form.removeButton('createsalesord');
            form.removeButton('createcashsale');
            form.removeButton('createinvoice');
        }
        nlapiLogExecution('DEBUG',"socreated",socreated);
        var qtId = nlapiGetRecordId();
        if (nlapiGetFieldValue("custbody_inactive_based_on_the") == "F") {
            var approvalStatus = nlapiGetFieldValue("status")
            nlapiLogExecution('DEBUG',"approvalStatus",approvalStatus);
            if (!socreated && (approvalStatus == 'Processed' || approvalStatus == 'Open')) {
               // if (nlapiGetContext().getUser() == 8611 || nlapiGetContext().getUser() == 8609) {
                    form.addButton('custpage_external_rev', 'Quote Revision', 'window.open(\'/app/site/hosting/scriptlet.nl?script=2688&deploy=1&qtID=' + qtId + '&from=quote\',\'_self\')');
               // }
            }
        }
    }
}