function printQuoteEnergyFormatAction(request, response) {
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
    var subsidiary = estimate.getFieldValue("subsidiary");
    var sub_master = nlapiLoadRecord("subsidiary", subsidiary);
    var headerlogo = sub_master.getFieldValue("logo"); 
    var location = estimate.getFieldValue("location");
    nlapiLogExecution("DEBUG", "location", location);
     var additionalCharges = estimate.getFieldValue("custbody_special_notes");
    nlapiLogExecution("DEBUG", "additionalCharges", additionalCharges);
  
    var footerlogotop = sub_master.getFieldValue("custrecord_subsidiary_top_footer");
    var footerlogobottom = sub_master.getFieldValue("custrecord_subsidiary_bottom_foot");
    // nlapiLogExecution("DEBUG", "headerlogo", headerlogo);
    // nlapiLogExecution("DEBUG", "footerlogotop", footerlogotop);
    // nlapiLogExecution("DEBUG", "footerlogobottom", footerlogobottom);
    if (subsidiary == '8' && location == '8') {
        if (headerlogo) {
            template += "        <macro id=\"nlheader\"> ";
            template += "<img class=\"header\" style=\"width:758px;height:80px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile('Logo/logo_facc.png').getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
            template += "        </macro> ";
        }

    } else if (subsidiary == '8') {
        if (headerlogo) {
            template += "        <macro id=\"nlheader\"> ";
            template += "<img class=\"header\" style=\"width:768px;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
            template += "        </macro> ";
        }

    }
    // live issue 17-05-2023

    else if ( location == '21') {
      
            template += "        <macro id=\"nlheader\"> ";
            // template += "<p style=\"width:100px;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" >";style="width: 100%; margin-top:-50px;margin-left:-70px; margin-right:-40px;"
            // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();"
            template += "<img src=\"https://4647359.app.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7\" style=\"width:725px;  margin-top:-50px; height:100px;padding-left:-80px;\" /> "

            // template += nlapiEscapeXML(path);
            // template += "\"></p>";
            template += "        </macro> ";
     

    } 




    // 
    else {
        if (headerlogo) {
            // template += "<p style=\"font-size: 8pt;top:-20px;width: 75%\" align=\"left\">${record.subsidiary}/${record.tranid}<#if record.entity.isperson?string == 'T'>${record.entity.altname}<#else>${record.entity.companyname}</#if></p>";
            template += "        <macro id=\"nlheader\"> ";
            template += "<img class=\"header\" style=\"width:58%;height:40%;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" height=\"50\%\" width=\"94\%\"  src = \"";
            var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
            template += nlapiEscapeXML(path);
            template += "\"></img>";
            template += "        </macro> ";
        }
    }
    // template += "<macro id=\"nlfooter\">";
    // if (subsidiary == '8') {
    //     if (footerlogobottom) {
    //         template += "<img class=\"footer\" style=\"width:768px;height:90px;top:14px;left:-45px;\"  src = \"";
    //         var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
    //         template += nlapiEscapeXML(path);
    //         template += "\"></img>";
    //     }
    // } else {
    //     if (footerlogobottom) {
    //         template += "<img class=\"footer\" style=\"width:100%; height:100%;top:60px;margin-left:-45px;\" height=\"100\%\" width=\"100\%\"  src = \"";
    //         var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
    //         template += nlapiEscapeXML(path);
    //         template += "\"></img>";
    //     }
    //     if (footerlogotop) {
    //         template += "<img class=\"footer\" style=\"top:-38px;left:512px;margin-right:-40px;width:100%; height:100%;\" height=\"100\%\" width=\"96\%\"  src = \"";
    //         var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogotop).getURL();
    //         template += nlapiEscapeXML(path);
    //         template += "\"></img>";
    //         template += "<p style=\"font-size: 8pt;top:-95px;width: 75%\" align=\"left\">${record.subsidiary}/${record.tranid}<#if record.entity.isperson?string == 'T'>${record.entity.altname}<#else>${record.entity.companyname}</#if></p>";
    //         template += "<p align=\"right\" style=\"top:-150px;font-size: 8pt;\">(Page <pagenumber/> of <totalpages/>)</p>";

    //     }
    // }
    // template += "      </macro> ";
    template += "    </macrolist> " +
        "    <style type=\"text/css\">table " +
        "{            font-family: sans-serif; " +
        "            font-size: 10pt; " +
        "            table-layout: fixed; " +
        "        } " +
        "        th " +
        "{            font-weight: bold; " +
        "            font-size: 9pt; " +
        "            vertical-align: middle; " +
        "            padding: 5px 6px 3px; " +
        "            background-color: #e3e3e3; " +
        "            color: #000000; " +
        "        } " +
        "      td p { align:left; } " +
        "        /*td { " +
        "    padding: 4px 6px; " +
        "}*/ " +
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
        "      body { background-image:url(https://system.eu2.netsuite.com/core/media/media.nl?id=56944&amp;c=4119372&amp;h=81b3d9cd8670550e52ae);} " +
        "       " +
        "</style> " +
        "</head> " +
        "  <body style=\"font-family:sans-serif;background-color:#ffffff;\" header=\"nlheader\" footer-height=\"7%\" header-height=\"10%\" footer=\"nlfooter\" background-image-width=\"8.5in\" background-image-position=\"bottom center\" background-image-height=\"4in\"   size=\"Letter\" > " +
        "<!--<body header=\"nlheader\" header-height=\"13%\" footer=\"nlfooter\" footer-height=\"11%\" padding=\"0.5in 0.5in 0.5in 0.5in\" size=\"Letter\">--> "
        //+ "<#if record.subsidiary.custrecord_is_energy?string == 'Yes'> "
        +
        "<#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'>" +
        "<div style=\"min-height:1500px;\"> " +
        "  <table style=\"width:100%;font-size:12px;font-style: italic;\"> " +
        "    <tr><td style=\"width:100%;font-size:11px;\"><b>${record.salesrep.firstname} ${record.salesrep.lastname}</b><br/>${record.salesrep.title}<br/>${record.salesrep.email}<br/>T: ${record.salesrep.mobilephone}<br/>" +
        "F: ${record.salesrep.fax}<br/></td></tr> " +
        "  </table> " +
        "<hr /> " +
        "  <table style=\"width:100%;\"> " +
        "    <tr><td style=\"width:100%;font-size:12px;\">${record.trandate?string(\"d-MMM-yyyy\")}</td></tr> " +
        "    <tr><td style=\"width:100%;font-size:12px;\">M/s. <b>${record.entity.altname}</b></td></tr> " +
        "    <tr><td style=\"width:100%;font-size:12px;\">${record.entity.address}</td></tr> " +
        "  </table> " +
        "   " +
        "  <table style=\"width:100%;\"> " +
        "    <tr> " +
        "      <td style=\"width:8%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;background-color:#e8e8e9;\"><b>ATTN</b></td> " +
        "      <td style=\"width:42%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;\">${record.custbody_attention}</td> " +
        "      <td style=\"width:9%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;background-color:#e8e8e9;\"><b>PHONE</b></td> " +
        "      <td style=\"width:17%;font-size:12px;border-left:solid 1px #000;border-top:solid 1px #000;\">${record.custbody_phone}</td> " +
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
        "  <table style=\"width:100%;margin-top:10px;\"> ";
    var edIntroduction = estimate.getFieldValue("custbody_ed_introduction");
    nlapiLogExecution("DEBUG", "edIntroduction", edIntroduction);
    template += "    <tr><td style=\"width:100%;font-size:12px;text-align:justify;\">" + relaceCharector(removeNull(edIntroduction)) + "</td></tr> " +
        // template += "    <tr><td style=\"width:100%;font-size:12px;text-align:justify;\">${record.custbody_ed_introduction}</td></tr> " +
        "  </table> " +
        "</div> " +
        "   " +
        "   <table> " +
        "    <tr><td style=\"font-weight:bold;font-size:12px;\">1. EQUIPMENT HIRE CHARGES</td></tr> " +
        "  </table> " +
        "<#if record.item?has_content> "
    if ("T" == estimate.getFieldValue("custbody_allow_lump_sum")) {
        template += "<table class=\"itemtable\" style=\"width: 100%; margin-top: 12px;\">";
        var lineCount = estimate.getLineItemCount('item');
        var RateSum = 0;
        var AmountSum = 0;
        var count = 0;
        var OthersList = [];
        var k = 0;
        var j = 0;
        if (lineCount > 0) {
            for (var i = 1; i <= lineCount; i++) {
                var groupType = estimate.getLineItemValue('item', 'itemtype', i);
                var itemInGroup = estimate.getLineItemValue('item', 'ingroup', i);
                var Rate = estimate.getLineItemValue('item', 'rate', i);
                var Amount = estimate.getLineItemValue('item', 'amount', i);
                var itemType = estimate.getLineItemValue('item', 'custcol_rent_item_type', i);

                if (groupType == "Description") {
                    count++;
                    if (count == 2) {
                        var nextitem = 1;
                    }
                }
                if (groupType != "Description" && count == 1 && itemType != 5) {
                    RateSum = +RateSum + +Rate;
                    AmountSum = +AmountSum + +Amount;
                }
                if (itemType == 5) {
                    OthersList[k++] = i;
                }
                if (i == 1) {
                    template += "<thead> " +
                        "    <tr> " +
                        "    <th colspan=\"12\">Equipment</th> " +
                        "  <th align=\"center\" colspan=\"6\">Unit</th> " +
                        "    <th align=\"right\" colspan=\"6\">Rate</th> " +
                        "     <th align=\"right\" colspan=\"6\">Amount(${record.currency})</th> " +
                        "  </tr> " +
                        "</thead> "
                }
                if (j % 2 == 0) {
                    template += "<tr>";
                } else {
                    template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                }

                if (nextitem == 1 || i == lineCount) {
                    template += "    <td  colspan=\"12\">" + replaceAndOper(iteamName) + "</td> " +
                        "    <td  align=\"center\" colspan=\"6\">LS</td> ";
                    template += "<td  align=\"right\" colspan=\"6\">" + RateSum + "</td>";
                    template += "<td  align=\"right\" colspan=\"6\">" + AmountSum + "</td>";

                    RateSum = 0;
                    AmountSum = 0;
                    iteamName = 0;
                    count--;
                    nextitem = 0;
                    j++;
                }
                template += "  </tr> ";
                if (groupType == "Description") {
                    var iteamName = estimate.getLineItemValue('item', 'description', i);
                }
            }

        }
        template += "</table><hr />";
        if (OthersList.length > 0) {
            var x = 1;
            template += "<table   style=\"width: 100%;margin-top: 12px\">";
            template += "<thead> " +
                "  <tr> " +
                "  <th align=\"left\"  style=\"font-size:10px;\" colspan=\"29\">Other</th> " +
                "  </tr> " +
                "</thead> " +
                "  <tr> " +
                "    <th colspan=\"2\" align=\"center\" style=\"font-size:10px;\">SN.</th> " +
                "    <th colspan=\"17\" align=\"center\" style=\"font-size:10px;\">Details</th> " +
                "  <th align=\"center\" colspan=\"5\" style=\"font-size:10px;\" >Unit</th> " +
                "  <th align=\"center\" colspan=\"5\" style=\"font-size:10px;\" >Amount</th> " +
                "  </tr> ";
            for (var i = 0; i < OthersList.length; i++) {
                var iteamName = estimate.getLineItemValue('item', 'description', OthersList[i]);
                var billing_rule_display = estimate.getLineItemValue('item', 'custcol_rent_billing_rule_display', OthersList[i]);
                var amount = estimate.getLineItemValue('item', 'amount', OthersList[i]);

                template += "<tr>";
                template += "    <td  align=\"center\" colspan=\"2\">" + x++ + "</td> " +
                    "    <td  colspan=\"17\">" + replaceAndOper(removeNull(iteamName)) + "</td> " +
                    "  <td align=\"center\" colspan=\"5\" line-height=\"150%\">" + removeNull(billing_rule_display) + "</td> " +
                    "  <td  align=\"center\" colspan=\"5\">" + amount + "</td> ";
                template += "  </tr> ";
            }
            template += "</table>";

        }
    } else {
        template += "<table class=\"itemtable\" style=\"width: 100%;border:1px solid; border-collapse: collapse; margin-top: 12px;\">" +
            // " <!-- start items --><#list record.item as item><#if item_index==0> " +
            "<thead > " +
            "    <tr> " +
            "    <th colspan=\"8\" align=\"center\" style=\"border-bottom:1px solid;\">Equipment</th> " +
            "    <th colspan=\"2\" align=\"center\" style=\"border-left:1px solid;border-bottom:1px solid;\">Qty</th> " +
            "  <th align=\"center\" colspan=\"2\" style=\"border-left:1px solid;border-bottom:1px solid;\">Unit</th> " +
            "  <th align=\"center\" colspan=\"2\" style=\"border-left:1px solid;border-bottom:1px solid;\"><p align=\"center\">No.of D/W/M</p></th> " +
            "    <th align=\"center\" colspan=\"2\" style=\"border-left:1px solid;border-bottom:1px solid;\">Unit Rate</th> " +
            "     <th align=\"center\" colspan=\"2\" style=\"border-left:1px solid;border-bottom:1px solid;\"><p align=\"center\">Amount(${record.currency})</p></th> " +
            "  </tr> " +
            "</thead> ";
        var lineCount = estimate.getLineItemCount('item');
        var linecolor = 0;
        var k = 0;
        var OthersList = [];
        for (var i = 1; i <= lineCount; i++) {
            var description = estimate.getLineItemValue('item', 'description', i);
            var quantity = estimate.getLineItemValue('item', 'custcol_rent_rental_quantity', i);
            var units = estimate.getLineItemText('item', 'custcol_rent_rental_unit', i);
            var NOHDWM = estimate.getLineItemValue('item', 'custcol_rent_no_of_hdwm', i);
            var rate = estimate.getLineItemValue('item', 'rate', i);
            var amount = estimate.getLineItemValue('item', 'amount', i);
            var includedItem = estimate.getLineItemValue('item', 'custcol_included_item', i);
            var item_display = estimate.getLineItemValue('item', 'item_display', i);
            if (item_display == 'DIESEL.') {
                OthersList[k++] = i;
            } else {
                // "</#if><#if (item_index % 2) == 0>" +
                if (linecolor % 2 == 0) {
                    template += "<tr>";
                } else {
                    template += " <tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                }
                // "</#if> " +
                template += "    <td  align=\"left\" colspan=\"8\">" + lumpdescription(replaceAndOper(removeNull(description))) + "</td> " +
                    "    <td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\">" + quantity + "</td> " +
                    "  <td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\" line-height=\"150%\">" + units + "</td> " +
                    "  <td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\" line-height=\"150%\">" + NOHDWM + "</td> ";
                if (includedItem == "T") {
                    template += "<td  align=\"right\" colspan=\"2\">Included</td>";
                } else {
                    template += "<td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\">" + numberWithCommas(rate) + "</td>";
                }
                if (includedItem == "T") {
                    template += " <td  align=\"right\" colspan=\"2\">Included</td>";
                } else {
                    template += "<td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\">" + numberWithCommas(amount) + "</td>";
                }
                template += "  </tr> ";
                linecolor++;

            }

        }
        // "  </#list><!-- end items -->" +
        template += "</table> ";
        if (OthersList.length > 0) {
            var linecolor = 0;
            var x = 1;
            template += "<table   style=\"width: 100%;margin-top: 12px;border:1px solid; border-collapse: collapse;\">";
            template += "<thead> " +
                "  <tr style=\"border-bottom:1px solid;\"> " +
                "  <th align=\"left\"  style=\"font-size:10px;\" colspan=\"18\">Other</th> " +
                "  </tr> " +
                "</thead> ";
            // template += "    <tr> " +
            // "    <th colspan=\"8\" align=\"center\" style=\"border-bottom:1px solid;\">Equipment</th> " +
            // "    <th colspan=\"2\" align=\"center\" style=\"border-left:1px solid;border-bottom:1px solid;\">Qty</th> " +
            // "  <th align=\"center\" colspan=\"2\" style=\"border-left:1px solid;border-bottom:1px solid;\">Unit</th> " +
            // "  <th align=\"center\" colspan=\"2\" style=\"border-left:1px solid;border-bottom:1px solid;\"><p align=\"center\">No.of D/W/M</p></th> " +
            // "    <th align=\"center\" colspan=\"2\" style=\"border-left:1px solid;border-bottom:1px solid;\">Unit Rate</th> " +
            // "     <th align=\"center\" colspan=\"2\" style=\"border-left:1px solid;border-bottom:1px solid;\"><p align=\"center\">Amount(${record.currency})</p></th> " +
            // "  </tr> ";
            for (var i = 0; i < OthersList.length; i++) {
                var description = estimate.getLineItemValue('item', 'description', OthersList[i]);
                var quantity = estimate.getLineItemValue('item', 'custcol_rent_rental_quantity', OthersList[i]);
                var units = estimate.getLineItemText('item', 'custcol_rent_rental_unit', OthersList[i]);
                var NOHDWM = estimate.getLineItemValue('item', 'custcol_rent_no_of_hdwm', OthersList[i]);
                var rate = estimate.getLineItemValue('item', 'rate', OthersList[i]);
                var amount = estimate.getLineItemValue('item', 'amount', OthersList[i]);
                var includedItem = estimate.getLineItemValue('item', 'custcol_included_item', OthersList[i]);
                var item_display = estimate.getLineItemValue('item', 'item_display', OthersList[i]);


                if (linecolor % 2 == 0) {
                    template += "<tr>";
                } else {
                    template += " <tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                }
                // "</#if> " +
                template += "    <td  align=\"left\" colspan=\"8\">" + lumpdescription(replaceAndOper(removeNull(description))) + "</td> " +
                    "    <td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\">" + quantity + "</td> " +
                    "  <td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\" line-height=\"150%\">" + units + "</td> " +
                    "  <td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\" line-height=\"150%\">" + NOHDWM + "</td> ";
                if (includedItem == "T") {
                    template += "<td  align=\"right\" colspan=\"2\">Included</td>";
                } else {
                    template += "<td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\">" + numberWithCommas(rate) + "</td>";
                }
                if (includedItem == "T") {
                    template += " <td  align=\"right\" colspan=\"2\">Included</td>";
                } else {
                    template += "<td style=\"border-left:1px solid;\" align=\"center\" colspan=\"2\">" + numberWithCommas(amount) + "</td>";
                }
                template += "  </tr> ";
                linecolor++;
            }
            template += "</table>";

        }
    }
    template += "<hr /></#if> " +

        "   <table> " +
        "     <tr><td style=\"font-family:sans-serif;font-size:12px;font-weight:bold;\">Additional Remarks</td></tr> " +
        "    <tr><td style=\"font-family:sans-serif;font-size:12px;margin-bottom:10px;font-weight:bold;\">${record.custbody_special_notes}</td></tr> " +
        "  </table> " +
        "  <table style=\"width:100%;\"> " +
        "      <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
        "        <tr> " +
        "      <td style=\"font-size:12px;\"><b>2. PAYMENT TERMS</b><br/></td> " +
        "      </tr> " +
        "      <tr><td style=\"font-size:12px;\">${record.terms}</td></tr> " +
        "      <tr><td style=\"font-size:12px;\">For delayed payment beyond agreed payment terms, Delayed penalty charge of 1% per month of outstanding amount shall be applicable.</td></tr> " +
        "      <#else> " +
        "        <tr> " +
        "      <td style=\"font-size:12px;\"><b>2. VAT </b>- VAT - Value added Tax of 15% shall be applicable for the above  full quoted price as per the KSA Federal law.</td> " +
        "      </tr> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">3. PAYMENT TERMS</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">${record.custbody_payment_terms}</td></tr> " +
        "      </#if> " +
        "      <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
        "        <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "        <tr> " +
        "      <td style=\"font-size:12px;\"><b>3. VAT </b>- VAT - Value added Tax of 15% shall be applicable for the above  full quoted price as per the KSA Federal law.</td> " +
        "      </tr> " +
        "      </#if> " +
        "  </table> " +
        "  <table> " +
        "    <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "   <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">4. PERIOD OF HIRE</td></tr> " +
        "     <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">3. PERIOD OF HIRE</td></tr> " +
        "     </#if> " +
        "    <tr><td style=\"font-size:12px;\">The minimum period of hire shall be <b>Min. ${record.custbody_period_of_hire}</b>.The rental term shall commence immediately from the date of equipment delivery from our yard and completes on return of the equipments in our Depot. For any extra period of hire than the above quoted period, we shall charge you proportionately based on the applicable rate as above.</td></tr> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +

        "   <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
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
        // "   " +
        // "  <table style=\"width:100%;\"> " +
        // "    <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15'> " +
        // "     <tr><td  style=\"font-weight:bold;font-size:12px;\">6. 24 HOURS HELPLINE</td></tr> " +
        // "     <#else> " +
        // "     <tr><td  style=\"font-weight:bold;font-size:12px;\">5. 24 HOURS HELPLINE</td></tr> " +
        // "     </#if> " +
        // "    <tr><td style=\"font-size:12px;\">AFER - Energy Division operate a 24 hours following telephone number: <b>800 272637</b></td></tr> " +
        // "  </table> " +
        // "   <table> " +
        // "    <tr><td style=\"height:12px;\">&nbsp;" +
        // "</td></tr> " +
        // "  </table> " +
        "   <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">6. REPLACEMENT</td></tr> " +
        "     <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">6. REPLACEMENT</td></tr> " +
        "     </#if> " +
        "    <tr><td style=\"font-size:12px;\">In the unlikely event that equipment needs to be replaced on site due to breakdown, <#if record.subsidiary.internalid?string == '10'>AFER<#else>AFI</#if> will ensure replacement equipment is supplied as soon as possible.</td></tr> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:12px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "  <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">7. RENTER’S RESPONSIBILITY</td></tr> " +
        "     <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">7. RENTER’S RESPONSIBILITY</td></tr> " +
        "     </#if> " +
        "    <tr><td style=\"font-size:12px;\">The Renter is responsible for checking on a daily basis the oil and water levels of the hired generator. All defects are to be reported to Seller immediately and without delay. Comprehensive Insurance for our equipment at site including Third Party Liability should be arranged by Hirer.</td></tr> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:24px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "  <br/><table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
        "      <tr><td  style=\"font-weight:bold;font-size:12px;\">8. VALIDITY</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">This quotation is valid for 30 days from the date of issuance. <b><i>The sale under this Proposal is subject to Equipment availability at the time of receiving a confirmed written commitment.</i></b></td></tr> " +
        "    <#else> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">8. PAYMENT TERMS</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">${record.custbody_payment_terms}</td></tr> " +
        "     </#if> " +
        "  </table> " +
        "   <table> " +
        "    <tr><td style=\"height:35px;\">&nbsp;" +
        "</td></tr> " +
        "       " +
        "  </table> " +
        "   <table style=\"width:100%;\"> " +
        "    <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
        "       <tr><td  style=\"font-weight:bold;font-size:12px;\">9. The Customer shall return all parts and equipment, packaged in the same manner as when it was delivered on Site at the start of the Hire Period. Should the Customer&nbsp;" +
        "return the Plant with damage that is not consistent with Standard Wear and Tear, the Customer shall be liable to Al Faris&nbsp;" +
        "for:</td></tr> " +
        "    <tr><td style=\"font-size:12px;\">a) The full amount of any cost of repairs for the Plant, which Al Faris shall deem necessary;" +
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
        "    <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
        "     <tr><td  style=\"font-weight:bold;font-size:12px;\">10. TERMS AND CONDITIONS</td></tr> " +
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
        " " +
        "    <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'> " +
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
        "   " +
        "  <table> ";

        if( location == '8' ){
            template += "   <tr><td>On Behalf of <b><i>Faris Al Arab Contracting Co.</i></b></td></tr>";
        } else {

            template +=   "    <#if record.custbody_subsidiary_legal_name?has_content><tr><td>On Behalf of <b><i>${record.custbody_subsidiary_legal_name}</i></b></td></tr><#else><tr><td>On Behalf of <b><i>${record.subsidiary.legalname}</i></b></td></tr></#if> "; 

        }
 
        template += "  </table> " +
        "<table> " +
        "    <tr><td style=\"height:25px;\">&nbsp;" +
        "</td></tr> " +
        "     <tr><td style=\"height:25px;\">&nbsp;" +
        "</td></tr> " +
        "  </table> " +
        "   <table style=\"width:100%;font-size:12px;font-style: italic;\"> " +
        "    <tr><td style=\"width:100%;font-size:12px;\"><b>${record.salesrep.firstname} ${record.salesrep.lastname}</b><br/>${record.salesrep.title}<br/>${record.salesrep.email}<br/>${record.salesrep.mobilephone}</td></tr> " +
        "  </table> " +
        "   " +
        "   " +
        "<#else> " +
        "<h4 align=\"center\" style=\"font-style:normal;\">QUOTATION / HIRE AGREEMENT</h4> " +
        " <table style=\"width:678px;\"> " +
        "    <tr> " +
        "    <td style=\"width:60px;\"><b>From</b></td><td style=\"width:215px;\">:&nbsp;" +
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
        "    <td style=\"width:60px;\"><b>Quote No</b></td><td style=\"width:215px;\">:&nbsp;" +
        "${record.tranid}</td> " +
        "    <td style=\"width:45px;\"><b>Phone</b></td><td style=\"text-align:left;width:255px;\">:&nbsp;" +
        "${record.entity.phone} <b>&nbsp;" +
        "&nbsp;" +
        "Fax</b> :&nbsp;" +
        "${record.entity.fax}</td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:60px;\"><b>Date</b></td><td style=\"width:215px;\">:&nbsp;" +
        "${record.trandate?string(\"d-MMM-yyyy\")}</td> " +
        "    <td style=\"width:45px;\"><b>Attn.</b></td><td style=\"text-align:left;width:255px;\">:&nbsp;" +
        "${record.custbody_attention}</td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:60px;\"><b>Validity</b></td><td style=\"width:215px;\">:&nbsp;" +
        "${record.duedate?string(\"d-MMM-yyyy\")}</td> " +
        "    <td style=\"width:45px;\"><b>Site</b></td><td style=\"text-align:left;width:255px;\">:&nbsp;" +
        "${record.custbody_site}</td> " +
        "    </tr> " +
        "    <tr><td style=\"width:60px;\"><b>Subject</b></td><td colspan=\"3\"> :&nbsp;" +
        "${record.title}</td></tr> " +
        "    </table> " +
        "    <table style=\"width:100%;\"><tr><td style=\"width:105px;\"><b>Scope of work </b>:</td><td>${record.custbody_scope_of_work}</td></tr></table> " +
        "    <table style=\"width:100%;margin-top:12px;\"><tr><td style=\"font-family: Open Sans, sans-serif;text-align: justify;\">${record.custbody_quote_intro}</td></tr></table> " +
        "   " +
        "   " +
        "<#if record.item?has_content> " +
        " " +
        "<table class=\"itemtable\" style=\"width: 100%; margin-top: 12px;\"><!-- start items --><#list record.item as item><#if item_index==0> " +
        "<thead> " +
        "  <tr> " +
        "    <th colspan=\"12\">Details</th> " +
        "     <!--<th colspan=\"2\">Qty.</th>--> " +
        "  <th align=\"center\" colspan=\"6\">Unit</th> " +
        "      <!--<th colspan=\"6\">Scope of work</th>--> " +
        "  <th align=\"center\" colspan=\"4\">Min Hrs.</th> " +
        "  <th align=\"center\" colspan=\"4\">Min Days</th> " +
        "     <th align=\"right\" colspan=\"6\">Rate (${record.currency})</th> " +
        "  </tr> " +
        "</thead> " +
        "</#if><#if (item_index % 2) == 0><tr><#else><tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\"></#if> " +
        "    <td style=\"vertical-align:bottom;\" colspan=\"12\">${item.description}</td> " +
        "    <!--<td colspan=\"2\">${item.quantity}</td>--> " +
        "  <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"6\" line-height=\"150%\">${item.units}</td> " +
        "  <!--<td colspan=\"6\">${item.custcol_scope_of_work}</td>--> " +
        "     <#if item.units == 'Lumpsum' || item.units == 'Trip'> " +
        "    <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"4\">&nbsp;" +
        "</td> " +
        "  <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"4\">&nbsp;" +
        "</td> " +
        "    <#else> " +
        "    <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"4\">${item.custcol_min_hours}</td> " +
        "    <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"4\">${item.custcol_min_days}</td> " +
        "  </#if> " +
        "    <td style=\"vertical-align:bottom;\" align=\"right\" colspan=\"6\">${item.rate?string[\"#,##0.00\"]}</td> " +
        "  </tr> " +
        "  </#list><!-- end items --></table> " +
        " " +
        "<hr /></#if> " +
        " " +
        "  <table style=\"width:100%; margin-top:10px;\"><tr><td><b style=\"color:#000;font-family: Open Sans, sans-serif;font-size: 12px;\">Payment Terms</b>: ${record.custbody_payment_terms}</td></tr></table> " +
        " " +
        "   <#if record.custbody_special_notes?has_content> " +
        "   <table style=\"width:100%; margin-top:10px;\"> " +
        "     <tr> " +
        "    <td style=\"color:#000;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;\">Special Terms</td> " +
        "  </tr> " +
        "        <tr><td>${record.custbody_special_notes}</td></tr> " +
        "    </table> " +
        "  </#if> " +
        " " +
        "  <#if record.custbody_notes_terms?has_content> " +
        "   <table style=\"width:100%; margin-top:10px;\"> " +
        "     <tr> " +
        "    <td style=\"color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;\">Notes Terms</td> " +
        "  </tr> " +
        "      <#list record.custbody_notes_terms?split(\"|_|\") as x> " +
        "        <tr><td>${x_index+1}. ${x}</td></tr> " +
        "      </#list> " +
        "     " +
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
        "     " +
        "    </table> " +
        "  </#if> " +
        "<table style=\"width:100%;margin-top:10px;\"> " +
        "  <tr><td>We hereto have agreed and accept this agreement inclusive of the terms and conditions (attached) on the _______ day of _______ , 20___</td></tr> " +
        "  </table> "; 
  
 template +=       "  <table style=\"width:100%;margin-top:20px;\"> ";
 if( location == '8' || location == '21'){
    template +=     "  <tr><td style=\"width:50%;\"><b>For Faris Al Arab Contracting Co. </b><br />(As Owner)<br /><br /><br /><b>${record.salesrep.salutation} ${record.salesrep.firstname} ${record.salesrep.lastname}</b><br />${record.salesrep.title}<br />${record.salesrep.email}<br />${record.salesrep.mobilephone}</td> " +
    "  <td style=\"width:50%;\"><b>Agreed and Accepted by:</b><br/>(As Hirer)<br/><br/><br/>__________________________________________<br />For <#if record.entity.isperson?string == 'T'>            <b>${record.entity.altname}</b><#else><b>${record.entity.companyname}</b></#if><br />(Signature and Stamp)</td></tr> " ;
 } else {
    template +=     "  <tr><td style=\"width:50%;\"><b>For Saudi Al Faris International Company-Energy Division </b><br />(As Owner)<br /><br /><br /><b>${record.salesrep.salutation} ${record.salesrep.firstname} ${record.salesrep.lastname}</b><br />${record.salesrep.title}<br />${record.salesrep.email}<br />${record.salesrep.mobilephone}</td> " +
    "  <td style=\"width:50%;\"><b>Agreed and Accepted by:</b><br/>(As Hirer)<br/><br/><br/>__________________________________________<br />For <#if record.entity.isperson?string == 'T'>            <b>${record.entity.altname}</b><#else><b>${record.entity.companyname}</b></#if><br />(Signature and Stamp)</td></tr> " ;
 }
    template +=       "  </table> " +
        "</#if> " +
        "   " +
        "  <#if record.subsidiary.internalid?string == '11'  || record.subsidiary.internalid?string == '15' || record.subsidiary.internalid?string == '16'  || record.subsidiary.internalid?string == '8'> <!-- AFER and AFIHER--> " +
        "  <#if record.custbody_general_trms_cndtns?string == 'Yes'> ";
    var standardTerms = nlapiLoadRecord("customrecord_standard_terms_and_cond", 1);

    var trandate = estimate.getFieldValue("trandate");
    nlapiLogExecution("DEBUG", "trandate", trandate);
    nlapiLogExecution("DEBUG", "nlapiStringToDate(trandate)", nlapiStringToDate(trandate));
    nlapiLogExecution("DEBUG", "nlapiStringToDate(trandate)", nlapiStringToDate("31/12/2021"));
    if (nlapiStringToDate(trandate) < nlapiStringToDate("31/12/2021"))
        var terms1 = standardTerms.getFieldValue("custrecord_stan_condi_term5");
    else
        var terms1 = standardTerms.getFieldValue("custrecord_stan_condi_term1");

    var terms2 = standardTerms.getFieldValue("custrecord_stan_condi_term2");
    var terms3 = standardTerms.getFieldValue("custrecord_stan_condi_term3");
    var terms4 = standardTerms.getFieldValue("custrecord_stan_condi_term4");
    template += "    <table style=\"width:100%;margin-top:10px;\"> " +
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
        "    <p><span style=\"font-size:8px;\">" + relaceCharector(terms1) + "</span></p> " +
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
        "    <p><span style=\"font-size:8px;\">" + relaceCharector(terms2) + "</span></p> " +
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
        "    <p><span style=\"font-size:8px;\">" + relaceCharector(terms3) + "</span></p> " +
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
        "    <p><span style=\"font-size:8px;\">" + relaceCharector(terms4) + "</span></p> " +

        "                                </td> " +
        "                              </tr> " +
        "                            </tbody> " +
        "                          </table> " +
        "                        </td> " +
        "                      </tr> " +
        "                    </tbody> " +
        "                  </table> " +
        "                  <#if record.subsidiary.internalid?string == '11' || record.subsidiary.internalid?string == '8'|| record.subsidiary.internalid?string == '16'><!--AFER--> " +
        "                  <table style=\"width:100%;margin-top:20px;\"> " ;
        if( location == '8'|| location == '21'){
            template +="                  <tr><td style=\"width:50%;\"><b>For Faris Al Arab Contracting Co. </b><br />(As \"Owner\")<br /><br /><br /><b>${record.salesrep.salutation} ${record.salesrep.firstname} ${record.salesrep.lastname}</b><br />${record.salesrep.title}<br />${record.salesrep.email}<br />${record.salesrep.mobilephone}<br/><br/>Date :</td><td style=\"width:50%;\"><b>Agreed and Accepted by:</b><br/>(As \"Hirer\")<br/><br/><br/>__________________________________________<br />For <#if record.entity.isperson?string == 'T'>            <b>${record.entity.altname}</b><#else><b>${record.entity.companyname}</b></#if><br />(Signature and Stamp)<br/><br/>Date :</td></tr> " ;
        } else {
            template +="                  <tr><td style=\"width:50%;\"><b>For Saudi Al Faris International Company-Energy Division </b><br />(As \"Owner\")<br /><br /><br /><b>${record.salesrep.salutation} ${record.salesrep.firstname} ${record.salesrep.lastname}</b><br />${record.salesrep.title}<br />${record.salesrep.email}<br />${record.salesrep.mobilephone}<br/><br/>Date :</td><td style=\"width:50%;\"><b>Agreed and Accepted by:</b><br/>(As \"Hirer\")<br/><br/><br/>__________________________________________<br />For <#if record.entity.isperson?string == 'T'>            <b>${record.entity.altname}</b><#else><b>${record.entity.companyname}</b></#if><br />(Signature and Stamp)<br/><br/>Date :</td></tr> " ;
        }
        
        template +="                </table> " +
        "                    </#if> " +
        "                  <#if record.subsidiary.internalid?string == '15'><!--AFIHER--> " +
        "                  <table style=\"width:100%;margin-top:20px;\"> " +
        "                  <tr><td style=\"width:50%;font-weight:bold;\"><b>For Saudi Al Faris International Company-Energy Division</b><br />(As \"Owner\")<br /><br /><br /><br/>Signature &amp; Stamp<br/><br/>Date :</td><td style=\"width:50%;font-weight:bold;\"><b>Agreed &amp; Accepted by:</b><br/>(As \"Hirer\")<br/><br/><br/><br/>Signature &amp; Stamp<br/><br/>Date :</td></tr> " +
        "                </table> " +
        "                    </#if> " +
        "</#if> " +
        "</#if> " +
        " " +
        " " +

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
        // "  <table><tr> " +
        // "    <td align=\"center\" colspan=\"2\"> " +
        // "    <p><span style=\"font-size:11px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions [Transportation]</span></strong></span></p> " +
        // "    </td> " +
        // "    </tr> " +
        // "    <tr> " +
        // "    <td style=\"width:300px;\"> " +
        // "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms1) + "</span></strong></p> " +
        // "    </td> " +
        // "    <td style=\"width:300px;\"> " +
        // "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms2) + "</span></strong></p> " +
        // "    </td> " +
        // "    </tr></table> " +
        // "  </td> " +
        // "  </tr></table> " +
        // " " +
        // "<table style=\"width:100%;margin-top:10px;\"><tr> " +
        // "  <td> " +
        // "  <table><tr> " +
        // "    <td align=\"center\" colspan=\"2\"> " +
        // "    <p><span style=\"font-size:11px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions [Transportation]</span></strong></span></p> " +
        // "    </td> " +
        // "    </tr> " +
        // "    <tr> " +
        // "    <td style=\"width:300px;\"> " +
        // "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms3) + "</span></strong></p> " +
        // "    </td> " +
        // "    <td style=\"width:300px;\"> " +
        // "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms4) + "</span></strong></p> " +
        // "    </td> " +
        // "    </tr></table> " +
        // "  </td> " +
        // "  </tr></table> " +
        // " " +
        "<table style=\"width:100%;margin-top:10px;\"><tr> " +
        "  <td> " +
        "  <table><tr> " +
        "    <td align=\"center\" colspan=\"2\"> " +
        "    <p><span style=\"font-size:11px;\"><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Standard Terms and Conditions []</span></strong></span></p> " +
        "    </td> " +
        "    </tr> " +
        "    <tr> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms5) + "</span></strong></p> " +
        "    </td> " +
        "    <td style=\"width:300px;\"> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms6) + "</span></strong></p> " +
        "           <#if record.subsidiary.internalid?string == '7'> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms7) + "</span></strong></p> " +
        "          <#else> " +
        "    <p><strong><span style=\"font-size:8px;\">" + relaceCharector(terms8) + "</span></strong></p> " +
        "    </#if> " +
        "           " +
        "        <!--<p><strong><span style=\"font-size:7px;\"><span style=\"font-family: arial,helvetica,sans-serif;\">33. Any dispute arising out of formation, performance, interpretation, nullification, termination or invalidation of this contractor arising there from or related thereto in any manner whatsoever, shall be referred to the exclusive jurisdiction of UAE courts.</span></span></strong></p>--> " +
        "    </td> " +
        "    </tr></table> " +
        "  </td> " +
        "  </tr></table> " +
        "  <table style=\"width:100%;margin-top:20px;\"> " +
        "                  <tr><td style=\"width:50%;font-weight:bold;\"><b>For Saudi Al Faris International Company-Energy Division </b><br />(As \"Owner\")<br /><br /><br /><br/>____________________________________<br/><br/><br/><br/><br/>Date :</td><td style=\"width:50%;font-weight:bold;\"><b>Agreed &amp; Accepted by:</b><br/>(As \"Hirer\")<br/><br/><br/><br/>____________________________________<br/>For <#if record.entity.companyname?has_content>${record.entity.companyname}<#else>${record.entity.altname}</#if><br/><br/>(Signature &amp; Stamp)<br/><br/>Date :</td></tr> " +
        "                </table> " +
        "                <!--<table style=\"width:100%;\"> " +
        "                  <tr><td>Owner&nbsp; :____________________________________<br /><br />Hirer&nbsp;&nbsp;&nbsp;&nbsp; :____________________________________<br /><br /><br />&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____________________________________<br /><br /><b>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signed and accepted by [on behalf of Hirer]</b></td></tr> " +
        "                </table>--> " +
        "</#if> " +
        "   " +
        "</body> " +
        "</pdf>";

    renderer.setTemplate(template);
    renderer.addRecord('record', estimate);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'estimate' + estimate.getFieldValue('id') + '.pdf', 'inline');
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

function replaceAndOper(charVal) {
    return charVal.replace(/&/g, "&amp;");
}

function lumpdescription(charVal) {
    return charVal.replace(/\n/g, "<br/>");
}

function numberWithCommas(x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}