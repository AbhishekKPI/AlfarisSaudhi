function printWRprojectCostAction(request, response) {
    var renderer = nlapiCreateTemplateRenderer();
    var jobId = request.getParameter('recId');
    var renderer = nlapiCreateTemplateRenderer();
    var res = nlapiLoadRecord("job", jobId);
    var companyInfo = nlapiLoadConfiguration('companyinformation');
    var sb_recId = res.getFieldValue('subsidiary'); //here it is 34 to
    var subsidiary_rec = nlapiLoadRecord('subsidiary', sb_recId);

    var headerlogo = subsidiary_rec.getFieldValue("logo");
    var footerlogotop = subsidiary_rec.getFieldValue("custrecord_subsidiary_top_footer");
    var footerlogobottom = subsidiary_rec.getFieldValue("custrecord_subsidiary_bottom_foot");

    var template = '';
    template += '<?xml version="1.0"?>\
<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\
<pdf>\
    <head>\
        <#if .locale=="ru_RU">\
            <link name="verdana" type="font" subtype="opentype" src="${nsfont.verdana}" src-bold="${nsfont.verdana_bold}" bytes="2" />\
        </#if>\
        <macrolist>';

        
        if (headerlogo) {
            template += '<macro id = "nlheader" > ';
            template += "<img class=\"header\" style=\"width:58%;height:40%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"60\%\" width=\"94\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
            template += '</macro>';
        }
        template += ' <macro id="nlfooter">';

        if (footerlogobottom) {
            template += "<img class=\"footer\" style=\"width:96%; height:100%;top:77px;margin-left:-50px;\" height=\"100\%\" width=\"96\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
        }
        if (footerlogotop) {
            template += "<img class=\"footer\" style=\"top:-20px;left:512px;margin-right:-40px;width:100%; height:100%;\" height=\"100\%\" width=\"96\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogotop).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
            template += "          <table class=\"footer\" style=\"width: 100%;top:-120px;\"><tr> " +
                "            <td align=\"left\"><#if record.custbody_customer_doc_ref_no?has_content>${record.custbody_customer_doc_ref_no} -</#if> ${record.subsidiary} / ${record.tranid} - ${record.entity.altname}</td> " +
                "            <td align=\"right\">&nbsp;" +
                "( Page <pagenumber/> of <totalpages/> ) </td></tr> " +
                "          </table> ";
        }
        template += '    </macro>';



    //         <macro id="nlheader">';
    // template += '<table class="header" style="width: 100%;">\
    //                 <tr>\
    //                     <td valign="bottom" align="left" width="20%">';
    // //if(subsidiary_rec.getFieldValue("logoUrl")){
    // template += '<img src="https://system.eu2.netsuite.com/core/media/media.nl?id=402&amp;c=4119372&amp;h=750acd92c3c49871331f" style="float: left; margin: 7px; width:50%; height: 50%;" />';
    // //}
    // template += '</td>\
    //                     <td valign="bottom" align="left" width="40%">';
    // if (subsidiary_rec.getFieldValue("name")) {
    //     template += '<span class="nameandaddress" style="font-weight: bold;"><big>' + relaceCharector(subsidiary_rec.getFieldValue("name")) + '</big></span>';
    // }
    // template += '<small>\
    //                             <br/>';
    // if (subsidiary_rec.getFieldValue("fax")) {
    //     template += '<br/>Landline : ' + relaceCharector(subsidiary_rec.getFieldValue("fax"));
    // }
    // if (subsidiary_rec.getFieldValue("email")) {
    //     template += '<br/>E-mail : ' + relaceCharector(subsidiary_rec.getFieldValue("email"));
    // }
    // if (subsidiary_rec.getFieldValue("url")) {
    //     template += '<br/>Web : <span style="color:blue;" >' + relaceCharector(subsidiary_rec.getFieldValue("url")) + '</span>';
    // }
    // if (subsidiary_rec.getFieldValue("employerid")) {
    //     template += '<br/>VAT : ' + relaceCharector(subsidiary_rec.getFieldValue("employerid"));
    // }
    // template += '</small>\
    //                         </td>\
    //                         <td valign="bottom" align="right" width="40%">\
    //                         <p class="alignL" style="font-size: 8pt;">';
    // if (subsidiary_rec.getFieldValue("addr1")) {
    //     template += relaceCharector(subsidiary_rec.getFieldValue("addr1"));
    // }
    // if (subsidiary_rec.getFieldValue("addr2")) {
    //     template += '<br/>' + relaceCharector(subsidiary_rec.getFieldValue("addr2"));
    // }
    // if (subsidiary_rec.getFieldValue("city")) {
    //     template += '<br/>' + relaceCharector(subsidiary_rec.getFieldValue("city"));
    // }
    // if (subsidiary_rec.getFieldValue("country")) {
    //     template += '<br/>' + relaceCharector(subsidiary_rec.getFieldText("country")) + '</p>';
    // }
    // template += '</td>\
    //                 </tr>\
    //             </table>\
    //             <hr style="width: 100%; height: 1px; background-color: #ffc966;" />';
    // template += '</macro>\
    //         <macro id="nlfooter">\
    //             <table class="footer" style="width: 100%;">\
    //                 <tr><!--<td align="left"><barcode codetype="code128" showtext="true" value="${record.tranid}"/></td>--><td align="right"><pagenumber/> of <totalpages/></td></tr>\
    //             </table>\
    //         </macro>\
        template += '</macrolist>\
        <style type="text/css">\
            span,table {\
                <#if .locale=="zh_CN">font-family: stsong, sans-serif;\
                <#elseif .locale=="zh_TW">font-family: msung, sans-serif;\
                <#elseif .locale=="ja_JP">font-family: heiseimin, sans-serif;\
                <#elseif .locale=="ko_KR">font-family: hygothic, sans-serif;\
                <#elseif .locale=="ru_RU">font-family: verdana;\
                <#else>font-family: sans-serif;\
                </#if>font-size: 9pt;\
                table-layout: fixed;\
            }\
            th {\
                font-weight: bold;\
                font-size: 8pt;\
                vertical-align: middle;\
                padding: 5px 6px 3px;\
                /*background-color: #e3e3e3;\
                color: #333333;*/\
            }\
            td {\
                padding: 4px 6px;\
            }\
            b {\
                font-weight: bold;\
                color: #333333;\
            }\
           table.header td {\
                padding: 0;\
                font-size: 10pt;\
            }\
           table.footer td {\
                padding: 0;\
                font-size: 8pt;\
            }\
            table.itemtable th {\
                padding-bottom: 10px;\
                padding-top: 10px;\
            }\
            .itemtable{\
                     font-size: 8.5pt !important;\
                     border: 0.5px solid #000000;\
                }\
            table.body td {\
                padding-top: 2px;\
            }\
            table.total {\
                page-break-inside: avoid;\
            }\
           tr.totalrow {\
                background-color: #e3e3e3;\
                line-height: 200%;\
            }\
            td.totalboxtop {\
                font-size: 12pt;\
                background-color: #e3e3e3;\
            }\
            td.addressheader {\
                font-size: 8pt;\
                padding-top: 6px;\
                padding-bottom: 2px;\
            }\
            td.address {\
                padding-top: 0;\
            }\
            td.totalboxmid {\
                font-size: 28pt;\
                padding-top: 20px;\
                background-color: #e3e3e3;\
            }\
            td.totalboxbot {\
                background-color: #e3e3e3;\
                font-weight: bold;\
            }\
            span.title {\
                font-size: 28pt;\
                text-align:center\
            }\
            span.number {\
                font-size: 16pt;\
            }\
            span.itemname {\
                font-weight: bold;\
                line-height: 150%;\
            }\
            hr {\
                width: 100%;\
                color: #d3d3d3;\
                background-color: #d3d3d3;\
                height: 1px;\
            }\
            table.nospacing tr td {\
                padding: 0px;\
            }\
            table.smalltext tr td{\
                font-size: 8pt;\
            }\
            p.alignL{\
                text-align: left;\
            }\
            table.lnhght td{\
                line-height:16;\
            }\
            .row_head{\
                font-size: 8pt !important;\
            }\
            .td_right_line{\
            /*border-right: 0.5px solid #f4f4f4;*/\
             border-right :0.5px solid #000000;            \
            }\
            .td_bottom_line{\
            border-bottom: 0.5px solid #000000;\
            }\
            .td_top_line{\
            /*border-top :0.5px solid #f4f4f4;*/\
             border-top :0.5px solid #000000;\
            }\
            .title{\
            font-weight: bold;\
            align:center!important;\
            font-size:13pt;\
            line-height: 150%;\
            }\
            .fontclass{\
                font-size:13pt;\
            }\
        </style>\
    </head>\
    <body header="nlheader" header-height="12%" footer="nlfooter" footer-height="10.5%" padding="0.5in 0.5in 0.25in 0.5in" size="Letter">';
    template += '<table  class="nospacing lnhght" style="width: 100%;">';
    template += '<tr>';
    template += '<td width="18%"><b>CUSTOMER </b>';
    template += '</td>';
    template += '<td width="2%">:';
    template += '</td>';
    template += '<td width="30%">';
    if (res.getFieldText('parent')) {
        template += relaceCharector(res.getFieldText('parent'));
    }
    template += '</td>';
    template += '<td width="18%"><b>EQUIPMENT NO.</b>';
    template += '</td>';
    template += '<td width="2%">:';
    template += '</td>';
    template += '<td width="30%">';
    if (res.getFieldText('custentity_equipment')) {
        template += relaceCharector(res.getFieldText('custentity_equipment'));
    }else if(res.getFieldText('custentity_ed_equipment')){
        template += relaceCharector(res.getFieldText('custentity_ed_equipment'));
    }
    template += '</td>';
    template += '</tr>';
    template += '<tr>';
    template += '<td width="18%"><b>SALES ORDER REF#</b>';
    template += '</td>';
    template += '<td width="2%">:';
    template += '</td>';
    template += '<td width="30%">';
    if (res.getFieldText('custentity_so_ref')) {
        template += relaceCharector(res.getFieldText('custentity_so_ref'));
    }
    template += '</td>';
    template += '<td width="18%"><b>PROJECT ID</b>';
    template += '</td>';
    template += '<td width="2%">:';
    template += '</td>';
    template += '<td width="30%">';
    if (res.getFieldValue('entityid')) {
        template += relaceCharector(res.getFieldValue('entityid'));
    }
    template += '</td>';
    template += '</tr>';
    template += '</table>';
    template += '<p align="left" style="font-size:12px;"   ><b>ACTUAL RESOURCES</b></p>';
    template += '<table  class="nospacing lnhght" style="width: 100%;"  cellspacing="1" cellpadding="1">';
    template += '<tr>';
    template += '<td border-left="1" border-bottom="1" border-top="1" border-right="1" align="center"><b>EMPLOYEE</b>';
    template += '</td>';
    template += '<td border-bottom="1" border-top="1" border-right="1"  align="center"><b>DATE</b>';
    template += '</td>';
    template += '<td border-bottom="1" border-top="1" border-right="1"  align="center"><b>HOURS</b>';
    template += '</td>';
    template += '<td border-bottom="1" border-top="1" border-right="1"  align="center"><b>LABOR COST</b>';
    template += '</td>';
    template += '<td border-bottom="1" border-top="1" border-right="1"  align="center"><b>TOTAL LABOR COST</b>';
    template += '</td>';
    template += '</tr>';
    var grandTotal = 0;
    var totalLabCost = 0;
    var totalLaborCost = 0;
    var cols = new Array();
    var filtr = new Array();
    var resNodata = false;
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
            var row1 = kk + 1;
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
            resNodata = true;
            template += '<tr>';
            template += '<td align="center"  border-left="1" border-bottom="1"  border-right="1">' + employee;
            template += '</td>';
            template += '<td align="center" border-bottom="1"  border-right="1">' + actDate;
            template += '</td>';
            template += '<td align="center" border-bottom="1"  border-right="1">' + hours;
            template += '</td>';
            template += '<td align="center" border-bottom="1" border-right="1">' + Number(laborcost).toFixed(2);
            template += '</td>';
            template += '<td align="center" border-bottom="1"  border-right="1">' + Number(totalLabCost).toFixed(2);
            template += '</td>';
            template += '</tr>';
        }
    }
    template += '<tr>';
    template += '<td colspan="4" align="center"  border-left="1" border-bottom="1"  border-right="1"><b>TOTAL</b>';
    template += '</td>';
    template += '<td  align="center" border-bottom="1"  border-right="1" style="padding-right:2px;" >' + Number(totalLaborCost).toFixed(2);
    template += '</td>';
    template += '</tr>';
    grandTotal = Number(grandTotal) + Number(totalLaborCost);
    if (resNodata == false) {
        template += '<tr>';
        template += '<td colspan="5" align="left"  border-left="1" border-bottom="1"  border-right="1" style="padding-left:2px;"  > No records to show';
        template += '</td>';
        template += '</tr>';
    }
    template += '</table>';
    template += '<p align="left" style="font-size:12px;"   ><b>ACTUAL MATERIAL</b></p>';
    template += '<table  class="nospacing lnhght" style="width: 100%;" cellspacing="1" cellpadding="1" >';
    template += '<tr >';
    template += '<td width="15%" border-left="1" border-top="1"   border-bottom="1"  border-right="1" align="center"><b>SO REF#</b>';
    template += '</td>';
    template += '<td width="15%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>ITEM CODE</b>';
    template += '</td>';
    template += '<td width="30%" border-bottom="1"   border-top="1" border-right="1" align="center"><b>ITEM DESCRIPTION</b>';
    template += '</td>';
    template += '<td width="10%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>QTY<br/> FULFILLED</b>';
    template += '</td>';
    template += '<td width="15%"   border-bottom="1"  border-top="1"  border-right="1" align="center"><b>AVERAGE COST</b>';
    template += '</td>';
    template += '<td width="15%"  border-bottom="1"  border-top="1" border-right="1" align="center"><b>MATERIAL COST</b>';
    template += '</td>';
    template += '</tr>';

    var totalmaterCost = 0;
    var matNodata = false;
   //  var NETSUITE_ACCOUNT_ID = '4647359_SB1';
    // var BASE_URL = 'https://4647359.restlets.api.netsuite.com/app/site/hosting/restlet.nl';
    // var HTTP_METHOD = 'POST';
    // var SCRIPT_ID = '570';
    // var OAUTH_VERSION = '1.0';
    // var SCRIPT_DEPLOYMENT_ID = '1';
  
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
    //var TOKEN_SECRET = "d758f80a289ddff233883de3748945e96d2ec5ebab0ea11a206e9493d458915c";
    //var CONSUMER_KEY = "4e77aca903f6f63487fe1f94d6d29186aab3ffe5d94b28f7caf56dfc2380e577";
    //var CONSUMER_SECRET = "42ea14a4c8ae199a2fd29aa5e6f7b5cae683855859708593d16a6cc2a6fe83a2";
  
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
            if (item != 16252) {
                avgCostest = avgCostest;
                totalmat = Number(fulfil) * Number(avgCostest);
                totalmaterCost = Number(totalmaterCost) + Number(totalmat);
                matNodata = true;
                if (totalmat > 0) {
                    template += '<tr>';
                    template += '<td border-left="1" border-bottom="1" border-right="1" align="center">' + sono;
                    template += '</td>';
                    template += '<td border-bottom="1"  border-right="1" align="center">' + itemCode;
                    template += '</td>';
                    template += '<td border-bottom="1"  border-right="1" align="left">' + removeNull(relaceCharector(descrp));
                    template += '</td>';
                    template += '<td border-bottom="1"  border-right="1" align="center">' + fulfil;
                    template += '</td>';
                    template += '<td style="padding-right:2px;" border-bottom="1" border-right="1" align="right">' + Number(avgCostest).toFixed(2);
                    template += '</td>';
                    template += '<td border-bottom="1"  style="padding-right:2px;"  border-right="1" align="right">' + Number(totalmat).toFixed(2);
                    template += '</td>';
                    template += '</tr>';
                }
            }

        }
    }



    template += '<tr>';
    template += '<td colspan="5"  align="center"  border-left="1" border-bottom="1"  border-right="1"><b>TOTAL</b>';
    template += '</td>';
    template += '<td  align="right" border-bottom="1"  border-right="1" style="padding-right:2px;"  >' + Number(totalmaterCost).toFixed(2);
    template += '</td>';
    template += '</tr>';
    grandTotal = Number(grandTotal) + Number(totalmaterCost);
    if (matNodata == false) {
        template += '<tr>';
        template += '<td style="padding-left:2px;" colspan="6" align="left"  border-left="1" border-bottom="1"  border-right="1">No records to show';
        template += '</td>';
        template += '</tr>';
    }
    template += '</table>';
    template += '<p align="left" style="font-size:12px;"   ><b>ACTUAL OUTSOURCE MATERIAL</b></p>';
    template += '<table class="nospacing lnhght" style="width: 100%;" cellspacing="1" cellpadding="1" >';
    template += '<tr >';
    template += '<td width="15%" border-left="1" border-top="1"   border-bottom="1"  border-right="1" align="center"><b>SO REF#</b>';
    template += '</td>';
    template += '<td width="15%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>ITEM CODE</b>';
    template += '</td>';
    template += '<td width="30%" border-bottom="1"   border-top="1" border-right="1" align="center"><b>ITEM DESCRIPTION</b>';
    template += '</td>';
    template += '<td width="10%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>QTY<br/> FULFILLED</b>';
    template += '</td>';
    template += '<td width="15%"   border-bottom="1"  border-top="1"  border-right="1" align="center"><b>AVERAGE COST</b>';
    template += '</td>';
    template += '<td width="15%"  border-bottom="1"  border-top="1" border-right="1" align="center"><b>MATERIAL COST</b>';
    template += '</td>';
    template += '</tr>';
    var outsourNodata = false;
    var totalOutmaterCost = 0;
    var filterout = ["jobmain.internalid", "anyof", jobId];
    var woResDmout = nlapiSearchRecord("transaction", "customsearch_work_request_related_so_2_2", filterout);
    var totaloutmat = 0;
    if (woResDmout) {
        for (var sp = 0; sp < woResDmout.length; sp++) {
            var sono = woResDmout[sp].getValue('tranid');
            var item = woResDmout[sp].getValue('item');
            var itemCode = woResDmout[sp].getText('item');
            var descrp = woResDmout[sp].getValue('displayname', 'item');
            var quantity = woResDmout[sp].getValue('quantity');
            var fulfil = woResDmout[sp].getValue('quantityshiprecv');
            var itemType = woResDmout[sp].getValue('type', 'item');
            var specialorder = woResDmout[sp].getValue('specialorder');
            var rate = woResDmout[sp].getValue('rate', 'purchaseOrder');
            var applyQty = woResDmout[sp].getValue('quantity', 'applyingTransaction');
            var applyTrans = woResDmout[sp].getValue('type', 'applyingTransaction');
            var poDescription = woResDmout[sp].getValue('memo', 'purchaseOrder');
            var taxamount = woResDmout[sp].getValue('formulacurrency');
            if (item == 16252 && applyTrans == 'PurchOrd') {
                  rate = Number(rate) + Number(taxamount);
                if (specialorder != "") {
                    descrp = removeNull(relaceCharector(poDescription));
                    totaloutmat = Number(quantity) * Number(rate);
                    totalOutmaterCost = Number(totalOutmaterCost) + Number(totaloutmat);
                    outsourNodata = true;
                    template += '<tr>';
                    template += '<td border-left="1" border-bottom="1"  border-right="1" align="center">' + sono;
                    template += '</td>';
                    template += '<td border-bottom="1"  border-right="1" align="center">' + itemCode;
                    template += '</td>';
                    template += '<td border-bottom="1" border-right="1" align="left">' + descrp;
                    template += '</td>';
                    template += '<td border-bottom="1" border-right="1" align="center">' + quantity;
                    template += '</td>';
                    template += '<td border-bottom="1"  border-right="1" align="right">' + Number(rate).toFixed(2);
                    template += '</td>';
                    template += '<td border-bottom="1" border-right="1" align="right">' + Number(totaloutmat).toFixed(2);
                    template += '</td>';
                    template += '</tr>';
                }
            }
        }
    }
    template += '<tr>';
    template += '<td colspan="5"  align="center" border-left="1" border-bottom="1"  border-right="1"><b>TOTAL</b>';
    template += '</td>';
    template += '<td  align="right"   border-bottom="1"  border-right="1" style="padding-right:2px;"  >' + Number(totalOutmaterCost).toFixed(2);
    template += '</td>';
    template += '</tr>';
    grandTotal = Number(grandTotal) + Number(totalOutmaterCost);
    if (outsourNodata == false) {
        template += '<tr>';
        template += '<td style="padding-left:2px;" colspan="6" align="left"  border-left="1" border-bottom="1"  border-right="1">No records to show';
        template += '</td>';
        template += '</tr>';
    }
    template += '</table>';
    var totalOtherExp = 0;
    template += '<p align="left" style="font-size:12px;"   ><b>OTHER EXPENSE</b></p>';
    template += '<table class="nospacing lnhght" style="width: 100%;" cellspacing="1" cellpadding="1" >';
    template += '<tr>';
    template += '<td width="20%" border-left="1" border-top="1"   border-bottom="1" border-right="1"  align="center"><b>CATEGORY</b>';
    template += '</td>';
    // template += '<td width="20%" border-bottom="1"  border-top="1"  align="center"><b>DATE</b>';
    // template += '</td>';

    template += '<td width="20%"  border-top="1"   border-bottom="1"   align="center"><b>QUANTITY</b>';
    template += '</td>';

    template += '<td width="20%" border-left="1" border-top="1"   border-bottom="1"  border-right="1" align="center"><b>RATE</b>';
    template += '</td>';
    template += '<td width="20%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>AMOUNT</b>';
    template += '</td>';
    template += '</tr>';
    var otherExp = false;
    var filtOth = new Array();
    var colOth = new Array();
    colOth[0] = new nlobjSearchColumn("firstname", "employee", null);
    colOth[1] = new nlobjSearchColumn("trandate", null);
    colOth[2] = new nlobjSearchColumn("amount", "expenseDetail", null);
    colOth[3] = new nlobjSearchColumn("expensecategory", null);
    colOth[4] = new nlobjSearchColumn("rate", "expenseDetail", null);
    colOth[5] = new nlobjSearchColumn("quantity", "expenseDetail", null);
    filtOth[0] = new nlobjSearchFilter("type", null, 'anyof', 'ExpRept');
    filtOth[1] = new nlobjSearchFilter("internalidnumber", 'customer', 'equalto', jobId);
    filtOth[2] = new nlobjSearchFilter("mainline", null, 'is', 'F');
    var retSearchOth = nlapiSearchRecord("expensereport", null, filtOth, colOth);
    if (retSearchOth) {
        for (var oth = 0; oth < retSearchOth.length; oth++) {
            var employeeName = retSearchOth[oth].getValue('firstname', 'employee');
            var trandate = retSearchOth[oth].getValue('trandate');
            var amount_val = retSearchOth[oth].getValue('amount', "expenseDetail");
            var expCat = retSearchOth[oth].getText('expensecategory');
            var expQty = retSearchOth[oth].getValue('quantity', "expenseDetail");
            var exprate = retSearchOth[oth].getValue('rate', "expenseDetail");
            totalOtherExp = Number(totalOtherExp) + Number(amount_val);
            otherExp = true;
            template += '<tr>';
            template += '<td border-left="1" border-bottom="1"  border-right="1" align="center">' + expCat;
            template += '</td>';
            // template += '<td border-bottom="1"  border-right="1" align="center">' + trandate;
            // template += '</td>';

            template += '<td border-bottom="1"  border-right="1" align="center">' + expQty;
            template += '</td>';

            template += '<td border-bottom="1"  border-right="1" align="center">' + exprate;
            template += '</td>';

            template += '<td border-bottom="1" border-right="1" align="right">' + amount_val;
            template += '</td>';
            template += '</tr>';
        }
    }
    template += '<tr>';
    template += '<td colspan="3"  align="center" border-left="1" border-bottom="1"  border-right="1"><b>TOTAL</b>';
    template += '</td>';
    template += '<td  align="right"   border-bottom="1"  border-right="1" style="padding-right:2px;"  >' + Number(totalOtherExp).toFixed(2);
    template += '</td>';
    template += '</tr>';

    grandTotal = Number(grandTotal) + Number(totalOtherExp);
    if (otherExp == false) {
        template += '<tr>';
        template += '<td style="padding-left:2px;" colspan="4" align="left"  border-left="1" border-bottom="1"  border-right="1">No records to show';
        template += '</td>';
        template += '</tr>';
    }
    template += '</table>';
    template += '<br/>';
    template += '<p align="center" style="font-size:12px;"   ><b>GRAND TOTAL&nbsp;:&nbsp;' + Number(grandTotal).toFixed(2) + '</b></p>';
    template += '</body>\
</pdf>';
    renderer.setTemplate(template);
    renderer.addRecord('record', res);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'WorkRequest_' + res.getFieldValue("tranid") + '.pdf', 'inline');
    response.write(file.getValue());
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function relaceCharector(charVal) {
    return charVal.replace(/&/g, "&amp;");
}
function strReplace(str, replaceVal) {
    var res = str.replace(replaceVal, "");
    return res;
}
function getRecItemType(itemtype) {
    itemtype = itemtype.toLowerCase();
    itemtype = (itemtype == "invtpart" ? "inventoryitem" : (itemtype == "noninvtpart" ? "noninventoryitem" : (itemtype == "group" ? "itemgroup" : itemtype)));
    itemtype = (itemtype == "service" || itemtype == "kit" ? itemtype + "item" : (itemtype == "othcharge" ? "otherchargeitem" : itemtype));
    return itemtype;
}
function removeNull(string) {
    if (string == null) {
        string = "";
    } else {
        string = string;
    }
    return string;
}
function replacer(key, value) {
    if (typeof value == "number" && !isFinite(value)) {
        return String(value);
    }
    return value;
}
