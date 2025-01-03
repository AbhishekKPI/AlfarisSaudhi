function createProjectSuitelet() {
    nlapiLogExecution("DEBUG","coming inside***************");
    var recID = request.getParameter('recId');
    nlapiLogExecution("DEBUG","recID***************",recID);
    var timestamp = stamp();
    var record = nlapiCreateRecord('customrecord_response_handling');
    nlapiLogExecution("DEBUG","record***************",record);

	record.setFieldValue("name", parseInt(timestamp));
	record.setFieldValue("custrecord_time_stamp", parseInt(timestamp));
	record.setFieldValue("custrecord_message", "Processing...");
    var responseID = nlapiSubmitRecord(record, true, true);
    nlapiLogExecution("DEBUG","responseID***************",responseID);

    
    var params = new Array();
	params['custscript_invoice_id'] = recID;
	params['custscript_timestamp_inv'] = responseID;
	nlapiScheduleScript('customscript_wr_sc_create_purch_inv', null, params);
    nlapiLogExecution("DEBUG","params***************",params);


    var redirctParms = {};
	redirctParms['timestamp'] = timestamp;
	redirctParms['redirectType'] = 'purchaseInvoice';
	nlapiSetRedirectURL('SUITELET', "customscript_custom_respons_hanle_screen", "customdeploy_res_handle_screen", null, redirctParms);
}
function stamp() {
    var tStamp = Math.floor(Date.now() / 1000); //customscript_sc_update_bank_balance
    return tStamp;
}