function printWREstprojectCostAction(request, response) {
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


        
       template +='</macrolist>\
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
    <body header="nlheader" header-height="14%" footer="nlfooter" footer-height="10.5%" padding="0.50in 0.5in 0.25in 0.5in" size="Letter">';
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
    template += '<p align="left" style="font-size:12px;"   ><b>ESTIMATED RESOURCES</b></p>';
    template += '<table  class="nospacing lnhght" style="width: 100%;"  cellspacing="1" cellpadding="1">';
    template += '<tr>';
    template += '<td border-left="1" border-bottom="1" border-top="1" border-right="1" align="center"><b>RESOURCE</b>';
    template += '</td>';
    template += '<td border-bottom="1" border-top="1" border-right="1"  align="center"><b>START DATE</b>';
    template += '</td>';
    template += '<td border-bottom="1" border-top="1" border-right="1"  align="center"><b>END DATE</b>';
    template += '</td>';
    template += '<td border-bottom="1" border-top="1" border-right="1"  align="center"><b>HOURS</b></td>';
    template += '<td border-bottom="1" border-top="1" border-right="1"  align="center"><b>LABOUR COST</b></td>';
    template += '<td border-bottom="1" border-top="1" border-right="1"  align="center"><b>COST</b></td>';
    template += '</tr>';
    var grandTotal = 0;
    var totalLabCost = 0;
    var totalLaborCost = 0;
    var cols = new Array();
    var filtr = new Array();
    var totalestcost = 0;
    var resNodata = false;
    var col = new Array();
    var ftr = new Array();
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
            var row = i + 1;
            var resource = woRes[i].getValue('custrecord_ra_resource');
            var resourceName = woRes[i].getText('custrecord_ra_resource');
            var nohours = woRes[i].getValue('custrecord_ra_no_of_hours');
            var startDate = woRes[i].getValue('custrecord_ra_start_date');
            var endDate = woRes[i].getValue('custrecord_ra_end_date');
            laborcost = nlapiLookupField('genericresource', resource, 'laborcost');
            var estCost = parseInt(nohours * laborcost);
            totalestcost = Number(totalestcost) + Number(estCost);
            resNodata = true;
            template += '<tr>';
            template += '<td align="left"  border-left="1" border-bottom="1"  border-right="1">' + resourceName;
            template += '</td>';
            template += '<td align="center" border-bottom="1"  border-right="1">' + startDate;
            template += '</td>';
            template += '<td align="center" border-bottom="1"  border-right="1">' + endDate;
            template += '</td>';
            template += '<td align="center" border-bottom="1"  border-right="1">' + nohours;
            template += '</td>';
            template += '<td align="center" border-bottom="1"  border-right="1">' + laborcost;
            template += '</td>';
            template += '<td align="center" border-bottom="1" border-right="1">' + Number(estCost).toFixed(2);
            template += '</td>';
            template += '</tr>';
        }
    }
    template += '<tr>';
    template += '<td colspan="5" align="center"  border-left="1" border-bottom="1"  border-right="1"><b>TOTAL</b>';
    template += '</td>';
    template += '<td  align="center" border-bottom="1"  border-right="1" style="padding-right:2px;" >' + Number(totalestcost).toFixed(2);
    template += '</td>';
    template += '</tr>';
    grandTotal = Number(grandTotal) + Number(totalestcost);
    if (resNodata == false) {
        template += '<tr>';
        template += '<td colspan="6" align="left"  border-left="1" border-bottom="1"  border-right="1" style="padding-left:2px;"  > No records to show';
        template += '</td>';
        template += '</tr>';
    }
    template += '</table>';


    template += '<p align="left" style="font-size:12px;"   ><b>ESTIMATED MATERIAL</b></p>';
    template += '<table  class="nospacing lnhght" style="width: 100%;" cellspacing="1" cellpadding="1" >';
    template += '<tr >';
    template += '<td width="15%" border-left="1" border-top="1"   border-bottom="1"  border-right="1" align="center"><b>SO REF#</b>';
    template += '</td>';
    template += '<td width="15%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>ITEM CODE</b>';
    template += '</td>';
    template += '<td width="30%" border-bottom="1"   border-top="1" border-right="1" align="center"><b>ITEM DESCRIPTION</b>';
    template += '</td>';
    template += '<td width="10%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>QTY</b>';
    template += '</td>';
    template += '<td width="15%"   border-bottom="1"  border-top="1"  border-right="1" align="center"><b>AVERAGE COST</b>';
    template += '</td>';
    template += '<td width="15%"  border-bottom="1"  border-top="1" border-right="1" align="center"><b>MATERIAL COST</b>';
    template += '</td>';
    template += '</tr>';


    // var NETSUITE_ACCOUNT_ID = '4647359_SB1';
    //var BASE_URL = 'https://4647359-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl';
     //var HTTP_METHOD = 'POST';
     //var SCRIPT_ID = '570';
      //var OAUTH_VERSION = '1.0';
     //var SCRIPT_DEPLOYMENT_ID = '1';
  
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
    var totalmatest = 0;
    var totalmaterCostest = 0;
    var matNodata = false;
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
            if (item != 42570) {
                avgCostest = avgCostest;
                avgCostest = Number(avgCostest).toFixed(2)
                totalmatest = Number(quantity) * Number(avgCostest);
                totalmaterCostest = Number(totalmaterCostest) + Number(totalmatest);
                template += '<tr>';
                template += '<td align="center"  border-left="1" border-bottom="1"  border-right="1">' + sono;
                template += '</td>';
                template += '<td align="center" border-bottom="1"  border-right="1">' + itemCode;
                template += '</td>';
                template += '<td align="center" border-bottom="1"  border-right="1">' + removeNull(relaceCharector(descrp));
                template += '</td>';

                template += '<td align="center" border-bottom="1"  border-right="1">' + quantity;
                template += '</td>';
                template += '<td align="center" border-bottom="1"  border-right="1">' + Number(avgCostest).toFixed(2);
                template += '</td>';
                template += '<td align="center" border-bottom="1"  border-right="1">' + Number(totalmatest).toFixed(2);
                template += '</td>';
                template += '</tr>';
                matNodata = true;
            }

        }
    }


    template += '<tr>';
    template += '<td colspan="5"  align="center"  border-left="1" border-bottom="1"  border-right="1"><b>TOTAL</b>';
    template += '</td>';
    template += '<td  align="center" border-bottom="1"  border-right="1" style="padding-right:2px;"  >' + Number(totalmaterCostest).toFixed(2);
    template += '</td>';
    template += '</tr>';
    grandTotal = Number(grandTotal) + Number(totalmaterCostest);
    if (matNodata == false) {
        template += '<tr>';
        template += '<td style="padding-left:2px;" colspan="6" align="left"  border-left="1" border-bottom="1"  border-right="1">No records to show';
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