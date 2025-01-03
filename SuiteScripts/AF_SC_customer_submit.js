function submitCustomerRecord(request, response) {
    var custID = nlapiGetContext().getSetting('SCRIPT', 'custscript_recid');
   nlapiLogExecution("DEBUG", "custID", custID);
   var custRec = nlapiLoadRecord("customer",custID);
   custRec.setFieldValue("custentity_from_so","T");
   nlapiSubmitRecord(custRec);
}