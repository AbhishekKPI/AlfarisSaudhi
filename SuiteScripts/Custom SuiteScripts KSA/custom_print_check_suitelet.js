function printCheckFormatAction(request, response) {
    var recordID = request.getParameter("recID");
    var check = nlapiLoadRecord('check', recordID);
    var renderer = nlapiCreateTemplateRenderer();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // var subsidiary = check.getFieldValue('subsidiary');
    var template = "";
    if (check.getFieldValue('custbody_name_on_cheque')) {
        var payee = check.getFieldValue("custbody_name_on_cheque");
    } else {
        var payee = check.getFieldText("entity");
    }

    template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> ";
    template += "<pdf> ";
    template += "<head> ";
    template += "   <#if .locale == \"ru_RU\"> ";
    template += "   <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> ";
    template += "   </#if> ";
    template += "   <macrolist> ";

    template += '<macro id="nlheader">';
    template += '<#if record.subsidiary.internalid?string == \'1\'>';
    template += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-60px; margin-right:-40px;"><tr>';
    template += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26487&amp;c=4647359&amp;h=N7yMHyudqD68aN6yaYCarDgu-nT4u0aoi7g3lKZ708dlEsDK" style="width:768px; height:120px;" /></td>';
    template += '</tr></table>';
    template += '</#if>';
    template += '<#if record.subsidiary.internalid?string == \'11\' || record.subsidiary.internalid?string == \'12\'>';
    template += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-60px; margin-right:-40px;"><tr>';
    template += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26487&amp;c=4647359&amp;h=N7yMHyudqD68aN6yaYCarDgu-nT4u0aoi7g3lKZ708dlEsDK" style="width:768px; height:120px;" /></td>';
    template += '</tr></table>';
    template += '</#if>';
    template += '<!-- SALLC -->';
    template += '<#if record.subsidiary.internalid?string == \'2\'> ';

    template += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-68px; margin-right:-40px;"><tr>';
    template += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26489&amp;c=4647359&amp;h=8jLOJuWgAnB4EXpAfSKtQfxbGPoNlcPY1buLTrUncQpcjvHG" style="width:768px; height:120px;" /></td>';
    template += '</tr>';
    template += '</table>';
    template += '</#if>';

    template += '<#if record.subsidiary.internalid?string == \'8\' && record.location.internalid?string == \'8\'>  ';

    template += '<table class="header" style="width: 100%; margin-top:-60px;margin-left:-50px;"><tr>';
    template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7" style="width:768px; height:140px;" /></td>';
    template += '</tr>';
    template += '</table>';
    template += '</#if>';

    template += '<#if record.subsidiary.internalid?string == \'8\' && record.location.internalid?string != \'8\'>  ';

    template += '<table class="header" style="width: 100%; margin-top:-60px;margin-left:-50px;"><tr>';
    template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26488&amp;c=4647359&amp;h=6Uxc0nbUkUIpXGHsPLniGwEfM-PfsyucvPJwV0Vhus-USYG_" style="width:768px; height:140px;" /></td>';
    template += '</tr>';
    template += '</table>';
    template += '</#if>';

    template += '<#if record.subsidiary.internalid?string == \'16\'>  ';

    template += '<table class="header" style="width: 100%; margin-top:-60px;margin-left:-50px;"><tr>';
    template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14614&amp;c=4647359&amp;h=flaMNO15PsYKQzLVQzTzireG0thAuPI1FDrrkdJqQ3Qz8ERo" style="width:768px; height:140px;" /></td>';
    template += '</tr>';
    template += '</table>';
    template += '</#if>';


    template += '</macro>';

    // template += "      <macro id=\"nlfooter\"> ";
    //    template += "<table class=\"footer\" style=\"width: 100%;\">";
    // template += "<tr>";
    //    template += "<td><img src=\"https://system.eu2.netsuite.com/core/media/media.nl?id=1543&amp;c=4647359&amp;h=90677a0f341bea21aec2\" style=\"width:655px;height:70px;\"/></td></tr>";
    //    template += "<tr>";
    // template += "<td align=\"left\" style=\"width:75%;\"><#if record.custbody_customer_doc_ref_no?has_content>${record.custbody_customer_doc_ref_no} -</#if> ${record.subsidiary} / ${record.tranid} - <#if record.entity.isperson?string == 'T'> ${record.entity.altname}<#else>${record.entity.companyname}</#if></td>";
    //    template += "<td align=\"right\">&nbsp;( Page <pagenumber/> of <totalpages/> ) </td>";
    // template += "</tr></table>";
    // template += "      </macro> ";
    template += '<macro id="nlfooter">';
   // template += "<#if record.subsidiary.internalid?string == '8'>";

    template += '<table class="footer" border="0" ';
    template += ' style="width: 100%;background-color:#000;margin-top:78px;margin-left :-56px;">';
    template += '<tr>';
    template += '  <td>';
    template += ' <img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14615&amp;c=4647359&amp;h=ae717ee9182515bf331e" style="width:768px;height:56%;"/>';

    template += '  </td>';
    template += '</tr>';
    template += '</table>';
    template += '<div style="position:relative;top:-108px;bottom:-92px;left:506px;">';
    template += ' <img src="https://4647359.app.netsuite.com/core/media/media.nl?id=19981&amp;c=4647359&amp;h=W94ZlflwUJ1kjaRqNCY6I65R8MhjYA31fyCdylTaaKdkxXtN" style="width:30%;height:30%;"/>';
    template += '</div> ';

   // template += '<#else>';

    // template += '<table class="footer" border="0" ';
    // template += 'style="width: 100%;background-color:#000;margin-top:78px;margin-left :-56px;">';
    // template += '<tr>';
    // template += '  <td>';
    // template += '<img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14615&amp;c=4647359&amp;h=ae717ee9182515bf331e" style="width:750px;height:40%;"/>';

    // template += '  </td>';
    // template += '</tr>';
    // template += '</table>';
    // template += '<div style="position:relative;top:-245px;bottom:-92px;left:483px;">';
    // template += '<<img src="https://4647359.app.netsuite.com/core/media/media.nl?id=19981&amp;c=4647359&amp;h=W94ZlflwUJ1kjaRqNCY6I65R8MhjYA31fyCdylTaaKdkxXtN" style="width:30%;height:30%;"/>';
    // template += '</div> ';
    // template += '</#if>';

    template += '</macro>';
    template += "   </macrolist> ";
    template += "   <style type=\"text/css\">table ";
    template += "{      font-family: sans-serif; ";
    template += "      font-size: 10pt; ";
    template += "      table-layout: fixed; ";
    template += "      } ";
    template += "      th ";
    template += "{      font-weight: bold; ";
    template += "      font-size: 9pt; ";
    template += "      vertical-align: middle; ";
    template += "      padding: 5px 6px 3px; ";
    template += "      background-color: #e3e3e3; ";
    template += "      color: #000000; ";
    template += "      } ";
    template += "      td p { align:left; } ";
    template += "      b ";
    template += "{      font-weight: bold; ";
    template += "      color: #000000; ";
    template += "      } ";
    template += "      table.header td ";
    template += "{      padding: 0; ";
    template += "      font-size: 10pt; ";
    template += "      } ";
    template += "      table.footer td ";
    template += "{      padding: 0; ";
    template += "      font-size: 9pt; ";
    template += "      } ";
    template += "      table.itemtable th ";
    template += "{      padding-bottom: 10px; ";
    template += "      padding-top: 10px; ";
    template += "      } ";
    template += "      table.total ";
    template += "{      page-break-inside: avoid; ";
    template += "      } ";
    template += "      tr.totalrow ";
    template += "{      background-color: #e3e3e3; ";
    template += "      line-height: 200%; ";
    template += "      } ";
    template += "      td.totalboxtop ";
    template += "{      font-size: 13pt; ";
    template += "      background-color: #e3e3e3; ";
    template += "      } ";
    template += "      span.title ";
    template += "{      font-size: 29pt; ";
    template += "      } ";
    template += "      span.number ";
    template += "{      font-size: 17pt; ";
    template += "      } ";
    template += "      span.itemname ";
    template += "{      font-weight: bold; ";
    template += "      line-height: 150%; ";
    template += "      } ";
    template += "      hr ";
    template += "{      width: 100%; ";
    template += "      color: #d3d3d3; ";
    template += "      background-color: #d3d3d3; ";
    template += "      height: 1px; ";
    template += "      } ";
    template += "   </style> ";
    template += "</head>";
    template += "   <body header = \"nlheader\" header-height=\"12%\" footer=\"nlfooter\" footer-height=\"9%\" padding=\"0.5in 0.5in 0.5in 0.5in\" size=\"A4\"> ";
    // template += "      <table> ";
    // template += "         <tr> ";
    // template += "            <td>&nbsp;";
    // template += "</td> ";
    // template += "         </tr> ";
    // template += "      </table> ";

    template += "      <table style=\"width:100%\"> ";
    template += "         <tr> ";
    template += "            <td align=\"center\" style=\"font-size:18px;\"><b>Payment Voucher</b></td> ";
    template += "         </tr> ";
    template += "      </table> ";

    template += "<table style=\"width:100%;\"> ";
    template += "<tr>";
    template += " <td style=\"width:14%;\"><b>Payee</b></td>";
    template += "<td style=\"width:1%;\"><b>:</b></td>";
    template += "<td style=\"width:45%;\">" + relaceCharector(payee) + "</td>";
    template += "<td style=\"width:18%;\"><b>Voucher #</b></td>";
    template += "<td style=\"width:1%;\"><b>:</b></td>";
    template += "<td style=\"width:21%;\">" + check.getFieldValue("tranid") + "</td>";
    template += "</tr>";
    template += "<tr>";
    if (check.getFieldValue("custbody_mode_of_payment") == "1") {
        var new_che_date = nlapiStringToDate(check.getFieldValue("custbody_cheque_date"));
        var cheque_date = new_che_date.getDate() + "-" + monthNames[new_che_date.getMonth()] + "-" + new_che_date.getFullYear();
        template += "<td style=\"width:14%;\"><b>Cheque Date</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:45%;\">" + cheque_date + "</td>";
    } else {
        var new_pay_date = nlapiStringToDate(check.getFieldValue("trandate"));
        var pay_date = new_pay_date.getDate() + "-" + monthNames[new_pay_date.getMonth()] + "-" + new_pay_date.getFullYear();
        template += "<td style=\"width:14%;\"><b>Pay Date</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:45%;\">" + pay_date + "</td>";
    }
    if (check.getFieldValue("custbody_mode_of_payment") == "1") {
        template += "<td style=\"width:18%;\"><b>Cheque#</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:21%;\">" + check.getFieldValue("custbody_cheque_no") + "</td>";
    } else if (check.getFieldValue("custbody_mode_of_payment") == "3") {
        template += "<td style=\"width:18%;\"><b>TT #</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:21%;\">" + check.getFieldValue("custbody_tt_no") + "</td>";
    } else {
        template += "<td style=\"width:18%;\"><b>Payment Method</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:21%;\">" + check.getFieldText("custbody_mode_of_payment") + "</td>";
    }
    template += "</tr>";
    template += "<tr>";
    template += "<td style=\"width:14%;\"><b>Currency</b></td>";
    template += "<td style=\"width:1%;\"><b>:</b></td>";
    template += "<td style=\"width:45%;\">" + check.getFieldValue('currencysymbol') + "</td>";
    template += "<td style=\"width:18%;\"><b>Total Expense</b></td>";
    template += "<td style=\"width:1%;\"><b>:</b></td>";
    template += "<td style=\"width:21%;\">" + numberWithCommas(check.getFieldValue("usertotal")) + "		  </td>";
    template += "</tr>";
    template += "<tr>";
    template += "<td style=\"width:14%;\"><b>Account</b></td>";
    template += "<td style=\"width:1%;\"><b>:</b></td>";
    template += "<td style=\"width:85%;\" colspan=\"3\">" + relaceCharector(check.getFieldText('account')) + "</td>";
    template += "</tr>";
    if (check.getFieldValue("memo")) {
        template += "<tr>";
        template += "<td style=\"width:14%;\"><b>Remarks</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:85%\" colspan=\"5\">" + relaceCharector(check.getFieldValue("memo")) + "</td>";
        template += "</tr>";
    }
    template += "</table>";
    template += "<p style=\"font-weight:bold;font-size:12px; font-family: sans-serif;\">Expenses</p> ";
    var expLineCnt = check.getLineItemCount("expense");
    var emp_count = 0;
    for (var j = 0; j < expLineCnt; j++) {
        var employee = check.getLineItemValue("expense", "custcol_employee", (j + 1));
        if (employee) {
            emp_count = parseInt(emp_count + 1);
        }
    }
    template += "<table  style=\"width: 100%; margin-top: 8px;border:solid 1px #000000;\"> ";
    template += "   <thead> ";
    template += "      <tr> ";
    template += "         <td colspan=\"6\" style=\"border-right:solid 1px #000000;\"><b>Account</b></td> ";
    template += "         <td colspan=\"6\"  style=\"border-right:solid 1px #000000;\"><b>Memo</b></td> ";
    if (emp_count > 0) {
        template += "        <td colspan=\"4\"  style=\"border-right:solid 1px #000000;\"><b>Employee</b></td> ";
    }
    template += "         <td  align=\"right\" colspan=\"2\"><b>Amount</b></td> ";
    template += "      </tr> ";
    template += "   </thead> ";


    //var expensetotal = 0;
    for (var i = 0; i < expLineCnt; i++) {
        template += "   <tr> ";
        template += "      <td  colspan=\"6\" line-height=\"150%\" style=\"border-top:solid 1px #000000;border-right:solid 1px #000000;\">" + relaceCharector(check.getLineItemText("expense", "account", (i + 1))) + "</td> ";
        var memo = check.getLineItemValue("expense", "memo", (i + 1));
        if (memo) {
            template += "      <td colspan=\"6\" style=\"border-top:solid 1px #000000;border-right:solid 1px #000000;\">" + relaceCharector(check.getLineItemValue("expense", "memo", (i + 1))) + "</td> ";
        } else {
            template += "      <td colspan=\"6\" style=\"border-top:solid 1px #000000;border-right:solid 1px #000000;\">&nbsp;</td> ";
        }
        if (emp_count > 0) {
            template += "      <td colspan=\"4\" style=\"border-top:solid 1px #000000;border-right:solid 1px #000000;\">" + check.getLineItemText("expense", "custcol_employee", (i + 1)) + "</td> ";
        }
        template += "      <td align=\"right\" colspan=\"2\" style=\"border-top:solid 1px #000000;\">" + numberWithCommas(check.getLineItemValue("expense", "amount", (i + 1))) + "</td> ";
        template += "   </tr> ";
        //expensetotal += parseFloat(check.getLineItemValue("expense", "amount", (i+1)));
    }

    template += "</table>";



    template += "<table style=\"width: 100%; margin-top: 10px;font-size:14px;\">";

    template += "<tr>";
    template += "<td colspan=\"4\">&nbsp;</td>";
    template += "<td align=\"right\"><b>TAX  TOTAL</b></td>";
    template += "<td align=\"right\"><b>" + numberWithCommas(check.getFieldValue('taxtotal')) + "</b></td>";
    template += "</tr>";


    template += "<tr>";
    template += "<td colspan=\"4\">&nbsp;</td>";
    template += "<td align=\"right\"><b>TOTAL</b></td>";
    template += "<td align=\"right\"><b>" + numberWithCommas(check.getFieldValue('usertotal')) + "</b></td>";
    template += "</tr>";




    template += "</table>";





    template += "<table style=\"width:100%;\"> ";
    template += "   <tr> ";
    template += "      <td>&nbsp;</td> ";
    template += "   </tr> ";
    template += "   <tr> ";
    template += "      <td>&nbsp;</td> ";
    template += "   </tr> ";
    template += "   <tr> ";
    template += "      <td>&nbsp;</td> ";
    template += "   </tr> ";
    template += "   <tr> ";
    template += "      <td>&nbsp;</td> ";
    template += "   </tr> ";
    template += "   <tr> ";
    template += "      <td style=\"font-weight:bold;font-size:12px;\" align=\"left\">Receiver's Signature</td> ";
    template += "      <td style=\"font-weight:bold;font-size:12px;\" align=\"right\">Authorized Signatory</td> ";
    template += "   </tr> ";
    template += "   <tr> ";
    template += "      <td>&nbsp;</td> ";
    template += "   </tr> ";
    template += "   <tr> ";
    template += "      <td>&nbsp;</td> ";
    template += "   </tr> ";
    template += "   <tr> ";
    template += "      <td style=\"font-weight:bold;font-size:12px;\" align=\"left\">Checked By</td> ";
    template += "      <td style=\"font-weight:bold;font-size:12px;\" align=\"right\">Verified By</td> ";
    template += "   </tr> ";
    template += "</table>";



    template += "   </body> ";
    template += "</pdf>";
    renderer.setTemplate(template);
    renderer.addRecord('record', check);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'Check' + check.getFieldValue('id') + '.pdf', 'inline');
    response.write(file.getValue());
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function relaceCharector(charVal) {
    return charVal.replace(/&/g, "&amp;");
}