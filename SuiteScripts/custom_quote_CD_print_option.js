function printQuoteAction(request, response) {
    var recordID = request.getParameter("recordID");
    var recID_POLH = request.getParameter("recordidPOLH");

    if (recordID) {
        var estimate = nlapiLoadRecord("estimate", recordID);
    } else {
        var estimate = nlapiLoadRecord("estimate", recID_POLH);
    }
    var renderer = nlapiCreateTemplateRenderer();
    var subsidiary = estimate.getFieldValue("subsidiary")
    var location = estimate.getFieldValue("location")
    var general_terms= estimate.getFieldValue("custbody_general_trms_cndtns")

    var template = "";
    template += '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
    template += '<pdf>';
    template += '<head>';
    template += '<#if .locale == "ru_RU">';
    template += '    <link name="verdana" type="font" subtype="opentype" src="${nsfont.verdana}" src-bold="${nsfont.verdana_bold}" bytes="2" />';
    template += '</#if>';
    template += '    <macrolist>';
    template += '        <macro id="nlheader">';
    template += '          <!-- SAGIA -->';
    if (subsidiary == 1) {
        if (!recID_POLH) {
            template += '            <table class="header" style="width: 100%; margin-top:-50px;margin-left:-70px; margin-right:-40px;"><tr>';
            template += '     <td>';
            template += '      <img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26487&amp;c=4647359&amp;h=N7yMHyudqD68aN6yaYCarDgu-nT4u0aoi7g3lKZ708dlEsDK';
            template += '" style="width:768px; height:120px;" />';
            template += '    </td>';
            template += '  </tr>';
            template += '  ';
            template += '</table>';
        }
    }
    template += ' <!-- SALLC -->';
    if (subsidiary == 2) {
        if (!recID_POLH) {
            template += '              <table class="header" style="width: 100%; margin-top:-50px;margin-left:-70px; margin-right:-40px;"><tr>';
            template += '     <td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26489&amp;c=4647359&amp;h=8jLOJuWgAnB4EXpAfSKtQfxbGPoNlcPY1buLTrUncQpcjvHG';
            template += '" style="width:768px; height:120px;" /></td>';
            template += '  </tr>';
            template += '<!--<tr><td align="right" style="font-size:12px;font-color:#696969;margin-right: 100px;"><b>C.R. No: 2055013357</b></td></tr>-->';
            template += '</table>';
        }
    }
    if (subsidiary == 8 && location == 8) {
        if (!recID_POLH) {
            template += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-70px;"><tr>';
            template += '     <td><img src="http://4647359.shop.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7" style="width:768px; height:140px;" /></td>';
            template += '  </tr>';
            template += '</table>';
        }
    }
    if (subsidiary == 8 && location != 8) {
        // template += '      <#if record.subsidiary.internalid?string == "8" && record.location.internalid?string != "8" > ';
        if (!recID_POLH) {
            template += '                 <table class="header" style="width: 100%; margin-top:-62px;margin-left:-70px;"><tr>';
            template += '     <td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26488&amp;c=4647359&amp;h=6Uxc0nbUkUIpXGHsPLniGwEfM-PfsyucvPJwV0Vhus-USYG_" style="width:768px; height:140px;" /></td>';
            template += '  </tr>';
            template += '</table>';
        }
    }

    template += '       ';
    template += '        </macro>';
    template += '        <macro id="nlfooter">';
    if (!recID_POLH) {
        template += '            <table class="footer" border="0" ';
        template += '                style="width: 100%;background-color:#000;margin-top:40px;margin-left :-46px;">';
        template += '                <tr>';
        template += '                  <td>';
        template += '                <img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14615&amp;c=4647359&amp;h=ae717ee9182515bf331e" style="width:758px;height:55%;"/>';
        template += '                ';
        template += '                  </td>';
        template += '                </tr>';
        template += '            </table>';
        template += '            <div style="position:relative;top:-95px;bottom:-92px;left:510px;">';
        template += '               <img src="https://4647359.app.netsuite.com/core/media/media.nl?id=19981&amp;c=4647359&amp;h=W94ZlflwUJ1kjaRqNCY6I65R8MhjYA31fyCdylTaaKdkxXtN" style="width:32%;height:35%;"/>';
        template += '            </div> ';
    }
    template += '        </macro>';
    template += '    </macrolist>';
    template += '    <style type="text/css">table {';
    template += '            font-family: sans-serif;';
    template += '            font-size: 10pt;';
    template += '            table-layout: fixed;';
    template += '        }';
    template += '        th {';
    template += '            font-weight: bold;';
    template += '            font-size: 9pt;';
    template += '            vertical-align: middle;';
    template += '            padding: 5px 6px 3px;';
    template += '            background-color: #e3e3e3;';
    template += '            color: #000000;';
    template += '        }';
    template += '        /*td {';
    template += '            padding: 4px 6px;';
    template += '        }*/';
    template += '        b {';
    template += '            font-weight: bold;';
    template += '            color: #000000;';
    template += '        }';
    template += '        table.header td {';
    template += '            padding: 0;';
    template += '            font-size: 10pt;';
    template += '        }';
    template += '        table.footer td {';
    template += '            padding: 0;';
    template += '            font-size: 9pt;';
    template += '            background-color: #000;';
    template += '        }';
    template += '        table.itemtable th {';
    template += '            padding-bottom: 10px;';
    template += '            padding-top: 10px;';
    template += '        }';
    template += '        /*table.body td {';
    template += '            padding-top: 2px;';
    template += '        }*/';
    template += '        table.total {';
    template += '            page-break-inside: avoid;';
    template += '        }';
    template += '        td p{align:left;}';
    template += '        tr.totalrow {';
    template += '            background-color: #e3e3e3;';
    template += '            line-height: 200%;';
    template += '        }';
    template += '        td.totalboxtop {';
    template += '            font-size: 12pt;';
    template += '            background-color: #e3e3e3;';
    template += '        }';
    template += '        /*td.addressheader {';
    template += '            font-size: 8pt;';
    template += '            padding-top: 6px;';
    template += '            padding-bottom: 2px;';
    template += '        }';
    template += '        td.address {';
    template += '            padding-top: 0;';
    template += '        }';
    template += '        td.totalboxmid {';
    template += '            font-size: 28pt;';
    template += '            padding-top: 20px;';
    template += '            background-color: #e3e3e3;';
    template += '        }';
    template += '        td.totalboxbot {';
    template += '            background-color: #e3e3e3;';
    template += '            font-weight: bold;';
    template += '        }*/';
    template += '        span.title {';
    template += '            font-size: 29pt;';
    template += '        }';
    template += '        span.number {';
    template += '            font-size: 17pt;';
    template += '        }';
    template += '        span.itemname {';
    template += '            font-weight: bold;';
    template += '            line-height: 150%;';
    template += '        }';
    template += '        hr {';
    template += '            width: 100%;';
    template += '            color: #d3d3d3;';
    template += '            background-color: #d3d3d3;';
    template += '            height: 1px;';
    template += '        }';

    template += '      body { background-image:url(https://system.eu2.netsuite.com/core/media/media.nl?id=56944&amp;c=4119372&amp;h=81b3d9cd8670550e52ae);} ';
    template += '</style>';
    template += '</head>';
    template += '<body style="font-family:sans-serif;background-color:#ffffff;" header="nlheader" header-height="9%" footer-height="5%" footer="nlfooter" background-image-width="8.5in" background-image-position="bottom center" background-image-height="4.5in" size="A4" >';
    template += '<h4 align="center" style="font-style:normal;">QUOTATION</h4>';
    template += '<table style="width:678px;font-size:12px;">';
    template += '<tr><td style="width:60px;"><b>From</b></td><td style="width:215px;">:&nbsp;${record.salesrep.entityid} ${record.salesrep.firstname}</td>';
    template += '<#if record.entity.isperson?string == "T ">';
    template += '<td style="width:45px;"><b>To</b></td><td style="text-align:left;width:255px;"> :&nbsp;${record.entity.altname}</td>';
    template += '<#elseif record.entity.custentity_customer_name?has_content>';
    template += '<td style="width:45px;"><b>To</b></td><td style="text-align:left;width:255px;"> :&nbsp;${record.entity.custentity_customer_name}</td>';
    template += '<#else>';
    template += '<td style="width:45px;"><b>To</b></td><td style="text-align:left;width:255px;"> :&nbsp;${record.entity.companyname}</td>';
    template += '</#if>';
    template += '</tr>';
    template += '<tr>';
    template += '<td style="width:60px;"><b>Quote No</b></td><td style="width:215px;">:&nbsp;${record.tranid}</td>';
    template += '<td style="width:45px;"><b>Phone</b></td><td style="text-align:left;width:255px;">:&nbsp;${record.entity.phone} <b>&nbsp;&nbsp;Fax</b> :&nbsp;${record.entity.fax}</td>';
    template += '</tr>';
    template += '<tr>';
    template += '<td style="width:60px;"><b>Date</b></td><td style="width:215px;">:&nbsp;${record.trandate?string("d-MMM-YY")}</td>';
    template += '<td style="width:45px;"><b>Attn.</b></td><td style="text-align:left;width:255px;">:&nbsp;${record.custbody_attention}</td>';
    template += '</tr>';
    template += '<tr>';
    template += '<td style="width:60px;"><b>Validity</b></td><td style="width:215px;">:&nbsp;${record.duedate?string("d-MMM-YY")}</td>';
    template += '<td style="width:45px;"><b>Site</b></td><td style="text-align:left;width:255px;">:&nbsp;${record.custbody_site}</td>';
    template += '</tr>';
    template += '<tr><td style="width:60px;"><b>Subject</b></td><td colspan="3"> :&nbsp;${record.title}</td></tr>';
    template += '</table>';
    template += '<table style="width:100%;margin-top:12px;"><tr><td style="font-family: Open Sans, sans-serif;text-align: justify;">Dear Sir, <br/>${record.custbody_quote_intro}</td></tr></table>';
    template += '<table style="width:100%;"><tr><td style="width:105px;"><b>Scope of work </b>:</td><td>${record.custbody_scope_of_work}</td></tr></table>';
    // template += '<!--<table style="width:100%;"><tr><td style="font-family: Open Sans, sans-serif;text-align: justify;"><b>Location </b>: ${record.location}</td></tr></table>--"; > 
    template += '';


    if ("T" == estimate.getFieldValue("custbody_combined_project")) {
        //Normal And Combined Print
        template += "<#if record.item?has_content> ";
        var lineCount = estimate.getLineItemCount('item');
        var lineGrpSum = 0;
        var otherCount = 0;
        var OthersList = [];
        var k = 0;
        var j = 0;
        var y = 1;
        var billingRuleflag = 0;
        var flag = 0;
        var option = 0;
        var hourlyoption = estimate.getFieldValue("custbody_hourly");
        var dailyoption = estimate.getFieldValue("custbody_daily");
        var weeklyoption = estimate.getFieldValue("custbody_weekly");
        var monthlyoption = estimate.getFieldValue("custbody_monthly");
        if (hourlyoption == "T") //if Hourly required
            option++;
        if (dailyoption == "T") //if dayly required
            option++;
        if (weeklyoption == "T") //if Weekly required
            option++;
        if (monthlyoption == "T") //if Monthly required
            option++;
        if (lineCount > 0) {
            template += "<table  class=\"border\" style=\"width: 100%; border: 1px solid; font-size:13px; margin-top: 12px\">";
            for (var i = 1; i <= lineCount; i++) {
                if (i == 1) {

                    template += "  <tr style='border-bottom: 1px solid; '> " +
                        // " <thead>"+
                        "    <th colspan=\"2\" align=\"center\" style=\"font-size:12px;\">SN.</th> " +
                        "    <th colspan=\"7\" align=\"center\" style=\"font-size:12px;border-left: 1px solid;\">Details</th> " +

                        "    <th colspan=\"6\" align=\"center\" style=\"font-size:12px;border-left: 1px solid;\"> Unit  </th>" +
                        "    <th colspan=\"4\" align=\"center\" style=\"font-size:12px;border-left: 1px solid;\"> Min Hrs. </th>" +
                        "    <th colspan=\"4\" align=\"center\" style=\"font-size:12px;border-left: 1px solid;\"> Min Days </th>" +
                        "    <th colspan=\"6\" align=\"center\" style=\"font-size:12px;border-left: 1px solid;\"> Rate </th>";
                    // "</thead>";
                    template += "  </tr> ";


                }

                var groupType = estimate.getLineItemValue('item', 'itemtype', i);
                var description = estimate.getLineItemValue('item', 'description', i);
                var billingRule = estimate.getLineItemValue('item', 'custcol_rent_billing_rule', i);
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
                var billingRule = estimate.getLineItemValue('item', 'custcol_rent_billing_rule', i);
                var rental_unit = estimate.getLineItemText('item', 'custcol_rent_rental_unit', i);
                var nonPosting = estimate.getLineItemValue('item', 'custcol_non_posting_assets', i);


                var minHours = estimate.getLineItemValue('item', 'custcol_minimum_hours_print', i);
                var minDays = estimate.getLineItemText('item', 'custcol_minimum_days_print', i);

                if (nonPosting != "T") {

                    var itemID = estimate.getLineItemValue('item', 'item', i);
                    var billing_rule = "";
                    if (rental_unit == "Daily") {
                        billing_rule = nlapiLookupField("customrecord_rent_billing_rule", billingRule, "name");
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

                    if (groupType != "Service" || billing_rule == "Trip" || rental_unit == "One-Time" || (flag == 1 && is_individual_item != "T")) {
                        OthersList[k++] = i;
                        flag = 1;
                        billingRuleflag = 1;
                        nlapiLogExecution("debug", "test 1 if")
                        nlapiLogExecution("debug", "groupType 1 if",groupType)
                        nlapiLogExecution("debug", "billing_rule 1 if",billing_rule)
                        nlapiLogExecution("debug", "rental_unit 1 if",rental_unit)
                        nlapiLogExecution("debug", "is_individual_item 1 if",is_individual_item)
                        nlapiLogExecution("debug", "flag 1 if",flag)


                    } else if (billing_rule == "Trip" || itemType == 5 || is_individual_item == "T" || rental_unit == "One-Time") {
                        flag = 0;
                        nlapiLogExecution("debug", "test 2else if")
                        nlapiLogExecution("debug", "billing_rule 2else if",billing_rule)
                        nlapiLogExecution("debug", "itemType 2else if",itemType)
                        nlapiLogExecution("debug", "is_individual_item 2else if",is_individual_item)
                        nlapiLogExecution("debug", "rental_unit 2else if",rental_unit)
                        nlapiLogExecution("debug", "flag 2 else if",flag)
                        

                    }
                    if (((groupType == "Service" && billing_rule != "Trip" && rental_unit != "One-Time")) && flag == 0) {
                        nlapiLogExecution("debug", "test 3")
                        if (y % 2 != 0) {
                            template += "<tr>";
                        } else {
                            template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                        }

                        template += "    <td style=\"vertical-align:bottom;\" colspan=\"2\" align=\"center\" >" + (y++) + "</td> ";
                        template += "    <td style=\"vertical-align:bottom;border-left: 1px solid;\" colspan=\"7\">" + lumpdescription(replaceAndOper(removeNull(description))) + "</td> ";

                        template += "    <td style=\"vertical-align:bottom;border-left: 1px solid;\" colspan=\"6\" align=\"center\">" + units + "</td>";
                        template += "    <td style=\"vertical-align:bottom;border-left: 1px solid;\" colspan=\"4\" align=\"center\">" + minHours + "</td>";
                        template += "    <td style=\"vertical-align:bottom;border-left: 1px solid;\" colspan=\"4\" align=\"center\">" + minDays + "</td>";
                        template += "    <td style=\"vertical-align:bottom;border-left: 1px solid;\" colspan=\"6\" align=\"center\">" + amount + "</td>";

                        template += "  </tr> ";
                    }
                }
            }
            template += " </table> ";
            if (flag == 1 || billingRuleflag == 1) {
                nlapiLogExecution("debug", "test 4")
                var TotalAmount = 0;
                var goback = 0;
                template += "<table  class=\"border\" style=\"width: 100%; border: 1px solid black;font-size:13px; margin-top: 12px\">";

                template += "<thead> " +
                    "  <tr> " +
                    "  <th align=\"left\"  style=\"border-bottom: 1px solid;font-size:10px;\" colspan=\"29\">Other</th> " +
                    "  </tr> " +
                    "</thead> " +
                    "  <tr> " +
                    "    <th colspan=\"2\" align=\"center\" style=\"font-size:12px;border-bottom: 1px solid;\">SN.</th> " +
                    "    <th colspan=\"17\" align=\"center\" style=\"font-size:12px;border-left: 1px solid;border-bottom: 1px solid;\">Details</th> " +
                    "  <th align=\"center\" colspan=\"5\" style=\"border-bottom: 1px solid;border-left: 1px solid;font-size:12px;\" >Unit</th> " +
                    "  <th align=\"center\" colspan=\"5\" style=\"border-bottom: 1px solid;border-left: 1px solid;font-size:12px;\" >Amount</th> " +
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
                        billing_rule = nlapiLookupField("customrecord_rent_billing_rule", billingRule, "name");
                    }
                    if (count == 1 && (is_individual_item == "" || is_individual_item == "T")) {
                        if (m % 2 != 0) {
                            template += "<tr>";
                        } else {
                            template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                        }
                        var units = "LS";

                        template += "    <td style=\"vertical-align:bottom;\" align=\"center\" colspan=\"2\">" + m++ + "</td> " +
                            "    <td style=\"vertical-align:bottom;border-left: 1px solid;\" colspan=\"17\">" + lumpdescription(replaceAndOper(removeNull(iteamName))) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"5\" line-height=\"150%\">" + removeNull(units) + "</td> " +
                            "  <td style=\"vertical-align:bottom;border-left: 1px solid;\" align=\"center\" colspan=\"5\">" + numberWithCommas(TotalAmount.toFixed(2)) + "</td> ";
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
                    var unitRate = estimate.getLineItemValue('item', 'amount', OthersList[i]);

                    if (groupType == "Description") {
                        count++;
                        unitRate = 0;
                        if (count == 2) {
                            var nextitem = 1;
                        }
                    }
                    //Adding All The Rate of the Item That Belongs to Same Description Item
                    if (groupType != "Description" && count == 1 && is_individual_item == "F") {
                        TotalAmount = +TotalAmount + +unitRate;
                        billing_rule_display = "LS";
                    }
                    if (count == 0) {
                        TotalAmount = unitRate;
                    }
                    if (billing_rule_display == null) {
                        billing_rule_display = "LS";
                    }
                    if (iteamName == null) {
                        iteamName = "";
                    }

                    if ((nextitem == 1 || i == (OthersList.length - 1)) || (billing_rule == "Trip" && count == 0) || (rental_unit == "One-Time" && count == 0) || is_individual_item == "T") {
                        if (m % 2 != 0) {
                            template += "<tr>";
                        } else {
                            template += "<tr style=\"background-color:#e8e8e9 none repeat scroll 0 0;\">";
                        }
                        template += "    <td  align=\"center\" colspan=\"2\">" + m++ + "</td> " +
                            "    <td style=\"border-left: 1px solid;\" colspan=\"17\">" + lumpdescription(replaceAndOper(removeNull(iteamName))) + "</td> " +
                            "  <td style=\"border-left: 1px solid;\" align=\"center\" colspan=\"5\" line-height=\"150%\">" + removeNull(billing_rule_display) + "</td> " +
                            "  <td style=\"border-left: 1px solid;\" align=\"center\" colspan=\"5\">" + numberWithCommas(Number(TotalAmount).toFixed(2)) + "</td> ";
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


    ////////////////////////////////////////////////////////


    template += '    <table style="width:100%; margin-top:10px;"><tr><td><b style="color:#000;font-family: Open Sans, sans-serif;font-size: 12px;">Payment Terms</b>: ${record.custbody_payment_terms}</td></tr></table>';
    template += '    <#if record.custbody_special_notes?has_content>';
    template += '    <table style="width:100%; margin-top:10px;" line-height="150%">';
    template += '    <tr><td style="color:#000;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;">Additional Terms</td></tr>';
    template += '    <tr><td>${record.custbody_special_notes}</td></tr>';
    template += '    </table>';
    template += '    </#if>';
    template += '  ';
    template += '    <#if record.custbody_notes_terms?has_content>';
    template += '    <table style="width:100%; margin-top:10px;">';
    template += '    <tr><td style="color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;">Notes</td></tr>';
    template += '    <#list record.custbody_notes_terms?split("|_|") as x>';
    template += '    <tr><td>${x_index+1}. ${x}</td></tr>';
    template += '    </#list>';
    template += '  </table>';
    template += '    </#if>';
    template += '  ';
    template += '    <#if record.custbody_inclusions_terms?has_content>';
    template += '    <table style="width:100%; margin-top:10px;">';
    template += '    <tr><td style="color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;">Inclusions Terms</td></tr>';
    template += '    <#list record.custbody_inclusions_terms?split("|_|") as x>';
    template += '    <tr><td>${x_index+1}. ${x}</td></tr>';
    template += '    </#list>';
    template += '    </table>';
    template += '    </#if>';
    template += '  ';
    template += '    <#if record.custbody_exclusion_terms?has_content>';
    template += '    <table style="width:100%; margin-top:10px;">';
    template += '    <tr><td style="color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;">Exclusions Terms</td></tr>';
    template += '    <#list record.custbody_exclusion_terms?split("|_|") as x>';
    template += '    <tr><td>${x_index+1}. ${x}</td></tr>';
    template += '    </#list>';
    template += '  </table>';
    template += '    </#if>';
    template += '  ';
    
    template += '    <#if record.custbody_thirdparty_terms?has_content>';
    template += '    <table style="width:100%; margin-top:10px;margin-bottom:10px;" page-break-before="always" border="0">';
    template += '    <tr><td style="color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;">Third Party Terms</td></tr>';
    template += '    <#list record.custbody_thirdparty_terms?split("|_|") as x>';
    template += '    <tr><td>${x_index+1}. ${x}</td></tr>';
    template += '    </#list>';
    template += '  </table>';
    template += '    </#if>';
    template += '  ';

    template += '    <#if record.custbody_aramco_terms?has_content>';
    template += '    <table style="width:100%; margin-top:10px;">';
    template += '    <tr><td style="color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;">Aramco Terms</td></tr>';
    template += '    <#list record.custbody_aramco_terms?split("|_|") as x>';
    template += '    <tr><td>${x_index+1}. ${x}</td></tr>';
    template += '    </#list>';
    template += '  </table>';
    template += '    </#if>';
    template += '  ';
    template += '    <#if record.custbody_marine_terms?has_content>';
    template += '    <table style="width:100%; margin-top:10px;">';
    template += '    <tr><td style="color:#727478;font-family: Open Sans, sans-serif;font-size: 12px;font-weight:bold;">Marine Terms</td></tr>';
    template += '    <#list record.custbody_marine_terms?split("|_|") as x>';
    template += '    <tr><td>${x_index+1}. ${x}</td></tr>';
    template += '    </#list>';
    template += '  </table>';
    template += '    </#if>';
    template += '    <table style="width:100%; margin-top:10px;margin-bottom:10px">';
    template += '    <tr><td style="font-family: Open Sans, sans-serif;font-size: 12px;">We hope our offer is in line with your requirement and look forward to your reply. Assuring you of our best attention at all times.</td></tr>';
    template += '    <tr><td style="font-family: Open Sans, sans-serif;font-size: 12px;">This hire agreement is subject to our standard terms and conditions, attached herewith &amp; forming part of. You are requested to kindly sign, stamp and return this hire agreement upon confirmation of order along with your LPO. Failure to do so will result in non-delivery of equipments on schedule.</td></tr>';
    template += '  </table>';
    template += '    <table style="width:100%;margin-top:20px;">';
    template += '    <tr>';
    template += '    <td style="width:50%;">';
    template += '     <#if record.location.internalid?string == "8 ">';
    template += '    <b>For ${record.location.custrecord_location_legal_name}</b>';
    template += '    <#else>';
    template += '    <b>For ${record.subsidiary.legalname}</b>';
    template += '    </#if>';
    template += '    <br />(As Owner)<br /><br /><br /><b>${record.salesrep.salutation} ${record.salesrep.firstname} ${record.salesrep.lastname}</b><br />${record.salesrep.title}<br />Tel : ${record.custbody_office_phone}, Fax : ${record.salesrep.fax}<br/>Mobile : ${record.salesrep.mobilephone}<br/>Email : ${record.salesrep.email}<br /><#if record.salesrep.custentity_alt_email_employee?has_content>Alt Email : ${record.salesrep.custentity_alt_email_employee}<br/></#if>Website : ${record.subsidiary.url}</td><td style="width:50%;">We hereto have agreed/ signed &amp;  Stamped this agreement on the<br/><br/><br/><br/>__________________________________________<br /><b>Agreed &amp; Accepted by: </b><#if record.entity.isperson?string == "T "><b>${record.entity.altname} (As Hirer)</b><#else><b>${record.entity.companyname} (As Hirer)</b></#if></td></tr>';
    template += '  </table>';
    template += '     ';

    if(general_terms=='T'){

    
   


        template += '    <table style="width:100%;margin-top:10px;">';
        template += '  <tbody>';
        template += '    <tr>';
        template += '      <td>';
        template += '      <table>';
        template += '        <tbody>';
        template += '          <tr>';
        template += '            <td align="center" colspan="2">';
        template += '            <p style="text-align: center;"><span style="font-size:11px;"><strong><span style="font-family: verdana,geneva,sans-serif;">Standard Terms and Conditions</span></strong></span></p>';
        template += '            </td>';
        template += '          </tr>';
        template += '          <tr>';
        template += '            <td style="width:300px;">';
    
        template += '            <p style="text-align: justify;"><span style="font-size:7px;"><strong>1.&nbsp;&nbsp;</strong>All cranes are on main boom configuration only unless specified.</span><br />';
        template += '            <span style="font-size:7px;"><strong>2.&nbsp;&nbsp;</strong>Based on minimum 10hrs per day on daily basis, 6 days a week (continuous hire) on weekly&nbsp;&nbsp;&nbsp;&nbsp; basis, monthly rental is based on per calendar month [regardless of 31 days, 30 days &amp; 28/29 days of working per month] (excluding Fridays &amp; Public Holidays), plus mob/ demob with 1-hour lunch break permissible per day. Additional hours worked over 10 hours &amp; on Fridays and Public Holidays will be charged at quoted hourly rate.</span><br />';
        template += '            <span style="font-size:7px;"><strong>3.&nbsp;&nbsp;</strong>Time sheet will starts once the crane Reaches at plant gate /Project site and will be applicable until the crane comes out with all its accessories from Plant /Project site.</span><br />';
        template += '            <span style="font-size:7px;"><strong>4.&nbsp;&nbsp;</strong>Any damages to the equipment due to the unsafe site condition ( Tire puncture ,Component failure ) is hirers responsibility and the cost will be back charged to hirer</span><br />';
        template += '            <span style="font-size:7px;"><strong>5.&nbsp;&nbsp;</strong>All regular maintenance will be to the account of the Owner</span><br />';
    
        template += '            <span style="font-size:7px;"><strong>6.&nbsp;&nbsp;</strong>Basic minimum daily/weekly/monthly rates will be applied for all hires.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>7.&nbsp;&nbsp;</strong>The Hirer shall not pay any breakdown time and lunch/dinner breaks as recorded on the time Sheet</span><br />';
        template += '              <span style="font-size:7px;"><strong>8.&nbsp;&nbsp;</strong>The Hirer to ensure time sheet [working hours] are approved/signed by a responsible site representative. No claims or discrepancies will be acceptable after completion of works.</span><br />';
        template += '            <span style="font-size:7px;"><strong>9.&nbsp;&nbsp;Inclusions (Our price includes):</strong> Valid registration, Govt. approved third party Test Certificate and licensed operator.</span><br />';
        template += '            <span style="font-size:7px;"><strong>10.&nbsp;&nbsp;</strong>Rigging assistance for slinging arrangement and any specialized lifting gear to be supplied by Hirer.<br />';
        template += '            <strong>11.&nbsp;&nbsp;</strong>Any special requirement, approvals, terms &amp; conditions withheld/not put forth by the Hirer at the time of enquiry and wishes to implement after confirmation of order at the time of delivery can be refused by supplier (${subsidiary.name}).</span><br />';
        template += '                          <span style="font-size:7px;">';
        template += '                          <strong>12.&nbsp;&nbsp;Fuel and Lubes:</strong> For hourly and daily rentals fuel will be provided by ${subsidiary.name}, however for all weekly and monthly rentals fuel [Aramco/equivalent] should be provided by the Hirer. If fuel is supplied from any other sources, any damages caused to the machines, repair costs will be recovered from Hirer.<br />';
        template += '                          <strong>13.&nbsp;&nbsp;</strong>Food, Accommodation and Transport: Hirer to provide food, accommodation and transportation for our personnel [Labour class not acceptable] for all weekly and monthly hires. For daily hire within city limits, Al Faris will provide Food, Accommodation and Transport.<br />';
        template += '                          <strong>14.&nbsp;&nbsp;Permits and Passes:</strong> Hirer should arrange all Police/Municipality and road permits as and when required for operation of the equipment in restricted areas. Hirer to provide all passes for our personnel and equipment, if required.<br />';
        template += '                          <strong>15.&nbsp;&nbsp;Non Availability of Work:</strong>In case the equipment works less than the minimum hours or 10 hours per day due to non-availability of work or inadequate weather conditions, the minimum hours as agreed will be applicable.<br />';
        template += '                          <strong>16.&nbsp;&nbsp;Site Supervision:</strong>Supervision at your site shall be your responsibility and accordingly the operator will be under the control of the Hirer. The Hirer to ensure clear and proper directions are given for all work to be performed by the operator and Hirer will be solely responsible for all acts or omissions of the operator while performing duties under the supervision. Hence any damages to third party property arising out of such operation will be the Hirer’s risk and such insurance cover should be arranged by the Hirer at their own cost on waiver of subrogation towards ${subsidiary.name}. The Hirer will not request the equipment to be utilized to perform any duties beyond its rated capacity at any time.<br />';
        template += '                          <strong>17.&nbsp;&nbsp;Liability Of The Company:</strong><br />';
        template += '                          <strong>a).&nbsp;&nbsp;</strong>The Company shall be liable for loss or for damage or injury to persons or property when caused solely by the Company’s negligence in the performance of the contract and shall not be liable for any such loss, or damage or injury due in whole or in part to any negligence on the part of the client or any third party<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;b1)</strong> For loss or destruction or damage to the contract Goods shall be limited to a total of SAR 250,000 (SAUDI RIYALS TWO HUNDRED FIFTY THOUSAND) irrespective of the number of items being lifted or handled.<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;b2)</strong> For any other loss, damage or injury shall be limited to a total sum $ 2,000,000 (United States Dollar Two Million only).<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;</strong>Unless in either case, a different amount is agreed in writing by the company and the Client prior to the commencement of the contract.<br />';
        template += '                          <strong>18.&nbsp;&nbsp;Exclusion Of The Company’s Liability:</strong><br />';
        template += '                          <strong>a).&nbsp;&nbsp;</strong>The company shall not be liable for any loss, damage or injury caused by, or arising from or as the result of, any of the following:<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;a1)</strong> Any defect in the Contract Goods including any design defect and any defect relating to the lifting points on the contract goods.<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;a2)</strong> Inaccurate or incomplete information given by the Client.<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;a3)</strong> Any instructions given by the client to the company’s employees.<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;a4)</strong> Any defect in the equipment provided by the client.<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;a5)</strong> Any act or omission of any personnel supplied by the client, or any body or person under contract to the client in connection with the contract goods, except when correctly following the company’s instructions for the purpose of performing the Company’s work under the contract.<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;a6)</strong> Delay in commencing or completing the contract works due to circumstances beyond the company’s control including, but not limited to, any strike or other industrial action or adverse weather conditions.<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;a7)</strong> Unexpected or unforeseen subsidence or unstable ground conditions.<br />';
        template += '                          <strong>b).&nbsp;&nbsp;</strong>The company shall not be liable or responsible for any of the following. However arising:<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;b1)</strong> Loss or damage of whatever nature due to or arising through any cause beyond the company’s reasonable Control.<br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;b2)</strong> Whether by way of indemnity or by reason of any breach of the contract, breach of statutory duty or misrepresentation or by reason of commission of a tort (including but not limited to negligence) in connection with the contract for any of the client’s loss or profit, loss of the use of the plant or any other asset, or facility, loss or production or productivity, loss of contracts with any third party, liabilities of whatever nature to any third party, and/or any other financial or economic loss or indirect or consequential loss or damage of whatever nature; and <br />';
        template += '                          <strong>&nbsp;&nbsp;&nbsp;b3)</strong> Loss or damage to the contract goods whilst in storage outside the control of the company<br /></span>';
        template += '                          <span style="font-size:7px;font-family: arial,helvetica,sans-serif;"><strong>19.&nbsp;&nbsp;Protection of rented assets:</strong></span><br />';
        template += '                          <span style="font-size:7px;font-family: arial,helvetica,sans-serif;"><strong>.&nbsp;&nbsp;Ownership and title </strong></span><br />';

        template += '                        <span style="font-size:7px;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>The  Hirer acknowledges and agrees that the rented asset(s) shall irrevocably and under all circumstances remain the sole and exclusive property of the Owner during the rental period. Accordingly, the Hirer shall not, either by action or omission, compromise the rights, title, and interest of the Owner in the rented asset(s).</span><br/>';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>.&nbsp;&nbsp;</strong>The Hirer shall have only the rights to use the rented asset(s) in accordance with the terms of the ${record.tranid}.</span><br />';
        template += '                          <span style="font-size:7px;font-family: arial,helvetica,sans-serif;"><strong>.&nbsp;&nbsp;Hirer’s obligations </strong></span><br />';

        template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>.&nbsp;&nbsp;</strong>The Hirer shall not, without the prior written consent of the Owner: </span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>use the rented asset(s) for purposes other than those agreed upon; and </span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>move or relocate the rented asset(s) from the location where it intended to be used (location of hire).</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>.&nbsp;&nbsp;</strong>The Hirer shall:</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;</strong>take all reasonable measures to protect the rented asset(s) from theft, damage, and/or any other loss;  </span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;</strong>immediately notify the Owner after any loss and /or damage to the rented asset(s) during the rental period, and take all reasonable measures to prevent any further loss and/or damage;  </span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>permit the Owner at all reasonable times and upon reasonable notice to inspect the rented assets, including procuring accesses to any property where the rented asset(s) are located; and </span><br />';
        // template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>notify the Owner immediately on becoming aware of any event or circumstances (which when considered together) indicate a likelihood of the leased equipment being impounded, confiscated or otherwise attached by any governmental, statutory or judicial authority due to any proceedings against the Hirer, and shall allow the Owner to forthwith take possession of the rented equipment, without any demur or reduction in rental fees. </span><br />';
        // template += '                        <span style="font-family: arial,helvetica,sans-serif;font-size:7px;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>Hirer preparing to close his business operations or declare Insolvency, hirer shall act to return back owner’s equipment with immediate effect and shall arrange to settle outstanding for the rental period until the date of return. In failing to return owner’s equipment, hirer shall be liable for arranging payment equivalent to the replacement value of equipment rented including the rental due payments. </span><br />';

        template += '                          </p>';
        template += '            </td>';
        template += '            <td style="width:300px;">';
        template += '            <p style="text-align: justify;font-size:7px;">';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>notify the Owner immediately on becoming aware of any event or circumstances (which when considered together) indicate a likelihood of the leased equipment being impounded, confiscated or otherwise attached by any governmental, statutory or judicial authority due to any proceedings against the Hirer, and shall allow the Owner to forthwith take possession of the rented equipment, without any demur or reduction in rental fees. </span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>Hirer preparing to close his business operations or declare Insolvency, hirer shall act to return back owner’s equipment with immediate effect and shall arrange to settle outstanding for the rental period until the date of return. In failing to return owner’s equipment, hirer shall be liable for arranging payment equivalent to the replacement value of equipment rented including the rental due payments. </span><br />';
        template += '                          <span style="font-size:7px;font-family: arial,helvetica,sans-serif;"><strong>.&nbsp;&nbsp;Hirer’s liability </strong></span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>.&nbsp;&nbsp;</strong>The Hirer shall on demand, defend, indemnify in full and hold harmless the Owner from and against any and all claims, actions, proceedings, judgments, costs, damages, expenses, and losses of any kind whatsoever which the Owner may, directly or indirectly, suffer or incur from time to time in relation to: </span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>any breach, default, non-observance or non-performance by the Hirer of any of the terms and conditions contained in these STCs or the [rental agreement] or any actions, omissions, misconduct or negligence by the Hirer; </span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>any unauthorized sale, transfer, or leveraging of the rented asset(s) by the Hirer to a third party; and/or</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;.&nbsp;&nbsp;</strong>the impounding, removal or confiscation of the rented asset(s) by any competent authority for any reason. </span><br />';
        template += '                        <span style="font-size:7px;"><strong>20.&nbsp;&nbsp;Insurance:</strong></span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;a)&nbsp;&nbsp;</strong>The Company will carry insurance to cover its potential liability under the contract having regard to the maximum amounts referred to in clause (17b).</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;b)&nbsp;&nbsp;</strong>The Company may, at its discretion, exclude the contract from cover under its existing policies and require a specific Insurance policy to cover the contract to be provided by and at the expense of the client. This specific insurance policy shall provide the company with protection no less extensive than would have been the case if this clause (17b) had not been invoked.</span><br />';

        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;c)&nbsp;&nbsp;</strong>If the company is of the opinion that the insurance cover held by the client may be insufficient to meet any applicable requirements of clause (17b) of the client’s liabilities under the contract, the company may require the client to take out at the client’s expense additional liability insurance cover or take out such cover itself and recover the cost from the client as debt.</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;d)&nbsp;&nbsp;</strong>If the value of the contract goods exceeds the company’s liability limits referred to in clause (15b) and the client requires the company to increase its cover, it is the responsibility of the client to give the company sufficient written notice of that fact with details of the value of the contract goods so that the company’s liability cover, if agreed by the company, can be increased accordingly. The cost of any additional cover will be passed on the client.</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;e)&nbsp;&nbsp;</strong>The client agrees to indemnify the company against-</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;e1)&nbsp;</strong>Any claim arising from or connected with the Company’s work on the contract site, in preparing the site or performing the contract, including claims of nuisance and claims of trespass to persons, property, land or air space.</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;e2)&nbsp;</strong>All other losses, damage or claims in respect of any matters arising from or in connection with the contract and for which, under these terms and conditions, the client is liable or for which under clause (16) the company is not liable and</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;e3)&nbsp;</strong>Any liability arising from or in connection with the contract to pay any amount in excess of the relevant limits referred to in Clause (17b)</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;f)&nbsp;&nbsp;</strong>The Client shall insure against its liability to indemnify the Company and all other liabilities of the client under the contract.</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;g)&nbsp;&nbsp;</strong>If requested by the company, the client shall produce a copy of any insurance policy together with evidence of the premium having been paid, held by the client and relevant to the contract.</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;h)&nbsp;&nbsp;</strong>Should the customer want to transport Al Faris equipment on their trailers, Haulers Liability coverage / Transit insurance to be provided by Client.</span><br />';
    


        template += '                        <span style="font-size:7px;"><strong>21.&nbsp;&nbsp; Transportation Of Contract Goods:</strong></span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;a)&nbsp;</strong>The company is not a common carrier.</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;b)&nbsp;</strong>If, under the contract, the contract goods or any part of them require transportation by air, sea, road or rail the company may either undertake the transportation or arrange for transportation by some other person or organization.</span><br />';
        template += '                        <span style="font-family: arial,helvetica,sans-serif;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;c)&nbsp;</strong>In the latter event referred to in clause (18b) unless otherwise agreed in writing by the Company, the company’s liability for the Contract Goods so transported shall be no greater than that of the person or organization carrying out the transportation, that is the airline, shipping company, haulage contractors or railway authority concerned, and the amount of compensation, if any, payable for loss of or damage to the contract goods during transportation shall be limited to the amount recoverable from that person or organization in respect of that loss or damage.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>22.&nbsp;&nbsp;</strong>Insurance for tandem lift operation to be covered by Hirer and copy marked to us prior to commencement of job.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>23.&nbsp;&nbsp;Site Conditions:</strong> The Hirer to ensure that the ground conditions are adequate for travel on site and to set up the equipment in its final working position. The Hirer should ensure that any utility lines (below the ground or around the site) are identified and notified to ${subsidiary.name} before the crane arrives on location and it will be the Hirer’s sole responsibility, if any damage occurs to such facilities. Hirer to ensure that the ground is firm, compacted and free from any impediments at all times for a safe, smooth and efficient movement of the equipment while on site.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>24.&nbsp;&nbsp;Duties &amp; Taxes:</strong> All government related taxes including company taxes, withholding taxes, duties and custom deposits / guarantees or any other levies arising due to operation of equipment on site or by way of traveling to site as per the laws of the country to be borne by the Hirer.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>25.&nbsp;&nbsp;Equipment Replacement:</strong> ${subsidiary.name} will not be responsible for any loss or consequential loss, due to breakdown of any of our equipments while traveling to site / at site. Replacement will be provided for major breakdowns subject to availability.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>26.&nbsp;&nbsp;Availability of Equipments:</strong> All equipments are subject to availability at the time of confirmation of order and will be delivered strictly in compliance with our standard terms and conditions. ${subsidiary.name} will only hire equipments for which it has received the specific order.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>27.&nbsp;&nbsp;Re-hire/Sub lease:</strong> The Hirer shall not re-hire or sub lease the equipment hired without the consent and approval of the Owner. In the event of the Owner finding the Hirer carrying out such above mentioned practice, it will be termed illegal and the Owner has the option of carrying out legal action against the Hirer. The Owner will subsequently be relieved of any/all insurance claim/s from the Hirer.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>28.&nbsp;&nbsp;Payment Terms:</strong> Refer Hire Agreement. All rates quoted are net payable to ${subsidiary.name}  . Default in payment by your client / main contractor to your company should not be extended to ${subsidiary.name}. Payment exceeding the credit period will be levied with interest of 2% per month.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>29.&nbsp;&nbsp;</strong>In the event of the Hirer suffering any legal action, distress or execution to be levied against him or make proposal to make any arrangement with his creditors, or shall enter into liquidation or shall be do or cause to be done or permit or suffer any act or thing; shall not be considered a reason for the Owner not to receive from the Hirer all monies due to the Owner.</span><br />';
        template += '                        <span style="font-size:7px;"><strong>30.&nbsp;&nbsp;Termination:</strong> The agreement can be terminated by either party giving [15] days notice in writing.</span><br />';
        template += '                          </p>';
        template += '            </td>';
        template += '          </tr>';
        template += '        </tbody>';
        template += '      </table>';
        template += '      </td>';
        template += '    </tr>';
        template += '  </tbody>';
        template += '</table>';


    
   


            template += '    <table style="width:100%;margin-top:10px;">';
            template += '  <tbody>';
            template += '    <tr>';
            template += '      <td>';
            template += '      <table>';
            template += '        <tbody>';
            template += '          <tr>';
            template += '            <td style="width:300px;">';
        
            template += '            <p style="text-align: justify;">';
            template += '                        <span style="font-size:7px;"><strong>31.&nbsp;&nbsp;Extension:</strong> The hirer to notify in writing with a lead time of [15] days for extend of this hire period.</span><br />';
            template += '                        <span style="font-size:7px;"><strong>32.&nbsp;&nbsp;</strong>Any dispute arising out of formation, performance, interpretation, nullification, termination or invalidation of this contractor arising there from or related thereto in any manner whatsoever, shall be referred to the exclusive jurisdiction of Saudi courts.</span><br />';
            template += '                        <span style="font-size:7px;"><strong>33.&nbsp;&nbsp;VAT:</strong> Upon acceptance of this agreement the parties agree that in the event of Value Added Tax (VAT) being levied or introduced by the Government Authorities of Saudi Arabia, ${subsidiary.name} reserves the right to charge the VAT rate at the prevailing VAT rate (as applicable) in respect of any supply so far as mentioned in the Agreement. The Hirer/Purchaser shall pay the amount of any such VAT as an addition to the invoice value. ${subsidiary.name} shall provide to the Hirer/Purchaser the documentation required by VAT legislation to permit the Hirer/Purchaser to claim an input of VAT deduction on their VAT return.</span>';


        
    
            template += '                          </p>';
            template += '            </td>';
            template += '            <td style="width:300px;">';
            template += '            <p style="text-align: justify;font-size:7px;">';
        
    
    
            template += '                          </p>';
            template += '            </td>';
            template += '          </tr>';
            template += '        </tbody>';
            template += '      </table>';
            template += '      </td>';
            template += '    </tr>';
            template += '  </tbody>';
            template += '</table>';
                
    
            }


    template += '  <#if record.custbody_transport_trms_cndtns?string == "Yes ">';
    template += '    <table style="width:100%;margin-top:10px;">';
    template += '    <tr>';
    template += '      <td>';
    template += '      <table><tr>';
    template += '            <td align="center" colspan="2">';
    template += '            <p style="text-align: center;"><span style="font-size:11px;"><strong><span style="font-family: verdana,geneva,sans-serif;">Standard Terms and Conditions [Transportation]</span></strong></span></p>';
    template += '            </td>';
    template += '          </tr>';
    template += '          <tr>';
    template += '            <td>';
    template += '            <p style="text-align: justify;"><span style="font-size:11px;"><strong>1.&nbsp;&nbsp;Quotation validity and scope</strong><br /><br />';
    template += '            This quotation is valid for 7 calendar days. Contract Price includes only the charge for the Scope of Work as specified in this quotation and is subject to availability of equipment until placement of a firm order by Customer and subsequent confirmation by Al Faris.<br /><br/></span>';
    template += '                        <span style=";font-size:11px;"><strong>2.&nbsp;&nbsp;Applicability of General Terms</strong><br/><br />';
    template += '                        In addition to the terms included in this quotation, our Standard Terms and Conditions of Al Faris apply to this quotation and to all subsequent contracts resulting from or relating to this quotation, and to any and all other quotations, offers, orders, confirmations and other documents and acts made and, or done in preparation for and, or prior to and, or in connection with this quotation (<b>‘Hire Agreement’</b>), as if it is set out here in full. The General Terms can be found on<a href= "www.alfarisgroup.com" style="font-weight=bold;">www.alfarisgroup.com</a>. Al Faris expressly denies the applicability of any other terms and conditions to the Contract Arrangements.<br/><br />In the event of any conflict between the terms included in this quotation and our General Terms, the provisions of this quotation will prevail. For your convenience only, please find a summary of main General Terms below. For the complete/exact wordings of the General Terms, please refer to <a href= "www.alfarisgroup.com" style="font-weight=bold;">www.alfarisgroup.com</a>.';
    template += '                          </span><br /><br/>';
    template += '            <span style="font-size:11px;"><strong>3.&nbsp;&nbsp;Information/Work Conditions</strong><br /><br />Each Party may rely fully on the accuracy, correctness and completeness of the Documentation and information supplied to it by or on behalf of the other Party. The Customer guarantees the structural integrity of the Load, including the suitability of the Load for the method used during the activities.<br/><br />';
    template += '    The Customer is responsible for providing sound hoisting, anchor, jacking and/or lashing points, which should be sufficiently strong for the performance of the Work. The Customer is responsible for and guarantees that the soil/deck can withstand the requisite soil/deck pressure during the work.</span><br/><br/>';
    template += '                        <span style="font-size:11px;"><strong>4.&nbsp;&nbsp;Liability</strong><br/><br />In so far as Al Faris is or can be held liable under the General Terms and/or the Contract, Al Faris will only be liable (for any occurrence, loss, costs or damage caused directly by any act or omission on client, the part of Al Faris or its subcontractors. Al Faris will under no circumstances be liable for any occurrence, loss, costs or damage which come(s) or should come under the cover of the insurance policy or policies taken out by the Customer.<br/><br />';
    template += '    Neither Party (including its group) will be liable to the other Party for any loss of profit, loss of use, loss of contracts and/or economic loss and/or for any indirect damage and/or for multiple damages and/or punitive damages.<br/><br /><br />';
    template += '                          With the exception of intent or deliberate recklessness on the part of Al Faris the total liability of Al Faris shall be limited to the Contract Price.</span><br /><br/>';
    template += '              <span style="font-size:11px;"><strong>5.&nbsp;&nbsp;Insurance</strong><br/><br />';
    template += '                          Insurance provided by Al Faris are<br/>(1) General Third Party Liability insurance for damage/loss up to a maximum of USD 2,500,000 per occurrence<br/> (2) Equipment Insurance covering physical damage or loss of Al Faris equipment<br/> (3) Workman’s Compensation/Employer’s Liability according to applicable law.<br/><br />';
    template += '                          Customer to take out primary transport, CAR (Construction All Risks), EAR (Erection All Risks) or comparable insurance which provides at least adequate cover in respect of loss of equipment and/or property damage caused to or by the Load and/or the Work. The insurance should provide cover at the Location and during transport. This insurance shall be primary and shall name AL Faris as additional insured and shall provide a waiver of subrogation in favour of Al Faris and its subcontractors.';
    template += '                          </span><br /><br/>';
    template += '                          </p></td></tr>';
    template += '                      </table>';
    template += '      </td>';
    template += '    </tr></table>';
    template += '    <table style="width:100%;margin-top:10px;">';
    template += '    <tr>';
    template += '      <td>';
    template += '      <table>';
    template += '          <tr>';
    template += '            <td>';
    template += '            <p style="text-align: justify;">';
    template += '                        <span style="font-size:11px;"><strong>6.&nbsp;&nbsp;Delay/Suspension</strong><br/><br />';
    template += '                         If and to the extent liquidated damages have been agreed for delay, Al Faris shall only be liable for such liquidated damages in the event the delay is the result of one or more circumstances caused by Al Faris. Such liquidated damages will be the sole (financial) remedy available to the Customer for damages/losses arising out of delay caused by Al Faris. Unless a different percentage has been expressly agreed in writing, the total liquidated damages will never exceed 10% of the Contract Price.';
    template += '                          </span><br /><br/>  ';
    template += '                        <span style="font-size:11px;"><strong>7.&nbsp;&nbsp;Shipping</strong><br /><br />';
    template += '            Where Al Faris is required to arrange shipping, all terms and conditions of the charter party or shipping contract between Al Faris and the shipping company shall equally apply and govern the relationship between Al Faris and Customer during the shipping leg of the transport, and such terms shall in that case take precedence over the Contract Arrangements.<br /><br/></span>';
    template += '                        <span style=";font-size:11px;"><strong>8.&nbsp;&nbsp;Governing Law/Jurisdiction</strong><br/><br />';
    template += '                        The Contract, including any disputes relating to the existence, validity and/or termination thereof, will be governed exclusively by and construed in accordance with the laws of KSA.<br/><br/>';
    template += '                        All disputes arising in connection with the Contract or subsequent contracts resulting therefrom, including disputes relating to the existence, validity and/or termination thereof, if not settled through negotiations and conciliation procedures as provided in the contract, shall be referred exclusively to ICC Arbitration. The seat of the Arbitration shall be Dubai and all the proceedings including submission of documents and depositions shall be in English Language.<br/><br/>';
    template += '                          Trust this offer is in line with your requirement. Assure you our best service and attention at all times. In the meantime, if you require additional information for the above, please feel free to contact us.';
    template += '                          </span><br /><br/>';
    template += '                          <span style="font-size:11px;"><strong>9.&nbsp;&nbsp;</strong>Any dispute arising out of formation, performance, interpretation, nullification, termination or invalidation of this contractor arising there from or related thereto in any manner whatsoever, shall be referred to the exclusive jurisdiction of Saudi courts.</span>';
    template += '                          </p></td></tr>';
    template += '                      </table>';
    template += '      </td>';
    template += '    </tr></table>';
    template += '     </#if>';
    template += '</body>';
    template += '</pdf>';

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
    if (x == null) {
        x = "";
        return x;
    } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}


function lumpdescription(charVal) {
    return charVal.replace(/\n/g, "<br/>");
}

function replaceAndOper(charVal) {
    return charVal.replace(/&/g, "&amp;");
}