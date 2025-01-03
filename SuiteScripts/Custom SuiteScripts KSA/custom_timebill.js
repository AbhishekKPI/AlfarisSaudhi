function pageInitAction() {
	nlapiDisableField("custcol_ts_number", true);
	//nlapiSetFieldDisplay("hours", false);
	//var currentContext = nlapiGetContext();
	//console.log(currentContext.getRoleId());
}
function saveRecordAction(){
	var resron = nlapiGetFieldValue("custcol_reason_for_change_timebill");
	if(resron == ""){
		alert("Please enter the reason for amendment.");
		return false;
	}else{
		return true;
	}

return true;
}
function fieldChangeAction(type,name) {
	if(name == "hours"){
		var tsunit = nlapiGetFieldValue("custcol_ts_units");
		var hours = nlapiGetFieldValue("hours");
		var res = tsunit.split(" ");		
		if(res[1] == "Hrs" || res[1] ==  "Hour") {
			var nn = timeStringToFloat(hours);
			var mm = nn.toFixed(2);
			var thtext = mm+" "+res[1];
			nlapiSetFieldValue("custcol_ts_units", thtext);
		}else if(res[1] == "Day" || res[1] == "Days" ){
			var nn = timeStringToFloat(hours);
			var mm = nn.toFixed(2);
			var thtext = mm+" "+res[1];
			nlapiSetFieldValue("custcol_ts_units", thtext);
		}else if(res[1] == "Month" || res[1] == "Months"){
			var nn = timeStringToFloat(hours);
			var mm = nn.toFixed(2);
			var thtext = mm+" "+res[1];
			nlapiSetFieldValue("custcol_ts_units",thtext);
		}
	}
}

function timeStringToFloat(time) {
	  var hoursMinutes = time.split(/[.:]/);
	  var hours = parseInt(hoursMinutes[0], 10);
	  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
	  return hours + minutes / 60;
	}