function printWRExportAction(request, response) {
    var renderer = nlapiCreateTemplateRenderer();
    var recID = request.getParameter('recId');
    var renderer = nlapiCreateTemplateRenderer();
    var res = nlapiLoadRecord("job", recID);
    var sb_recId = res.getFieldValue('subsidiary'); //here it is 34 to
    var subsidiary_rec = nlapiLoadRecord('subsidiary', sb_recId);
    var WO_no = res.getFieldValue("tranid");
    var soid = res.getFieldValue("custentity_so_ref");
    var soRec = nlapiLoadRecord("salesorder", soid);
    var serviceTypeText = res.getFieldText('custentity_service_type');

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



    //         <macro id="nlheader">';
    // //template +='<p>sb_recId '+sb_recId +" " +subsidiary_rec.getFieldValue("logo")+'</p>';
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
    //     template += '<br/>Web : ' + relaceCharector(subsidiary_rec.getFieldValue("url"));
    // }
    // if (subsidiary_rec.getFieldValue("employerid")) {
    //     template += '<br/>VAT : ' + relaceCharector(subsidiary_rec.getFieldValue("employerid"));
    // }
    // template += '</small>\
    //                     </td>\
    //                     <td valign="bottom" align="right" width="40%">\
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
            font-size:16pt;\
            line-height: 150%;\
            }\
        </style>\
    </head>\
    <body header="nlheader" header-height="14%" footer="nlfooter" footer-height="10.5%" padding="0.50in 0.5in 0.25in 0.5in" size="Letter">';
    template += '<table class="nospacing lnhght" style="width: 100%;">\
            <tr><td colspan="2" align="center" class="title">'+ serviceTypeText + '<br/><br/></td></tr>\
            <tr>\
                <td>\
                    <table>';

    if (res.getFieldValue('parent')) {
        template += '<tr>\
        <td width="25%" style="font-weight: bold;"><p>Project No.</p></td>\
        <td align="center" width="4%">&nbsp;&nbsp;:&nbsp;&nbsp;</td>\
        <td><p>'+ relaceCharector(res.getFieldValue('entityid')) + '</p></td>\
        </tr>';
    }
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
                            <td width="25%" style="font-weight: bold;"><p>Work Request No.</p></td>\
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
    if (res.getFieldValue('custentity_service_type') == 1) {
        template += '<table class="itemtable" style="width: 100%; margin-top: 10px;">';
        template += '<thead>';
        template += ' <tr>';
        template += ' <th class="td_right_line"  align="center" width="10%" >SL NO.</th>';
        template += ' <th class="td_right_line"  align="center" width="35%" >TASK</th>';
        template += '  <th class="td_right_line" align="center" width="10%">ON</th>';
        template += '  <th class="td_right_line" align="center" width="10%">OFF</th>';
        template += '   <th class="td_right_line" align="center" width="10%">N/A</th>';
        template += '   <th class="td_right_line" align="center" width="25%">REMARKS</th>';
        template += '  </tr></thead>';

        var lineCount = res.getLineItemCount("recmachcustrecord_projects");
        var slNo = 1;
        var color = false;
        for (var i = 1; i <= lineCount; i++) {
            var task = res.getLineItemText('recmachcustrecord_projects', 'custrecord_prj_pdi_task', i);
            var on = res.getLineItemValue('recmachcustrecord_projects', 'custrecord_pdi_task_on', i);
            var off = res.getLineItemValue('recmachcustrecord_projects', 'custrecord_pdi_task_off', i);
            var na = res.getLineItemValue('recmachcustrecord_projects', 'custrecord_pdi_task_na', i);
            var remarks = res.getLineItemValue('recmachcustrecord_projects', 'custrecord_pdi_remarks', i);

            if (on == 'T') {
                on = 'Yes';

            } else {
                on = 'No';
            }

            if (off == 'T') {
                off = 'Yes';
            } else {
                off = 'No';
            }

            if (na == 'T') {
                na = 'Yes';
            } else {
                na = 'No';
            }


            if (remarks) {
                remarks = relaceCharector(remarks);
            } else {
                remarks = '';
            }
            if (task) {
                task = relaceCharector(task);
            } else {
                task = '';
            }
            var backcolr = '';
            if (on == "Yes") {
                backcolr = 'style="background-color: #a6a6a6"';
            }

            template += '<tr class="td_top_line" ' + backcolr + ' >';
            template += '<td class="td_right_line" align="center" >' + (slNo) + '</td>';
            template += '<td class="td_right_line" align="left" >' + task + '</td>';
            template += '<td class="td_right_line" align="center" >' + on + '</td>';
            template += '<td class="td_right_line" align="center" >' + off + '</td>';
            template += '<td class="td_right_line" align="center" >' + na + '</td>';
            template += '<td class="td_right_line" align="left" >' + remarks + '</td>';
            template += '</tr>';
            slNo++;
        }
        template += '</table>';
    }

    else if (res.getFieldValue('custentity_service_type') == 2) {
        template += '<table class="itemtable" style="width: 100%; margin-top: 10px;">';
        template += '<thead>';
        template += ' <tr>';
        template += ' <th class="td_right_line"  align="center" width="10%" >SL NO.</th>';
        template += ' <th class="td_right_line"  align="center" width="40%" >TASKS</th>';
        template += '  <th class="td_right_line" align="center" width="10%">CHECKED</th>';
        template += '  <th class="td_right_line" align="center" width="40%">COMMENTS</th>';
        template += '  </tr></thead>';

        var lineCount = res.getLineItemCount("recmachcustrecord_pms_project_id");
        var slNo = 1;
        for (var i = 1; i <= lineCount; i++) {
            var task = res.getLineItemText('recmachcustrecord_pms_project_id', 'custrecord_prj_pms_task', i);
            var checked = res.getLineItemValue('recmachcustrecord_pms_project_id', 'custrecord_pms_checked', i);
            var comments = res.getLineItemValue('recmachcustrecord_pms_project_id', 'custrecord_pms_comments', i);

            if (checked == 'T') {
                checked = 'Yes'
            } else {
                checked = 'No';
            }

            if (comments) {
                comments = relaceCharector(comments);
            } else {
                comments = '';
            }
            if (task) {
                task = relaceCharector(task);
            } else {
                task = '';
            }
            var backcolrCh = '';
            if (checked == "Yes") {
                backcolrCh = 'style="background-color: #a6a6a6"';
            }
            template += '<tr class="td_top_line" '+backcolrCh+' >';
            template += '<td class="td_right_line" align="center" >' + (slNo) + '</td>';
            template += '<td class="td_right_line" align="left" >' + task + '</td>';
            template += '<td class="td_right_line" align="center" >' + checked + '</td>';
            template += '<td class="td_right_line" align="left" >' + comments + '</td>';
            template += '</tr>';
            slNo++;
        }
        template += '</table>';
    }
    else if (res.getFieldValue('custentity_service_type') == 3) {
        template += '<table class="itemtable" style="width: 100%; margin-top: 10px;">';
        template += '<thead>';
        template += ' <tr>';
        template += ' <th class="td_right_line"  align="center" width="10%" >SL NO.</th>';
        template += ' <th class="td_right_line"  align="center" width="35%" >TASK</th>';
        template += '  <th class="td_right_line" align="center" width="10%">ON</th>';
        template += '  <th class="td_right_line" align="center" width="10%">OFF</th>';
        template += '   <th class="td_right_line" align="center" width="10%">N/A</th>';
        template += '   <th class="td_right_line" align="center" width="25%">REMARKS</th>';
        template += '  </tr></thead>';

        var lineCount = res.getLineItemCount("recmachcustrecord_rep_project");
        var slNo = 1;
        for (var i = 1; i <= lineCount; i++) {
            var task = res.getLineItemText('recmachcustrecord_rep_project', 'custrecord_rep_task', i);
            var on = res.getLineItemValue('recmachcustrecord_rep_project', 'custrecord_rep_on', i);
            var off = res.getLineItemValue('recmachcustrecord_rep_project', 'custrecord_rep_off', i);
            var na = res.getLineItemValue('recmachcustrecord_rep_project', 'custrecord_rep_na', i);
            var remarks = res.getLineItemValue('recmachcustrecord_rep_project', 'custrecord_rep_remarks', i);

            if (on == 'T') {
                on = 'Yes'
            } else {
                on = 'No';
            }

            if (off == 'T') {
                off = 'Yes'
            } else {
                off = 'No';
            }

            if (na == 'T') {
                na = 'Yes'
            } else {
                na = 'No';
            }


            if (remarks) {
                remarks = relaceCharector(remarks);
            } else {
                remarks = '';
            }
            if (task) {
                task = relaceCharector(task);
            } else {
                task = '';
            }

            var backcolrOn = '';
            if (on == "Yes") {
                backcolrOn = 'style="background-color: #a6a6a6"';
            }
            template += '<tr class="td_top_line" '+backcolrOn+' >';
            template += '<td class="td_right_line" align="center" >' + (slNo) + '</td>';
            template += '<td class="td_right_line" align="left" >' + task + '</td>';
            template += '<td class="td_right_line" align="center" >' + on + '</td>';
            template += '<td class="td_right_line" align="center" >' + off + '</td>';
            template += '<td class="td_right_line" align="center" >' + na + '</td>';
            template += '<td class="td_right_line" align="left" >' + remarks + '</td>';
            template += '</tr>';
            slNo++;
        }
        template += '</table>';
    }


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