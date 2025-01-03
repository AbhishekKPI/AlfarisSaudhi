function beforeLoadAction(type, form, request) {
	var currentContext = nlapiGetContext(); 	
	if( (currentContext.getExecutionContext() == 'userinterface') && (type == 'create'))
	{
		var etsNo = request.getParameter('etsno');
		var prjid = request.getParameter('prjid');
		nlapiSetFieldValue("custrecord_prj_id", prjid);
		var filter = ["custrecord_timeseet_dtls_etsno","anyof",etsNo];
		var tt = nlapiSearchRecord("customrecord_timesheet_details", "customsearch_custom_ts_details_view",filter);
		var configHours = '';	
		var configDays  = '';
		var tsarr = new Array();
		var extrahrs = 0;
		var tohrs = 0;
		var xtrahrs  = 0;
		var ttHrs = 0;
		if(tt){			
			var itemRate = 0;
			 nlapiSetFieldValue("custrecord_days_worked", tt.length);
			for(var i=0;i<tt.length;i++){
				if(i==0){
					configHours =	tt[i].getValue("custrecord_minimum_hrs_timesheet","CUSTRECORD_TIMESEET_DTLS_ETSNO");
					configDays  = tt[i].getValue("custrecord_minimum_days_timesheet","CUSTRECORD_TIMESEET_DTLS_ETSNO");
					
					    var unit = tt[i].getValue("custrecord_timesheet_item_unit","CUSTRECORD_TIMESEET_DTLS_ETSNO");
						
					    nlapiSetFieldValue("custrecord_minimum_days", configDays);
						nlapiSetFieldValue("custrecord_timesheet_billmin_hours", configHours);
						var rounddown = '';
						if(configDays == 0){
							 rounddown = parseInt(tt.length);
						}else{
							 rounddown = parseInt(tt.length) / parseInt(configDays);
						}
						
						var comUnit = Math.floor(rounddown);
						nlapiSetFieldValue("custrecord_custom_item_rate", tt[i].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TIMESEET_DTLS_ETSNO"));
						itemRate = tt[i].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TIMESEET_DTLS_ETSNO");
						var partUnit = '';
						var partUnitRate ='';
						if(comUnit < 1){
							comUnit = 1;
							partUnit = 0;
							partUnitRate = 0;
						}else{
							comUnit = comUnit;
							if(configDays == 0){
								partUnit  = 0;
							}else{
								partUnit = (parseInt(tt.length) - (Math.floor(rounddown) * configDays));
							}
							
							/*if(partUnit == 0){
								partUnitRate  = 0;
							}else{
								partUnitRate = (parseFloat(tt[i].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TIMESEET_DTLS_ETSNO")/parseFloat(configDays)));
							
							}*/
							
						}
							nlapiSetFieldValue("custrecord_complete_unit", comUnit);
							nlapiSetFieldValue("custrecord_actual_complete_unit", comUnit);								
							if(configDays < 1){
								partUnitRate = parseFloat(tt[i].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TIMESEET_DTLS_ETSNO"));
							}else{
								partUnitRate = (parseFloat(tt[i].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TIMESEET_DTLS_ETSNO")/parseFloat(configDays)));
							}
							nlapiSetFieldValue("custrecord_part_unit", partUnit);
							nlapiSetFieldValue("custrecord_actual_part_unit", partUnit);
							//var partUnitRate = parseFloat(partUnit) * (parseFloat(tt[i].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TIMESEET_DTLS_ETSNO")/parseFloat(config[unit][0])));
							
							nlapiSetFieldValue("custrecord_part_unit_rate", partUnitRate.toFixed(2));
							nlapiSetFieldValue("custrecord_pst_timesheet_sdate", tt[i].getValue("custrecord_timesheet_start_date","CUSTRECORD_TIMESEET_DTLS_ETSNO"));
							nlapiSetFieldValue("custrecord_pst_timesheet_edate", tt[i].getValue("custrecord_timesheet_enddate","CUSTRECORD_TIMESEET_DTLS_ETSNO"));
							
						}
				//extrahrs = parseFloat( extrahrs) + parseFloat(timeStringToFloat(tt[i].getValue("custrecord_extra_hours")));
				extrahrs += parseFloat(timeStringToFloat(tt[i].getValue("custrecord_extra_hours")));
				
				if(unit == 'Hour'){
					tohrs = timeStringToFloat(tt[i].getValue("custrecord_total_hours"));
					if(tohrs < configHours){
						tohrs = timeStringToFloat(configHours);
					}	
					xtrahrs = '-None-'; //
					extrahrs = "0";
					ttHrs += tohrs;
					
				}else{
					tohrs = timeStringToFloat(tt[i].getValue("custrecord_total_hours"));
					xtrahrs = tt[i].getValue("custrecord_extra_hours");
				}
				
				tsarr[i] = {'custpage_date':tt[i].getValue("custrecord_timesheet_details_date"),'custpage_from':tt[i].getValue("custrecord_timesheet_details_from"),'custpage_to':tt[i].getValue("custrecord_timesheet_details_totime"),'custpage_break':tt[i].getValue("custrecord_timesheet_det_break"),'custpage_calculated':tt[i].getValue("custrecord_calculated_hours"),'custpage_total':minTommss(tohrs),'custpage_minimum':tt[i].getValue("custrecord_minimum_hours"),'custpage_extra':xtrahrs};
			}
			if(configHours == 0){
				extrahrs = 0;
			}
			var hh = minTommss(extrahrs);
			
			nlapiSetFieldValue("custrecord_extrs_hours", hh);
			nlapiSetFieldValue("custrecord_actual_extra_hours", hh);
			
			var gg = timeStringToFloat(hh);
			var extraRate ='';
			if(configDays == 0 ){
				extraRate = ((itemRate/parseFloat(configHours)));
			}else{
				extraRate = ((itemRate/(parseFloat(configDays)*parseFloat(configHours))));			
			}
			if(configHours == 0){
				extraRate = 0;				
			}
			if(unit == 'Hour'){
				extraRate = 0;
				partUnitRate  = 0;
				nlapiSetFieldValue("custrecord_complete_unit", ttHrs);
				nlapiSetFieldValue("custrecord_actual_complete_unit", ttHrs);	
				nlapiSetFieldValue("custrecord_part_unit", 0);
				nlapiSetFieldValue("custrecord_actual_part_unit", 0);
				nlapiSetFieldValue("custrecord_part_unit_rate", "0.00");
			}
			
			//var extraRate = (parseFloat(gg) * (itemRate/(parseFloat(config[unit][0])*parseFloat(config[unit][1]))));
			
			nlapiSetFieldValue("custrecord_extra_hours_rate", extraRate.toFixed(2));
		}else{
			var filter = ["custrecord_ts_header_etsno_hf","anyof",etsNo];
			var tt = nlapiSearchRecord("customrecord_holiday_friday_ts_details", "customsearch_holiday_ts_post_details",filter);
					
			nlapiSetFieldValue("custrecord_days_worked", tt.length);
			nlapiSetFieldValue("custrecord_minimum_days", tt[0].getValue("custrecord_minimum_days_timesheet","CUSTRECORD_TS_HEADER_ETSNO_HF"));
			nlapiSetFieldValue("custrecord_timesheet_billmin_hours", tt[0].getValue("custrecord_minimum_hrs_timesheet","CUSTRECORD_TS_HEADER_ETSNO_HF"));
			nlapiSetFieldValue("custrecord_complete_unit", 0);
			nlapiSetFieldValue("custrecord_part_unit", 0);	
			nlapiSetFieldValue("custrecord_custom_item_rate", tt[0].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TS_HEADER_ETSNO_HF"));
			
			var unit = tt[0].getValue("custrecord_timesheet_item_unit","CUSTRECORD_TS_HEADER_ETSNO_HF");			
			var partUnitRate = '';
			var extraRate =	'';		
			if(unit == 'Hour'){
				partUnitRate = parseFloat(tt[0].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TS_HEADER_ETSNO_HF"));
				extraRate = parseFloat(tt[0].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TS_HEADER_ETSNO_HF"));
			}else{
				if(tt[0].getValue("custrecord_minimum_days_timesheet","CUSTRECORD_TS_HEADER_ETSNO_HF")<1){
					partUnitRate = (parseFloat(tt[0].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TS_HEADER_ETSNO_HF")));
					extraRate = 0;
				}else{
						partUnitRate = (parseFloat(tt[0].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TS_HEADER_ETSNO_HF")/parseFloat(tt[0].getValue("custrecord_minimum_days_timesheet","CUSTRECORD_TS_HEADER_ETSNO_HF"))));		
						extraRate = ((tt[0].getValue("custrecord_timesheet_itemrate","CUSTRECORD_TS_HEADER_ETSNO_HF")/(parseFloat(tt[0].getValue("custrecord_minimum_days_timesheet","CUSTRECORD_TS_HEADER_ETSNO_HF"))*parseFloat(tt[0].getValue("custrecord_minimum_hrs_timesheet","CUSTRECORD_TS_HEADER_ETSNO_HF")))));
				}
			}
			nlapiSetFieldValue("custrecord_part_unit_rate", partUnitRate.toFixed(2));
			nlapiSetFieldValue("custrecord_extrs_hours", "0:00");			
			nlapiSetFieldValue("custrecord_actual_complete_unit", 0);
			nlapiSetFieldValue("custrecord_actual_part_unit", 0);
			nlapiSetFieldValue("custrecord_actual_extra_hours", "0:00"); 
			nlapiSetFieldValue("custrecord_pst_timesheet_sdate", tt[0].getValue("custrecord_timesheet_start_date","CUSTRECORD_TS_HEADER_ETSNO_HF"));
			nlapiSetFieldValue("custrecord_pst_timesheet_edate", tt[0].getValue("custrecord_timesheet_enddate","CUSTRECORD_TS_HEADER_ETSNO_HF"));				
			/*var finalExtraRate = 0;
			if(extraRate>0){
				finalExtraRate = extraRate.toFixed(2);
			}else{
				finalExtraRate = 0;
			}*/
			nlapiSetFieldValue("custrecord_extra_hours_rate", extraRate.toFixed(2));			
		}		
		
		var mainTab = form.addTab('custpage_timesht_tab', 'Timesheet Details');
	    //Add a subtab to the first tab
	    var timeshtSubTab = form.addSubTab('custpage_timesht_subtab', 'Time Sheet Details','custpage_timesht_tab');
	    var timeshtSublist = form.addSubList('custpage_notes_sublist','list','', 'custpage_timesht_subtab');
	    timeshtSublist.addField('custpage_date','text', 'Date');
	    timeshtSublist.addField('custpage_from','text', 'From');
	    timeshtSublist.addField('custpage_to','text', 'To');
	    timeshtSublist.addField('custpage_break','text', 'Break');
	    timeshtSublist.addField('custpage_calculated','text', 'Calculated Hours');
	    timeshtSublist.addField('custpage_total','text', 'Total Hours');
	    timeshtSublist.addField('custpage_minimum','text', 'Minimum Hours');
	    timeshtSublist.addField('custpage_extra','text', 'Extra Hours');
	    timeshtSublist.setLineItemValues(tsarr);
	   
	    var hfarray = new Array();
	    var filters = ["custrecord_ts_header_etsno_hf","anyof",etsNo];
		var hfts = nlapiSearchRecord("customrecord_holiday_friday_ts_details", "customsearch_holiday_imesheet_details",filters);
	    var totHrs = 0;
		if(hfts){
	    	for(var j=0;j<hfts.length;j++){
	    		hfarray[j] = {'custpage_hf_date':hfts[j].getValue("custrecord_timesheet_hf_details_date"),'custpage_hf_from':hfts[j].getValue("custrecord_timesheet_hf_details_from"),'custpage_hf_to':hfts[j].getValue("custrecord_timesheet_hf_details_totime"),'custpage_hf_break':hfts[j].getValue("custrecord_timesheet_hf_det_break"),'custpage_hf_tothrs':hfts[j].getValue("custrecord_total_hf_hours")};
	    		 totHrs +=  parseFloat(timeStringToFloat(hfts[j].getValue("custrecord_total_hf_hours")));
	 			
	    	}
	    }
		nlapiSetFieldValue("custrecord_holiday_friday_hours", minTommss(totHrs));		
	    var mainTab = form.addTab('custpage_hf_timesht_tab', 'Holiday timesheet details');
	    var hftimeshtSubTab = form.addSubTab('custpage_hf_timesht_subtab', 'Hoiday timesheet Details','custpage_hf_timesht_tab');
	    var hftimeshtSublist = form.addSubList('custpage_hf_notes_sublist','list','', 'custpage_hf_timesht_subtab');
	    hftimeshtSublist.addField('custpage_hf_date','text', 'Date');
	    hftimeshtSublist.addField('custpage_hf_from','text', 'From');
	    hftimeshtSublist.addField('custpage_hf_to','text', 'To');
	    hftimeshtSublist.addField('custpage_hf_break','text', 'Break');
	    hftimeshtSublist.addField('custpage_hf_tothrs','text', 'Total Hrs');
	    hftimeshtSublist.setLineItemValues(hfarray);  
	    
	}
}
function afterSubmitAction() {
	var recID = nlapiGetRecordId();
	nlapiDeleteRecord("customrecord_timesheet_start_billing", recID);
	nlapiSetRedirectURL("RECORD", "job", nlapiGetFieldValue("custrecord_prj_id"));
	return true;
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


