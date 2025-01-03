function beforeLoadAction(type, form){
	var custId = nlapiGetFieldValue("entity");
	if(custId){
		var rectype = nlapiLookupField("customer",custId,"recordtype");

		var entitystatus = nlapiLookupField("customer",custId,"entitystatus"); //abhishek 16_10_2023
		var userRole = nlapiGetRole();
		if(rectype == "prospect" || rectype == "lead"){
			nlapiSetFieldValue("custbody_cust_lead","T");
		}

		nlapiLogExecution('DEBUG', 'userRole', userRole);
		nlapiLogExecution('DEBUG', 'entitystatus', entitystatus);
		nlapiLogExecution('DEBUG', 'rectype', rectype);


		if(rectype == "prospect"){
			//if (entitystatus == 13 || entitystatus == 15 || entitystatus == 16 || entitystatus == 17) {
			
				if (userRole == 3) {
					nlapiLogExecution('DEBUG', 'rectype', "true");
					return true
				} else {
					nlapiLogExecution('DEBUG', 'rectype', "false");
					//alert("To proceed with further details, please contact your administrator as customer creation is not available directly. We kindly request you to consider the prospect option. ")
					
					//nlapiLogExecution('ERROR', 'User Error', 'To proceed with further details, please contact your administrator as customer creation is not available directly. We kindly request you to consider the prospect option.');
					var customError = nlapiCreateError('CUSTOM_ERROR_CODE', 'To proceed with further details, please contact your administrator as customer creation is not available directly. We kindly request you to consider the prospect option..', true);

					// Throw the custom error
					throw customError;
					return false;
				}
			//}
		}
	}

}

function beforeSubmitAction() {
	var lnCnt = nlapiGetLineItemCount("item"); 
	var status = 0;
	for(var i=1;i < lnCnt+1;i++){
		var priceLevel = nlapiGetLineItemValue('item','price', i);	
		if(priceLevel  == '1' || priceLevel == '-1'){
			var rate = nlapiGetLineItemValue("item", "rate", i);
			var basePrice = nlapiGetLineItemValue("item", "custcol_min_base_price", i);	
			if(basePrice == ""){basePrice = 0;}			
			if(parseFloat(rate) < parseFloat(basePrice)){	
				status = 1;				
			}
		}		
	}
	if(status == 1){
		nlapiSetFieldValue("custbody_pricing_approval_required", "T");
	}else{
		nlapiSetFieldValue("custbody_pricing_approval_required", "F");
	}
var custId = nlapiGetFieldValue("entity");
	if(custId){
		var rectype = nlapiLookupField("customer",custId,"recordtype");

		var entitystatus = nlapiLookupField("customer",custId,"entitystatus"); //abhishek 16_10_2023
		var userRole = nlapiGetRole();
		

		nlapiLogExecution('DEBUG', 'userRole', userRole);
		nlapiLogExecution('DEBUG', 'entitystatus', entitystatus);
		nlapiLogExecution('DEBUG', 'rectype', rectype);


		if(rectype == "prospect"){
			//if (entitystatus == 13 || entitystatus == 15 || entitystatus == 16 || entitystatus == 17) {
			
				if (userRole == 3) {
					nlapiLogExecution('DEBUG', 'rectype', "true");
					return true
				} else {
					nlapiLogExecution('DEBUG', 'rectype', "false");
					//alert("To proceed with further details, please contact your administrator as customer creation is not available directly. We kindly request you to consider the prospect option. ")
					
					//nlapiLogExecution('ERROR', 'User Error', 'To proceed with further details, please contact your administrator as customer creation is not available directly. We kindly request you to consider the prospect option.');
					var customError = nlapiCreateError('CUSTOM_ERROR_CODE', 'To proceed with further details, please contact your administrator as customer creation is not available directly. We kindly request you to consider the prospect option..', true);

					// Throw the custom error
					throw customError;
					return false;
				}
			//}
		}
	}
}
function afterSubmitAction(type){
    var custid = nlapiGetFieldValue("entity");
  	

    var custLead = nlapiGetFieldValue("custbody_cust_lead");
  	if (custid) {
      var custrec = nlapiLoadRecord('customer',custid);
      var autoid = custrec.getFieldValue("custentity_auto_id_updated_ornot");
        if(autoid == 'T' && custLead == "T"){
          var subsidiary = nlapiGetFieldValue("subsidiary");
          var params = new Array();
          params['custscript_recid'] = custid;
          nlapiScheduleScript('customscript_sc_customer_submit', null, params);
  
        }
    }
  return true;
}

