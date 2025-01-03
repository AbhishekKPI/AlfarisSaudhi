function closeWRprojects() {
    var jobId = nlapiGetContext().getSetting('SCRIPT', 'custscript_jobid');
    var timeStamp = nlapiGetContext().getSetting('SCRIPT', 'custscript_jobtimesheet');
    var totalProjectCost = 0;
    var totalLabCost = 0;
    var totalLaborCost = 0;
    var totalmaterCost = 0;
    var totalmaterOutCost = 0;
    var cols = new Array();
    var filtr = new Array();
    cols[0] = new nlobjSearchColumn("hours");
    cols[1] = new nlobjSearchColumn("employee");
    cols[2] = new nlobjSearchColumn("laborcost", "employee");
    filtr[0] = new nlobjSearchFilter("type", null, 'anyof', 'A');
    filtr[1] = new nlobjSearchFilter("customer", null, 'anyof', jobId);
    var timeSearch = nlapiSearchRecord('timebill', null, filtr, cols);
   // nlapiLogExecution('debug', 'timeSearch', JSON.stringify(timeSearch));
    if (timeSearch) {
        nlapiLogExecution('debug', 'timeSearch11', JSON.stringify(timeSearch));
        var hors = 0;
        var horsMnt = 0;
        var totalDuration = 0;
        for (var kk = 0; kk < timeSearch.length; kk++) {
            var row1 = kk + 1;
            var hours = timeSearch[kk].getValue('hours');
            var employee = timeSearch[kk].getText('employee');
            var laborcost = timeSearch[kk].getValue('laborcost', 'employee');
         // alert("hours"+hours+" employee"+employee+" laborcost"+laborcost);
           

            if (hours) {

                var hoursplit = hours.split(':');
                hors = hoursplit[0];
                horsMnt = hoursplit[1];
                if (horsMnt == '00') {
                    horsMnt = 1;
                }
                else if (horsMnt == '15') {
                    horsMnt = 0.25;
                }
                else if (horsMnt == '30') {
                    horsMnt = 0.5;
                }
                else if (horsMnt == '45') {
                    horsMnt = 0.75;
                }
            }
            if (Number(horsMnt) == 1) {
                totalDuration = Number(hors);
            } else {
                totalDuration = Number(hors) + Number(horsMnt);
            }
            totalLabCost = Number(totalDuration) * Number(laborcost);
            totalLaborCost = Number(totalLaborCost) + Number(totalLabCost);

        }
    }
    ////////////////Actual Materl/////////////////
    var NETSUITE_ACCOUNT_ID = '4647359';
    var BASE_URL = 'https://4647359.restlets.api.netsuite.com/app/site/hosting/restlet.nl';
    var HTTP_METHOD = 'POST';
    var SCRIPT_ID = '1076';
    var OAUTH_VERSION = '1.0';
    var SCRIPT_DEPLOYMENT_ID = '1';
    // var TOKEN_ID = "ce905373eabe2b2c92db61badeac9aafcd35828912496eb6016aa95161db0e19";
    // var TOKEN_SECRET = "d758f80a289ddff233883de3748945e96d2ec5ebab0ea11a206e9493d458915c";
    // var CONSUMER_KEY = "4e77aca903f6f63487fe1f94d6d29186aab3ffe5d94b28f7caf56dfc2380e577";
    // var CONSUMER_SECRET = "42ea14a4c8ae199a2fd29aa5e6f7b5cae683855859708593d16a6cc2a6fe83a2";

    var TOKEN_ID = "1f255eb99436a8a134ee69ac18dc658e1f2a9ad8865e5cd93791ca61dab04d54";
    var TOKEN_SECRET = "f2a84b6c2e4afa68379c75824a4d66ca6b332b60e8a70139d608401f3b4f12ec";
    var CONSUMER_KEY = "5d1a5bcd5562aeb1dce4d377849398bb79930bcaf2127c0882bc414a6089b611";
    var CONSUMER_SECRET = "0974b5a72c613c8cad2cff65c06947b38bcae6db57a2fe2aca4fab2988bafd14";

    var text = "";
    var length = 32;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    var OAUTH_NONCE = text;
    var TIME_STAMP = Math.round(+new Date() / 1000);
    var data = '';
    data = data + 'deploy=' + SCRIPT_DEPLOYMENT_ID + '&';
    data = data + 'oauth_consumer_key=' + CONSUMER_KEY + '&';
    data = data + 'oauth_nonce=' + OAUTH_NONCE + '&';
    data = data + 'oauth_signature_method=' + 'HMAC-SHA256' + '&';
    data = data + 'oauth_timestamp=' + TIME_STAMP + '&';
    data = data + 'oauth_token=' + TOKEN_ID + '&';
    data = data + 'oauth_version=' + OAUTH_VERSION + '&';
    data = data + 'script=' + SCRIPT_ID;
    var encodedData = encodeURIComponent(data);
    var completeData = HTTP_METHOD + '&' + encodeURIComponent(BASE_URL) + '&' + encodedData;
    //  var hmacsha1Data = CryptoJS.HmacSHA256(completeData, CONSUMER_SECRET + '&' + TOKEN_SECRET);
    var hmacsha1Data = CryptoJS.HmacSHA256(completeData, CONSUMER_SECRET + '&' + TOKEN_SECRET);


    var base64EncodedData = hmacsha1Data.toString(CryptoJS.enc.Base64);  // My first way to use this
    var oauth_signature = encodeURIComponent(base64EncodedData);
    var OAuth = 'OAuth oauth_signature="' + oauth_signature + '",';
    OAuth = OAuth + 'oauth_version="1.0",';
    OAuth = OAuth + 'oauth_nonce="' + OAUTH_NONCE + '",';
    OAuth = OAuth + 'oauth_signature_method="HMAC-SHA256",';
    OAuth = OAuth + 'oauth_consumer_key="' + CONSUMER_KEY + '",';
    OAuth = OAuth + 'oauth_token="' + TOKEN_ID + '",';
    OAuth = OAuth + 'oauth_timestamp="' + TIME_STAMP + '",';
    OAuth = OAuth + 'realm="' + NETSUITE_ACCOUNT_ID + '"';

    // var data = '';
    var body = {
        "jobID": jobId
    };
    var url = BASE_URL + '?script=' + SCRIPT_ID + '&deploy=' + SCRIPT_DEPLOYMENT_ID;
    var header = { "Authorization": OAuth, "Content-Type": 'application/json' };
    body = JSON.stringify(body, replacer);
    var urlresponse = nlapiRequestURL(url, body, header, null, "POST");

    var responseCode = urlresponse.getCode();
    var responseBody = urlresponse.getBody();
    var obj = JSON.parse(responseBody);

    nlapiLogExecution('debug', 'responseCode=================', responseCode);
    nlapiLogExecution('debug', 'obj len=================', obj.length);
    if (responseCode == 200) {
        var totalmat = 0;
        var avgCost = 0;
        for (var i = 0; i < obj.length; i++) {
            nlapiLogExecution("DEBUG", "sono===========", sono);
            var sono = obj[i].sono;
            var item = obj[i].item;
            var itemCode = obj[i].itemCode;
            var descrp = obj[i].descrp;
            var quantity = obj[i].quantity;
            var fulfil = obj[i].fulfil;
            var itemType = obj[i].itemType;
            var specialorder = obj[i].specialorder;
            var rate = obj[i].rate;
            var remain = obj[i].remain;
            var poDescription = obj[i].poDescription;
            var purchaseorder = obj[i].purchaseorder;
            var avgCostest = obj[i].avgCostest;
            var qtyAuth = obj[i].qtyAuth;
            var trandate = obj[i].sodate;
            var soDescription = obj[i].soDescription;
            var unit = obj[i].unit;
            avgCostest = avgCostest;
            if (item != 5213) {
                if (fulfil > 0) {
                    totalmat = Number(fulfil) * Number(avgCostest);
                    totalmaterCost = Number(totalmaterCost) + Number(totalmat);
                    nlapiLogExecution("DEBUG", "totalmat******************", totalmat);
                }
            }
        }
    }
    ////////////////End Actual Materl/////////////////

    //////Actual Outsource Material Cost//////
    var filterOut = ["jobmain.internalid", "anyof", jobId];
  //  var woResDmOut = nlapiSearchRecord("transaction", "customsearch_work_request_related_so_2_2", filterOut);
  var woResDmOut = nlapiSearchRecord("salesorder",null,
[
   ["type","anyof","SalesOrd"], 
   "AND", 
   ["shipping","is","F"], 
   "AND", 
   ["cogs","is","F"], 
   "AND", 
   ["mainline","is","F"], 
   "AND", 
   ["taxline","is","F"], 
   "AND", 
   ["job.internalid","noneof","@NONE@"], 
   "AND", 
   ["jobmain.internalid","anyof",jobId]
], 
[
   new nlobjSearchColumn("tranid"), 
   new nlobjSearchColumn("type","applyingTransaction",null), 
   new nlobjSearchColumn("item"), 
   new nlobjSearchColumn("specialorder"), 
   new nlobjSearchColumn("displayname","item",null), 
   new nlobjSearchColumn("quantity"), 
   new nlobjSearchColumn("trandate").setSort(false), 
   new nlobjSearchColumn("quantitybilled"), 
   new nlobjSearchColumn("quantitycommitted"), 
   new nlobjSearchColumn("quantityshiprecv"), 
   new nlobjSearchColumn("formulanumeric").setFormula("{quantityshiprecv}-{quantity}"), 
   new nlobjSearchColumn("quantitybilled","fulfillingTransaction",null), 
   new nlobjSearchColumn("quantitycommitted","fulfillingTransaction",null), 
   new nlobjSearchColumn("quantityshiprecv","fulfillingTransaction",null), 
   new nlobjSearchColumn("internalid"), 
   new nlobjSearchColumn("internalid","job",null), 
   new nlobjSearchColumn("amount"), 
   new nlobjSearchColumn("fxamount"), 
   new nlobjSearchColumn("location"), 
   new nlobjSearchColumn("unitstype","item",null), 
   new nlobjSearchColumn("quantity","purchaseOrder",null), 
   new nlobjSearchColumn("rate","purchaseOrder",null), 
   new nlobjSearchColumn("internalid"), 
   new nlobjSearchColumn("type","item",null), 
   new nlobjSearchColumn("memo"), 
   new nlobjSearchColumn("quantity","applyingTransaction",null), 
   new nlobjSearchColumn("appliedtotransaction"), 
   new nlobjSearchColumn("memo","purchaseOrder",null), 
   new nlobjSearchColumn("custcol_bin_no","fulfillingTransaction",null), 
   new nlobjSearchColumn("custcol_serial_slot_number","fulfillingTransaction",null), 
   new nlobjSearchColumn("custcol_multi_qty","fulfillingTransaction",null), 
   new nlobjSearchColumn("formulacurrency").setFormula("ABS({purchaseorder.taxamount})")
]
);
    var totalmatOut = 0;
    var totalmaterOutCost = 0;
    if (woResDmOut) {
        for (var j = 0; j < woResDmOut.length; j++) {
            var sono = woResDmOut[j].getValue('tranid');
            var item = woResDmOut[j].getValue('item');
            var itemCode = woResDmOut[j].getText('item');
            var descrp = woResDmOut[j].getValue('displayname', 'item');
            var quantity = woResDmOut[j].getValue('quantity');
            var fulfil = woResDmOut[j].getValue('quantityshiprecv');
            var itemType = woResDmOut[j].getValue('type', 'item');
            var specialorder = woResDmOut[j].getValue('specialorder');
            var rate = woResDmOut[j].getValue('rate', 'purchaseOrder');
            var applyQty = woResDmOut[j].getValue('quantity', 'applyingTransaction');
            var applyTrans = woResDmOut[j].getValue('type', 'applyingTransaction');
            var poDescription = woResDmOut[j].getValue('memo', 'purchaseOrder');
            var taxamount = woResDmOut[j].getValue("formulacurrency");
            if (item == 5213 && applyTrans == 'PurchOrd') {
                if (specialorder != "") {
                    totalmatOut = (Number(quantity) * Number(rate)) + Number(taxamount);
                    totalmaterOutCost = Number(totalmaterOutCost) + Number(totalmatOut);
                    nlapiLogExecution("DEBUG", "totalmatOut******************", totalmatOut);
                    nlapiLogExecution("DEBUG", "taxamount******************", taxamount);
                    //  log.debug("totalmaterOutCost================",totalmaterOutCost);
                }
            }
        }
    }
    ///////////////////Other Expense///////////////////////////
    var totalOtherExpense = 0;
    var filtOth = new Array();
    var colOth = new Array();
    // colOth[0] = new nlobjSearchColumn("altname", "employee", null);
    colOth[0] = new nlobjSearchColumn("trandate", null);
    colOth[1] = new nlobjSearchColumn("amount", null);
    filtOth[0] = new nlobjSearchFilter("type", null, 'anyof', 'ExpRept');
    filtOth[1] = new nlobjSearchFilter("internalidnumber", 'customer', 'equalto', jobId);
    filtOth[2] = new nlobjSearchFilter("mainline", null, 'is', 'F');
    var retSearchOth = nlapiSearchRecord("expensereport", null, filtOth, colOth);
    if (retSearchOth) {
        for (var oth = 0; oth < retSearchOth.length; oth++) {
            var amount_val = retSearchOth[oth].getValue('amount');
            totalOtherExpense = Number(totalOtherExpense) + Number(amount_val);
        }
    }

    nlapiLogExecution("DEBUG", "totalmaterCost*********************", totalmaterCost);
    nlapiLogExecution("DEBUG", "totalLaborCost*********************", totalLaborCost);
    nlapiLogExecution("DEBUG", "totalmaterOutCost*********************", totalmaterOutCost);

    totalProjectCost = Number(totalmaterCost) + Number(totalLaborCost) + Number(totalmaterOutCost) + Number(totalOtherExpense);
    nlapiSubmitField("job", jobId, "custentity_total_project_cost", totalProjectCost, false, false);
    nlapiSubmitField("job", jobId, "entitystatus", 1, false, false);
    if (jobId) {
        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_trans_rec_id', jobId);
        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_message', "Complete");
    }
}
function getRecItemType(itemtype) {
    itemtype = itemtype.toLowerCase();
    itemtype = (itemtype == "invtpart" ? "inventoryitem" : (itemtype == "noninvtpart" ? "noninventoryitem" : (itemtype == "group" ? "itemgroup" : itemtype)));
    itemtype = (itemtype == "service" || itemtype == "kit" ? itemtype + "item" : (itemtype == "othcharge" ? "otherchargeitem" : itemtype));
    return itemtype;
}

function replacer(key, value) {
    if (typeof value == "number" && !isFinite(value)) {
        return String(value);
    }
    return value;
}