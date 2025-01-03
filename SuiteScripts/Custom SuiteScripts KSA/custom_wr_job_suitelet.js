function printWRDetailsAction(request, response) {
    var renderer = nlapiCreateTemplateRenderer();
    var recID = request.getParameter('recId');
    var renderer = nlapiCreateTemplateRenderer();
    var res = nlapiLoadRecord("job", recID);
    var sb_recId = res.getFieldValue('subsidiary'); //here it is 34 to
    var subsidiary_rec = nlapiLoadRecord('subsidiary', sb_recId);
    var WO_no = res.getFieldValue("tranid");
    var soid = res.getFieldValue("custentity_so_ref");
    var soRec = nlapiLoadRecord("salesorder", soid);
    var template = '';
    template += '<?xml version="1.0"?>\
<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\
<pdf>\
    <head>\
        <#if .locale=="ru_RU">\
            <link name="verdana" type="font" subtype="opentype" src="${nsfont.verdana}" src-bold="${nsfont.verdana_bold}" bytes="2" />\
        </#if>\
        <macrolist>\
            <macro id="nlheader">';
    //template +='<p>sb_recId '+sb_recId +" " +subsidiary_rec.getFieldValue("logo")+'</p>';
    template += '<table class="header" style="width: 100%;">\
                    <tr>\
                        <td valign="bottom" align="left" width="20%">';
    //if(subsidiary_rec.getFieldValue("logoUrl")){
    template += '<img src="https://system.eu2.netsuite.com/core/media/media.nl?id=402&amp;c=4119372&amp;h=750acd92c3c49871331f" style="float: left; margin: 7px; width:50%; height: 50%;" />';
    //}
    template += '</td>\
                        <td valign="bottom" align="left" width="40%">';
    if (subsidiary_rec.getFieldValue("name")) {
        template += '<span class="nameandaddress" style="font-weight: bold;"><big>' + relaceCharector(subsidiary_rec.getFieldValue("name")) + '</big></span>';
    }
    template += '<small>\
                                <br/>';
    if (subsidiary_rec.getFieldValue("fax")) {
        template += '<br/>Landline : ' + relaceCharector(subsidiary_rec.getFieldValue("fax"));
    }
    if (subsidiary_rec.getFieldValue("email")) {
        template += '<br/>E-mail : ' + relaceCharector(subsidiary_rec.getFieldValue("email"));
    }
    if (subsidiary_rec.getFieldValue("url")) {
        template += '<br/>Web : ' + relaceCharector(subsidiary_rec.getFieldValue("url"));
    }
    if (subsidiary_rec.getFieldValue("employerid")) {
        template += '<br/>VAT : ' + relaceCharector(subsidiary_rec.getFieldValue("employerid"));
    }
    template += '</small>\
                        </td>\
                        <td valign="bottom" align="right" width="40%">\
                            <p class="alignL" style="font-size: 8pt;">';
    if (subsidiary_rec.getFieldValue("addr1")) {
        template += relaceCharector(subsidiary_rec.getFieldValue("addr1"));
    }
    if (subsidiary_rec.getFieldValue("addr2")) {
        template += '<br/>' + relaceCharector(subsidiary_rec.getFieldValue("addr2"));
    }
    if (subsidiary_rec.getFieldValue("city")) {
        template += '<br/>' + relaceCharector(subsidiary_rec.getFieldValue("city"));
    }
    if (subsidiary_rec.getFieldValue("country")) {
        template += '<br/>' + relaceCharector(subsidiary_rec.getFieldText("country")) + '</p>';
    }

    template += '</td>\
                    </tr>\
                </table>\
                <hr style="width: 100%; height: 1px; background-color: #ffc966;" />';
    template += '</macro>\
            <macro id="nlfooter">\
                <table class="footer" style="width: 100%;">\
                    <tr><!--<td align="left"><barcode codetype="code128" showtext="true" value="${record.tranid}"/></td>--><td align="right"><pagenumber/> of <totalpages/></td></tr>\
                </table>\
            </macro>\
        </macrolist>\
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
    <body header="nlheader" header-height="12%" footer="nlfooter" footer-height="20pt" padding="0.25in 0.5in 0.25in 0.5in" size="Letter">';
    template += '<table class="nospacing lnhght" style="width: 100%;">\
            <tr><td colspan="2" align="center" class="title">WORK REQUEST BILLING PREVIEW: ${record.entityid}<br/><br/></td></tr>\
            <tr>\
                <td>\
                    <table>';
    if (res.getFieldValue('parent')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Customer</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>'+ relaceCharector(res.getFieldText('parent')) + '</p></td>\
                            </tr>';
    }
    if (soRec.getFieldValue('location')) {
        template += '<tr>\
                                <td width="25%" style="font-weight: bold;"><p>Location</p></td>\
                                <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                                <td><p>'+ relaceCharector(soRec.getFieldText('location')) + '</p></td>\
                            </tr>';
    }
    if (soRec.getFieldValue('class')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Class</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>'+ relaceCharector(soRec.getFieldText('class')) + '</p></td>\
                        </tr>';
    }
    if (soRec.getFieldValue('custbody_work_order_equipments')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Equipments</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>'+ relaceCharector(soRec.getFieldText('custbody_work_order_equipments')) + '</p></td>\
                        </tr>';
    }else if (soRec.getFieldValue('custbody_ed_work_order_equipments')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Equipments</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>'+ relaceCharector(soRec.getFieldText('custbody_ed_work_order_equipments')) + '</p></td>\
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
    if (res.getFieldValue('calculatedenddate')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Production End Date</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>${record.calculatedenddate}</p></td></tr>';
    }

    if (res.getFieldValue('entitystatus')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Status</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>${record.entitystatus}</p></td>\
                        </tr>';
    }
    if (res.getFieldValue('custentity_so_ref')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Created From</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>${record.custentity_so_ref}</p></td>\
                        </tr>';
    }
    if (soRec.getFieldValue('memo')) {
        template += '<tr>\
                            <td width="25%" style="font-weight: bold;"><p>Memo</p></td>\
                            <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
                            <td><p>'+ relaceCharector(soRec.getFieldValue("memo")) + '</p></td>\
                        </tr>';
    }
    template += '</table>\
                </td>\
            </tr>\
        </table>';
    template += '<table class="itemtable" style="width: 100%; margin-top: 10px;">\
                        <thead>\
                            <tr>\
                                <th class="td_right_line" width="10%" align="center" colspan="2">Sl No.</th>\
                                <th class="td_right_line" width="20%" align="left" colspan="3">ITEM</th>\
                                <th class="td_right_line" width="20%" align="left" colspan="8">DESCRIPTION</th>\
                                <th class="td_right_line" width="8%" align="center" colspan="3">QUANTITY</th>\
                                <th class="td_right_line" width="12%" align="center" colspan="3">AVERAGE COST</th>\
                                <th class="td_right_line" width="10%" align="center" colspan="3">AMOUNT</th>\
                            </tr>\
                        </thead>\
                        <tr class="td_top_line"><td class="row_head" align="left" colspan="22">\
                            <p class="alignL" >\
                                <b>MATERIAL COST</b></p>\
                        </td></tr>';
    var lineitemCt = res.getLineItemCount("item");
    var grandTotal = 0;
    var slNo = 1;
    var item_index = 0;
    var total_amount_mt = 0;
    var filter = ["jobmain.internalid", "anyof", recID];
    var woResDm = nlapiSearchRecord("transaction", "customsearch_work_request_related_so_2_2", filter);
    //nlapiLogExecution("DEBUG", "woResDm===============", JSON.stringify(woResDm));
    if (woResDm) {
        for (var j = 0; j < woResDm.length; j++) {
            var item = woResDm[j].getText('item');
            var itemDisply = woResDm[j].getValue('displayname', 'item');
            var description = woResDm[j].getValue('custcol_custom_description');
            var qty = woResDm[j].getValue('quantity');
            var unt = woResDm[j].getText('unitstype', 'item');
            var amount = woResDm[j].getValue('amount');
            var itemID = woResDm[j].getValue('item');
            var location = woResDm[j].getValue('location');

            var soDescirption = '';
            var salesRef = woResDm[j].getValue('internalid');

            nlapiLogExecution("DEBUG", "salesRef===============", salesRef);
            var salesRec = nlapiLoadRecord("salesorder", salesRef);
            var ln = salesRec.getLineItemCount("item");
            if (ln) {
                for (var kk = 1; kk <= ln; kk++) {
                    var soItem = salesRec.getLineItemValue("item", "item", kk);
                    if (itemID == soItem) {
                        soDescirption = salesRec.getLineItemValue("item", "description", kk);
                        nlapiLogExecution("DEBUG", "soDescirption===============", soDescirption);
                    }
                }
            }

            var avgCost = 0;
            var itemtype = nlapiLookupField('item', parseInt(itemID), 'type');
            itemtype = getRecItemType(itemtype);
            var rec = nlapiLoadRecord(itemtype, itemID);
            var lnCnt = rec.getLineItemCount("locations");

            var purchaseprice = rec.getFieldValue("cost");
            if(purchaseprice && purchaseprice!=''){
                avgCost = purchaseprice;
            }else{
            for (var k = 1; k <= lnCnt; k++) {
                var loca = rec.getLineItemValue("locations", "locationid", k);
                if (loca == location) {
                    avgCost = rec.getLineItemValue("locations", "averagecostmli", k);
                    avgCost = avgCost;
                }
            }
            }
            var filter = new Array();
            var cols = new Array();
            cols[0] = new nlobjSearchColumn("vendorcost");
            filter[0] = new nlobjSearchFilter("type", null, 'anyof', 'NonInvtPart');
          //  filter[1] = new nlobjSearchFilter("isdropshipitem", null, 'is', 'T');
            filter[1] = new nlobjSearchFilter("ispreferredvendor", null, 'is', 'T');
            filter[2] = new nlobjSearchFilter("internalidnumber", null, 'equalto', itemID);
            var nonInvSearch = nlapiSearchRecord("noninventoryitem", null, filter, cols);
            if (nonInvSearch) {
                avgCost = nonInvSearch[0].getValue('vendorcost');
            }
            if (itemID != 342) {
                avgCost = Number(avgCost).toFixed(2);
                var amountVal = Number(qty) * Number(avgCost);
                total_amount_mt = Number(total_amount_mt) + Number(amountVal);
                item_index++;
                if (soDescirption) {
                    soDescirption = relaceCharector(soDescirption);
                } else {
                    soDescirption = '';
                }
                template += '<tr class="td_top_line">\
                        <td class="td_right_line" align="center" colspan="2">'+ (slNo) + '</td>\
                        <td class="td_right_line" align="left" colspan="3">\
                            <p class="alignL">'+ item + '<br/>' + itemDisply + '</p>\
                        </td>\
                        <td class="td_right_line" align="left" colspan="8">\
                            <p class="alignL">\
                               '+ soDescirption + ' </p>\
                        </td>\
                        <td class="td_right_line" align="center" colspan="3">\
                            <p>'+ qty + '</p>\
                        </td>\
                        <td class="td_right_line" align="center" colspan="3">\
                            <p>'+ Number(avgCost).toFixed(2) + '</p>\
                        </td>\
                        <td align="right" colspan="3">\
                            <p>'+ Number(amountVal).toFixed(2);
                template += '</p>\
                        </td>\
                        </tr>';
                slNo++;
            }

        }
    }
    template += '<tr class="td_top_line">\
        <td class="row_head td_right_line" align="left" colspan="19">\
                            <p class="alignL" >\
                                <b>Total</b></p>\
                        </td>\
                        <td class="td_right_line" align="right" colspan="3">\
                            <p class="alignL"><b>'+ total_amount_mt + '</b></p>\
                        </td>\
                        </tr>';
    template += '<tr class="td_top_line"><td class="row_head" align="left" colspan="22">\
                            <p class="alignL" >\
                                <b>MAN POWER COST</b></p>\
                        </td>\</tr>';

    var col = new Array();
    var ftr = new Array();
    col[0] = new nlobjSearchColumn("custrecord_ra_resource");
    col[1] = new nlobjSearchColumn("custrecord_ra_start_date");
    col[2] = new nlobjSearchColumn("custrecord_ra_end_date");
    col[3] = new nlobjSearchColumn("custrecord_ra_no_of_hours");
    ftr[0] = new nlobjSearchFilter("custrecord_ra_project_ref", null, 'anyof', recID);
    var woRes = nlapiSearchRecord('customrecord_wr_cust_resource_allocation', null, ftr, col);

    //nlapiLogExecution("DEBUG", "woRes===============", JSON.stringify(woRes));
    var manPowerAmount = 0;
    var srNo = 1;
    var item_index = 0;
    var total_amount_res = 0;
    template += '<tr>\
      <th class="td_right_line td_top_line" width="5%" align="center" colspan="2">Sl No.</th>\
      <th class="td_right_line td_top_line" width="15%" align="left" colspan="3">RESOURCE </th>\
      <th class="td_right_line td_top_line" width="15%" align="left" colspan="8">NUMBER OF HOURS</th>\
      <th class="td_right_line td_top_line" width="20%" align="center" colspan="3">TYPE</th>\
      <th class="td_right_line td_top_line" width="10%" align="center" colspan="3">LABOR COST</th>\
      <th class="td_right_line td_top_line" width="10%" align="center" colspan="3">TOTAL COST</th>\
    </tr>';
    if (woRes) {
        for (var j = 0; j < woRes.length; j++) {
            var resource = woRes[j].getValue('custrecord_ra_resource');
            var resourceName = woRes[j].getText('custrecord_ra_resource');
            var numberhours = woRes[j].getValue('custrecord_ra_no_of_hours');

            // var days = parseInt(numberhours / 8);
            var laborcost = 0;
            laborcost = nlapiLookupField('genericresource', resource, 'laborcost');

            var totalCost = parseInt(numberhours * laborcost);
            total_amount_res = Number(total_amount_res) + Number(totalCost);

            item_index++;
            template += '<tr class="td_top_line">\
                        <td class="td_right_line" align="center" colspan="2">'+ (srNo) + '</td>\
                        <td class="td_right_line" align="left" colspan="3">\
                            <p class="alignL">'+ resourceName + '</p>\
                        </td>\
                        <td class="td_right_line" align="left" colspan="8">\
                            <p class="alignL">\
                               '+ numberhours + ' </p>\
                        </td>\
                        <td class="td_right_line" align="center" colspan="3">\
                            <p>Generic Resource</p>\
                        </td>\
                        <td class="td_right_line" align="center" colspan="3">\
                            <p>'+ laborcost + '</p>\
                        </td>\
                        <td align="right" colspan="3">\
                            <p>'+ totalCost;
            template += '</p>\
                        </td>\
                        </tr>';
            srNo++;
        }
    }
    grandTotal = Number(total_amount_mt) + Number(total_amount_res);
    template += '<tr class="td_top_line">\
        <td class="row_head td_right_line" align="left" colspan="19">\
            <p class="alignL" >\
                <b>Total</b></p>\
            </td>\
        <td class="td_right_line" align="right" colspan="3">\
                            <p class="alignL"><b>'+ total_amount_res + '</b></p>\
                        </td>\
                        </tr>';
    template += '<tr class="td_top_line">\
        <td class="row_head td_right_line" align="left" colspan="19">\
                            <p class="alignL" >\
                                <b>Grand Total</b></p>\
                        </td>\
                        <td class="td_right_line" align="right" colspan="3">\
                            <p class="alignL"><b>'+ grandTotal + '</b></p>\
                        </td>\
                        </tr>';
    template += '</table>';
    template += '<!--<hr style="width: 100%; height: 1px; background-color: #ffc966;" />-->\
    </body>\
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
function inArray(elem, array) {
    // for each(array as array1){
    //     if(array1.id ===elem){
    //         return 1;
    //     }else{
    //         return -1;
    //     }
    // }
    var len = array.length;
    for (var i = 0; i < len; i++) {
        if (array.id === elem) {
            return 1;
        } else {
            return -1;
        }
    }
    return "empty";
}
function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
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
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}