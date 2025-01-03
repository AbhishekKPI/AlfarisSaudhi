function beforeLoadWRAction(type, form, request) {

    nlapiLogExecution("DEBUG", "type--------------", type);
    if (type == "edit") {
        var jb = form.getSubList("recmachcustrecord_time_track_ref");
        jb.removeButton('newrec950');
    }

    if (type == "view") {
        var jb = form.getSubList("recmachcustrecord_time_track_ref");
        if (jb) {
            jb.removeButton('newrecrrecmachcustrecord_time_track_ref');
            jb.removeButton('attach');
            jb.removeButton('customize');
            jb.removeButton('newrecrecmachcustrecord_time_track_ref');
        }
        var recid = nlapiGetRecordId();
        var jobRec = nlapiLoadRecord("customrecord_time_tracking_details", recid);
        var empId = jobRec.getFieldValue('custrecord_tm_employee');
        var jobId = jobRec.getFieldValue('custrecord_tm_project');
        form.addButton('custpage_button', 'Print Details', "printTimeDetails(" + recid + ")");
        form.setScript('customscript_wr_namechange_client');
    }

    if (type == "create" || type == "copy") {
        try {

            var equipment = request.getParameter("equipment");
            nlapiSetFieldValue("custrecord_tm_equipment", equipment);
            var jobId = request.getParameter("jobId");
            nlapiSetFieldValue("custrecord_tm_project", jobId);
            var empVal = request.getParameter("empVal");
            nlapiSetFieldValue("custrecord_tm_employee", empVal);

            var filt = new Array();
            var col = new Array();
            var m = 0;
            col[0] = new nlobjSearchColumn("date", null);
            col[1] = new nlobjSearchColumn("item", null);
            col[2] = new nlobjSearchColumn("hours", null);
            col[3] = new nlobjSearchColumn("supervisorapproval", null);
            col[4] = new nlobjSearchColumn("status", null);
            col[5] = new nlobjSearchColumn("type", null);
            col[6] = new nlobjSearchColumn("employee", null).setSort(false);
            col[7] = new nlobjSearchColumn("customer", null);
            col[8] = new nlobjSearchColumn("custentity_equipment", 'customer');
            col[9] = new nlobjSearchColumn("memo", null);
            filt[m] = new nlobjSearchFilter("type", null, 'anyof', 'A');
            m++;
            if (equipment == "" || equipment == null) {
                filt[m] = new nlobjSearchFilter("customer", null, 'anyof', jobId);
                m++;
            }
            if (empVal) {
                filt[m] = new nlobjSearchFilter("employee", null, 'anyof', empVal);
                m++;
            }
            if (equipment) {
                filt[m] = new nlobjSearchFilter("custentity_equipment", "customer", 'anyof', equipment);
                m++;
            }
            var retSearch = nlapiSearchRecord("timebill", null, filt, col);
            if (retSearch) {
                for (var kk = 0; kk < retSearch.length; kk++) {
                    var date = retSearch[kk].getValue('date');
                    var item = retSearch[kk].getValue('item');
                    var hours = retSearch[kk].getValue('hours');
                    //nlapiLogExecution("DEBUG", "hours===========", hours);
                    var approvl = retSearch[kk].getValue('supervisorapproval');
                    var status = retSearch[kk].getValue('status');
                    var recType = retSearch[kk].getValue('type');
                    var employee = retSearch[kk].getText('employee');
                    var employeeID = retSearch[kk].getValue('employee');
                    var project = retSearch[kk].getValue('customer');
                    var memo = retSearch[kk].getValue('memo');
                    var equipmentName = retSearch[kk].getValue('custentity_equipment', 'customer');
                    var employeeCode = '';
                    var firstName = '';
                    var lastName = '';
                    var jobTitle = '';
                    if (employeeID) {
                        employeeCode = nlapiLookupField('employee', employeeID, 'entityid');
                        firstName = nlapiLookupField('employee', employeeID, 'firstname');
                        lastName = nlapiLookupField('employee', employeeID, 'lastname');
                        jobTitle = nlapiLookupField('employee', employeeID, 'title');

                    }
                    if (approvl == 'T') {
                        approvl = 'Yes';
                    } else {
                        approvl = 'No';
                    }

                    nlapiSelectNewLineItem('recmachcustrecord_time_track_ref');
                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_date', date, true, true);
                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_item', item, true, true);
                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_duration', hours, true, true);
                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_approved', approvl, true, true);
                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_employee_code', employeeCode, true, true);
                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_emp', firstName + '&nbsp;' + lastName, true, true);
                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_designation', jobTitle, true, true);

                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_remarks', memo, true, true);
                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_project', project, true, true);
                    nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_equipment', equipmentName, true, true);
                    // nlapiSetCurrentLineItemValue('recmachcustrecord_time_track_ref', 'custrecord_td_type', recType, true, true);
                    nlapiCommitLineItem('recmachcustrecord_time_track_ref');
                }
            }
        } catch (err) {
            nlapiLogExecution("DEBUG", "err----");
        }
    }
}