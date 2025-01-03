function saveRecordAction(type) {
    var workreqcount = nlapiGetLineItemCount('recmachcustrecord_transaction');
    nlapiSetFieldValue('custbody_punch_list_count', workreqcount);
    var sep = '|-|';
    var punchlistpoints = '';
    if (workreqcount >= 1) {
        for (var i = 0; i < workreqcount; i++) {
            var punchlist = nlapiGetLineItemValue('recmachcustrecord_transaction', 'custrecord_punch_lists', i + 1);
            punchlistpoints += punchlist + sep;
        }
        nlapiSetFieldValue('custbody_punch_list', punchlistpoints);
    }

    return true;
}
function pageInitAction(type) {
    //console.log("type==========="+type);
    if (type == "edit") {
        try {
            var amend = getParameterByName("amend");
            nlapiLogExecution("DEBUG", "amend----------------", amend);
            if (amend == 'T') {
                var new_amendmentversion = 1;
                var recid = nlapiGetRecordId();
                var filter = new Array();
                var cols = new Array();
                cols[0] = new nlobjSearchColumn("custbodyamendmend_no", null, 'MAX');
                filter[0] = new nlobjSearchFilter("type", null, 'anyof', 'PurchOrd');
                filter[1] = new nlobjSearchFilter("internalidnumber", null, 'equalto', recid);
                filter[2] = new nlobjSearchFilter("mainline", null, 'is', 'T');
                var amendPOSearch = nlapiSearchRecord("purchaseorder", null, filter, cols);
                var amendNo = amendPOSearch[0].getValue("custbodyamendmend_no", null, 'MAX');
                if (amendNo) {
                    new_amendmentversion = +amendNo + 1;
                }
                nlapiLogExecution("DEBUG", "new_amendmentversion----------------", new_amendmentversion);
                nlapiSetFieldValue("custbodyamendmend_no", new_amendmentversion);
            }
        } catch (err) {
            nlapiLogExecution("DEBUG", "err----------------");
        }
    }
}

function fieldChangedActionCommon(type, name) {
    if (type == "item" && name == "custcol_discount_percent") {
        discountCalculation();
    }
    if (type == "item" && name == "custcol_custom_rate") {
        discountCalculation();
    }
    if (name == "custbody_common_discount") {
        console.log('custbody_common_discount');
        var disc = nlapiGetFieldValue('custbody_common_discount');
        console.log('disc *** ' + disc);
        if (disc && disc != '' && disc != null) {
            var itemCount = nlapiGetLineItemCount('item');
            console.log("item count-----" + itemCount);
            for (var i = 1; i <= itemCount; i++) {
                nlapiSelectLineItem('item', i);
                nlapiSetCurrentLineItemValue('item', 'custcol_discount_percent', disc, true, true);
                nlapiCommitLineItem('item');

            }
        }
    }
    if (type == "item" && name == "item") {
        nlapiSetCurrentLineItemValue("item", "custcol_custom_rate", '');
        nlapiSetCurrentLineItemValue("item", "custcol_default_rate", '');
        nlapiSetCurrentLineItemValue("item", "custcol_discount_percent", '');
        nlapiSetCurrentLineItemValue("item", "custcol_discount_amount", '');
    }
}
function lineInitAction(type, name) {
    if (type == "item" && name == "item") {
        disableRateField();
    }
}
function postSourcingAction(type, name) {
    var itemid = (nlapiGetCurrentLineItemValue("item", "item") ? nlapiGetCurrentLineItemValue("item", "item") : "");
    if (name == "item" && itemid != "") {
        disableRateField();
        var nsRate = nlapiGetCurrentLineItemValue("item", "rate");
        var defaultVal = nlapiGetCurrentLineItemValue("item", "custcol_default_rate");
        console.log("defaultVal============" + defaultVal);
        if (defaultVal == '' || defaultVal == null || Number(defaultVal) == 0) {
            nlapiSetCurrentLineItemValue("item", "custcol_custom_rate", nsRate);
            nlapiSetCurrentLineItemValue("item", "custcol_default_rate", nsRate);
        }
    }
}
function disableRateField() {
    nlapiDisableLineItemField('item', 'rate', true);
}
function discountCalculation() {
    var perc = nlapiGetCurrentLineItemValue("item", "custcol_discount_percent");
    var price = nlapiGetCurrentLineItemValue("item", "custcol_custom_rate");
    var result = 0;
    var temp = perc;
    if (perc.includes("%")) {
        perc = parseFloat(perc.replace(/[^0-9. ]/g, ""));
        result = (price * perc) / 100;
        nlapiSetCurrentLineItemValue("item", "custcol_discount_amount", result);
    } else {
        result = perc;
        nlapiSetCurrentLineItemValue("item", "custcol_discount_amount", result);
    }
    if (temp.includes("%")) {
        var rate = Number(price) - Number(result);
    } else {
        var rate = parseFloat(+price - +result);
    }
    nlapiSetCurrentLineItemValue("item", "rate", rate, false, false);
}


function validateLineAction(type) {
    var isclosed = nlapiGetCurrentLineItemValue("item", "isclosed");
    var CloseReason = nlapiGetCurrentLineItemValue("item", "custcol_close_reason");
    if (isclosed == "T") {
        if (CloseReason == '' || CloseReason == null) {
            alert("Please enter Close Reason");
            return false;
        }
    }
    return true;
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
