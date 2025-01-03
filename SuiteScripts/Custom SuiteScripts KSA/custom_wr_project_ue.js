function wruserEventBeforeLoad(type, form, request) {
    if (type == "view" || type == "edit") {
        var recid = nlapiGetRecordId();
        nlapiLogExecution("DEBUG", "recid----------------",recid);
        var jobRec = nlapiLoadRecord("job", recid);
        var customForm = jobRec.getFieldValue('customform');
              nlapiLogExecution("DEBUG", "customForm----------------",customForm);

        var recType = jobRec.getFieldValue('custentity_record_type');
        var reqProjectApprov = jobRec.getFieldValue('custentity_wr_requ_projc_approved');
        var reqstApprov = jobRec.getFieldValue('custentity_request_project_approve');
        var status = jobRec.getFieldValue('entitystatus');
        var role = nlapiGetRole();



        if (recType == 4 || recType == 5) {
            form.setScript('customscript_custom_wr_job_button_remove');
        }


        if (reqstApprov == "T" && reqProjectApprov == "T" && (recType == 4 || recType == 3 || recType == 5)) {
            //  if (nlapiGetContext().getUser() == 126567) {
            try {
                var rs = form.getSubList("resourceallocation");
                if (rs) {
                    rs.removeButton('addalocation');
                }
            }
            catch (err) {
                nlapiLogExecution("DEBUG", "err----------------");
            }
            // }


        }


        //&& role!=3
        if ((recType == 4 || recType == 5)&& status != 2 && role != 3) {
            form.removeButton('edit');
            //  form.removeButton('addalocation');
        }



        if (recType == 4 || recType == 3 || recType == 5) {
            form.removeButton('createtemplate');
            form.removeButton('custpage_copy_timesheet');


            var fulfillmentCostField = form.addField("custpage_wr_fulfillment_cost", "currency", "Fulfillment Cost", null).setDisplayType('disabled');

            form.insertField(fulfillmentCostField, 'custentity_total_project_cost');

            var fulfillmentStatusField = form.addField("custpage_wr_fulfillment_status", "text", "Fulfillment Status", null).setDisplayType('disabled');
            form.insertField(fulfillmentStatusField, 'custpage_wr_fulfillment_cost');

            if ((recType == 4 || recType == 5)&& reqstApprov == "T" && reqProjectApprov == "F" && (role == 1021)) {
                form.removeButton('edit');
            }
            if ((recType == 4 || recType == 5)&& reqstApprov == "T" && reqProjectApprov == "T" && (role == 1021)) {
                form.removeButton('edit');
            }
        }

        if (customForm == 56 || customForm == 57 || customForm == 55 || customForm == 118 || customForm == 120 || customForm == 119) {
            nlapiLogExecution("DEBUG", "customForm----------------",customForm);

            var soCustFormID=143;
            if(customForm == 118 || customForm == 120 || customForm == 119){
                soCustFormID=160;
            }
           // var sublistLine = form.getSubList('customsublist7');
            var sublistLine = form.getSubList('customsublist8');
            //nlapiLogExecution("DEBUG", "sublistLine-----------"+sublistLine);
            var jobStatus = jobRec.getFieldValue('entitystatus');

            if (jobStatus == 1 && (recType == 4 || recType == 3 || recType == 5)) {
                form.setScript('customscript_wr_namechange_client');
            }
   // nlapiLogExecution("DEBUG", "jobStatus-----------"+jobStatus);
    //nlapiLogExecution("DEBUG", "recType-----------"+recType);
    //nlapiLogExecution("DEBUG", "role-----------"+role);
    //nlapiLogExecution("DEBUG", "reqstApprov-----------"+reqstApprov);
    //nlapiLogExecution("DEBUG", "jobStatus-----------"+jobStatus);
            if (jobStatus == 2) {
                //if (role == 1015 || role == 1014 || role == 3) {
                    
                if ((((recType == 4 || recType == 5)&& (role == 1015 || role == 1017 || role == 3 || role == 1143 || role == 1140)) || (recType == 3 && (role == 1021 || role == 3 || role == 1022 ||role == 1024))) && (reqstApprov == "F" || reqProjectApprov == "F")) {
                    nlapiLogExecution("DEBUG", "recType----------------",recType);
                    nlapiLogExecution("DEBUG", "role----------------",role);
                    nlapiLogExecution("DEBUG", "reqProjectApprov----------------",reqProjectApprov);
                    nlapiLogExecution("DEBUG", "reqstApprov----------------",reqstApprov);
                    sublistLine.addButton('custpage_new_demand_bulletin', 'New Demand Bulletin', 'window.open(\'/app/accounting/transactions/salesord.nl?cf='+soCustFormID+'&projectDMId=' + recid + '&end=true\',\'_self\')');
                }
                if (reqstApprov == "F" || reqProjectApprov == "F") {
                    var getSublistOth = form.getSubList('customsublist7');
                    getSublistOth.addButton('custpage_ente_other_expense', 'Enter Other Expense', 'window.open(\'/app/accounting/transactions/exprept.nl?cf=144&projectid=' + recid + '\',\'_balnk\')');
                }

            }
            if (jobStatus != 1) {
//nlapiLogExecution("DEBUG", "jobStatus11111----------- "+jobStatus);

                var userRole = nlapiGetContext().getRole();
                var userDepartment = nlapiGetContext().getDepartment();
                var jobDepart = jobRec.getFieldValue('custentity_item_department');
                var demFlag = false;
                var demPO = false;
                var filterso = new Array();
                filterso[0] = new nlobjSearchFilter('custbody_record_type', null, 'anyof', 2);
                filterso[1] = new nlobjSearchFilter('type', null, 'anyof', 'SalesOrd');
                filterso[2] = new nlobjSearchFilter('internalidnumber', 'jobmain', 'equalto', recid);
                filterso[3] = new nlobjSearchFilter('mainline', null, 'is', 'T');
                var colso = new Array();
                colso[0] = new nlobjSearchColumn("statusref");
                //  colso[1] = new nlobjSearchColumn("createdpo");
                var srchResSo = nlapiSearchRecord("salesorder", null, filterso, colso);
                if (srchResSo) {
                    for (var k = 0; k < srchResSo.length; k++) {
                        var soStatus = srchResSo[k].getValue("statusref");
                        nlapiLogExecution("DEBUG", "soStatus--------", soStatus);
                        if (soStatus != "pendingBilling" && soStatus != "closed" && soStatus != "cancelled") {
                            demFlag = true;
                        }
                    }
                    if (demFlag == true) {
                        try{
                        fulfillmentStatusField.setDefaultValue("Fulfillment of DB not completed");
                        }catch (err) {
                            nlapiLogExecution("DEBUG", "err----------------");
                        }
                    } else {
                        try{
                        fulfillmentStatusField.setDefaultValue("Fulfillment of DB completed");
                        }catch (err) {
                            nlapiLogExecution("DEBUG", "err----------------");
                        }
                    }
                }
                nlapiLogExecution("DEBUG", "flag===----------------",demFlag);
                nlapiLogExecution("DEBUG", "reqProjectApprov-===---------------",reqProjectApprov);
               
                if (jobStatus == 2 && (userRole == 1021 || userRole == 3 || userRole == 1143 || userRole == 1140) && demFlag != true && reqProjectApprov == "T") {
                    if (type == "view") {
                       
                        form.addButton('custpage_close_project', 'Close Project', 'closeProject(' + recid + ')');
                        form.setScript('customscript_wr_namechange_client');
                    }
                }

               
            }
            if (type == "view") {
                nlapiLogExecution
                form.addButton('custpage_printworkrequest', 'Estimated Billing Preview', 'window.open(\'/app/site/hosting/scriptlet.nl?script=1068&deploy=1&recId=' + recid + '&end=true\')');
                if (recType == 4 || recType == 3 || recType == 5) {
                    if (jobStatus == 4 && ((recType == 3 && (role == 1024 || role == 3)) || ((recType == 4 || recType == 5) && (role == 1017 || role == 3)))) {
                        form.addButton('custpage_reject_reason', 'Reject', 'jobRejectReason(' + recid + ')');
                        form.setScript('customscript_custom_wr_job_button_remove');
                    }
                }

                if (recType == 4 || recType == 5) {
                    var serviceType = jobRec.getFieldValue('custentity_service_type');
                    var serviceTypeText = jobRec.getFieldText('custentity_service_type');
                    form.addButton('custpage_printexport', 'Export ' + serviceTypeText, 'window.open(\'/app/site/hosting/scriptlet.nl?script=2402&deploy=1&recId=' + recid + '&end=true\')');
                }
            }
            if (form.getTab('custom77')) {
                var sublist = form.addSubList('custpage_main_sublist', 'list', 'Demand Bulletin Details', 'custom77');
                //sublist.addField('custpage_so_id', 'select', 'So Ref#', 'transaction');
                sublist.addField('custpage_sl_no', 'text', 'Sl No.');
                sublist.addField('custpage_so_id', 'text', 'So Ref#');
                sublist.addField('custpage_so_date', 'date', 'Sales Order Date');
                sublist.addField('custpage_item_code', 'select', 'Item Code', 'item').setDisplayType('inline');
                sublist.addField('custpage_so_discription', 'textarea', 'SO Descritoion');
                sublist.addField('custpage_description', 'textarea', 'Description');
                sublist.addField('custpage_qty_order', 'float', 'Quantity Order');
                sublist.addField('custpage_avg_cost', 'currency', 'AVERAGE COST');
                sublist.addField('custpage_so_fulfill', 'float', 'Quantity Fulfilled');
                sublist.addField('custpage_remaining', 'float', 'Remaining Quantity');
                sublist.addField('custpage_qty_returned', 'float', 'Return Quantity');
                sublist.addField('custpage_unit', 'text', 'Unit');
                sublist.addField('custpage_create_po', 'select', 'Create PO', 'transaction').setDisplayType('inline');

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
                    "jobID": recid
                };
                var url = BASE_URL + '?script=' + SCRIPT_ID + '&deploy=' + SCRIPT_DEPLOYMENT_ID;
                var header = { "Authorization": OAuth, "Content-Type": 'application/json' };
                body = JSON.stringify(body, replacer);
                var urlresponse = nlapiRequestURL(url, body, header, null, "POST");



                var responseCode = urlresponse.getCode();
                var responseBody = urlresponse.getBody();

                nlapiLogExecution('debug', 'responseBody=================', responseBody);

                var obj = JSON.parse(responseBody);


                // nlapiLogExecution('debug', 'obj len=================', obj.length);
				 nlapiLogExecution('debug', 'responseCode=================', responseCode);
        nlapiLogExecution('debug', 'obj len=================', obj.length);
        nlapiLogExecution('debug', 'BASE_URL=================', BASE_URL);
        nlapiLogExecution('debug', 'OAuth=================', OAuth);
              
                var totalFulFillmentCost = 0;
                if (responseCode == 200) {
                    var avgCost = 0;
                    var tax =0;
                    var maxLineCount = 0;
                    var num = 1;
                    for (var i = 0; i < obj.length; i++) {
                        var row = i + 1;
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
                        var taxamount = obj[i].taxamount;
                        avgCost = avgCostest;
                        if (item == 5213) {
                            descrp = poDescription;
                            avgCost = rate;
                            tax = taxamount;
                        }

                        if (fulfil > 0) {
                          	nlapiLogExecution("DEBUG", 'totalFulFillmentCost', totalFulFillmentCost);
                            nlapiLogExecution("DEBUG", 'fulfil', fulfil);
                            nlapiLogExecution("DEBUG", 'avgCost', avgCost);
                            //   nlapiLogExecution("DEBUG",'quantity',quantity);
                            totalFulFillmentCost = Number(totalFulFillmentCost) + ((Number(avgCost) * Number(fulfil)) + Number(tax));
                        }
                        sublist.setLineItemValue('custpage_sl_no', row, num.toString());
                        sublist.setLineItemValue('custpage_so_id', row, sono);
                        sublist.setLineItemValue('custpage_so_date', row, trandate);
                        sublist.setLineItemValue('custpage_item_code', row, item);
                        sublist.setLineItemValue('custpage_so_discription', row, soDescription);
                        sublist.setLineItemValue('custpage_description', row, descrp);
                        sublist.setLineItemValue('custpage_qty_order', row, quantity);
                        sublist.setLineItemValue('custpage_avg_cost', row, avgCost);
                        sublist.setLineItemValue('custpage_so_fulfill', row, fulfil);
                        sublist.setLineItemValue('custpage_remaining', row, remain);
                        sublist.setLineItemValue('custpage_qty_returned', row, qtyAuth);
                        sublist.setLineItemValue('custpage_unit', row, unit);
                        sublist.setLineItemValue('custpage_create_po', row, purchaseorder);
                        num++;

                    }
                }
                nlapiLogExecution("DEBUG", 'totalFulFillmentCost', totalFulFillmentCost);
                try{
                fulfillmentCostField.setDefaultValue(totalFulFillmentCost);
                }catch (err) {
                    nlapiLogExecution("DEBUG", "err----------------");
                }
            }
            var sublistRet = form.addSubList('custpage_return_auth', 'list', 'Return Authorization', 'custom77');
            sublistRet.addField('custpage_auth_no', 'text', 'DOCUMENT NUMBER');
            sublistRet.addField('custpage_auth_item', 'text', 'ITEM CODE');
            sublistRet.addField('custpage_auth_item_desc', 'text', 'ITEM DESCRIPTION');
            sublistRet.addField('custpage_auth_date', 'date', 'DATE');
            sublistRet.addField('custpage_auth_qty', 'float', 'QUANTITY');
            sublistRet.addField('custpage_auth_amount', 'currency', 'AMOUNT');
            sublistRet.addField('custpage_auth_status', 'text', 'STATUS');
            var filt = new Array();
            var col = new Array();
            col[0] = new nlobjSearchColumn("tranid", null);
            col[1] = new nlobjSearchColumn("trandate", null);
            col[2] = new nlobjSearchColumn("quantity", null);
            col[3] = new nlobjSearchColumn("amount", null);
            col[4] = new nlobjSearchColumn("item", null);
            col[5] = new nlobjSearchColumn("status", null);
            col[6] = new nlobjSearchColumn("displayname", 'item');
            filt[0] = new nlobjSearchFilter("type", null, 'anyof', 'RtnAuth');
            filt[1] = new nlobjSearchFilter("internalidnumber", 'jobmain', 'equalto', recid);
            filt[2] = new nlobjSearchFilter("shipping", null, 'is', 'F');
            filt[3] = new nlobjSearchFilter("cogs", null, 'is', 'F');
            filt[4] = new nlobjSearchFilter("mainline", null, 'is', 'F');
            filt[5] = new nlobjSearchFilter("taxline", null, 'is', 'F');
            var retSearch = nlapiSearchRecord("returnauthorization", null, filt, col);
            if (retSearch) {
                for (var kk = 0; kk < retSearch.length; kk++) {
                    var row1 = kk + 1;
                    var docNo = retSearch[kk].getValue('tranid');
                    var trandate = retSearch[kk].getValue('trandate');
                    var quantity = retSearch[kk].getValue('quantity');
                    var amount = retSearch[kk].getValue('amount');
                    var item = retSearch[kk].getText('item');
                    var status = retSearch[kk].getValue('status');
                    var itemDesc = retSearch[kk].getValue('displayname', 'item');
                    sublistRet.setLineItemValue('custpage_auth_no', row1, docNo);
                    sublistRet.setLineItemValue('custpage_auth_item', row1, item);
                    sublistRet.setLineItemValue('custpage_auth_item_desc', row1, itemDesc);
                    sublistRet.setLineItemValue('custpage_auth_date', row1, trandate);
                    sublistRet.setLineItemValue('custpage_auth_qty', row1, quantity);
                    sublistRet.setLineItemValue('custpage_auth_amount', row1, amount);
                    sublistRet.setLineItemValue('custpage_auth_status', row1, status);
                }
            }

            // var sublistResourec = form.addSubList('custpage_resource', 'list', 'Resource Allocation', 'resources');
            // sublistResourec.addField('custpage_ra_no', 'text', 'Sl No.');
            // sublistResourec.addField('custpage_ra_resourec', 'text', 'RESOURCE');
            // sublistResourec.addField('custpage_ra_project', 'text', 'PROJECT');
            // sublistResourec.addField('custpage_ra_customer', 'select', 'CUSTOMER');
            // sublistResourec.addField('custpage_ra_start_date', 'textarea', 'START DATE');
            // sublistResourec.addField('custpage_ra_end_date', 'textarea', 'END DATE');
            // sublistResourec.addField('custpage_ra_number_hourse', 'float', 'NUMBER OF HOURS');
        }
    }
}
function wrafterSubmitInitiateWF(type, form) {
    if (type == "create" || type == "copy") {
        var projectid = nlapiGetRecordId();
        var jobRec = nlapiLoadRecord("job", projectid);
        var custForm = jobRec.getFieldValue("customform");
        if (custForm == 56 || custForm == 57 || custForm == 58 || custForm == 118 || custForm == 119 || custForm == 120) {
            var taskType = '';
            if (custForm == 58 || custForm == 119) {
                taskType = 1;
            }
            else if (custForm == 57 ) {
                taskType = 2;
            }
            else if (custForm == 56 || custForm == 118) {
                taskType = 3;
            }
            // nlapiLogExecution("DEBUG", "taskType=================", taskType);
            var recordType = "customrecord_task_master";
            var taskCategory = jobRec.getFieldValue("custentity_category");
            if (taskCategory) {
                var filter = new Array();
                var cols = new Array();
                // cols[0] = new nlobjSearchColumn("custrecord_tm_task_group", null);
                cols[0] = new nlobjSearchColumn("internalid", null);
                filter[0] = new nlobjSearchFilter("custrecord_tm_category", null, 'anyof', taskCategory);
                filter[1] = new nlobjSearchFilter("custrecord_tm_task_type", null, 'anyof', taskType);
                var masterSearch = nlapiSearchRecord("customrecord_task_master", null, filter, cols);
                if (masterSearch) {
                    for (var j = 0; j < masterSearch.length; j++) {
                        // var pdiTaskGroup = masterSearch[j].getValue('custrecord_tm_task_group');
                        var taskList = masterSearch[j].getValue('internalid');
                        //nlapiLogExecution("DEBUG", "taskType1=================", taskType);
                        if (taskType == 1) {
                            var pdiTaskList = nlapiCreateRecord("customrecord_ws_tasks");
                            //pdiTaskList.setFieldValue("custrecord_prj_pdi_tasks", pdiTaskGroup);
                            pdiTaskList.setFieldValue("custrecord_prj_pdi_task", taskList);
                            pdiTaskList.setFieldValue("custrecord_projects", projectid);
                            nlapiSubmitRecord(pdiTaskList);
                        }
                        else if (taskType == 2) {
                            var pmsTaskList = nlapiCreateRecord("customrecord_pms_task");
                            pmsTaskList.setFieldValue("custrecord_prj_pms_task", taskList);
                            pmsTaskList.setFieldValue("custrecord_pms_project_id", projectid);
                            nlapiSubmitRecord(pmsTaskList);
                        }
                        else if (taskType == 3) {
                            var repTaskList = nlapiCreateRecord("customrecord_repair_task");
                            repTaskList.setFieldValue("custrecord_rep_task", taskList);
                            repTaskList.setFieldValue("custrecord_rep_project", projectid);
                            nlapiSubmitRecord(repTaskList);
                        }
                    }
                }
            }
        }
    }
}
function getRecItemType(itemtype) {
    //------------Converting nlapilookup type to itemtype
    itemtype = itemtype.toLowerCase();
    itemtype = (itemtype == "invtpart" ? "inventoryitem" : (itemtype == "noninvtpart" ? "noninventoryitem" : (itemtype == "group" ? "itemgroup" : itemtype)));
    itemtype = (itemtype == "service" || itemtype == "kit" ? itemtype + "item" : (itemtype == "othcharge" ? "otherchargeitem" : itemtype));
    // console.log("itemtype: " + itemtype);
    //------------Converting nlapilookup type to itemtype
    return itemtype;
}

function replacer(key, value) {
    if (typeof value == "number" && !isFinite(value)) {
        return String(value);
    }
    return value;
}
