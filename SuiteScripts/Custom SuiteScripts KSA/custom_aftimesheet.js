var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function HMStoSec1(T) { // h:m:s
	  var A = T.split(/\D+/) ; return (A[0]*60 + +A[1])*60;
}

	var secondsPerMinute = 60;
	var minutesPerHour = 60;

	function convertSecondsToHHMMSS(intSecondsToConvert) {
	var hours = convertHours(intSecondsToConvert);
	var minutes = getRemainingMinutes(intSecondsToConvert);
	minutes = (minutes == 60) ? "00" : minutes;
	//var seconds = getRemainingSeconds(intSecondsToConvert);
	return hours+":"+minutes;
	}
	
	function convertHours(intSeconds) {
		var minutes = convertMinutes(intSeconds);
		var hours = Math.floor(minutes/minutesPerHour);
		return hours;
		}
		function convertMinutes(intSeconds) {
		return Math.floor(intSeconds/secondsPerMinute);
		}
		function getRemainingSeconds(intTotalSeconds) {
		return (intTotalSeconds%secondsPerMinute);
		}
		function getRemainingMinutes(intSeconds) {
			var intTotalMinutes = convertMinutes(intSeconds);
			return (intTotalMinutes%minutesPerHour);
			}
		
		function am_pm_to_hours(time) {	          
	        var hours = Number(time.match(/^(\d+)/)[1]);
	        var minutes = Number(time.match(/:(\d+)/)[1]);
	        var AMPM = time.match(/\s(.*)$/)[1];
	        if (AMPM == "pm" && hours < 12) hours = hours + 12;
	        if (AMPM == "am" && hours == 12) hours = hours - 12;
	        var sHours = hours.toString();
	        var sMinutes = minutes.toString();
	        if (hours < 10) sHours = "0" + sHours;
	        if (minutes < 10) sMinutes = "0" + sMinutes;	       
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
		
function pageInitAction(type) {
     var currentContext = nlapiGetContext();
     console.log(currentContext);
	//document.getElementById("tbl_newrec113").style.display="none";	
	//document.getElementById("tbl_newrec115").style.display="none";	
	var tssts = nlapiGetFieldValue("custrecord_timesheet_status");		
	if(tssts == '1'){		
		//document.getElementById("tbl_submitter").style.display="none";
		//document.getElementById("tbl_secondarysubmitter").style.display="none";
		var target = document.getElementById("main_form");
		var newElement = document.createElement('table');
		newElement.innerHTML = '<div style="background-color: #d5e0ec;display: inline-block;font-size: 14px;font-weight: bold;left: 253px; margin: 0 0 2px;padding: 6px; position: relative;text-transform: uppercase;top: -336px;white-space: nowrap;">Timesheet Posted.</div>';    
	    target.parentNode.insertBefore(newElement, target.nextSibling );
	}else if(tssts == 7){
		document.getElementById("tbl_submitter").style.display="none";					
		}
	//nlapiSetFieldDisplay("custrecord_timesheet_ra_id", false);
	var count = nlapiGetLineItemCount("recmachcustrecord_timeseet_dtls_etsno");	
	
	/*var headerDate  = nlapiGetFieldValue("custrecord_timesheet_start_date");	
	var actualdate = dateConversion(headerDate);	
	var date = new Date(actualdate);
	var newdate = new Date(date);		
	newdate.setDate(newdate.getDate() + count);
	var orgdate = newdate.getDate()+"-"+monthNames[newdate.getMonth()]+"-"+newdate.getFullYear();*/
	
	var headerDate  =nlapiStringToDate(nlapiGetFieldValue("custrecord_timesheet_start_date"));
	var orgdate = nlapiDateToString(nlapiAddDays(headerDate,count));
	/*var orgdate = dateConversion(headerDate);	
	
	var today = nlapiStringToDate(nlapiGetFieldValue("custrecord_timesheet_start_date"));
 	var newDate = nlapiDateToString(nlapiAddDays(today,10));
  	nlapiSetFieldValue('expectedclosedate',newDate);*/
	
	nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_details_date', orgdate);
	nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_details_from', "7:00 am");
	nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', "0:0");
	nlapiDisableLineItemField('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', "0:0");
	nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_det_break', "0:0", '', false);
	
	/*nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_timesheet_hf_details_from', "7:00 am");
	nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_total_hf_hours', "0:00");
	nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_timesheet_hf_det_break', "0:00", '', false);
	*/
	
	/*var uniitActual = nlapiGetFieldValue("custrecord_timesheet_item_unit");
	nlapiSetFieldValue("custrecord_complete_unit", uniitActual);
	var count = nlapiGetLineItemCount("recmachcustrecord_timeseet_dtls_etsno");
	nlapiSetFieldValue("custrecord_days_worked", count);
	var co = configItems();	
	nlapiSetFieldValue("custrecord_timebill_minimumhours", co[uniitActual][1]);
	nlapiSetFieldValue("custrecord_minimum_days", co[uniitActual][0]);*/
}
function lineinitheaderAction(type,name) {	
	
	if(type == 'recmachcustrecord_timeseet_dtls_etsno'){
		var currentLineno =	nlapiGetCurrentLineItemIndex(type);	
		var currentlineDate = nlapiGetLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_details_date", currentLineno);
		if(currentLineno  == '1' &&   currentlineDate == null){		
			nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_details_date',  nlapiGetFieldValue("custrecord_timesheet_start_date"));
			nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_details_from', "7:00 am");
			nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_det_break', "0:0", '', false);
		}else if(currentlineDate == null){		
			var prevlineDate = nlapiGetLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_details_date", currentLineno-1);
			
			
			/*var headerDate  = nlapiStringToDate(nlapiGetFieldValue("custrecord_timesheet_start_date"));
			var orgdate = nlapiDateToString(nlapiAddDays(headerDate,count));
			*/
			
			var newdate = nlapiStringToDate(prevlineDate);
			var orgdate = nlapiDateToString(nlapiAddDays(newdate,1));
			
			/*var newdate = new Date(dateConversion(prevlineDate));
		    newdate.setDate(newdate.getDate()+ (1));			    
		    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		    var orgdate = newdate.getDate() + '-' + monthNames[newdate.getMonth()] + '-' + newdate.getFullYear();
*/
		    
		    var comingDate  = nlapiGetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_details_date');
		    if(comingDate == ""){
				nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_details_date', orgdate);
				nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_details_from', "7:00 am");
				nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_timesheet_det_break', "0:0", '', false);
		    }	
		
		}
	}
	/*if(type == 'recmachcustrecord_ts_header_etsno_hf'){
		nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_timesheet_hf_details_from', "7:00 am");
		nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_total_hf_hours', "0:00");
		nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_timesheet_hf_det_break', "0:00", '', false);
		
	}*/
	
}
function fieldchangeAction(type,name) {
	
	
	
	if(type == "recmachcustrecord_ts_header_etsno_hf"){
		
		if(name == 'custrecord_timesheet_hf_det_break'){	
			
			var breaktime = nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_det_break");
			var fst = minTommss(breaktime);
			nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_timesheet_hf_det_break', fst,'', false);
						
			var diffTime = calculateTime(nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_details_from"),nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_details_totime"));
			
			var times = HMStoSec1(diffTime);			
			var calc = times - HMStoSec1(fst);		
			var mainTime = convertSecondsToHHMMSS(calc);
			if(calc < 0){
				mainTime = convertSecondsToHHMMSS(0);
			}	
			var finalTime = minTommss(timeStringToFloat(mainTime));
			nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_total_hf_hours', finalTime,'', false);
						
		}
		if(name == 'custrecord_timesheet_hf_details_from'){
				var breaktime = nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_det_break");
				if(breaktime == ''){
					var fst = minTommss(timeStringToFloat(convertSecondsToHHMMSS(0)));					
				}else{
					var fst = minTommss(timeStringToFloat(breaktime));
				}
				nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_timesheet_hf_det_break', fst,'', false);
							
				var diffTime = calculateTime(nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_details_from"),nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_details_totime"));
				
				var times = HMStoSec1(diffTime);			
				var calc = times - HMStoSec1(fst);		
				var mainTime = convertSecondsToHHMMSS(calc);
				if(calc < 0){
					mainTime = convertSecondsToHHMMSS(0);
				}	
				var finalTime = minTommss(timeStringToFloat(mainTime));
				nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_total_hf_hours', finalTime,'', false);
			
			
		}
		if(name == 'custrecord_timesheet_hf_details_totime'){						
			var breaktime = nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_det_break");
			if(breaktime == ''){
				var fst = minTommss(timeStringToFloat(convertSecondsToHHMMSS(0)));					
			}else{
				var fst = minTommss(timeStringToFloat(breaktime));
			}
			nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_timesheet_hf_det_break', fst,'', false);
						
			var diffTime = calculateTime(nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_details_from"),nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_details_totime"));
			
			var times = HMStoSec1(diffTime);			
			var calc = times - HMStoSec1(fst);		
			var mainTime = convertSecondsToHHMMSS(calc);
			if(calc < 0){
				mainTime = convertSecondsToHHMMSS(0);
			}	
			var finalTime = minTommss(timeStringToFloat(mainTime));
			nlapiSetCurrentLineItemValue('recmachcustrecord_ts_header_etsno_hf', 'custrecord_total_hf_hours', finalTime,'', false);
		
		}
	}
	if(name == 'custrecord_timesheet_details_from'){
		var diffTime = returnTime();			
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', diffTime);
		nlapiDisableLineItemField('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', diffTime);
		var breakVal = nlapiGetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_det_break");
		var fst = minTommss(timeStringToFloat(breakVal));			
		nlapiSetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_det_break", fst, '', false);
		
		var times = HMStoSec1(diffTime);			
		var calc = times - HMStoSec1(fst);		
		var mainTime = convertSecondsToHHMMSS(calc);
		if(calc < 0){
			mainTime = convertSecondsToHHMMSS(0);
		}	
		mainTime = minTommss(timeStringToFloat(mainTime));
		
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', mainTime,'', false);
		nlapiDisableLineItemField('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', mainTime,'', false);
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_total_hours', mainTime,'', false);
		var hours =	minTommss(nlapiGetFieldValue("custrecord_minimum_hrs_timesheet"));				
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_minimum_hours', hours,'', false);
		nlapiDisableLineItemField('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_minimum_hours', hours,'', false);
		var extra = timeStringToFloat(mainTime) - timeStringToFloat(hours);			
		var extraTime = minTommss(extra);
		
		var exTime = timeStringToFloat(extraTime);
		if(exTime<0){
			extraTime = minTommss(0);
		}
		extraTime = minTommss(timeStringToFloat(extraTime));
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_extra_hours', extraTime, '', false);
	}
	if(name == 'custrecord_timesheet_details_totime'){
		var diffTime = returnTime();			
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', diffTime);
		nlapiDisableLineItemField('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', diffTime);
		var breakVal = nlapiGetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_det_break");
		var fst = minTommss(timeStringToFloat(breakVal));			
		nlapiSetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_det_break", fst, '', false);
		
		var times = HMStoSec1(diffTime);			
		var calc = times - HMStoSec1(fst);		
		var mainTime = convertSecondsToHHMMSS(calc);
		if(calc < 0){
			mainTime = convertSecondsToHHMMSS(0);
		}		
		mainTime = minTommss(timeStringToFloat(mainTime));
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', mainTime,'', false);
		nlapiDisableLineItemField('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', mainTime,'', false);
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_total_hours', mainTime,'', false);
		var hours =	minTommss(nlapiGetFieldValue("custrecord_minimum_hrs_timesheet"));				
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_minimum_hours', hours,'', false);
		nlapiDisableLineItemField('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_minimum_hours', hours,'', false);
		var extra = timeStringToFloat(mainTime) - timeStringToFloat(hours);			
		var extraTime = minTommss(extra);
		
		var exTime = timeStringToFloat(extraTime);
		if(exTime<0){
			extraTime = minTommss(0);
		}
		
		nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_extra_hours', extraTime, '', false);
	}
		if(name == 'custrecord_timesheet_det_break'){
			
			var breakVal = nlapiGetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_det_break");
			var fst = minTommss(breakVal);			
			nlapiSetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_det_break", fst, '', false);
			var diffTime = returnTime();
			var times = HMStoSec1(diffTime);			
			var calc = times - HMStoSec1(fst);
			var mainTime = convertSecondsToHHMMSS(calc);
			if(calc < 0){
				mainTime = convertSecondsToHHMMSS(0);
			}	
			mainTime = minTommss(timeStringToFloat(mainTime));
			nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', mainTime,'', false);
			nlapiDisableLineItemField('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_calculated_hours', mainTime,'', false);
			nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_total_hours', mainTime,'', false);
			var hours =	minTommss(nlapiGetFieldValue("custrecord_minimum_hrs_timesheet"));				
			nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_minimum_hours', hours,'', false);
			nlapiDisableLineItemField('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_minimum_hours', hours,'', false);
			//mainTime - hours
			var extra = timeStringToFloat(mainTime) - timeStringToFloat(hours);			
			var extraTime = minTommss(extra);
			var exTime = timeStringToFloat(extraTime);
			if(extra<0){
				extraTime = minTommss(0);
			}
			extraTime = minTommss(timeStringToFloat(extraTime));
			nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_extra_hours', extraTime);
	}
		if(name == "custrecord_total_hours"){	
			var tottHrs = nlapiGetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_total_hours");
			var upTotorg = minTommss(tottHrs);		
			var totdec = timeStringToFloat(upTotorg)-nlapiGetFieldValue("custrecord_minimum_hrs_timesheet");
			var exthours =	minTommss(totdec);
			var exTime = timeStringToFloat(exthours);
			if(totdec<0){
				exthours = minTommss(0);
			}
			exthours = minTommss(timeStringToFloat(exthours));
			nlapiSetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_total_hours",upTotorg, '', false);
			nlapiSetCurrentLineItemValue('recmachcustrecord_timeseet_dtls_etsno', 'custrecord_extra_hours', exthours, '', false);
			
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
function dateConversion(tranDate){
	tranDate = tranDate.replace("-", " ");
	tranDate = tranDate.replace("-", " ");	
	return today = new Date(tranDate);
}
function returnTime(){
	/*var frtime = convert12to24(nlapiGetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_details_from"));
	var totime = convert12to24(nlapiGetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_details_totime"));
	var time1 = HMStoSec1(frtime);
	var time2 = HMStoSec1(totime);		
	var diff = (time2 - time1);
	console.log(diff);
	if(diff<0){
		diff  = 0;
	}
	var diffTime = convertSecondsToHHMMSS(diff);*/
	var diffTime = calculateTime(nlapiGetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_details_from"),nlapiGetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_details_totime"));
	return diffTime;
}

function saveRecordAction(type) {
var custstst = nlapiGetFieldValue("custrecord_timesheet_status");
	/*if(custstst == 1){
		alert("Please select different status.");
		return false;
	}*/
	
	if(custstst == 7){
		var remarks = nlapiGetFieldValue("custrecord_timesheet_remarks");
		if(remarks == ""){
			alert("Please Enter the remarks.");
			return false;
		}		
	}

	var etssNo = nlapiGetFieldValue("custrecord_custom_ets_no");
	var subsi = nlapiGetFieldValue("custrecord_timesheet_subsidiary");	
	if(etssNo == ""){
		var timesheetfilter = ["custrecord_timesheet_subsidiary","is",subsi];
		var timesheetres = nlapiSearchRecord('customrecord_time_sheet_header','customsearch_etsnumber_generation_search',timesheetfilter);
		
		if(timesheetres){
			if(timesheetres["0"].getValue("custrecord_custom_ets_no",null,"max") == ""){			
			nlapiSetFieldValue("custrecord_custom_ets_no", 1);
		}else{			
			nlapiSetFieldValue("custrecord_custom_ets_no", (parseInt(timesheetres["0"].getValue("custrecord_custom_ets_no",null,"max"))+parseInt(1)));
		}	
		}else{
			nlapiSetFieldValue("custrecord_custom_ets_no", 1);
		}		
	}	
	var listcount = nlapiGetLineItemCount('recmachcustrecord_timeseet_dtls_etsno');	
	for(var i=1;i<listcount+1;i++){
		var totime = nlapiGetLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_details_totime", i);
		
		if(totime == ''){			
			nlapiRemoveLineItem("recmachcustrecord_timeseet_dtls_etsno", i);			
		}
	}
	/*var listcounthf = nlapiGetLineItemCount('recmachcustrecord_ts_header_etsno_hf');	
	for(var j=1;j<listcounthf+1;j++){
		var totimehf = nlapiGetLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_details_totime", j);
		
		if(totimehf == ''){			
			nlapiRemoveLineItem("recmachcustrecord_ts_header_etsno_hf", j);			
		}
	}*/
	return true;
}
function validateLineAction(type){		
	if(type == "recmachcustrecord_ts_header_etsno_hf"){
		var dateLine = nlapiGetCurrentLineItemValue("recmachcustrecord_ts_header_etsno_hf", "custrecord_timesheet_hf_details_date");
		
		/*var fstdate = dateLine.replace("-", " ");	
		var finaldate = fstdate.replace("-", " ");	
		var newdate = new Date(finaldate);	
		var d = new Date(newdate);*/
		
		var d = nlapiStringToDate(dateLine);
		var n = d.getDay();		
		var offdayflag = 0;
		var holiday = nlapiSearchRecord("workcalendar", "customsearch_work_calendar_for_timesheet");
		for(var i=0;i<holiday.length;i++){
			 var offday = holiday[i].getValue("exceptiondate");			
			 if(offday == dateLine){
		    		offdayflag = 1;
		    }
		 }		
		 if(n == 5){
			return true;
		}else if(offdayflag == 1){
			return true;
		}else{
			alert("Ente time for only weekly-off / holiday here. Use tab 'Timesheet details' to enter time for regular day.");
			return false;
		}
	}
	if(type == "recmachcustrecord_timeseet_dtls_etsno"){
		var dateLine = nlapiGetCurrentLineItemValue("recmachcustrecord_timeseet_dtls_etsno", "custrecord_timesheet_details_date");
		var fstdate = dateLine.replace("-", " ");	
		var finaldate = fstdate.replace("-", " ");	
		var newdate = new Date(finaldate);	
		var d = new Date(newdate);
		var d = nlapiStringToDate(dateLine);
		var n = d.getDay();			
		var offdayflag = 0;
		var holiday = nlapiSearchRecord("workcalendar", "customsearch_work_calendar_for_timesheet");
		for(var i=0;i<holiday.length;i++){
			 var offday = holiday[i].getValue("exceptiondate");			
			 if(offday == dateLine){
		    		offdayflag = 1;
		    }
		 }				
		 if(n == 5){
			 alert("This is weekly-off / holiday. Use tab 'Holiday Timesheet Details' to enter time for holiday.");
			 return false;
		}else if(offdayflag == 1){
			alert("This is weekly-off / holiday. Use tab 'Holiday Timesheet Details' to enter time for holiday.");
			return false;
		}else{
			return true;
		}
		 
	}
}