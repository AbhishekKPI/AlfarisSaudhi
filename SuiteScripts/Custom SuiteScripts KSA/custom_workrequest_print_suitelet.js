function prinWorkRequestAction(request, response) {
    var renderer = nlapiCreateTemplateRenderer();
    var recID = request.getParameter('recId');
    // nlapiLogExecution("Debug", "recID", recID);
    var renderer = nlapiCreateTemplateRenderer();
    var res = nlapiLoadRecord("salesorder", recID);
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
        //     //template +='<p>sb_recId '+sb_recId +" " +subsidiary_rec.getFieldValue("logo")+'</p>';
        // template += '<table class="header" style="width: 100%;">\
        //                 <tr>\
        //                     <td valign="bottom" align="left" width="20%">';
        // //if(subsidiary_rec.getFieldValue("logoUrl")){
        // //"<img class=\"header\" style=\"width:58%;height:40%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"50\%\" width=\"94\%\"  src = \"";
        // template += "<img class=\"header\" style=\"width:58%;height:40%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"50\%\" width=\"94\%\"  src = \"";

        // //  template += '<img src="https://system.eu2.netsuite.com/core/media/media.nl?id=402&amp;c=4119372&amp;h=750acd92c3c49871331f" style="float: left; margin: 7px; width:50%; height: 50%;" />';
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
        //     template += '<br/>Web : ' + relaceCharector(subsidiary_rec.getFieldValue("url"));
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
        template += '</macro>';
    }
    template += ' <macro id="nlfooter">';
    // <table class="footer" style="width: 100%;">\
    //     <tr><!--<td align="left"><barcode codetype="code128" showtext="true" value="${record.tranid}"/></td>--><td align="right"><pagenumber/> of <totalpages/></td></tr>\
    // </table>\

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
    template += ' </macrolist>\
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
            font-size:16pt;\
            line-height: 150%;\
            }\
        </style>\
    </head>\
    <body header="nlheader" header-height="14%" footer="nlfooter" footer-height="10.5%" padding="0.50in 0.5in 0.25in 0.5in" size="Letter">';
    template += '<table class="nospacing lnhght" style="width: 100%;">\
        <tr><td colspan="2" align="center" class="title">WORK REQUEST SUMMARY: ${record.tranid}<br/><br/></td></tr>\
            <tr>\
                <td>\
                    <table>';
    if (res.getFieldValue('entity')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Customer</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>' + relaceCharector(res.getFieldText('entity')) + '</p></td>\
                            </tr>';
    }
    if (res.getFieldValue('customform') == 159 || res.getFieldValue('customform') == 160) {
        if (res.getFieldValue('custbody_ed_work_order_equipments')) {
            template += '<tr>\
                                <td width="25%" style="font-weight: bold;"><p>Equipment </p></td>\
                                <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                                <td><p>' + relaceCharector(res.getFieldText('custbody_ed_work_order_equipments')) + '</p></td>\
                                </tr>';
        }
    } else {
        if (res.getFieldValue('custbody_ed_work_order_equipments')) {
            template += '<tr>\
                                <td width="25%" style="font-weight: bold;"><p>Equipment </p></td>\
                                <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                                <td><p>' + relaceCharector(res.getFieldText('custbody_ed_work_order_equipments')) + '</p></td>\
                                </tr>';
        }else if (res.getFieldValue('custbody_work_order_equipments')) {
            template += '<tr>\
                                <td width="25%" style="font-weight: bold;"><p>Equipment </p></td>\
                                <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                                <td><p>' + relaceCharector(res.getFieldText('custbody_work_order_equipments')) + '</p></td>\
                                </tr>';
        }
    }
    if (res.getFieldValue('location')) {
        template += '<tr>\
                                <td width="25%" style="font-weight: bold;"><p>Location</p></td>\
                                <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                                <td><p>' + relaceCharector(res.getFieldText('location')) + '</p></td>\
                            </tr>';
    }
    if (res.getFieldValue('class')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Class</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>' + relaceCharector(res.getFieldText('class')) + '</p></td>\
                        </tr>';
    }
    template += '</table>\
                </td>\
                <td align="right">\
                    <table>';
    if (res.getFieldValue('trandate')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Date</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>${record.trandate}</p></td>\
                        </tr>';
    }
    if (res.getFieldValue('startdate')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Production Start Date</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>${record.startdate}</p></td>\
                        </tr>';
    }
    if (res.getFieldValue('enddate')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Production End Date</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>${record.enddate}</p></td></tr>';
    }
    if (res.getFieldValue('orderstatus')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Status</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>${record.orderstatus}</p></td>\
                        </tr>';
    }
    if (res.getFieldValue('createdfrom')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Created From</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>${record.createdfrom}</p></td>\
                        </tr>';
    }
    if (res.getFieldValue('memo')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Memo</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>${record.memo?replace("&","&amp;")}</p></td>\
                        </tr>';
    }
    template += '</table>\
                </td>\
            </tr>\
        </table>';
    template += '<!--<hr style="width: 100%; height: 1px; background-color: #ffc966;" />-->';
    template += '<#if record.item?has_content>\
            <table class="itemtable" style="width: 100%; margin-top: 10px;">\
                <!-- start items -->\
                <#assign SrNo=0 />\
                <#list record.item as item>\
                    <#if item_index==0>\
                        <thead>\
                            <tr>\
                            <th class="td_right_line" width="04%" align="center" colspan="3">Sl No.</th>\
                                <th class="td_right_line" width="04%" align="center" colspan="3">ID</th>\
                                <th class="td_right_line" width="13%" align="left" colspan="7">Item Description</th>\
                            </tr>\
                        </thead>\
                    </#if>\
                    <#if item_index==0>\
                    <tr class="td_top_line">\
                        <td class="td_right_line" align="center" colspan="3" line-height="150%"><#assign SrNo=SrNo + 1/> ${SrNo}</td>\
                        <td class="td_right_line" align="center" colspan="3">\
                            <p>${item.item.internalid}</p>\
                        </td>\
                        <td align="left" colspan="7">\
                            <p class="alignL">\
                            ${item.description?replace("&","&amp;")}</p>\
                        </td>\
                        </tr>\
                        </#if>\
                </#list>\
                <!-- end items -->\
            </table>\
        </#if>';

    template += '<br/><table style="font-size:12px;width:100%;"><tr><td><b>Created By</b>&nbsp;:&nbsp;<#if record.custbody_created_by?has_content>${record.custbody_created_by.firstname}&nbsp;${record.custbody_created_by.lastname}</#if></td></tr></table>';
    template += '<#if record.custbody_approved_by?has_content>';
    template += '<table style="font-size:12px;width:100%;"><tr><td><b>Approved By</b>&nbsp;:&nbsp;${record.custbody_approved_by.firstname}&nbsp;${record.custbody_approved_by.lastname}</td></tr></table></#if>';

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
    /*if(charVal)
    return charVal.replace(/[^a-zA-Z ]/g, "");
    else
      return "";*/
}

function strReplace(str, replaceVal) {
    var res = str.replace(replaceVal, "");
    return res;
}