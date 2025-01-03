function breakdownTimesheetPosting(request, response) {	
	if (request.getMethod() == 'GET') { 
		var mainid = request.getParameter("bdtsid");
		var timesheetID = request.getParameter("timesheetID");
		
		var searchfilter = ["custrecord_bd_existing_timesheet_id","equalto",timesheetID];
		var bdtsHeader = nlapiSearchRecord("customrecord_breakdown_timesheet_header", "customsearch_breakdown_timesheet_exist", searchfilter);
		var unit = bdtsHeader[0].getValue("custrecord_td_timesheet_item_unit");	
		var rate = bdtsHeader[0].getValue("custrecord_bd_timesheet_itemrate");	
		var minhrs = bdtsHeader[0].getValue("custrecord_bd_minimum_hrs_timesheet");
		var mindays = bdtsHeader[0].getValue("custrecord_bd_minimum_days_timesheet");
		
		var form = nlapiCreateForm('Breakdown Timsheet Posting');
		 var aa = form.addField('custpage_tsid','text',"TIMESHEET ID");
		 aa.setDefaultValue(mainid);
		 
		 var cc = form.addField('custpage_unit','text',"Unit");
		 cc.setDefaultValue(unit);
		 
		 var dd = form.addField('custpage_rate','text',"Rate");
		 dd.setDefaultValue(rate);
		 
		 var ee = form.addField('custpage_minhrs','text',"Min Hrs");
		 ee.setDefaultValue(minhrs);
		 
		 var ff = form.addField('custpage_mindays','text',"Min Days");
		 ff.setDefaultValue(mindays);		
		 
		 
		 var dataArray = new Array();	
		 var  filters = ["custrecord_bd_timeseet_dtls_etsno","anyof",mainid];
		 var searchRec = nlapiSearchRecord("customrecord_breakdown_timesheet_details", "customsearch_breakdown_timesheet_details", filters);
		var totHrs = 0;
		 if(searchRec){
			 for(var i =0;i<searchRec.length;i++){
				 dataArray[i] = {'custpage_date':searchRec[i].getValue("custrecord_bd_timesheet_details_date"),'custpage_bdwn_hrs':searchRec[i].getValue("custrecord_bd_total_hours")};
				 totHrs +=  parseFloat(timeStringToFloat(searchRec[i].getValue("custrecord_bd_total_hours")));
			 }
		 }
		
		 var bb = form.addField('custpage_totalhours','text',"Total Breakdown Hrs");
		 bb.setDefaultValue(minTommss(totHrs));
		 
		 
		
		 //to be continued
		var extraRate ='';
			if(mindays == 0 ){
				extraRate = ((rate/parseFloat(minhrs)));
			}else{
				extraRate = ((rate/(parseFloat(mindays)*parseFloat(minhrs))));			
			}
			if(minhrs == 0){
				extraRate = 0;				
			}
			if(unit == 'Hour'){
				extraRate = rate;
			}
			
			
		 var gg = form.addField('custpage_bdhrs_rate','text',"Total breakdown Rate");
		 gg.setDefaultValue(extraRate.toFixed(2));	 
		 	
		 
		 var hh = form.addField('custpage_timesheetid','text',"TS ID");
		 hh.setDefaultValue(timesheetID); 
		 
		 
		  var mainTab = form.addTab('custpage_bdwn_tab', '');		 
		    //Add a subtab to the first tab
		    var notesSubTab = form.addSubTab('custpage_bdwn_subtab', 'Breakdown Details','custpage_bdwn_tab');
		    var bdwnSublist = form.addSubList('custpage_bdwn_sublist','list','', 'custpage_bdwn_subtab');
		    bdwnSublist.addField('custpage_date','date', 'Date');	
		    bdwnSublist.addField('custpage_bdwn_hrs','text', 'Brakedown Hours');	
		    bdwnSublist.setLineItemValues(dataArray);	
		    form.addSubmitButton("Post Timesheet");
		    response.writePage(form);
	}
	if (request.getMethod() == 'POST') {
		var timesheetID = request.getParameter("custpage_timesheetid");
		var extrahrs = request.getParameter("custpage_totalhours");
		var extraHrsRate  = request.getParameter("custpage_bdhrs_rate");
		
		var custpage_tsid = request.getParameter("custpage_tsid");
		
		var subsidiary = '';
		//They are inseting emloyee id
		var employee_resourceID = '';
		var customer_projID = '';
		var itemID = '';
		var mainUnit = '';
		var actETSNO = '';
		var prefix = '';
		var itemfullname  = '';
		var filter = ["CUSTRECORD_TIMESHEET_RA_ID.id","equalto",timesheetID];
		 var resOut = nlapiSearchRecord('resourceallocation','customsearch_resource_details_subtab',filter);
		 if(resOut){
				for(var i=0;i<resOut.length;i++){
					subsidiary = resOut[i].getValue("subsidiarynohierarchy","job","min");							if(subsidiary =='SALLC'){
					prefix = 'SL';
				}else if(subsidiary =='SAGIA'){
					prefix = 'SG';
				}else if(subsidiary =='SAT'){
					prefix = 'ST';
				}
				actETSNO = prefix+resOut[i].getValue("custrecord_custom_ets_no","CUSTRECORD_TIMESHEET_RA_ID","min");
				var filter = ["namenohierarchy","contains",subsidiary];
				var subsidiaryRes = nlapiSearchRecord('subsidiary','customsearch_sub_internal_id',filter);
				var subsidiaryID = subsidiaryRes[i].getValue("internalid");
				
				employee_resourceID = resOut[i].getValue("internalid","resource","min");
				customer_projID = resOut[i].getValue("internalid","job","min");
				itemID = resOut[i].getValue("custevent_custom_hdn_itemid",null,"min");
				mainUnit = resOut[i].getValue("custevent_ra_sales_unit",null,"min");
				itemfullname = resOut[i].getValue("custevent_so_item_description",null,"min");
					
				}
				
				var record = nlapiCreateRecord('timebill');	
				var extrunit = extrahrs;
				//record.setFieldValue("trandate", '15-Mar-2016');
				record.setFieldValue("employee", employee_resourceID);
				record.setFieldValue("customer", customer_projID);	
				record.setFieldValue("hours", extrunit);
				record.setFieldValue("item", itemID);				
				record.setFieldValue("rate", -extraHrsRate);
				record.setFieldValue("overriderate", "T");				
				record.setFieldValue("custcol_ts_equipment", 'Break down Hours For '+itemfullname);
				record.setFieldValue("custcol_ts_number", actETSNO);				
				record.setFieldValue("custcol_ets_no", timesheetID);
           if(timeStringToFloat(extrunit) > 1){
             record.setFieldValue("custcol_ts_units", extrunit+' Hours');
           }else{
             record.setFieldValue("custcol_ts_units", extrunit+' Hour');
           }
								
				//record.setFieldValue("subsidiary", subsidiaryID);			
				nlapiSubmitRecord(record);
				nlapiSubmitField("customrecord_breakdown_timesheet_header", custpage_tsid, "custrecord_bd_timesheet_status", 1);
		}
		 nlapiSetRedirectURL('RECORD', "job", customer_projID, true);
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