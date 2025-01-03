function pageInitAction(type){
if(type == 'create' || type == 'edit' || type == 'view'){
nlapiSetFieldDisplay('entity',false);
}
}
function fieldChangedAction(type,name){
if(name == 'custbody_vendor_not_project_resources'){
var vendorsel = nlapiGetFieldValue('custbody_vendor_not_project_resources');
nlapiSetFieldValue('entity',vendorsel);
}
}
function saveRecordAction(type){
  var vendorsel = nlapiGetFieldValue('custbody_vendor_not_project_resources');
  if(vendorsel == ''){
    alert("Please select the Vendor");
    return false;
  }
  return true;
}