function pageInitAction(type){
  nlapiSetFieldDisabled('custevent_task_id_for_tracking',true);
}
function saveRecordAction(type) {
 		var title = nlapiGetFieldValue('title');
        if(title == ' '){
          alert("Please enter the title");
          return false;
        }
  		var subsidiary = nlapiGetFieldValue("custevent_subsidary");
		var tasktype = nlapiGetFieldValue("custevent_type_of_task");
        var id = nlapiGetFieldValue('custevent_task_id_for_tracking');
        if(id){
          nlapiSetFieldValue('custevent_task_id_auto',id);
        }else{
          if(subsidiary == 1){
            if(tasktype == 1){
              autoIDprocess(12);
            }else if(tasktype == 2){
              autoIDprocess(9);
            }
          }else if(subsidiary == 2){
            if(tasktype == 1){
              autoIDprocess(13);
            }else if(tasktype == 2){
              autoIDprocess(10);
            }
          }else if(subsidiary == 3){
            if(tasktype == 1){
              autoIDprocess(14);
            }else if(tasktype == 2){
              autoIDprocess(11);
            }
          }else if(subsidiary == 8){
            if(tasktype == 1){
              autoIDprocess(19);
            }else if(tasktype == 2){
              autoIDprocess(20);
            }
          }
        }
  return true;
}

function fieldChangedAction(type,name){
  // if(name == "customform"){
  //   var form_type = nlapiGetFieldValue('customform');
  //   if(form_type == 11){
  //     nlapiSetFieldValue('custevent_type_of_task',1);
  //   }else if(form_type == 8){
  //     nlapiSetFieldValue('custevent_type_of_task',2);
  //   }else{
  //     nlapiSetFieldValue('custevent_type_of_task','');
  //   }
  // }
  if(name=="custevent_status_new"){
    var stat = nlapiGetFieldValue("custevent_status_new");
    if(stat == 1){
      nlapiSetFieldValue("status",'COMPLETE');
    }else if(stat == 2){
      nlapiSetFieldValue("status",'PROGRESS');
    }else if(stat == 3){
      nlapiSetFieldValue("status","NOTSTART");
    }else{
      nlapiSetFieldValue("status",'PROGRESS');
    }
  }
}
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}
function autoIDprocess(loadID){
	var res = nlapiLoadRecord("customrecord_custom_configuration", loadID);
	var minimumDigit = res.getFieldValue("custrecord_minimum_digit");
	var currentNo = res.getFieldValue("custrecord_current_number");
    console.log(currentNo+'-cur num');
	var prefix = res.getFieldValue("custrecord_prefix");
	var finalno = parseInt(currentNo) + parseInt(1);
	var IDGenerated = leftPad(finalno, minimumDigit);
	var finalID = prefix+""+IDGenerated;
    nlapiSetFieldValue('custevent_task_id_auto',finalID);
	nlapiSetFieldValue("custevent_task_id_for_tracking", finalID);
}