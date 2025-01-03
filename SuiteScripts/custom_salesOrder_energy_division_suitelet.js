function printSalesOrderEnergyFormatAction(request, response) {
    var recordID = request.getParameter("recordID");
    var salesorder = nlapiLoadRecord("salesorder", recordID);
    var renderer = nlapiCreateTemplateRenderer();
    var template = "";
    template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> " +
        "<pdf> " +
        "<head> " +
        "<#if .locale == \"ru_RU\"> " +
        "    <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> " +
        "</#if> " +
        "<macrolist>";
    var subsidiary_id = salesorder.getFieldValue("subsidiary");
    var sub_master = nlapiLoadRecord("subsidiary", subsidiary_id);
    var headerlogo = sub_master.getFieldValue("logo");
    var location = salesorder.getFieldValue("location");

    var footerlogotop = sub_master.getFieldValue("custrecord_subsidiary_top_footer");
    var footerlogobottom = sub_master.getFieldValue("custrecord_subsidiary_bottom_foot");

    // nlapiLogExecution("DEBUG","sub_master",sub_master);
    // nlapiLogExecution("DEBUG","subsidiary_id",subsidiary_id);
    // nlapiLogExecution("DEBUG","headerlogo",headerlogo);
    // nlapiLogExecution("DEBUG","location",location);
    // nlapiLogExecution("DEBUG","footerlogotop",footerlogotop);
    // nlapiLogExecution("DEBUG","footerlogobottom",footerlogobottom);
    if (subsidiary_id != 11) {
        if (location == '8' || location == '21') {

            template += "<macro id=\"nlheader\"> ";
            template += "<img class=\"header\" style=\"width:60%;height:40%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"35\%\" width=\"63\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile('Logo/logo_facc.png').getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
            template += "</macro> ";

        }
        else if (headerlogo) {
            template += "<macro id=\"nlheader\"> ";
            template += "<img class=\"header\" style=\"width:58%;height:40%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"50\%\" width=\"100\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
            template += "</macro> ";
        }
    }
    if (subsidiary_id == 11) {
        if (headerlogo) {
            template += "<macro id=\"nlheader\"> ";
            template += "<img class=\"header\" style=\"width:58%;height:40%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"50\%\" width=\"93\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
            template += "</macro> ";
        }

    }

    template += "<macro id=\"nlfooter\">";
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
    template += "      </macro> ";
    template += "    </macrolist> " +
        "    <style type=\"text/css\">table " +
        "{        <#if .locale == \"zh_CN\"> " +
        "            font-family: stsong, sans-serif; " +
        "        <#elseif .locale == \"zh_TW\"> " +
        "            font-family: msung, sans-serif; " +
        "        <#elseif .locale == \"ja_JP\"> " +
        "            font-family: heiseimin, sans-serif; " +
        "        <#elseif .locale == \"ko_KR\"> " +
        "            font-family: hygothic, sans-serif; " +
        "        <#elseif .locale == \"ru_RU\"> " +
        "            font-family: verdana; " +
        "        <#else> " +
        "            font-family: sans-serif; " +
        "        </#if> " +
        "            font-size: 10pt; " +
        "            table-layout: fixed; " +
        "        } " +
        "        th " +
        "{            font-weight: bold; " +
        "            font-size: 9pt; " +
        "            vertical-align: middle; " +
        "            padding: 5px 6px 3px; " +
        "            background-color: #e3e3e3; " +
        "            color: #333333; " +
        "        } " +
        "        td " +
        "{            padding: 4px 6px; " +
        "        } " +
        "</style> " +
        "</head> " +
        " <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '8' ||record.subsidiary.internalid?string == '16'> " +
        "<body header=\"nlheader\" header-height=\"8%\" footer=\"nlfooter\" footer-height=\"8.5%\" padding=\"0.5in 0.5in 0.5in 0.5in\" size=\"Letter\"> " +
        "  <#else> " +
        "<body header=\"nlheader\" header-height=\"12%\" footer=\"nlfooter\" footer-height=\"8%\" padding=\"0.5in 0.5in 0.5in 0.5in\" size=\"Letter\"> " +
        "  </#if> " +
        "  <h4 align=\"center\" style=\"font-style:normal;\">SALES ORDER</h4> " +
        "   <table style=\"width: 100%; margin-top: 10px;\"> " +
        "  <tr><td style=\"width:100px;\"><b>From</b> : ${record.salesrep.salutation} ${record.salesrep.firstname} ${record.salesrep.lastname}</td><td style=\"width:65px;\"><b>To</b> : ${record.entity.altname}</td></tr> " +
        "  <tr><td style=\"width:100px;\"><b>Start Date</b> :<#if record.startdate?has_content> ${record.startdate?string[\"d-MMM-yy\"]}</#if></td><td style=\"width:65px;\"><b>Phone</b> : ${record.entity.phone}</td></tr> " +
        "     <tr><#if record.enddate?string == \"\"><td style=\"width:100px;\"><b>End Date</b> : ${record.enddate}</td><#else><td style=\"width:100px;\"><b>End Date</b> : ${record.enddate?string[\"d-MMM-yy\"]}</td></#if><td style=\"width:100px;\"><b>Site Contact</b> : ${record.custbody_site_contact}</td></tr> " +
        "  <tr><td style=\"width:100px;\"><b>Sales Order#</b> : ${record.tranid}</td><td style=\"width:65px;\"><b>Related</b> : ${record.createdfrom}</td></tr> " +
        "   " +
        "  <tr><td style=\"width:100px;\"><b>Site</b> : ${record.custbody_site}</td><td style=\"width:65px;\"><b>Attn.</b> : ${record.custbody_attention}<#if record.custbody_attention.mobilephone?has_content>( ${record.custbody_attention.mobilephone} )</#if></td></tr> " +
        "  <tr><td style=\"width:100px;\"><b>Scope of work</b> : ${record.custbody_scope_of_work}</td><td style=\"width:100px;\"><b>PO#</b> : ${record.otherrefnum}</td></tr> " +
        "</table> " +
        "<#if record.item?has_content> "
    if ("T" == salesorder.getFieldValue("custbody_allow_lump_sum")) {
        template += "<table class=\"itemtable\" style=\"width: 100%; margin-top: 12px;\">";
        nlapiLogExecution("DEBUG", "starting", "---");
        var lineCount = salesorder.getLineItemCount('item');
        var lineGrpSum = 0;
        var count = 0;
        var j = 0;
        if (lineCount > 0) {
            for (var i = 1; i <= lineCount; i++) {
                var groupType = salesorder.getLineItemValue('item', 'itemtype', i);
                var itemInGroup = salesorder.getLineItemValue('item', 'ingroup', i);
                var unitPrice = salesorder.getLineItemValue('item', 'rate', i);
                if (groupType == "Description") {
                    count++;
                    if (count == 2) {
                        var nextitem = 1;
                    }
                }
                if (groupType != "Description" && count == 1) {
                    lineGrpSum = +lineGrpSum + +unitPrice;
                }
                if (i == 1) {
                    template += "<thead> " +
                        "  <tr> " +
                        "    <th colspan=\"12\" align=\"center\">Details</th> " +
                        "    <th colspan=\"6\" align=\"center\">Item</th> " +
                        "  <th align=\"center\" colspan=\"6\">Unit</th> " +
                        "  <th align=\"center\" colspan=\"4\">Qty</th> " +
                        "  <th align=\"center\" colspan=\"4\">Rate</th> " +
                        "  </tr> " +
                        "</thead> ";
                }
                if (j % 2 == 0) {
                    template += "<tr>";
                } else {
                    template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                }

                if (nextitem == 1 || i == lineCount) {
                    template += "    <td colspan=\"12\">" + iteamName + "</td> " +
                        "    <td align=\"center\" colspan=\"6\"></td> " +
                        "  <td align=\"center\" colspan=\"6\" line-height=\"150%\">${item.custcol_rent_rental_unit}</td> " +
                        "    <td align=\"center\" colspan=\"4\">${item.custcol_rent_allocated_quantity}</td> " +
                        "    <td align=\"center\" colspan=\"4\">" + lineGrpSum + "</td> "
                    lineGrpSum = 0;
                    iteamName = 0;
                    count--;
                    nextitem = 0;
                    j++;
                }
                template += "  </tr> ";
                if (groupType == "Description") {
                    var iteamName = salesorder.getLineItemValue('item', 'description', i);
                }
            }
        }
        template += "</table><hr />";
    } else {
        template += "<table class=\"itemtable\" style=\"border:1px solid; border-collapse: collapse;width: 100%; margin-top: 10px;\"><#list record.item as item><#if item_index==0> " +
            "<thead> " +
            "  <tr> " +
            "    <th colspan=\"10\" align=\"center\" style=\"border-bottom:1px solid;\">Details</th> " +
            "    <th colspan=\"4\" align=\"center\"  style=\"border-left:1px solid;border-bottom:1px solid;\">Item</th> " +
            "  <th align=\"center\" colspan=\"2\"  style=\"border-left:1px solid;border-bottom:1px solid;\">Unit</th> " +
            "  <th align=\"center\" colspan=\"1\"  style=\"border-left:1px solid;border-bottom:1px solid;\"> Qty</th> " +
            "  </tr> " +
            "</thead> " +
            "</#if><#if (item_index % 2) == 0><tr><#else><tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\"></#if>" +
            "    <td colspan=\"10\" align=\"left\" >${item.description}</td> " +
            "    <td align=\"left\" colspan=\"4\" style=\"border-left:1px solid;\">${item.item}</td> " +
            "  <td align=\"center\" colspan=\"2\" style=\"border-left:1px solid;\" line-height=\"150%\">${item.custcol_rent_rental_unit}</td> " +
            "    <td align=\"center\" colspan=\"1\" style=\"border-left:1px solid;\">${item.custcol_rent_rental_quantity}</td> " +
            "  </tr> " +
            "  </#list></table> ";
    }
    template += "<hr style=\"width: 100%; color: #d3d3d3; background-color: #d3d3d3; height: 1px;\" /></#if> " +
        "   " +
        "  <table style=\"width:100%; margin-top:10px;\"> " +
        "     <tr> " +
        "    <td style=\"color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;\">Remarks</td> " +
        "  </tr> " +
        "        <tr><td>${record.custbody_sa_remarks}</td></tr> " +
        "    </table> " +
        "</body> " +
        "</pdf>";
    renderer.setTemplate(template);
    renderer.addRecord('record', salesorder);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'Salesorder' + salesorder.getFieldValue('id') + '.pdf', 'inline');
    response.write(file.getValue());
}