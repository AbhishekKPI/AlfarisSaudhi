function printInvoiceAction(request, response) {
    var recordID = request.getParameter("recordID");
 // nlapiLogExecution('DEBUG', 'record Id', 'recordID = ' + recordID);
    var invoice = nlapiLoadRecord("invoice", recordID);
    var renderer = nlapiCreateTemplateRenderer();
    var template = "";
    template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> " +
        "<pdf> " +
        "   <head> " +
        "      <#if .locale == \"ru_RU\"> " +
        "      <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> " +
        "      </#if> " +
        "      <macrolist> ";
    template += "        <macro id=\"nlheader\"> ";
    var headerlogo = invoice.getFieldValue("custbody_subsidiary_log");
    var footerlogotop = invoice.getFieldValue("custbody_subsidiary_top_foot");
    var footerlogobottom = invoice.getFieldValue("custbody_subsidiary_footer_bottom");
    var subsidiary = invoice.getFieldValue("subsidiary");

    if (headerlogo) {
        template += "<img class=\"header\" style=\"width:58%;height:40%;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" height=\"40\%\" width=\"58\%\"  src = \"";
        var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
        template += nlapiEscapeXML(path);
        template += "\"></img>";
        template += "<p align=\"right\" style=\"top:15px;\"><b>TRN : ${record.custbody_subsidiary_trn}</b></p>";

    }
    template += "            <#if record.subsidiary.custrecord_is_energy?string == 'Yes'> " +
        "              <table style=\"width::100%;font-size:14px;border:solid 1px #ccc;font-size:11px;margin-top:40px;\"> " +
        "               <#if record.custbody_is_export_invoice?string == \"Yes\"> " +
        "               <tr> " +
        "                  <td style=\"border-bottom:solid 1px color:#000000;font-weight:bold;font-size:11px;\" colspan=\"2\" align=\"center\">INVOICE</td> " +
        "               </tr> " +
        "               <#else> " +
        "               <tr> " +
        "                  <td style=\"border-bottom:solid 1px color:#000000;font-weight:bold;font-size:11px;\" colspan=\"2\" align=\"center\">TAX INVOICE</td> " +
        "               </tr> " +
        "               </#if> " +
        "               <tr> " +
        "                  <td style=\"width:350px;font-weight:bold;font-size:11px;\" align=\"left\">INVOICE NO: ${record.tranid}</td> " +
        "                  <td style=\"width:336px;font-weight:bold;font-size:11px;\" align=\"right\">INVOICE DATE : ${record.trandate?string[\"d-MMM-yyyy\"]}</td> " +
        "               </tr> " +
        "            </table> " +
        "            <table style=\"width:100%;margin-top:10px;font-size:11px;\"> " +
        "               <tr> " +
        "                  <td style=\"border-left:solid 1px #ccc;border-top:solid 1px #ccc;border-bottom:solid 1px #ccc;font-size:11px;\"> " +
        "                     <table> " +
        "                        <tr> " +
        "                           <#if record.entity.isperson?string == 'T'> " +
        "                           <td><b>${record.entity.altname}</b></td> " +
        "                           <#else> " +
        "                           <td><b>${record.entity.companyname}</b></td> " +
        "                           </#if> " +
        "                        </tr> " +
        "                        <#if record.billaddress?has_content><tr> " +
        "                           <td>${record.entity.address}</td> " +
        "                        </tr> " +
        "                          <#else><tr> " +
        "                           <td>${record.entity.address}</td> " +
        "                        </tr> " +
        "                          </#if> " +
        "                        <tr> " +
        "                           <td><b>TRN : </b> ${record.entity.vatregnumber}</td> " +
        "                        </tr> " +
        "                        <tr> " +
        "                           <td><b>Tel #</b> ${record.entity.phone}</td> " +
        "                        </tr> " +
        "                        <tr> " +
        "                           <td><b>Fax #</b> ${record.entity.fax}</td> " +
        "                        </tr> " +
        "                          <#if record.custbody_customer_email_id?has_content> " +
        "                            <tr> " +
        "                           <td><b>Email</b> ${record.custbody_customer_email_id}</td> " +
        "                        </tr> " +
        "                            </#if> " +
        "                        <tr> " +
        "                           <td><b>Attn : </b> ${record.custbody_attention}</td> " +
        "                        </tr> " +
        "                     </table> " +
        "                  </td> " +
        "                  <td style=\"border-left:solid 1px #ccc;border-top:solid 1px #ccc;border-bottom:solid 1px #ccc;font-size:11px;\"> " +
        "                     <table> " +
        "                        " +
        "                        <#if record.subsidiary.custrecord_is_energy?string == 'Yes'> " +
        "                        <tr> " +
        "                           <td><b>Contract:</b> ${record.custbody_rent_sales_order}</td> " +
        "                        </tr> " +
        "                        <#else> " +
        "                        <#if record.subsidiary.internalid?string == '9'> " +
        "                        <tr> " +
        "                           <td><b>Contract:</b> ${record.custbody_rent_sales_order.createdfrom}</td> " +
        "                        </tr> " +
        "                        <#else> " +
        "                        <tr> " +
        "                           <td><b>Contract:</b> $record.custbody_rent_sales_order.createdfrom}</td> " +
        "                        </tr> " +
        "                        </#if> " +
        "                        </#if> " +
        "                        <tr> " +
        "                           <td><b>LPO No:</b> ${record.otherrefnum}</td> " +
        "                        </tr> " +
        "                        <tr> " +
        "                           <td><b>Pay" +
        "Terms:</b>  ${record.terms}</td> " +
        "                        </tr> " +
        "                        <#if record.duedate?string == \"\"> " +
        "                        <tr> " +
        "                           <td><b>Pay Due:</b> ${record.duedate}</td> " +
        "                        </tr> " +
        "                        <#else> " +
        "                        <tr> " +
        "                           <td><b>Pay Due:</b> ${record.duedate?string[\"d-MMM-yyyy\"]}</td> " +
        "                        </tr> " +
        "                        </#if> " +
        "                        <tr> " +
        "                           <td><b>Sales Rep:</b> ${record.salesrep.firstname} ${record.salesrep.lastname}</td> " +
        "                        </tr> " +
        "                        <tr> " +
        "                           <td><b>" +
        "Site:</b> ${record.custbody_site}</td> " +
        "                        </tr> " +
        "                     </table> " +
        "                  </td> " +
        "                  <td style=\"border-left:solid 1px #ccc;border-top:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;width:258px;font-size:11px;\"> " +
        "                     <#if record.custbodycustbody_bank_details?has_content><span>${record.custbodycustbody_bank_details}</span><#else><span>${record.subsidiary.custrecord_bank_address_details}</span></#if> " +
        "                     <br/> " +
        "                     <b style=\"font-size:10px;\">All bank transfer charges to be borne by customer</b> " +
        "                  </td> " +
        "               </tr> " +
        "               <tr> " +
        "                  <td colspan=\"3\" style=\"border-bottom:solid 1px #ccc;border-left:solid 1px #ccc;border-right:solid 1px #ccc;font-size:11px;\"><b>Scope of work : </b> ${record.custbody_scope_of_work}</td> " +
        "               </tr> " +
        "            </table> " +
        "                    <#else> " +
        "                      <table style=\"width::100%;font-size:14px;border:solid 1px #ccc;margin-top:40px;\"> " +
        "               <#if record.custbody_is_export_invoice?string == \"Yes\"> " +
        "               <tr> " +
        "                  <td style=\"border-bottom:solid 1px color:#000000;font-weight:bold;\" colspan=\"2\" align=\"center\">INVOICE</td> " +
        "               </tr> " +
        "               <#else> " +
        "               <tr> " +
        "                  <td style=\"border-bottom:solid 1px color:#000000;font-weight:bold;\" colspan=\"2\" align=\"center\">TAX INVOICE</td> " +
        "               </tr> " +
        "               </#if> " +
        "               <tr> " +
        "                  <td style=\"width:350px;font-weight:bold;\" align=\"left\">INVOICE NO : ${record.tranid}</td> " +
        "                  <td style=\"width:336px;font-weight:bold;\" align=\"right\">INVOICE DATE : ${record.trandate?string[\"d-MMM-yyyy\"]}</td> " +
        "               </tr> " +
        "            </table> " +
        "            <table style=\"width:100%;margin-top:10px;\"> " +
        "               <tr> " +
        "                  <td style=\"border-left:solid 1px #ccc;border-top:solid 1px #ccc;border-bottom:solid 1px #ccc;\"> " +
        "                     <table> " +
        "                        <tr> " +
        "                           <#if record.entity.isperson?string == 'T'> " +
        "                           <td><b>${record.entity.altname}</b></td> " +
        "                           <#else> " +
        "                           <td><b>${record.entity.companyname}</b></td> " +
        "                           </#if> " +
        "                        </tr> " +
        "                         <tr> " +
        "                           <td>${record.billaddress?remove_beginning('Madiha Arif')}</td> " +
        "                        </tr> " +

        "                        <tr> " +
        "                           <td><b>TRN : </b> ${record.entity.vatregnumber}</td> " +
        "                        </tr> " +
        "                        <tr> " +
        "                           <td><b>Tel #</b> ${record.entity.phone}</td> " +
        "                        </tr> " +
        "                        <tr> " +
        "                           <td><b>Fax #</b> ${record.entity.fax}</td> " +
        "                        </tr> " +
        "                          <#if record.entity.internalid?string == '21410'||record.entity.internalid?string == '16102'||record.entity.internalid?string == '16103'||record.entity.internalid?string == '15961' || record.entity.internalid?string == '38152'> " +
        "                            <tr> " +
        "                           <td><b>Email : </b>purchase@dbb.ae</td> " +
        "                        </tr> " +
        "                            </#if> " +
        "                        <tr> " +
        "                           <td><b>Attn : </b> ${record.custbody_attention}</td> " +
        "                        </tr> " +
        "                     </table> " +
        "                  </td> " +
        "                  <td style=\"border-left:solid 1px #ccc;border-top:solid 1px #ccc;border-bottom:solid 1px #ccc;\"> " +
        "                     <table><tr> ";
    var quoteNo = "";
    var quoteNo = invoice.getFieldValue("custbody_client_quotation_ref");
    if (quoteNo == "" || quoteNo == null) {
        var quote = invoice.getFieldValue("createdfrom");
        if (quote == "" || quote == null) {
            var quote = invoice.getFieldValue("custbody_rent_sales_order");

        }
        if (quote) {
            var SO = nlapiLoadRecord("salesorder", quote);

            quoteNo = SO.getFieldText("createdfrom");
            // nlapiLogExecution("DEBUG", "quoteNo", quoteNo);
        }
    }
    template += "                           <td><b>Contract:</b> " + Contract(replaceAndOper(removeNull(quoteNo))) + "</td> " +
        "                        </tr> " +
        "                        <tr> " +
        "                           <td><b>LPO No:</b> ${record.otherrefnum}</td> " +
        "                        </tr> " +
        "                        <tr> " +
        "                           <td><b>Pay";
    var PaymentTrems = invoice.getFieldText("terms");

    template += "Terms:</b>  " + removeNull(PaymentTrems) + "</td> " +
        "                        </tr> " +
        "                        <#if record.duedate?string == \"\"> " +
        "                        <tr> " +
        "                           <td><b>Pay Due:</b> ${record.duedate}</td> " +
        "                        </tr> " +
        "                        <#else> " +
        "                        <tr> " +
        "                           <td><b>Pay Due:</b> ${record.duedate?string[\"d-MMM-yyyy\"]}</td> " +
        "                        </tr> " +
        "                        </#if> " +
        "                        <tr> " +
        "                           <td><b>Sales Rep:</b> ${record.salesrep.firstname} ${record.salesrep.lastname}</td> " +
        "                        </tr> " +
        "                        <tr> " +
        "                           <td><b>" +
        "Site:</b> ${record.custbody_site}</td> " +
        "                        </tr> "

    +
    "                     </table> " +
    "                  </td> " +
    "                  <td style=\"border-left:solid 1px #ccc;border-top:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;width:258px;\"> " +
    "                     <#if record.custbodycustbody_bank_details?has_content><span>${record.custbodycustbody_bank_details}</span><#else><span>${record.subsidiary.custrecord_bank_address_details}</span></#if> " +
    "                     <br/> " +
    "                     <b style=\"font-size:10px;\">All bank transfer charges to be borne by customer</b> " +
    "                  </td> " +
    "               </tr> " +
    "               <tr> " +
    "                  <td colspan=\"3\" style=\"border-bottom:solid 1px #ccc;border-left:solid 1px #ccc;border-right:solid 1px #ccc;\"><b>Scope of work : </b> ${record.custbody_scope_of_work}</td> " +
    "               </tr> " +
    "            </table> " +
    "              </#if> " +
    "         </macro> ";
    template += "<macro id=\"nlfooter\">";
    if (footerlogobottom) {
        template += "<img class=\"footer\" style=\"width:96%; height:100%;top:95px;margin-left:-50px;\" height=\"100\%\" width=\"96\%\"  src = \"";
        var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
        template += nlapiEscapeXML(path);
        template += "\"></img>";
    }
    if (footerlogotop) {
        if (subsidiary != 14) {

            template += "<p style=\"font-size: 8pt;top:-10px;width: 75%;font-style:italic;\" align=\"left\">A.Any discrepancies must be notified to Accounts Department within 07 days from receipt of this invoice.<br/>B.Invoices should be settled as per approved credit terms. In case of delay, a surcharge of 1% per month,<br/> on overdue amount will be levied extra.</p>";
        } else {
            /*template += "<p style=\"font-size: 8pt;top:-10px;width: 75%\" align=\"left\">TRN : ${record.custbody_subsidiary_trn}<br/>${record.subsidiary}/" + Contract(removeNull(quoteNo)) + "<#if record.entity.isperson?string == 'T'>${record.entity.altname}<#else>${record.entity.companyname}</#if></p>";*/
               template += " <table style =\"align:left;font-style:italics;font-size:8px\">";
    template += " <tr><td>A.&nbsp;Any discrepancies must be notified to Accounts Department within 07 days from receipt of this invoice.</td></tr>";
    template += " <tr><td>B.&nbsp;Invoices should be settled as per approved credit terms.In case of delay a surcharge of 1% per month ,on overdue amount will be levied extra.</td></tr>";
    template += " </table>";
        }

        template += "<p align=\"right\" style=\"top:-85px;font-size: 8pt;\">(Page <pagenumber/> of <totalpages/>)</p>";
        template += "<img class=\"footer\" style=\"top:-80px;left:510px;margin-right:-40px;width:85%; height:100%;\" height=\"100\%\" width=\"88\%\"  src = \"";
        var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogotop).getURL();
        template += nlapiEscapeXML(path);
        template += "\"></img>";
    }
    template += "      </macro> " +
        "      </macrolist> " +
        "      <style type=\"text/css\">table {  " +
        "         font-family: sans-serif; " +
        "         font-size: 10pt; " +
        "         table-layout: fixed; " +
        "         } " +
        "         th {  " +
        "         font-weight: bold; " +
        "         font-size: 9pt; " +
        "         vertical-align: middle; " +
        "         padding: 5px 6px 3px; " +
        "         background-color: #e3e3e3; " +
        "         color: #333333; " +
        "         } " +
        "         td p { align:left; " +
        "         } " +
        "         b {  " +
        "         font-weight: bold; " +
        "         color: #333333; " +
        "         } " +
        "         table.header td {  " +
        "         padding: 0; " +
        "         font-size: 10pt; " +
        "         } " +
        "         table.footer td {  " +
        "         padding: 0; " +
        "         font-size: 9pt; " +
        "         } " +
        "         table.itemtable {  " +
        "         border: 1px solid #000000; " +
        "         } " +
        "         table.itemtable th {  " +
        "         padding-bottom: 10px; " +
        "         padding-top: 10px; " +
        "         } " +
        "         table.body td {  " +
        "         padding-top: 2px; " +
        "         } " +
        "         table.total {  " +
        "         page-break-inside: avoid; " +
        "         } " +
        "         tr.totalrow {  " +
        "         background-color: #e3e3e3; " +
        "         line-height: 200%; " +
        "         } " +
        "         td.totalboxtop {  " +
        "         font-size: 13pt; " +
        "         background-color: #e3e3e3; " +
        "         } " +
        "         td.addressheader {  " +
        "         font-size: 9pt; " +
        "         padding-top: 6px; " +
        "         padding-bottom: 2px; " +
        "         } " +
        "         td.address {  " +
        "         padding-top: 0; " +
        "         } " +
        "         td.totalboxmid {  " +
        "         font-size: 29pt; " +
        "         padding-top: 20px; " +
        "         background-color: #e3e3e3; " +
        "         } " +
        "         td.totalboxbot {  " +
        "         background-color: #e3e3e3; " +
        "         font-weight: bold; " +
        "         } " +
        "         span.title {  " +
        "         font-size: 29pt; " +
        "         } " +
        "         span.number {  " +
        "         font-size: 17pt; " +
        "         } " +
        "         span.itemname {  " +
        "         font-weight: bold; " +
        "         line-height: 150%; " +
        "         } " +
        "         hr {  " +
        "         width: 100%; " +
        "         color: #d3d3d3; " +
        "         background-color: #d3d3d3; " +
        "         height: 1px; " +
        "         } " +
        "      </style> " +
        "   </head> " +
        "   <#assign name=record.entity.altname?length> " +
        "   <#assign atn=record.custbody_attention?length> " +
        "   <#assign scope=record.custbody_scope_of_work?length> " +
        "   <#assign lin=0 mar=0 addressee=record.entity.addressbook.addressee?length> " +
        "   <#assign attention=record.entity.addressbook.attention?length> " +


        "          <#if (record.entity.altname?length > 65 || record.custbody_attention?length > 59 || record.custbody_scope_of_work?length > 69 || record.entity.address?length >120) > " +
        "    <body style=\"font-family:sans-serif;\" header=\"nlheader\" footer-height=\"9%\" header-height=\"43%\" footer=\"nlfooter\" size=\"A4\"> " +
        "       <#elseif (record.entity.altname?length > 59 || record.custbody_attention?length > 59 || record.custbody_scope_of_work?length > 69 || record.entity.address?length >130) > " +
        "    <body style=\"font-family:sans-serif;\" header=\"nlheader\" footer-height=\"9%\" header-height=\"42%\" footer=\"nlfooter\" size=\"A4\"> " +
        "      <#elseif (record.entity.altname?length > 59 || record.custbody_attention?length > 59 || record.custbody_scope_of_work?length > 69 || record.entity.address?length >140) > " +
        "    <body style=\"font-family:sans-serif;\" header=\"nlheader\" footer-height=\"9%\" header-height=\"42%\" footer=\"nlfooter\" size=\"A4\"> " +
        "      <#elseif (record.entity.altname?length > 59 || record.custbody_attention?length > 59 || record.custbody_scope_of_work?length > 69 || record.entity.address?length >150) > " +
        "    <body style=\"font-family:sans-serif;\" header=\"nlheader\" footer-height=\"9%\" header-height=\"43%\" footer=\"nlfooter\" size=\"A4\"> " +
        "      <#elseif (record.entity.altname?length < 40 || record.custbody_attention?length < 40 ||  record.entity.address?length < 100 || record.custbody_scope_of_work?length < 70) > " +
        "    <body style=\"font-family:sans-serif;\" header=\"nlheader\" footer-height=\"9%\" header-height=\"42%\" footer=\"nlfooter\" size=\"A4\"> " +
        "      <#elseif (record.entity.altname?length lt 59 || record.custbody_attention?length lt 59 || record.custbody_scope_of_work?length > 69 || record.entity.address?length >150) > " +
        "    <body style=\"font-family:sans-serif;\" header=\"nlheader\" footer-height=\"9%\" header-height=\"42%\" footer=\"nlfooter\" size=\"A4\"> " +
        "      <#else><body style=\"font-family:sans-serif;\" header=\"nlheader\" footer-height=\"9%\" header-height=\"33%\" footer=\"nlfooter\" size=\"A4\"> " +
        "      </#if> ";
    var createdfromRef = invoice.getFieldValue("createdfrom");
    var salesOrderRef = invoice.getFieldValue("custbody_rent_sales_order");
    //--- Allow - lump Sum---//
    if ("T" == invoice.getFieldValue("custbody_allow_lump_sum")) {

        template += "      <table class=\"itemtable\" style=\"font-size:10px;width: 100%;\"> "
        var lineCount = invoice.getLineItemCount('item');
        nlapiLogExecution("DEBUG","line count value is", lineCount);
        var totalRate = 0;
        var totalTax = 0;
        var totalAmount = 0;
        var totalGrossamt = 0;
        var totaltaxrate1 = 0;
        var finalAmount = 0;
        var finalTax1Amount = 0;
        var finalGrossAmount = 0;
        var finaltaxrate1 = 0;
        var j = 0;
        var count = 0;
        var robd_timesheet = invoice.getFieldText("custbody_invoice_timesheet_ref");
        var fromDate = invoice.getFieldValue("custbody_invoice_ts_from_date");
        var toDate = invoice.getFieldValue("custbody_invoice_ts_to_date");
        if (lineCount > 0) {
            nlapiLogExecution("DEBUG","line count", lineCount);
            for (var i = 1; i <= lineCount; i++) {
                var groupType = invoice.getLineItemValue('item', 'itemtype', i);
                var unitPrice = invoice.getLineItemValue('item', 'rate', i);
                var amount = invoice.getLineItemValue('item', 'amount', i);
                var tax1amt = invoice.getLineItemValue('item', 'tax1amt', i);
                var item_type = invoice.getLineItemValue('item', 'custcol_rent_item_type', i);

                var grossamt = invoice.getLineItemValue('item', 'grossamt', i);
                var exclInPrint = "";
                exclInPrint = invoice.getLineItemValue('item', 'custcol_exclude_in_print', i);
                var exclInPrintamount = invoice.getLineItemValue('item', 'amount', i);

                if (exclInPrintamount > 0 || exclInPrint != "T") {
                    if (groupType == "Description") {
                        count++;
                        if (count == 2) {
                            var nextitem = 1;
                        }
                    }
                    if (groupType != "Description" && count == 1 && item_type != "7") {
                        totalRate = +totalRate + +unitPrice;
                        totalTax = +totalTax + +tax1amt;
                        totalAmount = +totalAmount + +amount;
                        totalGrossamt = +totalGrossamt + +grossamt;

                        var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);

                    }
                    if (i == 1) {
                        template += "<thead> " +
                            "            <tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\"> " +
                            "               <td align=\"center\" colspan=\"4\" style=\"border-bottom:solid 1px #000000;font-weight:bold;\">TS Date</td> " +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">TS No.</td> " +
                            "               <td align=\"center\" colspan=\"6\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Equipment</td> " +
                            "               <td align=\"center\" colspan=\"6\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Description</td> " +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Rental Unit</td> " +
                            "               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Unit Price</td> " +
                            "               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total excl. of Tax (${record.currency})</td> " +
                            "               <td align=\"center\" colspan=\"2\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax %</td> " +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax<br/>(${record.currency})</td> " +
                            "               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total with Tax (${record.currency})</td> " +
                            "            </tr> " +
                            "         </thead> ";
                    }

                    //nlapiLogExecution("DEBUG","totalAmount",totalAmount);
					nlapiLogExecution("DEBUG","i",i);
                    nlapiLogExecution("DEBUG","lineCount",lineCount);
                  
                    if (nextitem == 1 || (i == lineCount && item_type != "7")) {
                             nlapiLogExecution("DEBUG","totalAmount",totalAmount);
                        template += "<tr>";
                        template += "<td colspan=\"4\" style=\"text-align:center;\">" + removeNull(fromDate) + "<br/>&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;";
                        if (toDate) {
                            template += "To<br/>" + removeNull(toDate);
                        }
                        template += " </td>";
                        template += "             <td colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + replaceTSand21(removeNull(robd_timesheet)) + "</td> ";
                        template += "            <td colspan=\"6\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">" + replaceAndOper(removeNull(Equipment)) + "</td> " +
                            "            <td colspan=\"6\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(iteamName))) + "</td> " +
                            "            <td colspan=\"3\" style=\"border-left:solid 1px #000000;\">LUMP SUM</td> ";

                        if(totalAmount>0){
                            template += "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalAmount.toFixed(2)) + "</td> " +
                            "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalAmount.toFixed(2)) + "</td> " +
                            "            <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\">" + persentage(removeNull(taxrate1)) + "</td> " +
                            "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(totalTax.toFixed(2))) + "</td> " +
                            "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalGrossamt.toFixed(2)) + "</td> ";
                        }else{
                            template += "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"></td> " +
                            "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"></td> " +
                            "            <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\"></td> " +
                            "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"></td> " +
                            "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"></td> ";
                        }
                        template += "  </tr> ";

                        finalAmount = +finalAmount + +totalAmount;
                        finalTax1Amount = +finalTax1Amount + +totalTax;
                        finalGrossAmount = +finalGrossAmount + +totalGrossamt;

                        totalRate = 0;
                        totalTax = 0;
                        totalAmount = 0;
                        totalGrossamt = 0;
                        totaltaxrate1 = 0;
                        count--;
                        j++;
                        nextitem = 0;
                    }
                    if (item_type == "7" ) {
                        var totalRate = invoice.getLineItemValue('item', 'rate', i);
                        var totalAmount = invoice.getLineItemValue('item', 'amount', i);
                        var totalTax = invoice.getLineItemValue('item', 'tax1amt', i);
                        var totalGrossamt = invoice.getLineItemValue('item', 'grossamt', i);
                        var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
                        var Equipment = invoice.getLineItemValue('item', 'item_display', i);
                        var iteamName = invoice.getLineItemValue('item', 'description', i);

                            template += "<tr>";
                            template += "<td colspan=\"4\" style=\"text-align:center;\">&nbsp;</td>";
                            template += "             <td colspan=\"3\" style=\"border-left:solid 1px #000000;\"></td> ";
                            template += "            <td colspan=\"6\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\"></td> " +
                                "            <td colspan=\"6\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(iteamName))) + "</td> " +
                                "            <td colspan=\"3\" style=\"border-left:solid 1px #000000;\">LUMP SUM</td> ";
                            if(totalAmount>0){
                                template += "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalAmount) + "</td> " +
                                "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalAmount) + "</td> " +
                                "            <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\">" + persentage(taxrate1) + "</td> " +
                                "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(totalTax)) + "</td> " +
                                "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalGrossamt) + "</td> ";
                            }else{
                                template += "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"></td> " +
                                "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"></td> " +
                                "            <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\"></td> " +
                                "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"></td> " +
                                "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"></td> ";
                            }
                            template += "  </tr> ";

                            finalAmount = +finalAmount + +totalAmount;
                            finalTax1Amount = +finalTax1Amount + +totalTax;
                            finalGrossAmount = +finalGrossAmount + +totalGrossamt;

                            totalRate = 0;
                            totalTax = 0;
                            totalAmount = 0;
                            totalGrossamt = 0;
                            totaltaxrate1 = 0;
                            // count--;
                            j++;
                            nextitem = 0;
                    }
                    //---------//
                    var item_type1 = 0;
                    try {
                        var item_type1 = invoice.getLineItemValue('item', 'custcol_rent_item_type', i + 1);
                    } catch (e) {
                        var item_type1 = 0;
                    }
                    if (totalRate && item_type1 == "7") {
                        template += "<tr>";
                        template += "<td colspan=\"4\" style=\"text-align:center;\">" + removeNull(fromDate) + "<br/>&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;";
                        if (toDate) {
                            template += "To<br/>" + removeNull(toDate);
                        }
                        template += " </td>";
                        template += "             <td colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + replaceTSand21(removeNull(robd_timesheet)) + "</td> ";
                        template += "            <td colspan=\"6\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">" + replaceAndOper(removeNull(Equipment)) + "</td> " +
                            "            <td colspan=\"6\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(iteamName))) + "</td> " +
                            "            <td colspan=\"3\" style=\"border-left:solid 1px #000000;\">LUMP SUM</td> ";
                        if(totalAmount>0){
                            template += "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalAmount.toFixed(2)) + "</td> " +
                            "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalAmount.toFixed(2)) + "</td> " +
                            "            <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\">" + persentage(removeNull(taxrate1)) + "</td> " +
                            "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(totalTax.toFixed(2))) + "</td> " +
                            "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(totalGrossamt.toFixed(2)) + "</td> ";
                        }else{
                            template += "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"></td> " +
                            "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"></td> " +
                            "            <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\"></td> " +
                            "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"></td> " +
                            "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"></td> ";
                        }
                        template += "  </tr> ";

                        finalAmount = +finalAmount + +totalAmount;
                        finalTax1Amount = +finalTax1Amount + +totalTax;
                        finalGrossAmount = +finalGrossAmount + +totalGrossamt;
                        // finaltaxrate1 = +finaltaxrate1 + +totaltaxrate1;

                        totalRate = 0;
                        totalTax = 0;
                        totalAmount = 0;
                        totalGrossamt = 0;
                        totaltaxrate1 = 0;
                        count--;
                        j++;
                        nextitem = 0;
                    }
                    if (groupType == "Description") {
                        var Equipment = invoice.getLineItemValue('item', 'custcollumpsum_equipment', i);
                        var iteamName = invoice.getLineItemValue('item', 'description', i);
                        var robd_timesheet = invoice.getLineItemText('item', 'custcol_timesheet_ref', i);
                        var robd_timesheet_id = invoice.getLineItemValue('item', 'custcol_timesheet_ref', i);
                        if (robd_timesheet_id) {
                            // var fromDate = nlapiLookupField("customrecord_rent_timesheet", robd_timesheet_id, "custrecord_rent_time_from_date", false);
                            // var toDate = nlapiLookupField("customrecord_rent_timesheet", robd_timesheet_id, "custrecord_rent_time_to_date", false);
                           
                            var fromDate = invoice.getLineItemValue('item','custcol_from_date_time_sheet',i);
                            var toDate = invoice.getLineItemValue('item','custcol_to_date_timesheet',i);

                        }

                    }
                }

            }
            template += "         <tr style=\"border-top:solid 1px #000000;\"> " +
                "            <td align=\"left\" colspan=\"26\"><b>Total Value in ${record.currency}</b></td> " +
                "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"><b>" + numberWithCommas(finalAmount.toFixed(2)) + "</b></td> " +
                "            <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\">&nbsp;" +
                "</td> " +
                "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"><b>" + numberWithCommas(finalTax1Amount.toFixed(2)) + "</b></td> " +
                "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"><b>" + numberWithCommas(finalGrossAmount.toFixed(2)) + "</b></td> " +
                "         </tr> "

            +
            "         <tr> " +
            "            <td align=\"left\" colspan=\"35\" style=\"padding:5px;border-top:solid 1px #000000;\"><b>Amount in" +
            "words: </b><i>${record.currency}&nbsp; ${record.custbody_kpib_total_in_words?capitalize}</i></td> " +
            "            <td align=\"right\" colspan=\"4\" style=\"padding:border-left:solid 1px #000000;border-top:solid 1px #000000;\"><b>" + numberWithCommas(finalGrossAmount.toFixed(2)) + "</b></td> " +
                "         </tr> "

        }

        template += "</table><hr/>";
    } else if ("T" == invoice.getFieldValue("custbody_combined_project")) { //---Combined Project---//
        template += "      <table class=\"itemtable\" style=\"width: 100%;font-size:10px;margin-top:-50px;\"> "
        var lineCount = invoice.getLineItemCount('item');
        var totalRate = 0;
        var totalTax = 0;
        var totalAmount = 0;
        var totalGrossamt = 0;
        var finalAmount = 0;
        var finalTax1Amount = 0;
        var finalGrossAmount = 0;
        var j = 0;
        var count = 0;
        if (lineCount > 0) {
            for (var i = 1; i <= lineCount; i++) {
                var groupType = invoice.getLineItemValue('item', 'itemtype', i);
                var itemInGroup = invoice.getLineItemValue('item', 'ingroup', i);
                var itemType = invoice.getLineItemValue('item', 'custcol_rent_item_type', i);
                var unitPrice = invoice.getLineItemValue('item', 'custcol_agreed_rate', i);
                var amount = invoice.getLineItemValue('item', 'amount', i);
                var tax1amt = invoice.getLineItemValue('item', 'tax1amt', i);

                var grossamt = invoice.getLineItemValue('item', 'grossamt', i);
                var Individual = invoice.getLineItemValue('item', 'custcol_is_individual_item', i);

                var exclInPrint = "";
                exclInPrint = invoice.getLineItemValue('item', 'custcol_exclude_in_print', i);
                var exclInPrintamount = invoice.getLineItemValue('item', 'amount', i);

                if (exclInPrintamount > 0 || exclInPrint != "T") {

                    if (groupType == "Description") {
                        count++;
                        if (count == 2) {
                            var nextitem = 1;
                        }
                    }
                    if (count == 1 && Individual == "T") {
                        totalRate = Number(totalRate).toFixed(2);
                        totalAmount = Number(totalAmount).toFixed(2);
                        totalTax = Number(totalTax).toFixed(2);
                        totalGrossamt = Number(totalGrossamt).toFixed(2);
                        template += "<tr>";

                        template += "<td colspan=\"3\"  style=\"text-align:center;\">" + removeNull(fromDate) + "<br/>&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;";
                        if (toDate) {
                            template += "To<br/>" + removeNull(toDate);
                        }
                        template += "</td>" +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + replaceTSand21(removeNull(robd_timesheet)) + "</td> " +
                            "               <td align=\"left\" colspan=\"6\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(removeNull(Equipment)) + "</td> " +
                            "               <td align=\"left\" colspan=\"6\" style=\"border-left:solid 1px #000000;\"><!-- Description -->" + replaceAndOper(descNextLine(removeNull(iteamName))) + "</td> " +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"><!-- Qty / Unit -->" + removeNull(no_of_hdwm) + "&nbsp;" + rental_unit + "</td> " +
                            "               <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(totalRate)) + " </td> " +
                            "               <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"><!-- Total excl. of Tax (${record.currency}) -->" + numberWithCommas(removeNull(totalAmount)) + "</td> " +
                            "               <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\"><!-- Tax % -->" + persentage(removeNull(taxrate1)) + "</td> " +
                            "               <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"><!-- Tax --><!-- (${record.currency}) -->" + numberWithCommas(removeNull(totalTax)) + "</td> " +
                            "               <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"><!-- Total with Tax (${record.currency}) -->" + numberWithCommas(removeNull(totalGrossamt)) + "</td> ";
                        template += "  </tr> ";

                        finalAmount = +finalAmount + +totalAmount;
                        finalTax1Amount = +finalTax1Amount + +totalTax;
                        finalGrossAmount = +finalGrossAmount + +totalGrossamt;

                        totalRate = 0;
                        totalTax = 0;
                        totalAmount = 0;
                        totalGrossamt = 0;
                        if (count != 0)
                            count--;
                        j++;
                        nextitem = 0;
                    }
                    if (count == 0) {
                        var Equipment = invoice.getLineItemValue('item', 'item_display', i);
                        var iteamName = invoice.getLineItemValue('item', 'description', i);
                        var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
                        var fromDate = invoice.getLineItemValue('item', 'custcol_rent_from_date', i);
                        var toDate = invoice.getLineItemValue('item', 'custcol_rent_to_date', i);
                        var no_of_hdwm = invoice.getLineItemValue('item', 'custcol_rent_no_of_hdwm', i);
                        var agreedHours = invoice.getLineItemValue('item', 'custcol_rent_agreed_hours', i);
                        var robd_timesheet = "";
                        var rent_robd = invoice.getLineItemValue('item', 'custcol_rent_robd', i);
                        var totalAmount = invoice.getLineItemValue('item', 'amount', i);
                        var totalGrossamt = invoice.getLineItemValue('item', 'grossamt', i);
                        var totalRate = invoice.getLineItemValue('item', 'rate', i);
                        var totalTax = invoice.getLineItemValue('item', 'tax1amt', i);
                        if (rent_robd) {
                            robd_timesheet = nlapiLookupField("customrecord_rent_robd", rent_robd, "custrecord_rent_robd_timesheet", true);
                            var timesheetId = nlapiLookupField("customrecord_rent_robd", rent_robd, "custrecord_rent_robd_timesheet", false);
                            // var ROBD = nlapiLoadRecord("customrecord_rent_robd", rent_robd);
                            // robd_timesheet = ROBD.getFieldText("custrecord_rent_robd_timesheet");
                        }
                        var rental_unit = invoice.getLineItemText('item', 'custcol_rent_rental_unit', i);
                    }
                    if (groupType != "Description" && count == 1) {
                        totalRate = +totalRate + +unitPrice;
                        totalTax = +totalTax + +tax1amt;
                        totalAmount = +totalAmount + +amount;
                        totalGrossamt = +totalGrossamt + +grossamt;
                        var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
                    }
                    if (j == 0) {
                        j++;
                        template += "<thead> " +
                            "            <tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\"> " +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-bottom:solid 1px #000000;font-weight:bold;\">TS Date</td> " +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">TS No.</td> " +
                            "               <td align=\"center\" colspan=\"6\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Equipment</td> " +
                            "               <td align=\"center\" colspan=\"6\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Description</td> " +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Rental Unit</td> " +
                            "               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Unit Price </td> " +
                            "               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total excl. of Tax (${record.currency})</td> " +
                            "               <td align=\"center\" colspan=\"2\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax %</td> " +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax<br/>(${record.currency})</td> " +
                            "               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total with Tax (${record.currency})</td> " +
                            "            </tr> " +
                            "</thead> ";
                    }
                    if (itemType == 5) {
                       
                        
                    }
                    if ((nextitem == 1 || i == lineCount && (groupType != "Description")) || count == 0) {
                        if (totalRate != "")
                            totalRate = Number(totalRate).toFixed(2);
                        totalAmount = Number(totalAmount).toFixed(2);
                        totalTax = Number(totalTax).toFixed(2);
                        totalGrossamt = Number(totalGrossamt).toFixed(2);
                        if (robd_timesheet == null || robd_timesheet == "") {
                            var robd_timesheet = invoice.getFieldText("custbody_invoice_timesheet_ref");
                        }
                        if (itemType == "7") {
                          
                            robd_timesheet = "";
                            totalRate = "";
                        }
                        if (count == 0 && (itemType == "1" || itemType == "2")) {
                            var totalRate = invoice.getLineItemValue('item', 'custcol_agreed_rate', i);
                        }
                        if (rental_unit == "Daily" && no_of_hdwm > 1) {
                            rental_unit = "Days";
                        }
                        if (rental_unit == "Daily" && no_of_hdwm == 1) {
                            rental_unit = "Day";
                        }
                        template += "<tr>";
                        template += "<td colspan=\"3\"  style=\"text-align:center;\">" + removeNull(fromDate) + "<br/>&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;";
                        if (toDate) {
                            template += "To<br/>" + removeNull(toDate);
                        }
                        template += "</td>" +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">" + replaceTSand21(removeNull(robd_timesheet)) + "</td> " +
                            "               <td align=\"left\" colspan=\"6\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(removeNull(Equipment)) + "</td> " +
                            "               <td align=\"left\" colspan=\"6\" style=\"border-left:solid 1px #000000;\"><!-- Description -->" + replaceAndOper(descNextLine(removeNull(iteamName))) + "</td> " +
                            "               <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"><!-- Qty / Unit -->" + removeNull(no_of_hdwm) + "&nbsp;" + removeNull(rental_unit) + "</td> " +
                            "               <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(totalRate)) + " </td> " +
                            "               <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"><!-- Total excl. of Tax (${record.currency}) -->" + numberWithCommas(removeNull(totalAmount)) + "</td> " +
                            "               <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\"><!-- Tax % -->" + persentage(removeNull(taxrate1)) + "</td> " +
                            "               <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"><!-- Tax --><!-- (${record.currency}) -->" + numberWithCommas(removeNull(totalTax)) + "</td> " +
                            "               <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"><!-- Total with Tax (${record.currency}) -->" + numberWithCommas(removeNull(totalGrossamt)) + "</td> ";
                        template += "  </tr> ";

                        finalAmount = +finalAmount + +totalAmount;
                        finalTax1Amount = +finalTax1Amount + +totalTax;
                        finalGrossAmount = +finalGrossAmount + +totalGrossamt;

                        totalRate = 0;
                        totalTax = 0;
                        totalAmount = 0;
                        totalGrossamt = 0;
                        if (count != 0)
                            count--;
                        j++;
                        nextitem = 0;
                    }
                    if (groupType == "Description") {
                        var iteamName = invoice.getLineItemValue('item', 'description', i);
                        var Equipment = invoice.getLineItemValue('item', 'custcollumpsum_equipment', i);
                        var no_of_hdwm = "LUMP";
                        var rental_unit = "&nbsp;&nbsp;&nbsp;SUM";
                        var robd_timesheet = invoice.getLineItemText('item', 'custcol_timesheet_ref', i);
                        var robd_timesheet_id = invoice.getLineItemValue('item', 'custcol_timesheet_ref', i);
                        if (robd_timesheet_id) {
                            // var fromDate = nlapiLookupField("customrecord_rent_timesheet", robd_timesheet_id, "custrecord_rent_time_from_date", false);
                            // var toDate = nlapiLookupField("customrecord_rent_timesheet", robd_timesheet_id, "custrecord_rent_time_to_date", false);

                            var fromDate = invoice.getLineItemValue('item','custcol_from_date_time_sheet',i);
                            var toDate = invoice.getLineItemValue('item','custcol_to_date_timesheet',i);
                        } else {
                            var robd_timesheet = invoice.getFieldText("custbody_invoice_timesheet_ref");
                            var fromDate = invoice.getFieldValue("custbody_invoice_ts_from_date");
                            var toDate = invoice.getFieldValue("custbody_invoice_ts_to_date");
                        }
                    }
                }

            }
            template += "         <tr style=\"border-top:solid 1px #000000;\"> " +
                "            <td align=\"left\" colspan=\"25\"><b>Total Value in ${record.currency}</b></td> " +
                "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"><b>" + numberWithCommas(finalAmount.toFixed(2)) + "</b></td> " +
                "            <td align=\"right\" colspan=\"2\" style=\"border-left:solid 1px #000000;\">&nbsp;" +
                "</td> " +
                "            <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\"><b>" + numberWithCommas(finalTax1Amount.toFixed(2)) + "</b></td> " +
                "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;\"><b>" + numberWithCommas(finalGrossAmount.toFixed(2)) + "</b></td> " +
                "         </tr> " +
                "         <tr> " +
                "            <td align=\"left\" colspan=\"34\" style=\"border-top:solid 1px #000000;\"><b>Amount in" +
                "words: </b><i>${record.currency}&nbsp; ${record.custbody_kpib_total_in_words?capitalize}</i></td> " +
                "            <td align=\"right\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-top:solid 1px #000000;\"><b>" + numberWithCommas(finalGrossAmount.toFixed(2)) + "</b></td> " +
                "         </tr> ";

        }

        template += "</table><hr />";
    } else if (createdfromRef == null && salesOrderRef == null) { //if it is direct invoice
        template += "      <table class=\"itemtable\" style=\"width: 100%;font-size:10px;\"> " +
            "         <thead> " +
            "            <tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\"> " +
            "               <td align=\"center\" width=\"9%\" style = \"border-bottom:solid 1px #000000;font-weight:bold;\">Sr.#</td> " +
            // "               <td align=\"center\" width=\"8%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">TS No.</td> " +
            "               <td align=\"center\" width=\"16%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Equipment</td> " +
            "               <td align=\"center\" colspan='2' width=\"23%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Description</td> " +
            "               <td align=\"center\" width=\"9%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align=\"center\">Qty</p></td> " +
            "               <td align=\"center\" width=\"10%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Unit Price</td> " +
            "               <td align=\"center\" width=\"11%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align=\"center\">Total excl. of Tax (${record.currency})</p></td> " +
            "               <td align=\"center\" width=\"4%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax %</td> " +
            "               <td align=\"center\" width=\"8%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align=\"center\">Tax<br/>(${record.currency})</p></td> " +
            "               <td align=\"center\" width=\"11%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align=\"center\">Total with Tax (${record.currency})</p></td> " +
            "            </tr> " +
            "         </thead> ";
        var lineCount = invoice.getLineItemCount('item');
        var totalAmount = 0;
        var totaltaxrate1 = 0;
        var totaltax1amt = 0;
        var totalgrossamt = 0;
        if (lineCount > 0) {
            // nlapiLogExecution("DEBUG", "lineCount", lineCount);
            for (var i = 1; i <= lineCount; i++) {
                var Equipment = invoice.getLineItemValue('item', 'item_display', i);
                var quantity = invoice.getLineItemValue('item', 'quantity', i);
                var description = invoice.getLineItemValue('item', 'description', i);
                var rate = invoice.getLineItemValue('item', 'rate', i);
                var amount = invoice.getLineItemValue('item', 'amount', i);
                var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
                var tax1amt = invoice.getLineItemValue('item', 'tax1amt', i);
                var grossamt = invoice.getLineItemValue('item', 'grossamt', i);

                if (grossamt) {
                    grossamt = Number(grossamt).toFixed(2);
                }
                template += "         <tr>";
                template += "<td width=\"9%\" align=\"center\" >" + i + "</td>";
                // template += "<td width=\"8%\" style=\"border-left:solid 1px #000000;\"></td> ";
                template += "<td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">" + replaceAndOper(removeNull(Equipment)) + "</td> ";
                template += "<td width=\"23%\" colspan='2' style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(description))) + "</td> " +
                    "            <td width=\"9%\" align=\"center\" style=\"border-left:solid 1px #000000;\">" + quantity + "</td> " +
                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(rate)) + "</td> " +
                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(amount).toFixed(2))) + "</td> " +
                    "            <td align=\"right\" width=\"4%\" style=\"border-left:solid 1px #000000;\">" + persentage(taxrate1) + "</td> " +
                    "            <td align=\"right\" width=\"8%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(tax1amt).toFixed(2))) + "</td> " +
                    "            <td align=\"right\" width=\"11%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(grossamt).toFixed(2))) + "</td> " +
                    "         </tr> ";
                totalAmount = Number(totalAmount) + Number(amount);
                totaltaxrate1 = Number(totaltaxrate1) + Number(taxrate1);
                totaltax1amt = Number(totaltax1amt) + Number(tax1amt);
                totalgrossamt = Number(totalgrossamt) + Number(grossamt);
            }
        }
        template += "         <tr style=\"border-top:solid 1px #000000;\"> " +
            "            <td align=\"left\" width=\"67%\" colspan=\"6\" style=\"border-bottom:solid 1px #000000;\"><b>Total Value in ${record.currency}</b></td> " +
            "            <td align=\"right\" width=\"10%\" style=\"border-bottom:solid 1px #000000;border-left:solid 1px #000000;\"><b>" + numberWithCommas(totalAmount.toFixed(2)) + "</b></td> " +
            "            <td align=\"center\" width=\"4%\" style=\"border-bottom:solid 1px #000000;border-left:solid 1px #000000;\">&nbsp;" +
            "</td> " +
            "            <td align=\"right\" width=\"8%\" style=\"border-bottom:solid 1px #000000;border-left:solid 1px #000000;\"><b>" + numberWithCommas(totaltax1amt.toFixed(2)) + "</b></td> " +
            "            <td align=\"right\" width=\"11%\" style=\"border-bottom:solid 1px #000000;border-left:solid 1px #000000;\"><b>" + numberWithCommas(totalgrossamt.toFixed(2)) + "</b></td> " +
            "         </tr> " +
            "         <tr> " +
            "            <td align=\"left\" width=\"89%\" colspan=\"9\" style=\"padding:5px;\"><b>Amount in&nbsp;" +
            "words: </b><i>&nbsp;&nbsp;${record.currency}&nbsp;&nbsp;&nbsp; ${record.custbody_kpib_total_in_words?capitalize}</i></td> " +
            "            <td align=\"right\" width=\"11%\" style=\"border-left:solid 1px #000000;\"><b>${record.total?string[\"#,##0.00\"]}</b></td> " +
            "         </tr> ";
        template += "     </table> ";
        var finalGrossAmount = totalgrossamt;
    } else { //if it is Normal invoice
        nlapiLogExecution("DEBUG","normal invoice","normal invoice");
        template += "      <table class=\"itemtable\" style=\"width: 100%;font-size:10px;\"> " +
            "         <thead> " +
            "            <tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\"> " +
            "               <td align=\"center\" width=\"9%\" style = \"border-bottom:solid 1px #000000;font-weight:bold;\">TS Date</td> " +
            "               <td align=\"center\" width=\"8%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">TS No.</td> " +
            "               <td align=\"center\" width=\"16%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Equipment</td> " +
            "               <td align=\"center\" width=\"15%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Description</td> " +
            "               <td align=\"center\" width=\"9%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align=\"center\">Rental Unit</p></td> " +
            "               <td align=\"center\" width=\"10%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Unit Price</td> " +
            "               <td align=\"center\" width=\"11%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align=\"center\">Total excl. of Tax (${record.currency})</p></td> " +
            "               <td align=\"center\" width=\"4%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax %</td> " +
            "               <td align=\"center\" width=\"8%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align=\"center\">Tax<br/>(${record.currency})</p></td> " +
            "               <td align=\"center\" width=\"11%\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align=\"center\">Total with Tax (${record.currency})</p></td> " +
            "            </tr> " +
            "         </thead> ";
        var lineCount = invoice.getLineItemCount('item');
        var totalAmount = 0;
        var totaltaxrate1 = 0;
        var totaltax1amt = 0;
        var totalgrossamt = 0;
        nlapiLogExecution("DEBUG","lineCount",lineCount);

        if (lineCount > 0) {
            for (var i = 1; i <= lineCount; i++) {
                var fromDate = invoice.getLineItemValue('item', 'custcol_rent_from_date', i);
                var toDate = invoice.getLineItemValue('item', 'custcol_rent_to_date', i);
                var Equipment = invoice.getLineItemValue('item', 'item_display', i);
                var description = invoice.getLineItemValue('item', 'description', i);
                var rental_unit = invoice.getLineItemText('item', 'custcol_rent_rental_unit', i);
                var extra_hours_rate = invoice.getLineItemValue('item', 'custcol_rent_extra_hours_rate', i);
                var extra_hours = invoice.getLineItemValue('item', 'custcol_rent_total_extra_hours', i);
                var AgreedRate = invoice.getLineItemValue('item', 'custcol_agreed_rate', i);
                var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
                var rent_robd = invoice.getLineItemValue('item', 'custcol_rent_robd', i);
                var no_of_hdwm = invoice.getLineItemValue('item', 'custcol_rent_no_of_hdwm', i);
                var agreedHours = invoice.getLineItemValue('item', 'custcol_rent_agreed_hours', i);
                var PreHours = invoice.getLineItemValue('item', 'custcol_rent_per_hour_rate', i);
                var normalHours = invoice.getLineItemValue('item', 'custcol_rent_total_normal_hours', i);
                var exclInPrint = "";
                exclInPrint = invoice.getLineItemValue('item', 'custcol_exclude_in_print', i);
                var itemType = invoice.getLineItemValue('item', 'custcol_rent_item_type', i);
                var exclInPrintamount = invoice.getLineItemValue('item', 'amount', i);
                var Discount = invoice.getLineItemValue('item', 'itemtype', i);
                var merge_extra_hrs = invoice.getLineItemValue('item', 'custcol_merge_extra_hrs', i);
                var hrsExtraLineRequ = invoice.getLineItemValue('item', 'custcol_alfar_extra_hrs_line_required', i);

                var extraLineRequired = 0;
                if (exclInPrintamount > 0 || exclInPrint != "T") {
                    var robd_timesheet = "";
                    var robd_timesheet_date = "";
                    if (rent_robd) { //Taking TimeSheet number
                        robd_timesheet = nlapiLookupField("customrecord_rent_robd", rent_robd, "custrecord_rent_robd_timesheet", true);
                        var timesheetId = nlapiLookupField("customrecord_rent_robd", rent_robd, "custrecord_rent_robd_timesheet", false);
                        if (timesheetId) { //Taking TimeSheet contract Start Date 
                          //  robd_timesheet_date = nlapiLookupField("customrecord_rent_timesheet", timesheetId, "custrecord_rent_time_cont_start_date");
                            robd_timesheet_date = invoice.getLineItemValue('item', 'custcol_contract_start_date_time_shee', i);
                         
                         }
                    }
                    var itemID = invoice.getLineItemValue('item', 'item', i);
                    var billingRule = invoice.getLineItemValue('item', 'custcol_rent_billing_rule', i);
                    var billing_rule = "";
                    
                    if (rental_unit == "Daily") { //If it is Daily then checking for it's Billing Rule (Normal, hourly)

                        // have to move master record from - old account to new acc
                      //  billing_rule = nlapiLookupField("customrecord_rent_billing_rule", billingRule, "custrecord_rent_billing_hourly", true);
                    }
                    if (merge_extra_hrs == "T" && billing_rule != "HOURLY") {
                        extraLineRequired = 1;
                    }
                    if (billing_rule == "HOURLY" && hrsExtraLineRequ != "T") {
                        extraLineRequired = 1;
                    }

                    if (extraLineRequired == 1 && itemType != 5 && itemType != 7 && Discount != "Discount") {
                        billing_hours = nlapiLookupField("customrecord_rent_billing_rule", billingRule, "custrecord_rent_billing_hours", false);

                        var AgreedRate = invoice.getLineItemValue('item', 'custcol_agreed_rate', i);
                        var amount = invoice.getLineItemValue('item', 'amount', i);
                        var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
                        var tax1amt = invoice.getLineItemValue('item', 'tax1amt', i);
                        var grossamt = invoice.getLineItemValue('item', 'grossamt', i);
                        var totalNormalhours = invoice.getLineItemValue('item', 'custcol_rent_total_normal_hours', i);
                        var totalExtrahours = invoice.getLineItemValue('item', 'custcol_rent_total_extra_hours', i);
                        var totalHours = (Number(totalNormalhours) + Number(totalExtrahours)) / Number(billing_hours);
                        totalHours = Number(totalHours).toFixed(2);
                        if (rental_unit == "Daily") {
                            rental_unit = "Days"
                            if (totalHours == 1) {
                                rental_unit = "Day";
                            }
                            if (billing_rule == "TRIP") {
                                rental_unit = "Trip";
                            }
                            if (billing_rule == "HOURLY") {
                                rental_unit = "Hrs"
                            }
                        }
                        if (rental_unit == "Monthly") {
                            rental_unit = "Month"
                        }
                        if (rental_unit == "Weekly") {
                            rental_unit = "Week"
                        }
                        template += "<tr>";

                        template += "<td width=\"9%\"  style=\"text-align:center;\">" + removeNull(fromDate) + "<br/>&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;" +
                            "&nbsp;";
                        if (toDate) {
                            template += "To<br/>" + removeNull(toDate);
                        }
                        template += "</td>";

                        template += "             <td width=\"8%\" style=\"border-left:solid 1px #000000;\">" + replaceTSand21(removeNull(robd_timesheet)) + "</td> ";
                        if (itemType == 1 || itemType == 2) {
                            template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">" + replaceAndOper(removeNull(Equipment)) + "<br/><b style=\"font-size:7pt;\">Start Date :" + robd_timesheet_date + "</b></td> ";
                        } else {
                            template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\"> &nbsp;</td> ";
                        }
                        template += "            <td width=\"15%\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(description))) + "</td> " +

                            "            <td width=\"9%\" align=\"center\" style=\"border-left:solid 1px #000000;\">" + removeNull(totalHours) + "&nbsp;" + rental_unit + "</td> " +
                            "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(AgreedRate).toFixed(2))) + "</td> " +
                            "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(amount).toFixed(2))) + "</td> " +
                            "            <td align=\"right\" width=\"4%\" style=\"border-left:solid 1px #000000;\">" + persentage(taxrate1) + "</td> " +
                            "            <td align=\"right\" width=\"8%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(tax1amt).toFixed(2))) + "</td> " +
                            "            <td align=\"right\" width=\"11%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(grossamt).toFixed(2))) + "</td> " +
                            "         </tr> ";
                        totalAmount = +totalAmount + +amount;
                        totaltaxrate1 = +totaltaxrate1 + +taxrate1;
                        totaltax1amt = +totaltax1amt + +tax1amt;
                        totalgrossamt = +totalgrossamt + +grossamt;

                    } else {

                        if (billing_rule == "HOURLY") {

                            if ((normalHours > 0 && PreHours > 0)) {
                            var rate = invoice.getLineItemValue('item', 'custcol_rent_per_hour_rate', i);

                                template += "         <tr>";
                                if (itemType == 1 || itemType == 2) {
                                    template += "<td width=\"9%\"  style=\"text-align:center;\">" + removeNull(fromDate) + "<br/>&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;";
                                    if (toDate) {
                                        template += "To<br/>" + removeNull(toDate);
                                    }
                                    template += "</td>";
                                } else {
                                    template += "<td width=\"9%\"  style=\"text-align:center;\">&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;";
                                    template += "</td>";
                                }

                                var amount = parseFloat(rate) * parseFloat(normalHours);
                                if (extra_hours == 0) {
                                    var amount = invoice.getLineItemValue('item', 'amount', i);
                                }
                                var tax1amt = (+amount / 100) * parseFloat(taxrate1);
                                var grossamt = parseFloat(amount) + parseFloat(tax1amt);

                                if (normalHours) {
                                    normalHours = Number(normalHours).toFixed(2);
                                }
                                template += "             <td width=\"8%\" style=\"border-left:solid 1px #000000;\">" + replaceTSand21(removeNull(robd_timesheet)) + "</td> ";
                                if (itemType == 1 || itemType == 2) {

                                    template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">" + replaceAndOper(removeNull(Equipment)) + "<br/><b style=\"font-size:7pt;\">Start Date :" + robd_timesheet_date + "</b></td> ";
                                } else {
                                    template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">&nbsp;&nbsp;<br/></td> ";
                                }
                                template += "            <td width=\"15%\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(description))) + "</td> " +

                                    "            <td align=\"center\" width=\"9%\" style=\"border-left:solid 1px #000000;\">" + removeNull(normalHours) + "&nbsp; Hrs</td> " +
                                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + removeNull(Number(rate).toFixed(2)) + "</td> " +
                                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(amount).toFixed(2))) + "</td> " +
                                    "            <td align=\"right\" width=\"4%\" style=\"border-left:solid 1px #000000;\">" + persentage(taxrate1) + "</td> " +
                                    "            <td align=\"right\" width=\"8%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(tax1amt).toFixed(2))) + "</td> " +
                                    "            <td align=\"right\" width=\"11%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(grossamt).toFixed(2))) + "</td> " +
                                    "         </tr> ";
                                totalAmount = +totalAmount + +amount;
                                totaltaxrate1 = +totaltaxrate1 + +taxrate1;
                                totaltax1amt = +totaltax1amt + +tax1amt;
                                totalgrossamt = +totalgrossamt + +grossamt;
                            }
                            if (extra_hours > 0 && extra_hours_rate > 0) {
                            var rate = invoice.getLineItemValue('item', 'custcol_rent_extra_hours_rate', i);
                                
                                template += "         <tr>";
                                if (itemType == 1 || itemType == 2) {
                                    template += "<td width=\"9%\"  style=\"text-align:center;\">" + removeNull(fromDate) + "<br/>&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;";
                                    if (toDate) {
                                        template += "To<br/>" + removeNull(toDate);
                                    }
                                    template += "</td>";
                                } else {
                                    template += "<td width=\"9%\"  style=\"text-align:center;\">&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;";
                                    template += "</td>";
                                }
                                var amount = parseFloat(rate) * parseFloat(extra_hours);
                                var tax1amt = (+amount / 100) * parseFloat(taxrate1);
                                var grossamt = parseFloat(amount) + parseFloat(tax1amt);

                                if (extra_hours) {
                                    extra_hours = Number(extra_hours).toFixed(2);
                                }
                                template += "             <td width=\"8%\" style=\"border-left:solid 1px #000000;\">" + replaceTSand21(removeNull(robd_timesheet)) + "</td> ";
                                if (itemType == 1 || itemType == 2) {

                                    template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">" + replaceAndOper(removeNull(Equipment)) + "<br/>(Extra Hrs)</td> ";
                                } else {
                                    template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">&nbsp;&nbsp;<br/></td> ";
                                }
                                template += "            <td width=\"15%\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(description))) + "</td> " +

                                    "            <td align=\"center\" width=\"9%\" style=\"border-left:solid 1px #000000;\">" + removeNull(extra_hours) + "&nbsp; Hrs</td> " +
                                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + removeNull(Number(rate).toFixed(2)) + "</td> " +
                                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(amount).toFixed(2))) + "</td> " +
                                    "            <td align=\"right\" width=\"4%\" style=\"border-left:solid 1px #000000;\">" + persentage(taxrate1) + "</td> " +
                                    "            <td align=\"right\" width=\"8%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(tax1amt).toFixed(2))) + "</td> " +
                                    "            <td align=\"right\" width=\"11%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(grossamt).toFixed(2))) + "</td> " +
                                    "         </tr> ";
                                totalAmount = +totalAmount + +amount;
                                totaltaxrate1 = +totaltaxrate1 + +taxrate1;
                                totaltax1amt = +totaltax1amt + +tax1amt;
                                totalgrossamt = +totalgrossamt + +grossamt;
                            }
                        } else {
                            nlapiLogExecution('DEBUG', 'billing rule else condition and line', i);
                            //nlapiLogExecution('DEBUG', 'itemType', itemType);

                            if ((normalHours > 0 && PreHours > 0) || itemType==1 || itemType == 5 || itemType == 7 || Discount == "Discount") {
                                if (rental_unit == "Daily") {
                                    rental_unit = "Days"
                                }
                                if (rental_unit == "Monthly") {
                                    rental_unit = "Month"
                                }
                                template += "         <tr>";
                                if (itemType == 1 || itemType == 2) {
                                    template += "<td width=\"9%\"  style=\"text-align:center;\">" + removeNull(fromDate) + "<br/>&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;";
                                    if (toDate) {
                                        template += "To<br/>" + removeNull(toDate);
                                    }
                                    template += "</td>";
                                } else {
                                    template += "<td width=\"9%\"  style=\"text-align:center;\">&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;";

                                    template += "</td>";
                                }
                                if (rental_unit == "Days") {
                                    if (no_of_hdwm == 1) {
                                        rental_unit = "Day";
                                    }
                                    var amount = parseFloat(PreHours) * parseFloat(normalHours);
                                    if (extra_hours == 0) {
                                        var amount = invoice.getLineItemValue('item', 'amount', i);
                                    }
                                    var tax1amt = ((+amount / 100) * Number(persentage(taxrate1)));
                                    if (extra_hours > 0) {
                                        try {
                                             //-----Comment....-------//
                                            // var num = (tax1amt);
                                            // num = num.toString();
                                            // var myArray = (num).split(".");
                                            // myArray = myArray[1].substring(0, 2);
                                            // tax1amt = parseInt(tax1amt);
                                            // tax1amt = tax1amt + "." + myArray;
                                             //-----Comment....-------//
                                            if (tax1amt) {
                                                tax1amt = Number(tax1amt).toFixed(2);
                                            }
                                        } catch (e) {
                                            nlapiLogExecution('DEBUG', 'catch', e.toString());
                                        }
                                    }

                                    var grossamt = Number(amount) + Number(tax1amt);
                                    if (billing_rule == "TRIP") {
                                        rental_unit = "Trip";
                                    }
                                    if (extra_hours == 0) {
                                        var amount = invoice.getLineItemValue('item', 'amount', i);
                                        var tax1amt = invoice.getLineItemValue('item', 'tax1amt', i);
                                        var grossamt = invoice.getLineItemValue('item', 'grossamt', i);
                                    }
                                }
                                if (rental_unit == "Month") {
                                    var amount = parseFloat(PreHours) * parseFloat(normalHours);
                                    if (extra_hours == 0) {
                                        var amount = invoice.getLineItemValue('item', 'amount', i);
                                    }
                                    var tax1amt = (+amount / 100) * parseFloat(taxrate1);
                                    var grossamt = parseFloat(amount) + parseFloat(tax1amt);

                                   

                                }
                                if (rental_unit == "Weekly") {
                                    rental_unit = "Week"
                                    var amount = parseFloat(PreHours) * parseFloat(normalHours);
                                    if (extra_hours == 0) {
                                        var amount = invoice.getLineItemValue('item', 'amount', i);
                                    }
                                    var tax1amt = (+amount / 100) * parseFloat(taxrate1);
                                    var grossamt = parseFloat(amount) + parseFloat(tax1amt);
                                }
                                if (itemType==1 || itemType == 7 || Discount == "Discount") {
                                    var AgreedRate = invoice.getLineItemValue('item', 'rate', i);
                                    var amount = invoice.getLineItemValue('item', 'amount', i);
                                    var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
                                    var tax1amt = invoice.getLineItemValue('item', 'tax1amt', i);
                                    var grossamt = invoice.getLineItemValue('item', 'grossamt', i);
                                }
                                if (itemType == 5) {
                                    Equipment = "";
                                    rental_unit = "";
                                    no_of_hdwm = "";
                                    AgreedRate = "";
                                    var amount = invoice.getLineItemValue('item', 'amount', i);
                                    var taxrate1 = invoice.getLineItemValue('item', 'taxrate1', i);
                                    var tax1amt = invoice.getLineItemValue('item', 'tax1amt', i);
                                    var grossamt = invoice.getLineItemValue('item', 'grossamt', i);
                                }
                                if (no_of_hdwm) {
                                    no_of_hdwm = Number(no_of_hdwm).toFixed(2);
                                }

                                if (grossamt) {
                                    grossamt = Number(grossamt).toFixed(2);
                                }
                                //nlapiLogExecution('DEBUG', 'itemType', itemType);

                                template += "             <td width=\"8%\" style=\"border-left:solid 1px #000000;\">" + replaceTSand21(removeNull(robd_timesheet)) + "</td> ";
                                if (itemType == 1 || itemType == 2) {
                                    template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">" + replaceAndOper(removeNull(Equipment)) + "<br/><b style=\"font-size:7pt;\">Start Date :" + robd_timesheet_date + "</b></td> ";
                                } else {
                                    template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\"> &nbsp;</td> ";
                                }
                                template += "            <td width=\"15%\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(description))) + "</td> " +

                                    "            <td width=\"9%\" align=\"center\" style=\"border-left:solid 1px #000000;\">" + removeNull(no_of_hdwm) + "&nbsp;" + rental_unit + "</td> " +
                                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(AgreedRate)) + "</td> " +
                                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(amount).toFixed(2))) + "</td> " +
                                    "            <td align=\"right\" width=\"4%\" style=\"border-left:solid 1px #000000;\">" + persentage(taxrate1) + "</td> " +
                                    "            <td align=\"right\" width=\"8%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(tax1amt).toFixed(2))) + "</td> " +
                                    "            <td align=\"right\" width=\"11%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(grossamt).toFixed(2))) + "</td> " +
                                    "         </tr> ";
                                totalAmount = Number(totalAmount) + Number(amount);
                                totaltaxrate1 = Number(totaltaxrate1) + Number(taxrate1);
                                totaltax1amt = Number(totaltax1amt) + Number(tax1amt);
                                totalgrossamt = Number(totalgrossamt) + Number(grossamt);
                            }
                            if (extra_hours > 0 && extra_hours_rate > 0) {
                                var amount = parseFloat(extra_hours_rate) * parseFloat(extra_hours);

                                var tax1amt = (parseFloat(amount) * parseFloat(taxrate1) / 100);
                                 //-----Comment....-------//
                                // if (tax1amt) {
                                //     tax1amt = Number(tax1amt).toFixed(2);
                                // }
                                 //-----Comment....-------//
                                var grossamt = Number(amount) + Number(tax1amt);
                                extra_hours_rate = Number(extra_hours_rate).toFixed(4);
                                if (grossamt) {
                                    grossamt = Number(grossamt).toFixed(2);
                                }
                                template += "         <tr>";
                                if (itemType == 1 || itemType == 2) {
                                    template += "<td width=\"9%\" style=\"text-align:center;\">" + removeNull(fromDate) + "<br/>&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;";
                                    if (toDate) {
                                        template += "To<br/>" + removeNull(toDate);
                                    }
                                    template += "</td>";
                                } else {
                                    template += "<td width=\"9%\" style=\"text-align:center;\">&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;" +
                                        "&nbsp;";
                                    template += "</td>";
                                }
                                template += "             <td width=\"8%\" style=\"border-left:solid 1px #000000;\">" + replaceTSand21(removeNull(robd_timesheet)) + "</td> ";
                                if (itemType == 1 || itemType == 2) {
                                    template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">" + replaceAndOper(removeNull(Equipment)) + "(Extra Hrs)</td> "
                                } else {
                                    template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\">&nbsp;</td> "
                                }
                                template += "              <td width=\"15%\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(description))) + "</td> " +
                                    "            <td width=\"9%\" align=\"center\" style=\"border-left:solid 1px #000000;\">" + removeNull(extra_hours) + "&nbsp;Hrs</td> " +
                                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(extra_hours_rate)) + "</td> " +
                                    "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(amount).toFixed(2))) + "</td> " +
                                    "            <td align=\"right\" width=\"4%\" style=\"border-left:solid 1px #000000;\">" + persentage(taxrate1) + "</td> " +
                                    "            <td align=\"right\" width=\"8%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(tax1amt).toFixed(2))) + "</td> " +
                                    "            <td align=\"right\" width=\"11%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(Number(grossamt).toFixed(2))) + "</td> " +
                                    "         </tr> ";
                                totalAmount = +totalAmount + +amount;
                                totaltaxrate1 = +totaltaxrate1 + +taxrate1;
                                totaltax1amt = +totaltax1amt + +tax1amt;
                                totalgrossamt = +totalgrossamt + +grossamt;
                            }
                        }
                    }
                }
            }
        }

        //new code for printing billable expenses
        var billExp = invoice.getLineItemCount('expcost');
        nlapiLogExecution("DEBUG", "billExp", billExp);

        if (billExp > 0) {
            for (var z = 1; z <= billExp; z++) {

                var apply = invoice.getLineItemValue('expcost', "apply", z);
                nlapiLogExecution("DEBUG", "apply", apply);
                if (apply == "T") {
                    //nlapiLogExecution("DEBUG", "apply1111", apply);

                    var description = invoice.getLineItemValue('expcost', "memo", z);
                    var amount = invoice.getLineItemValue('expcost', 'amount', z);
                    var tax1amt = invoice.getLineItemValue('expcost', 'tax1amt', z);
                    var taxrate1 = invoice.getLineItemValue('expcost', 'taxrate1', z);
                    var grossamt = invoice.getLineItemValue('expcost', 'grossamt', z);
                    var totalGrossamt = +amount + +tax1amt;

                    template += "<tr>";

                    template += "<td width=\"9%\"  style=\"text-align:center;\"></td>";

                    template += "             <td width=\"8%\" style=\"border-left:solid 1px #000000;\"></td> ";

                    template += "            <td width=\"16%\" style=\"border-left:solid 1px #000000;word-wrap: break-word;\"></td> ";

                    template += "            <td width=\"15%\" style=\"border-left:solid 1px #000000;\">" + replaceAndOper(descNextLine(removeNull(description))) + "</td> " +

                        "            <td width=\"9%\" align=\"center\" style=\"border-left:solid 1px #000000;\"></td> " +
                        "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\"></td> " +
                        "            <td align=\"right\" width=\"10%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(amount)) + "</td> " +
                        "            <td align=\"right\" width=\"4%\" style=\"border-left:solid 1px #000000;\">" + persentage(removeNull(taxrate1)) + "</td> " +
                        "            <td align=\"right\" width=\"8%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(tax1amt)) + "</td> " +
                        "            <td align=\"right\" width=\"11%\" style=\"border-left:solid 1px #000000;\">" + numberWithCommas(removeNull(totalGrossamt)) + "</td> " +
                        "         </tr> ";
                    totalAmount = +totalAmount + +amount;
                    totaltaxrate1 = +totaltaxrate1 + +taxrate1;
                    totaltax1amt = +totaltax1amt + +tax1amt;
                    totalgrossamt = +totalgrossamt + +grossamt;
                    nlapiLogExecution("DEBUG", "totalAmount", totalAmount);
                    nlapiLogExecution("DEBUG", "totaltaxrate1", totaltaxrate1);
                    nlapiLogExecution("DEBUG", "totaltax1amt", totaltax1amt);
                    nlapiLogExecution("DEBUG", "totalgrossamt", totalgrossamt);
                }

            }
        }

        template += "         <tr style=\"border-top:solid 1px #000000;\"> " +
            "            <td align=\"left\" width=\"67%\" colspan=\"6\" style=\"border-bottom:solid 1px #000000;\"><b>Total Value in ${record.currency}</b></td> " +
            "            <td align=\"right\" width=\"10%\" style=\"border-bottom:solid 1px #000000;border-left:solid 1px #000000;\"><b>" + numberWithCommas(totalAmount.toFixed(2)) + "</b></td> " +
            "            <td align=\"center\" width=\"4%\" style=\"border-bottom:solid 1px #000000;border-left:solid 1px #000000;\">&nbsp;" +
            "</td> " +
            "            <td align=\"right\" width=\"8%\" style=\"border-bottom:solid 1px #000000;border-left:solid 1px #000000;\"><b>" + numberWithCommas(totaltax1amt.toFixed(2)) + "</b></td> " +
            "            <td align=\"right\" width=\"11%\" style=\"border-bottom:solid 1px #000000;border-left:solid 1px #000000;\"><b>" + numberWithCommas(totalgrossamt.toFixed(2)) + "</b></td> " +
            "         </tr> " +
            "         <tr> " +
            "            <td align=\"left\" width=\"89%\" colspan=\"9\" style=\"padding:5px;\"><b>Amount in&nbsp;" +
            "words: </b><i>&nbsp;&nbsp;${record.currency}&nbsp;&nbsp;&nbsp; ${record.custbody_kpib_total_in_words?capitalize}</i></td> " +
            "            <td align=\"right\" width=\"11%\" style=\"border-left:solid 1px #000000;\"><b>${record.total?string[\"#,##0.00\"]}</b></td> " +
            "         </tr> ";
        template += "     </table> ";
        var finalGrossAmount = totalgrossamt;

    }
    template += "  <#if record.currencysymbol?string != \"AED\"> " +
        "      <table style=\"width:50%;border:1px solid black;font-weight:bold;margin-top:5 px;font-size:11px;\"> " +
        "         <tr> " +
        "            <td>Total Value in AED : ${(record.total * record.exchangerate)?string[\"#,##0.00\"]}</td> " +
        "         </tr> " +
        "         <tr> " +
        "            <td>Tax in AED : ${(record.taxtotal * record.exchangerate)?string[\"#,##0.00\"]}</td> " +
        "         </tr> " +
        "        <#if record.currencysymbol?string != \"AED\"> " +
        "        <tr> " +
        "            <td>Exchange Rate : (${record.currencysymbol} - AED) = ${record.exchangerate?string[\"0.######\"]}</td> " +
        "         </tr> " +
        "          </#if> " +
        "         <tr> " +
        "            <td>VALUES IN AED FOR VAT PURPOSES ONLY.</td> " +
        "         </tr> " +
        "      </table> " +
        "      </#if> " +
        "      <table style = \"margin-top:0.1px;\"> " +
        "         <tr><td>&nbsp;" +
        "</td><td align=\"center\" style=\"width:100%;\"><b>E. &#38;" +
        "O.E.</b></td></tr> " +
        "         <tr> " +
        "            <td style=\"width:336px;\" align=\"left\">Received By : _________________________________<br /><br />Received Date : " +
        "_______________________________ " +
        "            </td> " +
        "            <#if record.subsidiary.legalname?has_content> " +
        "            <td style=\"width:336px;font-weight:bold;\" align=\"right\"> For ${record.subsidiary.legalname}</td> " +
        "            </#if> " +
        "         </tr> " +
        "      </table> " +
        "      <table style=\"width:100%;\"> " +
        "         <tr> " +
        "            <#if record.subsidiary.internalid?string == '11'><td colspan=\"4\" style=\"font-size:10px;\"><span style=\"font-weight:bold;text-decoration:underline;\">Note #</span><i>&nbsp;" +
        "Cheque should be issued in favour of “AL FARIS INTERNATIONAL <br/>HEAVY EQUIPMENT RENTAL”.</i><br /><br /> " +
        "            </td> " +
        "              <#else><td colspan=\"4\" style=\"font-size:10px;\"><span style=\"font-weight:bold;text-decoration:underline;\">Note #</span><i>&nbsp;" +
        "Please ensure full name of company is printed on payment cheques as per invoice.</i><br /><br /></td> " +
        "                </#if> " +
        "            <td><br/>____________<br/>Prepared by</td> " +
        "            <td><br/>____________<br/>Checked by</td> " +
        "            <td><br/>____________<br/>Approved by</td> " +
        "         </tr> " +
        "      </table> " +
        "   </body> " +
        "</pdf>";
    var errorMess = "";
    errorMess += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> " +
        "<pdf> " +
        "   <head> " +
        "      <#if .locale == \"ru_RU\"> " +
        "      <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> " +
        "      </#if> ";
    errorMess += "  </head> ";
    errorMess += "  <body> ";
    errorMess += "  <H1>  Invoice amount is not matching, print cannot be generated.  </H1> ";
    errorMess += "  </body> ";
    errorMess += "</pdf>";
    var total = invoice.getFieldValue("total");

    finalGrossAmount = Number(finalGrossAmount).toFixed(2);
    total = Number(total).toFixed(2);

    if (Number(finalGrossAmount) == Number(total)) { //Checking invoice Total & Caluc Amt 
        nlapiLogExecution("DEBUG", "Successs");

        renderer.setTemplate(template); //if true Then Execute Print Template
    } else {
        nlapiLogExecution("DEBUG", "fail---", recordID);
        nlapiLogExecution("DEBUG", "fail---" + finalGrossAmount, "fail---" + total);

        renderer.setTemplate(errorMess); //if false  Then Execute Error Message Template
    }
    var userID = nlapiGetContext();
    userID = userID['user'];
    if (userID == 47 || userID == 20 || userID == 13 || userID == 42502 || userID == 3 || userID == 21 || userID==1876852 || userID==84922 || userID==4) { //if Amount is miss-matching Even Then this role can See the Print 
        renderer.setTemplate(template);
    }
    renderer.addRecord('record', invoice);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'Invoice' + invoice.getFieldValue('id') + '.pdf', 'inline');
    response.write(file.getValue());
}

function Contract(string) {
    string = string.replace(/Quotation #/g, "");
    return string;
}

function persentage(string) {
    string = string.replace(/%/g, "");
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

// function dateFrm(string) {
//     string = string.replace(/to/g, "&nbsp;&nbsp;&nbsp;&nbsp;to");
//     return string;
// }
// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function replaceAndOper(charVal) {
    return charVal.replace(/&/g, "&amp;");
}

function replaceTSand21(charVal) {
    charVal = charVal.replace(/TS-/g, "");
    charVal = charVal.replace(/NP-/g, "");
    charVal = charVal.replace(/-21/g, "");
    charVal = charVal.replace(/-22/g, "");

    return charVal;
}

function descNextLine(string) {
    string = string.replace(/\n/g, "<br/>");
    return string;
}


