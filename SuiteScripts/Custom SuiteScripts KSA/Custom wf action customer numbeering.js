function customerNumbering() {
    var myuserId = nlapiGetContext().getUser();
    // if (myuserId == 4) {
    var context = nlapiGetContext();
    var recID = nlapiGetRecordId();
    nlapiLogExecution("DEBUG", "recID", recID);
    var type = nlapiGetRecordType();
    nlapiLogExecution("DEBUG", "type", type);
    var customId = nlapiGetFieldValue("custentity_customer_custom_id");
    var custnumberID = context.getSetting('SCRIPT', 'custscript_custom_number');
    nlapiLogExecution("DEBUG", "custnumberID", custnumberID);

    var interCompanyCheck = nlapiGetFieldValue("custentity_cust_intr_company_custm_numb");

    var subsidi = nlapiGetFieldValue("subsidiary");
    var recType = nlapiLookupField("entity", recID, "recordtype");
    if ((custnumberID != "" && custnumberID != null) && subsidi == 2) { //SALLC 
        var res = nlapiLoadRecord("customtransaction_customer_numbering", custnumberID);
        nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
        nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
        nlapiSubmitField(recType, recID, 'custentity_customer_custom_id', res.getFieldValue("tranid"));
    } else if ((custnumberID != "" && custnumberID != null) && subsidi == 1) { //SAGIA  SG Crane Division - Rental       
        if (interCompanyCheck == "T") {
            var res = nlapiLoadRecord("customtransaction_custmer_nmbg_sagia_asg", custnumberID);
            nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
            nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
        } else {
            var res = nlapiLoadRecord("customtransaction__customer_numbrg_sagia", custnumberID);
            nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
            nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
        }
    } 
    else if ((custnumberID != "" && custnumberID != null) && subsidi == 3) { //SAT
        var res = nlapiLoadRecord("customtransaction_customer_numbrg_sat", custnumberID);
        nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
        nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
    } else if ((custnumberID != "" && custnumberID != null) && subsidi == 8 || subsidi == 16) { //FA
        if (interCompanyCheck == "T") {
            var res = nlapiLoadRecord("customtransaction_custmer_nmbg_faris_asf", custnumberID);
            nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
            nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
        }else{
            var res = nlapiLoadRecord("customtransaction_customer_numbering_fa", custnumberID);
            nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
            nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
        }        
    } else if ((custnumberID != "" && custnumberID != null) && subsidi == 10) { //ED
        var res = nlapiLoadRecord("customtransaction_customer_number_ed", custnumberID);
        nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
        nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
    } else if ((custnumberID != "" && custnumberID != null) && subsidi == 11) { //ED
        if (interCompanyCheck == "T") {
            var res = nlapiLoadRecord("customtransaction_custmer_nmbg_sagia_asg", custnumberID);
            nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
            nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
        } else {
            var res = nlapiLoadRecord("customtransaction_customer_number_ed", custnumberID);
            nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
            nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
        }
    } else if ((custnumberID != "" && custnumberID != null) && subsidi == 12) { //ED
        var res = nlapiLoadRecord("customtransaction_customer_number_ed", custnumberID);
        nlapiLogExecution('DEBUG', 'recID', JSON.stringify(res));
        nlapiSubmitField(recType, recID, 'entityid', res.getFieldValue("tranid"), false);
    }

    nlapiLogExecution("DEBUG", "if", "if");
    // }

}