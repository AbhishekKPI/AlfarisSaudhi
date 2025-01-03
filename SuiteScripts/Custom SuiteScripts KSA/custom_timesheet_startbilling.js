function pageInitAction(type){
	if(type == 'create'){		
		//document.getElementById("tbl_submitter").style.display = 'none';
		
		document.getElementById("submitter").value = 'Post Timesheet'; 
		/*document.getElementById("tbl__cancel").style.display = 'none';
		document.getElementById("tbl_resetter").style.display = 'none';*/
		
		//document.getElementById("tbl_secondarysubmitter").style.display = 'none';
		//document.getElementById("tbl_secondary_cancel").style.display = 'none';
		//document.getElementById("tbl_secondaryresetter").style.display = 'none';		
		
	}
		
}
function timeStringToFloat(time) {
	  var hoursMinutes = time.split(/[.:]/);
	  var hours = parseInt(hoursMinutes[0], 10);
	  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
	  return hours + minutes / 60;
	}
function minTommss(minutes){
	 var sign = minutes < 0 ? "-" : "";
	 var min = Math.floor(Math.abs(minutes));
	 var sec = Math.floor((Math.abs(minutes) * 60) % 60);
	 return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
	}
function postTimeSheetAction() {
//document.getElementById("submitter").disabled = true;
   var compunit = nlapiGetFieldValue("custrecord_complete_unit");
   var partunit = nlapiGetFieldValue("custrecord_part_unit");
  if(compunit % 1 != 0 || partunit % 1 !=0){
    alert("Complete and Part Units cannot be in fractions");
    return false;
   }
	var changed =0;
	if(nlapiGetFieldValue("custrecord_actual_complete_unit") != nlapiGetFieldValue("custrecord_complete_unit") || nlapiGetFieldValue("custrecord_actual_part_unit") != nlapiGetFieldValue("custrecord_part_unit") || nlapiGetFieldValue("custrecord_actual_extra_hours") != nlapiGetFieldValue("custrecord_extrs_hours")){
		if(nlapiGetFieldValue("custrecord_reason_for_change") == ""){
			changed = 1;
		}else{
			changed = 0;
		}		
	}
	if(changed == 1){
		alert("Enter the reason for change.");
		return false;
	}else{	
		var btnHtm = '<td valign="top" height="20" nowrap="" id="tdbody_submitter" class="bntBgB"><div style="padding-top: 4px; padding-left: 12px; padding-right: 12px; width: 138px;">Processing..</div></td> <td id="tdrightcap_submitter"> <img width="3" height="50%" border="0" src="/images/nav/ns_x.gif" class="bntRT" alt=""> <img width="3" height="50%" border="0" src="/images/nav/ns_x.gif" class="bntRB" alt=""> </td>';
		document.getElementById("tr_submitter").innerHTML = btnHtm;
		var etsNo = getParameterFromURL("etsno");	
		var filter = ["CUSTRECORD_TIMESHEET_RA_ID.id","equalto",etsNo];
		var resOut = nlapiSearchRecord('resourceallocation','customsearch_resource_details_subtab',filter);
		var subsidiary = '';
		//They are inseting emloyee id
		var employee_resourceID = '';
		var customer_projID = '';
		var itemID = '';
		var mainUnit = '';
		var actETSNO = '';
		var prefix = '';
		var itemfullname  = '';
        var arabicDesc  = '';
		if(resOut){
          
			for(var i=0;i<resOut.length;i++){			
				subsidiary = resOut[i].getValue("subsidiarynohierarchy","job","min");
              
				if(subsidiary =='AFIHER Abu Dhabi'){
					prefix = 'I';
				}else if(subsidiary =='MMGT'){
					prefix = 'M';
				}else if(subsidiary =='AFER Dubai'){
					prefix = 'A';
				}  
				actETSNO = prefix+resOut[i].getValue("custrecord_custom_ets_no","CUSTRECORD_TIMESHEET_RA_ID","min");
				var filter = ["namenohierarchy","contains",subsidiary];
				var subsidiaryRes = nlapiSearchRecord('subsidiary','customsearch_sub_internal_id',filter);
				var subsidiaryID = subsidiaryRes[i].getValue("internalid");
				
				employee_resourceID = resOut[i].getValue("internalid","resource","min");
				customer_projID = resOut[i].getValue("internalid","job","min");
				itemID = resOut[i].getValue("custevent_custom_hdn_itemid",null,"min");				    arabicDesc = resOut[i].getValue("custevent_arabic_description",null,"min");
				mainUnit = resOut[i].getValue("custrecord_timesheet_item_unit","CUSTRECORD_TIMESHEET_RA_ID","min");itemfullname = resOut[i].getValue("custevent_so_item_description",null,"min");
				
			}
		}	
		var completeRate = nlapiGetFieldValue("custrecord_custom_item_rate");
		var startDate = nlapiGetFieldValue("custrecord_pst_timesheet_sdate");
		var enndDatte = nlapiGetFieldValue("custrecord_pst_timesheet_edate");	
		var compunit = nlapiGetFieldValue("custrecord_complete_unit");
		
		var partRate = nlapiGetFieldValue("custrecord_part_unit_rate");
		var partUnit = nlapiGetFieldValue("custrecord_part_unit");
		
		var extraHrsRate = nlapiGetFieldValue("custrecord_extra_hours_rate");
		var exHrs = nlapiGetFieldValue("custrecord_extrs_hours");
		var exHrsflo = timeStringToFloat(exHrs);
		
		var hfhrs = nlapiGetFieldValue("custrecord_holiday_friday_hours");
		var hfhrsflo = timeStringToFloat(hfhrs);
		if(hfhrsflo > 0){
            
			var record = nlapiCreateRecord('timebill');	
			var extrunit = hfhrs;
			//record.setFieldValue("trandate", '15-Mar-2016');
			record.setFieldValue("employee", employee_resourceID);
			record.setFieldValue("customer", customer_projID);	
			record.setFieldValue("hours", extrunit);
			record.setFieldValue("item", itemID);
			record.setFieldValue("price", " ");
			record.setFieldValue("rate", extraHrsRate);
			record.setFieldValue("overriderate", "T");	
			record.setFieldValue("custcol_ts_equipment", 'Holiday(s) Work For '+itemfullname);
			record.setFieldValue("custcol_ts_number", actETSNO);
			record.setFieldValue("custcol_ts_sdate", startDate);
			record.setFieldValue("custcol_ts_edate", enndDatte);
			record.setFieldValue("custcol_ets_no", etsNo);
            record.setFieldValue("custcol_arabic_description", arabicDesc);
			var tt = timeStringToFloat(extrunit);
			var uu = tt.toFixed(2);	
			if(tt > 1){
				record.setFieldValue("custcol_ts_units", uu+' Hours');
			}else{
				record.setFieldValue("custcol_ts_units", uu+' Hour');
			}	
			/*if(mainUnit == 'Lumpsum'){
				record. setFieldValue("isbillable", "F");
			}else if(mainUnit == 'Trip'){
				record. setFieldValue("isbillable", "F");
			}*/		
			
			nlapiSubmitRecord(record);
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_timesheet_status", 1);
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_reason_for_change_th", nlapiGetFieldValue("custrecord_reason_for_change"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_complete_unit_th", nlapiGetFieldValue("custrecord_actual_complete_unit"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_part_unit_th", nlapiGetFieldValue("custrecord_actual_part_unit"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_extra_hours_th", nlapiGetFieldValue("custrecord_actual_extra_hours"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_calc_holiday_hrs", extrunit);
			
		}
		if(exHrsflo > 0){
			var record = nlapiCreateRecord('timebill');	
			var extrunit = nlapiGetFieldValue("custrecord_extrs_hours");
			//record.setFieldValue("trandate", '15-Mar-2016');
			record.setFieldValue("employee", employee_resourceID);
			record.setFieldValue("customer", customer_projID);	
			record.setFieldValue("hours", extrunit);
			record.setFieldValue("item", itemID);
			record.setFieldValue("price", " ");
			record.setFieldValue("rate", extraHrsRate);
			record.setFieldValue("overriderate", "T");	
			record.setFieldValue("custcol_ts_equipment", 'Extra Hrs For '+itemfullname);
			record.setFieldValue("custcol_ts_number", actETSNO);
			record.setFieldValue("custcol_ts_sdate", startDate);
			record.setFieldValue("custcol_ts_edate", enndDatte);
			record.setFieldValue("custcol_ets_no", etsNo);
            record.setFieldValue("custcol_arabic_description", arabicDesc);
			var rr = timeStringToFloat(extrunit);
			var ss = rr.toFixed(2);	
			if(rr > 1){
				record.setFieldValue("custcol_ts_units", ss+' Hours');
			}else{
				record.setFieldValue("custcol_ts_units", ss+' Hour');
			}	
			/*if(mainUnit == 'Lumpsum'){	
				record. setFieldValue("isbillable", "F");
			}else if(mainUnit == 'Trip'){
				record. setFieldValue("isbillable", "F");
			}*/
				
			nlapiSubmitRecord(record);
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_timesheet_status", 1);
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_reason_for_change_th", nlapiGetFieldValue("custrecord_reason_for_change"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_complete_unit_th", nlapiGetFieldValue("custrecord_actual_complete_unit"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_part_unit_th", nlapiGetFieldValue("custrecord_actual_part_unit"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_extra_hours_th", nlapiGetFieldValue("custrecord_actual_extra_hours"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_calc_extra_hrs_th", extrunit);
			
		}
		if(partUnit > 0){
			var record = nlapiCreateRecord('timebill');	
			var parUnit = nlapiGetFieldValue("custrecord_part_unit");
			//record.setFieldValue("trandate", '15-Mar-2016');
			record.setFieldValue("employee", employee_resourceID);
			record.setFieldValue("customer", customer_projID);	
			record.setFieldValue("hours", parUnit);
			record.setFieldValue("item", itemID);
			record.setFieldValue("price", " ");
			record.setFieldValue("rate", partRate);
			record.setFieldValue("overriderate", "T");	
			record.setFieldValue("custcol_ts_equipment", itemfullname);
			record.setFieldValue("custcol_ts_number", actETSNO);
			record.setFieldValue("custcol_ts_sdate", startDate);
			record.setFieldValue("custcol_ts_edate", enndDatte);
			record.setFieldValue("custcol_ets_no", etsNo);
            record.setFieldValue("custcol_arabic_description", arabicDesc);
			var pp = parseFloat(parUnit);
			var qq = pp.toFixed(2);	
			if(pp > 1){
				record.setFieldValue("custcol_ts_units", qq+' Days');	
			}else{
				record.setFieldValue("custcol_ts_units", qq+' Day');
			}		
			/*if(mainUnit == 'Lumpsum'){
				record. setFieldValue("isbillable", "F");
			}else if(mainUnit == 'Trip'){
				record. setFieldValue("isbillable", "F");
			}*/
			nlapiSubmitRecord(record);
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_timesheet_status", 1);
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_reason_for_change_th", nlapiGetFieldValue("custrecord_reason_for_change"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_complete_unit_th", nlapiGetFieldValue("custrecord_actual_complete_unit"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_part_unit_th", nlapiGetFieldValue("custrecord_actual_part_unit"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_extra_hours_th", nlapiGetFieldValue("custrecord_actual_extra_hours"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_calc_part_unit_th", parUnit);
			
		}
		if(compunit > 0){
         
			var record = nlapiCreateRecord('timebill');	
			//record.setFieldValue("trandate", '15-Mar-2016');
			record.setFieldValue("employee", employee_resourceID);
			record.setFieldValue("customer", customer_projID);	
			record.setFieldValue("hours", compunit);
			record.setFieldValue("item", itemID);
			record.setFieldValue("price", " ");
			record.setFieldValue("rate", completeRate);
			record.setFieldValue("overriderate", "T");	
			record.setFieldValue("custcol_ts_equipment", itemfullname);
			record.setFieldValue("custcol_ts_number", actETSNO);
			record.setFieldValue("custcol_ts_sdate", startDate);
			record.setFieldValue("custcol_ts_edate", enndDatte);
			record.setFieldValue("custcol_ets_no", etsNo);
            record.setFieldValue("custcol_arabic_description", arabicDesc);
			var mm = parseFloat(compunit);
			var nn = mm.toFixed(2);
			if(mm > 1){				
				record.setFieldValue("custcol_ts_units", nn+' '+mainUnit+'s');
			}else{
				record.setFieldValue("custcol_ts_units", nn+' '+mainUnit);
			}
			/*if(mainUnit == 'Lumpsum'){
				record. setFieldValue("isbillable", "F");
			}else if(mainUnit == 'Trip'){
				record. setFieldValue("isbillable", "F");
			}*/
			nlapiSubmitRecord(record);
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_timesheet_status", 1);
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_reason_for_change_th", nlapiGetFieldValue("custrecord_reason_for_change"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_complete_unit_th", nlapiGetFieldValue("custrecord_actual_complete_unit"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_part_unit_th", nlapiGetFieldValue("custrecord_actual_part_unit"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_actual_extra_hours_th", nlapiGetFieldValue("custrecord_actual_extra_hours"));
			nlapiSubmitField("customrecord_time_sheet_header", etsNo, "custrecord_calculate_complete_unit_th", compunit);
			
		}
		return true;
	}	
	
}

function getParameterFromURL(param){
	if(param=(new RegExp('[?&]'+encodeURIComponent(param)+'=([^&]*)')).exec(location.search))
	return decodeURIComponent(param[1]);
	}