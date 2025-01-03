function pageinitAction(type) {
	var context = nlapiGetContext();
	if (context.getRoleCenter() == "SALESCENTER") {
        nlapiDisableField("terms", true);
    }
}

function fieldChangedAction(type, name) {
    var recType = nlapiGetRecordType();
    if (name == "entitystatus") {
        var entitystatus = nlapiGetFieldValue("entitystatus");
        if (entitystatus == "13" && recType == "lead") {
            nlapiSetFieldValue("custentity_lead_to_customer", "T");
        } else if (recType == "prospect" && entitystatus == "13") {
            nlapiSetFieldValue("custentity_lead_to_customer", "T");
        } else {
            nlapiSetFieldValue("custentity_lead_to_customer", "F");
        }
    }
    if (name == 'custrecord_legal_entities_checkbox') {

        /*var checktrue = nlapiGetCurrentLineItemValue('recmachcustrecord_related_customer','custrecord_legal_entities_checkbox');
          console.log(checktrue);
        if(checktrue == "T"){
        var custname = nlapiGetFieldValue('custrecord_related_customer');
        var legalname = nlapiGetFieldValue('name');
        var custrec = nlapiLoadRecord('customer',custname);
        custrec.setFieldValue('custentity_legal_entity_name',legalname);
        }*/
    }
}

function saveRecordAction() {
	var context = nlapiGetContext();	
	var roleCenter = context.getRoleCenter();
	if(roleCenter == "SALESCENTER"){
		
	}
	
	
	//console.log(context);
	//console.log(roleCenter);
	
	
	//return false;
    var autoid = nlapiGetFieldValue("custentity_auto_id_updated_ornot");
    var entitystatus = nlapiGetFieldValue("entitystatus");
    var leadtocust = nlapiGetFieldValue("custentity_lead_to_customer");
    var recType = nlapiGetRecordType();
    var entityid = nlapiGetFieldValue('custentity_entity_id');
    var long_name = nlapiGetFieldValue('custentity_customer_name');
    if (long_name == ' ') {
        alert("Please enter the Company/Customer Long name");
        return false;
    }
    if (autoid == "T" && entitystatus == "13" && recType == "customer") {
        //console.log(rec);
        var subsidiary = nlapiGetFieldValue("subsidiary");
        if (subsidiary == 1) {
            //SAGIA
            autoIDprocess(5);
        } else if (subsidiary == 2) {
            //SALLC
            autoIDprocess(6);
        } else if (subsidiary == 3) {
            //SAT
            autoIDprocess(7);
        }
    } else if (autoid == "T" && entitystatus == "13" && leadtocust == "T" && entityid == '') {
        var subsidiary = nlapiGetFieldValue("subsidiary");
        if (subsidiary == 1) {
            //SAGIA
            autoIDprocess(5);
        } else if (subsidiary == 2) {
            //SALLC
            autoIDprocess(6);
        } else if (subsidiary == 3) {
            //SAT
            autoIDprocess(7);
        }
    }
    return true;
}

function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function autoIDprocess(loadID) {
    // var res = nlapiLoadRecord("customrecord_custom_configuration", loadID);
    // var minimumDigit = res.getFieldValue("custrecord_minimum_digit");
    // var currentNo = res.getFieldValue("custrecord_current_number");
    // console.log(currentNo + '-cur num');
    // var prefix = res.getFieldValue("custrecord_prefix");
    // var finalno = parseInt(currentNo) + parseInt(1);
    // var IDGenerated = leftPad(finalno, minimumDigit);
    // var finalID = prefix + "" + IDGenerated;
    // nlapiSetFieldValue('custentity_entity_id', finalID);
    // nlapiSetFieldValue("autoname", "F");
    // nlapiSetFieldValue("entityid", finalID);
    var curr = 0;
}