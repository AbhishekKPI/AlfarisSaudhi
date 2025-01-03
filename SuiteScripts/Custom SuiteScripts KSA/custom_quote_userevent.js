function termsandConditionBfrLd(type, form, request) {
	//Define the values of the beforeLoad type argument	
	nlapiSetFieldDisplay("custbody_reason_for_closed_lost", false);
	var currentContext = nlapiGetContext();

	var forms = nlapiGetFieldValue("customform");
	var sub = nlapiGetFieldValue("subsidiary");
	if (type == 'create') {
		nlapiSetFieldDisplay("custbody_reason_for_closed_lost", false);
	} else {
		var status = nlapiGetFieldValue("entitystatus");
		if (status == 14) {
			nlapiSetFieldDisplay("custbody_reason_for_closed_lost", true);
		} else {
			nlapiSetFieldDisplay("custbody_reason_for_closed_lost", false);
		}
	}
	nlapiLogExecution("debug","type",type)

	if (type == 'view') {
		if (sub != 8 && sub != 1 && sub != 13 && forms != 157) {

			nlapiLogExecution("debug","getting inside")
			var qtID = nlapiGetFieldValue("id");
			form.addButton('custpage_printon_lh', 'Print on Letterhead', 'quotePrintOnlhAction(' + qtID + ')');
			form.addButton('custpage_printPI', 'Print Proforma Invoice', 'quotePrintPI(' + qtID + ')');
			form.setScript('customscript_common_script');
		}

	}
	if ((currentContext.getExecutionContext() == 'userinterface') && (type == 'create') || type == 'view' || type == 'edit') {
		nlapiSetFieldDisplay("custbody_notes_terms", false);
		nlapiSetFieldDisplay("custbody_notes_terms_id", false);
		nlapiSetFieldDisplay("custbody_inclusions_terms", false);
		nlapiSetFieldDisplay("custbody_inclusions_termsid", false);
		nlapiSetFieldDisplay("custbody_exclusion_terms", false);
		nlapiSetFieldDisplay("custbody_exclusion_terms_id", false);
		nlapiSetFieldDisplay("custbody_thirdparty_terms", false);
		nlapiSetFieldDisplay("custbody_thirdparty_termsid", false);
		nlapiSetFieldDisplay("custbody_aramco_terms", false);
		nlapiSetFieldDisplay("custbody_aramco_termsid", false);
		nlapiSetFieldDisplay("custbody_marine_terms", false);
		nlapiSetFieldDisplay("custbody_marine_termsid", false);
		var srchRes = nlapiSearchRecord('customrecord_oofshore_tc_lst', 'customsearch_custom_offshore_tc_search');
		var notesArray = new Array();
		var inclusionArray = new Array();
		var exclusionArray = new Array();
		var thirdpartyArray = new Array();
		var aramcoArray = new Array();
		var marineArray = new Array();

		var no = 0;
		var inc = 0;
		var exc = 0;
		var thr = 0;
		var arm = 0;
		var mar = 0;

		for (var i = 0; i < srchRes.length; i++) {
			if (srchRes[i].getValue("custrecord_terms_and_condtns_offshore") == '1') {
				if (type == 'view') {
					var str = nlapiGetFieldValue("custbody_notes_terms_id");
					if (str) {
						var res = str.split("_");
					}
					if (res) {
						for (var k = 0; k < res.length; k++) {
							if (srchRes[i].getValue("id") == res[k]) {
								notesArray[no] = { 'custpage_terms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_internalid': srchRes[i].getValue("id") };
								no++;
							}
						}
					}
				} else if (type == 'edit') {
					var str = nlapiGetFieldValue("custbody_notes_terms_id");
					if (str) {
						var res = str.split("_");
					}
					var arrExist = isInArray(srchRes[i].getValue("id"), res);
					var checked = '';
					if (arrExist == true) {
						checked = 'T';
					} else { checked = 'F'; }
					notesArray[no] = { 'custpage_noteschk': checked, 'custpage_terms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_internalid': srchRes[i].getValue("id") };
					no++;
				} else {
					notesArray[no] = { 'custpage_terms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_internalid': srchRes[i].getValue("id") };
					no++;
				}
			}
			if (srchRes[i].getValue("custrecord_terms_and_condtns_offshore") == '2') {
				if (type == 'view') {
					var str = nlapiGetFieldValue("custbody_inclusions_termsid");
					if (str) {
						var res = str.split("_");
					}
					if (res) {
						for (var k = 0; k < res.length; k++) {
							if (srchRes[i].getValue("id") == res[k]) {
								inclusionArray[inc] = { 'custpage_inclusionterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_inclusion_internalid': srchRes[i].getValue("id") };
								inc++;
							}
						}
					}
				} else if (type == 'edit') {
					var str = nlapiGetFieldValue("custbody_inclusions_termsid");
					if (str) {
						var res = str.split("_");
					}
					var arrExist = isInArray(srchRes[i].getValue("id"), res);
					var checked = '';
					if (arrExist == true) {
						checked = 'T';
					} else { checked = 'F'; }
					inclusionArray[inc] = { 'custpage_inclusionchk': checked, 'custpage_inclusionterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_inclusion_internalid': srchRes[i].getValue("id") };
					inc++;
				} else {
					inclusionArray[inc] = { 'custpage_inclusionterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_inclusion_internalid': srchRes[i].getValue("id") };
					inc++;
				}
			}
			if (srchRes[i].getValue("custrecord_terms_and_condtns_offshore") == '3') {
				if (type == 'view') {
					var str = nlapiGetFieldValue("custbody_exclusion_terms_id");
					if (str) {
						var res = str.split("_");
					}
					if (res) {
						for (var k = 0; k < res.length; k++) {
							if (srchRes[i].getValue("id") == res[k]) {
								exclusionArray[exc] = { 'custpage_exclusionterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_exclusion_internalid': srchRes[i].getValue("id") };
								exc++;
							}
						}
					}
				} else if (type == 'edit') {
					var str = nlapiGetFieldValue("custbody_exclusion_terms_id");
					if (str) {
						var res = str.split("_");
					}
					var arrExist = isInArray(srchRes[i].getValue("id"), res);
					var checked = '';
					if (arrExist == true) {
						checked = 'T';
					} else { checked = 'F'; }
					exclusionArray[exc] = { 'custpage_exclusionchk': checked, 'custpage_exclusionterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_exclusion_internalid': srchRes[i].getValue("id") };
					exc++;
				} else {
					exclusionArray[exc] = { 'custpage_exclusionterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_exclusion_internalid': srchRes[i].getValue("id") };
					exc++;
				}
			}
			if (srchRes[i].getValue("custrecord_terms_and_condtns_offshore") == '4') {
				if (type == 'view') {
					var str = nlapiGetFieldValue("custbody_thirdparty_termsid");
					if (str) {
						var res = str.split("_");
					}
					if (res) {
						for (var k = 0; k < res.length; k++) {
							if (srchRes[i].getValue("id") == res[k]) {
								thirdpartyArray[thr] = { 'custpage_thirdpartyterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_thirdpartyinternalid': srchRes[i].getValue("id") };
								thr++;
							}
						}
					}
				} else if (type == 'edit') {
					var str = nlapiGetFieldValue("custbody_thirdparty_termsid");
					if (str) {
						var res = str.split("_");
					}
					var arrExist = isInArray(srchRes[i].getValue("id"), res);
					var checked = '';
					if (arrExist == true) {
						checked = 'T';
					} else { checked = 'F'; }
					thirdpartyArray[thr] = { 'custpage_thirdpartychk': checked, 'custpage_thirdpartyterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_thirdpartyinternalid': srchRes[i].getValue("id") };
					thr++;
				} else {
					thirdpartyArray[thr] = { 'custpage_thirdpartyterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_thirdpartyinternalid': srchRes[i].getValue("id") };
					thr++;
				}
			}
			if (srchRes[i].getValue("custrecord_terms_and_condtns_offshore") == '5') {
				if (type == 'view') {
					var str = nlapiGetFieldValue("custbody_aramco_termsid");
					if (str) {
						var res = str.split("_");
					}
					if (res) {
						for (var k = 0; k < res.length; k++) {
							if (srchRes[i].getValue("id") == res[k]) {
								aramcoArray[arm] = { 'custpage_aramcoterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_aramcointernalid': srchRes[i].getValue("id") };
								arm++;
							}
						}
					}
				} else if (type == 'edit') {
					var str = nlapiGetFieldValue("custbody_aramco_termsid");
					if (str) {
						var res = str.split("_");
					}
					var arrExist = isInArray(srchRes[i].getValue("id"), res);
					var checked = '';
					if (arrExist == true) {
						checked = 'T';
					} else { checked = 'F'; }
					aramcoArray[arm] = { 'custpage_aramcochk': checked, 'custpage_aramcoterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_aramcointernalid': srchRes[i].getValue("id") };
					arm++;
				} else {
					aramcoArray[arm] = { 'custpage_aramcoterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_aramcointernalid': srchRes[i].getValue("id") };
					arm++;
				}
			}
			if (srchRes[i].getValue("custrecord_terms_and_condtns_offshore") == '6') {
				if (type == 'view') {
					var str = nlapiGetFieldValue("custbody_marine_termsid");
					if (str) {
						var res = str.split("_");
					}
					if (res) {
						for (var k = 0; k < res.length; k++) {
							if (srchRes[i].getValue("id") == res[k]) {
								marineArray[mar] = { 'custpage_marineterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_marineinternalid': srchRes[i].getValue("id") };
								mar++;
							}
						}
					}
				} else if (type == 'edit') {
					var str = nlapiGetFieldValue("custbody_marine_termsid");
					if (str) {
						var res = str.split("_");
					}
					var arrExist = isInArray(srchRes[i].getValue("id"), res);
					var checked = '';
					if (arrExist == true) {
						checked = 'T';
					} else { checked = 'F'; }
					marineArray[mar] = { 'custpage_marinechk': checked, 'custpage_marineterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_marineinternalid': srchRes[i].getValue("id") };
					mar++;
				} else {
					marineArray[mar] = { 'custpage_marineterms': srchRes[i].getValue("custrecord_advanced_terms"), 'custpage_marineinternalid': srchRes[i].getValue("id") };
					mar++;
				}
			}
		}
		//Add a new tab to the form
		var mainTab = form.addTab('custpage_offshore_tab', 'Offshore T&C');

		//Add a subtab to the first tab
		var notesSubTab = form.addSubTab('custpage_notes_subtab', 'Notes', 'custpage_offshore_tab');
		var notesSublist = form.addSubList('custpage_notes_sublist', 'list', '', 'custpage_notes_subtab');
		notesSublist.addField('custpage_noteschk', 'checkbox', '#');
		notesSublist.addField('custpage_terms', 'text', 'Terms');
		notesSublist.addField('custpage_internalid', 'text', 'internalid').setDisplayType('hidden');
		notesSublist.setLineItemValues(notesArray);

		//Add a second subtab to the first tab
		var inclustionSubTab = form.addSubTab('custpage_inclusion_subtab', 'Inclusions', 'custpage_offshore_tab');
		var inclusionSublist = form.addSubList('custpage_inclusion_sublist', 'list', '', 'custpage_inclusion_subtab');
		inclusionSublist.addField('custpage_inclusionchk', 'checkbox', '#');
		inclusionSublist.addField('custpage_inclusionterms', 'text', 'Terms');
		inclusionSublist.addField('custpage_inclusion_internalid', 'text', 'internalid').setDisplayType('hidden');
		inclusionSublist.setLineItemValues(inclusionArray);

		//Add a third subtab to the first tab
		var exclusionSubTab = form.addSubTab('custpage_exclusion_subtab', 'Exclusions', 'custpage_offshore_tab');
		var exclusionSubTab = form.addSubList('custpage_exclusion_sublist', 'list', '', 'custpage_exclusion_subtab');
		exclusionSubTab.addField('custpage_exclusionchk', 'checkbox', '#');
		exclusionSubTab.addField('custpage_exclusionterms', 'text', 'Terms');
		exclusionSubTab.addField('custpage_exclusion_internalid', 'text', 'internalid').setDisplayType('hidden');
		exclusionSubTab.setLineItemValues(exclusionArray);

		//Add a fourth subtab to the first tab
		var thirdpartySubTab = form.addSubTab('custpage_thirdparty_subtab', '3rd Party Terms', 'custpage_offshore_tab');
		var thirdpartySubTab = form.addSubList('custpage_thirdparty_sublist', 'list', '', 'custpage_thirdparty_subtab');
		thirdpartySubTab.addField('custpage_thirdpartychk', 'checkbox', '#');
		thirdpartySubTab.addField('custpage_thirdpartyterms', 'text', 'Terms');
		thirdpartySubTab.addField('custpage_thirdpartyinternalid', 'text', 'internalid').setDisplayType('hidden');
		thirdpartySubTab.setLineItemValues(thirdpartyArray);

		//Add a fifth subtab to the first tab
		var aramcoSubTab = form.addSubTab('custpage_aramco_subtab', 'Aramco Terms', 'custpage_offshore_tab');
		var aramcoSubTab = form.addSubList('custpage_aramco_sublist', 'list', '', 'custpage_aramco_subtab');
		aramcoSubTab.addField('custpage_aramcochk', 'checkbox', '#');
		aramcoSubTab.addField('custpage_aramcoterms', 'text', 'Terms');
		aramcoSubTab.addField('custpage_aramcointernalid', 'text', 'internalid').setDisplayType('hidden');
		aramcoSubTab.setLineItemValues(aramcoArray);


		//Add a sixth subtab to the first tab
		var marineSubTab = form.addSubTab('custpage_marine_subtab', 'Marine Terms', 'custpage_offshore_tab');
		var marineSubTab = form.addSubList('custpage_marine_sublist', 'list', '', 'custpage_marine_subtab');
		marineSubTab.addField('custpage_marinechk', 'checkbox', '#');
		marineSubTab.addField('custpage_marineterms', 'text', 'Terms');
		marineSubTab.addField('custpage_marineinternalid', 'text', 'internalid').setDisplayType('hidden');
		marineSubTab.setLineItemValues(marineArray);
	}
}
function bforeSubmitAction(type, form) {
	var lnCnt = nlapiGetLineItemCount("item");
	var status = 0;
	for (var i = 1; i < lnCnt + 1; i++) {
		var priceLevel = nlapiGetLineItemValue('item', 'price', i);
		if (priceLevel == '1' || priceLevel == '-1') {
			var rate = nlapiGetLineItemValue("item", "rate", i);
			var basePrice = nlapiGetLineItemValue("item", "custcol_min_base_price", i);
			if (basePrice == "") { basePrice = 0; }
			if (parseFloat(rate) < parseFloat(basePrice)) {
				status = 1;
			}
		}
	}
	if (status == 1) {
		nlapiSetFieldValue("custbody_pricing_approval_required", "T");
	} else {
		nlapiSetFieldValue("custbody_pricing_approval_required", "F");
	}
}
function isInArray(value, array) {
	if (array) {
		return array.indexOf(value) > -1;
	} else {
		return false;
	}

}