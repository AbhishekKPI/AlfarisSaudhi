function beforeLoadAction(type,form,request){
if(type == 'view' || type == 'edit' || type == "create"){
	nlapiSetFieldDisplay('custrecord_client_po_current_date',false);
}
}