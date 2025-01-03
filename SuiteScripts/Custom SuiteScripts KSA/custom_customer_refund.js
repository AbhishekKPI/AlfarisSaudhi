function pageInitAction(){
  nlapiDisableField('tranid', true);
  //nlapiDisableField('custbody_custom_id', false);
}


function saveRecordAction(){
	var ID = nlapiGetFieldValue("id"); console.log(ID+'id');
    var subsidiary = nlapiGetFieldValue("subsidiary");
    if(ID){
		var custID = nlapiGetFieldValue("custbody_custom_id");
        console.log(custID+'custID');
		nlapiSetFieldValue("tranid", custID);
    }else{
      if(subsidiary == '2'){ //If Sagia LLC
		autoIDprocess(16);
      }else if(subsidiary == '1'){ //If Sagia 
        autoIDprocess(15);
      }else if(subsidiary == '8'){ //If Sagia 
        autoIDprocess(21);
      }
   }
    return true;
}


function autoIDprocess(loadID){
	var res = nlapiLoadRecord("customrecord_custom_configuration", loadID);
	var minimumDigit = res.getFieldValue("custrecord_minimum_digit");
	var currentNo = res.getFieldValue("custrecord_current_number");
	var prefix = res.getFieldValue("custrecord_prefix");
    var suffix = res.getFieldValue("custrecord_suffix");
	var finalno = parseInt(currentNo) + parseInt(1);
	var IDGenerated = leftPad(finalno, minimumDigit);
	var finalID = prefix+""+IDGenerated+""+suffix; console.log(finalID+'finalid');
    nlapiSetFieldValue("tranid", finalID);
	nlapiSetFieldValue("custbody_custom_id", finalID);
}


function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}