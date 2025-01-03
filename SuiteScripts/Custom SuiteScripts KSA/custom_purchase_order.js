function fieldChangedAction(type,name){
	if(name == "custbody_payment_terms"){
		var terms = nlapiGetFieldText("custbody_payment_terms");
		if(terms){
			nlapiSetFieldValue("custbody_paymet_terms_po",terms);
		}
	}
}