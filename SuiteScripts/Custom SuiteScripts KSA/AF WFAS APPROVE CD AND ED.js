function cdedApproveAction(type, form, request) {
    //var status =  nlapiGetContext().getSetting('SCRIPT', 'custscript_so_status');
    var recID = nlapiGetRecordId();
    nlapiLogExecution("DEBUG", 'recID', recID);
    
    var recType = nlapiGetRecordType();
    var userID = nlapiGetContext().getUser();
    nlapiLogExecution("DEBUG", 'userID', userID);

    var soRec = nlapiLoadRecord('salesorder', recID);
    var equipmentID = soRec.getFieldValue('custbody_work_order_equipments');
    var soRecType = soRec.getFieldValue('custbody_record_type');
    var datetime = getCompanyDate();
    nlapiLogExecution("DEBUG", 'datetime', datetime);
 
    soRec.setFieldValue("custbody_custom_approval_status", 2);
    soRec.setFieldValue("orderstatus", 'B');
    soRec.setFieldValue("custbody_approved_by", userID);
    soRec.setFieldValue("custbody_approved_date_time", datetime);
    var today = new Date();
    if (soRecType == 1 || soRecType == 4) {
        soRec.setFieldValue("custbody_equipment_status", 4);
        //soRec.setFieldValue("custbody_wr_so_equipment_status", 4);
        // nlapiSubmitField('customrecord_ncfar_asset', equipmentID, 'custrecord_equipment_status', 4);
        // nlapiSubmitField('customrecord_ncfar_asset', equipmentID, 'custrecord_workshop_so_ref', recID);
        // nlapiSubmitField('customrecord_ncfar_asset', equipmentID, 'custrecord_asset_ws_start_date', today);
    }
    nlapiLogExecution("DEBUG", 'soRecType111', soRecType);
    nlapiLogExecution("DEBUG", 'equipmentID1111', equipmentID);
    nlapiLogExecution("DEBUG", 'soRec', JSON.stringify(soRec));

    nlapiSubmitRecord(soRec, false, false);
   // nlapiSubmitRecord(soRec, true, true);
   // nlapiSetRedirectURL("RECORD", 'salesorder', soRef, "view", null);
   nlapiLogExecution("DEBUG", 'soRecType', soRecType);
   nlapiLogExecution("DEBUG", 'equipmentID', equipmentID);
}

function getCompanyDate() {
    var currentDateTime = new Date();
    var companyTimeZone = nlapiLoadConfiguration('companyinformation').getFieldText('timezone');
    var timeZoneOffSet = (companyTimeZone.indexOf('(GMT)') == 0) ? 0 : new Number(companyTimeZone.substr(4, 6).replace(/\+|:00/gi, '').replace(/:30/gi, '.5'));
    var UTC = currentDateTime.getTime() + (currentDateTime.getTimezoneOffset() * 60000);
    var companyDateTime = UTC + (timeZoneOffSet * 60 * 60 * 1000);
    return new Date(companyDateTime);
}
