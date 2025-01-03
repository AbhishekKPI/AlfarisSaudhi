    function aftersubmit(type) {
        nlapiLogExecution("DEBUG", "type", type);

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // nlapiLogExecution("DEBUG","autoIDstat",autoIDstat);
        // nlapiLogExecution("DEBUG","insideif","insideif");
        // if (type != "delete") {
        //     var recType = nlapiGetRecordType();
        //     var ID = nlapiGetRecordId();
        //     var recID = nlapiGetRecordId();
        //     var rec = nlapiLoadRecord(recType, recID);


        //     var myuserId = nlapiGetContext().getUser();
        //     var subsidi = rec.getFieldValue("subsidiary");
        //     nlapiLogExecution("DEBUG", "type", type);
        //     nlapiLogExecution("DEBUG", "recType", recType);
        //     nlapiLogExecution("DEBUG", "subsidi", subsidi);

        //     subsidi = subsidi;

        //     if (subsidi == 2) { //SALLC
        //         nlapiLogExecution("DEBUG", "insideifllc", "insideifllc");
        //         autoIDMasterUpdate(subsidi, recID);

        //     } else if (subsidi == 1) { //SAGIA
        //         nlapiLogExecution("DEBUG", "insideSAGIA", "insideSAGIA");
        //         autoIDMasterUpdateSagia(subsidi, recID);

        //     } else if (subsidi == 3) { //SAT
        //         nlapiLogExecution("DEBUG", "insideSAT", "insideSAT");

        //         autoIDMasterUpdateSat(subsidi, recID);

        //     } else if (subsidi == 8) { //SAT
        //         nlapiLogExecution("DEBUG", "insideSAT", "insideSAT");

        //         autoIDMasterUpdateFa(subsidi, recID);

        //     } else if (subsidi == 10 || subsidi == 11 || subsidi == 12) { //ED
        //         nlapiLogExecution("DEBUG", "insideED", "insideED");

        //         autoIDMasterUpdateEnergyDivision(subsidi, recID);
        //     }
        // }

        if (type == 'create' || type == 'copy') {
            var ID = nlapiGetRecordId();
            var recID = nlapiGetRecordId();
            var recType = nlapiGetRecordType();
            var rec = nlapiLoadRecord(recType, recID);
            var myuserId = nlapiGetContext().getUser();
            var subsidi = rec.getFieldValue("custrecord_rent_time_subsidiary");
            nlapiLogExecution("DEBUG", "type", type);
            nlapiLogExecution("DEBUG", "recType", recType);
            nlapiLogExecution("DEBUG", "subsidi", subsidi);

            if (subsidi == 2) { //SALLC
                nlapiLogExecution("DEBUG", "insideSALLC", "insideSALLC");
                var tranid = autoIDMasterUpdate(subsidi, recID);
                var createdId = nlapiLookupField('customtransaction_rent_ts_number_salic', tranid, "tranid")
                nlapiSubmitField("customrecord_rent_timesheet", recID, "name", createdId, false);

            } else if (subsidi == 1) { //SAGIA
                nlapiLogExecution("DEBUG", "insideSAGIA", "insideSAGIA");
                var tranid = autoIDMasterUpdateSagia(subsidi, recID);
                var createdId = nlapiLookupField('customtransaction_rent_ts_number_sagia', tranid, "tranid")
                nlapiSubmitField("customrecord_rent_timesheet", recID, "name", createdId, false);

            } else if (subsidi == 3) { //SAT
                nlapiLogExecution("DEBUG", "insideSAT", "insideSAT");
                var tranid = autoIDMasterUpdateSat(subsidi, recID);
                var createdId = nlapiLookupField('customtransaction_rent_ts_number_sat', tranid, "tranid")
                nlapiSubmitField("customrecord_rent_timesheet", recID, "name", createdId, false);

            } else if (subsidi == 8) { //FA
                nlapiLogExecution("DEBUG", "insideSAT", "insideSAT");
                var tranid = autoIDMasterUpdateFa(subsidi, recID);
                var createdId = nlapiLookupField('customtransaction_rent_ts_number_fa', tranid, "tranid")
                nlapiSubmitField("customrecord_rent_timesheet", recID, "name", createdId, false);

            } else if (subsidi == 10 || subsidi == 11 || subsidi == 12) { //ED
                nlapiLogExecution("DEBUG", "insideED", "insideED");
                var tranid = autoIDMasterUpdateEnergyDivision(subsidi, recID);
                var createdId = nlapiLookupField('customtransaction_rentegrate_ts_num', tranid, "tranid")
                nlapiSubmitField("customrecord_rent_timesheet", recID, "name", createdId, false);

            }
        }
    }





    function autoIDMasterUpdate(subsidi, recID) { //salc
        nlapiLogExecution("DEBUG", "autoIDMasterUpdaterecID", recID);
        var record = nlapiCreateRecord("customtransaction_rent_ts_number_salic");
        record.setFieldValue("custbody_timesheet_ref_number", recID);
        record.setFieldValue("subsidiary", subsidi);
        var id = nlapiSubmitRecord(record, true, true);
        nlapiLogExecution("DEBUG", "id", id);
        return id
    }

    function autoIDMasterUpdateSagia(subsidi, recID) { // sagia

        var record = nlapiCreateRecord("customtransaction_rent_ts_number_sagia");
        record.setFieldValue("custbody_timesheet_ref_sagia", recID);
        record.setFieldValue("subsidiary", subsidi);
        var id = nlapiSubmitRecord(record, true, true);
        nlapiLogExecution("DEBUG", "id", id);
        // nlapiSubmitField("customrecord_rent_timesheet", recID, "name", id);
        return id
    }

    function autoIDMasterUpdateSat(subsidi, recID) { //sat

        var record = nlapiCreateRecord("customtransaction_rent_ts_number_sat");
        record.setFieldValue("custbody_timesheet_ref_sat", recID);
        record.setFieldValue("subsidiary", subsidi);
        var id = nlapiSubmitRecord(record, true, true);
        nlapiLogExecution("DEBUG", "id", id);
        // nlapiSubmitField("customrecord_rent_timesheet", recID, "name", id);
        return id
    }

    function autoIDMasterUpdateFa(subsidi, recID) { //fa

        var record = nlapiCreateRecord("customtransaction_rent_ts_number_fa");
        record.setFieldValue("custbody_timesheet_ref_fa", recID);
        record.setFieldValue("subsidiary", subsidi);
        var id = nlapiSubmitRecord(record, true, true);
        nlapiLogExecution("DEBUG", "id", id);
        // nlapiSubmitField("customrecord_rent_timesheet", recID, "name", id);
        return id
    }
    // 
    function autoIDMasterUpdateEnergyDivision(subsidi, recID) { //ed

        var record = nlapiCreateRecord("customtransaction_rentegrate_ts_num");
        record.setFieldValue("custbody_timesheet_ref_number_ed", recID);
        record.setFieldValue("subsidiary", subsidi);
        var id = nlapiSubmitRecord(record, true, true);
        nlapiLogExecution("DEBUG", "id", id);
        // nlapiSubmitField("customrecord_rent_timesheet", recID, "name", id);
        return id
    }

    //