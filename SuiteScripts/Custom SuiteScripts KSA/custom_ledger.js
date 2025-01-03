function pageInitAction(type) {
	var myTD=document.getElementById('tbl_submitter');
	myTD.parentNode.removeChild(myTD);
	var myTD=document.getElementById('tbl__cancel');
	myTD.parentNode.removeChild(myTD);
	var myTD=document.getElementById('tbl_resetter');
	myTD.parentNode.removeChild(myTD);

}
function fieldChangedAction(type,name){
  if(name == 'custrecord_get_employee_ledger'){
    var emptick = nlapiGetFieldValue('custrecord_get_employee_ledger');
    if(emptick == "T"){
      nlapiSetFieldDisplay('custrecord_ledger_employee',true);
    }else{
      nlapiSetFieldValue('custrecord_ledger_employee','');
      nlapiSetFieldDisplay('custrecord_ledger_employee',false);
    }
  }
}