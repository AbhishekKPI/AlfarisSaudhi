function beforeloadAction(type, form, request) {
	var currentContext = nlapiGetContext();
	if( (currentContext.getExecutionContext() == 'userinterface') && (type == 'view'))
	{
		var tsID = nlapiGetFieldValue("recordid");
		var tsStatus = nlapiGetFieldValue("custrecord_bd_timesheet_status");
		if(tsStatus == 1){
			var htmlHeader = form.addField('custpage_header', 'inlinehtml').setLayoutType('outsideabove', 'startrow');
			htmlHeader.setDefaultValue('<div style="background-color: #d5e0ec;display: inline-block;font-size: 14px;font-weight: bold;left: 59px;margin: 0 0 2px;padding: 6px;position: relative;text-transform: uppercase;top: -30px;white-space: nowrap;">Time Sheet Posted.</div>');
			form.removeButton('edit');
				
			
		}else{
			
			form.addButton('custpage_bd_tsbtn', 'Post Breakdown Timesheet', 'postBreakdownTimesheet('+tsID+','+nlapiGetFieldValue("custrecord_bd_existing_timesheet_id")+')');
	  }
	}
	var tsheadID = request.getParameter('tsheadID');
	if(tsheadID){		
		var filter = ["custrecord_bd_existing_timesheet_id","equalto",tsheadID];
		var res = nlapiSearchRecord("customrecord_breakdown_timesheet_header", "customsearch_breakdown_timesheet_exist", filter);
			
		if(res == null){
			if(type == 'create'){		
				var record = nlapiLoadRecord("customrecord_time_sheet_header", tsheadID);	
				nlapiSetFieldValue("custrecord_bd_existing_timesheet_id", tsheadID);
				nlapiSetFieldValue("custrecord_bd_custom_ets_no", record.getFieldValue("custrecord_custom_ets_no"));
				nlapiSetFieldValue("custrecord_bd_register_number", record.getFieldValue("custrecord_register_number"));
				nlapiSetFieldValue("custrecord_bd_timesheet_customer", record.getFieldValue("custrecord_timesheet_customer"));
				nlapiSetFieldValue("custrecord_bd_timesheet_resource", record.getFieldValue("custrecord_timesheet_resource"));
				nlapiSetFieldValue("custrecord_bd_timesheet_item", record.getFieldValue("custrecord_timesheet_item"));
				nlapiSetFieldValue("custrecord_bd_timesheet_itemrate", record.getFieldValue("custrecord_timesheet_itemrate"));
				nlapiSetFieldValue("custrecord_bd_timesheet_subsidiary", record.getFieldValue("custrecord_timesheet_subsidiary"));
				nlapiSetFieldValue("custrecord_bd_timesheet_salesorder", record.getFieldValue("custrecord_timesheet_salesorder"));
				nlapiSetFieldValue("custrecord_bd_timesheet_start_date", record.getFieldValue("custrecord_timesheet_start_date"));
				nlapiSetFieldValue("custrecord_td_timesheet_item_unit", record.getFieldValue("custrecord_timesheet_item_unit"));
				nlapiSetFieldValue("custrecord_td_timesheet_ra_id", record.getFieldValue("custrecord_timesheet_ra_id"));
				nlapiSetFieldValue("custrecord_bd_minimum_hrs_timesheet", record.getFieldValue("custrecord_minimum_hrs_timesheet"));
				nlapiSetFieldValue("custrecord_bd_minimum_days_timesheet", record.getFieldValue("custrecord_minimum_days_timesheet"));
				//nlapiSetFieldValue("custrecord_bd_timesheet_status", record.getFieldValue("custrecord_timesheet_status"));
				nlapiSetFieldValue("custrecord_bd_timesheet_enddate", record.getFieldValue("custrecord_timesheet_enddate"));
				nlapiSetFieldValue("custrecord_td_custom_projectid_ts", record.getFieldValue("custrecord_custom_projectid_ts"));	
				nlapiSetFieldValue("custrecord_td_timesheet_sitedetails", record.getFieldValue("custrecord_timesheet_sitedetails"));	
				nlapiSetFieldValue("custrecord_td_timesheet_remarks", record.getFieldValue("custrecord_timesheet_remarks"));	
				nlapiSetFieldValue("custrecord_bd_item_id_hdnref", record.getFieldValue("custrecord_item_id_hdnref"));	
			}
		}else{
			var recID = res[0].getValue("internalid");
			nlapiSetRedirectURL('RECORD', "customrecord_breakdown_timesheet_header", recID, false);
		}
	}
	form.setScript('customscript_common_script');

}