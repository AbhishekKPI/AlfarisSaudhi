function pageInitAction(type) {
	var currentContext = nlapiGetContext();
	console.log(currentContext);
	var roleid = currentContext.getRoleId();
	console.log(roleid);
	var rolecenter = currentContext.getRoleCenter();
	console.log(rolecenter);
}
function fieldChangeAction(type, name) {
	if (name == 'custbody_mode_of_payment') {
		var modeofpayment = nlapiGetFieldValue("custbody_mode_of_payment");
		if (modeofpayment == 1) {
			nlapiSetFieldDisplay("custbody_cheque_date", true);
			nlapiSetFieldDisplay("custbody_cheque_no", true);
			nlapiSetFieldDisplay("custbody_tt_no", false);
			nlapiSetFieldMandatory('custbody_cheque_date', true);
			nlapiSetFieldMandatory('custbody_cheque_no', true);
		} else if (modeofpayment == 3) {
			nlapiSetFieldDisplay("custbody_tt_no", true);
			nlapiSetFieldDisplay("custbody_cheque_date", false);
			nlapiSetFieldDisplay("custbody_cheque_no", false);
			nlapiSetFieldMandatory('custbody_tt_no', true);
		} else {
			nlapiSetFieldDisplay("custbody_tt_no", false);
			nlapiSetFieldDisplay("custbody_cheque_date", false);
			nlapiSetFieldDisplay("custbody_cheque_no", false);
			//nlapiSetFieldDisplay("custbody_drawn_on",false);
		}
	}
	if (name == 'custbody_vendor_not_a_project_resource') {
		var payee = nlapiGetFieldValue('custbody_vendor_not_a_project_resource');
		nlapiSetFieldValue('entity', payee);
	}
	if (type == "expense") {
		if (name == "account") {
			var accountID = nlapiGetCurrentLineItemValue("expense", "account");
			var lineIndex = nlapiGetCurrentLineItemIndex("expense");
			if (accountID == 207 || accountID == 208) {
				nlapiSetLineItemDisabled("expense", "customer", true, lineIndex);
				nlapiSetLineItemDisabled("expense", "custcol_employee", false, lineIndex);
			} else {
				nlapiSetLineItemDisabled("expense", "customer", false, lineIndex);
				nlapiSetLineItemDisabled("expense", "custcol_employee", true, lineIndex);
			}

		}
	}
}

function validateLineAction(type) {
	var boolComplete = true;
	var accountID = nlapiGetCurrentLineItemValue("expense", "account");
	if (accountID == 207 || accountID == 208) {
		var employee = nlapiGetCurrentLineItemValue("expense", "custcol_employee");
		if (employee) {
			boolComplete = true;
		} else {
			alert("Please enter value(s) for: Employee");
			boolComplete = false;
		}
	} else {
		nlapiSetCurrentLineItemValue("expense", "custcol_employee", "");
		boolComplete = true;
	}
	return boolComplete;
}


function saveRecordAction() {
	var cheque_date = nlapiGetFieldValue('custbody_cheque_date').length;
	var cheque_no = nlapiGetFieldValue('custbody_cheque_no').length;
	var tt_no = nlapiGetFieldValue('custbody_tt_no').length;
	var modeofpayment = nlapiGetFieldValue("custbody_mode_of_payment");
	var subsidiary = nlapiGetFieldValue('subsidiary');
	if (modeofpayment == 1) {
		if (cheque_no == 0) {
			alert("Please enter value(s) for: Cheque No");
			return false;
		}
		if (cheque_date == 0) {
			alert("Please enter value(s) for: Cheque Date");
			return false;
		}
	}
	if (modeofpayment == 3) {
		if (tt_no == 0) {
			alert("Please enter value(s) for: TT No");
			return false;
		}
	}
	var ID = nlapiGetFieldValue("id");
	/*if (ID) {
		var custID = nlapiGetFieldValue("custbody_custom_id");
		nlapiSetFieldValue("tranid", custID);
	} else {
		if (subsidiary == '1') {
			autoIDprocess(3);
		} else if (subsidiary == '2') {
			autoIDprocess(4);
		} else if (subsidiary == '8') {
			autoIDprocess(18);
		}
	}*/
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
	var res = nlapiLoadRecord("customrecord_custom_configuration", loadID);
	var minimumDigit = res.getFieldValue("custrecord_minimum_digit");
	var currentNo = res.getFieldValue("custrecord_current_number");
	console.log(currentNo + '-cur num');
	var prefix = res.getFieldValue("custrecord_prefix");
	var suffix = res.getFieldValue("custrecord_suffix");
	var finalno = parseInt(currentNo) + parseInt(1);
	var IDGenerated = leftPad(finalno, minimumDigit);
	var finalID = prefix + "" + IDGenerated + "" + suffix;
	nlapiSetFieldValue("tranid", finalID);
	nlapiSetFieldValue("custbody_custom_id", finalID);
}