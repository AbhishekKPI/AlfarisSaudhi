function fieldChangeAction(type,name) {
	if(name == 'custpage_ts_status'){
		nlapiSetFieldValue("custpage_ts_status_txt", nlapiGetFieldText("custpage_ts_status"));
	}	

}
function statusChangingAction(){
	var movto  = nlapiGetFieldValue("custpage_move_status");
	if(movto){
		var notescount = nlapiGetLineItemCount('custpage_notes_sublist');	
		var cnt = 0;
		for(var jj=1; jj< notescount+1; jj++)
		{		
			selectedNotes = nlapiGetLineItemValue('custpage_notes_sublist', 'custpage_chkbx', jj);		
			if(selectedNotes == 'T'){
			var internalID = nlapiGetLineItemValue('custpage_notes_sublist', 'custpage_internalid', jj);
			var curStatus = nlapiGetFieldValue("custpage_move_status");			
			nlapiSubmitField("customrecord_time_sheet_header", internalID, "custrecord_timesheet_status", curStatus);					
			document.getElementById("custpage_notes_sublistrow"+cnt).style.display = 'none';
			cnt++;
		}
	}
 }else{
	 alert("Please select Move To Status");
 }
	
}
function backToMainpage() {
	window.location = "/app/site/hosting/scriptlet.nl?script=268&deploy=1";
}
function backTotimsheetTrack() {
	window.location = "/app/site/hosting/scriptlet.nl?script=270&deploy=1";
}