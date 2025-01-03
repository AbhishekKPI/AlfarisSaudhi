function validateLineitemAction() {
	var dateLine = nlapiGetCurrentLineItemValue("recmachcustrecord_bd_timeseet_dtls_etsno", "custrecord_bd_timesheet_details_date");
	var tsID = nlapiGetFieldValue("custrecord_bd_existing_timesheet_id");
	var filter = [["custrecord_timeseet_dtls_etsno","is",tsID],"AND",["custrecord_timesheet_details_date","on",dateLine]];
	var dateExist = nlapiSearchRecord("customrecord_timesheet_details", "customsearch_timesheet_detaild_data",filter);
	
	var currenthrs = nlapiGetCurrentLineItemValue("recmachcustrecord_bd_timeseet_dtls_etsno", "custrecord_bd_total_hours");
	if(dateExist == null){
		alert("Date is not exist in actual timesheet.");
		return false;
	}else if(parseFloat(timeStringToFloat(currenthrs))<=parseInt(parseFloat(dateExist[0].getValue("custrecord_total_hours")))){
		return true;
	}else{
		alert("Breakdown hours greaterthan actual timesheet working hours.");
		return false;
	}
}
function fieldChangeAction(type,name) {	
	if(name == 'custrecord_bd_total_hours'){
		var brkdwnhrs = nlapiGetCurrentLineItemValue("recmachcustrecord_bd_timeseet_dtls_etsno", "custrecord_bd_total_hours");
		var tothrs = minTommss(timeStringToFloat(brkdwnhrs));
		nlapiSetCurrentLineItemValue("recmachcustrecord_bd_timeseet_dtls_etsno", "custrecord_bd_total_hours", tothrs,'', false);
	}
}
function saveRecordAction(){
  var status = nlapiGetFieldValue("custrecord_bd_timesheet_status");
  if(status == 1){
   alert("Please select different status.");
	return false;
  }else{
    return true;
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