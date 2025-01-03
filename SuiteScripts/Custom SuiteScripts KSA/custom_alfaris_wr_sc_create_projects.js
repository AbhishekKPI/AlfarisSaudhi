function createWRprojects() {
    var recordId = nlapiGetContext().getSetting('SCRIPT', 'custscript_soid');
    var timeStamp = nlapiGetContext().getSetting('SCRIPT', 'custscript_timesheet');
    var concID = nlapiGetContext().getSetting('SCRIPT', 'custscript_conc_id');
    if (concID) {
        nlapiDeleteRecord('customrecord_wr_concurrency', concID);
    }

    nlapiLogExecution("DEBUG", "coming inside===============");
    nlapiLogExecution("DEBUG", "soID===============", recordId);
    var soRec = nlapiLoadRecord("salesorder", recordId);
    var customformID = soRec.getFieldValue('customform');
    nlapiLogExecution("DEBUG", "customformID===============", customformID);

    var lnCnt = soRec.getLineItemCount("item");
    var count = 0;
    for (var k = 1; k <= lnCnt; k++) {
        var createproject = soRec.getLineItemValue('item', 'custcol_create_project', k);
        var projectref = soRec.getLineItemValue('item', 'custcol_project_ref', k);
        var department = soRec.getLineItemValue('item', 'department', k);
        nlapiLogExecution("DEBUG", "department===============", department);


        if (projectref == '' || projectref == null) {
            if (createproject == "T") {
                var location = soRec.getLineItemValue('item', 'location', k);
                count++;
                var description = soRec.getLineItemValue('item', 'description', k);
                var item = soRec.getLineItemValue('item', 'item', k);
                var subsidiary = soRec.getFieldValue('subsidiary');
                var customer = soRec.getFieldValue('entity');
                var serviceType = soRec.getFieldValue('custbody_service_type');

                var equipment='';
                if(customformID==159){//Energy Division SO
                    var equipment = soRec.getFieldValue('custbody_ed_work_order_equipments');
                }else{
                    var equipmentOld = soRec.getFieldValue('custbody_work_order_equipments');
                    var equipment = soRec.getFieldValue('custbody_ed_work_order_equipments');
                }

                var startDate = soRec.getFieldValue('custbody_custom_start_date');

                var famCategory = '';
                
                    if(customformID==159){//Energy Division SO
                        if (equipment) {
                        famCategory = nlapiLookupField('customrecord_rent_asset', equipment, 'custrecord_rent_asset_ws_category');
                        }
                    }else{
                        if (equipment) {
                        famCategory = nlapiLookupField('customrecord_rent_asset', equipment, 'custrecord_rent_asset_ws_category');
                        }else if(equipmentOld){
                            famCategory = nlapiLookupField('customrecord_ncfar_asset', equipmentOld, 'custrecord_ws_category');
                        }
                    }
               
                
                var recPrefix = 'PRJ';
                var projectRec = nlapiCreateRecord('job');
                var jobCustForm = '';
                var recType = '';
                if(customformID==159){//Energy Division SO
                    nlapiLogExecution("DEBUG", "serviceType===============", serviceType);

                    if (serviceType == 1) {//PDI
                        
                        jobCustForm = 118;
                        recType = 5;
                        projectRec.setFieldValue("custentity_category", famCategory);
                         recPrefix = 'PDI';
                    } else if (serviceType == 2) {//PMS
                         jobCustForm = 119;
                         recType = 5;
                         recPrefix = 'PMS';
                         projectRec.setFieldValue("custentity_category", famCategory);
                    }else if (serviceType == 3 || serviceType == 12) {//Repair
                         jobCustForm = 120;
                         recType = 5;
                         projectRec.setFieldValue("custentity_category", famCategory);
                         recPrefix = 'RnM';
     
                    }else {//other
     
                         jobCustForm = 57;
                         recType = 3;
     
                    }

                }else{
                    if (serviceType == 1) {//PDI
                        /* jobCustForm = 56;
                         recType = 4;
                         projectRec.setFieldValue("custentity_category", famCategory);
                         recPrefix = 'PDI';*/
                          jobCustForm = 57;
                         recType = 3;
                     } else if (serviceType == 2) {//PMS
                         jobCustForm = 58;
                         recType = 4;
                         recPrefix = 'PMS';
                         projectRec.setFieldValue("custentity_category", famCategory);
                     }
                     else if (serviceType == 3 || serviceType == 12) {//Repair
                         jobCustForm = 55;
                         recType = 4;
                         projectRec.setFieldValue("custentity_category", famCategory);
                         recPrefix = 'RnM';
     
                     } else {//other
     
                         jobCustForm = 57;
                         recType = 3;
                         //   nlapiLogExecution("DEBUG", "jobCustForm***************",jobCustForm);
     
                     }
                }
                
                nlapiLogExecution("DEBUG", "jobCustForm===============", jobCustForm);
                nlapiLogExecution("DEBUG", "serviceType===============", serviceType);
                projectRec.setFieldValue("customform", jobCustForm);
                projectRec.setFieldValue("custentity_record_type", recType);
                projectRec.setFieldValue("entitystatus", 2);
                // var currentdate = new Date();
                // nlapiLogExecution('DEBUG', 'currentdate', currentdate);
                // // var today = currentdate.getDate();
                // // log.debug('today====', today);
                // var today = currentdate.getUTCDate();
                // // today = today + 1;
                // nlapiLogExecution('DEBUG', 'today*****', today);
                var nw_date = getCompanyDate();
                nw_date = nlapiDateToString(nw_date, 'datetimetz');
                var current_date = nw_date;
                projectRec.setFieldValue("custentity_actual_start_date_time", current_date);
                projectRec.setFieldValue("subsidiary", subsidiary);
                projectRec.setFieldValue("custentity_so_ref", recordId);
                projectRec.setFieldValue("parent", customer);
                projectRec.setFieldValue("custentity_wr_item", item);
                projectRec.setFieldValue("custentity_item_department", department);
                projectRec.setFieldValue("limittimetoassignees", 'F');
                projectRec.setFieldValue("custentity_prj_location", location);
                var projectid = nlapiSubmitRecord(projectRec, true, true);
                nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_message', "Generating Project Count : " + count);
                var depPrefix = nlapiLookupField('job', projectid, 'custentity_department_prefix');

                var obj = nlapiCreateRecord('customtransaction_project_autonumbering');
                obj.setFieldValue('subsidiary', subsidiary);
                var custRecID = nlapiSubmitRecord(obj, false, false);

                var tranID = nlapiLookupField('customtransaction_project_autonumbering', custRecID, 'tranid');
                var depPrefix = depPrefix;
                nlapiLogExecution("DEBUG", "serviceType********", serviceType);
                if(customformID==159){
                    if (serviceType == 1 || serviceType == 2 || serviceType == 3 || serviceType == 12) {
                        var finalID = addSlash(recPrefix) + ':' + tranID;
                    } else {
                        var finalID = addSlash(depPrefix) + addSlash(recPrefix) + tranID;
                    }
                }else{
                    if (serviceType == 2 || serviceType == 3 || serviceType == 12) {
                        var finalID = addSlash(recPrefix) + ':' + tranID;
                    } else {
                        var finalID = addSlash(depPrefix) + addSlash(recPrefix) + tranID;
                    }
                }
                

                nlapiLogExecution('DEBUG', 'finalID *** ', finalID);

                var prjName = description;
                if (description) {
                    prjName = description.substr(0, 83);
                }
                nlapiSubmitField('job', projectid, "companyname", prjName, true, true);
                nlapiSubmitField('job', projectid, "custentity_wr_job_description", description, true, true);
                nlapiSubmitField('job', projectid, "entityid", finalID, true, true);
                nlapiSubmitField('job', projectid, "custentity_custom_auto_number", finalID, true, true);
                soRec.setLineItemValue('item', 'custcol_project_ref', k, projectid);
                var today = new Date();
                // var todayTime = timeVal();
                // var todayTime = Math.floor(Date.now() / 1000);
                if (startDate == '' || startDate == null) {
                    var nw_date = getCompanyDate();
                    nlapiLogExecution('DEBUG', 'nw_date bfr *********** ', nw_date);
                    nw_date = nlapiDateToString(nw_date, 'datetimetz');
                    nlapiLogExecution('DEBUG', 'nw_date aftr *********** ', nw_date);
                    var current_date = nw_date;
                    //nlapiLogExecution("DEBUG","currnt=====",currnt);
                    soRec.setFieldValue("custbody_custom_start_date", current_date);
                }
            }
        }
    }
    if (soRec) {
        nlapiSubmitRecord(soRec, true, true);
    }
    if (recordId) {
        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_trans_rec_id', recordId);
        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_message', "Complete");
    }
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            nlapiLogExecution('DEBUG', 'start in loop', start);
            break;
        }
    }
}
function timeVal() {
    var str = "";
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var meridian = "";
    if (hours > 12) {
        meridian += "pm";
    } else {
        meridian += "am";
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    return str + meridian;
}
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}
function removeNull(string) {
    if (string == null) {
        string = "";
    } else {
        string = string;
    }
    return string;
}
function addSlash(string) {
    if (string == null || string == "") {
        string = "";
    } else {
        // string = "/" + string;
        string = string;
    }
    return string;
}
function getCompanyDate() {
    var currentDateTime = new Date();
    var companyTimeZone = nlapiLoadConfiguration('companyinformation').getFieldText('timezone');
    var timeZoneOffSet = (companyTimeZone.indexOf('(GMT)') == 0) ? 0 : new Number(companyTimeZone.substr(4, 6).replace(/\+|:00/gi, '').replace(/:30/gi, '.5'));
    var UTC = currentDateTime.getTime() + (currentDateTime.getTimezoneOffset() * 60000);
    var companyDateTime = UTC + (timeZoneOffSet * 60 * 60 * 1000);
    return new Date(companyDateTime);
}

