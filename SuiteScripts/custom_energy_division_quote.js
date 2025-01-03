var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function pageInitAction(type) {
  
    if (type == 'create') {
        /*var today = dateConversion(nlapiGetFieldValue("trandate"));
		var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
		lastDayOfMonth = lastDayOfMonth.getDate()+"-"+monthNames[lastDayOfMonth.getMonth()]+"-"+lastDayOfMonth.getFullYear();
		nlapiSetFieldValue('duedate',lastDayOfMonth, null, false);
		
		var date = new Date(today);
		var newdate = new Date(date);		
		newdate.setDate(newdate.getDate() + 10);
		var expiers = newdate.getDate()+"-"+monthNames[newdate.getMonth()]+"-"+newdate.getFullYear();		
		nlapiSetFieldValue('expectedclosedate',expiers, null, false);*/
        var today = nlapiStringToDate(nlapiGetFieldValue("trandate"));
        var newDate = nlapiDateToString(nlapiAddDays(today, 10));
        nlapiSetFieldValue('expectedclosedate', newDate);
        var lastOfMonth = nlapiDateToString(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        nlapiSetFieldValue('duedate', lastOfMonth);
        var subsidiary = nlapiGetFieldValue("subsidiary");

        // nlapiSetFieldValue('custbody_ed_introduction', 'Dear Sir,&nbsp;<br><p>We thank you very much for your enquiry regarding the above. We on behalf of  are pleased to submit this quotation with rental rate for diesel Generator Sets. While evaluating our offer please make note of the following:<br></p><ul><li>The genset offered is in&nbsp;<b>Sound Attenuated Enclosure</b>.&nbsp;</li><li>The genset offered is built in with integral base fuel tank large capacity, which can hold diesel for 6 hrs of operation at 100% load factor.&nbsp;</li><li>Parts for the periodic maintenance shall be supplied by us.&nbsp;</li><li>Periodic maintenance at regular intervals shall be carried out by us.&nbsp;</li><li>Our equipments are always kept ready for immediate mobilization and operation.</li><li>Very reliable and uninterrupted source of power and the gensets are fuel efficient.&nbsp;</li><li><b>24 hrs</b>&nbsp;"round the clock" service support for maintenance and repair.&nbsp;</li><li>Al Faris Generator Rentals 24 hours 365 days service and breakdown support number is .</li><li>Free maintenance of all our equipments during the contract period.&nbsp;</li><li>Routine visits for regular check up of our equipment.&nbsp;</li><li>Dedicated project management.&nbsp;</li><li>The best sound suppressed and low emission equipment.&nbsp;</li><li>Equipments built with the best safety features adhering to international safety standards. We can provide you application support for any sizing of equipment required.&nbsp;</li><li>A good stock of equipments to meet any emergency requirements.&nbsp;</li><li>Fast delivery of equipment and quick attendance during troubleshooting.&nbsp;</li><li>Our offer for diesel engine powered generating set, housed in sound attenuated enclosure, is back by Al Faris unmatched experience in planning, logistics, operation and support services.</li></ul>');

    }
    if (type == 'copy') {
        var subsidiary = nlapiGetFieldValue("subsidiary");
        var res = nlapiLoadRecord("subsidiary", subsidiary);
        var isenergy = res.getFieldValue("custrecord_is_energy");
        var legalname = res.getFieldValue('legalname');
        var phone = res.getFieldValue('addrphone');
        // nlapiSetFieldValue('custbody_ed_introduction', 'Dear Sir,&nbsp;<br><p>We thank you very much for your enquiry regarding the above. We on behalf of ' + legalname + ' are pleased to submit this quotation with rental rate for diesel Generator Sets. While evaluating our offer please make note of the following:<br></p><ul><li>The genset offered is in&nbsp;<b>Sound Attenuated Enclosure</b>.&nbsp;</li><li>The genset offered is built in with integral base fuel tank large capacity, which can hold diesel for 6 hrs of operation at 100% load factor.&nbsp;</li><li>Parts for the periodic maintenance shall be supplied by us.&nbsp;</li><li>Periodic maintenance at regular intervals shall be carried out by us.&nbsp;</li><li>Our equipments are always kept ready for immediate mobilization and operation.</li><li>Very reliable and uninterrupted source of power and the gensets are fuel efficient.&nbsp;</li><li><b>24 hrs</b>&nbsp;"round the clock" service support for maintenance and repair.&nbsp;</li><li>Al Faris Generator Rentals 24 hours 365 days service and breakdown support number is ' + phone + '.</li><li>Free maintenance of all our equipments during the contract period.&nbsp;</li><li>Routine visits for regular check up of our equipment.&nbsp;</li><li>Dedicated project management.&nbsp;</li><li>The best sound suppressed and low emission equipment.&nbsp;</li><li>Equipments built with the best safety features adhering to international safety standards. We can provide you application support for any sizing of equipment required.&nbsp;</li><li>A good stock of equipments to meet any emergency requirements.&nbsp;</li><li>Fast delivery of equipment and quick attendance during troubleshooting.&nbsp;</li><li>Our offer for diesel engine powered generating set, housed in sound attenuated enclosure, is back by Al Faris unmatched experience in planning, logistics, operation and support services.</li></ul>');

    }
    if (type == 'edit') {
        var subsidiary = nlapiGetFieldValue("subsidiary");
        var res = nlapiLoadRecord("subsidiary", subsidiary);
        var isenergy = res.getFieldValue("custrecord_is_energy");
        var legalname = res.getFieldValue('legalname');
        var phone = res.getFieldValue('addrphone');
        // nlapiSetFieldValue('custbody_ed_introduction', 'Dear Sir,&nbsp;<br><p>We thank you very much for your enquiry regarding the above. We on behalf of ' + legalname + ' are pleased to submit this quotation with rental rate for diesel Generator Sets. While evaluating our offer please make note of the following:<br></p><ul><li>The genset offered is in&nbsp;<b>Sound Attenuated Enclosure</b>.&nbsp;</li><li>The genset offered is built in with integral base fuel tank large capacity, which can hold diesel for 6 hrs of operation at 100% load factor.&nbsp;</li><li>Parts for the periodic maintenance shall be supplied by us.&nbsp;</li><li>Periodic maintenance at regular intervals shall be carried out by us.&nbsp;</li><li>Our equipments are always kept ready for immediate mobilization and operation.</li><li>Very reliable and uninterrupted source of power and the gensets are fuel efficient.&nbsp;</li><li><b>24 hrs</b>&nbsp;"round the clock" service support for maintenance and repair.&nbsp;</li><li>Al Faris Generator Rentals 24 hours 365 days service and breakdown support number is ' + phone + '.</li><li>Free maintenance of all our equipments during the contract period.&nbsp;</li><li>Routine visits for regular check up of our equipment.&nbsp;</li><li>Dedicated project management.&nbsp;</li><li>The best sound suppressed and low emission equipment.&nbsp;</li><li>Equipments built with the best safety features adhering to international safety standards. We can provide you application support for any sizing of equipment required.&nbsp;</li><li>A good stock of equipments to meet any emergency requirements.&nbsp;</li><li>Fast delivery of equipment and quick attendance during troubleshooting.&nbsp;</li><li>Our offer for diesel engine powered generating set, housed in sound attenuated enclosure, is back by Al Faris unmatched experience in planning, logistics, operation and support services.</li></ul>');

        /*if(subsidiary){
        	var res = nlapiLoadRecord("subsidiary", subsidiary);
        	var isenergy = res.getFieldValue("custrecord_is_energy");
        	if(isenergy == "T"){
        	   nlapiSetFieldDisplay("custbody_subsidiary_legal_name", true);
        	   nlapiSetFieldDisplay("custbody_ed_introduction", true);		
        	   nlapiSetFieldDisplay("custbody_period_of_hire", true);
        	   nlapiSetFieldDisplay("custbody_phone", true);
        	   nlapiSetFieldDisplay("custbody_email", true);
        	   nlapiSetFieldDisplay("custbody_mobile_phone", true);
        	   nlapiSetFieldDisplay("job", false);
        	}else{          
        	  nlapiSetFieldDisplay("custbody_subsidiary_legal_name", false);
        	  nlapiSetFieldDisplay("custbody_ed_introduction", false);
        	  nlapiSetFieldDisplay("custbody_period_of_hire", false);
        	  nlapiSetFieldDisplay("custbody_phone", false);
        	  nlapiSetFieldDisplay("custbody_email", false);
        	  nlapiSetFieldDisplay("custbody_mobile_phone", false);
        	  nlapiSetFieldDisplay("job", true);
        	}
        }*/
    }
    nlapiSetFieldDisplay("custbody_notes_terms", false);
    nlapiSetFieldDisplay("custbody_notes_terms_id", false);
    nlapiSetFieldDisplay("custbody_inclusions_terms", false);
    nlapiSetFieldDisplay("custbody_inclusions_termsid", false);
    nlapiSetFieldDisplay("custbody_exclusion_terms", false);
    nlapiSetFieldDisplay("custbody_exclusion_terms_id", false);
}

function fieldChangedAction(type, name) {
    if (name == 'entity') {
        var subsidiary = nlapiGetFieldValue("subsidiary");
        if (subsidiary) {
            var res = nlapiLoadRecord("subsidiary", subsidiary);
            var isenergy = res.getFieldValue("custrecord_is_energy");
            var legalname = res.getFieldValue('legalname');
            var phone = res.getFieldValue('addrphone');
            //console.log(phone);
            if (isenergy == "T") {
                // nlapiSetFieldValue('custbody_ed_introduction', 'Dear Sir,&nbsp;<br><p>We thank you very much for your enquiry regarding the above. We on behalf of ' + legalname + ' are pleased to submit this quotation with rental rate for diesel Generator Sets. While evaluating our offer please make note of the following:<br></p><ul><li>The genset offered is in&nbsp;<b>Sound Attenuated Enclosure</b>.&nbsp;</li><li>The genset offered is built in with integral base fuel tank large capacity, which can hold diesel for 6 hrs of operation at 100% load factor.&nbsp;</li><li>Parts for the periodic maintenance shall be supplied by us.&nbsp;</li><li>Periodic maintenance at regular intervals shall be carried out by us.&nbsp;</li><li>Our equipments are always kept ready for immediate mobilization and operation.</li><li>Very reliable and uninterrupted source of power and the gensets are fuel efficient.&nbsp;</li><li><b>24 hrs</b>&nbsp;"round the clock" service support for maintenance and repair.&nbsp;</li><li>Al Faris Generator Rentals 24 hours 365 days service and breakdown support number is ' + phone + '.</li><li>Free maintenance of all our equipments during the contract period.&nbsp;</li><li>Routine visits for regular check up of our equipment.&nbsp;</li><li>Dedicated project management.&nbsp;</li><li>The best sound suppressed and low emission equipment.&nbsp;</li><li>Equipments built with the best safety features adhering to international safety standards. We can provide you application support for any sizing of equipment required.&nbsp;</li><li>A good stock of equipments to meet any emergency requirements.&nbsp;</li><li>Fast delivery of equipment and quick attendance during troubleshooting.&nbsp;</li><li>Our offer for diesel engine powered generating set, housed in sound attenuated enclosure, is back by Al Faris unmatched experience in planning, logistics, operation and support services.</li></ul>');
                nlapiSetFieldDisplay("custbody_subsidiary_legal_name", true);
                nlapiSetFieldDisplay("custbody_ed_introduction", true);
                nlapiSetFieldDisplay("custbody_period_of_hire", true);
                nlapiSetFieldDisplay("custbody_phone", true);
                nlapiSetFieldDisplay("custbody_email", true);
                nlapiSetFieldDisplay("custbody_mobile_phone", true);

            } else {
                nlapiSetFieldDisplay("custbody_subsidiary_legal_name", false);
                nlapiSetFieldDisplay("custbody_ed_introduction", false);
                nlapiSetFieldDisplay("custbody_period_of_hire", false);
                nlapiSetFieldDisplay("custbody_phone", false);
                nlapiSetFieldDisplay("custbody_email", false);
                nlapiSetFieldDisplay("custbody_mobile_phone", false);
            }
        }
    }
    if (name == 'trandate') {
        /*var today = dateConversion(nlapiGetFieldValue("trandate"));	
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
        lastDayOfMonth = lastDayOfMonth.getDate()+"-"+monthNames[lastDayOfMonth.getMonth()]+"-"+lastDayOfMonth.getFullYear();
        nlapiSetFieldValue('duedate',lastDayOfMonth, null, false);	
		
        var date = new Date(today);
        var newdate = new Date(date);		
        newdate.setDate(newdate.getDate() + 10);
        var expiers = newdate.getDate()+"-"+monthNames[newdate.getMonth()]+"-"+newdate.getFullYear();		
        nlapiSetFieldValue('expectedclosedate',expiers, null, false);*/
        var today = nlapiStringToDate(nlapiGetFieldValue("trandate"));
        var newDate = nlapiDateToString(nlapiAddDays(today, 10));
        nlapiSetFieldValue('expectedclosedate', newDate);
        var lastOfMonth = nlapiDateToString(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        nlapiSetFieldValue('duedate', lastOfMonth);
    }
    //ED Template start---
    if (name == "custbody_ed_template") {
        var edTemplate = nlapiGetFieldValue('custbody_ed_template');
        if (edTemplate == 1) {
            var EdIntroduction = nlapiLookupField('customrecord_ed_template', 1, 'custrecord_ed_temp_generator');

        } else if (edTemplate == 2) {
            var EdIntroduction = nlapiLookupField('customrecord_ed_template', 1, 'custrecord_ed_temp_air_compressor');

        } else if (edTemplate == 3) {
            var EdIntroduction = nlapiLookupField('customrecord_ed_template', 1, 'custrecord_ed_temp_oil_free_air_compress');
        } else if (edTemplate == 4) {
            var EdIntroduction = nlapiLookupField('customrecord_ed_template', 1, 'custrecord_ed_temp_light_tower');
        } else if (edTemplate == 5) {
            var EdIntroduction = nlapiLookupField('customrecord_ed_template', 1, 'custrecord_ed_temp_solar_light_tower');
        } else if (edTemplate == 6) {
            var EdIntroduction = nlapiLookupField('customrecord_ed_template', 1, 'custrecord_ed_temp_welding_machines');
        } else if (edTemplate == 7) {
            var EdIntroduction = nlapiLookupField('customrecord_ed_template', 1, 'custrecord_ed_temp_multiple_equipment');
        }
        nlapiSetFieldValue('custbody_ed_introduction', EdIntroduction);

    }
    //ED Template End---
}

function saveRecordAction() {
    //Notes Terms Start
    var actualTerms = '';
    var actualTermsID = '';
    var notescount = nlapiGetLineItemCount('custpage_notes_sublist');

    var inside = 0;
    for (var i = 1; i < notescount + 1; i++) {
        selectedNotes = nlapiGetLineItemValue('custpage_notes_sublist', 'custpage_noteschk', i);
        if (selectedNotes == 'T') {
            var splter = "";
            var spltrID = "";
            if (inside == 0) {
                splter = "";
                spltrID = "";
            } else {
                splter = "|_|";
                spltrID = "_";
            }
            actualTerms += splter + nlapiGetLineItemValue('custpage_notes_sublist', 'custpage_terms', i);
            actualTermsID += spltrID + nlapiGetLineItemValue('custpage_notes_sublist', 'custpage_internalid', i);
            inside++;
        }
    }
    nlapiSetFieldValue("custbody_notes_terms", actualTerms);
    nlapiSetFieldValue("custbody_notes_terms_id", actualTermsID);
    //Notes Terms End
    //Inclusions Terms Start
    var actualTerms = '';
    var actualTermsID = '';
    var notescount = nlapiGetLineItemCount('custpage_inclusion_sublist');

    var inside = 0;
    for (var i = 1; i < notescount + 1; i++) {
        selectedNotes = nlapiGetLineItemValue('custpage_inclusion_sublist', 'custpage_inclusionchk', i);
        if (selectedNotes == 'T') {
            var splter = "";
            var spltrID = "";
            if (inside == 0) {
                splter = "";
                spltrID = "";
            } else {
                splter = "|_|";
                spltrID = "_";
            }
            actualTerms += splter + nlapiGetLineItemValue('custpage_inclusion_sublist', 'custpage_inclusionterms', i);
            actualTermsID += spltrID + nlapiGetLineItemValue('custpage_inclusion_sublist', 'custpage_inclusion_internalid', i);
            inside++;
        }
    }
    nlapiSetFieldValue("custbody_inclusions_terms", actualTerms);
    nlapiSetFieldValue("custbody_inclusions_termsid", actualTermsID);
    //Inclusions Terms End
    //Exclusion Terms Start
    var actualTerms = '';
    var actualTermsID = '';
    var notescount = nlapiGetLineItemCount('custpage_exclusion_sublist');

    var inside = 0;
    for (var i = 1; i < notescount + 1; i++) {
        selectedNotes = nlapiGetLineItemValue('custpage_exclusion_sublist', 'custpage_exclusionchk', i);
        if (selectedNotes == 'T') {
            var splter = "";
            var spltrID = "";
            if (inside == 0) {
                splter = "";
                spltrID = "";
            } else {
                splter = "|_|";
                spltrID = "_";
            }
            actualTerms += splter + nlapiGetLineItemValue('custpage_exclusion_sublist', 'custpage_exclusionterms', i);
            actualTermsID += spltrID + nlapiGetLineItemValue('custpage_exclusion_sublist', 'custpage_exclusion_internalid', i);
            inside++;
        }
    }
    nlapiSetFieldValue("custbody_exclusion_terms", actualTerms);
    nlapiSetFieldValue("custbody_exclusion_terms_id", actualTermsID);
    //Exclusion Terms end 

    return true;
}

function validateLineAction(type) {
    var priceLevel = nlapiGetCurrentLineItemValue('item', 'price');
    if (priceLevel == '1' || priceLevel == '-1') {
        var rate = nlapiGetCurrentLineItemValue("item", "rate");
        if (rate == "") {
            rate = 0;
        }
        var basePrice = nlapiGetCurrentLineItemValue("item", "custcol_min_base_price");
        if (basePrice == "") {
            basePrice = 0;
        }
        if (parseFloat(rate) < parseFloat(basePrice)) {
            alert("Quote is below minimum base price hence approval required.");
        }
    }
    return true;
}

function printonLetterheadActionED() {
    var estimateId = nlapiGetFieldValue("id");
    window.open("/app/site/hosting/scriptlet.nl?script=209&deploy=1&estID=" + estimateId);
}

function dateConversion(tranDate) {
    tranDate = tranDate.replace("-", " ");
    tranDate = tranDate.replace("-", " ");
    return today = new Date(tranDate);
}