function rateandUnitChange(request, response) {	
	if (request.getMethod() == 'GET') {
		var timesheetID = request.getParameter("tsid");		
		var recordData = nlapiLoadRecord("customrecord_time_sheet_header", timesheetID);
		var form = nlapiCreateForm('Change Rate And Unit');
		
		var tsid = form.addField('custpage_tsid','text',"TSID");
		tsid.setDefaultValue(timesheetID);
		tsid.setDisplayType("hidden");
		var raid = form.addField('custpage_raid','text',"RAID");
		raid.setDisplayType("hidden");
		var aa = form.addField('custpage_minhrs','text',"Minimum Hours");
		aa.setDefaultValue(recordData.getFieldValue("custrecord_minimum_hrs_timesheet"));
		aa.setMandatory(true);
		var bb = form.addField('custpage_mindays','text',"Minimum Days");
		bb.setDefaultValue(recordData.getFieldValue("custrecord_minimum_days_timesheet"));
		bb.setMandatory(true);
		var cc = form.addField('custpage_rate','text',"Rate");
		cc.setDefaultValue(recordData.getFieldValue("custrecord_timesheet_itemrate"));
		cc.setMandatory(true);
		var dd = form.addField('custpage_unit','select',"Unit","customlist_time_units");
		if(recordData.getFieldValue("custrecord_timesheet_item_unit")=='Hour'){
			dd.setDefaultValue("1");
		}else if(recordData.getFieldValue("custrecord_timesheet_item_unit")=='Day'){
			dd.setDefaultValue("2");
		}else if(recordData.getFieldValue("custrecord_timesheet_item_unit")=='Week'){
			dd.setDefaultValue("3");
		}else if(recordData.getFieldValue("custrecord_timesheet_item_unit")=='Month'){
			dd.setDefaultValue("4");
		}else if(recordData.getFieldValue("custrecord_timesheet_item_unit")=='Lumpsum'){
			dd.setDefaultValue("5");
		}else{
			dd.setDefaultValue("6");
		}
		
		dd.setMandatory(true);
		var ee = form.addField('custpage_notes','textarea',"Notes");
		ee.setMandatory(true);
		form.addSubmitButton("Submit");	form.addButton("custpage_cancelbutton","Cancel","cancelChangeRateUnit("+timesheetID+");");
        form.setScript('customscript_common_script');
	    response.writePage(form);
	}
	if (request.getMethod() == 'POST') {
		var timesheetID = request.getParameter("custpage_tsid");
		var minhrs = request.getParameter("custpage_minhrs");
		var mindays = request.getParameter("custpage_mindays");
		var rate = request.getParameter("custpage_rate");
		var reason = request.getParameter("custpage_notes");
		var unit = "";
		if(request.getParameter("custpage_unit")=='1'){
			unit = "Hour";
		}else if(request.getParameter("custpage_unit")=='2'){
			unit = "Day";
		}else if(request.getParameter("custpage_unit")=='3'){
			unit = "Week";
		}else if(request.getParameter("custpage_unit")=='4'){
			unit = "Month";
		}else if(request.getParameter("custpage_unit")=='5'){
			unit = "Lumpsum";
		}else{
			unit = "Trip";
		}		
	nlapiSubmitField("customrecord_time_sheet_header", timesheetID, "custrecord_minimum_hrs_timesheet", minhrs);
	nlapiSubmitField("customrecord_time_sheet_header", timesheetID, "custrecord_minimum_days_timesheet", mindays);
	nlapiSubmitField("customrecord_time_sheet_header", timesheetID, "custrecord_timesheet_itemrate", rate);
	nlapiSubmitField("customrecord_time_sheet_header", timesheetID, "custrecord_timesheet_item_unit", unit);
	nlapiSubmitField("customrecord_time_sheet_header", timesheetID, "custrecord_rate_unit_change_reason", reason);
	nlapiSetRedirectURL('RECORD', "customrecord_time_sheet_header", timesheetID, true);
	}
}