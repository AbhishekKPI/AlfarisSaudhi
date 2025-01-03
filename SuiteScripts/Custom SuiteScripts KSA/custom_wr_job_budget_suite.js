function wrBudgetList(request, response) {
    if (request.getMethod() == 'GET') {
        var form = nlapiCreateForm('PROJECT COST');
        var jobId = request.getParameter('jobId');
        form.addButton('custpage_button', 'Print Actual Project Cost', "printProjectCost(" + jobId + ")");
        form.addButton('custpage_button_estimate', 'Print Estimate Project Cost', "printProjectEstCost(" + jobId + ")");
        var jobsel = form.addField('custpage_sales', 'select', 'Project', 'job').setDisplayType('inline').setDefaultValue(jobId);
        var woArr = new Array();
        var wo = 0;
        var totalestcost = 0;
        var mainTab = form.addTab('custpage_maintab', 'Resources');
        var sublist = form.addSubList('custpage_main_sublist', 'list', 'Estimated Resources', 'custpage_maintab');
        sublist.addField('custpage_resource', 'text', 'Resource');
        sublist.addField('custpage_start_date', 'text', 'Start Date');
        sublist.addField('custpage_end_date', 'text', 'End Date');
        sublist.addField('custpage_no_of_hours', 'text', 'Number of Hours');
        sublist.addField('custpage_labourcost', 'text', 'labour Cost');
        sublist.addField('custpage_est_cost', 'text', 'Estimated Cost');

        var col = new Array();
        var ftr = new Array();
        col[0] = new nlobjSearchColumn("custrecord_ra_resource");
        col[1] = new nlobjSearchColumn("custrecord_ra_start_date");
        col[2] = new nlobjSearchColumn("custrecord_ra_end_date");
        col[3] = new nlobjSearchColumn("custrecord_ra_no_of_hours");
        ftr[0] = new nlobjSearchFilter("custrecord_ra_project_ref", null, 'anyof', jobId);
        var woRes = nlapiSearchRecord('customrecord_wr_cust_resource_allocation', null, ftr, col);
        if (woRes) {
            var laborcost = 0;
            for (var i = 0; i < woRes.length; i++) {
                var row1 = i + 1;
                var resource = woRes[i].getValue('custrecord_ra_resource');
                var resourceName = woRes[i].getText('custrecord_ra_resource');
                var nohours = woRes[i].getValue('custrecord_ra_no_of_hours');
                var startDate = woRes[i].getValue('custrecord_ra_start_date');
                var endDate = woRes[i].getValue('custrecord_ra_end_date');
                laborcost = nlapiLookupField('genericresource', resource, 'laborcost');
                var estCost = parseInt(nohours * laborcost);
                totalestcost = Number(totalestcost) + Number(estCost);
                sublist.setLineItemValue('custpage_resource', row1, resourceName);
                sublist.setLineItemValue('custpage_no_of_hours', row1, nohours);
                sublist.setLineItemValue('custpage_labourcost', row1, laborcost);
                sublist.setLineItemValue('custpage_est_cost', row1, estCost);
                sublist.setLineItemValue('custpage_start_date', row1, startDate);
                sublist.setLineItemValue('custpage_end_date', row1, endDate);
            }
        }

        ///////////////////////Restlets///////////////////////
        var sublist_material_est = form.addSubList('custpage_est_material', 'list', 'Estimated Material', 'custpage_maintab');
        sublist_material_est.addField('custpage_so_id_est', 'text', 'So Ref#');
        sublist_material_est.addField('custpage_item_code_est', 'text', 'Item Code');
        sublist_material_est.addField('custpage_description_est', 'textarea', 'Item Description');
        sublist_material_est.addField('custpage_so_qty', 'float', 'Quantity Fulfilled');
        sublist_material_est.addField('custpage_avg_cost_est', 'currency', 'AVERAGE COST');
        sublist_material_est.addField('custpage_total_mat_est', 'currency', 'Material Cost');
        var sublist_outsource = form.addSubList('custpage_outsource', 'list', 'Actual Outsource Material', 'custpage_maintab');
        sublist_outsource.addField('custpage_out_so_id', 'select', 'PO Ref#', 'transaction').setDisplayType('inline');
        sublist_outsource.addField('custpage_out_item_code', 'text', 'Item Code');
        sublist_outsource.addField('custpage_out_description', 'textarea', 'Item Description');
        sublist_outsource.addField('custpage_out_so_fulfill', 'float', 'Quantity Fulfilled');
        sublist_outsource.addField('custpage_out_avg_cost', 'currency', 'Rate');
        sublist_outsource.addField('custpage_out_total_mat', 'currency', 'Material Cost');
        var sublist_material = form.addSubList('custpage_main_material', 'list', 'Actual Material', 'custpage_maintab');
        sublist_material.addField('custpage_so_id', 'text', 'So Ref#');
        sublist_material.addField('custpage_item_code', 'text', 'Item Code');
        sublist_material.addField('custpage_description', 'textarea', 'Item Description');
        sublist_material.addField('custpage_so_fulfill', 'float', 'Quantity Fulfilled');
        sublist_material.addField('custpage_avg_cost', 'currency', 'AVERAGE COST');
        sublist_material.addField('custpage_total_mat', 'currency', 'Material Cost');
        var totalmatest = 0;
        var totalmaterCostest = 0;
        var totalOutmaterCost = 0;
        var totaloutmat = 0;
        var totalmaterCost = 0;
        var totalmat = 0;
        var count = 1;
        var count1 = 1;
        var countest = 1;

        var NETSUITE_ACCOUNT_ID = '4647359';
        var BASE_URL = 'https://4647359.restlets.api.netsuite.com/app/site/hosting/restlet.nl';
        var HTTP_METHOD = 'POST';
        var SCRIPT_ID = '1076';
        var OAUTH_VERSION = '1.0';
        var SCRIPT_DEPLOYMENT_ID = '1';
        /*var TOKEN_ID = "1de0f198fcd574aa6237f2e77e5afa83340efb75f270a21a1a977f6e8a2fe7c1";
        var TOKEN_SECRET = "581c8dd5e0fcf86c896385f2994d1d4c75322bd073d15de7910391c7044d6b35";
        var CONSUMER_KEY = "e6d8cf4bdb9db0e0ddc188d480d1581398ce3091e4d06695b060fc553f25f3a3";
        var CONSUMER_SECRET = "ea686c5d70292eb0dbaf5dbc108dfe69aba31b122b4c99c4fc2aab6785b3d6cb";*/
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
        nlapiLogExecution('debug', 'body=================', body);
        nlapiLogExecution('debug', 'url=================', url);
        nlapiLogExecution('debug', 'OAuth=================', OAuth);

        if (responseCode == 200) {
            for (var i = 0; i < obj.length; i++) {
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
                var taxamount = obj[i].taxamount;
    nlapiLogExecution("DEBUG","item========",item);
   // nlapiLogExecution("DEBUG","fulfil========",fulfil);
    nlapiLogExecution("DEBUG","quantity========",quantity);
    nlapiLogExecution("DEBUG","rate========",rate);
    nlapiLogExecution("DEBUG","taxamount========",taxamount);

                if (item != 5213) {
                    avgCostest = avgCostest;
                    totalmatest = Number(quantity) * Number(avgCostest);
                    totalmaterCostest = Number(totalmaterCostest) + Number(totalmatest);

                    sublist_material_est.setLineItemValue('custpage_so_id_est', countest, sono);
                    sublist_material_est.setLineItemValue('custpage_item_code_est', countest, itemCode);
                    sublist_material_est.setLineItemValue('custpage_description_est', countest, descrp);
                    sublist_material_est.setLineItemValue('custpage_avg_cost_est', countest, avgCostest);
                    sublist_material_est.setLineItemValue('custpage_so_qty', countest, quantity);
                    sublist_material_est.setLineItemValue('custpage_total_mat_est', countest, totalmatest);
                    countest++;

                    totalmat = Number(fulfil) * Number(avgCostest);
                    totalmaterCost = Number(totalmaterCost) + Number(totalmat);
                    if (fulfil > 0) {
                        sublist_material.setLineItemValue('custpage_so_id', count, sono);
                        sublist_material.setLineItemValue('custpage_item_code', count, itemCode);
                        sublist_material.setLineItemValue('custpage_description', count, descrp);
                        sublist_material.setLineItemValue('custpage_avg_cost', count, avgCostest);
                        sublist_material.setLineItemValue('custpage_so_fulfill', count, fulfil);
                        sublist_material.setLineItemValue('custpage_total_mat', count, totalmat);
                        count++;
                    }
                }

                else if (item == 5213 && specialorder != "" && purchaseorder != '') {
                    descrp = poDescription;
                    totaloutmat = (Number(quantity) * Number(rate)) + Number(taxamount);
                    totalOutmaterCost = Number(totalOutmaterCost) + Number(totaloutmat);
                    sublist_outsource.setLineItemValue('custpage_out_so_id', count1, specialorder);
                    sublist_outsource.setLineItemValue('custpage_out_item_code', count1, itemCode);
                    sublist_outsource.setLineItemValue('custpage_out_description', count1, descrp);
                    sublist_outsource.setLineItemValue('custpage_out_avg_cost', count1, rate);
                    sublist_outsource.setLineItemValue('custpage_out_so_fulfill', count1, quantity);
                    sublist_outsource.setLineItemValue('custpage_out_total_mat', count1, totaloutmat);
                    count1++;
                }
            }
        }
        /////////////////////////End restelet//////////////////////
        var sublist_act = form.addSubList('custpage_main_act', 'list', 'Actual Resources', 'custpage_maintab');
        sublist_act.addField('custpage_act_resource', 'text', 'employee');
        sublist_act.addField('custpage_act_date', 'text', 'Date');
        sublist_act.addField('custpage_act_hours', 'text', 'hours');
        sublist_act.addField('custpage_act_lbcost', 'text', 'labor cost');
        sublist_act.addField('custpage_act_total', 'text', 'Total labor cost');
        var totalLabCost = 0;
        var totalLaborCost = 0;
        var cols = new Array();
        var filtr = new Array();
        cols[0] = new nlobjSearchColumn("hours");
        cols[1] = new nlobjSearchColumn("employee");
        cols[2] = new nlobjSearchColumn("laborcost", "employee");
        cols[3] = new nlobjSearchColumn("date");
        filtr[0] = new nlobjSearchFilter("type", null, 'anyof', 'A');
        filtr[1] = new nlobjSearchFilter("customer", null, 'anyof', jobId);
        var timeSearch = nlapiSearchRecord('timebill', null, filtr, cols);
        if (timeSearch) {
            var hors = 0;
            var horsMnt = 0;
            var totalDuration = 0;
            for (var kk = 0; kk < timeSearch.length; kk++) {
                var row3 = kk + 1;
                var hours = timeSearch[kk].getValue('hours');
                var employee = timeSearch[kk].getText('employee');
                var laborcost = timeSearch[kk].getValue('laborcost', 'employee');
                var actDate = timeSearch[kk].getValue('date');

                if (hours) {
                    var hoursplit = hours.split(':');
                    hors = hoursplit[0];
                    horsMnt = hoursplit[1];
                    if (horsMnt == '00') {
                        horsMnt = 1;
                    }else{
                        horsMnt = horsMnt /60;
                    }
                   /* else if (horsMnt == '15') {
                        horsMnt = 0.25;
                    }
                    else if (horsMnt == '30') {
                        horsMnt = 0.5;
                    }
                    else if (horsMnt == '45') {
                        horsMnt = 0.75;
                    }*/
                }

                if (Number(horsMnt) == 1) {
                    totalDuration = Number(hors);
                } else {
                    totalDuration = Number(hors) + Number(horsMnt);
                }
                totalLabCost = Number(totalDuration) * Number(laborcost);
                totalLaborCost = Number(totalLaborCost) + Number(totalLabCost);

                sublist_act.setLineItemValue('custpage_act_resource', row3, employee);
                sublist_act.setLineItemValue('custpage_act_date', row3, actDate);
                sublist_act.setLineItemValue('custpage_act_hours', row3, hours);
                sublist_act.setLineItemValue('custpage_act_lbcost', row3, laborcost);
                sublist_act.setLineItemValue('custpage_act_total', row3, totalLabCost.toFixed(2));
            }
        }



        var totalOtherExp = 0;
        var sublistOther = form.addSubList('custpage_oth_exp', 'list', 'Other Expense Report', 'custpage_maintab');
        sublistOther.addField('custpage_oth_emp', 'text', 'Employee');
        sublistOther.addField('custpage_oth_date', 'date', 'DATE');
        sublistOther.addField('custpage_oth_amnt', 'currency', 'AMOUNT');
        var filtOth = new Array();
        var colOth = new Array();
        colOth[0] = new nlobjSearchColumn("firstname", "employee", null);
        colOth[1] = new nlobjSearchColumn("trandate", null);
        colOth[2] = new nlobjSearchColumn("amount", null);
        filtOth[0] = new nlobjSearchFilter("type", null, 'anyof', 'ExpRept');
        filtOth[1] = new nlobjSearchFilter("internalidnumber", 'customer', 'equalto', jobId);
        filtOth[2] = new nlobjSearchFilter("mainline", null, 'is', 'F');
        filtOth[3] = new nlobjSearchFilter("shipping", null, 'is', 'F');
        filtOth[4] = new nlobjSearchFilter("cogs", null, 'is', 'F');
        filtOth[5] = new nlobjSearchFilter("taxline", null, 'is', 'F');
        var retSearchOth = nlapiSearchRecord("expensereport", null, filtOth, colOth);
        if (retSearchOth) {
            for (var oth = 0; oth < retSearchOth.length; oth++) {
                var row2 = oth + 1;
                var employeeName = retSearchOth[oth].getValue('firstname', 'employee');
                var trandate = retSearchOth[oth].getValue('trandate');
                var amount_val = retSearchOth[oth].getValue('amount');
                sublistOther.setLineItemValue('custpage_oth_emp', row2, employeeName);
                sublistOther.setLineItemValue('custpage_oth_date', row2, trandate);
                sublistOther.setLineItemValue('custpage_oth_amnt', row2, amount_val);
                totalOtherExp = Number(totalOtherExp) + Number(amount_val);
            }
        }


        var totalEstCost = form.addField('custpage_toatl_est_cost', 'inlinehtml', null, null, 'custpage_maintab')
            .setDefaultValue("<table cellspacing='0'  style='width:100%;border-collapse:collapsetext-align:center;font-size:12px;' ><thead><tr><td style='width:32%;'><b>TOTAL ESTIMATED RESOURCE COST</b></td><td style='width:2%;'>:</td><td style='width:6%;'>" + totalestcost.toFixed(2) + "</td></td><td style='width:60%;'></td></tr><tr><td><b>TOTAL ESTIMATED MATERIAL COST</b><td>:</td><td>" + totalmaterCostest.toFixed(2) + "</td></tr><tr><td><b>TOTAL ACTUAL RESOURCE COST</b><td>:</td><td>" + totalLaborCost.toFixed(2) + "</td></tr><tr><td><b>TOTAL ACTUAL MATERIAL COST</b><td>:</td><td>" + totalmaterCost.toFixed(2) + "</td></tr><tr><tr><td><b>TOTAL ACTUAL OUTSOURCE MATERIAL COST</b><td>:</td><td>" + totalOutmaterCost.toFixed(2) + "</td></tr><tr><td><b>TOTAL OTHER EXPENSE</b><td>:</td><td>" + totalOtherExp.toFixed(2) + "</td></tr></thead></table>");
        response.writePage(form);
        form.setScript('customscript_wr_namechange_client');
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