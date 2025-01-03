function beforeLoadAction(type, form, request) {
  var custForm = nlapiGetFieldValue("customform");
  nlapiLogExecution("DEBUG","custForm",custForm);
  if(custForm == 8){
    nlapiSetFieldDisplay("status",false);
  }
	if(type == "create"){
		var currentContext = nlapiGetContext(); 
		var subsidiary = currentContext.getSubsidiary();
		nlapiSetFieldValue("custevent_subsidary", subsidiary);
        var tasktype = nlapiGetFieldValue('customform');
        if(tasktype == 11){
        	nlapiSetFieldValue('custevent_type_of_task',1);
      	}else{
        	nlapiSetFieldValue('custevent_type_of_task',2);
      	}
      		nlapiSetFieldDisplay('custevent_type_of_task',false);
	}
  if(type == "edit"){
    nlapiSetFieldDisplay('custevent_type_of_task',false);
  }
  if(type == "view"){
     nlapiSetFieldDisplay('custevent_type_of_task',false);
  	}
}
function afterSubmitAction(type){
  if(type == "create"){
    var ID = nlapiGetRecordId();
    var subsidiary = nlapiGetFieldValue('custevent_subsidary');
    var tasktype = nlapiGetFieldValue('custevent_type_of_task');
    if(subsidiary ==1){
      if(tasktype == 1){
        var res = nlapiLoadRecord("customrecord_custom_configuration", 12);
		var currentNo = res.getFieldValue("custrecord_current_number");
		var genNo = +currentNo + +1;		
		nlapiSubmitField("customrecord_custom_configuration", 12, "custrecord_current_number", genNo);
      }else if(tasktype == 2){
        var res = nlapiLoadRecord("customrecord_custom_configuration", 9);
		var currentNo = res.getFieldValue("custrecord_current_number");
		var genNo = +currentNo + +1;		
		nlapiSubmitField("customrecord_custom_configuration", 9, "custrecord_current_number", genNo);
      }
    }else if(subsidiary ==2){
      if(tasktype == 1){
        var res = nlapiLoadRecord("customrecord_custom_configuration", 13);
		var currentNo = res.getFieldValue("custrecord_current_number");
		var genNo = +currentNo + +1;		
		nlapiSubmitField("customrecord_custom_configuration", 13, "custrecord_current_number", genNo);
      }else if(tasktype == 2){
        var res = nlapiLoadRecord("customrecord_custom_configuration", 10);
		var currentNo = res.getFieldValue("custrecord_current_number");
		var genNo = +currentNo + +1;		
		nlapiSubmitField("customrecord_custom_configuration", 10, "custrecord_current_number", genNo);
      }
    }else if(subsidiary ==3){
      if(tasktype == 1){
        var res = nlapiLoadRecord("customrecord_custom_configuration", 14);
		var currentNo = res.getFieldValue("custrecord_current_number");
		var genNo = +currentNo + +1;		
		nlapiSubmitField("customrecord_custom_configuration", 14, "custrecord_current_number", genNo);
      }else if(tasktype == 2){
        var res = nlapiLoadRecord("customrecord_custom_configuration", 11);
		var currentNo = res.getFieldValue("custrecord_current_number");
		var genNo = +currentNo + +1;		
		nlapiSubmitField("customrecord_custom_configuration", 11, "custrecord_current_number", genNo);
      }
    }else if(subsidiary ==8){
      nlapiLogExecution("DEBUG","subsidiary",subsidiary);
      nlapiLogExecution("DEBUG","tasktype",tasktype);
      if(tasktype == 1){
        var res = nlapiLoadRecord("customrecord_custom_configuration", 19);
    var currentNo = res.getFieldValue("custrecord_current_number");
    var genNo = +currentNo + +1;    
    nlapiSubmitField("customrecord_custom_configuration", 19, "custrecord_current_number", genNo);
      }else if(tasktype == 2){
        var res = nlapiLoadRecord("customrecord_custom_configuration", 20);
    var currentNo = res.getFieldValue("custrecord_current_number");
    var genNo = +currentNo + +1;    
    nlapiSubmitField("customrecord_custom_configuration", 20, "custrecord_current_number", genNo);
      }
    }
  }
return true;
}