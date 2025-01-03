function timesheetNightPdfGeneration(request, response) {
    if (request.getMethod() == 'GET') {
        var errorMsg = 0;
        var param = request.getParameter("raid");
        var isaditionalts = request.getParameter("ts");
        var printPar = request.getParameter("print");
        var subsidiary = request.getParameter("subsi");
        var letterhead = request.getParameter("lh");
        var lnCnt = 0;
        var timesheetID = '';
        var template = "";
        var footerSec = '';
        var templateHeader = '';
        var templateFooter = '';

        var timesheetInternalID = request.getParameter("tsid");
        var timesheetRes = nlapiLoadRecord("customrecord_rent_timesheet", timesheetInternalID);

        var salsId = timesheetRes.getFieldValue("custrecord_rent_time_sales_order");
        var soRec = nlapiLoadRecord("salesorder", salsId);
        var soIds = soRec.getFieldValue("tranid");
        var site = soRec.getFieldText("custbody_af_main_project");

        // var tsSite = timesheetRes.getFieldValue("custrecord_rent_timesheet_site");
        // var tsSiteCntct = timesheetRes.getFieldValue("custrecord_rent_time_site_contract");

        var quoteId = soRec.getFieldValue("createdfrom");
        nlapiLogExecution("DEBUG", "quoteId", quoteId);
        var quoteIds = '';
        if (quoteId) {
            var quoteRec = nlapiLoadRecord("estimate", quoteId);
            quoteIds = quoteRec.getFieldValue("tranid");
        }




        var timesheetCustomer = timesheetRes.getFieldText("custrecord_rent_time_customer");
        var customer = timesheetRes.getFieldValue("custrecord_rent_time_customer");
        var sub_id = timesheetRes.getFieldValue("custrecord_rent_time_subsidiary");
        var location = timesheetRes.getFieldValue("custrecord_rent_time_location");
        var sub_maseter = nlapiLoadRecord("subsidiary", sub_id)
        var headerlogo = sub_maseter.getFieldValue("logo");
        var footerlogotop = sub_maseter.getFieldValue("custrecord_subsidiary_top_footer");
        var footerlogobottom = sub_maseter.getFieldValue("custrecord_subsidiary_bottom_foot");
        nlapiLogExecution("DEBUG", "footerlogobottom", footerlogobottom);


        var NreplacedCust = '';
        if (timesheetCustomer) {
            if (timesheetCustomer.indexOf(':') != -1) {
                NreplacedCust = timesheetCustomer.split(':');
                NreplacedCust = relaceCharector(NreplacedCust[1]).substring(7);
            } else {
                var NreplacedCust = relaceCharector(timesheetCustomer).substring(7);
            }
        }
        var NresourceName = '';
        var Nresource = relaceCharector(timesheetRes.getFieldText("custrecord_rent_time_rod_asset"));

        var rodEquipmnt = relaceCharector(timesheetRes.getFieldValue("custrecord_rent_time_rod_asset"));

        var assetRec = nlapiLoadRecord("customrecord_rent_asset", rodEquipmnt);

        var assetItemNm = assetRec.getFieldText("custrecord_rent_asset_item");
        var plateNum = assetRec.getFieldValue("custrecord_rent_asset_reg_plate_num");


        var soId = assetRec.getFieldValue("custrecord_rent_asset_sales_order");
        var tsSite = '';
        var tsSiteCntct = '';
        if (soId) {
            var soRec = nlapiLoadRecord("salesorder", soId);
            var siteCntct = soRec.getFieldValue("custbody_site_contact");
            tsSite = soRec.getFieldValue("custbody_site_contact");
            tsSiteCntct = soRec.getFieldValue("custbody_site");

        }


        var mainTimeShtRef = timesheetRes.getFieldValue('custrecord_rent_time_main_timesheet_ref');
        nlapiLogExecution("DEBUG", "mainTimeShtRef", mainTimeShtRef);
        nlapiLogExecution("DEBUG", "timesheetRes", timesheetRes);








        var NregistrationNo = '';
        if (timesheetRes.getFieldValue("custrecord_register_number")) {
            var NregistrationNo = relaceCharector(timesheetRes.getFieldValue("custrecord_register_number"));
        }
        var NsalesOrder = '';
        if (timesheetRes.getFieldValue("custrecord_rent_time_sales_order")) {
            var NsalesOrder = relaceCharector(timesheetRes.getFieldText("custrecord_rent_time_sales_order"));
        }
        var Nsubsidiary = '';
        if (timesheetRes.getFieldValue("custrecord_rent_time_subsidiary")) {
            var Nsubsidiary = relaceCharector(timesheetRes.getFieldValue("custrecord_rent_time_subsidiary"));
        }
        var NetsNo = '';
        if (timesheetRes.getFieldValue("recordid")) {
            var NetsNo = relaceCharector(timesheetRes.getFieldValue("recordid"));
        }

        var rodRef = timesheetRes.getFieldText("custrecord_rent_time_rod");

        nlapiLogExecution("DEBUG", "rodRef", rodRef);
        var rodRec = nlapiLoadRecord("customrecord_rent_rod", rodRef);
        var requestedItem = rodRec.getFieldText("custrecord_rent_rod_requested_item");
        var customerPh = nlapiLookupField('customer', customer, 'phone');

        if (isaditionalts == 'gen') {

            if (timesheetRes) {
                var startdate = '';
                timesheetID = request.getParameter("tsid");
                var startdate = timesheetRes.getFieldValue("custrecord_rent_time_from_date")
                var enddate = timesheetRes.getFieldValue("custrecord_rent_time_to_date");
                var shiftType = timesheetRes.getFieldValue("custrecord_rent_ts_shift_type");
                var shiftTypeText = timesheetRes.getFieldText("custrecord_rent_ts_shift_type");
                var TimesheetName = timesheetRes.getFieldValue("name");

                var tsCreatedFrom = timesheetRes.getFieldValue("custrecord_rent_time_created_from");
                var tsTruck = '';
                var tsDriver = '';
                var manpowerRef = '';
                if (tsCreatedFrom == 5 || tsCreatedFrom == 6) {
                    tsTruck = timesheetRes.getFieldText("custrecord_rent_time_truck_ref");
                    tsDriver = timesheetRes.getFieldText("custrecord_rent_time_manpower_ref");

                    if (tsTruck) {
                        manpowerRef = tsTruck;
                    } else {
                        manpowerRef = tsDriver;
                    }
                }


                var date1 = nlapiStringToDate(startdate);
                var date2 = nlapiStringToDate(enddate);

                var datediff = date_diff_indays(date1, date2);

                lnCnt = datediff + 1;

                var prefix = '';
                if (Nsubsidiary == 'AFIHER Abu Dhabi') {
                    prefix = 'I';
                } else if (Nsubsidiary == 'MMGT') {
                    prefix = 'M';
                } else if (Nsubsidiary == 'AFER Dubai') {
                    prefix = 'A';
                }
                var sitecontact = '';


                // template += "        <macro id=\"nlheader\"> ";
                // template += "<img src=\"https://4647359.app.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7\" style=\"width:768px;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" /> "
                // template += "        </macro> ";








                templateHeader += '<h4 style="width:100%;font-style:normal;text-decoration: underline;text-align:center;top:-20px;">TIME SHEET</h4>';

                templateHeader += '<table width="100%" style="font-size:12px;top:-20px;">';

                templateHeader += '<tr>';

                templateHeader += '<td width="50%" ><b>Customer &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;</b>' + relaceCharector(timesheetCustomer) + '</td>';
                templateHeader += '<td width="50%" ><b> Ref # &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;</b> ' + removeNull(quoteIds) + ',&nbsp;' + removeNull(soIds) + '</td>';
                // templateHeader += '<td width="25%" ></td>';
                templateHeader += '</tr>';

                templateHeader += '<tr>';
                templateHeader += '<td width="50%" ><b>Time sheet#  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;</b>' + prefix + TimesheetName + '</td>';
                // templateHeader += '<td width="25%" colspan = "2"><b> Ref # &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;</b> ' + NsalesOrder + '</td>';
                // templateHeader += '<td width="25%" ></td>';
                templateHeader += '<td ><b> Resource &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;</b>' + Nresource + '</td>';

                templateHeader += '</tr>';
                templateHeader += '<tr>';

                templateHeader += '<td  ><b >Eqpt Capacity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;</b> ' + assetItemNm + '</td>';
                // templateHeader += '<td ><b> Resource &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;</b>' + Nresource + '</td>';
                templateHeader += '<td ><b> Reg# &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;</b> ' + removeNull(plateNum) + ' </td>';

                templateHeader += '</tr>';
                templateHeader += '<tr>';

                templateHeader += '<td  ><b >Site Contact &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>' + removeNull(tsSiteCntct) + '</td>';


                templateHeader += '</tr>';


                templateHeader += '</table>';


                ///////////////////////////////////////////////////////////////////////////////////////////////////// everything brought in 1 table 
                var rodRecrd = nlapiLoadRecord("customrecord_rent_rod", rodRef);
                var operatorAssets = rodRecrd.getFieldValue("custrecord_rent_rod_night_operator");
                var operatorAssetsTxt = ""
                if(operatorAssets){
                    // var operatorRecord = record.load({
                    //     type: 'customrecord_rent_asset',
                    //     id: operatorAssets
                    // });
                    var operatorRecord = nlapiLoadRecord("customrecord_rent_asset",operatorAssets)
                    operatorAssetsTxt = operatorRecord.getFieldValue("name");
                
                }
              
                // var operatorAssetsTxt = rodRecrd.getFieldText("custrecord_rent_rod_night_operator");
                var operatorAssetRef = rodRecrd.getFieldText("custrecord_rent_rod_asset");
                var helperAssets = rodRecrd.getFieldValue("custrecord_rent_rod_manpower_helper");
                var supervisorAssets = rodRecrd.getFieldValue("custrecord_rent_rod_manpower_supervisor");

                nlapiLogExecution("DEBUG", "operatorAssets", operatorAssets);
                nlapiLogExecution("DEBUG", "operatorAssetsTxt", operatorAssetsTxt);
                nlapiLogExecution("DEBUG", "helperAssets", helperAssets);
                nlapiLogExecution("DEBUG", "supervisorAssets", supervisorAssets);
                template += templateHeader;
                template += '<table style="width:100%;">';
                template += '<tr style="line-height:95%;">';
                template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;font-size:12px;width:10%;">Date</td>';
                template += '<td colspan="1" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;font-size:12px;width:30%;">Driver / Operator</td>';
                template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;font-size:12px;width:10%;">From</td>';
                template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;font-size:12px;width:10%;">To</td>';
                template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;font-size:12px;width:10%;">Break</td>';
                template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;font-size:12px;width:10%;">Total Hrs</td>';
                template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:12px;width:20%;">Remarks</td>';
                template += '</tr>';


                for (var kk = 0; kk < 31; kk++) {
                    //   var  pagebrk ++;

                    var newdate = date1;

                    var stdate = nlapiAddDays(newdate, kk);
                    template += '<tr style="border-bottom:solid 1px #ccc;line-height:95%;">';
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    stdate = stdate.getDate() + "-" + monthNames[stdate.getMonth()] + "-" + stdate.getFullYear();
                    if (lnCnt > kk) {
                        template += '<td style="border-left:solid 1px #ccc;font-size:12px;">' + stdate + '</td>';
                    } else {
                        template += '<td style="border-left:solid 1px #ccc;font-size:12px;"></td>';

                    }
                    // template += '<td style="border-left:solid 1px #ccc;width:120px;font-size:12px;">' + manpowerRef + '</td>';
                    if (kk == 0) {
                        if (operatorAssetsTxt) {
                            template += '<td style="border-left:solid 1px #ccc;font-size:11px;">' + operatorAssetsTxt + '</td>';
                        } else {
                            template += '<td style="border-left:solid 1px #ccc;font-size:11px;">' + operatorAssetRef + '</td>';

                        }
                    } else {
                        template += '<td style="border-left:solid 1px #ccc;font-size:12px;">&nbsp;</td>';

                    }
                    template += '<td style="border-left:solid 1px #ccc;font-size:12px;">&nbsp;</td>';
                    template += '<td style="border-left:solid 1px #ccc;font-size:12px;">&nbsp;</td>';
                    template += '<td style="border-left:solid 1px #ccc;font-size:12px;">&nbsp;</td>';
                    template += '<td style="border-left:solid 1px #ccc;font-size:12px;">&nbsp;</td>';
                    template += '<td  style="border-left:solid 1px #ccc;border-right:solid 1px #ccc;font-size:12px;">&nbsp;</td>';
                    template += '</tr>';
                }
                template += '</table>';




                /////////////////////////////////////////////////////////////////////////////////////////////////////



















                // templateHeader += '<table width="100%" style="font-size:12px;">';
                // templateHeader += '<tr>';
                // templateHeader += '<td width="15%"><b>Customer</b></td>';
                // templateHeader += '<td width="1%" align ="right">&nbsp;&nbsp;&nbsp;:</td>';
                // templateHeader += '<td width="84%" style = "padding-left :12px;">' + relaceCharector(timesheetCustomer) + '</td>';

                // templateHeader += '</tr>';
                // templateHeader += '<tr>';
                // templateHeader += '<td width="15%"><b>Time sheet#</b></td>';
                // templateHeader += '<td width="1%" align ="right">&nbsp;&nbsp;&nbsp;:</td>';
                // templateHeader += '<td width="84%"  style = "padding-left :12px;">' + prefix + TimesheetName + '</td>';


                // templateHeader += '</tr>';
                // templateHeader += '</table>';
                // templateHeader += '<table style="width:655px;font-size:12px;">';
                // templateHeader += '<tr>';
                // templateHeader += '<td style="width:100px;font-weight:bold;">Tel #</td>';
                // templateHeader += '<td width="1%" align ="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</td>';
                // templateHeader += ' <td style="width:225px; padding-left :12px;">' + customerPh + '</td>';

                // templateHeader += '<td style="width:100px;font-weight:bold;">Ref #</td><td>:</td><td style="width:225px; padding-left :12px;"> ROD #' + rodRef + '<br/>' + NsalesOrder + '</td>';


                // templateHeader += '</tr>';
                // templateHeader += '<tr>';
                // templateHeader += '<td style="width:100px;font-weight:bold;">Eqpt Capacity</td><td>&nbsp;:</td><td style="width:225px; padding-left :12px;">' + Nresource + '</td>';

                // templateHeader += '<td style="width:100px;font-weight:bold;">Ref #</td><td>:</td><td style="width:150px;padding-left :12px;">ROD #' + rodRef + '<br/>' + NsalesOrder + '</td>';


                // templateHeader += '</tr>';
                // templateHeader += '<tr>';
                // templateHeader += '<td align ="left" style="width:50px;"></td><td></td><td style="Padding-right :-80px;"></td>';
                // templateHeader += '<td align ="left" style="width:50px;font-weight:bold;">Reg#</td><td>:</td><td style="Padding-right :-80px;"></td>';

                // templateHeader += '</tr>';


                // templateHeader += '<tr>';
                // templateHeader += '<td style="width:50px;font-weight:bold;">Site Contatct</td><td>:</td><td style="width:150px;padding-left :12px;">' + siteContactLinebreak(sitecontact) + '</td>';
                // templateHeader += '<td  align ="left" style="width:50px;font-weight:bold;">Resource</td><td>:</td><td style="width:225px;padding-left :12px;">' + removeNull(shiftTypeText) + '</td>';
                // templateHeader += '</tr>';
                // templateHeader += '<tr>';
                // templateHeader += '<td style="width:100px;font-weight:bold;">&nbsp;</td><td>&nbsp;</td>';
                // templateHeader += '</tr>';
                // templateHeader += '</table>';



                // templateFooter += '<table><tr><td>&nbsp;</td></tr></table>';

                // commented same table is shifted after the date, Driver/operator.....
                // templateFooter += '<table style="width:100%;font-size:12px;border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;border-top:solid 1px #ccc;">';
                // templateFooter += '<tr><td  style="border-right: 1px solid #000; border-bottom: 1px solid #000;   "><b>Site / Job Details</b></td> <td style="border-bottom: 1px solid #000;"  ><b>Remarks ( if any )</b></td></tr>';

                // templateFooter += '<tr><td style="border-right: 1px solid #000;"></td><td></td></tr>';
                // templateFooter += '<tr><td  style="padding-top:400%;border-right: 1px solid #000;" align="center"><b><br/><br/>Signature of Operations.</b></td><td  align="center" style = ""><b><br/><br/>Signature of customer</b></td></tr>';
                // templateFooter += '</table>';
                /////////////
                // template += templateHeader;

                // template += '<table style="width:100%;top:-20px;">';
                // template += '<tr stule="line-height:95%;">';
                // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:75px;font-size:12px;">Date</td>';
                // template += '<td colspan="1" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:215px;font-size:12px;">Driver / Operator</td>';
                // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:70px;font-size:12px;">From</td>';
                // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:70px;font-size:12px;">To</td>';
                // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:70px;font-size:12px;">Break</td>';
                // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:50px;font-size:12px;">Total Hrs</td>';
                // template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:12px;">Remarks</td>';
                // template += '</tr>';
                // template += '</table>';
                // var pagebrk = 0;
                // var pagecnt = 1;



                // for (var kk = 0; kk < lnCnt; kk++) {
                //     pagebrk++;

                //     var newdate = date1; //new Date(date1);
                //     // newdate.setDate(newdate.getDate() + (kk));
                //     // var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                //     var stdate = nlapiAddDays(newdate, kk); //newdate.getDate() + '-' + monthNames[newdate.getMonth()] + '-' + newdate.getFullYear();

                //     // if (pagebrk == 16) {
                //     //     var hei = '';
                //     //     /* if (pagecnt != 1) {
                //     //                       var hei = '115px;';
                //     //                   } else {
                //     //                       var hei = '25px;';
                //     //                   }
                //     //                   if (letterhead == 'T') {
                //     //                       var hei = '40px;';
                //     //                   }*/
                //     //     template += templateFooter;
                //     //     template += templateHeader;
                //     //     template += '<table style="width:100%;">';
                //     //     ///template += '<tr><td style="height:' + hei + '" colspan="7"></td></tr>';
                //     //     template += '<tr>';
                //     //     template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:110px;font-size:12px;">Date</td>';
                //     //     template += '<td colspan="1" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:120px;font-size:12px;">Driver / Operator</td>';
                //     //     template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:70px;font-size:12px;">From</td>';
                //     //     template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:70px;font-size:12px;">To</td>';
                //     //     template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:65px;width:70px;font-size:12px;">Break</td>';
                //     //     template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;width:65px;width:70px;font-size:12px;">Total Hrs</td>';
                //     //     template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:12px;">Remarks</td>';
                //     //     template += '</tr>';
                //     //     template += '</table>';

                //     //     pagebrk = 0;
                //     //     pagecnt++;

                //     // }
                //     //nlapiLogExecution("DEBUG","pagecnt",pagecnt);

                //     // if (mainTimeShtRef) {
                //     //     var customrecord_rent_timesheetSearch = nlapiSearchRecord("customrecord_rent_timesheet", null,
                //     //         [
                //     //             ["custrecord_rent_time_main_timesheet_ref", "anyof", mainTimeShtRef]
                //     //         ],
                //     //         [
                //     //             new nlobjSearchColumn("name").setSort(false),
                //     //             new nlobjSearchColumn("id"),
                //     //             new nlobjSearchColumn("custrecord_rent_time_status"),
                //     //             new nlobjSearchColumn("custrecord_rent_time_manpower_ref"),
                //     //             new nlobjSearchColumn("custrecord_rent_ts_shift_type"),
                //     //             new nlobjSearchColumn("custrecord_rent_time_billing_rule"),
                //     //             new nlobjSearchColumn("custrecord_rent_time_from_date"),
                //     //             new nlobjSearchColumn("custrecord_rent_time_to_date")
                //     //         ]
                //     //     );

                //     //     for (var s = 0; s < customrecord_rent_timesheetSearch.length; s++) {




                //     //         var manpowerRefs = customrecord_rent_timesheetSearch[s].getText("custrecord_rent_time_manpower_ref");

                //     //         nlapiLogExecution("DEBUG", "manpowerRefs", manpowerRefs)

                //     // .run().each has a limit of 4,000 results


                //     ///manpower/driver

                //     ///manpower/driver











                //     template += '<table style="width:100%;top:-20px;">';
                //     template += '<tr style="border-bottom:solid 1px #ccc;line-height:95%;">';
                //     var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                //     stdate = stdate.getDate() + "-" + monthNames[stdate.getMonth()] + "-" + stdate.getFullYear();

                //     template += '<td style="border-left:solid 1px #ccc;width:75px;font-size:12px;">' + stdate + '</td>';
                //     // template += '<td style="border-left:solid 1px #ccc;width:120px;font-size:12px;">' + manpowerRef + '</td>';
                //     template += '<td style="border-left:solid 1px #ccc;width:215px;font-size:12px;">' + operatorAssetsTxt + '</td>';
                //     template += '<td style="border-left:solid 1px #ccc;width:70px;font-size:12px;">&nbsp;</td>';
                //     template += '<td style="border-left:solid 1px #ccc;width:70px;font-size:12px;">&nbsp;</td>';
                //     template += '<td style="border-left:solid 1px #ccc;width:70px;font-size:12px;">&nbsp;</td>';
                //     template += '<td style="border-left:solid 1px #ccc;width:50px;font-size:12px;">&nbsp;</td>';
                //     template += '<td colspan="4" style="border-left:solid 1px #ccc;border-right:solid 1px #ccc;font-size:12px;">&nbsp;</td>';
                //     template += '</tr>';

                //     template += '</table>';

                // }
                template += '<table style="width:100%;font-size:12px;border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">';
                template += '<tr><td  style="border-right: 1px solid #000; border-bottom: 1px solid #000;   "><b>Site / Job Details</b></td> <td style="border-bottom: 1px solid #000;"  ><b>Remarks ( if any )</b></td></tr>';

                template += '<tr><td style="border-right: 1px solid #000;">' + removeNull(tsSite) + '</td><td></td></tr>';
                template += '<tr><td  style="padding-top:400%;border-right: 1px solid #000;" align="center"><b><br/><br/>Signature of Operations</b></td><td  align="center" style = ""><b><br/><br/>Signature of customer</b></td></tr>';
                template += '</table>';


                // if (lnCnt < 15) {
                //     var dif = 15 - lnCnt;
                //     // nlapiLogExecution("DEBUG","dif",dif);
                //     template += '<table style="width:100%;">';
                //     for (var ex = 0; ex < dif; ex++) {
                //         template += '<tr style = "line-height:120%;">';
                //         // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:110px;"><img src = "https://4119372.app.netsuite.com/core/media/media.nl?id=177705&amp;c=4119372&amp;h=5a17671fd6150e5b9793" style = "width:110px;height:18px;"/></td>';
                //         template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:110px;">&nbsp;</td>';
                //         // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:120px;"><img src = "https://system.eu2.netsuite.com/core/media/media.nl?id=36345&amp;c=4119372&amp;h=7c0dbbddc29cbbc1d934" style = "width:120px;height:18px;"/></td>';
                //         template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:120px;">&nbsp;</td>';
                //         // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;"><img src = "https://system.eu2.netsuite.com/core/media/media.nl?id=36345&amp;c=4119372&amp;h=7c0dbbddc29cbbc1d934" style = "width:70px;height:18px;"/></td>';
                //         template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;">&nbsp;</td>';
                //         // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;"><img src = "https://system.eu2.netsuite.com/core/media/media.nl?id=36345&amp;c=4119372&amp;h=7c0dbbddc29cbbc1d934" style = "width:70px;height:18px;"/></td>';
                //         template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;">&nbsp;</td>';
                //         // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;"><img src = "https://system.eu2.netsuite.com/core/media/media.nl?id=36345&amp;c=4119372&amp;h=7c0dbbddc29cbbc1d934" style = "width:70px;height:18px;"/></td>';
                //         template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;">&nbsp;</td>';
                //         // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;"><img src = "https://system.eu2.netsuite.com/core/media/media.nl?id=36345&amp;c=4119372&amp;h=7c0dbbddc29cbbc1d934" style = "width:70px;height:18px;"/></td>';
                //         template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;">&nbsp;</td>';
                //         // template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;"><img src = "https://system.eu2.netsuite.com/core/media/media.nl?id=36345&amp;c=4119372&amp;h=7c0dbbddc29cbbc1d934" style = "width:70px;height:18px;"/></td>';
                //         template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">&nbsp;</td>';
                //         template += '</tr>';
                //     }
                //     template += '</table>';
                // }
                //     }
                // }
                template += templateFooter;
                // }
            }
        }

        var xml = '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd" [<!ENTITY nbsp "&#160;">] >'; // start of template
        xml += '<pdf>';
        xml += '<head>';
        xml += '<style type="textcss">td p { ';
        xml += 'align: left; }';
        xml += '</style>';
        xml += '<macrolist>';
        xml += '<macro id="myheader">';


        if (headerlogo) {
            nlapiLogExecution("DEBUG", "sub_id ", sub_id);

            if (sub_id == "8" && location != "8") {
                // TRANSPORT

                var fileObj = nlapiLoadFile(headerlogo);
                nlapiLogExecution('DEBUG', 'location', fileObj)
                var imgURLForPDF = "https://4647359.app.netsuite.com/" + fileObj.getURL();
                nlapiLogExecution('DEBUG', 'url', imgURLForPDF)
                var logoUrl = relaceCharector(imgURLForPDF);
                // if (sub_id == '1') {
                xml += '<table width="100%" style="font-size:12px;">';
                xml += '<tr>';
                xml += '<td><img src ="' + logoUrl + '" style=\"width:100%;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\"/></td>';
                xml += '</tr>';
                xml += '</table>';

                // template += '<img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14614&amp;c=4647359&amp;h=flaMNO15PsYKQzLVQzTzireG0thAuPI1FDrrkdJqQ3Qz8ERo" style=\"width:80%;height:110px;position:absolute;top:-5px;\" /> ';

                // template += "<img class=\"header\" style=\"width:57;height:38px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"95\%\"  src = \"";
                // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
                // template += nlapiEscapeXML(path);
                // template += "\"></img>";
            } else if (sub_id == "8" && location == "8") {
                // CONTRACTING CO
                var fileObj = nlapiLoadFile(headerlogo);
                nlapiLogExecution('DEBUG', 'location', fileObj)
                var imgURLForPDF = "https://4647359.app.netsuite.com/" + fileObj.getURL();
                nlapiLogExecution('DEBUG', 'url', imgURLForPDF)
                var logoUrl = relaceCharector(imgURLForPDF);
                // if (sub_id == '1') {
                xml += '<table width="100%" style="font-size:12px;">';
                xml += '<tr>';
                xml += '<td><img src ="' + logoUrl + '" style=\"width:100%;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\"/></td>';
                xml += '</tr>';
                xml += '</table>';
                // template += "<img class=\"header\" style=\"width:60%;height:38%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"60\%\"  src = \"";
                // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile('Logo/logo_facc.png').getURL();
                // template += nlapiEscapeXML(path);
                // template += "\"></img>";
            } else if (sub_id == "16" && location == "21") {
                // CONTRACTING CO
                var fileObj = nlapiLoadFile(headerlogo);
                nlapiLogExecution('DEBUG', 'location', fileObj)
                var imgURLForPDF = "https://4647359.app.netsuite.com/" + fileObj.getURL();
                nlapiLogExecution('DEBUG', 'url', imgURLForPDF)
                var logoUrl = relaceCharector(imgURLForPDF);
                // if (sub_id == '1') {
                xml += '<table width="100%" style="font-size:12px;">';
                xml += '<tr>';
                xml += '<td><img src ="' + logoUrl + '" style=\"width:100%;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\"/></td>';
                xml += '</tr>';
                xml += '</table>';
                // template += "<img class=\"header\" style=\"width:60%;height:38%;margin-left:-47px;margin-right:-65px;margin-top:-48px;\" height=\"30\%\" width=\"60\%\"  src = \"";
                // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile('Logo/logo_facc.png').getURL();
                // template += nlapiEscapeXML(path);
                // template += "\"></img>";
            } else if (sub_id == "16" && location != "21") {
                var fileObj = nlapiLoadFile(headerlogo);
                nlapiLogExecution('DEBUG', 'location', fileObj)
                var imgURLForPDF = "https://4647359.app.netsuite.com/" + fileObj.getURL();
                nlapiLogExecution('DEBUG', 'url', imgURLForPDF)
                var logoUrl = relaceCharector(imgURLForPDF);
                // if (sub_id == '1') {
                xml += '<table width="100%" style="font-size:12px;">';
                xml += '<tr>';
                xml += '<td><img src ="' + logoUrl + '" style=\"width:100%;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\"/></td>';
                xml += '</tr>';
                xml += '</table>';
                // template += "<img class=\"header\" style=\"width:57%;height:38%;margin-left:-45px; padding-right:-1000px;margin-top:-48px;\" height=\"30\%\" width=\"95\%\"  src = \"";
                // var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
                // template += nlapiEscapeXML(path);
                // template += "\"></img>";
            } else {
                xml += "<img class=\"header\" style=\"width:57%;height:50%;margin-left:-47px; margin-right:-65px;margin-top:-48px;\" height=\"40\%\" width=\"62\%\"  src = \"https://system.eu2.netsuite.com/core/media/media.nl?id=26487&amp;c=4647359&amp;h=N7yMHyudqD68aN6yaYCarDgu-nT4u0aoi7g3lKZ708dlEsDK";
                xml += "\"></img>";
                
                // INTERNATIONAL
                // var fileObj = nlapiLoadFile(headerlogo);
                // nlapiLogExecution('DEBUG', 'location', fileObj)
                // var imgURLForPDF = "https://4647359.app.netsuite.com/" + fileObj.getURL();
                // nlapiLogExecution('DEBUG', 'url', imgURLForPDF)
                // var logoUrl = relaceCharector(imgURLForPDF);
                // // if (sub_id == '1') {
                // xml += '<table width="100%" style="font-size:12px;">';
                // xml += '<tr>';
                // xml += '<td><img src ="' + logoUrl + '" style=\"width:100%;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\"/></td>';
                // xml += '</tr>';
                // xml += '</table>';
            }

        }

        // else {
        //     //         // INTERNATIONAL
        //     //         template += "<img class=\"header\" style=\"width:708px;height:90px;margin-left:-47px; margin-right:-65px;\"  src = \"";
        //     //         var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(headerlogo).getURL();
        //     //         template += nlapiEscapeXML(path);
        //     //         template += "\"></img>";
        //     //     }

        //     // }

        //     // if (headerlogo != null) {
        //     var fileObj = nlapiLoadFile(headerlogo);

        //     nlapiLogExecution('DEBUG', 'location', fileObj)

        //     var imgURLForPDF = "https://4647359.app.netsuite.com/" + fileObj.getURL();

        //     nlapiLogExecution('DEBUG', 'url', imgURLForPDF)

        //     var logoUrl = relaceCharector(imgURLForPDF);


        //     // if (sub_id == '1') {
        //     xml += '<table width="100%" style="font-size:12px;">';

        //     xml += '<tr>';
        //     xml += '<td><img src ="' + logoUrl + '" style=\"width:100%;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\"/></td>';

        //     xml += '</tr>';
        //     xml += '</table>';
        // }

        // } else if (subsidiary == '1') {
        //     xml += '<table width="100%" style="font-size:12px;">';

        //     xml += '<tr>';
        //     xml += '<td><img src ="http://4647359-sb1.shop.netsuite.com/core/media/media.nl?id=14614&amp;c=4647359_SB1&amp;h=flaMNO15PsYKQzLVQzTzireG0thAuPI1FDrrkdJqQ3Qz8ERo" style=\"width:768px;height:90px;margin-left:-47px; margin-right:-65px;margin-top:-48px;\"/></td>';

        //     xml += '</tr>';
        //     xml += '</table>';

        // }

        var footer = '';




        // var headerlogo = timesheetRes.getFieldValue("custrecord_rent_time_subsidiary_log");
        // var footerlogotop = timesheetRes.getFieldValue("custrecord_rent_time_subsidiary_top_foot");
        // var footerlogobottom = timesheetRes.getFieldValue("custrecord_rent_time_subsidiary_footer_b");

        nlapiLogExecution('DEBUG', 'footerlogobottom----000000000', footerlogobottom);
        nlapiLogExecution('DEBUG', 'footerlogotop----000000000', footerlogotop);


        if ((sub_id == "8" && location != "8") || (sub_id == "8" && location == "8") || (sub_id == "16" && location == "21") || (sub_id == "16" && location != "21")) {

            if (footerlogobottom) {
                footer += "<img style=\"width:100%; height:100%;top:50px;margin-left:-30px;\" height=\"100\%\" width=\"100\%\"  src = \"";
                var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
                footer += nlapiEscapeXML(path);
                footer += "\"></img>";
            }
            if (footerlogotop) {
                footer += "<img style=\"top:-60px;left:510px;margin-right:-40px;width:87%; height:100%;\" height=\"100\%\" width=\"87\%\"  src = \"";
                var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogotop).getURL();
                footer += nlapiEscapeXML(path);
                footer += "\"></img>";
            }
        }
        else {
            footer += "<img style=\"width:100%; height:100%;top:55px;margin-left:-30px;\" height=\"100\%\" width=\"100\%\"  src = \"https://4647359.app.netsuite.com/core/media/media.nl?id=27033&amp;c=4647359&amp;h=7t7V0w1bVpJ2tYL94-qtyF2ivX15xGNPcCt_7TtNFBGJ6Y-8";
            footer += "\"></img>";
            footer += "<img style=\"top:-60px;left:510px;margin-right:-40px;width:87%; height:100%;\" height=\"100\%\" width=\"87\%\"  src = \"http://4647359.shop.netsuite.com/core/media/media.nl?id=9205&amp;c=4647359&amp;h=5olMItlyOwKI51uF_OmXXk5X_giZr9_C5-qCoo65YChDzLsi";
            footer += "\"></img>";
        }



        // if (footerlogobottom) {
        //     footer += "<img style=\"width:100%; height:100%;top:50px;margin-left:-30px;\" height=\"100\%\" width=\"100\%\"  src = \"";
        //     var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
        //     footer += nlapiEscapeXML(path);
        //     footer += "\"></img>";
        // }
        // if (footerlogotop) {
        //     footer += "<img style=\"top:-60px;left:510px;margin-right:-40px;width:87%; height:100%;\" height=\"100\%\" width=\"87\%\"  src = \"";
        //     var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogotop).getURL();
        //     footer += nlapiEscapeXML(path);
        //     footer += "\"></img>";
        // }




        // if (footerlogobottom) {
        //     footer += "<img style=\"width:96%; height:100%;top:95px;margin-left:-50px;\" height=\"100\%\" width=\"96\%\"  src = \"";
        //     var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogobottom).getURL();
        //     footer += nlapiEscapeXML(path);
        //     footer += "\"></img>";
        // }
        // if (footerlogotop) {
        //     footer += "<img style=\"top:-2px;left:510px;margin-right:-40px;width:87%; height:100%;\" height=\"100\%\" width=\"87\%\"  src = \"";
        //     var path = "https://7061228.app.netsuite.com" + nlapiLoadFile(footerlogotop).getURL();
        //     footer += nlapiEscapeXML(path);
        //     footer += "\"></img>";
        // }
        // footer += "<table class=\"footer\" style=\"top:-110px;left:550px;\"> ";
        // footer += "            <tr> ";
        // footer += "               <td align=\"left\" style=\"width:75%;\">&nbsp;</td> ";
        // footer += "               <td align=\"right\" style=\"font-size:10pt;\"> ";
        // footer += "                  &nbsp;";
        // footer += "( Page ";
        // footer += "                  <pagenumber/> ";
        // footer += "                  of ";
        // footer += "                  <totalpages/> ";
        // footer += "                  ) ";
        // footer += "               </td> ";
        // footer += "            </tr> ";
        // footer += "</table>";


        xml += '</macro>';
        xml += '<macro id="myfooter">';

        if (subsidiary == '8') {
            if (footerlogobottom) {

            }
        }
        xml += footer;
        xml += '</macro>';


        xml += '</macrolist>';
        xml += '</head>';
        xml += '<body style="font-family:sans-serif;" header="myheader" footer-height="8%" header-height="12%" footer="myfooter" padding="0.25in 0.25in 0.25in 0.25in" size="A4">';
        xml += template;
        xml += '</body>';

        xml += '</pdf>';
        var file = nlapiXMLToPDF(xml);
        response.setContentType('PDF', 'timesheet.pdf', 'inline');

        if (errorMsg == 1) {
            var form = nlapiCreateForm('Time Sheet Unexpected Error occurd');
            response.writePage(form);
        } else {
            response.write(file.getValue());
        }

    }
}

function relaceCharector(charVal) {
    return charVal.replace(/&/g, "&amp;");
}

function siteContactLinebreak(charVal) {
    return charVal.replace("/", "<br/>");
}

function dateConversion(tranDate) {
    tranDate = tranDate.replace("-", " ");
    tranDate = tranDate.replace("-", " ");
    return today = new Date(tranDate);
}

function correctDatesFormats(current) {
    var date_components = current.split("-");
    var month = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    };
    var current_year = date_components[2];
    var current_month = month[date_components[1].toString()];
    var current_day = date_components[0];
    if (current_day < 10) {
        current_day = "0" + current_day;
    }
    current = current_year + "/" + current_month + "/" + current_day;
    return new Date(current);
}

function dateDifferance(date1, date2) {
    var timeDiff = Math.abs(date2 - date1);
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

function date_diff_indays(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}

function removeNull(string) {
    if (string == null) {
        string = "";
    } else {
        string = string;
    }
    return string;
}

function relaceCharector(charVal) {

    if (charVal) {

        return charVal.replace(/&/g, "&amp;");

    } else {

        return "";

    }

}