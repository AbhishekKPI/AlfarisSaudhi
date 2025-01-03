function fieldChangedAction(type,name){
if(name == 'custrecord_legal_entities_checkbox'){
var checktrue = nlapiGetFieldValue('custrecord_legal_entities_checkbox');
  console.log(checktrue);
if(checktrue == "T"){
var custname = nlapiGetFieldValue('custrecord_related_customer');
var legalname = nlapiGetFieldValue('name');
var custrec = nlapiLoadRecord('customer',custname);
custrec.setFieldValue('custentity_legal_entity_name',legalname);
}
}
}