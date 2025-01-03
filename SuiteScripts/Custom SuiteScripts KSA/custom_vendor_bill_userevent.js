function beforeLoadAction(type,form,request){
if(type == 'view'){        
		var recID = nlapiGetRecordId();
        var rec = nlapiLoadRecord('vendorbill',recID);
		form.addButton('custpage_printbutton','Print','printEnterBill('+recID+')');
		form.setScript('customscript_common_script');
	}
}