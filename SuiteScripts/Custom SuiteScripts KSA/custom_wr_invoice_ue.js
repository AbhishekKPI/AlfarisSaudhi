function beforeLoadWRAction(type, form, request) {
    if (type == "view") {
        var recid = nlapiGetRecordId();
        nlapiLogExecution("DEBUG", "recid", recid);

        var invRec = nlapiLoadRecord("invoice", recid);
        var recordType = invRec.getFieldValue('custbody_record_type');
        nlapiLogExecution("DEBUG", "recordType", recordType);
        var purchaseInvoice = invRec.getFieldValue('custbody_purchase_inv_ref');

        var approvalStatus = invRec.getFieldValue('approvalstatus');
        var customerID = invRec.getFieldValue('entity');
        nlapiLogExecution("DEBUG", "customerID*************", customerID);
        var userRole = nlapiGetRole();
        nlapiLogExecution("DEBUG", "userRole*************", userRole);
        nlapiLogExecution("DEBUG", "purchaseInvoice*************", purchaseInvoice);
        if (approvalStatus == 2 && (recordType == 1 || recordType == 4)) {
            form.setScript('customscript_wr_namechange_client');
        }
        //acounts and admin can only create purchase invoice
        if ((purchaseInvoice == "" || purchaseInvoice == null) && recordType == 1) {

            // if ((purchaseInvoice == "" || purchaseInvoice == null) && ((recordType == 1 && (userRole == 1026 || userRole == 3) && (customerID == 2216 || customerID == 29189 || customerID == 29205 || customerID == 29191 || customerID == 35134)) || (recordType == 4 && (userRole == 1073 || userRole == 3) && customerID == 29168))) {
            //if (nlapiGetContext().getUser() == 126567) {

            nlapiLogExecution("DEBUG", "coming inside");
            var butnLab = "Create Purchase Invoice";

            if (approvalStatus == 1) {
                var butnLab = "Approve & Create Purchase Invoice";
                form.addButton("custpage_create_purchase_invoice", "" + butnLab + "", "createPurchaseInvoice(" + recid + ")");
                form.setScript('customscript_wr_namechange_client');
            } else if (approvalStatus == 2) {
                var butnLab = "Create Purchase Invoice";
                form.addButton("custpage_create_purchase_invoice", "" + butnLab + "", "createPurchaseInvoice(" + recid + ")");
                form.setScript('customscript_wr_namechange_client');
            }
            //}
        }
    }

    if (type == "create") {
        var soID = nlapiGetFieldValue('createdfrom');
        nlapiLogExecution("DEBUG", "soID*************", soID);
        if (soID) {
            var soRec = nlapiLoadRecord("salesorder", soID);
            var soFormID = soRec.getFieldValue('customform');
            nlapiLogExecution("DEBUG", "soFormID*************", soFormID);

            if (soFormID == 160) {
                try {
                    nlapiSetFieldValue('customform', 161);
                } catch (err) {
                    nlapiLogExecution("DEBUG", "err----------------");
                }
            }
        }

    }
}