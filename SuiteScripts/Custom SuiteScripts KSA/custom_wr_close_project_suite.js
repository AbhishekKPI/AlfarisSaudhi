function CloseProjectSuitelet() {
    var searchRecId = request.getParameter('recId');
    var recid = searchRecId;
    var timestamp = stamp();
    var record = nlapiCreateRecord('customrecord_response_handling');
    record.setFieldValue("name", parseInt(timestamp));
    record.setFieldValue("custrecord_time_stamp", parseInt(timestamp));
    record.setFieldValue("custrecord_message", "Processing...");
    var responseID = nlapiSubmitRecord(record, true, true);

    var params = new Array();
    params['custscript_jobid'] = recid;
    params['custscript_jobtimesheet'] = responseID;
    nlapiScheduleScript('customscript_wr_sc_close_project', null, params);

    var params = {};
    params['timestamp'] = timestamp;
    params['redirectType'] = 'closeProjects';
    nlapiSetRedirectURL('SUITELET', "customscript_custom_respons_hanle_screen", "customdeploy_res_handle_screen", null, params);
}
function stamp() {
    var tStamp = Math.floor(Date.now() / 1000); //customscript_sc_update_bank_balance
    return tStamp;
}