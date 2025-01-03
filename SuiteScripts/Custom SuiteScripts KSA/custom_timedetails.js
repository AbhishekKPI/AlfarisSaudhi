function pageinitAction(type){
	console.log(type);
	if(type == 'edit'){
		nlapiDisableField("custrecord_timeseet_dtls_etsno", true);
		nlapiDisableField("custrecord_timesheet_details_date", true);
		nlapiDisableField("custrecord_timesheet_details_from", true);
		nlapiDisableField("custrecord_timesheet_details_totime", true);
		nlapiDisableField("custrecord_timesheet_det_break", true);
		nlapiDisableField("custrecord_total_hours", true);
		nlapiDisableField("custrecord_extra_hours", true);
		nlapiDisableField("custrecord_number_of_day", true);
		
		
	}
	nlapiSetFieldValue("custrecord_timesheet_details_from", "7:00 am");
	var headerDate  = nlapiGetFieldValue("custrecord_timesheet_start_date");
	console.log(headerDate);
	nlapiSetFieldValue("custrecord_timesheet_details_date", headerDate);	
}