function beforeLoadAction(type, form, request){
   form.removeButton('resetter');
	nlapiSetFieldDisabled("altname",true);
	var currentContext = nlapiGetContext(); 	
  var userrole = currentContext.getRole();
	if( (currentContext.getExecutionContext() == 'userinterface') && (type == 'view'))
	{		
		var tsstatus = nlapiGetFieldValue("custrecord_timesheet_status");	
		if(tsstatus == '1'){
			var htmlHeader = form.addField('custpage_header', 'inlinehtml').setLayoutType('outsideabove', 'startrow');
			htmlHeader.setDefaultValue('<div style="background-color: #d5e0ec;display: inline-block;font-size: 14px;font-weight: bold;left: 345px;margin: 0 0 2px;padding: 6px;position: relative;text-transform: uppercase;top: -36px;white-space: nowrap;">Timesheet Posted.</div>');
          if(userrole != 3){
           form.removeButton('edit'); 
          }		
			
			nlapiSetFieldDisplay("custrecord_actual_complete_unit_th", true);			
			nlapiSetFieldDisplay("custrecord_actual_part_unit_th", true);
			nlapiSetFieldDisplay("custrecord_actual_extra_hours_th", true);
			nlapiSetFieldDisplay("custrecord_calculate_complete_unit_th", true);
			nlapiSetFieldDisplay("custrecord_calc_part_unit_th", true);
			nlapiSetFieldDisplay("custrecord_calc_extra_hrs_th", true);
			nlapiSetFieldDisplay("custrecord_calc_holiday_hrs", true);
			
			var tsheaderID = nlapiGetFieldValue("name");
			form.addButton('custpage_ts_breakdown','Add Breakdown Time','addBreakdownts('+tsheaderID+')');
		
			
		}else if(tsstatus == 7){
			var htmlHeader = form.addField('custpage_header', 'inlinehtml').setLayoutType('outsideabove', 'startrow');
			htmlHeader.setDefaultValue('<div style="background-color: #d5e0ec;display: inline-block;font-size: 14px;font-weight: bold; margin: 0 0 2px;padding: 6px;position: relative;text-transform: uppercase;top: -27px;   white-space: nowrap;">Timesheet Cancelled.</div>');
			form.removeButton('edit');
					
		}else{	
			var prid =	nlapiGetFieldValue("custrecord_custom_projectid_ts");
			var filter = ["custrecord_timeseet_dtls_etsno","anyof",nlapiGetRecordId()];
			var t = nlapiSearchRecord("customrecord_timesheet_details", "customsearch_timesheet_details_exist",filter);
			if(t && currentContext.getRoleCenter() != 'PROJECTCENTER'){
				form.addButton('custpage_bill_tsbtn', 'Post Timesheet', 'postTimesheetGen('+prid+')');
			}else{
				var hffilter = ["custrecord_ts_header_etsno_hf","anyof",nlapiGetRecordId()];
				var h = nlapiSearchRecord("customrecord_holiday_friday_ts_details", "customsearch_holiday_timesheet_exist",hffilter);
				if(h && currentContext.getRoleCenter() != 'PROJECTCENTER'){
					form.addButton('custpage_bill_tsbtn', 'Post Timesheet', 'postTimesheetGen('+prid+')');					
				}	
			}
           form.addButton('custpage_timsheet_duplicate', 'Multi Timeentry', 'timesheetLineItem('+nlapiGetRecordId()+')');
		
			nlapiSetFieldDisplay("custrecord_actual_complete_unit_th", false);			
			nlapiSetFieldDisplay("custrecord_actual_part_unit_th", false);
			nlapiSetFieldDisplay("custrecord_actual_extra_hours_th", false);
			nlapiSetFieldDisplay("custrecord_calculate_complete_unit_th", false);
			nlapiSetFieldDisplay("custrecord_calc_part_unit_th", false);
			nlapiSetFieldDisplay("custrecord_calc_extra_hrs_th", false);
			nlapiSetFieldDisplay("custrecord_calc_holiday_hrs", false);	
			var raid = nlapiGetFieldValue("custrecord_timesheet_ra_id");		
			var tsid = nlapiGetFieldValue("name");		
var prid =	nlapiGetFieldValue("custrecord_custom_projectid_ts");
			form.addButton('custpage_print_onletterh','Print','printOnLetterhead('+raid+','+tsid+')');
			form.addButton('custpage_change_date','Change Date','editTsDates('+tsid+')');
          if(currentContext.getRoleCenter() == 'ACCOUNTCENTER' || currentContext.getRoleCenter() == 'BASIC'){
            form.addButton('custpage_ratechange', 'Change Rate & Unit', 'rateandunitChange('+raid+','+tsid+')');
          }
form.addButton('custpage_managets', 'Manage Timesheet', 'manageTimesheet('+prid+','+raid+')');
			}
		
	}   
	if(type == 'edit'){
		form.addButton('custpage_timsheet_duplicate', 'Multi Timeentry', 'timesheetLineItem('+nlapiGetRecordId()+')');
		var tsDetailCnt = nlapiGetLineItemCount("recmachcustrecord_timeseet_dtls_etsno");
		var hfDetailCnt = nlapiGetLineItemCount("recmachcustrecord_ts_header_etsno_hf");
		var prid =	nlapiGetFieldValue("custrecord_custom_projectid_ts");
		if(tsDetailCnt > 0 && currentContext.getRoleCenter() != 'PROJECTCENTER'){		
			form.addButton('custpage_bill_tsbtn', 'Post Timesheet', 'postTimesheetGen('+prid+')');
		}else if(hfDetailCnt > 0 && currentContext.getRoleCenter() != 'PROJECTCENTER'){
			form.addButton('custpage_bill_tsbtn', 'Post Timesheet', 'postTimesheetGen('+prid+')');
		}
		nlapiSetFieldDisplay("custrecord_actual_complete_unit_th", false);			
		nlapiSetFieldDisplay("custrecord_actual_part_unit_th", false);
		nlapiSetFieldDisplay("custrecord_actual_extra_hours_th", false);
		nlapiSetFieldDisplay("custrecord_calculate_complete_unit_th", false);
		nlapiSetFieldDisplay("custrecord_calc_part_unit_th", false);
		nlapiSetFieldDisplay("custrecord_calc_extra_hrs_th", false);
		nlapiSetFieldDisplay("custrecord_calc_holiday_hrs", false);	
		var raid = nlapiGetFieldValue("custrecord_timesheet_ra_id");		
		var tsid = nlapiGetFieldValue("name");	
		var tsstatus = nlapiGetFieldValue("custrecord_timesheet_status");
		if(tsstatus != 7){
			form.addButton('custpage_print_onletterh','Print','printOnLetterhead('+raid+','+tsid+')');		
			form.addButton('custpage_change_date','Change Date','editTsDates('+tsid+')');
            if(currentContext.getRoleCenter() == 'ACCOUNTCENTER' || currentContext.getRoleCenter() == 'BASIC'){
			form.addButton('custpage_ratechange', 'Change Rate & Unit', 'rateandunitChange('+raid+','+tsid+')');
            }
			form.addButton('custpage_managets', 'Manage Timesheet', 'manageTimesheet('+prid+','+raid+')');
		}else{
form.removeButton('save');
form.removeButton('reset');
			var htmlHeader = form.addField('custpage_header', 'inlinehtml').setLayoutType('outsideabove', 'startrow');
			htmlHeader.setDefaultValue('<div style="background-color: #d5e0ec;display: inline-block;font-size: 14px;font-weight: bold; margin: 0 0 2px;padding: 6px;position: relative;text-transform: uppercase;top: -37px;   white-space: nowrap;">Timesheet Cancelled.</div>');
		}
    }
	form.setScript('customscript_common_script');
}
