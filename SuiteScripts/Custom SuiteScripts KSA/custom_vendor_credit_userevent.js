function beforeLoadAction(type,form,request){
if(type == "view"){
var recid = nlapiGetRecordId();
form.addButton('custpage_testbutton','Print','printVendorCredit('+recid+');');
form.setScript('customscript_common_script');
}
}