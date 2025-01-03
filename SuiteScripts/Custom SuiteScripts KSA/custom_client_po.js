function fieldChangedAction(type,name){
if(name == "custrecord_po_expiry_date"){
var expirydate = nlapiStringToDate(nlapiGetFieldValue('custrecord_po_expiry_date'));
var currentdate = nlapiStringToDate(nlapiGetFieldValue('custrecord_client_po_current_date'));
if(expirydate >= currentdate){
  nlapiSetFieldValue('custrecord_po_status',1);
}else{
  nlapiSetFieldValue('custrecord_po_status',2);
}
}
}
function pageInitAction(type){
  if(type == "edit" || type == "view" || type == "create"){
    var expirydate = nlapiStringToDate(nlapiGetFieldValue('custrecord_po_expiry_date'));
	var currentdate = nlapiStringToDate(nlapiGetFieldValue('custrecord_client_po_current_date'));
	if(expirydate >= currentdate){
  	nlapiSetFieldValue('custrecord_po_status',1);
	}else{
  	nlapiSetFieldValue('custrecord_po_status',2);
	}
  }
}