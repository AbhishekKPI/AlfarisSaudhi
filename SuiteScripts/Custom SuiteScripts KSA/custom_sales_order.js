function validateLineAction(type) {	
	var priceLevel = nlapiGetCurrentLineItemValue('item','price');	
	if(priceLevel  == '1' || priceLevel == '-1'){
		var rate = nlapiGetCurrentLineItemValue("item", "rate");
		if(rate == ""){rate = 0;}
		var basePrice = nlapiGetCurrentLineItemValue("item", "custcol_min_base_price");	
		if(basePrice == ""){basePrice = 0;}			
		if(parseFloat(rate) < parseFloat(basePrice)){				
			alert("Quote is below minimum base price hence approval required.");
		}
	}
	return true;
}
function saveRecordAction(){
    var cust = nlapiGetFieldValue('entity');
    var rec = nlapiLoadRecord('customer',cust);
    var entityid = rec.getFieldValue('custentity_entity_id');
    var entitystatus = rec.getFieldValue("entitystatus");
	var leadtocust = rec.getFieldValue("custentity_lead_to_customer"); 
	
	var context = nlapiGetContext();      
    if(leadtocust != "T" && entitystatus != "13" && context.getRoleCenter() == "SALESCENTER"){
    	alert("Permission Violation: You need a higher level of permission to process this transaction. Please contact your account administrator.");
    	return false;
	 }
    var subsi = rec.getFieldValue('subsidiary');    
    // if(entityid == null){
    //   if(subsi == 1){
    //     autoIDprocess(5,cust);
    //   }else if(subsi == 2){
    //     autoIDprocess(6,cust);
    //   }else if(subsi == 3){
    //     autoIDprocess(7,cust);
    //   }
    // }
  return true;
}
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}
function autoIDprocess(loadID,custid){
	var res = nlapiLoadRecord("customrecord_custom_configuration", loadID);
	var minimumDigit = res.getFieldValue("custrecord_minimum_digit");
	var currentNo = res.getFieldValue("custrecord_current_number");
    console.log(currentNo+'-cur num');
	var prefix = res.getFieldValue("custrecord_prefix");	
	var finalno = parseInt(currentNo) + parseInt(1);
	var IDGenerated = leftPad(finalno, minimumDigit);
	var finalID = prefix+""+IDGenerated;
    nlapiSubmitField('customer',custid,'entityid',finalID);
    nlapiSubmitField('customer',custid,'custentity_entity_id',finalID);
    nlapiSubmitField('customer',custid,'autoname',"F");
}