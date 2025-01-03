function beforeLoadAction(type,form,request){
if(type == 'view'){
  var id = nlapiGetFieldValue("tranid");
  var recID = nlapiGetRecordId();
 
  form.addButton('custpage_testbutton','Print','makeDeposit('+recID+')');
  form.setScript('customscript_common_script');
}
}