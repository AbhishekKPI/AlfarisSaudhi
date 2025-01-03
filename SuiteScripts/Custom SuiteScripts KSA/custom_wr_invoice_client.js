function postSourcingWRAction(type, name) {
    if (type == "item" && name == "item") {
        var custForm = nlapiGetFieldValue('customform');
        if (custForm == 174) {
            var nsRate = nlapiGetCurrentLineItemValue("item", "rate");
            nlapiSetCurrentLineItemValue("item", "custcol_custom_rate", nsRate);
        }
    }
}

function fieldChangedWRAction(type, name) {
    if (type == "item" && name == "custcol_margin") {
        var margin = nlapiGetCurrentLineItemValue('item', 'custcol_margin');
        var oldRate = nlapiGetCurrentLineItemValue('item', 'custcol_custom_rate');
        var projectCost = nlapiGetCurrentLineItemValue('item', 'custcol_project_cost');
        if (projectCost) {
            margin = parseFloat(margin.replace(/[^0-9. ]/g, ""));
            if (margin > 0) {
                discountCalculation();
            }
            else {
                nlapiSetCurrentLineItemValue('item', 'rate', oldRate);
                nlapiSetCurrentLineItemValue('item', 'custcol_margin_discount_amnt', '');
            }
        }
    }
    if (type == "item" && name == "custcol_custom_rate") {
        var oldRate = nlapiGetCurrentLineItemValue('item', 'custcol_custom_rate');
        var margin = nlapiGetCurrentLineItemValue('item', 'custcol_margin');
        var projectCost = nlapiGetCurrentLineItemValue('item', 'custcol_project_cost');
        if (projectCost) {
            margin = parseFloat(margin.replace(/[^0-9. ]/g, ""));
            if (margin > 0) {
                discountCalculation();
            }
            else {
                nlapiSetCurrentLineItemValue('item', 'rate', oldRate);
                nlapiSetCurrentLineItemValue('item', 'custcol_margin_discount_amnt', '');
            }
        }
    }
}

function discountCalculation() {
    var perc = nlapiGetCurrentLineItemValue("item", "custcol_margin");
    var price = nlapiGetCurrentLineItemValue("item", "custcol_project_cost");
    var result = 0;
    var temp = perc;
    var totalCost = 0;
    if (perc.includes("%")) {
        perc = parseFloat(perc.replace(/[^0-9. ]/g, ""));
        result = (price * perc) / 100;
        totalCost = Number(price) + Number(result);
        nlapiSetCurrentLineItemValue("item", "custcol_margin_discount_amnt", result);
    }
    if (temp.includes("%")) {
        var rate = totalCost;
    }
    nlapiSetCurrentLineItemValue("item", "rate", rate, false, false);
}