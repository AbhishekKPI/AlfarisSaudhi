function generateTimesheetAction(request, response) {
	var gen = request.getParameter("gen");
	if(gen == 1){
		var form = nlapiCreateForm('Generate Timesheet');
	}else{
		var form = nlapiCreateForm('Manage Timesheet');
	}
	form.setScript('customscript_common_script');
	if (request.getMethod() == 'GET') {
		
		var param = request.getParameter("raid");
		var gen = request.getParameter("gen");
		var projsub = request.getParameter("projsub");
      var projRes  = form.addField('custpage_projid', 'text', 'projsub');
			projRes.setDisplayType("hidden");
			projRes.setDefaultValue(projsub);	
		
		if(gen == 1){			
			var filter = ["internalid","anyof",param];
			var resOut = nlapiSearchRecord('resourceallocation','customsearch_resource_details_subtab',filter);
			var siteDetails = '';
			if(resOut){
				siteDetails = resOut["0"].getValue("custevent_quote_location",null,"min");
			}
			
			//Genearte Additional TS
			var ra  = form.addField('custpage_raid', 'text', 'RA ID');
			ra.setDisplayType("hidden");
			ra.setDefaultValue(param);	
			
			
			
			var raEnddate = form.addField('custpage_raenddate', 'date', 'RA Enddate');
			raEnddate.setDefaultValue(resOut["0"].getValue("enddate",null,"min"));
			raEnddate.setDisplayType("hidden");
			
			var ge  = form.addField('custpage_gen', 'text', 'Gen');
			ge.setDisplayType("hidden");
			ge.setDefaultValue(gen);
			
			form.addField('custpage_stdate', 'date', 'Start Date').setLayoutType("midrow", "startrow");
			form.addField('custpage_enddate', 'date', 'End Date').setLayoutType("midrow", "startrow");
			var siteDetgen = form.addField('custpage_sitedetails', 'text', 'Site Details').setLayoutType("outsidebelow", "none");
			siteDetgen.setDefaultValue(siteDetails);
			form.addField('custpage_remarks', 'textarea', 'Remarks').setLayoutType("outsidebelow", "startcol");
			
		}else if(param){
			
			var filter = ["internalid","anyof",param];
			var resOut = nlapiSearchRecord('resourceallocation','customsearch_resource_details_subtab',filter);
			var siteDetails = '';
			if(resOut){
				siteDetails = resOut["0"].getValue("custevent_quote_location",null,"min");
			}
			var ra  = form.addField('custpage_raid', 'text', 'RA ID');
			ra.setDisplayType("hidden");
			ra.setDefaultValue(param);	
			form.addField('custpage_stdate', 'date', 'Start Date').setLayoutType("midrow", "startrow");
			form.addField('custpage_enddate', 'date', 'End Date').setLayoutType("midrow", "startrow");
			var siteDet = form.addField('custpage_sitedetails', 'text', 'Site Details').setLayoutType("outsidebelow", "none");
			siteDet.setDefaultValue(siteDetails);
			form.addField('custpage_remarks', 'textarea', 'Remarks').setLayoutType("outsidebelow", "startcol");
		}else{			
			var ts  = form.addField('custpage_tsid', 'text', 'TS ID');
			ts.setDisplayType("hidden");
			ts.setDefaultValue(request.getParameter("tsid"));
			
			
			
			var tsRec = nlapiLoadRecord("customrecord_time_sheet_header", request.getParameter("tsid"));
			var sdate = tsRec.getFieldValue("custrecord_timesheet_start_date");
			var edate = tsRec.getFieldValue("custrecord_timesheet_enddate");
			var remarks = tsRec.getFieldValue("custrecord_timesheet_remarks");
			var siteDetails = tsRec.getFieldValue("custrecord_timesheet_sitedetails");
			
			var tsRAID = tsRec.getFieldValue("custrecord_timesheet_ra_id");
			var raRes = nlapiLoadRecord("resourceallocation", tsRAID);
			var raEnddate = raRes.getFieldValue("enddate");
			
			var tt = form.addField('custpage_raedate', 'date', 'Ra End Date');
			tt.setLayoutType("midrow", "startrow");
			tt.setDefaultValue(raEnddate);
			tt.setDisplayType("hidden");
			
			
			var mm = form.addField('custpage_raupdateid', 'text', 'Ra UpdateID');
			mm.setLayoutType("midrow", "startrow");
			mm.setDefaultValue(tsRAID);
			mm.setDisplayType("hidden");
			
			var s = form.addField('custpage_stdate', 'date', 'Start Date');
			s.setLayoutType("midrow", "startrow");
			s.setDefaultValue(sdate);
			
			var e = form.addField('custpage_enddate', 'date', 'End Date');
			e.setLayoutType("midrow", "startrow");
			e.setDefaultValue(edate);
			
			var siteDet = form.addField('custpage_sitedetails', 'text', 'Site Details').setLayoutType("outsidebelow", "none");
			siteDet.setDefaultValue(siteDetails);
			
			var f = form.addField('custpage_remarks', 'textarea', 'Remarks').setLayoutType("outsidebelow", "startcol");		
			f.setDefaultValue(remarks);
			
			
			
		}
		
		form.addSubmitButton("Submit");	
	    response.writePage( form );	 	   
	}
	if(request.getMethod() == 'POST'){		
		var param = request.getParameter("custpage_raid");	
		var tsid = request.getParameter("custpage_tsid");
		var stDate = request.getParameter("custpage_stdate");
		var enDate = request.getParameter("custpage_enddate");
		var remarks = request.getParameter("custpage_remarks");
		var sitedetails = request.getParameter("custpage_sitedetails");
		var raEnddate = request.getParameter("custpage_raenddate");
		var projSubsi = request.getParameter("custpage_projid");
		
		
		
		var UpdateRaEdate = request.getParameter("custpage_raedate");
		var UpdateRaId = request.getParameter("custpage_raupdateid");
		
		
		var gen  = request.getParameter("custpage_gen");
		if(gen == 1){
			var timesheetfilter =["CUSTRECORD_TIMESHEET_RA_ID.internalid","is",param];
			var timesheetres = nlapiSearchRecord('customrecord_time_sheet_header','customsearchtimesheetexist',timesheetfilter);
			
			var filter = ["internalid","anyof",param];
			var resOut = nlapiSearchRecord('resourceallocation','customsearch_resource_details_subtab',filter);
			for(var i=0;i<1;i++){
			var subsi = timesheetres[i].getValue("custrecord_timesheet_subsidiary");
			var etsNoAuto = autoIDprocess(projSubsi);
			
			var timesheet = nlapiCreateRecord('customrecord_time_sheet_header', {recordmode: 'dynamic'});
			timesheet.setFieldValue("custrecord_timesheet_start_date", stDate);					
			timesheet.setFieldValue("custrecord_timesheet_enddate", enDate);					
			timesheet.setFieldValue("custrecord_register_number", timesheetres[i].getValue("custrecord_register_number"));
			timesheet.setFieldValue("custrecord_timesheet_customer", timesheetres[i].getValue("custrecord_timesheet_customer"));
			timesheet.setFieldValue("custrecord_timesheet_resource", timesheetres[i].getValue("custrecord_timesheet_resource"));
			timesheet.setFieldValue("custrecord_minimum_hrs_timesheet", timesheetres[i].getValue("custrecord_minimum_hrs_timesheet"));				
			timesheet.setFieldValue("custrecord_minimum_days_timesheet", timesheetres[i].getValue("custrecord_minimum_days_timesheet"));		
			timesheet.setFieldValue("custrecord_timesheet_item", timesheetres[i].getValue("custrecord_timesheet_item"));
			timesheet.setFieldValue("custrecord_timesheet_itemrate", timesheetres[i].getValue("custrecord_timesheet_itemrate"));
			timesheet.setFieldValue("custrecord_timesheet_salesorder", timesheetres[i].getValue("custrecord_timesheet_salesorder"));
			timesheet.setFieldValue("custrecord_timesheet_subsidiary", timesheetres[i].getValue("custrecord_timesheet_subsidiary"));
			timesheet.setFieldValue("custrecord_timesheet_item_unit", timesheetres[i].getValue("custrecord_timesheet_item_unit"));
			timesheet.setFieldValue("custrecord_timesheet_ra_id", timesheetres[i].getValue("custrecord_timesheet_ra_id"));
			timesheet.setFieldValue("custrecord_item_id_hdnref", timesheetres[i].getValue("custrecord_item_id_hdnref"));				
			timesheet.setFieldValue("custrecord_custom_ets_no", etsNoAuto);
			timesheet.setFieldValue("altname", etsNoAuto);	
			timesheet.setFieldValue("custrecord_timesheet_status", 2);
			timesheet.setFieldValue("custrecord_custom_projectid_ts", timesheetres[i].getValue("custrecord_custom_projectid_ts"));
			timesheet.setFieldValue("custrecord_sales_order", timesheetres[i].getValue("custrecord_sales_order"));			
			timesheet.setFieldValue("custrecord_project_name_with_id", timesheetres[i].getValue("custrecord_custom_projectid_ts"));
			timesheet.setFieldValue("custrecord_timesheet_remarks", remarks);
			timesheet.setFieldValue("custrecord_timesheet_sitedetails", sitedetails);
			timesheetID = nlapiSubmitRecord(timesheet);
			if(timesheetID){
				if(projSubsi == "1"){	
					 	var res = nlapiLoadRecord("customrecord_custom_configuration", 2);
					 	var currNo = +res.getFieldValue("custrecord_current_number") + +1;
						nlapiSubmitField("customrecord_custom_configuration", 2, "custrecord_current_number", currNo);
					 }else if(projSubsi == "2"){
						 var res = nlapiLoadRecord("customrecord_custom_configuration", 1);
						 	var currNo = +res.getFieldValue("custrecord_current_number") + +1;
							nlapiSubmitField("customrecord_custom_configuration", 1, "custrecord_current_number", currNo);
						
				}else if(projSubsi == "3"){
					var res = nlapiLoadRecord("customrecord_custom_configuration", 8);
					var currNo = +res.getFieldValue("custrecord_current_number") + +1;
					nlapiSubmitField("customrecord_custom_configuration", 8, "custrecord_current_number", currNo);
				}  else if(projSubsi == "8"){
					var res = nlapiLoadRecord("customrecord_custom_configuration", 17);
					var currNo = +res.getFieldValue("custrecord_current_number") + +1;
					nlapiSubmitField("customrecord_custom_configuration", 17, "custrecord_current_number", currNo); 
			}
		}
			
			var enDateStr = nlapiStringToDate(enDate);
			var raEnddateStr = nlapiStringToDate(raEnddate);
			var datediff = date_diff_indays(raEnddateStr,enDateStr);			
			if(datediff > 0){				
				nlapiSubmitField("resourceallocation", param, "enddate", enDate);
			}			
			form.addField('custpage_ss', 'inlinehtml', 'End Date').setDefaultValue('<div>Additional Timesheet Generated Successfully.</div>');
		 } 
				
		}else if(tsid){
			
			nlapiSubmitField("customrecord_time_sheet_header", tsid, "custrecord_timesheet_start_date", stDate);
			nlapiSubmitField("customrecord_time_sheet_header", tsid, "custrecord_timesheet_enddate", enDate);
			nlapiSubmitField("customrecord_time_sheet_header", tsid, "custrecord_timesheet_sitedetails", sitedetails);
			nlapiSubmitField("customrecord_time_sheet_header", tsid, "custrecord_timesheet_remarks", remarks);
						
			var enDateStr = nlapiStringToDate(enDate);
			var UpdateRaEdateStr = nlapiStringToDate(UpdateRaEdate);			
			var datediff = date_diff_indays(UpdateRaEdateStr,enDateStr);
			if(datediff > 0){
				nlapiSubmitField("resourceallocation", UpdateRaId, "enddate", enDate);
			}			
			form.addField('custpage_ss', 'inlinehtml', 'End Date').setDefaultValue('<div>Timesheet Updated Successfully.</div>');
			
		}else{
		var filter = ["internalid","anyof",param];		
		var resOut = nlapiSearchRecord('resourceallocation','customsearch_resource_details_subtab',filter);
		//form.addField('custpage_ss', 'text', 'End Date').setDefaultValue(param);
		var timesheetID = '';
		if(resOut){	
			var timesheetfilter = ["custrecord_timesheet_ra_id","is",param];
			var timesheetres = nlapiSearchRecord('customrecord_time_sheet_header','customsearchtimesheetexist',timesheetfilter);
			if(timesheetres){
				 timesheetID = timesheetres["0"].getValue("id");				
			}else{
				
				var subsi = resOut["0"].getValue("subsidiarynohierarchy","job","min");
				var etsNoAuto = '';					
				var timesheetfilter = ["custrecord_timesheet_subsidiary","is",subsi];
				var timesheetres = nlapiSearchRecord('customrecord_time_sheet_header','customsearch_etsnumber_generation_search',timesheetfilter);
				if(timesheetres){
					nlapiLogExecution("DEBUG","subsi1",subsi);
					if(timesheetres["0"].getValue("custrecord_custom_ets_no",null,"max") == ""){							
					if(subsi == 'MMGT'){
						etsNoAuto = 1860;
					}else if(subsi == 'AFIHER Abu Dhabi'){
						etsNoAuto = 24501;
					}else if(subsi == 'AFER Dubai'){
					etsNoAuto = 20470;
				}else if(subsi == "Faris AL Arab"){
					nlapiLogExecution("DEBUG","subsi2",subsi);
					etsNoAuto = 1;
				}
				}else{			
					etsNoAuto = (parseInt(timesheetres["0"].getValue("custrecord_custom_ets_no",null,"max"))+parseInt(1));
				}
			}else{
				if(subsi == 'MMGT'){
						etsNoAuto = 1860;
					}else if(subsi == 'AFIHER Abu Dhabi'){
						etsNoAuto = 24501;
					}else if(subsi == 'AFER Dubai'){
					etsNoAuto = 20470;
				}else if(subsi == "Faris AL Arab"){
					nlapiLogExecution("DEBUG","subsi3",subsi);
					etsNoAuto = 1;
				}
			}		
				
				var etsNoAuto = autoIDprocess(projSubsi);
				
				
				var timesheet =nlapiCreateRecord('customrecord_time_sheet_header', {recordmode: 'dynamic'});
				timesheet.setFieldValue("custrecord_timesheet_customer", resOut["0"].getValue("customer",null,"min"));
				timesheet.setFieldValue("custrecord_timesheet_resource", resOut["0"].getValue("resource",null,"min"));
				timesheet.setFieldValue("custrecord_register_number", resOut["0"].getValue("custentity_regno_vendoreq","resource","min"));
				timesheet.setFieldValue("custrecord_timesheet_item", resOut["0"].getValue("custevent_service_item_so",null,"min"));
				timesheet.setFieldValue("custrecord_timesheet_item_unit", resOut["0"].getValue("custevent_ra_sales_unit",null,"min"));
				timesheet.setFieldValue("custrecord_timesheet_itemrate", resOut["0"].getValue("custevent_item_rate",null,"min"));
				timesheet.setFieldValue("custrecord_timesheet_salesorder", resOut["0"].getValue("custevent_project_salesorder",null,"min"));
				timesheet.setFieldValue("custrecord_timesheet_subsidiary", resOut["0"].getValue("subsidiarynohierarchy","job","min"));
				timesheet.setFieldValue("custrecord_timesheet_ra_id", resOut["0"].getValue("id",null,"min"));
				timesheet.setFieldValue("custrecord_item_id_hdnref", resOut["0"].getValue("custevent_custom_hdn_itemid",null,"min"));				
				timesheet.setFieldValue("custrecord_minimum_hrs_timesheet", resOut["0"].getValue("custevent_minimum_hours_hdn",null,"min"));				
				timesheet.setFieldValue("custrecord_minimum_days_timesheet", resOut["0"].getValue("custevent_minimum_days_hdn",null,"min"));
				timesheet.setFieldValue("custrecord_timesheet_start_date", stDate);
				timesheet.setFieldValue("custrecord_timesheet_enddate", enDate);
				timesheet.setFieldValue("custrecord_custom_ets_no", etsNoAuto);	
				timesheet.setFieldValue("altname", etsNoAuto);					
				timesheet.setFieldValue("custrecord_timesheet_status", 2);				
				timesheet.setFieldValue("custrecord_custom_projectid_ts", resOut["0"].getValue("internalid","job","min"));
				timesheet.setFieldValue("custrecord_sales_order", resOut["0"].getValue("internalid","CUSTEVENT_PROJECT_SALESORDER","min"));
				timesheet.setFieldValue("custrecord_project_name_with_id", resOut["0"].getValue("internalid","job","min"));
				timesheet.setFieldValue("custrecord_timesheet_remarks", remarks);
				timesheet.setFieldValue("custrecord_timesheet_sitedetails", sitedetails);
				timesheetID = nlapiSubmitRecord(timesheet);
				if(timesheetID){
					if(projSubsi == "1"){	
						 	var res = nlapiLoadRecord("customrecord_custom_configuration", 2);
						 	var currNo = +res.getFieldValue("custrecord_current_number") + +1;
							nlapiSubmitField("customrecord_custom_configuration", 2, "custrecord_current_number", currNo);
						 }else if(projSubsi == "2"){
							 var res = nlapiLoadRecord("customrecord_custom_configuration", 1);
							 	var currNo = +res.getFieldValue("custrecord_current_number") + +1;
								nlapiSubmitField("customrecord_custom_configuration", 1, "custrecord_current_number", currNo);
							
					}else if(projSubsi == "3"){
						var res = nlapiLoadRecord("customrecord_custom_configuration", 8);
						var currNo = +res.getFieldValue("custrecord_current_number") + +1;
						nlapiSubmitField("customrecord_custom_configuration", 8, "custrecord_current_number", currNo);
					}     else if(projSubsi == "8"){
					var res = nlapiLoadRecord("customrecord_custom_configuration", 17);
					var currNo = +res.getFieldValue("custrecord_current_number") + +1;
					nlapiSubmitField("customrecord_custom_configuration", 17, "custrecord_current_number", currNo); 
			}
				}
				
					nlapiSubmitField("resourceallocation", resOut["0"].getValue("id",null,"min"), "enddate", enDate);
					nlapiSubmitField("resourceallocation", resOut["0"].getValue("id",null,"min"), "startdate", stDate);
										
						
				form.addField('custpage_ss', 'inlinehtml', 'End Date').setDefaultValue('<div>Timesheet Generated Successfully.</div>');
			 }
		  }	
		}
		
		response.writePage( form );	
	}
}
function date_diff_indays(date1, date2) {
	dt1 = new Date(date1);
	dt2 = new Date(date2);
	return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}
function autoIDprocess(subsidiary){
	if(subsidiary == "1"){
		 var res = nlapiLoadRecord("customrecord_custom_configuration", 2);
	}else if(subsidiary == "2"){
		 var res = nlapiLoadRecord("customrecord_custom_configuration", 1);
	}else if(subsidiary == "3"){
		var res = nlapiLoadRecord("customrecord_custom_configuration", 8);
	}else if(subsidiary == "8"){
		nlapiLogExecution("DEBUG","inside8","inside8");
		var res = nlapiLoadRecord("customrecord_custom_configuration", 17);
	} 
    var minimumDigit = res.getFieldValue("custrecord_minimum_digit");
    var currentNo = res.getFieldValue("custrecord_current_number");
    var prefix = res.getFieldValue("custrecord_prefix");      
    var finalno = parseInt(currentNo) + parseInt(1);
    var IDGenerated = leftPad(finalno, minimumDigit);
    var finalID = prefix+""+IDGenerated;
    return finalID;
}
