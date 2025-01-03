function beforeLoadAction(type, form, request){
  if(type == 'view' || type == 'edit'){   
		var custid = nlapiGetFieldValue("id");	
		var filter = ["customerMain.internalid","anyof",custid];
		var res = nlapiSearchRecord("transaction", "customsearch_pdc_sum_of_amount",filter);
		if(res){
		var teststring = JSON.stringify(res);
		test = form.addField('custpage_field_to_print', 'longtext', 'Script Field', null, null);
		test.setDefaultValue(teststring);
        test.setDisplayType("hidden");
	}		
   }
	
}