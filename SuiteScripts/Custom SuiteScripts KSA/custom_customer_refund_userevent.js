/*function beforeLoadAction(type){
  if(type=="edit" || type == "create"){
      var custForm = nlapiGetField('tranid');
      custForm.setDisplayType('disabled');
      //nlapiSetFieldDisplay("account",false);        
    }
}*/


function afterSubmitAction(type) {
    var subsidiary = nlapiGetFieldValue("subsidiary");
    if(type == "create"){
        if(subsidiary == '1'){
          var res = nlapiLoadRecord("customrecord_custom_configuration", 15);
	      var currentNo = res.getFieldValue("custrecord_current_number");
	      var genNo = +currentNo + +1;
		  nlapiSubmitField("customrecord_custom_configuration", 15, "custrecord_current_number", genNo);
        }else if(subsidiary == '2'){
          var res = nlapiLoadRecord("customrecord_custom_configuration", 16);
	      var currentNo = res.getFieldValue("custrecord_current_number");
	      var genNo = +currentNo + +1;
		  nlapiSubmitField("customrecord_custom_configuration", 16, "custrecord_current_number", genNo);
        }else if(subsidiary == '8'){
          var res = nlapiLoadRecord("customrecord_custom_configuration", 21);
        var currentNo = res.getFieldValue("custrecord_current_number");
        var genNo = +currentNo + +1;
      nlapiSubmitField("customrecord_custom_configuration", 21, "custrecord_current_number", genNo);
        }
    }
	return true;
}