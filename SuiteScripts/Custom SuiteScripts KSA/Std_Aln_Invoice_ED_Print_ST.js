function printInvoiceAction(request, response) {
    nlapiLogExecution("DEBUG", "sub_id ");

    var recordID = request.getParameter("recordID");
    nlapiLogExecution("DEBUG", "recordID ", recordID);

    var invoice = nlapiLoadRecord('invoice', recordID);
    var renderer = nlapiCreateTemplateRenderer();
    var sub_id = invoice.getFieldValue("subsidiary");
    var location = invoice.getFieldValue("location");
    var deliveryNote = invoice.getFieldValue("custbody_std_aln_inv_del_note");
    var rntlStrtDate = invoice.getFieldValue("custbody_std_aln_inv_rental_strt_date");


    var sub_maseter = nlapiLoadRecord("subsidiary", sub_id)
    var headerlogo = sub_maseter.getFieldValue("logo");
    var footerlogotop = sub_maseter.getFieldValue("custrecord_subsidiary_top_footer");
    var footerlogobottom = sub_maseter.getFieldValue("custrecord_subsidiary_bottom_foot");

    var template = "";
    template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> ";
    template += "<pdf> ";
    template += "<head> ";
    template += "<#if .locale == \"ru_RU\"> ";
    template += "    <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> ";
    template += "</#if> ";
    template += "      <link name=\"arabic-font\" type=\"font\" subtype=\"opentype\" src=\"https://4647359.app.netsuite.com/core/media/media.nl?id=6857&amp;c=4647359&amp;h=GURyHDbOe5NQ6BZxduKx_Gh50v23P-0dnJKOlG4s0A4J4EOm&amp;_xt=.ttf\" src-bold=\"https://4647359.app.netsuite.com/core/media/media.nl?id=21692&amp;c=4647359&amp;h=uHRS2GeV3S7MJFTJYAm2KCuCUsmbBvK_4BERfClx96I1yk1e&amp;_xt=.ttf\" bytes=\"2\" />";
    template += "    <macrolist> ";
    template += "        <macro id=\"nlheader\"> ";

    // if (headerlogo) {
    //     nlapiLogExecution("DEBUG", "sub_id ", sub_id);

    //     if (sub_id == "8" && location != "8") {
    //         // TRANSPORT
    //         template += "<img class=\"header\" style=\"width:57%;height:38%;margin-left:-45px; padding-right:-1000px;margin-top:-48px;\" height=\"30\%\" width=\"95\%\"  src = \"";
    //         var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
    //         template += nlapiEscapeXML(path);
    //         template += "\"></img>";
    //     } else if (sub_id == "8" && location == "8") {
    //         // CONTRACTING CO
    //         template += "<img class=\"header\" style=\"width:60%;height:38%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"60\%\"  src = \"";
    //         var path = "https://7061228.app.netsuite.com" + nlapiLoadFile('Logo/logo_facc.png').getURL();
    //         template += nlapiEscapeXML(path);
    //         template += "\"></img>";
    //     } else if (sub_id == "16" && location == "21") {
    //         // CONTRACTING CO
    //         template += "<img class=\"header\" style=\"width:60%;height:38%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"60\%\"  src = \"";
    //         var path = "https://7061228.app.netsuite.com" + nlapiLoadFile('Logo/logo_facc.png').getURL();
    //         template += nlapiEscapeXML(path);
    //         template += "\"></img>";
    //     } 

    // //     //test 
    // //     else if (sub_id == "16" && location == "21") {

    // //         template += "        <macro id=\"nlheader\"> ";
    // //         // template += "<p style=\"width:100px;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" >";
    // //         // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();"
    // //         template += "<img src=\"https://4647359.app.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7\" style=\"width:768px;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" /> "

    // //         // template += nlapiEscapeXML(path);
    // //         // template += "\"></p>";
    // //         template += "        </macro> ";


    // // } 

    //     else {
    //         // INTERNATIONAL
    //         template += "<img class=\"header\" style=\"width:57%;height:50%;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"92\%\"  src = \"";
    //         var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
    //         template += nlapiEscapeXML(path);
    //         template += "\"></img>";
    //     }

    // }
    // UPDATED

    if (headerlogo) {
        nlapiLogExecution("DEBUG", "sub_id ", sub_id);

        if (sub_id == "8" && location != "8") {
            // TRANSPORT
            template += "<img class=\"header\" style=\"width:57%;height:38%;margin-left:-45px; padding-right:-1000px;margin-top:-48px;\" height=\"30\%\" width=\"95\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
        } else if (sub_id == "8" && location == "8") {
            // CONTRACTING CO
            template += "<img class=\"header\" style=\"width:60%;height:38%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"60\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile('Logo/logo_facc.png').getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
        } else if (sub_id == "16" && location == "21") {
            // CONTRACTING CO
            template += "<img class=\"header\" style=\"width:60%;height:38%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"60\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile('Logo/logo_facc.png').getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
        } else if (sub_id == "16" && location != "21") {
            template += "<img class=\"header\" style=\"width:57%;height:38%;margin-left:-45px; padding-right:-1000px;margin-top:-48px;\" height=\"30\%\" width=\"95\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
        }



        else {
            // INTERNATIONAL
            template += "<img class=\"header\" style=\"width:57%;height:50%;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"92\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
        }

    }


    //from advance PDF
    template += "<table style=\"width:100%; padding-top:50px;font-size:-30px;font-weight:bold;\"> ";
    template += "  <tr><td style=\"font-weight:bold; font-size: 14pt;\" align=\"center\">TAX INVOICE / <span class=\"arabicfont\" font-size=\"14px\" dir=\"rtl\"> فاتورة ضريبة</span></td></tr> ";
    template += " </table>";
    template += "";

    // template += " <table>";
    // template += " <tr>";
    // template += " <td>";
    // template += " </td>";

    // template += " </tr>";
    // template += " </table>";

    template += " <table style=\"width:100%;font-size:14px;  border-left:solid 1px #000000;border-right:solid 1px #000000;border-top:solid 1px #000000;margin-top:10px;\">";
    template += " <tr>";
    // template += " <#if record.entity.custentity_cr_number?has_content>";

    nlapiLogExecution("DEBUG", "inside if----")
    template += " <td style=\"width:52%\">";
    template += " <table style=\"width:100%\">";
    template += " <tr>";
    template += " <td style=\"font-size:10px;font-weight:bold;\">Bill To :";
    template += " </td>";
    template += " </tr>";

    template += " <tr>"; //fetch bill to
    template += " <#if record.custbody_legal_entity?has_content>"; //2if
    nlapiLogExecution("DEBUG", "inside hi----")
    template += " <td style=\"width:250px;font-weight:bold;\" align=\"left\">${record.custbody_legal_entity}<td>";
    template += " <#else>";
    nlapiLogExecution("DEBUG", "inside hi raeched---")
    template += " <td style=\"width:230px;font-weight:bold;\" align=\"left\">${record.entity.custentity_customer_name}<br/><span class=\"arabicfont\" dir = \"rtl\">${record.entity.custentity_customer_long_name_arabic}</span></td>";
    template += " </#if>";

    template += " </tr>";

    template += " <tr height= \"20px\">";
    template += " <td style=\"width:339px;font-weight:bold;font-size:12px;\" align=\"left\">CR No / <span class=\"arabicfont\" dir=\"rtl\">سجل تجاري </span> : ${record.entity.custentity_cr_number}<br/>VAT No /<span class=\"arabicfont\" dir=\"rtl\">الرقم الضريبي</span> : ${record.entity.vatregnumber}</td>";
    template += " </tr>";

    template += " <tr> ";
    template += " <td style=\"width:359px;font-weight:bold;font-size:9px;\" align=\"left\"><span class=\"arabicfont\" dir = \"rtl\">${record.entity.custentity_address_in_arabic}</span></td>";
    template += " </tr>";
    template += " </table >"; //left table close
    template += " </td>";

    template += " <td style=\"width:48%; border-left:solid 1px #000000;\">";
    template += " <table style=\"width:100%\">";
    template += " <tr>";
    template += " <td style=\"width:40px;font-weight:bold;font-size:12px;\" align=\"left\">Invoice No / <span class=\"arabicfont\" dir=\"rtl\">رقم الفاتورة</span> : </td>";
    template += " <td style=\"width:40px;font-weight:bold;font-size:11px;\" align=\"right\">${record.tranid}</td> ";
    template += " </tr>";

    template += " <tr>";
    template += " <td style=\"width:65px;font-weight:bold;font-size:12px;\" align=\"left\">Invoice Date / <span class=\"arabicfont\" dir=\"rtl\">تاريخ الفاتورة</span> : </td>";
    template += " <td style=\"width:37px;font-weight:bold;font-size:12px;\" align=\"right\">  ${record.trandate?string[\"d.MM.yyyy\"]} </td> ";
    template += " </tr>";
    template += " <tr> ";
    template += " <td style=\"width:60px;font-weight:bold;font-size:12px;\" align=\"left\">Al Faris VAT No /<br/><span class=\"arabicfont\" dir=\"rtl\"> الرقم التعريف الضريبي </span> :</td>";
    template += " <td style=\"width:22px;font-weight:bold;font-size:12px;\" align=\"right\"> ${record.custbody_trn}<br/>";
    template += " <#if record.custbody_qr_code_data?has_content>"; //3if
    template += " <barcode codetype=\"qrcode\" showtext=\"false\" height=\"96px\" width=\"96px\"  align=\"center\" value=\"${record.custbody_qr_code_data}\"/>";
    template += " </#if>";
    template += " </td> ";
    template += " </tr>";
    template += " </table >";
    template += " </td>";


    template += " </tr>";
    template += " </table >";

    // 2TABLE---
    template += " <table style=\"width:100%;margin-top:0.5px;font-size:9px; \">";

    template += " <tr>";
    template += " <td style=\"border-left:solid 1px #000000;border-top:solid 1px #000000;border-bottom:solid 1px #000000;\">"
    template += " <table style=\"width:100%\" >";
    template += " <tr> ";
    template += " <td > <p style =\"min-height:20px;\"><b>Tel No / <span class=\"arabicfont \" dir=\"rtl \"> رقم الهاتف </span> : </b> <br/> ${record.entity.phone}</p> </td> ";
    template += " </tr>";
    template += " <tr> ";
    template += " <td> <p style =\"min-height:20px;\"><b>Fax No / <span class=\"arabicfont \" dir= \"rtl \"> رقم الفاكس </span> : </b> <br/> ${record.entity.fax} </p></td> ";
    template += " </tr>";
    template += " <tr> ";
    template += " <td> <p style =\"min-height:20px;\"><b>Attn / <span class=\"arabicfont \" dir= \"rtl \"> اعداد</span> : </b> ${record.custbody_attention} </p></td>";
    template += " </tr>";
    template += " <tr> ";
    template += " <td> <p style =\"min-height:20px;\"><b>Contract / <span class=\"arabicfont \" dir= \"rtl \"> المقاول </span> : </b> <br/> <#if record.custbody_customer_doc_ref_no?has_content>${record.custbody_customer_doc_ref_no}<#else>${record.custbody_invoice_qt_number_cf}</#if> </p></td> ";
    template += " </tr>";
    template += " <#if record.otherrefnum?has_content>";
    template += " <tr> ";
    template += " <td> <p style =\"min-height:20px;\"><b>LPO No / <span class=\"arabicfont \" dir=\"rtl \">ال بي او</span> : </b> <br/> ${record.otherrefnum} </p></td> ";
    template += " </tr> ";
    template += " <#else>";
    template += " <tr>";
    template += " <td> <p style =\"min-height:20px;\"><b>LPO No / <span class=\"arabicfont\" dir=\"rtl\">ال بي او</span> : </b><br/> &nbsp; </p></td>";
    template += " </tr>";
    template += " </#if>\";";
    template += " </table>";
    template += "  </td>";
    template += "  <td style=\"border-left:solid 1px #000000;border-top:solid 1px #000000;border-bottom:solid 1px #000000;\">";
    template += "  <table style=\"width:100%\">";
    template += "  <tr>";
    template += " <td> <p style =\"min-height:20px;\"><b>Pay Terms / <span class=\"arabicfont\" dir=\"rtl\">وقت الدفع المسبق </span> :</b>  <br/> ${record.terms} </p></td>"; //custbody_payment_terms
    template += " </tr>";
    template += " <#if record.duedate?string == '' >";
    template += " <tr>";
    template += " <td> <p style =\"min-height:20px;\"><b>Pay Due / <span class=\"arabicfont\" dir=\"rtl\">تاريخ الدفع </span> :</b> ${record.duedate} </p></td>";
    template += " </tr>";
    template += " <#else>";
    template += " <tr> ";
    template += " <td> <p style =\"min-height:20px;\"><b>Pay Due / <span class=\"arabicfont\" dir=\"rtl\">تاريخ الدفع </span> : </b> ${record.duedate?string[\"d.MM.yyyy\"]} </p> </td>";
    template += " </tr>";
    template += "     </#if>";
    template += "     <tr> <td> <b>Sales Rep / <span class=\"arabicfont\" dir=\"rtl\">مندوب المبيعات</span> : </b>  <br/> ${record.salesrep.entityid} ${record.salesrep.firstname} </td></tr>";
    template += "     <tr><td> <b>Site / <span class=\"arabicfont\" dir=\"rtl\">الموقع</span> : </b> ${record.custbody_site}</td></tr>";
    template += "     </table>";
    template += "     </td>";;
    template += "     <td style=\"border-left:solid 1px #000000;border-top:solid 1px #000000;border-bottom:solid 1px #000000;border-right:solid 1px #000000;width:259px; font-size: 11px;\"> <p style =\"min-height:30px;\">";
    template += "     <#if record.custbody_bank_details?has_content><span>${record.custbody_bank_details}</span></#if>";
    template += "     <br/>";
    template += "    <b style=\"font-size:10px;\">All bank transfer charges to be borne by customer</b>   </p>";
    template += "  </td>";
    template += "  </tr></table>";






    // Scope of work

    template += "      <table style=\"width:100%; margin-bottom: 0px; padding-top:6px;\"> ";
    template += "        <tr><td style=\"width:20%; \" ><b>Scope of work <span class=\"arabicfont\" dir=\"rtl\">نوع العمل</span></b></td><td style=\"width:1%;\"><b>:</b></td><td style=\"width:74%;\">${record.custbody_scope_of_work}</td></tr>";
    // template += "</table> <table><tr><td></td></tr></table>";
    template += "</table> ";
    template += "        </macro> ";
    template += "        <macro id=\"nlfooter\"> ";
    template += "           <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '8'> "; //AFIHER Abu Dhabi
    template += " <table style =\"align:left;font-style:italics;font-size:8px;padding-bottom:-80px;padding-top:50px;padding-left:-25px;\">";
    template += " <tr><td>A.&nbsp;Any discrepancies must be notified to Accounts Department within 07 days from receipt of this invoice.</td></tr>";
    template += " <tr><td>B.&nbsp;Invoices should be settled as per approved credit terms.In case of delay a surcharge of 1% per month ,on overdue amount will be levied extra.</td></tr>";
    template += " </table>";
    template += "</#if> ";

    if (footerlogobottom) {
        template += "<img class=\"footer\" style=\"width:96%; height:100%;top:95px;margin-left:-50px;\" height=\"100\%\" width=\"96\%\"  src = \"";
        var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
        template += nlapiEscapeXML(path);
        template += "\"></img>";
    }
    if (footerlogotop) {
        template += "<img class=\"footer\" style=\"top:-2px;left:510px;margin-right:-40px;width:85%; height:100%;\" height=\"100\%\" width=\"88\%\"  src = \"";
        var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogotop).getURL();
        template += nlapiEscapeXML(path);
        template += "\"></img>";
    }
    template += "        </macro> ";
    template += "    </macrolist> ";
    template += "    <style type=\"text/css\">table { ";
    template += "            font-family: sans-serif;";
    template += "font-size: 10pt;";
    template += "table-layout: fixed;";
    template += "} ";
    template += "        th { ";
    template += "            font-weight: bold;";
    template += "font-size: 9pt;";
    template += "vertical-align: middle;";
    template += "padding: 5px 6px 3px;";
    template += "background-color: #e3e3e3;";
    template += "color: #333333;";
    template += "} ";
    template += "      td p { align:left;";
    template += "} ";
    template += "      b { ";
    template += "            font-weight: bold;";
    template += "color: #333333;";
    template += "} ";
    template += "        table.header td { ";
    template += "            padding: 0;";
    template += "font-size: 10pt;";
    template += "} ";
    template += "        table.footer td { ";
    template += "            padding: 0;";
    template += "font-size: 9pt;";
    template += "} ";
    template += "       table.itemtable { ";
    template += "            border: 1px solid #000000;";
    template += "} ";
    template += "        table.itemtable th { ";
    template += "            padding-bottom: 10px;";
    template += "padding-top: 10px;";
    template += "} ";
    template += "        table.body td { ";
    template += "            padding-top: 2px;";
    template += "} ";
    template += "        table.total { ";
    template += "            page-break-inside: avoid;";
    template += "} ";
    template += "        tr.totalrow { ";
    template += "            background-color: #e3e3e3;";
    template += "line-height: 200%;";
    template += "} ";
    template += "        td.totalboxtop { ";
    template += "            font-size: 13pt;";
    template += "background-color: #e3e3e3;";
    template += "} ";
    template += "        td.addressheader { ";
    template += "            font-size: 9pt;";
    template += "padding-top: 6px;";
    template += "padding-bottom: 2px;";
    template += "} ";
    template += "        td.address { ";
    template += "            padding-top: 0;";
    template += "} ";
    template += "        td.totalboxmid { ";
    template += "            font-size: 29pt;";
    template += "padding-top: 20px;";
    template += "background-color: #e3e3e3;";
    template += "} ";
    template += "        td.totalboxbot { ";
    template += "            background-color: #e3e3e3;";
    template += "font-weight: bold;";
    template += "} ";
    template += "        span.title { ";
    template += "            font-size: 29pt;";
    template += "} ";
    template += "        span.number { ";
    template += "            font-size: 17pt;";
    template += "} ";
    template += "        span.itemname { ";
    template += "            font-weight: bold;";
    template += "line-height: 150%;";
    template += "} ";
    template += "        hr { ";
    template += "            width: 100%;";
    template += "color: #d3d3d3;";
    template += "background-color: #d3d3d3;";
    template += "height: 1px;";
    template += "} ";
    template += "span.arabicfont{ ";
    template += "    font-family: arabic-font, sans-serif;";
    template += "   font-size: 9pt; ";
    template += "    table-layout: fixed; ";
    template += "    direction:rtl; ";
    template += "    }";
    template += "</style> ";
    template += "</head>";
    template += "    	 <body header=\"nlheader\" header-height=\"45%\" footer=\"nlfooter\" footer-height=\"10%\" size=\"A4\"> ";


    template += "   <#if record.subsidiary.internalid?string == '11'||record.subsidiary.internalid?string == '8' || record.subsidiary.internalid?string == '16'> ";
    // if (sub_id == "8") {
    //     template += "<br/>";
    // }
    if (sub_id == "8" || sub_id == "16") {
        template += "  ";
        // template += "    <table style=\"width:100%; padding-top:5px\"> ";
        template += "    <table style=\"width:100%; padding-top:-8x\"> ";

        template += "      <tr><td style=\"width:18%\"></td><td style=\"width:20%\"></td><td style=\"width:15%\"></td><td style=\"width:15%\"></td><td style=\"width:17%\"></td><td style=\"width:15%\"></td></tr> ";

        template += "      <tr><td style=\"border-top: solid 1px #000000;border-bottom: solid 1px #000000;border-left: solid 1px #000000;border-right: solid 1px #000000;font-weight:bold;\" align=\"center\" colspan=\"6\" >CONTRACT PAYMENT INFORMATION</td></tr> ";
        template += "      <tr> ";
        var delivaryNote = '';
        var Rent_ROBD = invoice.getLineItemValue('item', 'custcol_rent_rod', 1);
        var rent_rental_unit = invoice.getLineItemText('item', 'custcol_rent_rental_unit', 1);
        if (Rent_ROBD == null || Rent_ROBD == "") {
            var Rent_ROBD = invoice.getLineItemValue('item', 'custcol_rent_rod', 2);
            var rent_rental_unit = invoice.getLineItemText('item', 'custcol_rent_rental_unit', 2);
        }
        if (invoice.getFieldValue("createdfrom")) {
            var so_Id = invoice.getFieldValue("createdfrom");
            var so_rec = nlapiLoadRecord('salesorder', so_Id);
            delivaryNote = so_rec.getFieldValue("tranid");

        } else {
            if (Rent_ROBD) {
                delivaryNote = nlapiLookupField('customrecord_rent_rod', Rent_ROBD, 'custrecord_rent_rod_delivery_note');
            }
        }

        var so_tranid = ''
        var sales_id = invoice.getFieldValue("custbody_rent_sales_order");
        if (sales_id) {
            var sales_rec = nlapiLoadRecord('salesorder', sales_id);
            so_tranid = sales_rec.getFieldValue("tranid");
            nlapiLogExecution("DEBUG", "so_tranid-----", so_tranid)

        }
        template += "        <td  style= \"border-bottom: solid 1px #000000;border-left: solid 1px #000000;width:15%\" >Delivery Note No / <span class=\"arabicfont\" dir=\"rtl\">رقم إشعار التسليم</span></td><td style=\"border-bottom: solid 1px #000000;width:25%\">: " + removeNull(deliveryNote) + "</td> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;width:15%\">Terms of hire / <span class=\"arabicfont\" dir=\"rtl\">شروط التأجير</span></td><td style=\"border-bottom: solid 1px #000000;\">:" + removeNull(rent_rental_unit) + "</td> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;width:15%\">Rental Start Date / <span class=\"arabicfont\" dir=\"rtl\">تاريخ بدء التأجير</span></td><td style=\"border-bottom: solid 1px #000000;border-right: solid 1px #000000;width:15%\">: ${record.custbody_std_aln_inv_rental_strt_date?string[\"d-MMM-yyyy\"]}</td> ";
        template += "     </tr> ";
        template += "      <tr> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;border-left: solid 1px #000000;\">Hire Duration From / <span class=\"arabicfont\" dir=\"rtl\">فترة الايجار تبدأ من</span></td><td style=\"border-bottom: solid 1px #000000;\">: ${record.startdate?string[\"d-MMM-yyyy\"]}</td> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;\">Hire Duration To / <span class=\"arabicfont\" dir=\"rtl\">فترة الإيجار إلى</span></td><td style=\"border-bottom: solid 1px #000000;\">: ${record.enddate?string[\"d-MMM-yyyy\"]}</td> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;\">Contract Status / <span class=\"arabicfont\" dir=\"rtl\">حالة التعاقد</span></td><#if record.custbody_rent_sales_order.enddate?has_content><td style=\"border-bottom: solid 1px #000000;border-right: solid 1px #000000;\">: Closed</td><#else><td style=\"border-bottom: solid 1px #000000;border-right: solid 1px #000000;\">: Open</td></#if> ";
        template += "        </tr> ";
        template += "    </table> ";
    }
    // ----TESTING STARTS
    else {
        template += "  ";
        // template += "    <table style=\"width:100%; padding-top:-13px\"> ";
        template += "    <table style=\"width:100%; padding-top:-13px\"> ";

        template += "      <tr><td style=\"width:18%\"></td><td style=\"width:20%\"></td><td style=\"width:15%\"></td><td style=\"width:15%\"></td><td style=\"width:17%\"></td><td style=\"width:15%\"></td></tr> ";

        template += "      <tr><td style=\"border-top: solid 1px #000000;border-bottom: solid 1px #000000;border-left: solid 1px #000000;border-right: solid 1px #000000;font-weight:bold;\" align=\"center\" colspan=\"6\" >CONTRACT PAYMENT INFORMATION</td></tr> ";
        template += "      <tr> ";
        var delivaryNote = '';
        var Rent_ROBD = invoice.getLineItemValue('item', 'custcol_rent_rod', 1);
        var rent_rental_unit = invoice.getLineItemText('item', 'custcol_rent_rental_unit', 1);
        if (Rent_ROBD == null || Rent_ROBD == "") {
            var Rent_ROBD = invoice.getLineItemValue('item', 'custcol_rent_rod', 2);
            var rent_rental_unit = invoice.getLineItemText('item', 'custcol_rent_rental_unit', 2);
        }
        if (invoice.getFieldValue("createdfrom")) {
            var so_Id = invoice.getFieldValue("createdfrom");
            var so_rec = nlapiLoadRecord('salesorder', so_Id);
            delivaryNote = so_rec.getFieldValue("tranid");

        } else {
            if (Rent_ROBD) {
                delivaryNote = nlapiLookupField('customrecord_rent_rod', Rent_ROBD, 'custrecord_rent_rod_delivery_note');
            }
        }

        var so_tranid = ''
        var sales_id = invoice.getFieldValue("custbody_rent_sales_order");
        if (sales_id) {
            var sales_rec = nlapiLoadRecord('salesorder', sales_id);
            so_tranid = sales_rec.getFieldValue("tranid");
            nlapiLogExecution("DEBUG", "so_tranid-----", so_tranid)

        }
        template += "        <td  style= \"border-bottom: solid 1px #000000;border-left: solid 1px #000000;width:15%\" >Delivery Note No / <span class=\"arabicfont\" dir=\"rtl\">رقم إشعار التسليم</span></td><td style=\"border-bottom: solid 1px #000000;width:25%\">: " + removeNull(so_tranid) + "</td> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;width:15%\">Terms of hire / <span class=\"arabicfont\" dir=\"rtl\">شروط التأجير</span></td><td style=\"border-bottom: solid 1px #000000;\">:" + removeNull(rent_rental_unit) + "</td> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;width:15%\">Rental Start Date / <span class=\"arabicfont\" dir=\"rtl\">تاريخ بدء التأجير</span></td><td style=\"border-bottom: solid 1px #000000;border-right: solid 1px #000000;width:15%\">: ${record.custbody_rent_sales_order.startdate?string[\"d-MMM-yyyy\"]}</td> ";
        template += "     </tr> ";
        template += "      <tr> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;border-left: solid 1px #000000;\">Hire Duration From / <span class=\"arabicfont\" dir=\"rtl\">فترة الايجار تبدأ من</span></td><td style=\"border-bottom: solid 1px #000000;\">: ${record.startdate?string[\"d-MMM-yyyy\"]}</td> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;\">Hire Duration To / <span class=\"arabicfont\" dir=\"rtl\">فترة الإيجار إلى</span></td><td style=\"border-bottom: solid 1px #000000;\">: ${record.enddate?string[\"d-MMM-yyyy\"]}</td> ";
        template += "        <td style=\"border-bottom: solid 1px #000000;\">Contract Status / <span class=\"arabicfont\" dir=\"rtl\">حالة التعاقد</span></td><#if record.custbody_rent_sales_order.enddate?has_content><td style=\"border-bottom: solid 1px #000000;border-right: solid 1px #000000;\">: Closed</td><#else><td style=\"border-bottom: solid 1px #000000;border-right: solid 1px #000000;\">: Open</td></#if> ";
        template += "        </tr> ";
        template += "    </table> ";


    }
    template += "  ";
    // TESTING---ENDS


    template += "   <#if record.item?has_content> ";
    if ("T" == invoice.getFieldValue("custbody_allow_lump_sum")) {
        var totalRate = 0;
        var totalAmount = 0;
        var count = 0;
        var totalGrossamt = 0;
        var totalamt = 0;
        var totalTax = 0;
        var totalgrossamt = 0;
        var finalAmount = 0;
        var finalTax1Amount = 0;
        var finalGrossAmount = 0;
        template += " <table width=\"100%\" style=\"border:solid 1px #000000;margin-top:0px;font-size:9pt;\"> ";
        var lineCount = invoice.getLineItemCount('item');
        for (var i = 1; i <= lineCount; i++) {
            var groupType = invoice.getLineItemValue('item', 'itemtype', i);
            var description = invoice.getLineItemValue('item', 'description', i);
            var rate = invoice.getLineItemValue('item', 'rate', i);
            var amount = invoice.getLineItemValue('item', 'amount', i);
            var tax1amt = invoice.getLineItemValue('item', 'tax1amt', i);
            var grossamt = invoice.getLineItemValue('item', 'grossamt', i);
            if (groupType == "Description") {
                count++;
                if (count == 2) {
                    var nextitem = 1;
                }
            }
            if (groupType != "Description" && count == 1) {
                totalRate = +totalRate + +rate;
                totalTax = +totalTax + +tax1amt;
                totalAmount = +totalAmount + +amount;
                totalGrossamt = +totalGrossamt + +grossamt;
                var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
            }
            nlapiLogExecution("DEBUG", "Inside Log-- - i ", i);

            if (i == 1) {
                nlapiLogExecution("DEBUG", "Inside Log");
                template += "       <tr> " +
                    "               <td align=\"center\" style=\"width:40%;border-bottom:solid 1px #000000;font-weight:bold;\">Equipment</td> " +
                    "               <td align=\"center\" style=\"width:10%;border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Rental Unit</td> " +
                    "               <td align=\"center\" style=\"width:10%;border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Unit Price</td> " +
                    "               <td align=\"center\" style=\"width:13%;border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total excl. of Tax (${record.currency})</td> " +
                    "               <td align=\"center\" style=\"width:5%;border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax %</td> " +
                    "               <td align=\"center\" style=\"width:9%;border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax<br/>(${record.currency})</td> " +
                    "               <td align=\"center\" style=\"width:13%;border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total with Tax (${record.currency})</td> ";
                template += "  </tr> ";
            }

            if (nextitem == 1 || i == lineCount) {


                template += "        <tr> ";
                template += "     <td width=\"40%\">" + replaceAndOper(descNextLine(removeNull(iteamName))) + "</td> " +
                    "            <td width=\"10%\" style=\"border-left:solid 1px #000000;\">LUMP SUM</td> " +
                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalAmount.toFixed(2)) + "</td> " +
                    "            <td align=\"right\" width=\"13%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalAmount.toFixed(2)) + "</td> " +
                    "            <td align=\"right\" width=\"5%\" style=\"border-left:solid 1px #000000;\">" + persentage(taxrate1) + "</td> " +
                    "            <td align=\"right\" width=\"9%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(totalTax.toFixed(2))) + "</td> " +
                    "            <td align=\"right\" width=\"13%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalGrossamt.toFixed(2)) + "</td> ";
                template += "      </tr> ";

                template += " <#if record.currency?string != 'AED'> ";
                var exchgRate = invoice.getFieldValue("exchangerate");
                var exchgAmt = Number(exchgRate) * Number(totalAmount);
                var exchgTaxAmt = Number(exchgRate) * Number(totalTax);
                var exchgGrsAmt = Number(exchgRate) * Number(totalGrossamt);
                template += "        <tr> ";
                template += "     <td width=\"40%\"><b>Values in AED</b></td> " +
                    "            <td width=\"10%\" style=\"border-left:solid 1px #000000;\">&nbsp;</td> " +
                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">&nbsp;</td> " +
                    "            <td align=\"right\" width=\"13%\" style=\"border-left:solid 1px #000000;\"><b>" + numberWithCommas(exchgAmt.toFixed(2)) + "</b></td> " +
                    "            <td align=\"right\" width=\"5%\" style=\"border-left:solid 1px #000000;\">&nbsp;</td> " +
                    "            <td align=\"right\" width=\"9%\" style=\"border-left:solid 1px #000000;\"><b>" + numberWithCommas(removeNull(exchgTaxAmt.toFixed(2))) + "</b></td> " +
                    "            <td align=\"right\" width=\"13%\" style=\"border-left:solid 1px #000000;\"><b>" + numberWithCommas(exchgGrsAmt.toFixed(2)) + "</b></td> ";
                template += "      </tr> ";

                template += "           </#if> ";
                finalAmount = +finalAmount + +totalAmount;
                finalTax1Amount = +finalTax1Amount + +totalTax;
                finalGrossAmount = +finalGrossAmount + +totalGrossamt;

                totalRate = 0;
                totalTax = 0;
                totalAmount = 0;
                totalGrossamt = 0;
                count--;
                nextitem = 0;

            }
            if (groupType == "Description") {
                var iteamName = invoice.getLineItemValue('item', 'description', i);
            }
        }
        template += "   <tr> ";
        template += "      <td align=\"left\" colspan=\"3\"  width=\"60%\" style=\"padding:5px;border-top:solid 1px #000000;\"><b>Amount in words: </b><i>${record.currency} ${record.custbody_kpib_total_in_words?capitalize}</i></td> ";
        template += "      <td align=\"right\"  width=\"13%\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>" + numberWithCommas(finalAmount.toFixed(2)) + "</b></td> ";
        template += "      <td align=\"right\"  width=\"5%\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\">&nbsp;</td> ";
        template += "      <td align=\"right\"  width=\"9%\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>" + numberWithCommas(finalTax1Amount.toFixed(2)) + "</b></td> ";
        template += "      <td align=\"right\"  width=\"13%\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>" + numberWithCommas(finalGrossAmount.toFixed(2)) + "</b></td> ";
        template += "   </tr> ";
        template += "    </table> ";
        template += " <#if record.currency?string != 'AED'>" +
            "<table style='width:50%;border:1px solid black;font-weight:bold;margin-top:5 px;font-size:11px;'>" +
            " <tr>" +
            "    <td>Total Value in AED : ${(record.total * record.exchangerate)?string[\"#,##0.00\"]}</td>" +
            " </tr>" +
            " <tr>" +
            "    <td>Tax in AED : ${(record.taxtotal * record.exchangerate)?string[\"#,##0.00\"]}</td>" +
            " </tr>" +
            "  <#if record.currency?string != 'AED'>" +
            "<tr>" +
            "   <td>Exchange Rate : (${record.currency} - AED) = ${record.exchangerate?string[\'0.######\']}</td>" +
            " </tr>" +
            "  </#if>" +
            " <tr>" +
            "   <td>VALUES IN AED FOR VAT PURPOSES ONLY.</td>" +
            " </tr>" +
            " </table>" +
            " </#if>";
        totalgrossamt = Number(finalGrossAmount).toFixed(2);
    } else if ("T" == invoice.getFieldValue("custbody_combined_project")) {
        var totalRate = 0;
        var totalAmount = 0;
        template += "    <table style=\"width:100%;border:solid 1px #000000;\"> ";
        var lineCount = invoice.getLineItemCount('item');
        for (var i = 1; i <= lineCount; i++) {
            var groupType = invoice.getLineItemValue('item', 'itemtype', i);
            var itemType = invoice.getLineItemValue('item', 'custcol_rent_item_type', i);
            if (count == 1 && itemType == 5) {
                template += "        <tr> ";
                template += "        <td colspan=\"4\" style=\"border-right:solid 1px #000000;border-top:solid 1px #000000;\">${item.custcol_serial_slot_number}</td> ";
                template += "        <td colspan=\"5\" style=\"border-right:solid 1px #000000;border-top:solid 1px #000000;\">${item.description}</td> ";
                if (rate > 0)
                    template += "          <td align=\"right\" colspan=\"3\" style=\"border-right:solid 1px #000000;border-top:solid 1px #000000;\">${item.rate?string[\"#,##0.00\"]}</td>";
                else
                    template += "<td align=\"right\" colspan=\"3\" style=\"border-right:solid 1px #000000;border-top:solid 1px #000000;\">&nbsp;";
                template += "</td> ";
                if (amount > 0)
                    template += "           <td align=\"right\" colspan=\"3\" style=\"border-top:solid 1px #000000;\">${item.amount?string[\"#,##0.00\"]}</td>";
                else
                    template += " <td align=\"right\" colspan=\"3\" style=\"border-top:solid 1px #000000;\">&nbsp;</td> ";
                template += "      </tr> ";
                totalRate = 0;
                totalAmount = 0;
                count = 0;
            }
            var seralSlotno = invoice.getLineItemValue('item', 'custcol_serial_slot_number', i);
            var description = invoice.getLineItemValue('item', 'description', i);
            var rate = invoice.getLineItemValue('item', 'rate', i);
            var amount = invoice.getLineItemValue('item', 'amount', i);
            if (groupType == "Description") {
                count++;
                if (count == 2) {
                    var nextitem = 1;
                }
            }
            if (groupType != "Description" && count == 1) {
                totalRate = +totalRate + +rate;
                totalAmount = +totalAmount + +amount;
            }
            if (i == 1) {
                template += "       <tr> ";
                template += "        <td colspan=\"4\"  style=\"border-right:solid 1px #000000;font-weight:bold;\">Equipment Code</td> ";
                template += "        <td colspan=\"5\" style=\"border-right:solid 1px #000000;font-weight:bold;\">Equipment Description</td> ";
                template += "        <td colspan=\"3\"  style=\"border-right:solid 1px #000000;font-weight:bold;\">Rate</td> ";
                // template += "        <td colspan=\"2\"  style=\"border-right:solid 1px #000000;font-weight:bold;\">Period</td> ";
                template += "<td colspan=\"3\"  style=\"font-weight:bold;\">Amount(${record.currency})</td>";
                template += "      </tr> ";
            }

            // template += "      <#if item.custcol_hide_in_print?string == 'No'> ";
            if (nextitem == 1 || i == lineCount) {
                template += "        <tr> ";
                template += "        <td colspan=\"4\" style=\"border-right:solid 1px #000000;border-top:solid 1px #000000;\">${item.custcol_serial_slot_number}</td> ";
                template += "        <td colspan=\"5\" style=\"border-right:solid 1px #000000;border-top:solid 1px #000000;\">${item.description}</td> ";
                if (rate > 0)
                    template += "          <td align=\"right\" colspan=\"3\" style=\"border-right:solid 1px #000000;border-top:solid 1px #000000;\">${item.rate?string[\"#,##0.00\"]}</td>";
                else
                    template += "<td align=\"right\" colspan=\"3\" style=\"border-right:solid 1px #000000;border-top:solid 1px #000000;\">&nbsp;";
                template += "</td> ";

                if (amount > 0)
                    template += "           <td align=\"right\" colspan=\"3\" style=\"border-top:solid 1px #000000;\">${item.amount?string[\"#,##0.00\"]}</td>";
                else
                    template += " <td align=\"right\" colspan=\"3\" style=\"border-top:solid 1px #000000;\">&nbsp;</td> ";
                template += "      </tr> ";
                totalRate = 0;
                totalAmount = 0;
                count--;
            }
            if (groupType == "Description") {
                var iteamName = invoice.getLineItemValue('item', 'description', i);
            }
            // template += "        </#if> ";
        }
        template += "   <tr> ";
        template += "      <td align=\"left\" colspan=\"14\" style=\"padding:5px;border-top:solid 1px #000000;border-right:solid 1px #000000;\"><b>Amount in words: </b><i>${record.currency} ${record.custbody_amount_into_words?capitalize}</i></td> ";
        template += "      <td align=\"right\" colspan=\"3\" style=\"padding:5px;border-top:solid 1px #000000;\"><b>${record.total?string[\"#,##0.00\"]}</b></td> ";
        template += "   </tr> ";
        template += "    </table> ";
    } else {

        template += " <table class=\"itemtable\" style=\"width: 100%;font-size:10px;border-top:solid 1px #000000;margin-top:5px;\"> " +
            "         <thead> " +
            "            <tr> " +
            // "               <td align=\"center\" colspan=\"2\" style=\"border-bottom:solid 1px #000000;font-weight:bold;\">Sl No.</td> " +
            "               <td align=\"center\" colspan=\"3\" style=\"border-bottom:solid 1px #000000;font-weight:bold;\"><p>Equipment/Serial No. / <span class=\"arabicfont\" dir=\"rtl\">الرقم التسلسلي للمعدة</span></p></td> " +
            "               <td align=\"center\" colspan=\"8\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Description / <span class=\"arabicfont\" dir=\"rtl\">الوصف</span></td> " +
            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Unit Price / <span class=\"arabicfont\" dir=\"rtl\">سعر الوحدة</span></td> " +
            "               <td align=\"center\" colspan=\"2\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Period / <span class=\"arabicfont\" dir=\"rtl\">الفترة الزمنية</span></td> " +
            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total excl. of Tax (${record.currency}) / <span class=\"arabicfont\" dir=\"rtl\">الإجمالي غير شامل للضريبة (ريال سعودي)</span></td> " +
            "               <td align=\"center\" colspan=\"1\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax % / <span class=\"arabicfont\" dir=\"rtl\">الضريبة</span></td> " +
            "               <td align=\"center\" colspan=\"2\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax<br/>(${record.currency}) / <span class=\"arabicfont\" dir=\"rtl\">الضريبة (ريال سعودي)</span></td> " +
            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total with Tax (${record.currency}) / <span class=\"arabicfont\" dir=\"rtl\">الإجمالي مع الضريبة (ريال سعودي)</span></td> " +
            "            </tr> " +
            "         </thead> ";
        var lineCount = invoice.getLineItemCount('item');
        var totalAmount = 0;
        var totaltaxrate1 = 0;
        var totaltax1amt = 0;
        var totalgrossamt = 0;
        if (lineCount > 0) {
            for (var i = 1; i <= lineCount; i++) {
                var item = invoice.getLineItemValue('item', 'item', i)
                var Equipment = invoice.getLineItemValue('item', 'custcol_rent_asset_ref_display', i);
                var description = invoice.getLineItemValue('item', 'description', i);
                var arabic_desc = invoice.getLineItemValue('item', 'custcol_arabic_description', i);
                var rate = invoice.getLineItemValue('item', 'rate', i);
                var amount = invoice.getLineItemValue('item', 'amount', i);
                var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
                var tax1amt = invoice.getLineItemValue('item', 'tax1amt', i);
                var grossamt = invoice.getLineItemValue('item', 'grossamt', i);
                var slNo = invoice.getLineItemValue('item', 'custcol_rent_asset_serial', i);
                var robd_rate = invoice.getLineItemValue('item', 'custcol_rent_robd', i)
                var invRate = invoice.getLineItemValue('item', 'rate', i)


                var rental_unit = invoice.getLineItemValue('item', 'custcol_rent_rental_unit', i);
                nlapiLogExecution("DEBUG", "Inside Log-- rental unit ", rental_unit);

                var billing_rule = invoice.getLineItemValue('item', 'custcol_rent_billing_rule_display', i);
                nlapiLogExecution("DEBUG", "Inside Log-- billing rule ", billing_rule);


                if (rental_unit == "4") {
                    nlapiLogExecution("DEBUG", "Inside IF-- rental_unit  ", rental_unit);
                    var period = "1 Month";
                } else if (rental_unit == "3") {
                    nlapiLogExecution("DEBUG", "Inside IF-- rental_unit  ", rental_unit);
                    var period = "1 Week";
                } else {

                    var days = invoice.getLineItemValue('item', 'custcol_billable_days', i);
                    var period = days + " Days";
                }

                var fromDateStr = invoice.getLineItemValue('item', 'custcol_rent_from_date', i);
                var toDateStr = invoice.getLineItemValue('item', 'custcol_rent_to_date', i);

                var fromDate = nlapiStringToDate(fromDateStr);
                var toDate = nlapiStringToDate(toDateStr);
                nlapiLogExecution("DEBUG", "toDate", toDate + i);
                nlapiLogExecution("DEBUG", "fromDate ", fromDate + i);
                var balanceDays = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;

                nlapiLogExecution("DEBUG", "balanceDays", balanceDays + i);

                var billableDays = invoice.getLineItemValue('item', 'custcol_billable_days', i);
                nlapiLogExecution("DEBUG", "billableDays ", billableDays);
                var mobilization_item = invoice.getLineItemValue('item', 'rate', i)
                // robd_rate
                if (robd_rate) {
                    var robd_unit = nlapiLookupField("customrecord_rent_robd", robd_rate, "custrecord_rent_robd_agreed_rate")
                    robd_unit = Number(robd_unit).toFixed(2);
                }
                if (item) {
                    var Item_type = nlapiLookupField("item", item, "recordtype")
                }

                // rate = Number(rate).toFixed(2);
                var lineItem1 = invoice.getLineItemValue('item', 'item', i);

                if (rental_unit == 5 || Equipment == '' || Equipment == null)
                    var Equipment = invoice.getLineItemValue('item', 'item_display', i);

                var exclInPrint = "";
                exclInPrint = invoice.getLineItemValue('item', 'custcol_exclude_in_print', i);
                if (exclInPrint == "" || exclInPrint != "T") {

                    // template += "   <#if record.currency?string != 'AED'>
                    template += " <tr> ";
                    // template += "<#else>";
                    // template += "<tr style=\"border-bottom:solid 1px #000000;\">";
                    // template += "</#if>";


                    if (rental_unit == 5)
                        template += "        <td colspan=\"3\" style=\"word-wrap: break-word;\"><p>" + replaceAndOper(removeNull(Equipment)) + "</p></td> ";
                    else
                    if(slNo){
                        template += "        <td colspan=\"3\" style=\"word-wrap: break-word;\"><p>" + replaceAndOper(removeNull(Equipment)) + "/" + removeNull(slNo) + "</p></td> ";
                    }
                    else{
                        template += "        <td colspan=\"3\" style=\"word-wrap: break-word;\"><p>" + replaceAndOper(removeNull(Equipment)) + "</p></td> ";
                    }
                        template += "            <td colspan=\"8\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(description))) + "<br/><span class=\"arabicfont\" dir = \"rtl\">" + arabic_desc + "</span></td> ";

                    if (rental_unit == 5) {
                        template += "<td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(mobilization_item)) + "</td> ";
                    }
                    //  else if (Item_type == "discountitem") {
                    //     template += "<td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(rate)) + "</td> ";
                    // }
                    else {
                        // template += "<td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(robd_unit)) + "</td> "; // robd rate was there now changed
                        //for stand alone invoice
                        template += "<td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(rate)) + "</td> ";
                    }

                    if (lineItem1 == 1906) {
                        template += "<td align=\"center\" colspan=\"2\" style=\"border-left:solid 1px #000000;\">LITERS</td> ";
                    } else if (rental_unit == 5) {
                        template += "<td align=\"center\" colspan=\"2\" style=\"border-left:solid 1px #000000;\">1&nbsp;Time</td> ";
                    } else {
                        nlapiLogExecution("DEBUG", "balanceDays=============", balanceDays);
                        if (billableDays) {
                            template += "            <td align=\"center\" colspan=\"2\" style=\"border-left:solid 1px #000000;\">" + billableDays + " days &nbsp;</td> ";
                        } else {
                            template += " <td align=\"center\" colspan=\"2\" style=\"border-left:solid 1px #000000;\"> &nbsp;</td> ";
                        }
                    }
                    template += "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(amount)) + "</td> " +
                        "            <td align=\"right\" colspan=\"1\" style=\"border-left:solid 1px #000000;\">" + persentage(taxrate1) + "</td> " +
                        "            <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(tax1amt)) + "</td> " +
                        "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(grossamt)) + "</td> " +
                        "         </tr> ";
                    template += " <#if record.currency?string != 'AED'> ";

                    var exchgRate = invoice.getFieldValue("exchangerate");
                    var exchgAmt = Number(exchgRate) * Number(amount);
                    var exchgTaxAmt = Number(exchgRate) * Number(tax1amt);
                    var exchgGrsAmt = Number(exchgRate) * Number(grossamt);

                    template += "</#if>";
                    totalAmount = +totalAmount + +amount;
                    totaltaxrate1 = +totaltaxrate1 + +taxrate1;
                    totaltax1amt = +totaltax1amt + +tax1amt;
                    totalgrossamt = +totalgrossamt + +grossamt;

                }
            }
        }

        template += "         <tr> " +
            "            <td align=\"left\" colspan=\"16\" style=\"border-top:solid 1px #000000;border-bottom:solid 1px #000000;\"><b>Total Value in ${record.currency}</b></td> " +
            "            <td align=\"right\" colspan=\"3\" style=\"border-top:solid 1px #000000;border-left:solid 1px #000000;;border-bottom:solid 1px #000000;\"><b>" + numberWithCommas(totalAmount.toFixed(2)) + "</b></td> " +
            "            <td align=\"center\" colspan=\"1\" style=\"border-top:solid 1px #000000;border-left:solid 1px #000000;;border-bottom:solid 1px #000000;\">&nbsp;" +
            "</td> " +
            "            <td align=\"right\" colspan=\"2\" style=\"border-top:solid 1px #000000;border-left:solid 1px #000000;;border-bottom:solid 1px #000000;\"><b>" + numberWithCommas(totaltax1amt.toFixed(2)) + "</b></td> " +
            "            <td align=\"right\" colspan=\"3\" style=\"border-top:solid 1px #000000;border-left:solid 1px #000000;;border-bottom:solid 1px #000000;\"><b>" + numberWithCommas(totalgrossamt.toFixed(2)) + "</b></td> " +
            "         </tr> " +
            "         <tr style=\"border-bottom:solid 1px #000000;\"> " +
            "            <td align=\"left\" colspan=\"22\" style=\"padding:5px;\"><b>Amount in" +
            "&nbsp;words: </b><i>${record.currency}&nbsp;&nbsp; ${record.custbody_amount_into_words?capitalize}</i></td> " +
            "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"><b>${record.total?string[\"#,##0.00\"]}</b></td> " +
            "         </tr> ";
        template += "<tr >";
        template += "<td align=\"left\" colspan=\"22\" style=\"padding:5px;\"><span class=\"arabicfont\" dir=\"rtl\">${record.custbody_amount_in_words_arabic} : المبلغ بالكلمات</span></td>";
        template += "</tr>";
        template += "     </table> ";




    }

    template += "    </#if> ";
    template += "    <table> ";
    template += "     <tr><td>&nbsp;";
    template += "</td></tr> ";
    template += "  </table> ";
    template += "  <#else> ";
    template += "   <#if record.time?has_content || record.item?has_content> ";
    template += "<table class=\"itemtable\" style=\"width: 100%;font-size:12px;\"> ";
    template += "   <thead> ";
    template += "     <tr> ";
    template += "         <td align=\"center\" colspan=\"5\" style=\"border-bottom:solid 1px #000000;font-weight:bold;\">TS Date</td> ";
    template += "           <#if record.subsidiary.internalid?string != '16'> ";
    template += "         <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">TS No.</td> ";
    template += "        </#if>";
    template += "         <td align=\"center\" colspan=\"5\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Equipment</td> ";
    template += "         <td align=\"center\" colspan=\"7\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Description</td> ";
    template += "         <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Qty / Unit</td> ";
    template += "         <td align=\"center\" colspan=\"5\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Unit Price </td> ";
    template += "<td align=\"center\" colspan=\"5\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total(${record.currency})</td>";
    template += "      </tr> ";
    template += "   </thead> ";
    template += "   <!-- start items --><#list record.time?reverse as time>";
    template += "   <!--<#if (time_index % 2) == 0><tr><#else><tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\"></#if>--> ";
    template += "<#if time.apply?string == 'Yes'>";
    template += "  <tr> ";
    template += "     <#if time.rate == 0> ";
    template += "<td colspan=\"5\" style=\"text-align:center;\">&nbsp;<br/><span style=\"text-align:center;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<#if time.custcol_ts_edate?has_content>&nbsp;</#if></span><br/>&nbsp;</td>";
    template += " <#else> ";
    template += "<td colspan=\"5\" style=\"text-align:center;\">${time.custcol_ts_sdate}<br/><span style=\"text-align:center;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<#if time.custcol_ts_edate?has_content>To</#if></span><br/>${time.custcol_ts_edate}</td>";
    template += "    </#if> ";
    template += "           <#if record.subsidiary.internalid?string != '16'> ";
    template += "   <td colspan=\"4\" style=\"border-left:solid 1px #000000;\">${time.custcol_ts_number}</td> ";
    template += "        </#if>";
    template += "     <td colspan=\"5\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">${time.custcol_ts_equipment}</td> ";
    template += "   <td colspan=\"7\" style=\"border-left:solid 1px #000000;\">${time.memo}</td> ";
    template += "    <#if time.rate == 0> ";
    template += "       <td colspan=\"4\" style=\"border-left:solid 1px #000000;\">&nbsp;";
    template += "</td> ";
    template += "    <#else> ";
    template += "     <td colspan=\"4\" style=\"border-left:solid 1px #000000;\">${time.custcol_ts_units}</td> ";
    template += "    </#if> ";
    template += "   <#if time.rate == 0> ";
    template += "      <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">&nbsp;";
    template += "</td> ";
    template += "      <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">&nbsp;";
    template += "</td> ";
    template += "      <#else> ";
    template += "        <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">${time.rate?string[\"#,##0.00\"]}</td> ";
    template += "        <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">${time.amount?string[\"#,##0.00\"]}</td> ";
    template += "  </#if> ";
    template += "   </tr>  </#if>";
    template += "   </#list><!-- end items -->  ";
    template += "<#if record.item?has_content><#list record.item?reverse as item>";
    template += "  <tr> ";
    template += "     <#if item.rate == 0> ";
    template += "<td colspan=\"5\" style=\"text-align:center;\">&nbsp;<br/><span style=\"text-align:center;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<#if item.custcol_ts_edate?has_content>&nbsp;</#if></span><br/>&nbsp;</td>";
    template += " <#else> ";
    template += "<td colspan=\"5\" style=\"text-align:center;\">${item.custcol_ts_sdate}<br/><span style=\"text-align:center;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<#if item.custcol_ts_edate?has_content>To</#if></span><br/>${item.custcol_ts_edate}</td>";
    template += "    </#if> ";
    template += "           <#if record.subsidiary.internalid?string != '16'> ";
    template += "   <td colspan=\"4\" style=\"border-left:solid 1px #000000;\">${item.custcol_ts_number}</td> ";
    template += "    </#if> ";

    template += "     <td colspan=\"5\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">${item.custcol_ts_equipment}</td> ";
    template += "   <td colspan=\"7\" style=\"border-left:solid 1px #000000;\">${item.description}</td> ";
    template += "    <#if item.rate == 0> ";
    template += "       <td colspan=\"4\" style=\"border-left:solid 1px #000000;\">&nbsp;";
    template += "</td> ";
    template += "    <#else> ";
    template += "     <td colspan=\"4\" style=\"border-left:solid 1px #000000;\">${item.custcol_ts_units}</td> ";
    template += "    </#if> ";
    template += "   <#if item.rate == 0> ";
    template += "      <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">&nbsp;";
    template += "</td> ";
    template += "      <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">&nbsp;";
    template += "</td> ";
    template += "      <#else> ";
    template += "        <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">${item.rate?string[\"#,##0.00\"]}</td> ";
    template += "        <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">${item.amount?string[\"#,##0.00\"]}</td> ";
    template += "  </#if> ";
    template += "   </tr>  ";
    template += "</#list></#if>";

    template += "<#if record.discountitem?has_content><tr>    ";
    template += "      <!--<td align=\"center\" colspan=\"3\" line-height=\"150%\" style=\"border-bottom:solid 1px #000000;border-top:solid 1px #000000;border-left:solid 1px #000000;\">&nbsp;";
    template += "</td>--> ";
    template += "      <td align=\"left\" colspan=\"3\" style=\"padding:5px;border-top:solid 1px #000000;\">${record.custbody_discount_description}</td> ";
    template += "      <td align=\"right\" colspan=\"6\" style=\"padding:5px;border-left:solid 1px #000000;\">${record.discounttotal?string[\"#,##0.00\"]}</td> ";
    template += "   </tr></#if> ";
    template += "   <tr>";
    template += "           <#if record.subsidiary.internalid?string != '16'> ";
    template += "   <td align=\"left\" colspan=\"30\" style=\"padding:5px;border-top:solid 1px #000000;\"><b>Amount in words: </b><i>${record.currency} ${record.custbody_amount_into_words?capitalize}</i></td>";
    template += "    <#else> ";
    template += "   <td align=\"left\" colspan=\"26\" style=\"padding:5px;border-top:solid 1px #000000;\"><b>Amount in words: </b><i>${record.currency} ${record.custbody_amount_into_words?capitalize}</i></td>";
    template += "</#if>";
    template += "   <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${record.total?string[\"#,##0.00\"]}</b></td>";
    template += "   </tr>";
    template += "  <!--<tr><td>AMONT : to_char(to_date(235,'j'),'Jsp')</td></tr>--> ";
    template += "</table> ";
    template += "</#if>";
    template += "  </#if> ";

    template += "    <table style=\"top:10px;\"> ";
    template += "      <tr><td>&nbsp;";
    template += "</td><td align=\"center\" style=\"width:100%;\"><b>E.&#38;";
    template += "O.E.</b></td></tr> ";
    template += "      <tr><td style=\"width:336px;\" align=\"left\">Received By / <span class=\"arabicfont\" dir=\"rtl\">تم الاستلام من قبل</span> :<br/><br/> _________________________________<br /><br />Received Date / <span class=\"arabicfont\" dir=\"rtl\">تاريخ الاستلام</span> :<br/><br/>";
    template += "&nbsp;";
    template += "&nbsp;";
    // template += "_________________________________ </td><#if record.custbody_subsidiary_legal_name?has_content><td style=\"width:336px;font-weight:bold;\" align=\"right\">For ${record.custbody_subsidiary_legal_name} / <span class=\"arabicfont\" dir=\"rtl\">لشركة الفارس السعودية الدولية</span></td><#else><td style=\"width:336px;font-weight:bold;\" align=\"right\">For ${record.subsidiary.legalname} / <span class=\"arabicfont\" dir=\"rtl\">لشركة الفارس السعودية الدولية</span></td></#if> ";
    if (sub_id == 11 || sub_id == 12) { //For Faris Al Arab Transport Company   <#else> <td style=\"width:336px;font-weight:bold;\" align=\"right\">For ${record.subsidiary.legalname} / <span class=\"arabicfont\" dir=\"rtl\">لشركة الفارس السعودية الدولية</span></td>

        template += "_________________________________ </td><#if record.subsidiary.legalname?has_content> <td style=\"width:336px;font-weight:bold;\" align=\"right\">For ${record.subsidiary.legalname} / <br/> <span class=\"arabicfont\" dir=\"rtl\"> ${record.subsidiary.custrecord_arabic_legalname} </span></td></#if> ";

    } else if (sub_id == 8 && location != 8) {

        template += "_________________________________ </td><#if record.subsidiary.legalname?has_content> <td style=\"width:336px;font-weight:bold;\" align=\"right\">For ${record.subsidiary.legalname} / <br/> <span class=\"arabicfont\" dir=\"rtl\">${record.subsidiary.custrecord_arabic_legalname} </span></td></#if> ";

    } else if (sub_id == 8 && location == 8) {

        template += "_________________________________ </td><td style=\"width:336px;font-weight:bold;\" align=\"right\">For Faris Al Arab Contracting Company / <br/> <span class=\"arabicfont\" dir=\"rtl\">لشركة فارس العرب اللمقاولات</span></td> ";

    } else if (sub_id == 16 && location != 21) {
        template += "_________________________________ </td><#if record.subsidiary.legalname?has_content> <td style=\"width:336px;font-weight:bold;\" align=\"right\">For ${record.subsidiary.legalname} / <br/> <span class=\"arabicfont\" dir=\"rtl\">${record.subsidiary.custrecord_arabic_legalname} </span></td></#if> ";

    } else if (sub_id == 16 && location == 21) {
        template += "_________________________________ </td><td style=\"width:336px;font-weight:bold;\" align=\"right\">For Faris Al Arab Contracting Company / <br/> <span class=\"arabicfont\" dir=\"rtl\">لشركة فارس العرب اللمقاولات</span></td> ";

    } else {

        template += "_________________________________ </td><#if record.custbody_subsidiary_legal_name?has_content> <td style=\"width:336px;font-weight:bold;\" align=\"right\">For ${record.custbody_subsidiary_legal_name} / <br/> <span class=\"arabicfont\" dir=\"rtl\">لشركة الفارس السعودية الدولية</span></td><#else> <td style=\"width:336px;font-weight:bold;\" align=\"right\">For ${record.subsidiary.legalname} / <span class=\"arabicfont\" dir=\"rtl\">لشركة الفارس السعودية الدولية</span></td></#if> ";

    }
    template += " </tr> ";
    template += "  </table> ";
    template += "  <table style=\"width:100%;top:50px;\"> ";
    template += "    <tr><td colspan=\"4\" style=\"font-size:10px;\"><span style=\"font-weight:bold;text-decoration:underline;\">Note #</span><i>&nbsp;";
    template += "Please ensure full name of company is printed on payment cheques as per invoice.</i><br /><br /></td><td><br/><br/>____________<br/>Prepared by / <span class=\"arabicfont\" dir=\"rtl\">ُعدت بواسطة</span></td><td><br/><br/>____________<br/>Checked by / <span class=\"arabicfont\" dir=\"rtl\">تم التحقق بواسطة</span></td><td><br/><br/>____________<br/>Approved by / <span class=\"arabicfont\" dir=\"rtl\">تم الموافقة عليه بواسطة</span></td></tr> ";
    template += "  </table> ";
    template += "</body> ";
    template += "</pdf>";

    var errorMess = "";
    errorMess += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> " +
        "<pdf> " +
        "   <head> " +
        "      <#if .locale == \"ru_RU\"> " +
        "      <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> " +
        "      </#if> ";
    errorMess += "  </head> ";
    errorMess += "  <body> ";
    errorMess += "  <H1>  Invocie amount is not matching, print cannot be generated.  </H1> ";
    errorMess += "  </body> ";
    errorMess += "</pdf>";
    var total = invoice.getFieldValue("total");

    totalgrossamt = Number(totalgrossamt).toFixed(2);
    total = Number(total).toFixed(2);
    // var totalgrossamt = 0;
    nlapiLogExecution("DEBUG", "totalgrossamt1111", totalgrossamt);
    nlapiLogExecution("DEBUG", "total1111", total);

    if (Number(totalgrossamt) == Number(total)) {
        nlapiLogExecution("DEBUG", "Successs");

        renderer.setTemplate(template);
    } else {
        nlapiLogExecution("DEBUG", "fail");
        renderer.setTemplate(errorMess);
    }
    var userID = nlapiGetContext();
    userID = userID['user'];
    if (userID == 24 || userID == 13 || userID == 47) {
        renderer.setTemplate(template);
    }
    renderer.setTemplate(template);
    renderer.addRecord('record', invoice);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'Invoice_lh' + invoice.getFieldValue("id") + '.pdf', 'inline');
    response.write(file.getValue());
}

function persentage(string) {
    string = string.replace(/%/g, "");
    return string;
}

function Contract(string) {
    string = string.replace(/Quotation #/g, "");
    return string;
}

function descNextLine(string) {
    string = string.replace(/\n/g, "<br/>");
    return string;
}

function removeNull(string) {
    if (string == null) {
        string = "";
    } else {
        string = string;
    }
    return string;
}

function replaceAndOper(charVal) {
    return charVal.replace(/&/g, "&amp;");
}


function numberWithCommas(x) {

    var parts = x.toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");

}