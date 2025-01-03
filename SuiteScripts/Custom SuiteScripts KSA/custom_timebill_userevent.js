function beforeLoadAction(type, form, request){
	var currentContext = nlapiGetContext(); 	
	if( (currentContext.getExecutionContext() == 'userinterface') && (type == 'edit'))
	{	
		if((currentContext.getRoleId() == "administrator" ) || (currentContext.getRoleId() == "customrole_invoice_approver") || (currentContext.getRoleId() == "customrole1011")){						
			nlapiSetFieldDisplay("hours", true);					
		}else{
                       nlapiSetFieldDisplay("hours", false);	
                 }
	}
}