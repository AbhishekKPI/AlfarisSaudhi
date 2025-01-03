function beforeLoadAction(type) {
    var context = nlapiGetContext();
    var recType = nlapiGetRecordType();
    if (type == 'create' && recType == "customer" && context.getRoleCenter() == "SALESCENTER") {
        throw nlapiCreateError("NOT_PERMITED", "Permission Violation: You need a higher level of permission to access this page. Please contact your account administrator.");
    }
}

function beforeSubmitAction(type) {
    var context = nlapiGetContext();
    var leadtocust = nlapiGetFieldValue("custentity_lead_to_customer");
    var entitystatus = nlapiGetFieldValue("entitystatus");
    if (leadtocust == "T" && entitystatus == "13" && context.getRoleCenter() == "SALESCENTER") {
        throw nlapiCreateError("NOT_PERMITED", "Permission Violation: You need a higher level of permission to access this page. Please contact your account administrator.");
    }
}

function afterSubmitAction(type, form, request) {
    var myuserId = nlapiGetContext().getUser();
    var typen = type;
    // if (myuserId == 4) {
   
    if (type == "create" || type == "copy" || type == "edit") {
        aftersubmitTest(typen);
    }

    // }else{
    //     var ID = nlapiGetRecordId();
    //     var recType = nlapiGetRecordType();
    //     var leadtocust = nlapiGetFieldValue("custentity_lead_to_customer");
    //   var idgenerated = nlapiGetFieldValue('custentity_entity_id');
    //   var entitystatus = nlapiGetFieldValue("entitystatus");
    //     nlapiLogExecution("DEBUG", "leadtocust", leadtocust);
    //     if(type == 'create'){
    //         var subsidiary = nlapiGetFieldValue("subsidiary");
    //         var autoIDstat = nlapiGetFieldValue("custentity_auto_id_updated_ornot");
    //         if(autoIDstat == "T" && recType == "customer" && idgenerated != "" && entitystatus == "13"){
    //             if(subsidiary == 1){
    //                 //SAGIA
    //                 var res = nlapiLoadRecord("customrecord_custom_configuration", 5);
    //                 var currentNo = res.getFieldValue("custrecord_current_number");
    //                 var genNo = +currentNo + +1;
    //                 nlapiSubmitField("customrecord_custom_configuration", 5, "custrecord_current_number", genNo);
    //                 nlapiSubmitField("customer", ID, "custentity_auto_id_updated_ornot", "F");
    //                 nlapiSubmitField("customer", ID, "custentity_rp_form", "F");
    //                 nlapiSubmitField("customer", ID, "custentity_lead_to_customer", "F");
    //             }else if(subsidiary == 2){
    //                 //SALLC
    //                 var res = nlapiLoadRecord("customrecord_custom_configuration", 6);
    //                 var currentNo = res.getFieldValue("custrecord_current_number");
    //                 var genNo = +currentNo + +1;
    //                 nlapiSubmitField("customrecord_custom_configuration", 6, "custrecord_current_number", genNo);
    //                 nlapiSubmitField("customer", ID, "custentity_auto_id_updated_ornot", "F");
    //                 nlapiSubmitField("customer", ID, "custentity_rp_form", "F");
    //                 nlapiSubmitField("customer", ID, "custentity_lead_to_customer", "F");
    //             }else if(subsidiary == 3){
    //                 //SAT
    //                 var res = nlapiLoadRecord("customrecord_custom_configuration", 7);      
    //                 var currentNo = res.getFieldValue("custrecord_current_number");
    //                 var genNo = +currentNo + +1;        
    //                 nlapiSubmitField("customrecord_custom_configuration", 7, "custrecord_current_number", genNo);   
    //                 nlapiSubmitField("customer", ID, "custentity_auto_id_updated_ornot", "F");
    //                 nlapiSubmitField("customer", ID, "custentity_rp_form", "F");
    //                 nlapiSubmitField("customer", ID, "custentity_lead_to_customer", "F");
    //             }   
    //         }
    //     }else{
    //       var subsidiary = nlapiGetFieldValue("subsidiary");
    //       var idgenerated = nlapiGetFieldValue('custentity_entity_id');
    //       nlapiLogExecution("DEBUG", "ID", ID);
    //       nlapiLogExecution("DEBUG", "type", type);
    //       nlapiLogExecution("DEBUG", "subsidiary", subsidiary);
    //         if(leadtocust == "T" && idgenerated != '' && entitystatus == "13"){
    //             if(subsidiary == 1){
    //                 //SAGIA
    //                 var res = nlapiLoadRecord("customrecord_custom_configuration", 5);
    //                 var currentNo = res.getFieldValue("custrecord_current_number");
    //                 var genNo = +currentNo + +1;        
    //                 nlapiSubmitField("customrecord_custom_configuration", 5, "custrecord_current_number", genNo);   
    //                 nlapiSubmitField('customer', ID, "custentity_auto_id_updated_ornot", "F");
    //                 nlapiSubmitField('customer', ID, "custentity_rp_form", "F");
    //                 nlapiSubmitField('customer', ID, "custentity_lead_to_customer", "F");
    //             }else if(subsidiary == 2){
    //                 //SALLC
    //                 nlapiLogExecution("DEBUG", "ID", ID);
    //                 var res = nlapiLoadRecord("customrecord_custom_configuration",6);       
    //                 var currentNo = res.getFieldValue("custrecord_current_number");
    //                 var genNo = +currentNo + +1;        
    //                 nlapiSubmitField("customrecord_custom_configuration", 6, "custrecord_current_number", genNo);
    //                 nlapiSubmitField('customer', ID, "custentity_auto_id_updated_ornot", "F");
    //                 nlapiSubmitField('customer', ID, "custentity_rp_form", "F");
    //                 nlapiSubmitField('customer', ID, "custentity_lead_to_customer", "F");
    //             }else if(subsidiary == 3){
    //                 //SAT
    //                 var res = nlapiLoadRecord("customrecord_custom_configuration", 7);      
    //                 var currentNo = res.getFieldValue("custrecord_current_number");
    //                 var genNo = +currentNo + +1;
    //                 nlapiSubmitField("customrecord_custom_configuration", 7, "custrecord_current_number", genNo);   
    //                 nlapiSubmitField('customer', ID, "custentity_auto_id_updated_ornot", "F");
    //                 nlapiSubmitField('customer', ID, "custentity_rp_form", "F");
    //                 nlapiSubmitField('customer', ID, "custentity_lead_to_customer", "F");
    //             }
    //         }
    //     }
    // }

    //     return true;
}

function aftersubmitTest(type) {
    nlapiLogExecution("DEBUG", "type", type);

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // nlapiLogExecution("DEBUG","autoIDstat",autoIDstat);
    // nlapiLogExecution("DEBUG","insideif","insideif");
    if (type != "delete") {
        var recType = nlapiGetRecordType();
        var ID = nlapiGetRecordId();
        var recID = nlapiGetRecordId();
        var rec = nlapiLoadRecord(recType, recID);
        var autoIDstat = rec.getFieldValue("custentity_auto_id_updated_ornot");
        var entitystatus = rec.getFieldValue("entitystatus");
      var from_so = rec.getFieldValue("custentity_from_so");
nlapiLogExecution("DEBUG", "recType", recType);

                if (((recType == "lead" || recType == "prospect") && autoIDstat == "T" && entitystatus == '13') || (recType == "customer" && from_so =="T")) {

            var leadtocust = rec.getFieldValue("custentity_lead_to_customer");
            var idgenerated = rec.getFieldValue('custentity_entity_id');
            nlapiLogExecution("DEBUG", "leadtocust", leadtocust);
            var myuserId = nlapiGetContext().getUser();
            var subsidi = rec.getFieldValue("subsidiary");
          

            subsidi = subsidi;

            if (subsidi == 2) { //SALLC
                nlapiLogExecution("DEBUG", "insideifllc1111", "insideifllc");
                autoIDMasterUpdate(subsidi, recID);

            } else if (subsidi == 1) { //SAGIA
                nlapiLogExecution("DEBUG", "insideSAGIA111", "insideSAGIA");
                autoIDMasterUpdateSagia(subsidi, recID);

            } else if (subsidi == 3) { //SAT
                nlapiLogExecution("DEBUG", "insideSAT111", "insideSAT");

                autoIDMasterUpdateSat(subsidi, recID);

            } else if (subsidi == 8) { //SAT
                nlapiLogExecution("DEBUG", "insideSAT111", "insideSAT");

                autoIDMasterUpdateFa(subsidi, recID);

            } else if (subsidi == 10 || subsidi == 11 || subsidi == 12) { //ED
                nlapiLogExecution("DEBUG", "insideED111", "insideED");

                autoIDMasterUpdateEnergyDivision(subsidi, recID);
            }
        }
    }

    if ((type == 'create' || type == 'copy') && recType == "customer") {
        var ID = nlapiGetRecordId();
        var recID = nlapiGetRecordId();
        var recType = nlapiGetRecordType();
        var rec = nlapiLoadRecord(recType, recID);
        var leadtocust = rec.getFieldValue("custentity_lead_to_customer");
        var idgenerated = rec.getFieldValue('custentity_entity_id');
        var entitystatus = rec.getFieldValue("entitystatus");
        nlapiLogExecution("DEBUG", "leadtocust", leadtocust);
        var myuserId = nlapiGetContext().getUser();
        var subsidi = rec.getFieldValue("subsidiary");
        var autoIDstat = rec.getFieldValue("custentity_auto_id_updated_ornot");
        var custm_numbering = rec.getFieldValue("custentity_cust_intr_company_custm_numb");


     

        if (subsidi == 2) { //SALLC
            nlapiLogExecution("DEBUG", "insideSALLC", "insideSALLC");
            autoIDMasterUpdate(subsidi, recID);
        }else if (subsidi == 1) { //SG Crane Division - Rental
            if(custm_numbering == "T"){ //inter company
                nlapiLogExecution("DEBUG", "insideSAGIA", "insideSAGIA");
                autoIDMasterUpdateSagiaASG(subsidi, recID,custm_numbering);
            }else{
                nlapiLogExecution("DEBUG", "insideSAGIA", "insideSAGIA");
                autoIDMasterUpdateSagia(subsidi, recID);
            }           
        }      
        else if (subsidi == 3) { //SAT
            nlapiLogExecution("DEBUG", "insideSAT", "insideSAT");
            autoIDMasterUpdateSat(subsidi, recID);

        } else if (subsidi == 8 || subsidi == 16) { //FA
            if(custm_numbering == "T"){
                nlapiLogExecution("DEBUG", "insideSAGIA", "insideFARIS");
                autoIDMasterUpdateSagiaASF(subsidi, recID,custm_numbering);
            }else{
                nlapiLogExecution("DEBUG", "insideSAT", "insideSAT");
                autoIDMasterUpdateFa(subsidi, recID);
            }

        } else if (subsidi == 10 || subsidi == 11 || subsidi == 12) { //ED
            if(custm_numbering == "T"){
                nlapiLogExecution("DEBUG", "insideSAGIA", "insideSAGIA");
                autoIDMasterUpdateSagiaASG(subsidi, recID,custm_numbering);
            }else{
                nlapiLogExecution("DEBUG", "insideED", "insideED");
                autoIDMasterUpdateEnergyDivision(subsidi, recID);
            }
        }
    }

}

function autoIDMasterUpdate(subsidi, recID) {
    nlapiLogExecution("DEBUG", "autoIDMasterUpdaterecID", recID);
    var record = nlapiCreateRecord("customtransaction_customer_numbering");
    record.setFieldValue("custbody_customer_reference_numbering", recID);
    record.setFieldValue("subsidiary", subsidi);
    var id = nlapiSubmitRecord(record, true, true);
    nlapiLogExecution("DEBUG", "id", id);
    nlapiSubmitField("customer", recID, "custentity_customer_custom_id", id, false);
}

function autoIDMasterUpdateSagiaASG(subsidi, recID,custm_numbering) {
    if(custm_numbering == "T"){
        var record = nlapiCreateRecord("customtransaction_custmer_nmbg_sagia_asg");
        record.setFieldValue("custbody_custmer_nmbg_sagia_as", recID);
        record.setFieldValue("subsidiary", subsidi);
        var id = nlapiSubmitRecord(record, true, true);
        nlapiLogExecution("DEBUG", "id", id);
        nlapiSubmitField("customer", recID, "custentity_customer_custom_id", id);
    }    
}

function autoIDMasterUpdateSagiaASF(subsidi, recID,custm_numbering) {
    if(custm_numbering == "T"){
        var record = nlapiCreateRecord("customtransaction_custmer_nmbg_faris_asf");
        record.setFieldValue("custbody_custmer_nmbg_sagia_asf", recID);
        record.setFieldValue("subsidiary", subsidi);
        var id = nlapiSubmitRecord(record, true, true);
        nlapiLogExecution("DEBUG", "id", id);
        nlapiSubmitField("customer", recID, "custentity_customer_custom_id", id);
    }    
}

function autoIDMasterUpdateSagia(subsidi, recID) {   
    var record = nlapiCreateRecord("customtransaction__customer_numbrg_sagia");
    record.setFieldValue("custbody_customer_referenc_numbr_sagia", recID);
    record.setFieldValue("subsidiary", subsidi);
    var id = nlapiSubmitRecord(record, true, true);
    nlapiLogExecution("DEBUG", "id", id);
    nlapiSubmitField("customer", recID, "custentity_customer_custom_id", id);      
}

function autoIDMasterUpdateSat(subsidi, recID) {

    var record = nlapiCreateRecord("customtransaction_customer_numbrg_sat");
    record.setFieldValue("custbody_customer_referenc_numbr_sat", recID);
    record.setFieldValue("subsidiary", subsidi);
    var id = nlapiSubmitRecord(record, true, true);
    nlapiLogExecution("DEBUG", "id", id);
    nlapiSubmitField("customer", recID, "custentity_customer_custom_id", id);
}
function autoIDMasterUpdateFa(subsidi, recID) {

    var record = nlapiCreateRecord("customtransaction_customer_numbering_fa");
    record.setFieldValue("custbody_customer_referenc_numbr_sagia", recID);
    record.setFieldValue("subsidiary", subsidi);
    var id = nlapiSubmitRecord(record, true, true);
    nlapiLogExecution("DEBUG", "id", id);
    nlapiSubmitField("customer", recID, "custentity_customer_custom_id", id);
}
// 
function autoIDMasterUpdateEnergyDivision(subsidi, recID) {

    var record = nlapiCreateRecord("customtransaction_customer_number_ed");
    record.setFieldValue("custbody_customer_ref_auto_number", recID);
    record.setFieldValue("subsidiary", subsidi);
    var id = nlapiSubmitRecord(record, true, true);
    nlapiLogExecution("DEBUG", "id", id);
    nlapiSubmitField("customer", recID, "custentity_customer_custom_id", id);
}

// 








