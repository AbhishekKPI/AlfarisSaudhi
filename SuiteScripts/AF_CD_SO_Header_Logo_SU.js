function printSalesOrderFormatAction(request, response) {
    // var recordID = request.getParameter("recordID");
    // var salesorder = nlapiLoadRecord("salesorder", recordID);
    // var renderer = nlapiCreateTemplateRenderer();
    // var template = "";
    // template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> " +
    //     "<pdf> " +
    //     "<head> " +
    //     "<#if .locale == \"ru_RU\"> " +
    //     "    <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> " +
    //     "</#if> " +
    //     "<macrolist>";
    // var headerlogo = salesorder.getFieldValue("custbody_subsidiary_log");
    // var footerlogotop = salesorder.getFieldValue("custbody_subsidiary_top_foot");
    // var footerlogobottom = salesorder.getFieldValue("custbody_subsidiary_footer_bottom");

    // if (headerlogo) {
    //     template += "        <macro id=\"nlheader\"> ";
    //     template += "<img class=\"header\" style=\"width:58%;height:40%;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" height=\"40\%\" width=\"58\%\"  src = \"";
    //     var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
    //     template += nlapiEscapeXML(path);
    //     template += "\"></img>";
    //     template += "        </macro> ";
    // }

    // ---
    // var recordID = request.getParameter("recordID");
    // var invoice = nlapiLoadRecord('invoice', recordID);
    // var renderer = nlapiCreateTemplateRenderer();
    var recordID = request.getParameter("recordID");
    var salesorder = nlapiLoadRecord("salesorder", recordID);
    var renderer = nlapiCreateTemplateRenderer();
    var template = "";
    var sub_id = salesorder.getFieldValue("subsidiary");
    var location = salesorder.getFieldValue("location");
    var siteContact = salesorder.getFieldValue("custbody_site_contact");
    nlapiLogExecution("DEBUG", "siteContact ", siteContact);

    var aramcoRig = salesorder.getFieldValue("custbody_aramco_rig");
    var aramcoCnstrctn = salesorder.getFieldValue("custbody_aramco_construction");
    var nonAramcoPlant = salesorder.getFieldValue("custbody_nonramco_plant");
    var nonAramcoCnstrctn = salesorder.getFieldValue("custbody_nonramco_construction");










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
    var sub_maseter = nlapiLoadRecord("subsidiary", sub_id)
    var headerlogo = sub_maseter.getFieldValue("logo");
    var footerlogotop = sub_maseter.getFieldValue("custrecord_subsidiary_top_footer");
    var footerlogobottom = sub_maseter.getFieldValue("custrecord_subsidiary_bottom_foot");
    if (headerlogo) {
        nlapiLogExecution("DEBUG", "sub_id ", sub_id);

        if (sub_id == "8" && location != "8") {
            // TRANSPORT
            template += "<img class=\"header\" style=\"width:57%;height:38%;margin-left:-45px; padding-right:-1000px;margin-top:-48px;\" height=\"40\%\" width=\"100\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
        } else if (sub_id == "8" && location == "8") {
            // CONTRACTING CO
            template += "<img class=\"header\" style=\"width:60%;height:38%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"62\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile('Logo/logo_facc.png').getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
        } else {
            // INTERNATIONAL
            template += "<img class=\"header\" style=\"width:57%;height:50%;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" height=\"40\%\" width=\"62\%\"  src = \"https://system.eu2.netsuite.com/core/media/media.nl?id=26487&amp;c=4647359&amp;h=N7yMHyudqD68aN6yaYCarDgu-nT4u0aoi7g3lKZ708dlEsDK";
            // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            // template += nlapiEscapeXML(path);
            template += "\"></img>";
        }







    }
    template += "        </macro> ";
    template += "<macro id=\"nlfooter\">";


    // ----
    if (footerlogobottom) {
        template += "<img class=\"footer\" style=\"width:96%; height:100%;top:70px;margin-left:-50px;p\" height=\"100\%\" width=\"100\%\"  src = \"";
        var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
        template += nlapiEscapeXML(path);
        template += "\"></img>";
    }
    if (footerlogotop) {
        template += "<img class=\"footer\" style=\"top:-30px;left:512px;margin-right:-40px;width:100%; height:100%;\" height=\"100\%\" width=\"100\%\"  src = \"";
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
        " <#if record.subsidiary.internalid?string == '16'> " +
        "<body header=\"nlheader\" header-height=\"8%\" footer=\"nlfooter\" footer-height=\"6.5%\" padding=\"0.5in 0.5in 0.5in 0.5in\" size=\"Letter\"> " +
        "  <#else> " +
        "<body header=\"nlheader\" header-height=\"10%\" footer=\"nlfooter\" footer-height=\"8%\" padding=\"0.5in 0.5in 0.5in 0.5in\" size=\"Letter\"> " +
        "  </#if> " +
        "  <h4 align=\"center\" style=\"font-style:normal;\">SALES ORDER</h4> " +
        "   <table style=\"width: 100%; margin-top: 10px;\"> " +
        "  <tr><td style=\"width:100px;\"><b>From</b> : ${record.salesrep.salutation} ${record.salesrep.firstname} ${record.salesrep.lastname}</td><td style=\"width:65px;\"><b>To</b> : ${record.entity.altname}</td></tr> " +
        "  <tr><td style=\"width:100px;\"><b>Start Date</b> :<#if record.startdate?has_content> ${record.startdate?string[\"d-MMM-yy\"]}</#if></td><td style=\"width:65px;\"><b>Phone</b> : ${record.entity.phone}</td></tr> " +
        "     <tr><#if record.enddate?string == \"\"><td style=\"width:100px;\"><b>End Date</b> : ${record.enddate}</td><#else><td style=\"width:100px;\"><b>End Date</b> : ${record.enddate?string[\"d-MMM-yy\"]}</td></#if><td style=\"width:100px;\"><b>Site Contact</b> :" + siteContact + "</td></tr> " +
        "  <tr><td style=\"width:100px;\"><b>Sales Order#</b> : ${record.tranid}</td><td style=\"width:65px;\"><b>Related</b> : ${record.createdfrom}</td></tr> " +
        "   " +
        //"  <tr><td style=\"width:100px;\"><b>Site</b> : ${record.custbody_site}</td><td style=\"width:65px;\"><b>Attn.</b> : ${record.custbody_attention}<#if record.custbody_attention.mobilephone?has_content>( ${record.custbody_attention.mobilephone} )</#if></td></tr> " +
        // "  <tr><td style=\"width:100px;\"><b>Scope of work</b> : ${record.custbody_scope_of_work}</td><td style=\"width:100px;\"><b>PO#</b> : ${record.otherrefnum}</td></tr> "+
        "  <tr><td style=\"width:100px;\"><b>Site</b> : ${record.custbody_site}</td><td style=\"width:100px;\"><b>PO#</b> : ${record.otherrefnum}</td></tr> ";

    if ("T" == salesorder.getFieldValue("custbody_allow_overdue")) {
        template += " <tr><td style = \"width:100px;\"><b>Overdue Balace</b> : ${record.custbody_overduce_balance}</td><td style=\"width:100px;\"><b>Days Overdue</b> : ${record.custbody_days_overdue}</td></tr> ";
    }
    template += "</table> " +


        "<table style=\"width: 100%;\" >" +
        "<tr>" +
        "<td style=\"width: 50%;\" align=\"center\"><u> ARAMCO SITE</u>" +
        "</td>" +
        "<td style=\"width: 50%;\" align=\"center\"> <u>NON ARAMCO(TUV)</u>" +
        "</td>" +

        "</tr>" +

        "</table>" +
        "<table style=\"width: 100%;\">" +
        "<tr>" +
        "<td style=\"width:7%\"> RIG </td>";
    if (aramcoRig == 'T') {
        template += "<td style=\"width:5\"> <div style=\"width:10px;height:12px;border:1px solid #000000;box-sizing: border-box;\" ><img src=\"http://4647359.shop.netsuite.com/core/media/media.nl?id=29320&amp;c=4647359&amp;h=rPxsQ477FMF6aVlfMSsOVcQK1PkgqKlxxZJIvDDXursigwk-\" style=\"width:10px;height:10px;\"></img></div>" +
            "</td>"
    } else {
        template += "<td style=\"width:5\"> <div style=\"width:10px;height:12px;border:1px solid #000000;box-sizing: border-box;\" ></div>" +
            "</td>"
    }





    template += "<td style=\"width:30%;align:right\"> CONSTRUCTION </td>";
    if (aramcoCnstrctn == 'T') {
        template += "<td style=\"width:8%\"><div style=\"width:10px;height:12px;border:1px solid #000000;box-sizing: border-box;\" ><img src=\"http://4647359.shop.netsuite.com/core/media/media.nl?id=29320&amp;c=4647359&amp;h=rPxsQ477FMF6aVlfMSsOVcQK1PkgqKlxxZJIvDDXursigwk-\" style=\"width:10px;height:10px;\"></img></div>" +
            "</td>";
    } else {
        template += "<td style=\"width:8%\"><div style=\"width:10px;height:12px;border:1px solid #000000;box-sizing: border-box;\" ></div>" +
            "</td>"
    }

    template += "<td style=\"width:19.5%;align:right;\"> PLANT </td>";
    if (nonAramcoPlant == 'T') {
        template += "<td style=\"width:3%;\"><div style=\"width:10px;height:12px;border:1px solid #000000;box-sizing: border-box;\" ><img src=\"http://4647359.shop.netsuite.com/core/media/media.nl?id=29320&amp;c=4647359&amp;h=rPxsQ477FMF6aVlfMSsOVcQK1PkgqKlxxZJIvDDXursigwk-\" style=\"width:10px;height:10px;\"></img></div>" +
            "</td>"
    } else {
        template += "<td style=\"width:3%;\"><div style=\"width:10px;height:12px;border:1px solid #000000;box-sizing: border-box;\" ></div>" +
            "</td>"
    }


    template += "<td style=\"width:28%;align:right;\"> CONSTRUCTION </td>";
    if (nonAramcoCnstrctn == 'T') {
        template += "<td style=\"width:8%;\"><div style=\"width:10px;height:12px;border:1px solid #000000;box-sizing: border-box;\" ><img src=\"http://4647359.shop.netsuite.com/core/media/media.nl?id=29320&amp;c=4647359&amp;h=rPxsQ477FMF6aVlfMSsOVcQK1PkgqKlxxZJIvDDXursigwk-\" style=\"width:10px;height:10px;\"></img></div>" +
            "</td>"
    } else {
        template += "<td style=\"width:8%;\"><div style=\"width:10px;height:12px;border:1px solid #000000;box-sizing: border-box;\" ></div>" +
            "</td>"
    }
    template += "</tr>" +




        "</table>" +










        "<#if record.item?has_content> ";
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
                    template += "    <td colspan=\"12\">" + replaceCharector(removeNull(iteamName)) + "</td> " +
                        "    <td align=\"center\" colspan=\"6\"></td> " +
                        "  <td align=\"center\" colspan=\"6\" line-height=\"150%\">${item.custcol_rent_rental_unit}</td> " +
                        "    <td align=\"center\" colspan=\"4\">${item.custcol_rent_rental_quantity}</td> " +
                        "    <td align=\"center\" colspan=\"4\">" + lineGrpSum.toFixed(2) + "</td> "
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

        var lineCount = salesorder.getLineItemCount('item');
        var lineGrpSum = 0;
        var count = 0;
        var j = 0;
        if (lineCount > 0) {
            template += "<table class=\"itemtable\" style=\"width: 100%; margin-top: 10px;\">" +
                "<thead> " +
                "  <tr> " +
                "    <th colspan=\"12\" align=\"center\">Details</th> " +
                "    <th colspan=\"6\" align=\"center\">Qty</th> " +
                "  <th align=\"center\" colspan=\"6\">Unit</th> " +
                "  <th align=\"center\" colspan=\"4\">Min Hrs</th> " +
                "  <th align=\"center\" colspan=\"4\">Min Days</th> " +
                "  </tr> " +
                "</thead> "
            for (var k = 1; k <= lineCount; k++) {



                var rntlDescr = salesorder.getLineItemValue('item', 'description', k);
                if (rntlDescr) {
                    rntlDescr = rntlDescr;
                } else {
                    rntlDescr = salesorder.getLineItemText('item', 'item', k);
                }
                var rntlQty = salesorder.getLineItemValue('item', 'custcol_rent_rental_quantity', k);
                if(!rntlQty){
                    rntlQty = "";
                    
                }
                var rntlUnit = salesorder.getLineItemText('item', 'custcol_rent_rental_unit', k);
                var itemType = salesorder.getLineItemValue('item', 'custcol_rent_item_type', k);

                var billingRule = salesorder.getLineItemValue('item', 'custcol_rent_billing_rule', k);
                nlapiLogExecution("DEBUG", "billingRule", billingRule);

                var billingRuleRec = "";
                var billingDays = "";
                var billingHrs = "";
                if (billingRule) {


                    billingRuleRec = nlapiLoadRecord("customrecord_rent_billing_rule", billingRule);
                    nlapiLogExecution("DEBUG", "billingRuleRec", billingRuleRec);

                    billingDays = billingRuleRec.getFieldText("custrecord_rent_billing_days");
                    billingHrs = billingRuleRec.getFieldValue("custrecord_rent_billing_hours_per_day");
                    nlapiLogExecution("DEBUG", "billingDays", billingDays);

                    nlapiLogExecution("DEBUG", "billingHrs", billingHrs);

                }




                template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">" +
                    "    <td colspan=\"12\">" + replaceCharector(removeNull(rntlDescr)) + "</td> " +
                    "    <td align=\"center\" colspan=\"6\"><p align=\"center\">" + rntlQty + "</p></td> " +
                    "  <td align=\"center\" colspan=\"6\" line-height=\"150%\">" + rntlUnit + "</td> "
                    // "    <td align=\"center\" colspan=\"4\">${item.custcol_min_hours}</td> " +
                    // "    <td align=\"center\" colspan=\"4\">${item.custcol_min_days}</td> " +
                if (itemType == 4) {
                    template += "    <td align=\"center\" colspan=\"4\"></td> " +
                        "    <td align=\"center\" colspan=\"4\"></td> "
                } else {
                    template += "    <td align=\"center\" colspan=\"4\">" + billingHrs + "</td> " +
                        "    <td align=\"center\" colspan=\"4\">" + billingDays + "</td> "
                }
                // "    <td align=\"center\" colspan=\"4\"></td> " +
                // "    <td align=\"center\" colspan=\"4\"></td> " +
                template += "  </tr> "


            }
            template += " </table> ";
        }
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

function replaceCharector(charVal) {
    return charVal.replace(/&/g, "&amp;");
}

function removeNull(string) {
    if (string == null) {
        string = "";
    } else {
        string = string;
    }
    return string;
}