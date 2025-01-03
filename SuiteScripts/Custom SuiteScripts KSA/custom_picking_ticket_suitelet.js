function printDmPickingTicket(request, response) {
    var renderer = nlapiCreateTemplateRenderer();
    var recid = request.getParameter('recId');
    var renderer = nlapiCreateTemplateRenderer();
    var res = nlapiLoadRecord("salesorder", recid);
    var companyInfo = nlapiLoadConfiguration('companyinformation');
    var sb_recId = res.getFieldValue('subsidiary'); //here it is 34 to
    var subsidiary_rec = nlapiLoadRecord('subsidiary', sb_recId);
    var headerlogo = subsidiary_rec.getFieldValue("logo");
    var footerlogotop = subsidiary_rec.getFieldValue("custrecord_subsidiary_top_footer");
    var footerlogobottom = subsidiary_rec.getFieldValue("custrecord_subsidiary_bottom_foot");

    var lineCount = res.getLineItemCount("item");
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
<tr><td colspan="2" align="center" class="title">DEMAND BULLETIN<br/><br/></td></tr>\
    <tr>\
        <td width="70%">\
            <table>';
    if (res.getFieldValue('department')) {
        template += '<tr>\
                    <td width="50%" style="font-weight: bold;"><p>DEPARTMENT</p></td>\
                    <td align="center" width="2%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                    <td  width="18%" ><p>'+ relaceCharector(res.getFieldText('department')) + '</p></td>\
                    </tr>';
    }
    if (res.getFieldValue('job')) {
        template += '<tr>\
                        <td width="50%" style="font-weight: bold;"><p>PROJECT</p></td>\
                        <td align="center" width="2%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                        <td width="18%"><p>'+ relaceCharector(res.getFieldText('job')) + '</p></td>\
                    </tr>';
    }
    if (res.getFieldValue('job')) {
        var job = res.getFieldValue('job');
        var equipment = nlapiLookupField('job', job, 'custentity_equipment');
        var resJob = nlapiLoadRecord("job", job);
        if (resJob.getFieldValue('custentity_equipment')) {
            template += '<tr>\
                            <td width="50%" style="font-weight: bold;"><p>VEHICLE</p></td>\
                            <td align="center" width="2%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td width="18%"><p>'+ relaceCharector(resJob.getFieldText('custentity_equipment')) + '</p></td>\
                        </tr>';
        }
    }
    template += '</table>\
        </td>\
        <td align="right" width="30%">\
            <table>';
    if (res.getFieldValue('trandate')) {
        template += '<tr>\
                    <td width="27%" style="font-weight: bold;"><p>DATE</p></td>\
                    <td align="center" width="2%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                    <td><p>${record.trandate}</p></td>\
                </tr>';

    }
    template += '<tr>\
                    <td width="27%" style="font-weight: bold;"><p>ORDER #</p></td>\
                    <td align="center" width="2%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                    <td><p>${record.tranid}</p></td>\
                </tr>';

    template += '</table>\
        </td>\
    </tr>\
</table>';
    template += '<table class="itemtable" style="width: 100%; margin-top: 10px;">';
    template += '<thead>';
    template += '<tr>';
    template += '<th class="td_right_line" width="5%" align="center" >No.</th>';
    template += ' <th class="td_right_line" width="10%" align="center" >ITEM</th>';
    template += '<th class="td_right_line" width="28%" align="left" >DETAILS</th>';
    template += '<th class="td_right_line" width="7%" align="center" >UOM</th>';
    template += '<th class="td_right_line" width="10%" align="center" >REQ QTY</th>';
    template += '<th class="td_right_line" width="20%" align="left" >LOCATION</th>';
    template += '<th class="td_right_line" width="12%" align="left" >PICKED QTY</th>';
    template += '<th class="td_right_line" width="13%" align="left" >REMARKS</th>';
    template += '</tr>';
    template += '</thead>';
    var num = 1;
    nlapiLogExecution("DEBUG", "lineCount===========================", lineCount);
    for (var i = 1; i <= lineCount; i++) {
        var item = res.getLineItemValue('item', 'item',i);
        var description = res.getLineItemValue('item', 'description',i);
        var units = res.getLineItemText('item', 'units',i);
        var quantity = res.getLineItemValue('item', 'quantity',i);
       // var location = res.getLineItemValue('item', 'location',i);
        var location = res.getFieldText('location');

        if(units){
            units = units;
        }else{
            units = '';
        }
        if(description){
            description = relaceCharector(description);
        }else{
            description = '';
        }

        if(location){
            location=  relaceCharector(location);
        }else{
            location = '';
        }

        var itemtype = nlapiLookupField('item', parseInt(item), 'type');
        itemtype = getRecItemType(itemtype);
        var itemRec = nlapiLoadRecord(itemtype, item);
        var itemID = itemRec.getFieldValue("itemid");
        template += '    <tr class="td_top_line">';
        template += '                     <td class="td_right_line" align="center" >' + num + '</td>';
        template += '                     <td class="td_right_line" align="center">';
        template += '                         <p>' + itemID + '</p>';
        template += '                     </td>';
        template += '                     <td class="td_right_line" align="left" >';
        template += '                         <p class="alignL">'+description+'</p>';
        template += '                     </td>';
        template += '                     <td class="td_right_line" align="center" >';
        template += '                     <p class="alignL">'+units+'</p>';
        template += '                 </td>';
        template += '                 <td class="td_right_line" align="center" >';
        template += '                 <p class="alignL">'+quantity+'</p>';
        template += '             </td>';
        template += '             <td class="td_right_line" align="left" >';
        template += '                 <p class="alignL">'+location+'</p>';
        template += '             </td>';
        template += '             <td class="td_right_line"  align="left" >';
        template += '                 <p class="alignL">\</p>';
        template += '             </td>';
        template += '             <td align="left" >';
        template += '                 <p class="alignL">\</p>';
        template += '             </td>';
        template += '                     </tr>';
        num++;
    }
    template += '</table>';
    // template += '<#if record.item?has_content>\
    //     <table class="itemtable" style="width: 100%; margin-top: 10px;">\
    //         <!-- start items -->\
    //         <#assign SrNo=0 />\
    //         <#list record.item as item>\
    //             <#if item_index==0>\
    //                 <thead>\
    //                     <tr>\
    //                     <th class="td_right_line" width="5%" align="center" >No.</th>\
    //                         <th class="td_right_line" width="10%" align="center" >ITEM</th>\
    //                         <th class="td_right_line" width="28%" align="left" >DETAILS</th>\
    //                         <th class="td_right_line" width="7%" align="center" >UOM</th>\
    //                         <th class="td_right_line" width="10%" align="center" >REQ QTY</th>\
    //                         <th class="td_right_line" width="20%" align="left" >LOCATION</th>\
    //                         <th class="td_right_line" width="12%" align="left" >PICKED QTY</th>\
    //                         <th class="td_right_line" width="13%" align="left" >REMARKS</th>\
    //                     </tr>\
    //                     </thead>\
    //                     </#if>\
    //                 <tr class="td_top_line">\
    //                     <td class="td_right_line" align="center" ><#assign SrNo=SrNo + 1/> ${SrNo}</td>\
    //                     <td class="td_right_line" align="center">\
    //                         <p>${item.item}</p>\
    //                     </td>\
    //                     <td class="td_right_line" align="left" >\
    //                         <p class="alignL">${item.description}</p>\
    //                     </td>\
    //                     <td class="td_right_line" align="center" >\
    //                     <p class="alignL">${item.units}</p>\
    //                 </td>\
    //                 <td class="td_right_line" align="center" >\
    //                 <p class="alignL">${item.quantity}</p>\
    //             </td>\
    //             <td class="td_right_line" align="left" >\
    //                 <p class="alignL">${record.location}</p>\
    //             </td>\
    //             <td class="td_right_line"  align="left" >\
    //                 <p class="alignL">\</p>\
    //             </td>\
    //             <td align="left" >\
    //                 <p class="alignL">\</p>\
    //             </td>\
    //                     </tr>\
    //         </#list>\
    //         <!-- end items -->\
    //     </table>\
    // </#if>';

    template += '<br/><br/><br/> <table style="width: 60%;" border="1" >';
    template += '<tr >';
    template += '	<td class="td_right_line">CREATED BY</td>';
    template += '	<td>${record.custbody_creator}</td>';
    template += '	</tr>';

    template += '<tr class="td_top_line">';
    template += '	<td class="td_right_line">APPROVED BY</td>';
    template += '	<td>${record.custbody_approved_by}</td>';
    template += '	</tr>';
    template += '<tr class="td_top_line"> ';
    template += '	<td class="td_right_line">PICKED BY</td>';
    template += '	<td></td>';
    template += '	</tr>';
    template += '<tr  class="td_top_line">';
    template += '	<td class="td_right_line">ISSUED BY</td>';
    template += '	<td></td>';
    template += '	</tr>';
    template += '</table>';
    template += '</body>\
    </pdf>';
    renderer.setTemplate(template);
    renderer.addRecord('record', res);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'pickingticket_' + res.getFieldValue("tranid") + '.pdf', 'inline');
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
