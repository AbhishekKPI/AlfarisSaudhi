function customerNumberingCheck() {
    var myuserId = nlapiGetContext().getUser();
    // if (myuserId == 4) {
        var context = nlapiGetContext();
        var recID = nlapiGetRecordId();
        nlapiLogExecution("DEBUG", "recID", recID);
        var type = nlapiGetRecordType();
        nlapiLogExecution("DEBUG", "type", type);

        var subsidi = nlapiGetFieldValue("subsidiary");
       var transactionnumber = nlapiGetFieldValue("transactionnumber");
        nlapiLogExecution('DEBUG','inside AF transactionnumber',transactionnumber);
        nlapiSubmitField(nlapiGetRecordType(), nlapiGetRecordId(), "tranid", transactionnumber);

    }