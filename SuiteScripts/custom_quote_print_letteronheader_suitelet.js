function printQuoteAction(request, response) {
    var recordID = request.getParameter("recordID");
    var estimate = nlapiLoadRecord("estimate", recordID);
    var renderer = nlapiCreateTemplateRenderer();
    var template = "";
    template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> " +
        "<pdf> " +
        "<head> " +
        "<#if .locale == \"ru_RU\"> " +
        "    <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> " +
        "</#if> " +
        "<macrolist>";
    var headerlogo = estimate.getFieldValue("custbody_subsidiary_log");
    var footerlogotop = estimate.getFieldValue("custbody_subsidiary_top_foot");
    var footerlogobottom = estimate.getFieldValue("custbody_subsidiary_footer_bottom");

    if (headerlogo) {
        template += "        <macro id=\"nlheader\"> ";
        // template += "<img class=\"header\" style=\"width:95%;height:70%;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" height=\"70\%\" width=\"95\%\"  src = \"";
        // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
        // template += nlapiEscapeXML(path);
        // template += "\"></img>";
        template += "        </macro> ";
    }
    template += "<macro id=\"nlfooter\">";
    if (footerlogobottom) {
        // template += "<img class=\"footer\" style=\"width:96%; height:100%;top:77px;margin-left:-50px;\" height=\"100\%\" width=\"96\%\"  src = \"";
        // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
        // template += nlapiEscapeXML(path);
        // template += "\"></img>";
    }
    if (footerlogotop) {
        template += "<p style=\"top:-75px;font-size: 8pt;top:25px;width: 75%\" align=\"left\">${record.subsidiary}/${record.tranid}&nbsp;<#if record.entity.isperson?string == 'T'>${record.entity.altname}<#else>${record.entity.companyname}</#if></p>";
        template += "<p align=\"right\" style=\"top:-15px;font-size: 8pt;\">(Page <pagenumber/> of <totalpages/>)</p>";
        // template += "<img class=\"footer\" style=\"top:-20px;left:512px;margin-right:-40px;width:100%; height:100%;\" height=\"100\%\" width=\"96\%\"  src = \"";
        // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogotop).getURL();
        // template += nlapiEscapeXML(path);
        // template += "\"></img>";
    }
    template += "      </macro> ";
    template += "    </macrolist> " +
        "    <style type=\"text/css\">table " +
        "{            font-family: sans-serif; " +
        "            font-size: 10pt; " +
        "            table-layout: fixed; " +
        "        } " +
        "        th " +
        "{            font-weight: bold; " +
        "            font-size: 10pt; " +
        "            vertical-align: middle; " +
        "            padding: 5px 6px 3px; " +
        "            background-color: #e3e3e3; " +
        "            color: #000000; " +
        "        } " +
        "      td p { align:left; } " +
        "        b " +
        "{            font-weight: bold; " +
        "            color: #000000; " +
        "        } " +
        "        table.header td " +
        "{            padding: 0; " +
        "            font-size: 10pt; " +
        "        } " +
        "        table.footer td " +
        "{            padding: 0; " +
        "            font-size: 9pt; " +
        "        } " +
        "        table.itemtable th " +
        "{            padding-bottom: 10px; " +
        "            padding-top: 10px; " +
        "        } " +
        "        table.body td " +
        "{            padding-top: 2px; " +
        "        } " +
        "        table.total " +
        "{            page-break-inside: avoid; " +
        "        } " +
        "        tr.totalrow " +
        "{            background-color: #e3e3e3; " +
        "            line-height: 200%; " +
        "        } " +
        "        td.totalboxtop " +
        "{            font-size: 13pt; " +
        "            background-color: #e3e3e3; " +
        "        } " +
        "        td.addressheader " +
        "{            font-size: 9pt; " +
        "            padding-top: 6px; " +
        "            padding-bottom: 2px; " +
        "        } " +
        "        td.address " +
        "{            padding-top: 0; " +
        "        } " +
        "        td.totalboxmid " +
        "{            font-size: 29pt; " +
        "            padding-top: 20px; " +
        "            background-color: #e3e3e3; " +
        "        } " +
        "        td.totalboxbot " +
        "{            background-color: #e3e3e3; " +
        "            font-weight: bold; " +
        "        } " +
        ".border{           border-bottom: 1px solid black;" +
        "             border-left: 1px solid black;" +
        "              border-collapse: collapse; " +
        "        } " +
        "        span.title " +
        "{            font-size: 29pt; " +
        "        } " +
        "        span.number " +
        "{            font-size: 17pt; " +
        "        } " +
        "        span.itemname " +
        "{            font-weight: bold; " +
        "            line-height: 150%; " +
        "        } " +
        "        hr " +
        "{            width: 100%; " +
        "            color: #d3d3d3; " +
        "            background-color: #d3d3d3; " +
        "            height: 1px; " +
        "        } " +
        ".border{           border-bottom: 1px solid black;" +
        "             border-left: 1px solid black;" +
        "              border-collapse: collapse; " +
        "font-size:10px;}" +
        "</style> " +
        "</head> " +
        " <body style=\"font-family:sans-serif;background-color:#ffffff;\" header=\"nlheader\" footer-height=\"8%\" header-height=\"8%\" footer=\"nlfooter\" background-image-width=\"8.5in\" background-image-position=\"bottom center\" background-image-height=\"4in\"   size=\"Letter\" > " +
        "<#if record.subsidiary.custrecord_is_energy?string == 'Yes'> " +
        "<div style=\"min-height:1100px;\"> " +
        "  <table style=\"width:100%;font-size:12px;font-style: italic;\"> " +
        "    <tr><td style=\"width:100%;font-size:11px;\"><b>${record.salesrep.firstname} ${record.salesrep.lastname}</b><br/>${record.salesrep.title}<br/>${record.salesrep.email}<br/>T: ${record.custbody_office_phone}<br/>" +
        "F: ${record.salesrep.fax}<br/></td></tr> " +
        "  </table> " +
        "<hr /> " +
        "  <table style=\"width:100%;\"> " +
        "    <tr><td style=\"width:100%;font-size:12px;\">${record.trandate?string(\"d-MMM-yyyy\")}</td></tr> " +
        "    <tr><td style=\"width:100%;font-size:12px;\">M/s. <b>${record.entity.altname}</b></td></tr> " +
        "    <tr><td style=\"width:100%;font-size:12px;\">${record.entity.address}</td></tr> " +
        "  </table> " +
        "  <table style=\"width:100%;\"> " +
        "    <tr> " +
        "      <td style=\"width:8%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;background-color:#e8e8e9;\"><b>ATTN</b></td> " +
        "      <td style=\"width:42%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;\">${record.custbody_attention}</td> " +
        "      <td style=\"width:9%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;background-color:#e8e8e9;\"><b>PHONE</b></td> " +
        "      <td style=\"width:17%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;\">${record.entity.phone}</td> " +
        "      <td style=\"width:8%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;background-color:#e8e8e9;\"><b>FAX</b></td> " +
        "      <td style=\"width:15%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;border-right:solid 1px #000;\">${record.entity.fax}</td> " +
        "    </tr> " +
        "    <tr> " +
        "      <td style=\"width:8%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;border-bottom:solid 1px #000;background-color:#e8e8e9;\"><b>EMAIL</b></td> " +
        "      <td style=\"width:42%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;border-bottom:solid 1px #000;\">${record.custbody_email}</td> " +
        "      <td style=\"width:9%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;border-bottom:solid 1px #000;background-color:#e8e8e9;\"><b>MOBILE</b></td> " +
        "      <td style=\"width:17%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;border-bottom:solid 1px #000;\">${record.custbody_mobile_phone}</td> " +
        "      <td style=\"width:8%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;border-bottom:solid 1px #000;background-color:#e8e8e9;\"><b>&nbsp;" +
        "</b></td> " +
        "      <td style=\"width:15%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;border-bottom:solid 1px #000;border-right:solid 1px #000;\">&nbsp;" +
        "</td> " +
        "    </tr> " +
        "  </table> " +
        "   <table style=\"width:100%; margin-top:10px;\"> " +
        "    <tr> " +
        "      <td style=\"width:15%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;background-color:#e8e8e9;\"><b>SUBJECT</b></td> " +
        "      <td style=\"font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;border-right:solid 1px #000;\">${record.title}</td> " +
        "      </tr> " +
        "     <tr> " +
        "       <td style=\"width:15%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;background-color:#e8e8e9;border-bottom:solid 1px #000;\"><b>QUOTE REF#</b></td> " +
        "      <td style=\"font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;border-right:solid 1px #000;border-bottom:solid 1px #000;\">${record.tranid}</td> " +
        "    </tr> " +
        "    </table> " +
        "  <table style=\"width:100%;margin-top:10px;\"> " +
        "    <tr><td style=\"width:100%;font-size:12px;text-align:justify;\">${record.custbody_ed_introduction}</td></tr> " +
        "  </table> " +
        "</div> " +
        "   <table> " +
        "    <tr><td style=\"font-weight:bold;font-size:12px;\">1. EQUIPMENT HIRE CHARGES</td></tr> " +
        "  </table> " +
        "<#if record.item?has_content> " +
        "<table class=\"itemtable\" style=\"width: 100%; margin-top: 12px;\"><#list record.item as item><#if item_index==0> " +
        "<thead> " +
        "    <tr> " +
        "    <th colspan=\"12\">Equipment</th> " +
        "  <th align=\"center\" colspan=\"6\">Unit</th> " +
        "  <th align=\"center\" colspan=\"4\">Qty</th> " +
        "    <th align=\"right\" colspan=\"6\">Rate</th> " +
        "     <th align=\"right\" colspan=\"6\">Amount(${record.currency})</th> " +
        "  </tr> " +
        "</thead> " +
        "</#if><#if (item_index % 2) == 0><tr><#else><tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\"></#if> " +
        "    <td style=\"vertical-align:bottom;\" colspan=\"12\">${item.description}</td> " +
        "  <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"6\" line-height=\"150%\">${item.units}</td> " +
        "    <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"4\">${item.quantity}</td> " +
        "    <#if item.custcol_included_item?string == \"Yes\"><td style=\"vertical-align:bottom;\" align=\"right\" colspan=\"6\">Included</td><#else><td style=\"vertical-align:bottom;\" align=\"right\" colspan=\"6\">${item.rate?string[\"#,##0.00\"]}</td></#if> " +
        "   <#if item.custcol_included_item?string == \"Yes\"><td style=\"vertical-align:bottom;\" align=\"right\" colspan=\"6\">Included</td><#else><td style=\"vertical-align:bottom;\" align=\"right\" colspan=\"6\">${item.amount?string[\"#,##0.00\"]}</td></#if> " +
        "  </tr> " +
        "  </#list></table> " +
        "<hr /></#if> " +
        "   <table> " +
        "     <tr><td style=\"font-family:sans-serif;font-size:12px;font-weight:bold;\">Additional Remarks</td></tr> " +
        "    <tr><td style=\"font-family:sans-serif;font-size:12px;margin-bottom:10px;font-weight:bold;\">${record.custbody_special_notes}</td></tr> " +
        "  </table> " +
        "  <table style=\"width:100%;\"> " +
        "      <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "        <tr> " +
        "      <td style=\"font-size:12px;\"><b>2. PAYMENT TERMS</b><br/></td> " +
        "      </tr> " +
        "      <tr><td style=\"font-size:12px;\">${record.custbody_payment_terms}</td></tr> " +
        "      <tr><td style=\"font-size:12px;\">For delayed payment beyond agreed payment terms, Delayed penalty charge of 1% per month of outstanding amount shall be applicable.</td></tr> " +
        "      <#else> " +
        "        <tr> " +
        "      <td style=\"font-size:12px;\"><b>2. VAT </b>- Value added Tax of 5% shall be applicable for the above full quoted price as per the UAE Federal law effective from 1st Jan 2018.</td> " +
        "      </tr> " +
        "      </#if> " +
        "      <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "        <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "        <tr> " +
        "      <td style=\"font-size:12px;\"><b>3. VAT </b>- Value added Tax of 5% shall be applicable for the above full quoted price as per the UAE Federal law effective from 1st Jan 2018.</td> " +
        "      </tr> " +
        "      </#if> " +
        "  </table> " +
        "  <table> " +
        "    <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "   <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">4. PERIOD OF HIRE</td></tr> " +
        "     <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">3. PERIOD OF HIRE</td></tr> " +
        "     </#if> " +
        "    <tr><td style=\"font-size:12px;\">The minimum period of hire shall be <b>Min. ${record.custbody_period_of_hire}</b>. For any extra period of hire than the above quoted period, we shall charge you proportionately based on the applicable rate as above.</td></tr> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "   <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">5. SERVICES</td></tr> " +
        "      <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">4. SERVICES</td></tr> " +
        "     </#if> " +
        "    <tr><td style=\"font-size:12px;\">Routine services will be carried out by our service engineer at regular intervals. All service consumables will be supplied by us. Shutdown of our equipment at a mutually convenient time during the day working hours and free access to the site shall be provided for our service personnel.</td></tr> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "  <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">6. 24 HOURS HELPLINE</td></tr> " +
        "     <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">5. 24 HOURS HELPLINE</td></tr> " +
        "     </#if> " +
        "    <tr><td style=\"font-size:12px;\">AFER - Energy Division operate a 24 hours following telephone number: <b>800 272637</b></td></tr> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "   <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">7. REPLACEMENT</td></tr> " +
        "     <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">6. REPLACEMENT</td></tr> " +
        "     </#if> " +
        "    <tr><td style=\"font-size:12px;\">In the unlikely event that equipment needs to be replaced on site due to breakdown, <#if record.subsidiary.internalid?string == '10'>AFER<#else>AFI</#if> will ensure replacement equipment is supplied as soon as possible.</td></tr> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "   <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">8. RENTER’S RESPONSIBILITY</td></tr> " +
        "     <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">7. RENTER’S RESPONSIBILITY</td></tr> " +
        "     </#if> " +
        "    <tr><td style=\"font-size:12px;\">The Renter is responsible for checking on a daily basis the oil and water levels of the hired generator. All defects are to be reported to Seller immediately and without delay. Comprehensive Insurance for our equipment at site including Third Party Liability should be arranged by Hirer.The rental term shall commence immediately from the date of equipment delivery from our yard and completes on return of the equipments in our Depot in Jebel Ali / Abu Dhabi, UAE.</td></tr> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "  <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "      <tr><td  style=\"font-weight:bold;font-size:12px;\">9. VALIDITY</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">This quotation is valid for 30 days from the date of issuance. <b><i>The sale under this Proposal is subject to Equipment availability at the time of receiving a confirmed written commitment.</i></b></td></tr> " +
        "    <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">8. PAYMENT TERMS</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">${record.custbody_payment_terms}</td></tr> " +
        "     </#if> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:35px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "   <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "       <tr><td  style=\"font-weight:bold;font-size:12px;\">10. The Customer shall return all parts and equipment, packaged in the same manner as when it was delivered on Site at the start of the Hire Period. Should the Customer" +
        "return the Plant with damage that is not consistent with Fair Wear and Tear, the Customer shall be liable to Al Faris" +
        "for:</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">a) the full amount of any cost of repairs for the Plant, which Al Faris shall deem necessary;" +
        "and</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">b) Al Faris’s full hire charges for the Plant" +
        "while the Plant is idle owing to any such repairs or cost of replacement</td></tr> " +
        "      <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">9. VALIDITY</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">This quotation is valid for 30 days from the date of issuance. <b><i>The sale under this Proposal is subject to Equipment availability at the time of receiving a confirmed written commitment.</i></b></td></tr> " +
        "    </#if> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:15px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "  <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">11. TERMS AND CONDITIONS</td></tr> " +
        "    <tr><td style=\"font-size:11px;\"><b><i>This proposal is based on the terms stated herein and on the <#if record.subsidiary.internalid?string == '10'>AFER's<#else>AFI's</#if> standard rental terms and condition. A copy of which can be provided upon request.</i></b></td></tr> " +
        "    <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">10. The Customer shall return all parts and equipment, packaged in the same manner as when it was delivered on Site at the start of the Hire Period. Should the Customer" +
        "return the Plant with damage that is not consistent with Fair Wear and Tear, the Customer shall be liable to Al Faris" +
        "for:</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">a) the full amount of any cost of repairs for the Plant, which Al Faris shall deem necessary;" +
        "and</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">b) Al Faris’s full hire charges for the Plant" +
        "while the Plant is idle owing to any such repairs or cost of replacement</td></tr> " +
        "    </#if> " +
        "  </table> " +
        "  <table> " +
        "    <tr><td style=\"height:15px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "  <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'> " +
        "      <tr><td></td></tr> " +
        "      <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">11. TERMS AND CONDITIONS</td></tr> " +
        "    <tr><td style=\"font-size:11px;\"><b><i>This proposal is based on the terms stated herein and on the <#if record.subsidiary.internalid?string == '10'>AFER's<#else>AFI's</#if> standard rental terms and condition. A copy of which can be provided upon request.</i></b></td></tr> " +
        "    </#if> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:15px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "  <table style=\"width:100%;\"> " +
        "    <tr><td style=\"font-size:12px;\">We hope you find our offer in line with your requirements and look forward to" +
        "receive your most valued order.<br/> " +
        "Please do not hesitate to contact the undersigned for further clarifications.<br/> " +
        "Assuring you the best of our attention always,</td></tr> " +
        "  </table> " +
        "  <table> " +
        "    <#if record.custbody_subsidiary_legal_name?has_content><tr><td>On Behalf of <b><i>${record.custbody_subsidiary_legal_name}</i></b></td></tr><#else><tr><td>On Behalf of <b><i>${record.subsidiary.legalname}</i></b></td></tr></#if> " +
        "  </table> " +
        "<table> " +
        "    <tr><td style=\"height:25px;\">&nbsp;" +
        "</td></tr> " +
        "     <tr><td style=\"height:25px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "   <table style=\"width:100%;font-size:12px;font-style: italic;\"> " +
        "    <tr><td style=\"width:100%;font-size:12px;\"><b>${record.salesrep.firstname} ${record.salesrep.lastname}</b><br/>${record.salesrep.title}<br/>${record.salesrep.email}<br/>${record.salesrep.mobilephone}</td></tr> " +
        "  </table> " +
        "<#else> " +
        "<h4 align=\"center\" style=\"font-style:normal;\">QUOTATION / HIRE AGREEMENT</h4> " +
        " <table style=\"width:678px;margin-top:15px;\"> " +
        "    <tr> " +
        "    <td style=\"width:80px;\"><b>From</b></td><td style=\"width:215px;\">:&nbsp;" +
        "${record.salesrep.firstname} ${record.salesrep.lastname}</td> " +
        "    <#if record.entity.isperson?string == 'T'> " +
        "            <td style=\"width:45px;\"><b>To</b></td><td style=\"text-align:left;width:255px;\"> :&nbsp;" +
        "${record.entity.altname}</td> " +
        "            <#else> " +
        "            <td style=\"width:45px;\"><b>To</b></td><td style=\"text-align:left;width:255px;\"> :&nbsp;" +
        "${record.entity.companyname}</td> " +
        "          </#if> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:80px;\"><b>Quote No</b></td><td style=\"width:215px;\">:&nbsp;" +
        "${record.tranid}</td> " +
        "    <td style=\"width:45px;\"><b>Phone</b></td><td style=\"text-align:left;width:255px;\">:&nbsp;" +
        "${record.entity.phone} <b>&nbsp;" +
        "&nbsp;" +
        "Fax</b> :&nbsp;" +
        "${record.entity.fax}</td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:80px;\"><b>Date</b></td><td style=\"width:215px;\">:&nbsp;" +
        "${record.trandate?string(\"d-MMM-yyyy\")}</td> " +
        "    <td style=\"width:45px;\"><b>Attn.</b></td><td style=\"text-align:left;width:255px;\">:&nbsp;" +
        "${record.custbody_attention}</td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:80px;\"><b>Validity</b></td><td style=\"width:215px;\">:&nbsp;" +
        "${record.duedate?string(\"d-MMM-yyyy\")}</td> " +
        "    <td style=\"width:45px;\"><b>Site</b></td><td style=\"text-align:left;width:255px;\">:&nbsp;" +
        "${record.custbody_site}</td> " +
        "    </tr> " +
        "    <tr><td style=\"width:80px;\"><b>Subject</b></td><td> :&nbsp;" +
        "${record.title}</td> " +
        "    <td style=\"width:45px;\"><b>Currency</b></td><td style=\"text-align:left;width:255px;\">:&nbsp;" +
        "${record.currency}</td> " +
        "</tr> " +
        "    <tr><td style=\"width:80px;\"><b>Scope of work </b></td><td colspan=\"3\"> :&nbsp;${record.custbody_scope_of_work}</td></tr> " +
        "    </table> " +
        "    <table style=\"width:100%;margin-top:12px;\"><tr><td style=\"font-family: Open Sans, sans-serif;text-align: justify;\">${record.custbody_quote_intro_cd}</td></tr></table> " +
        "<#if record.item?has_content> ";
    if ("T" == estimate.getFieldValue("custbody_allow_lump_sum")) {
        template += "<table class=\"border\" style=\"width: 100%; margin-top: 12px; border: 1px solid black;\">";
        // nlapiLogExecution("DEBUG", "starting", "---");
        var lineCount = estimate.getLineItemCount('item');
        var lineGrpSum = 0;
        var DailyGrpSum = 0;
        var WeeklyGrpSum = 0;
        var MonthlyGrpSum = 0;
        var TotalAmount = 0;
        var OthersList = [];
        var k = 0;
        var j = 0;
        var count = 0;
        if (lineCount > 0) {
            for (var i = 1; i <= lineCount; i++) {
                var groupType = estimate.getLineItemValue('item', 'itemtype', i);
                var itemInGroup = estimate.getLineItemValue('item', 'ingroup', i);
                var unitPrice = estimate.getLineItemValue('item', 'grossamt', i);
                var dailyRate = estimate.getLineItemValue('item', 'custcol_pref_daily_rate', i);
                var monthlyRate = estimate.getLineItemValue('item', 'custcol_pref_monthly_rate', i);
                var amount = estimate.getLineItemValue('item', 'amount', i);
                var weeklyRate = estimate.getLineItemValue('item', 'custcol_pref_weekly_rate', i);
                var nonPosting = estimate.getLineItemValue('item', 'custcol_non_posting_assets', i);
                var itemType = estimate.getLineItemValue('item', 'custcol_rent_item_type', i);

                // if (nonPosting != "T") {
                if (groupType == "Description") {
                    count++;
                    if (count == 2) {
                        var nextitem = 1;
                    }
                }
                if (groupType != "Description" && count == 1 && itemType != 5 && nonPosting != "T") {
                    TotalAmount = +TotalAmount + +amount;
                    lineGrpSum = +lineGrpSum + +unitPrice;
                }
                if (itemType == 5) {
                    OthersList[k++] = i;
                }
                if (i == 1) {
                    template += "<thead> " +
                        " <tr> " +
                        "    <th  colspan=\"10\" style=\"font-size:10px;border-bottom: 1px solid;\">Details</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"3\">Unit</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"3\">Amount</th> " +
                        // "  <th align=\"center\"  colspan=\"9\">Preffered Rental Rates</th> " +
                        // "     <th align=\"right\" colspan=\"6\">GrossAmount</th> " +
                        "  </tr> " +
                        "</thead> ";

                    // "  <tr> " +
                    // "    <th colspan=\"10\"></th> " +
                    // "  <th align=\"center\"  colspan=\"3\"></th> " +
                    // // "  <th align=\"center\"  colspan=\"3\">Daily</th> " +
                    // // "  <th align=\"center\"  colspan=\"3\">Weekly</th> " +
                    // // "  <th align=\"center\"  colspan=\"3\">Monthly</th> " +
                    // "     <th align=\"right\"  colspan=\"6\"></th> " +
                    // "  </tr> ";
                }
                if (j % 2 == 0) {
                    template += "<tr>";
                } else {
                    template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                }

                if ((nextitem == 1 || i == lineCount) || nonPosting == "T") {
                    nlapiLogExecution("DEBUG", "11111");
                    template += "    <td style=\"vertical-align:bottom;\" colspan=\"10\">" + replaceAndOper(lumpdescription(removeNull(iteamName))) + "</td> " +
                        "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"3\" line-height=\"150%\">LS</td> " +
                        // "  <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"3\" line-height=\"150%\">" + DailyGrpSum.toFixed(2) + "</td> " +
                        // "  <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"3\" line-height=\"150%\">" + WeeklyGrpSum.toFixed(2) + "</td> " +
                        // "  <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"3\" line-height=\"150%\">" + MonthlyGrpSum.toFixed(2) + "</td> " +
                        "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"3\" line-height=\"150%\">" + numberWithCommas(TotalAmount.toFixed(2)) + "</td> ";
                    // "  <td style=\"vertical-align:bottom;\" align=\"right\" colspan=\"6\">" + lineGrpSum.toFixed(2) + "</td> ";
                    TotalAmount = 0;
                    lineGrpSum = 0;
                    // DailyGrpSum = 0;
                    // WeeklyGrpSum = 0;
                    // MonthlyGrpSum = 0;
                    iteamName = 0;
                    count--;
                    nextitem = 0;
                    j++;
                }
                template += "  </tr> ";
                if (groupType == "Description") {
                    var iteamName = estimate.getLineItemValue('item', 'description', i);
                }
                // }
            }
        }
        template += "</table><hr />";
        if (OthersList.length > 0) {
            var x = 1;
            template += "<table  class=\"border\" style=\"width: 100%; border: 1px solid black; margin-top: 12px\">";
            template += "<thead> " +
                "  <tr> " +
                "  <th align=\"left\"  style=\"border-bottom: 1px solid;font-size:10px;\" colspan=\"29\">Other</th> " +
                "  </tr> " +
                "</thead> " +
                "  <tr> " +
                "    <th colspan=\"2\" align=\"center\" style=\"font-size:10px;border-bottom: 1px solid;\">SN.</th> " +
                "    <th colspan=\"17\" align=\"center\" style=\"font-size:10px;border-left: 1px solid;border-bottom: 1px solid;\">Details</th> " +
                "  <th align=\"center\" colspan=\"5\" style=\"border-bottom: 1px solid;border-left: 1px solid;font-size:10px;\" >Unit</th> " +
                "  <th align=\"center\" colspan=\"5\" style=\"border-bottom: 1px solid;border-left: 1px solid;font-size:10px;\" >Amount</th> " +
                "  </tr> ";
            for (var i = 0; i < OthersList.length; i++) {
                var iteamName = estimate.getLineItemValue('item', 'description', OthersList[i]);
                var billing_rule_display = estimate.getLineItemValue('item', 'custcol_rent_billing_rule_display', OthersList[i]);
                var amount = estimate.getLineItemValue('item', 'amount', OthersList[i]);

                template += "<tr>";
                template += "    <td  align=\"center\" colspan=\"2\">" + x++ + "</td> " +
                    "    <td style=\"border-left: 1px solid;\" colspan=\"17\">" + replaceAndOper(lumpdescription(removeNull(iteamName))) + "</td> " +
                    "  <td style=\"border-left: 1px solid;\" align=\"center\" colspan=\"5\" line-height=\"150%\">" + removeNull(billing_rule_display) + "</td> " +
                    "  <td style=\"border-left: 1px solid;\" align=\"center\" colspan=\"5\">" + numberWithCommas(amount) + "</td> ";
                template += "  </tr> ";
            }
            template += "</table><hr />";

        }
    } else {
        template += "<#if record.item?has_content> ";
        var lineCount = estimate.getLineItemCount('item');
        var lineGrpSum = 0;
        var otherCount = 0;
        var OthersList = [];
        var k = 0;
        var y = 1;
        var billingRuleflag = 0;
        var flag = 0;
        if (lineCount > 0) {
            template += "<table  class=\"border\" style=\"width: 100%; border: 1px solid black; margin-top: 12px\">";
            for (var i = 1; i <= lineCount; i++) {
                // nlapiLogExecution("DEBUG", "aa", i);
                if (i == 1) {


                    template += "<thead> " +
                        "  <tr> " +
                        "    <th colspan=\"2\" ></th> " +
                        "    <th colspan=\"7\"  style=\"border-left: 1px solid;\"></th> " +
                        // "  <th align=\"center\"  style=\"border-left: 1px solid;\"  colspan=\"2\"></th> " +
                        // "  <th align=\"center\"  style=\"border-left: 1px solid;\" colspan=\"2\"></th> " +
                        // "  <th align=\"center\"  style=\"border-left: 1px solid;\" colspan=\"4\"></th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"20\">Rental Rates</th> " +
                        // "  <th align=\"center\"  colspan=\"3\">Amount</th> " +
                        // "     <th align=\"left\"  colspan=\"3\">Gross &nbsp;&nbsp; Amount &nbsp;AED</th> " +
                        "  </tr> " +
                        "</thead> " +

                        "  <tr> " +
                        "    <th colspan=\"2\" align=\"center\" style=\"font-size:10px;\">SN.</th> " +
                        "    <th colspan=\"7\" align=\"center\" style=\"font-size:10px;border-left: 1px solid;\">Details</th> " +
                        // "  <th align=\"center\" colspan=\"2\" style=\"border-left: 1px solid;font-size:10px;\" >Unit</th> " +
                        // "  <th align=\"center\" colspan=\"2\" style=\"border-left: 1px solid;\">Min hrs.</th> " +
                        // "  <th align=\"right\"  colspan=\"4\" style=\"border-left: 1px solid;\">No.of Days</th> " +
                        "  <th align=\"center\" class=\"border\" style=\"border-bottom: 1px solid;\" colspan=\"5\" >Hourly</th> " +
                        "  <th align=\"center\" class=\"border\" style=\"border-bottom: 1px solid;\" colspan=\"5\" >Daily</th> " +
                        "  <th align=\"center\" class=\"border\" style=\"border-bottom: 1px solid;\" colspan=\"5\" >Weekly</th> " +
                        "  <th align=\"center\" class=\"border\" style=\"border-bottom: 1px solid;\" colspan=\"5\" >Monthly</th> " +
                        // "     <th align=\"right\"  colspan=\"3\" style=\" margin-top:-25px;\"></th> " +
                        // "     <th align=\"right\"  colspan=\"3\" ></th> " +
                        "  </tr> " +

                        "  <tr> " +
                        "    <th colspan=\"2\" style=\"border-bottom: 1px solid;\"></th> " +
                        "    <th colspan=\"7\" style=\"border-bottom: 1px solid;border-left: 1px solid;\"></th> " +
                        // "  <th align=\"center\"   colspan=\"2\" style=\"border-left: 1px solid;border-bottom: 1px solid;\"></th> " +
                        // "  <th align=\"center\"  colspan=\"2\" style=\"border-left: 1px solid;border-bottom: 1px solid;\"></th> " +
                        // "  <th align=\"right\"  colspan=\"4\" style=\"border-left: 1px solid;border-bottom: 1px solid;\"></th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"3\" >Rate</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"1\" >Dy</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"1\" >Hr</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"3\" >Rate</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"1\" >Dy</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"1\" >Hr</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"3\">Rate</th> " +
                        "  <th align=\"center\" class=\"border\"  colspan=\"1\" >Dy</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"1\" >Hr</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"3\">Rate</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"1\" >Dy</th> " +
                        "  <th align=\"center\" class=\"border\" colspan=\"1\" >Hr</th> " +
                        // "  <th align=\"right\"  colspan=\"3\" style=\" margin-top:-15px;\"></th> " +
                        // "  <th align=\"left\"  colspan=\"3\" style=\" margin-top:-15px;\"></th> " +
                        "  </tr> ";
                }

                var groupType = estimate.getLineItemValue('item', 'itemtype', i);
                var description = estimate.getLineItemValue('item', 'description', i);
                var itemType = estimate.getLineItemValue('item', 'custcol_rent_item_type', i);
                var units = estimate.getLineItemText('item', 'custcol_rent_rental_unit', i);
                var rate = estimate.getLineItemValue('item', 'grossamt', i);
                var amount = estimate.getLineItemValue('item', 'amount', i);
                var unitRate = estimate.getLineItemValue('item', 'rate', i);
                var noofdays = estimate.getLineItemValue('item', 'custcol_noofdays', i);
                var billingId = estimate.getLineItemValue('item', 'custcol_rent_billing_rule', i);
                var hourlyRate = estimate.getLineItemValue('item', 'custcol_preffered_hourly_rate', i);
                var dailyRate = estimate.getLineItemValue('item', 'custcol_pref_daily_rate', i);
                var monthlyRate = estimate.getLineItemValue('item', 'custcol_pref_monthly_rate', i);
                var weeklyRate = estimate.getLineItemValue('item', 'custcol_pref_weekly_rate', i);
                var hourlyHours = estimate.getLineItemValue('item', 'custcol_preffered_hourly_hours', i);
                var dailyHours = estimate.getLineItemValue('item', 'custcol_preffered_daily_hours', i);
                var monthlyHours = estimate.getLineItemValue('item', 'custcol_preffered_monthly_hours', i);
                var weeklyHours = estimate.getLineItemValue('item', 'custcol_preffered_weekly_hours', i);
                var hourlydays = estimate.getLineItemValue('item', 'custcol_preffered_hourly_days', i);
                var dailydays = estimate.getLineItemValue('item', 'custcol_preffered_daily_days', i);
                var monthlydays = estimate.getLineItemValue('item', 'custcol_preffered_monthly_days', i);
                var weeklydays = estimate.getLineItemValue('item', 'custcol_preffered_weekly_days', i);
                var is_individual_item = estimate.getLineItemValue('item', 'custcol_is_individual_item', i);
                var rental_unit = estimate.getLineItemText('item', 'custcol_rent_rental_unit', i);
                var billingRule = estimate.getLineItemValue('item', 'custcol_rent_billing_rule', i);
                var nonPosting = estimate.getLineItemValue('item', 'custcol_non_posting_assets', i);
                if (nonPosting != "T") {
                    var itemID = estimate.getLineItemValue('item', 'item', i);
                    var billing_rule = "";
                    if (rental_unit == "Daily") {
                        var filter = new Array();
                        filter[0] = new nlobjSearchFilter('internalid', null, 'anyof', billingRule);
                        var col = new Array();
                        col[0] = new nlobjSearchColumn('name', null, null);
                        var billing_ruleResult = nlapiSearchRecord('customrecord_rent_billing_rule', null, filter, col);
                        if (billing_ruleResult) {
                            billing_rule = billing_ruleResult[0].getValue("name", null, null);
                        }
                        nlapiLogExecution("DEBUG", "billing_rule" + i, billing_rule);
                    }

                    if (hourlyRate == null) {
                        hourlyRate = "-NA-";
                        hourlydays = "-";
                        hourlyHours = "-";
                    } else {
                        hourlyRate = numberWithCommas(hourlyRate);
                    }
                    if (dailyRate == null) {
                        dailyRate = "-NA-";
                        dailydays = "-";
                        dailyHours = "-";
                    } else {
                        dailyRate = numberWithCommas(dailyRate);
                    }
                    if (weeklyRate == null) {
                        weeklyRate = "-NA-";
                        weeklydays = "-";
                        weeklyHours = "-";
                    } else {
                        weeklyRate = numberWithCommas(weeklyRate);
                    }
                    if (monthlyRate == null) {
                        monthlyRate = "-NA-";
                        monthlydays = "-";
                        monthlyHours = "-";
                    } else {
                        monthlyRate = numberWithCommas(monthlyRate);
                    }
                    if ((groupType != "Service" && is_individual_item != "T") || billing_rule == "Trip" || rental_unit == "One-Time" || (flag == 1 && is_individual_item != "T")) {
                        OthersList[k++] = i;
                        flag = 1;
                        billingRuleflag = 1;
                        // nlapiLogExecution("DEBUG", "iiiiiii", i);
                        // nlapiLogExecution("DEBUG", "is_individual_item", is_individual_item);
                    }
                    if (billing_rule == "Trip" || itemType == 5 || is_individual_item == "T" || rental_unit == "One-Time") {
                        flag = 0;
                    }
                    if (((groupType == "Service" && billing_rule != "Trip" && rental_unit != "One-Time")) && flag == 0) {
                        if (y % 2 != 0) {
                            template += "<tr>";
                        } else {
                            template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                        }
                        // var billingRule = nlapiLoadRecord('customrecord_rent_billing_rule', billingId);
                        // var MinHrs = billingRule.getFieldValue('custrecord_rent_billing_hours_per_day');
                        // var MinDays = billingRule.getFieldValue('custrecord_rent_billing_days');
                        template += "    <td style=\"vertical-align:bottom;\" colspan=\"2\" align=\"center\" >" + (y++) + "</td> ";
                        template += "    <td style=\"vertical-align:bottom;border-left: 1px solid;\" colspan=\"7\">" + replaceAndOper(lumpdescription(removeNull(description))) + "</td> ";
                        // "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"2\" line-height=\"150%\">" + removeNull(units) + "</td> ";
                        // template += "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"2\">" + removeNull(MinHrs) + "</td> " +
                        // "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"4\">" + removeNull(noofdays) + "</td> " +
                        template += "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"3\">" + hourlyRate + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"1\">" + removeNull(hourlydays) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"1\">" + removeNull(hourlyHours) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"3\">" + dailyRate + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"1\">" + removeNull(dailydays) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"1\">" + removeNull(dailyHours) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"3\">" + weeklyRate + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"1\">" + removeNull(weeklydays) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"1\">" + removeNull(weeklyHours) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"3\">" + monthlyRate + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"1\">" + removeNull(monthlydays) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"1\">" + removeNull(monthlyHours) + "</td> " +
                            "  </tr> ";
                        //"  <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"3\">" + removeNull(amount) + "</td> " +
                        // "  <td style=\"vertical-align:bottom;\" align=\"right\" colspan=\"3\">" + removeNull(rate) + "</td> " +

                        // } else if (flag == 1) {
                        //     template += "<td  colspan=\"29\" style=\"border-top: 1px solid ;margin-bottom:-3px;\"></td> ";
                        //     template += "</tr>";
                        //     if (otherCount == 0) {
                        //         otherCount++;
                        //         template += "<tr><td  colspan=\"14\" style=\"margin-left:-3px;border-left: 5px solid white;border-right: 5px solid white;\">&nbsp;</td> ";
                        //         template += "<td  colspan=\"15\" style=\"margin-right:-3px;border-left: 5px solid white;border-right: 5px solid white;\">&nbsp;</td> ";
                        //         template += "</tr>";
                        //         template += " <tr> " +
                        //             "    <th colspan=\"29\" style=\"border-top: 1px solid;font-size:10px;\">Other</th> " +
                        //             "  </tr> ";
                        //         nlapiLogExecution("DEBUG", "testing1", description);
                        //         template += " <tr> " +
                        //             "    <th align=\"left\" style=\"border-top: 1px solid;border-bottom: 1px solid;font-size:10px;\" colspan=\"2\">SL No.</th> " +
                        //             "    <th align=\"left\" style=\"border-left: 1px solid;border-top: 1px solid;border-bottom: 1px solid;font-size:10px;\" colspan=\"13\">Details</th> " +
                        //             "  <th align=\"center\"  style=\"border-left: 1px solid;border-bottom: 1px solid;border-top: 1px solid;font-size:10px;\"  colspan=\"7\">Unit</th> " +
                        //             "  <th align=\"center\"  style=\"border-left: 1px solid;border-bottom: 1px solid;border-top: 1px solid;font-size:10px;\" colspan=\"7\">Amount</th> " +
                        //             "  </tr> ";
                        //     }
                        //     template += "<tr>";
                        //     // } else {
                        //     //     template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                        //     // }
                        //     // k++;
                        //     template += "  <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"2\">" + otherCount + "</td> ";
                        //     template += "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"13\">" + description + "</td> " +
                        //         "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"7\">" + removeNull(units) + "</td> " +
                        //         "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"7\">" + removeNull(unitRate) + "</td> " +
                        //         "  </tr> ";
                    }
                }
            }
            template += " </table> ";
            // nlapiLogExecution("DEBUG", " OthersList.length", OthersList.length);
            // for (var i = 0; i < OthersList.length; i++) {
            //     nlapiLogExecution("DEBUG", " OthersList.length", OthersList[i]);

            // }
            if (flag == 1 || billingRuleflag == 1) {
                var TotalAmount = 0;
                var goback = 0;
                template += "<table  class=\"border\" style=\"width: 100%; border: 1px solid black; margin-top: 12px\">";

                template += "<thead> " +
                    "  <tr> " +
                    "  <th align=\"left\"  style=\"border-bottom: 1px solid;font-size:10px;\" colspan=\"29\">Other</th> " +
                    "  </tr> " +
                    "</thead> " +
                    "  <tr> " +
                    "    <th colspan=\"2\" align=\"center\" style=\"font-size:10px;border-bottom: 1px solid;\">SN.</th> " +
                    "    <th colspan=\"17\" align=\"center\" style=\"font-size:10px;border-left: 1px solid;border-bottom: 1px solid;\">Details</th> " +
                    "  <th align=\"center\" colspan=\"5\" style=\"border-bottom: 1px solid;border-left: 1px solid;font-size:10px;\" >Unit</th> " +
                    "  <th align=\"center\" colspan=\"5\" style=\"border-bottom: 1px solid;border-left: 1px solid;font-size:10px;\" >Amount</th> " +
                    "  </tr> ";
                var count = 0;
                var m = 1;
                for (var i = 0; i < OthersList.length; i++) {
                    var billingRule = estimate.getLineItemValue('item', 'custcol_rent_billing_rule', OthersList[i]);
                    var itemType = estimate.getLineItemValue('item', 'custcol_rent_item_type', OthersList[i]);

                    var rental_unit = estimate.getLineItemText('item', 'custcol_rent_rental_unit', OthersList[i]);
                    var is_individual_item = estimate.getLineItemValue('item', 'custcol_is_individual_item', OthersList[i]);
                    var itemID = estimate.getLineItemValue('item', 'item', OthersList[i]);
                    var billing_rule = "";
                    if (rental_unit == "Daily") {
                        var filter = new Array();
                        filter[0] = new nlobjSearchFilter('internalid', null, 'anyof', billingRule);
                        var col = new Array();
                        col[0] = new nlobjSearchColumn('name', null, null);
                        var billing_ruleResult = nlapiSearchRecord('customrecord_rent_billing_rule', null, filter, col);
                        if (billing_ruleResult) {
                            billing_rule = billing_ruleResult[0].getValue("name", null, null);
                        }
                        nlapiLogExecution("DEBUG", "billing_rule", billing_rule);
                    }
                    if (count == 1 && (is_individual_item == "" || is_individual_item == "T")) {
                        if (m % 2 != 0) {
                            template += "<tr>";
                        } else {
                            template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                        }
                        if (units == "")
                            units = "LS";

                        // nlapiLogExecution("DEBUG", "decprint", i);
                        nlapiLogExecution("DEBUG", "22222");

                        template += "    <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"2\">" + m++ + "</td> " +
                            "    <td style=\"vertical-align:bottom;border-left: 1px solid;\" colspan=\"17\">" + replaceAndOper(lumpdescription(removeNull(iteamName))) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"5\" line-height=\"150%\">" + removeNull(units) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"5\">" + numberWithCommas(TotalAmount.toFixed(2)) + "</td> ";
                        // nlapiLogExecution("DEBUG", "inside", count);
                        template += "  </tr> ";
                        TotalAmount = 0;
                        lineGrpSum = 0;
                        iteamName = 0;
                        count = 0;
                        goback = 0;
                        nextitem = 0;
                        j++;
                    }
                    var groupType = estimate.getLineItemValue('item', 'itemtype', OthersList[i]);
                    var billing_rule_display = estimate.getLineItemValue('item', 'custcol_rent_billing_rule_display', OthersList[i]);
                    var itemInGroup = estimate.getLineItemValue('item', 'ingroup', OthersList[i]);
                    var unitPrice = estimate.getLineItemValue('item', 'grossamt', OthersList[i]);
                    var itemType = estimate.getLineItemValue('item', 'custcol_rent_item_type', OthersList[i]);
                    var dailyRate = estimate.getLineItemValue('item', 'custcol_pref_daily_rate', OthersList[i]);
                    var monthlyRate = estimate.getLineItemValue('item', 'custcol_pref_monthly_rate', OthersList[i]);
                    var amount = estimate.getLineItemValue('item', 'amount', OthersList[i]);
                    var weeklyRate = estimate.getLineItemValue('item', 'custcol_pref_weekly_rate', OthersList[i]);
                    var is_individual_item = estimate.getLineItemValue('item', 'custcol_is_individual_item', OthersList[i]);
                    var rental_unit = estimate.getLineItemText('item', 'custcol_rent_rental_unit', OthersList[i]);

                    if (count != 1) {
                        var iteamName = estimate.getLineItemValue('item', 'description', OthersList[i]);
                        var units = estimate.getLineItemText('item', 'custcol_rent_rental_unit', OthersList[i]);
                    }
                    var unitRate = estimate.getLineItemValue('item', 'rate', OthersList[i]);
                    // nlapiLogExecution("DEBUG", "unitRate", unitRate);

                    if (groupType == "Description") {
                        count++;
                        unitRate = 0;
                        if (count == 2) {
                            var nextitem = 1;
                        }
                    }
                    nlapiLogExecution("DEBUG", "OthersList[i]", OthersList[i]);
                    nlapiLogExecution("DEBUG", "groupType", groupType);
                    nlapiLogExecution("DEBUG", "count", count);
                    nlapiLogExecution("DEBUG", "is_individual_item", is_individual_item);

                    if (groupType != "Description" && count == 1 && is_individual_item == "F") {
                        // nlapiLogExecution("DEBUG", "unitRate", unitRate);
                        TotalAmount = +TotalAmount + +unitRate;
                        billing_rule_display = "LS";
                        // lineGrpSum = +lineGrpSum + +unitPrice;
                    }
                    if (billing_rule_display == null) {
                        billing_rule_display = "LS";
                    }
                    if (count == 0) {
                        TotalAmount = unitRate;
                    }
                    if (count == 1) {

                    }
                    // if ((billing_rule == "Trip" || rental_unit == "One-Time") && count == 0) {
                    //     TotalAmount = amount;
                    // }

                    if ((nextitem == 1 || i == (OthersList.length - 1)) || (billing_rule == "Trip" && count == 0) || (rental_unit == "One-Time" && count == 0) || is_individual_item == "T") {
                        nlapiLogExecution("DEBUG", "33333");
                        // nlapiLogExecution("DEBUG", "decprint", i);
                        if (m % 2 != 0) {
                            template += "<tr>";
                        } else {
                            template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                        }
                        template += "    <td  align=\"center\" colspan=\"2\">" + m++ + "</td> " +
                            "    <td style=\"border-left: 1px solid;\" colspan=\"17\">" + replaceAndOper(lumpdescription(removeNull(iteamName))) + "</td> " +
                            "  <td style=\"border-left: 1px solid;\" align=\"center\" colspan=\"5\" line-height=\"150%\">" + removeNull(billing_rule_display) + "</td> " +
                            "  <td style=\"border-left: 1px solid;\" align=\"center\" colspan=\"5\">" + numberWithCommas(Number(TotalAmount).toFixed(2)) + "</td> ";
                        // nlapiLogExecution("DEBUG", "inside", count);
                        template += "  </tr> ";

                        TotalAmount = 0;
                        lineGrpSum = 0;
                        iteamName = 0;
                        if (count > 0)
                            count--;
                        goback = 0;
                        nextitem = 0;
                        j++;
                    }
                    if (groupType == "Description") {
                        var iteamName = estimate.getLineItemValue('item', 'description', OthersList[i]);
                    }
                }
                template += " </table> ";
            }
        }
        template += "<hr /></#if> ";
    }
    template += "</#if>" +
        "<table style=\"width:100%; margin-top:10px;\"><tr><td><b style=\"color:#000;font-family: Open Sans, sans-serif;font-size: 12px;\">Payment Terms</b>: ${record.terms}</td></tr></table> " +
        "   <#if record.custbody_special_notes?has_content> " +
        "   <table style=\"width:100%; margin-top:10px;\"> " +
        "     <tr> " +
        "    <td style=\"color:#000;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;\">Special Terms</td> " +
        "  </tr> " +
        "        <tr><td>${record.custbody_special_notes}</td></tr> " +
        "    </table> " +
        "  </#if> " +
        "  <#if record.custbody_notes_terms?has_content> " +
        "   <table style=\"width:100%; margin-top:10px;\"> " +
        "     <tr> " +
        "    <td style=\"color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;\">Notes Terms</td> " +
        "  </tr> " +
        "      <#list record.custbody_notes_terms?split(\"|_|\") as x> " +
        "        <tr><td>${x_index+1}. ${x}</td></tr> " +
        "      </#list> " +
        "    </table> " +
        "  </#if> " +
        "  <#if record.custbody_inclusions_terms?has_content> " +
        "   <table style=\"width:100%; margin-top:10px;\"> " +
        "     <tr> " +
        "    <td style=\"color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;\">Inclusions Terms</td> " +
        "  </tr> " +
        "      <#list record.custbody_inclusions_terms?split(\"|_|\") as x> " +
        "        <tr><td>${x_index+1}. ${x}</td></tr> " +
        "      </#list> " +
        "     " +
        "    </table> " +
        "  </#if> " +
        "  <#if record.custbody_exclusion_terms?has_content> " +
        "   <table style=\"width:100%; margin-top:10px;\"> " +
        "     <tr> " +
        "    <td style=\"color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;\">Exclusions Terms</td> " +
        "  </tr> " +
        "      <#list record.custbody_exclusion_terms?split(\"|_|\") as x> " +
        "        <tr><td>${x_index+1}. ${x}</td></tr> " +
        "      </#list> " +
        "    </table> " +
        "  </#if> " +
        "<table style=\"width:100%;margin-top:10px;\"> " +
        "  <tr><td>We hereto have agreed and accept this agreement inclusive of the terms and conditions (attached) on the _______ day of _______ , 20___</td></tr> " +
        "  </table> " +
        "   " +
        "  <table style=\"width:100%;margin-top:20px;\"> " +
        "  <tr><td style=\"width:50%;\"><b>For ${record.subsidiary.legalname}</b><br />(As Owner)<br /><br /><br /><b>${record.salesrep.salutation} ${record.salesrep.firstname} ${record.salesrep.lastname}</b><br />${record.salesrep.title}<br />${record.salesrep.email}<br />${record.salesrep.mobilephone}</td> " +
        "  <td style=\"width:50%;\"><b>Agreed and Accepted by:</b><br/>(As Hirer)<br/><br/><br/>__________________________________________<br />For <#if record.entity.isperson?string == 'T'>            <b>${record.entity.altname}</b><#else><b>${record.entity.companyname}</b></#if><br />(Signature and Stamp)</td></tr> " +
        "  </table> " +
        "</#if> ";

    // template += "  <#if record.custbody_general_trms_cndtns?string != 'Yes' && record.custbody_transport_trms_cndtns?string != 'Yes'> " +
    //     "  <table style=\"width:100%;margin-top:20px;\"> " +
    //     "                  <tr><td style=\"width:50%;font-weight:bold;\"><b>For ${record.subsidiary.legalname}</b><br />(As Company)<br /><br /><br /><br/>____________________________________<br/><br/><br/><br/><br/>Date :</td><td style=\"width:50%;font-weight:bold;\"><b>Agreed &amp; Accepted by:</b><br/>(As Owner/Customer)<br/><br/><br/><br/>____________________________________<br/>For <#if record.entity.companyname?has_content>${record.entity.companyname}<#else>${record.entity.altname}</#if><br/><br/>(Signature &amp; Stamp)<br/><br/>Date :</td></tr> " +
    //     "                </table> ";
    // template += "  </#if> ";


    //terms and condition----------
    var standardTerms = nlapiLoadRecord("customrecord_standard_terms_and_cond", 1);
    var terms1 = standardTerms.getFieldValue("custrecord_stan_condi_term1");
    var terms2 = standardTerms.getFieldValue("custrecord_stan_condi_term2");
    var terms3 = standardTerms.getFieldValue("custrecord_stan_condi_term3");
    var terms4 = standardTerms.getFieldValue("custrecord_stan_condi_term4");
    // nlapiLogExecution("DEBUG", "terms1", terms2);
    template += "  <#if record.custbody_general_trms_cndtns?string == 'Yes'> " +
        "    <table style=\"width:100%;margin-top:10px;\"> " +
        "                    <tbody> " +
        "                      <tr> " +
        "                        <td> " +
        "                          <table> " +
        "                            <tbody> " +
        "                              <tr> " +
        "                                <td align=\"center\" colspan=\"2\"> " +
        "                                  <p><span style=\"font-size:13px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions</span></strong></span></p> " +
        "                                </td> " +
        "                              </tr> " +
        "                              <tr> " +
        "                                <td> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8.5px;\">" + relaceCharector(terms1) + "</span></p> " +
        "                                </td> " +
        "                              </tr> " +
        "                            </tbody> " +
        "                          </table> " +
        "                        </td> " +
        "                      </tr> " +
        "                    </tbody> " +
        "                  </table> " +
        "                  <table style=\"width:100%;margin-top:10px;\"> " +
        "                    <tbody> " +
        "                      <tr> " +
        "                        <td> " +
        "                          <table> " +
        "                            <tbody> " +
        "                              <tr> " +
        "                                <td> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8.5px;\">" + relaceCharector(terms2) + "</span></p> " +
        "                                </td> " +
        "                              </tr> " +
        "                            </tbody> " +
        "                          </table> " +
        "                        </td> " +
        "                      </tr> " +
        "                    </tbody> " +
        "                  </table> " +
        "                  <table style=\"width:100%;margin-top:10px;\"> " +
        "                    <tbody> " +
        "                      <tr> " +
        "                        <td> " +
        "                          <table> " +
        "                            <tbody> " +
        "                               " +
        "                              <tr> " +
        "                                <td> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8.5px;\">" + relaceCharector(terms3) + "</span></p> " +

        "                                </td> " +
        "                              </tr> " +
        "                            </tbody> " +
        "                          </table> " +
        "                        </td> " +
        "                      </tr> " +
        "                    </tbody> " +
        "                  </table> " +
        "                  <table style=\"width:100%;margin-top:10px;\"> " +
        "                    <tbody> " +
        "                      <tr> " +
        "                        <td> " +
        "                          <table> " +
        "                            <tbody> " +
        "                               " +
        "                              <tr> " +
        "                                <td> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8.5px;\">" + relaceCharector(terms4) + "</span></p> " +

        "                                </td> " +
        "                              </tr> " +
        "                            </tbody> " +
        "                          </table> " +
        "                        </td> " +
        "                      </tr> " +
        "                    </tbody> " +
        "                  </table> " +
        "                  <#if record.subsidiary.internalid?string == '9'><!--AFER--> " +
        "                  <table style=\"width:100%;margin-top:20px;\"> " +
        "                  <tr><td style=\"width:50%;\"><b>For ${record.subsidiary.legalname}</b><br />(As \"Owner\")<br /><br /><br /><b>${record.salesrep.salutation} ${record.salesrep.firstname} ${record.salesrep.lastname}</b><br />${record.salesrep.title}<br />${record.salesrep.email}<br />${record.salesrep.mobilephone}<br/><br/>Date :</td><td style=\"width:50%;\"><b>Agreed and Accepted by:</b><br/>(As \"Hirer\")<br/><br/><br/>__________________________________________<br />For <#if record.entity.isperson?string == 'T'>            <b>${record.entity.altname}</b><#else><b>${record.entity.companyname}</b></#if><br />(Signature and Stamp)<br/><br/>Date :</td></tr> " +
        "                </table> " +
        // "                    </#if> " +
        "                  <#elseif record.subsidiary.internalid?string == '6'><!--AFIHER--> " +
        "                  <table style=\"width:100%;margin-top:20px;\"> " +
        "                  <tr><td style=\"width:50%;font-weight:bold;\"><b>For ${record.subsidiary.legalname}</b><br />(As \"Owner\")<br /><br /><br /><br/>Signature &amp; Stamp<br/><br/>Date :</td><td style=\"width:50%;font-weight:bold;\"><b>Agreed &amp; Accepted by:</b><br/>(As \"Hirer\")<br/><br/><br/><br/>Signature &amp; Stamp<br/><br/>Date :</td></tr> " +
        "                </table> " +
        "<#else>" +
        "  <table style=\"width:100%;margin-top:20px;\"> " +
        "                  <tr><td style=\"width:50%;font-weight:bold;\"><b>For ${record.subsidiary.legalname}</b><br />(As Company)<br /><br /><br /><br/>____________________________________<br/><br/><br/><br/><br/>Date :</td><td style=\"width:50%;font-weight:bold;\"><b>Agreed &amp; Accepted by:</b><br/>(As Owner/Customer)<br/><br/><br/><br/>____________________________________<br/>For <#if record.entity.companyname?has_content>${record.entity.companyname}<#else>${record.entity.altname}</#if><br/><br/>(Signature &amp; Stamp)<br/><br/>Date :</td></tr> " +
        "                </table> " +
        "                    </#if> " +
        // "</#if> " +
        "</#if> " +
        " " +
        " " +
        "<#if record.subsidiary.internalid?string == '8'><!-- MMGT--> " +
        "   <#if record.custbody_general_trms_cndtns?string == 'Yes'> " +
        " " +
        "<table style=\"width:100%;margin-top:10px;\"><tr> " +
        "  <td> " +
        "  <table><tr> " +
        "    <td align=\"center\" colspan=\"2\"> " +
        "    <p><span style=\"font-size:11px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions</span></strong></span></p> " +
        "    </td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>1. All cranes are on main boom configuration only unless specified. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>2. Based on minimum 10hrs per day on daily basis, 6 days a week (continuous hire) on weekly basis, monthly rental is based on per calendar month [regardless of 31 days, 30 days &amp; 28/29 days of working per month] (excluding Fridays &amp; Public Holidays), plus mob/ demob with 1-hour lunch break permissible per day. Additional hours worked over 10 hours &amp; on Fridays and Public Holidays will be charged at quoted hourly rate. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>3. All regular maintenance will be to the account of the Owner. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>4. Basic minimum daily/weekly/monthly rates will be applied for all hires. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>5. The Hirer shall not pay any breakdown time and lunch/dinner breaks as recorded on the time Sheet. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>6. The Hirer to ensure time sheet [working hours] are approved/signed by a responsible site representative. No claims or discrepancies will be acceptable after completion of works.</strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>7<u>. Inclusions (Our price includes):</u> Standard lifting gear, valid registration, Govt. approved third party Test Certificate and licensed operator. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>8. Rigging assistance for slinging arrangement and any specialized lifting gear to be supplied by Hirer. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>9. Any special requirement, approvals, terms &amp; conditions withheld/not put forth by the Hirer at the time of enquiry and wishes to implement after confirmation of order at the time of delivery can be refused by supplier (AFIHER). </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>10. <u>Fuel and lubes:</u> For hourly and daily rentals fuel will be provided by Al Faris International Heavy Equipment Rental, however for all weekly and monthly rentals fuel [Adnoc/equivalent] should be provided by the Hirer. If fuel is supplied from any other sources, any damages caused to the machines, repair costs will be recovered from Hirer. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>11.<u> Food, accommodation and transport:</u> Hirer to provide food, accommodation and transportation for our personnel [Labour class not acceptable] for all weekly and monthly hires to be performed out of Abu Dhabi city limits and on distant sites.</strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>12. <u>Permits and passes:</u> Hirer should arrange all Police/Municipality and road permits as and when required for operation of the equipment in restricted areas. Hirer to provide all passes for our personnel and equipment, if required.</strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>13 <u>Non availability of work:</u> In case the equipment works less than the minimum hours or 10 hours per day due to non-availability of work or inadequate weather conditions, the minimum hours as agreed will be applicable. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>14. <u>Site Supervision:</u> Supervision at site shall be Hirer&rsquo;s responsibility and accordingly the operator will be under the control of the Hirer. The Hirer to ensure clear and proper directions are given for all work to be performed by the operator and Hirer will be solely responsible for all acts or omissions of the operator while performing duties under the his supervision. Hence any damages to third party property arising out of such operation will be the Hirer&rsquo;s risk and such insurance cover should be arranged by the Hirer at their own cost on waiver of subrogation towards Al Faris International Heavy Equipment Rental. The Hirer will not request the equipment to be utilized to perform any duties beyond its rated capacity at any time. </strong></span></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>15. <u>LIABILITY OF THE COMPANY:</u><br />a) The Company shall be liable for loss or for damage or injury to persons or property when caused solely by the Company&rsquo;s negligence in the performance of the contract and shall not be liable for any such loss, or damage or injury due in whole or in part to any negligence on the part of the client or any third party.<br />b) The company&rsquo;s liability, if any, arising from or in connection with the Contract Lifting Servicing contract.<br />b.1) For loss or destruction or damage to the contract Goods shall be limited to a total of AED 250,000 (DIRHAMS TWO HUNDRED FIFTY THOUSAND) irrespective of the number of items being lifted or handled.<br />b.2) For any other loss, damage or injury shall be limited to a total sum $ 2,000,000 (United States Dollar Two Million only). Unless in either case, a different amount is agreed in writing by the Owner and the Hirer Prior to the commencement of the contract.</strong></span></span></p> " +
        "    </td> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><span style=\"font-size:7px;\"><strong><span style=\"font-family: arial,helvetica,sans-serif;\">c) Full details of any loss, damage or injury, which is or may be the subject of a claim by the client against the Company, shall be notified by the Client to the Company within seven days of the date of the event thereof. Any proceedings to enforce any such claim by the client against the company must be commenced not later than twelve months after the date of occurrence of the event giving rise to the loss, damage or injury. </span></strong></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><strong><span style=\"font-family: arial,helvetica,sans-serif;\">16. <u>EXCLUSION OF THE COMPANY&rsquo;S LIABILITY:</u><br />a) The company shall not be liable for any loss, damage or injury caused by, or arising from or as the result of, any of the following:<br />a.1) Any defect in the Contract Goods including any design defect and any defect relating to the lifting points on the contract goods.<br />a.2) Inaccurate or incomplete information given by the Client.<br />a.3) Any instructions given by the client to the company&rsquo;s employees.<br />a.4) Any defect in the equipment provided by the client.<br />a.5) Any act or omission of any personnel supplied by the client, or any body or person under contract to the client in connection with the contract goods, except when correctly following the company&rsquo;s instructions for the purpose of performing the Company&rsquo;s work under the contract.<br />a.6) Delay in commencing or completing the contract works due to circumstances beyond the company&rsquo;s control including, but not limited to, any strike or other industrial action or adverse weather conditions.<br />a.7) Unexpected or unforeseen subsidence or unstable ground conditions. </span></strong></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><strong><span style=\"font-family: arial,helvetica,sans-serif;\">b) The company shall not be liable or responsible for any of the following. However arising:<br />b.1) Loss or damage of whatever nature due to or arising through any cause beyond the company&rsquo;s reasonable Control.<br />b.2) Whether by way of indemnity or by reason of any breach of the contract, breach of statutory duty or misrepresentation or by reason of commission of an tort (including but not limited to negligence) in connection with the contract for any of the client&rsquo;s loss or profit, loss of the use of the plant or any other asset, or facility, loss or production or productivity, loss of contracts with any third party, liabilities of whatever nature to any third party, and/or any other financial or economic loss or indirect or consequential loss or damage of whatever nature; and<br />b.3) Loss or damage to the contract goods whilst in storage outside the control of the company. </span></strong></span></p> " +
        " " +
        "    <p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>17. <u>INSURANCE:</u><br />a) The Company will carry insurance to cover its potential liability under the contract having regard to the maximum amounts referred to in clause (15b).<br />b) The Company may, at its discretion, exclude the contract from cover under its existing policies and require a specific Insurance policy to cover the contract to be provided by and at the expense of the client. This specific insurance policy shall provide the company with protection no less extensive than would have been the case if this clause (17b) had not been invoked.<br />c) If the company is of the opinion that the insurance cover held by the client may be insufficient to meet any applicable requirements of clause (17b) of the client&rsquo;s liabilities under the contract, the company may require the client to take out at the client&rsquo;s expense additional liability insurance cover or take out such cover itself and recover the cost from the client as debt.<br />d) If the value of the contract goods exceeds the company&rsquo;s liability limits referred to in clause (15b) and the client requires the company to increase its cover, it is the responsibility of the client to give the company sufficient written notice of that fact with details of the value of the contract goods so that the company&rsquo;s liability cover, if agreed by the company, can be increased accordingly. The cost of any additional cover will be passed on the client.<br />e) The client agrees to indemnify the company against &ndash; e.1) Any claim arising from or connected with the Company&rsquo;s work on the contract site, in preparing the site or performing the contract, including claims of nuisance and claims of trespass to persons, property, land or air space. e.2) All other losses, damage or claims in respect of any matters arising from or in connection with the contract and for which, under these terms and conditions, the client is liable or for which under clause (16) the company is not liable and e.3) Any liability arising from or in connection with the contract to pay any amount in excess of the relevant limits referred to in Clause (15b)<br />f) The Client shall insure against its liability to indemnify the Company and all other liabilities of the client under the contract.<br />g) If r</strong>equested by the company, the client shall produce a copy of any insurance policy together with evidence of the premium having been paid, held by the client and relevant to the contract.</span></span></p> " +
        "    </td> " +
        "    </tr></table> " +
        "  </td> " +
        "  </tr></table> " +
        " " +
        "<table style=\"width:100%;margin-top:10px;\"><tr> " +
        "  <td> " +
        "  <table><tr> " +
        "    <td align=\"center\" colspan=\"2\"> " +
        "    <p><span style=\"font-size:11px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions</span></strong></span></p> " +
        "    </td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">18. <u>TRANSPORTATION OF CONTRACT GOODS:</u><br />a) The company is not a common carrier.<br />b) If, under the contract, the contract goods or any part of them require transportation by air, sea, road or rail the company may either undertake the transportation or arrange for transportation by some other person or organization.<br />c) In the latter event referred to in clause (18b) unless otherwise agreed in writing by the Company, the company&rsquo;s liability for the Contract Goods so transported shall be no greater than that of the person or organization carrying out the transportation, that is the airline, shipping company, haulage contractors or railway authority concerned, and the amount of compensation, if any, payable for loss of or damage to the contract goods during transportation shall be limited to the amount recoverable from that person or organization in respect of that loss or damage. </span></span></strong></p> " +
        " " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">19. Insurance for tandem lift operation to be covered by Hirer and copy marked to us prior to commencement of job. </span></span></strong></p> " +
        " " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">20. <u>Site Conditions</u>: The Hirer to ensure that the ground conditions are adequate for travel on site and to set up the equipment in its final working position. The Hirer should ensure that any utility lines (below the ground or around the site) are identified and notified to Al Faris International Heavy Equipment Rental before the Equipment arrives on location and it will be the Hirer&rsquo;s sole responsibility, if any damage occurs to such facilities. Hirer to ensure that the ground is firm, compacted and free from any impediments at all times for a safe, smooth and efficient movement of the equipment while on site. </span></span></strong></p> " +
        " " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">21. <u>Duties &amp; Taxes</u> : All government related taxes including company taxes, withholding taxes, duties and custom deposits / guarantees or any other levies arising due to operation of equipment on site or by way of traveling to site as per the laws of the country to be borne by the Hirer.</span></span></strong></p> " +
        "           " +
        "        <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">22. <u>Equipment Replacement:</u> Al Faris International Heavy Equipment Rental will not be responsible for any loss or consequential loss, due to breakdown of any of our equipments while traveling to site / at site. Replacement will be provided for major breakdowns subject to availability. </span></span></strong></p> " +
        " " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">23. <u>Availability of Equipments:</u> All equipments are subject to availability at the time of confirmation of order and will be delivered strictly in compliance with our standard terms and conditions. Al Faris International Heavy Equipment Rental will only hire equipments for which it has received the specific order. </span></span></strong></p> " +
        "    </td> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">24. <u>Re-hire/Sub lease:</u> The Hirer shall not re-hire or sub lease the equipment hired without the consent and approval of the Owner. In the event of the Owner finding the Hirer carrying out such above mentioned practice, it will be termed illegal and the Owner has the option of carrying out legal action against the Hirer. The Owner will subsequently be relieved of any/all insurance claim/s from the Hirer. </span></span></strong></p> " +
        " " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">25. <u>Payment Terms:</u> <u>Refer cover page</u>. All rates quoted are net payable to Al Faris International Heavy Equipment Rental Default in payment by your client / main contractor to your company should not be extended to Al Faris International Heavy Equipment Rental. Payment exceeding the credit period will be levied with interest of <u>2% per month</u>. </span></span></strong></p> " +
        " " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">26. In the event of the Hirer suffering any legal action, distress or execution to be levied against him or make proposal to make any arrangement with his creditors, or shall enter into liquidation or shall be do or cause to be done or permit or suffer any act or thing; shall not be considered a reason for the Owner not to receive from the Hirer all monies due to the Owner. </span></span></strong></p> " +
        " " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">27. <u>Termination:</u> The agreement can be terminated by either party giving [15] days notice in writing. </span></span></strong></p> " +
        " " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">28. <u>Extension:</u> The hirer to notify in writing with a lead time of [15] days for extend of this hire period. </span></span></strong></p> " +
        " " +
        "    <p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">29. <span style=\"background-color: rgb(255, 255, 0);\"><u>LOA:</u> Letter of Assistance for Oilfield Locations controlled by CNIA to be arranged by hirer.</span></span></span></strong></p> " +
        "           " +
        "        <p style=\"text-align: justify;\"><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>30. </strong>Any dispute arising out of formation, performance, interpretation, nullification, termination or invalidation of this contractor arising there from or related thereto in any manner whatsoever, shall be referred to the exclusive jurisdiction of UAE courts.</span></span></p> " +
        "           " +
        "         <#if record.custbody_vat_clause?string == \"Yes\"><p><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\"><strong>31. </strong>The Parties agree that in the event of Value Added Tax (VAT) being levied or introduced by the Government Authorities in UAE, ${record.subsidiary.legalname} reserves the right to charge VAT at the prevailing VAT rate(as applicable) in respect of any service and supply as mentioned in this Agreement. The Hirer shall pay the amount of any such VAT as an addition to the invoice value. ${record.subsidiary.legalname} shall provide to the Hirer the documentation as required by the VAT Legislation to permit the Hirer to claim an input VAT deduction on their VAT Return.</span></span></p></#if> " +
        "    </td> " +
        "    </tr></table> " +
        "  </td> " +
        "  </tr> " +
        "     </table> " +
        "     <table style=\"width:100%;\"> " +
        "     <tr><td>Owner&nbsp; :____________________________________<br /><br />Hirer&nbsp;&nbsp;&nbsp;&nbsp; :____________________________________<br /><br /><br />&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____________________________________<br /><br /><b>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signed and accepted by [on behalf of Hirer]</b></td></tr></table> " +
        " </#if> " +
        "  " +
        "   " +
        " </#if> " +
        "  <#if record.custbody_transport_trms_cndtns?string == 'Yes'> ";
    var standardTerms = nlapiLoadRecord("customrecord_stan_condi_transp", 1);
    var terms1 = standardTerms.getFieldValue("custrecord_stan_condi_transp_term1");
    var terms2 = standardTerms.getFieldValue("custrecord_stan_condi_transp_term2");
    var terms3 = standardTerms.getFieldValue("custrecord_stan_condi_transp_term3");
    var terms4 = standardTerms.getFieldValue("custrecord_stan_condi_transp_term4");
    var terms5 = standardTerms.getFieldValue("custrecord_stan_condi_transp_term5");
    var terms6 = standardTerms.getFieldValue("custrecord_stan_condi_transp_term6");
    var terms7 = standardTerms.getFieldValue("custrecord_stan_condi_transp_term7");
    var terms8 = standardTerms.getFieldValue("custrecord_stan_condi_transp_term8");
    template += "<table style=\"width:100%;margin-top:10px;\"><tr> " +
        "  <td> " +
        "  <table><tr> " +
        "    <td align=\"center\" colspan=\"2\"> " +
        "    <p><span style=\"font-size:11px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions [Transportation]</span></strong></span></p> " +
        "    </td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms1) + "</span></strong></p> " +
        "    </td> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms2) + "</span></strong></p> " +
        "    </td> " +
        "    </tr></table> " +
        "  </td> " +
        "  </tr></table> " +
        " " +
        "<table style=\"width:100%;margin-top:10px;\"><tr> " +
        "  <td> " +
        "  <table><tr> " +
        "    <td align=\"center\" colspan=\"2\"> " +
        "    <p><span style=\"font-size:11px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions [Transportation]</span></strong></span></p> " +
        "    </td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms3) + "</span></strong></p> " +
        "    </td> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms4) + "</span></strong></p> " +
        "    </td> " +
        "    </tr></table> " +
        "  </td> " +
        "  </tr></table> " +
        " " +
        "<table style=\"width:100%;margin-top:10px;\"><tr> " +
        "  <td> " +
        "  <table><tr> " +
        "    <td align=\"center\" colspan=\"2\"> " +
        "    <p><span style=\"font-size:11px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions [Transportation]</span></strong></span></p> " +
        "    </td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms5) + "</span></strong></p> " +
        "    </td> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms6) + "</span></strong></p> " +
        "           <#if record.subsidiary.internalid?string == '9'> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms7) + "</span></strong></p> " +
        "          <#else> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms8) + "</span></strong></p> " +
        "    </#if> " +
        "           " +
        "    </td> " +
        "    </tr></table> " +
        "  </td> " +
        "  </tr></table> " +
        "  <#if record.custbody_transport_trms_cndtns?string == 'Yes'> " +
        "  <table style=\"width:100%;margin-top:20px;\"> " +
        "                  <tr><td style=\"width:50%;font-weight:bold;\"><b>For ${record.subsidiary.legalname}</b><br />(As Company)<br /><br /><br /><br/>____________________________________<br/><br/><br/><br/><br/>Date :</td><td style=\"width:50%;font-weight:bold;\"><b>Agreed &amp; Accepted by:</b><br/>(As Owner/Customer)<br/><br/><br/><br/>____________________________________<br/>For <#if record.entity.companyname?has_content>${record.entity.companyname}<#else>${record.entity.altname}</#if><br/><br/>(Signature &amp; Stamp)<br/><br/>Date :</td></tr> " +
        "              </table> " +
        "</#if> " +
        "</#if> " +
        "   " +
        "  <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11'><!-- AFER ED and AFIHER ED--> " +
        "   <#if record.custbody_general_trms_cndtns?string == 'Yes'> " +
        "      " +
        "     <table style=\"width:100%;margin-top:10px;\"> " +
        "                    <tbody> " +
        "                      <tr> " +
        "                        <td> " +
        "                          <table> " +
        "                            <tbody> " +
        "                              <tr> " +
        "                                <td align=\"center\" colspan=\"2\"> " +
        "                                  <p><span style=\"font-size:13px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions</span></strong></span></p> " +
        "                                </td> " +
        "                              </tr> " +
        "                              <tr> " +
        "                                <td> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">1. The legal relationship between (the <b>Owner</b>) and (the <b>Hirer</b>) with respect to the rental of the equipment (the <b>Equipment</b>) and provision of a licensed operator (the <b>Operator</b>) (together, the <b>Services</b>) shall be governed by the special conditions set out in the quotation/hire agreement (the <b>Quotation/Hire Agreement</b>) entered into between the Owner and Hirer and this general terms and conditions of services and payment of the Owner (the <b>Standard Terms and Conditions</b>).</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">2. In the event that the special conditions set out in the Quotation/Hire Agreement conflict with or deviate from this Terms and Conditions, the special conditions set out in the Quotation/Hire Agreement shall prevail.</span></p> " +
        "                                   " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">3. The basic minimum hourly/daily/weekly/monthly rates as per the Quotation/Hire Agreement will be applied for all rentals by the Owner during the duration of the Services.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;a. The daily rental quote is based on a calendar day, wherein the equipment is used for a <b>maximum</b> of 10 hours a day will be charged at pro-rata rates</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;b. The weekly rental quote is based on a Gregorian calendar week, wherein the equipment is used for a maximum of 10 hours per day, any additional hours worked in excess of <b>70</b> hours<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;per week will be charged at pro-rata rates</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;c. The monthly rental quote is based on the Gregorian calendar month (regardless of the number of days therein), wherein the equipment is used for a Month, 10 hours per day.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any additional hours worked <b>in</b> excess of 300 hrs per month will be charged at pro-rata rates.</span></p> " +
        "                            " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">4. The Owner shall be responsible for and bear the costs of all regular maintenance for the Equipment.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">5. The Hirer shall not pay for any time during which the Equipment has broken down, other than for instances where such breakdown is caused by the Hirer’s action.</span></p> " +
        "                                   " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">6. The Hirer shall ensure that the Timesheet is approved or signed by an authorized site representative on a daily basis. No claims or discrepancies by either party will be accepted after acceptance of the signed timesheet.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">7. The quote in the Quotation/Hire Agreement is for the Services which consist solely of: Supply of equipment/services and includes the provision of Accessories as agreed. Any additional equipment/services that is beyond the scope of the above hire agreement shall be charged extra.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">8. The Hirer shall be responsible and shall supply any rigging, <b>installation</b> assistance required during mobilization, installation and demobilization.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">9. The Owner may refuse any special requirements, approvals, terms &amp; conditions withheld/not put forth by the Hirer at the time of quotation enquiry and that the Hirer wishes to implement after confirmation of an order.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">10. <b><u>Fuel</u></b>: Fuel supply is in Hirer’s scope of supply unless otherwise agreed. If any damages are caused to the Equipment and the fuel does not meet manufacturer’s specifications or equivalent, the Hirer shall bear all repair costs attributed to the quality of fuel provided. All other costs associated with the testing and certification of the fuel quality shall be borne by the Hirer. </span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">11. <b><u>Use Of Equipment And Hirer’s Obligations</u></b>:Hirer shall use the Equipment only for Hirer’s commercial purposes. Hirer shall keep the Equipment in its sole possession and control and at the Job Site. Hirer shall properly operate and maintain the Equipment in accordance with the highest standards of care and prudence and shall maintain complete records thereof. Hirer shall keep and return all Equipment in good repair, condition and working order (ordinary wear and tear excepted). Hirer shall obtain and maintain all permits and licenses required for the possession, use, operation, maintenance, storage, transportation, installation, dismantling and servicing of the Equipment. Owner shall not be liable if any authorization for any permits or licensing is delayed, denied, revoked, restricted or not renewed, and Hirer shall not be relieved thereby of its obligations to pay Owner. Hirer shall not move or alter the equipment without prior written consent of Owner. Owner may elect to take ownership of any alteration to the Equipment made with or without its consent or to have Hirer restore the equipment to its prior condition at Hirer’s expense. Hirer shall not paint the Equipment or alter, cover, obscure or remove from the Equipment any nameplate, Owner logo or other identification label or marking, operating instructions or safety warnings or markings. Hirer’s obligations include, but are not limited to, the following specific responsibilities: (i) provision of a suitable place for installation and use of the Equipment, including provision of suitable electric current and ventilation together with all appropriate supporting facilities specified by Owner; (ii)  ensuring that the Equipment is operated in a careful, prudent and lawful manner; (iii) ensuring that the Equipment is operated and maintained only by trained, competent, and duly qualified personnel and in accordance with any manuals, instructions and manufacturer and Owner recommendations applicable to  the  Equipment;  (iv)  compliance  with  all  applicable  codes  and local, state and federal laws, rules and regulations in connection with   the   possession, use, operation, maintenance, storage, transportation, installation and dismantling of the Equipment; (v) supply of all fuel, coolants, lubricants and other facilities of the proper grade, quality and type; (vi) prompt is discontinuance of any use or attempted use of the Equipment should it, at any time, be unsafe or in a state of disrepair and immediate notification to Owner of such situation; and (vii) return of the Equipment in a clean condition. Hirer warrants that it will not use the Equipment and Services rented hereunder in connection with any spurious installation or activity. If, in breach of the foregoing, any such use occurs, Owner shall have no liability of the consequences and Hirer shall indemnify Owner, its affiliates and suppliers of every type and tier against any such liability, whether arising from breach of this Agreement, warranty, indemnity, tort (including negligence) or other contractual or extra contractual liability of any nature, strict liability, or otherwise, and under any system, theory or principle of law. </span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">12. <b><u>Food, accommodation and transportation</u></b>: For special applications and long term contracts, the Hirer to provide all facilities [food, accommodation &amp; transport], to Owner’s team operating at site. </span></p> " +
        "                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">13. <b><u>Permits and passes</u></b>: The Hirer shall arrange for all police, municipality and road permits as and when required for operation of the Equipment in the hirer’s work site and in restricted areas. The Hirer shall provide the Owner with all required passes for the Owner’s personnel and materials, including, but not limited to, the Operator and the Equipment, if any.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">14. <b><u>Non-availability of work</u></b>: In case the Equipment is used for less than the minimum of 10 hours per day due to the non-availability of work or inadequate weather conditions, the minimum daily, weekly and monthly rental rates as per the hours set out in (4-a,b,c) and as per rates set in the Quotation/Hire<br/>Agreement will be applicable.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">15. <b><u>Site Supervision</u></b>: Supervision at the Hirer&rsquo;s site shall be the Hirer’s responsibility and accordingly the Operator will be under the control of the Hirer. The<br/>Hirer shall ensure clear and proper directions are given for all work to be performed by the Operator and the Hirer shall be solely responsible for the scope of work during the operation under its supervision. Hence any damages to third party property arising out of such operation will be at the Hirer’s risk and<br/>any insurance cover regarding said damages shall be arranged by the Hirer at its own cost on waiver of subrogation towards the Owner. The Hirer shall not request the Equipment to be utilized to perform any duties beyond its rated capacity at any time.</span></p> " +
        "                                </td> " +
        "                              </tr> " +
        "                            </tbody> " +
        "                          </table> " +
        "                        </td> " +
        "                      </tr> " +
        "                    </tbody> " +
        "                  </table> " +
        "                  <table style=\"width:100%;margin-top:10px;\"> " +
        "                    <tbody> " +
        "                      <tr> " +
        "                        <td> " +
        "                          <table> " +
        "                            <tbody> " +
        "                              <tr> " +
        "                                <td> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">16. <b><u>Site Conditions</u></b>: The Hirer shall ensure that the ground conditions are adequate for travel on site and to set up the Equipment in its final working position. The Hirer shall ensure that any utility lines and / all underground or around the site are identified and notified to the Owner before the Equipment arrives on location and the Hirer solely shall be responsible if any damage occurs to such facilities. The Hirer shall ensure that the ground is firm, compacted and free from any impediments at all times for safe, smooth and efficient movement of the Equipment while on site.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">17.  <b><u>Liability of the Owner:</u></b></span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;a. Hirer assumes all risk of liability arising from or relating to the equipment, in its sitting, possession, use, operation, maintenance, transportation and storage</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;b. The total liability of Owner, its subcontractors and suppliers, on all claims of any kind   whether in contract, warranty, indemnity, tort (including negligence), or other contractual or extra contractual liability of any nature, strict liability, or otherwise, and under any principle of law, arising out of the performance or breach of this Agreement, or relating to the Equipment or services, shall in no event exceed 50% of the total of all rental and service fee payments, if any, received from the Hirer by the Owner under this Agreement with respect to the Equipment and Services which gives rise to the claim, dispute or liability. In no event shall Owner, its subcontractors or suppliers, be liable for loss of profit or revenue, loss of use of the Equipment or any associated equipment, cost of substitute equipment, services or replacement power, downtime costs, or any special, consequential, incidental, indirect or any exemplary damages, or claims of Hirer’s end-users for such damages, and Hirer shall indemnify the Owner against such claims of Hirer’s end-user. If Owner furnishes Hirer with advice or assistance concerning the Equipment or other products, systems or work which is not required pursuant to this Agreement, it will not subject Owner to any liability whatsoever, whether in contract, indemnity, warranty, tort (including negligence), or other contractual or extra contractual liability of any nature, strict liability or otherwise, and under any principle of law.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;c. Full details of any loss, damage or injury, which is or may be the subject of a claim by the Hirer against the Owner, shall be notified by the Hirer to the Owner within seven (7) calendar days of the date of the event thereof. Any proceedings to enforce any such claim by the Hirer against the Owner must be commenced no later than twelve months after the date of occurrence of the event giving rise to the loss, damage or injury.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\"><b><u>19.  Exclusion of the Owner’s liability:</u></b></span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">The Owner shall not be liable for any loss, damage or injury caused by, or arising from or as the result of, any of the following:</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i. Inaccurate or incomplete information given by the Hirer;</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;ii.  Any instructions given by the Hirer to the Owner’s personnel, including, but not limited to, the Operator. </span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;iii. Any defect in the equipment provided by the Hirer;</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;iv.  Unexpected or unforeseen subsidence or unstable ground conditions. </span></p> " +
        "                                   " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">19.  <b><u>Indemnity:</u></b></span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;a. The Hirer agrees to protect, defend, indemnify and hold harmless the Owner and its affiliates, officers, directors, employees and customers, agency personnel and agents, its contractors, subcontractors of any tier, (collectively, the <b>Indemnified Persons</b>) from and against any loss suffered by any of the Indemnified Persons arising from any and all claims, actions, demands, proceedings or judgments which may be instituted, made, threatened, alleged, asserted or established from time to time against or otherwise involving any of the Indemnified Persons and from all damages, penalties, fines, liabilities, obligations, losses and reasonable costs and expenses, including, but not limited to, legal and other professional fees and costs which any of the Indemnified Persons may suffer or incur from time to time arising out of or in connection with (i) the Hirer’s performance the Quotation/Hire Agreement and/or under these Terms and Conditions (collectively, the <b>Contract</b>); (ii) the Hirer’s operation of the Equipment and instructions to the Owner’s personnel including, but not limited to, the Operator, and/or (iii) any claim arising from or connected with the Owner's performance of its obligations under the Contract.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "b. Each Party is liable and responsible to the other Party for the accuracy, correctness and completeness of the documentation and information supplied by it or on its behalf. Each Party may rely fully on the accuracy, correctness and completeness of the documentation and information supplied to it by or on behalf of the other Party. Each Party indemnifies the other Party against all consequences of any inaccuracy, incorrectness and incompleteness of the documentation and information supplied by it or on its behalf to the other Party.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "c. Hirer shall indemnify and defend Owner for any and all claims, damages, losses, causes of action, demands, judgments and expenses arising out of or relating to any Hazardous Materials, present on the Job Site prior to the commencement of Owner’s work, improperly handled or disposed of by the Hirer or brought on to the Job Site or produced thereon at any time by parties other than Owner.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">20.  <b><u>" +
        "Services: Health And" +
        "Safety:</u></b>: Hirer will take all necessary precautions, at all times, to ensure the safety of Owner’s and other personnel at the Job Site. This includes, but is not limited to, instruction on Hirer’s safety practices, proper and safe handling of hazardous substances and protection of Owner’s personnel from exposure thereto, using a safe and effective lock-out tag procedure, and conducting periodic safety meetings during construction and start up. Owner may, from time to time, conduct safety audits, but neither their conduct or non- conduct nor the making of any recommendation by Owner shall relieve Hirer of the responsibility to provide a safe place to work. The operation of equipment at the Job Site is the responsibility of Hirer. </span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">21.  <b><u>Force" +
        "Majeure:</u></b></span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "a. “Force Majeure” means any circumstances, conditions and / or occurrences which are beyond the control of either Party, are not attributable to the fault or negligence of either Party and cannot be avoided or prevented by taking reasonable measures, and which temporarily or permanently prevent the performance of any obligation (with the exception of payment obligations ) under the Contract, such as trade union strikes mutiny, quarantine, epidemics, war (whether declared or undeclared), acts of terrorism, blockades, embargos, riots, demonstrations, civil commotion or disorder, fire, storm and / or other extreme weather conditions and / or other acts of nature, provided that neither Party has caused or contributed to such occurrences.</span></p> " +
        "<p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "b." +
        "If the performance of obligations under the Contract is temporarily prevented by Force Majeure, the performance of those obligations ( with the exception of payment obligations) will merely postponed and the Force Majeure will not constitute a reason for failing to perform the Contract. </span></p> " +
        "                                   <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "c." +
        "If the performance of obligations under the Contract is permanently prevented by Force Majeure - or is temporarily prevented for a period that is expected to last at least sixty (60) days - each party will have the right to terminate the Contract in accordance with the provisions of Clause 30 of these standard terms and conditions.</span></p> " +
        "                                </td> " +
        "                              </tr> " +
        "                            </tbody> " +
        "                          </table> " +
        "                        </td> " +
        "                      </tr> " +
        "                    </tbody> " +
        "                  </table> " +
        "                  <table style=\"width:100%;margin-top:10px;\"> " +
        "                    <tbody> " +
        "                      <tr> " +
        "                        <td> " +
        "                          <table> " +
        "                            <tbody> " +
        "                               " +
        "                              <tr> " +
        "                                <td> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">22.  <b><u>Insurance:</u></b></span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "a) Comprehensive Insurance for our equipment" +
        "while operating at site is Owner’s responsibility, while all the Third Party liabilities shall be covered by Hirer.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "b) The Hirer shall insure against its liability to indemnify the Owner and all other liabilities of the Hirer under the Contract.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "c)" +
        "If requested by the Owner, the Hirer shall produce a copy of any insurance policy together with evidence of the premium having been paid, held by the Hirer and relevant to the<br/>&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "Contract.</span></p> " +
        "                                  " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">23.  <b><u>Duties &amp;" +
        "Taxes:</u></b>The quotations" +
        "set out in the Contract shall be exclusive of any value added tax <b>(VAT)</b> or any other government related taxes and duties including, but not limited to, company taxes, withholding taxes, duties and custom deposits / guarantees or any other levies arising due to provision of the Services on site or by way of traveling to the site." +
        "If such taxes are applicable, they will be due in addition to the quotation set out in the Contract. Any VAT or other taxes or duties chargeable in respect of the Services shall, on delivery of the VAT or other taxes or duties invoices, be paid by the Hirer in addition to any sum to be paid hereunder. The Hirer shall indemnify the Owner for any losses or penalties incurred by the latter due to breach of this clause 24. The Owner shall provide the Hirer the documentation as required by the UAE law to permit the Hirer to claim an input VAT deduction on their VAT" +
        "return.  </span></p> " +
        "                                <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">24. <b><u>Equipment" +
        "Replacement:</u></b>" +
        "If there is a breakdown of any of the equipment at the site of the Hirer, the Owner shall, at its own discretion, use its reasonable efforts to either replace the equipment (subject to availability) or repair the equipment.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">25. <b><u>Damage To The" +
        "Equipment:</u></b>Hirer shall be liable to the Owner for all loss or damage to the Equipment during the term of this Agreement regardless of the cause and shall promptly notify Owner of the same. Immediately upon demand, Hirer shall pay (at Owner’s option) to either repair or replace the Equipment. In addition, Hirer shall promptly pay to the Owner all consequential, incidental and special damages resulting from the loss or damage, including the loss of rental revenues.</span></p> " +
        "                                <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">26. <b><u>Availability of" +
        "Equipment:</u></b>The Equipment is subject to availability at the time of confirmation of order and will be delivered strictly in compliance with the Terms and Conditions. The Owner will only hire or lease Equipment for which it has received a specific order.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">27. <b><u>.Re-Hire/Sub-Lease/Relocation</u></b>The Hirer shall not rehire or sub-lease or relocate the Equipment hired without the prior written consent and approval of the Owner. In the event of the Owner finding the Hirer in breach of this clause, the Owner may immediately terminate the Contract and/or claim damages as a result of the Hirer’s breach of this clause 28. The Owner will subsequently be relieved of any and all claims from the Hirer.</span></p> " +
        "                                <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">28. <b><u>Payment" +
        "Terms:</u></b></span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "a. All rates quoted in the Quotation/Hire Agreement are payable to Owner as per approved credit terms from date of an invoice. Hirer shall not be entitled to any offset, abatement or reduction of rent or charges whatsoever and agrees that its obligation to pay rent and charges is unconditional. Payments due after the credit period will be levied with interest of 12% per annum or applicable proportionally for the period of due.</span></p> " +
        "                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "&nbsp;" +
        "b. Payments by the Hirer to the Owner may never be dependent upon receipt by Hirer of payments of third parties, including the Owner's own Customer. </span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">29. <b><u>Nonfulfillment:</u></b> If Hirer fails to fulfill any of the payment conditions set forth in this Agreement, Owner may suspend performance, and any cost it incurs as a result shall be payable by the Hirer. If Hirer does not correct such failure promptly, Owner may, at its option, terminate this Agreement in whole or in part and Hirer shall pay Owner’s termination charges upon presentation by Owner of its invoices.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">30. <b><u>Default:</u></b> Hirer shall be in default under this Agreement if (i) Hirer shall fail to pay any rent or other amount required to be paid hereunder when it becomes due and payable; (ii) Hirer shall fail to perform or observe any other covenant, condition or agreement to be performed or observed by it hereunder and such failure shall continue unremedied for a period of 10 days after written notice thereof by Owner; (iii) any representation or warranty made by Hirer herein or in any document or certificate furnished by Hirer in connection herewith shall prove to be incorrect at any time in any material respect; or (iv) Hirer becomes bankrupt or insolvent or makes an assignment for the benefit of its creditors. Upon the occurrence of any such event, Owner may, at its option: (i) terminate this Agreement in whole or in part; (ii) require Hirer at Hirer’s expense to return promptly all or any portion of the Equipment to Owner, or Owner, at its option may enter upon the premises where such Equipment is located and take immediate possession of and remove all or some of the Equipment, all without liability to Hirer for damage to property or otherwise; or (iii) exercise any other right or remedy which may be available to it under any applicable law. No right or remedy of Owner referred to in this Agreement is intended to be exclusive, but each shall be cumulative and in addition to any other right or remedy otherwise available at law or in equity. Hirer shall pay all costs, charges and expenses, including attorneys’ fees, incurred in retaking possession of the Equipment or in the collection of any sums which may be due and owing to Owner hereunder. Except for the rights of Owner as expressly provided in this Section, this Agreement cannot be canceled or terminated.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">31. <b><u>Confidentiality &amp; Non-Disclosure Clause</u></b></span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;a. The HIRER shall not, and shall procure that none of its affiliates, advisers or any other person connected with the HIRER shall, make any announcement concerning the existence or content of this [Agreement], the [Terms and Conditions], the business and affairs of the Owner or any related or ancillary matter before, on or after the agreement effective date without the prior written approval of the [Owner/Al Faris entity].</span></p> " +
        "                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;b. The Hirer shall, and shall procure that its affiliates, advisers and any other person connected with the Hirer shall keep confidential all confidential information provided by the Owner. For the purpose of this clause 29, confidential information of the Owner shall mean any and all information (whether written, oral, or in any other form and whether marked as confidential or otherwise) and is in respect of the business or affairs of the Owner or any of its affiliates including without limitation, information relating to: (a) business methods, techniques, processes and procedures, finance, prices, assets, designs and drawings; (b) financial, marketing, strategic, development or manpower plans; (c) practices, operations, customer lists, customer information and customer details, pricing schemes, price lists; (d) computer systems, know-how, technology and software; (e) products or services, including but not limited to intellectual property or other matters connected with the products or services manufactured, marketed, provided or obtained by the Owner; (f) relationships with actual or potential clients, customers or suppliers and the requirements of the Owner and of such persons; and (g) any information provided by the Owner that may be reasonably construed by a third party as being confidential.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;c. The confidentiality obligations contained in this clause 29 shall survive following the expiry and/or early termination of this Agreement and shall continue indefinitely.</span></p> " +
        "                                </td> " +
        "                              </tr> " +
        "                            </tbody> " +
        "                          </table> " +
        "                        </td> " +
        "                      </tr> " +
        "                    </tbody> " +
        "                  </table> " +
        "                  <table style=\"width:100%;margin-top:10px;\"> " +
        "                    <tbody> " +
        "                      <tr> " +
        "                        <td> " +
        "                          <table> " +
        "                            <tbody> " +
        "                              <tr> " +
        "                                <td> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;d. The HIRER does not have to keep confidential or to restrict its use of information that:</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(a)  is or becomes public knowledge other than as a direct or indirect result of  a breach of this Agreement; or</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(b)  it received from a source not connected with the Owner to whom the duty of confidence is owed free from any obligation of confidence to any other person.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;e. The HIRER may disclose any information that it is otherwise required to keep confidential under this clause:</span></p> " +
        "                                    <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(a)  with the written consent of the Owner; or</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(b)  to the extent that the disclosure is required by law, but shall use reasonable endeavors to consult the Owner and to take into account any reasonable requests the Owner may have in relation to the disclosure before making it.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">32.  <b><u>Termination</u></b>The Contract may be terminated by either party by giving seven calendar (7) days’ notice in writing. Upon termination of the Contract, all monies payable to the Owner by the Hirer shall become immediately payable.</span></p> " +
        "                                 " +
        "                                <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">33. <b><u>Extension of Hire:</u></b></span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;a. Where the Hirer wishes to extend the term of the Services, it shall provide the Owner with fifteen calendar [15] days written notice. The Owner shall respond to such notice within [03] working days of receipt thereof. </span></p> " +
        "                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;b. In the event of non-issuance of Purchase Order for <u>extension of hire</u>, the Owner reserves the right to stop services and/or withdraw equipment upon fulfillment of the issued Purchase Order, and is therefore not obligated to continue with extension of hire.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">34. <b><u>Assignment:</u></b> Neither of the parties shall assign, transfer, charge or otherwise deal in the benefits, rights, remedies, obligations and/or liabilities of the Contract, nor grant, declare, create or dispose of any right or interest in it to any third party without the other Party’s prior written consent.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">35. <b><u>Governing Law and Dispute Resolution:</u></b></span></p> " +
        "                                  <#if record.subsidiary.internalid?string == '10' || record.subsidiary.internalid?string == '11' > " +
        "                                     <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;a.  The Contract and any dispute or claim arising out of or in connection with it or its subject matter or formation (including, but not limited to, non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of the UAE, as applicable in the United Arab Emirates. </span></p> " +
        "                                     <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;b.  Any dispute, claim, difference or controversy of any kind arising out of, relating to or having any connection with the Contract, including, but not limited to, any dispute as to its existence, validity, interpretation, performance, breach or termination or the consequences of its nullity and any dispute relating to any non-contractual obligations arising out of or in connection with it shall be subject to the exclusive jurisdiction of the Courts of  Courts of DIFC</span></p> " +
        "                                     <#else> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;a. The Contract and any dispute or claim arising out of or in connection with it or its subject matter or formation (including, but not limited to, non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of the UAE, as applicable in the Emirate of Dubai/Abu Dhabi.</span></p> " +
        "                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">&nbsp;&nbsp;&nbsp;&nbsp;b. Any dispute, claim, difference or controversy of any kind arising out of, relating to or having any connection with the Contract, including, but not limited to, any dispute as to its existence, validity, interpretation, performance, breach or termination or the consequences of its nullity and any dispute relating to any non-contractual obligations arising out of or in connection with it shall be subject to the exclusive jurisdiction of the Courts of Dubai/Abu Dhabi.</span></p> " +
        "                </#if> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\">36.<b><u>Language:</u></b> The language of the Contract is English and all notices to be given in connection with the Contract must be in English. All demands, requests, statements, certificates or other documents or communications to be provided in connection with the Contract must be in English or accompanied by a certified English translation; in this case the English translation prevails unless the document or communication is a statutory or other official document or communication.</span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\"><b>This Quote/Hire agreement is subject to the conditions attached herein which contents the Hirer is fully aware of and knows.</b></span></p> " +
        "                                  <p style=\"text-align: justify;\"><span style=\"font-size:8px;\"><b>The Hirer hereby accepts the terms and conditions indicated in this Quote/Hire Agreement. In case of any comment and/or discrepancy, the same has to be informed immediately upon reception of this document, as otherwise said comments and/or discrepancies shall not be taken into account.</b></span></p> " +
        "                                </td> " +
        "                              </tr> " +
        "                            </tbody> " +
        "                          </table> " +
        "                        </td> " +
        "                      </tr> " +
        "                    </tbody> " +
        "                  </table> " +
        "                  <table style=\"width:100%;margin-top:20px;\"> " +
        "                  <tr><td style=\"width:50%;font-weight:bold;\"><b>For ${record.subsidiary.legalname}</b><br />(As \"Owner\")<br /><br /><br /><br/>Signature &amp; Stamp<br/><br/>Date :</td><td style=\"width:50%;font-weight:bold;\"><b>Agreed &amp; Accepted by:</b><br/>(As \"Hirer\")<br/><br/><br/><br/>Signature &amp; Stamp<br/><br/>Date :</td></tr> " +
        "                </table> " +
        "     </#if> " +
        "    </#if>";





    template += " </body> " +
        " </pdf> ";
    renderer.setTemplate(template);
    renderer.addRecord('record', estimate);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'Estimate' + estimate.getFieldValue('id') + '.pdf', 'inline');
    response.write(file.getValue());
}

function relaceCharector(charVal) {
    charVal = charVal.replace(/<br>/g, "<br/>");
    charVal = charVal.replace(/<BR>/g, "<br/>");

    return charVal;
}

function removeNull(string) {
    if (string == null) {
        string = "";
    } else {
        string = string;
    }
    return string;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function lumpdescription(charVal) {
    return charVal.replace(/\n/g, "<br/>");
}

function replaceAndOper(charVal) {
    return charVal.replace(/&/g, "&amp;");
}