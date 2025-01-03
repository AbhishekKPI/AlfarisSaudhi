function printWRExpenseReport(request, response) {
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
    template += '<p align="left" style="font-size:12px;"><b>EXPENSE REPORT</b></p>';
    template += '<table  class="nospacing lnhght" style="width: 100%;" cellspacing="1" cellpadding="1" >';
    template += '<tr >';
    template += '<td width="30%" border-left="1" border-top="1"   border-bottom="1"  border-right="1" align="center"><b>EMPOLYEE NAME</b>';
    template += '</td>';
    template += '<td width="20%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>DESIGNATION</b>';
    template += '</td>';
    template += '<td width="20%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>CATEGORY</b>';
    template += '</td>';
    template += '<td width="15%" border-bottom="1"   border-top="1" border-right="1" align="center"><b>DATE</b>';
    template += '</td>';
    template += '<td width="15%" border-bottom="1"  border-top="1"  border-right="1" align="center"><b>AMOUNT</b>';
    template += '</td>';
    template += '</tr>';
    var resNodata = false;
    var col = new Array();
        var ftr = new Array();
        col[0] = new nlobjSearchColumn("altname", "employee");
        col[1] = new nlobjSearchColumn("trandate");
        col[2] = new nlobjSearchColumn("amount");
        col[3] = new nlobjSearchColumn("title", "employee");
        col[4] = new nlobjSearchColumn("expensecategory");
        ftr[0] = new nlobjSearchFilter("type", null, 'anyof', 'ExpRept');
        ftr[1] = new nlobjSearchFilter("mainline", null, 'is', 'F');
        ftr[2] = new nlobjSearchFilter("internalid", "customer", 'anyof', jobId);
        var woRes = nlapiSearchRecord('expensereport', null, ftr, col);
        if (woRes) {
            var laborcost = 0;
            for (var i = 0; i < woRes.length; i++) {
                var row = i + 1;
                var empName = woRes[i].getValue('altname', "employee");
                var trandate = woRes[i].getValue('trandate');
                var amnt = woRes[i].getValue('amount');
                var designation = woRes[i].getValue('title', "employee");
                var category = woRes[i].getText('expensecategory');
                template += '<tr>';
                template += '<td align="center"  border-left="1" border-bottom="1"  border-right="1">' + empName;
                template += '</td>';
                template += '<td align="center" border-bottom="1"  border-right="1">' + designation;
                template += '</td>';
                template += '<td align="center" border-bottom="1"  border-right="1">' + category;
                template += '</td>';
                template += '<td align="center" border-bottom="1"  border-right="1">' + trandate;
                template += '</td>';
                template += '<td align="center" border-bottom="1"  border-right="1">' + amnt;
                template += '</td>';
                template += '</tr>';
                resNodata = true;
            }
        }
        if (resNodata == false) {
            template += '<tr>';
            template += '<td colspan="5" align="left"  border-left="1" border-bottom="1"  border-right="1" style="padding-left:2px;"  > No records to show';
            template += '</td>';
            template += '</tr>';
        }
    template += '</table>';
    
    template += '<br/>';
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
