function createProjectSuitelet() {
    var searchRecId = request.getParameter('recId');
    var recid = searchRecId;
    var soRec = nlapiLoadRecord("salesorder", recid);
    var customform = soRec.getFieldValue('customform');
    var lnCnt = soRec.getLineItemCount("item");
    var timestamp = stamp();
    var record = nlapiCreateRecord('customrecord_response_handling');
    record.setFieldValue("name", parseInt(timestamp));
    record.setFieldValue("custrecord_time_stamp", parseInt(timestamp));
    record.setFieldValue("custrecord_message", "Processing...");
    var responseID = nlapiSubmitRecord(record, true, true);

    var userID = nlapiGetContext().getUser();
    var concrecord = nlapiCreateRecord('customrecord_wr_concurrency');
    concrecord.setFieldValue("custrecord_con_so", recid);
    concrecord.setFieldValue("custrecord_con_user", userID);
    var conconRecID = nlapiSubmitRecord(concrecord, true, true);


    var params = new Array();
    params['custscript_soid'] = recid;
    params['custscript_timesheet'] = responseID;
    params['custscript_conc_id'] = conconRecID;
    nlapiScheduleScript('customscript_wr_sc_create_projects', null, params);

    var params = {};
    params['timestamp'] = timestamp;
    params['redirectType'] = 'createProjects';
    nlapiSetRedirectURL('SUITELET', "customscript_custom_respons_hanle_screen", "customdeploy_res_handle_screen", null, params);
}
function stamp() {
    var tStamp = Math.floor(Date.now() / 1000); //customscript_sc_update_bank_balance
    return tStamp;
}