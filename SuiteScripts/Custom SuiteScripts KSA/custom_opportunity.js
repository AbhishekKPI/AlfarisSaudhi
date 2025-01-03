function pageInitAction(type){
  if(type == 'edit'){
    var entitystatus = nlapiGetFieldValue('entitystatus');
	if(entitystatus =='14'){
  	nlapiSetFieldMandatory('custbody_win_loss_reason',true);
	}
  }
}
function fieldChangedAction(type,name){
if(name == 'entitystatus'){
var entitystatus = nlapiGetFieldValue('entitystatus');
if(entitystatus =='14'){
  nlapiSetFieldMandatory('custbody_win_loss_reason',true);
}
}
}
function saveRecordAction(){
  var entitystatus = nlapiGetFieldValue('entitystatus');
  var winloss_reason = nlapiGetFieldValue('custbody_win_loss_reason');
  if(entitystatus == '14' && winloss_reason == ''){
    alert('Please mention the reason for Win/Loss');
    return false;
  }
  return true;
}