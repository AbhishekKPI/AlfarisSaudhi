function timesheetLineItemGeneration(request, response) {		
	var form = nlapiCreateForm('Create Timesheet Line Items');
	if (request.getMethod() == 'GET') {
		var recID = request.getParameter("tsid");
		var res = nlapiLoadRecord("customrecord_time_sheet_header", recID);	
		var minhrs = res.getFieldValue("custrecord_minimum_hrs_timesheet");
		
		var aa = form.addField('custpage_frdate','date','From Date');
		aa.setMandatory(true);
		var bb = form.addField('custpage_todate','date','To Date');
		bb.setMandatory(true);
		var cc = form.addField('custpage_frtime','timeofday','From Time');
		cc.setMandatory(true);
		var dd = form.addField('custpage_totime','timeofday','To Time');
		dd.setMandatory(true);
		
		var ee = form.addField('custpage_brktime','text','Break Time(HH:MM)');
		ee.setMandatory(true);		
		//ee.setDefaultValue(ttt);
		var hh = form.addField('custpage_minhrs','text','Minimum Hrs');
		hh.setDisplayType("disabled");
		hh.setDefaultValue(minhrs);
		
		var jj = form.addField('custpage_internalid','text','Internalid');
		jj.setDisplayType("hidden");
		jj.setDefaultValue(recID);
		
		form.addSubmitButton("Save");
		/*var ff = form.addField('custpage_calchrs','text','Calculated Hrs');
		ff.setDisplayType("disabled");
		
		var gg = form.addField('custpage_tothrs','text','Total Hrs');
		
		
		var ii = form.addField('custpage_exthrs','text','Extra Hrs');*/
		
		//aa.setDefaultValue(mainid);
		
		
		response.writePage(form);
	}	
	if (request.getMethod() == 'POST') {
		var fromdate = request.getParameter("custpage_frdate");
		var todate = request.getParameter("custpage_todate");
		var braketime = minTommss(timeStringToFloat(request.getParameter("custpage_brktime")));
		var startTime = request.getParameter("custpage_frtime");
		var endTime = request.getParameter("custpage_totime");
		var miHrs = request.getParameter("custpage_minhrs");
		var internalid = request.getParameter("custpage_internalid");
		var timediff = calculateTime(startTime,endTime);
		
		var date1 = nlapiStringToDate(fromdate);
		var date2 = nlapiStringToDate(todate);  
		
		//var headerDate  = nlapiStringToDate(nlapiGetFieldValue("custrecord_timesheet_start_date"));
		//var orgdate = nlapiDateToString(nlapiAddDays(headerDate,count));

		var datediff = date_diff_indays(date1, date2);//dateDifferance(dateConversion(fromdate),dateConversion(todate));
		
		var calchrs = timeStringToFloat(timediff)-timeStringToFloat(braketime);
		if(calchrs<=0){
			calchrs = 0;
		}
		var extrahrs = calchrs - miHrs;
		if(extrahrs<=0){
			extrahrs = 0;
		}
		var tt = '';
		var today = date1;//dateConversion(fromdate);
		var incdate = '';
		var finaldate = '';
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		
		for(var i=0;i<=Math.abs(datediff);i++){			
			//incdate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+i);	
			finaldate =  nlapiDateToString(nlapiAddDays(today,i));// incdate.getDate()+"-"+monthNames[incdate.getMonth()]+"-"+incdate.getFullYear();
			incdate = nlapiStringToDate(finaldate);
			//tt += "Date-"+finaldate+"BRK-"+braketime+"timeDiff-"+timediff+"calchrs-"+minTommss(calchrs)+"extrahrs-"+minTommss(extrahrs)+"MINHRS"+minTommss(miHrs)+"<br/>";
			var n = incdate.getDay();	
			/*var offdayflag = 0;
			var holiday = nlapiSearchRecord("workcalendar", "customsearch_work_calendar_for_timesheet");
			for(var i=0;i<holiday.length;i++){
				 var offday = holiday[i].getValue("exceptiondate");			
				 if(offday == finaldate){
			    		offdayflag = 1;
			    }
			 }	*/
			
			if(n != 5){
				var record = nlapiCreateRecord("customrecord_timesheet_details");
				record.setFieldValue("custrecord_timeseet_dtls_etsno", internalid);
				record.setFieldValue("custrecord_timesheet_details_date", finaldate);
				record.setFieldValue("custrecord_timesheet_details_from", startTime);
				record.setFieldValue("custrecord_timesheet_details_totime", endTime);
				record.setFieldValue("custrecord_timesheet_det_break", braketime);
				record.setFieldValue("custrecord_calculated_hours", minTommss(calchrs));
				record.setFieldValue("custrecord_minimum_hours", minTommss(miHrs));
				record.setFieldValue("custrecord_total_hours", minTommss(calchrs));
				record.setFieldValue("custrecord_extra_hours", minTommss(extrahrs));		
				nlapiSubmitRecord(record);
			}
			
		}		
		//response.write(tt);
		nlapiSetRedirectURL('RECORD', "customrecord_time_sheet_header", internalid, true);
	}	
}
function dateConversion(tranDate){
	tranDate = tranDate.replace("-", " ");
	tranDate = tranDate.replace("-", " ");	
	return today = new Date(tranDate);
}
function dateDifferance(start,end) {	
	var diff = new Date(end - start);
	var days = diff/1000/60/60/24;
	return days;  
}
function minTommss(minutes){
	 var sign = minutes < 0 ? "-" : "";
	 var min = Math.floor(Math.abs(minutes));
	 var sec = Math.floor((Math.abs(minutes) * 60) % 60);
	 return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}
function timeStringToFloat(time) {
	  var hoursMinutes = time.split(/[.:]/);
	  var hours = parseInt(hoursMinutes[0], 10);
	  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
	  return hours + minutes / 60;
}
function am_pm_to_hours(time) {	          
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "pm" && hours < 12) hours = hours + 12;
    if (AMPM == "am" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours =  sHours;
    if (minutes < 10) sMinutes = sMinutes;	       
    return (sHours +':'+sMinutes);
}
function calculateTime(startTime,endTime) {
	   var startTime = am_pm_to_hours(startTime);
	   if(endTime){var endTime = am_pm_to_hours(endTime);}else{ var endTime = '';}			   
		     

	   var startTimeArray = startTime.split(":");
	   var startInputHrs = parseInt(startTimeArray[0]);
	   var startInputMins = parseInt(startTimeArray[1]);

	   var endTimeArray = endTime.split(":");
	   var endInputHrs = parseInt(endTimeArray[0]);
	   var endInputMins = parseInt(endTimeArray[1]);

	   var startMin = startInputHrs*60 + startInputMins;
	   var endMin = endInputHrs*60 + endInputMins;

	   var result;

	   if (endMin < startMin) {
	       var minutesPerDay = 24*60; 
	       result = minutesPerDay - startMin;  // Minutes till midnight
	       result += endMin; // Minutes in the next day
	   } else {
	      result = endMin - startMin;
	   }

	   var minutesElapsed = result % 60;
	   var hoursElapsed = (result - minutesElapsed) / 60;			   
	   return hoursElapsed+':'+(minutesElapsed < 10 ?'0'+minutesElapsed : minutesElapsed);

	}
function date_diff_indays(date1, date2) {
	dt1 = new Date(date1);
	dt2 = new Date(date2);
	return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

function pageInitAction(){
	nlapiDeleteRecord("itemfulfillment", 151);
	console.log("OK Deleted");
}
