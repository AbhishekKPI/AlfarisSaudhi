function submitCustomerRecord(request, response) {
   nlapiLogExecution("DEBUG", "inside");
   var custID = request.getParameter("recid");
   nlapiLogExecution("DEBUG", "custID", custID);
   var custRec = nlapiLoadRecord("customer",custID);
   custRec.setValue("custentity_from_so","T");
   nlapiSubmitRecord(custRec);
}