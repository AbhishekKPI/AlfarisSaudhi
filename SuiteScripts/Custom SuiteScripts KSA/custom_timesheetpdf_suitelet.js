function timesheetPdfGeneration(request, response) {
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
        var timesheetRes = nlapiLoadRecord("customrecord_time_sheet_header", timesheetInternalID);
        var timesheetCustomer = timesheetRes.getFieldValue("custrecord_timesheet_customer");
        var timesheetOperator = timesheetRes.getFieldValue("custrecord_helper_or_operator");
        var entityid = '';
        var firstname = '';

        if (timesheetOperator) {
            var operrec = nlapiLoadRecord('employee', timesheetOperator);
            var entityid = operrec.getFieldValue('entityid');
            var firstname = operrec.getFieldValue('firstname');
            firstname = relaceCharector(firstname);
        }
        var NreplacedCust = '';
        if (timesheetCustomer) {
            var NreplacedCust = relaceCharector(timesheetCustomer); //.substring(1);
        }
        /*var NresourceName = '';
        if(timesheetRes.getFieldValue("custrecord_timesheet_resource")){
        	var Nresource = relaceCharector(timesheetRes.getFieldValue("custrecord_timesheet_resource"));
            var Nresource = Nresource.split(" ");
            var NresourceName = Nresource[0];
        } */

        var NregistrationNo = '';
        if (timesheetRes.getFieldValue("custrecord_register_number")) {
            var NregistrationNo = relaceCharector(timesheetRes.getFieldValue("custrecord_register_number"));
        }
        var NsalesOrder = '';
        if (timesheetRes.getFieldValue("custrecord_timesheet_salesorder")) {
            var NsalesOrder = relaceCharector(timesheetRes.getFieldValue("custrecord_timesheet_salesorder"));
        }
        var Nsubsidiary = '';
        if (timesheetRes.getFieldValue("custrecord_timesheet_subsidiary")) {
            var Nsubsidiary = relaceCharector(timesheetRes.getFieldValue("custrecord_timesheet_subsidiary"));
        }
        var NetsNo = '';
        if (timesheetRes.getFieldValue("custrecord_custom_ets_no")) {
            var NetsNo = relaceCharector(timesheetRes.getFieldValue("custrecord_custom_ets_no"));
        }
        var NID = '';
        if (timesheetRes.getFieldValue("name")) {
            var NID = relaceCharector(timesheetRes.getFieldValue("name"));
        }
        if (isaditionalts == 'gen') {
            var timesheetfilter = ["internalid", "anyof", request.getParameter("tsid")];
            var timesheetres = nlapiSearchRecord('customrecord_time_sheet_header', 'customsearchtimesheetexist', timesheetfilter);

            var filter = ["internalid", "anyof", param];
            var resOut = nlapiSearchRecord('resourceallocation', 'customsearch_resource_details_subtab', filter);

            if (timesheetres) {
                var startdate = '';
                for (var i = 0; i < 1; i++) {
                    if (printPar == '1') {
                        timesheetID = request.getParameter("tsid");

                        var startdate = timesheetres[i].getValue("custrecord_timesheet_start_date");
                        var enddate = timesheetres[i].getValue("custrecord_timesheet_enddate");

                        var date1 = nlapiStringToDate(startdate);
                        var date2 = nlapiStringToDate(enddate);

                        var datediff = date_diff_indays(date1, date2);

                        lnCnt = datediff + 1;

                    } else {
                        var tsenddate = nlapiStringToDate(timesheetres[i].getValue("custrecord_timesheet_enddate")); // dateConversion(timesheetres[i].getValue("custrecord_timesheet_enddate"));
                        nlapiAddDays(tsenddate, 1);
                        // var newdate = tsenddate; // new Date(tsenddate);		
                        //newdate.setDate(newdate.getDate() + 1);
                        // var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        tsenddate = nlapiAddDays(tsenddate, 1); //newdate.getDate() + "-" + monthNames[newdate.getMonth()] + "-" + newdate.getFullYear();

                        var rsenddate = resOut[0].getValue("enddate", null, "min");

                        var date1 = nlapiStringToDate(timesheetres[i].getValue("custrecord_timesheet_enddate")); //correctDatesFormats(timesheetres[i].getValue("custrecord_timesheet_enddate"));
                        var date2 = nlapiStringToDate(rsenddate); //correctDatesFormats(rsenddate);

                        var datediff = date_diff_indays(date1, date2);


                        if (datediff < 32) {
                            lnCnt = datediff;
                            enddate = rsenddate;
                        } else {
                            lnCnt = 32;
                            //var newdate = new Date(date1);
                            // newdate.setDate(newdate.getDate() + 15);
                            // var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            enddate = nlapiAddDays(date1, 32); //newdate.getDate() + "-" + monthNames[newdate.getMonth()] + "-" + newdate.getFullYear();

                        }
                        date1 = tsenddate; //correctDatesFormats(tsenddate);

                        var subsi = timesheetres[i].getValue("custrecord_timesheet_subsidiary");
                        var etsNoAuto = '';
                        var timesheetfilter = ["custrecord_timesheet_subsidiary", "is", subsi];
                        var subRes = nlapiSearchRecord('customrecord_time_sheet_header', 'customsearch_etsnumber_generation_search', timesheetfilter);
                        if (subRes["0"].getValue("custrecord_custom_ets_no", null, "max") == "") {
                            etsNoAuto = 1;
                        } else {
                            etsNoAuto = (parseInt(subRes["0"].getValue("custrecord_custom_ets_no", null, "max")) + parseInt(1));
                        }
                        if (datediff == 0) {
                            /*var errMsg = "Resource alocation date is not valid";
                            template += '<table style="width:100%;">';
                            template += '<tr>';
                            template += '<td align="center">'+datediff+'-'+tsenddate+'-'+enddate+'</td>';
                            template += '</tr>';						
                            template += '</table>';*/
                            // Error Message Code Here	
                            errorMsg = 1;
                        } else {
                            var timesheet = nlapiCreateRecord('customrecord_time_sheet_header', {
                                recordmode: 'dynamic'
                            });
                            timesheet.setFieldValue("custrecord_timesheet_start_date", tsenddate);
                            timesheet.setFieldValue("custrecord_timesheet_enddate", enddate);
                            timesheet.setFieldValue("custrecord_register_number", timesheetres[i].getValue("custrecord_register_number"));
                            timesheet.setFieldValue("custrecord_timesheet_customer", timesheetres[i].getValue("custrecord_timesheet_customer"));
                            timesheet.setFieldValue("custrecord_timesheet_resource", timesheetres[i].getValue("custrecord_timesheet_resource"));
                            timesheet.setFieldValue("custrecord_minimum_hrs_timesheet", timesheetres[i].getValue("custrecord_minimum_hrs_timesheet"));
                            timesheet.setFieldValue("custrecord_minimum_days_timesheet", timesheetres[i].getValue("custrecord_minimum_days_timesheet"));
                            timesheet.setFieldValue("custrecord_timesheet_item", timesheetres[i].getValue("custrecord_timesheet_item"));
                            timesheet.setFieldValue("custrecord_timesheet_itemrate", timesheetres[i].getValue("custrecord_timesheet_itemrate"));
                            timesheet.setFieldValue("custrecord_timesheet_salesorder", timesheetres[i].getValue("custrecord_timesheet_salesorder"));
                            timesheet.setFieldValue("custrecord_timesheet_subsidiary", timesheetres[i].getValue("custrecord_timesheet_subsidiary"));
                            timesheet.setFieldValue("custrecord_timesheet_item_unit", timesheetres[i].getValue("custrecord_timesheet_item_unit"));
                            timesheet.setFieldValue("custrecord_timesheet_ra_id", timesheetres[i].getValue("custrecord_timesheet_ra_id"));
                            timesheet.setFieldValue("custrecord_item_id_hdnref", timesheetres[i].getValue("custrecord_item_id_hdnref"));
                            timesheet.setFieldValue("custrecord_custom_ets_no", etsNoAuto);
                            timesheet.setFieldValue("custrecord_custom_projectid_ts", timesheetres[i].getValue("custrecord_custom_projectid_ts"));
                            timesheetID = nlapiSubmitRecord(timesheet);
                        }

                    }
                    var soitemdes = '';
                    if (resOut[0].getValue("custevent_so_item_description", null, "min")) {
                        soitemdes = resOut[0].getValue("custevent_so_item_description", null, "min");
                    } else {
                        soitemdes = resOut[0].getValue("memo", "CUSTEVENT_PROJECT_SALESORDER", "min");
                    }
                    var custname = resOut[0].getValue("custentity_customer_name", "customer", "min");
                    /*var str = custname;
                    var res = str.split(":");
                    if(res.length > 1){
                    	custname = res[0];
                    }else{
                    	custname = str;
                    }*/
                    var prefix = '';
                    var sitecontact = '';
                    if (resOut[0].getValue("custbody_site_contact", "CUSTEVENT_PROJECT_SALESORDER", "min")) {
                        sitecontact = relaceCharector(resOut[0].getValue("custbody_site_contact", "CUSTEVENT_PROJECT_SALESORDER", "min"));
                    }

                    templateHeader += '<h4 style="width:100%;font-style:normal;text-decoration: underline;text-align:center;">TRIP/TIME SHEET</h4>';
                    templateHeader += '<table style="width:100%;font-size:12px;">';

                    templateHeader += '<tr>';
                    templateHeader += '<td style="width:36%;"><b>Customer</b></td>';
                    templateHeader += '<td style="width:4%;"><b>:</b></td>';
                    templateHeader += '<td colspan="4" style="width:60%;">' + relaceCharector(custname) + '</td>';
                    templateHeader += '</tr>';

                    var NsalesOrderRepl = NsalesOrder.replace("Sales Order #", "");
                    var NQtno = relaceCharector(resOut[0].getValue("createdfrom", "CUSTEVENT_PROJECT_SALESORDER", "min"))
                    var NQtnoRepl = NQtno.replace("Quote #", "");

                    templateHeader += '<tr>';
                    templateHeader += '<td style="width:36%;"><b>Time sheet#</b></td>';
                    templateHeader += '<td style="width:4%;"><b>:</b></td>';
                    templateHeader += '<td style="width:60%;">' + NetsNo + '</td>';
                    templateHeader += '<td style="width:36%;"><b>Ref #</b></td>';
                    templateHeader += '<td style="width:4%;"><b>:</b></td>';
                    templateHeader += '<td style="width:60%;">' + NQtnoRepl + ', ' + NsalesOrderRepl + '</td>';
                    templateHeader += '</tr>';
                    var NresourceName = resOut[0].getValue("entityid", "vendor", "min");
                    var Nrescode = resOut[0].getValue("custevent_res_code", null, "min");
                    templateHeader += '<tr>';
                    templateHeader += '<td style="width:36%;"><b>Eqpt Capacity</b></td>';
                    templateHeader += '<td style="width:4%;"><b>:</b></td>';
                    templateHeader += '<td style="width:60%;">' + resOut[0].getValue("custevent_so_item_description", null, "min") + '</td>';
                    templateHeader += '<td style="width:36%;"><b>Resource</b></td>';
                    templateHeader += '<td style="width:4%;"><b>:</b></td>';
                    if (Nrescode) {
                        templateHeader += '<td style="width:60%;">' + Nrescode + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Reg#</b> : ' + NregistrationNo + '</td>';
                    } else {
                        templateHeader += '<td style="width:60%;">' + NresourceName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Reg#</b> : ' + NregistrationNo + '</td>';
                    }

                    templateHeader += '</tr>';

                    templateHeader += '<tr>';
                    templateHeader += '<td style="width:36%;"><b>Site Contact</b></td>';
                    templateHeader += '<td style="width:4%;"><b>:</b></td>';
                    templateHeader += '<td colspan="3" style="width:60%;">' + sitecontact + '</td>';
                    templateHeader += '</tr>';
                    templateHeader += '</table>';


                    templateFooter += '<table style="width:100%;font-size:10px;">';
                    //templateFooter += '<tr style="font-size:10px;"><td  style="height:20px;border-left: 1px solid #000;border-bottom: 1px solid #000;">&nbsp;&bull;&nbsp;Hire of all cranes and Equipment is subject to<br/>&nbsp;&nbsp;&nbsp;our standard terms and conditions printed overleaf.<br/>&nbsp;&bull;&nbsp;I agree to the above per hour/trip as per agreement</td><td style="border-right: 1px solid #000;border-bottom: 1px solid #000;">&nbsp;</td></tr>';
                    //templateFooter += '<tr><td colspan="2" style="height:20px;border-bottom: 1px solid #000;border-left: 1px solid #000;border-right: 1px solid #000;color:#000000;">أوافق على ما سبق في العقد في السا رحلة  وفق الاتفاق</td></tr>';
                    templateFooter += '<tr><td  style="height:20px;border-left: 1px solid #000;border-right: 1px solid #000;"><b>SITE / JOB DETAILS</b></td><td style="border-right: 1px solid #000;"><b>REMARKS IF ANY</b></td></tr>';
                    var rec = nlapiLoadRecord("customrecord_time_sheet_header", timesheetID);
                    var remarks = rec.getFieldValue("custrecord_timesheet_remarks");
                    if (remarks) {
                        remarks = remarks;
                    } else {
                        remarks = '';
                    }

                    templateFooter += '<tr><td style="border-left: 1px solid #000;border-right: 1px solid #000;border-bottom: 1px solid #000;">' + relaceCharector(timesheetres[0].getValue("custrecord_timesheet_sitedetails")) + '</td><td style="border-right: 1px solid #000;border-bottom: 1px solid #000;">' + relaceCharector(remarks) + '</td></tr>';
                    templateFooter += '<tr><td style="height:20px;border-left: 1px solid #000;border-right: 1px solid #000;">&nbsp;</td><td style="border-right: 1px solid #000;">&nbsp;</td></tr>';
                    //templateFooter += '<tr><td style="border-right: 1px solid #000;">&nbsp;</td><td>&nbsp;</td></tr>';
                    //	template += '<tr><td style="border-right: 1px solid #000;">&nbsp;</td><td>&nbsp;</td></tr>';
                    templateFooter += '<tr><td  style="border-left: 1px solid #000;border-right: 1px solid #000;" align="center">&nbsp;</td><td  align="center" style="border-right: 1px solid #000;">&nbsp;</td></tr>';
                    templateFooter += '<tr><td  style="border-bottom: 1px solid #000;border-left: 1px solid #000;border-right: 1px solid #000;" align="center"><b>SIGNATURE OF OPERATIONS</b></td><td  align="center" style="border-right: 1px solid #000;border-bottom: 1px solid #000;"><b>SIGNATURE OF CUSTOMER</b></td></tr>';
                    templateFooter += '</table>';

                    template += templateHeader;

                    template += '<table style="width:100%;font-size:9px;">';
                    template += '<tr>';
                    template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:90px;font-weight:bold;font-size:9px;padding:3px;">Date</td>';
                    template += '<td colspan="1" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:140px;font-weight:bold;font-size:9px;padding:3px;">Driver / Operator</td>';
                    template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:70px;font-weight:bold;font-size:9px;padding:3px;">From</td>';
                    template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:70px;font-weight:bold;font-size:9px;padding:3px;">To</td>';
                    template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:70px;font-weight:bold;font-size:9px;padding:3px;">Break</td>';
                    template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:70px;font-weight:bold;font-size:9px;padding:3px;">Total Hrs</td>';
                    template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:9px;padding:3px;">Remarks</td>';
                    template += '</tr>';
                    template += '</table>';
                    var pagebrk = 0;
                    var pagecnt = 1;
                    for (var kk = 0; kk < lnCnt; kk++) {
                        pagebrk++;

                        var newdate = date1; //new Date(date1);
                        // newdate.setDate(newdate.getDate() + (kk));
                        // var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        var stdate = nlapiAddDays(newdate, kk); //newdate.getDate() + '-' + monthNames[newdate.getMonth()] + '-' + newdate.getFullYear();

                        if (pagebrk == 32) {
                            var hei = '';
                            /* if (pagecnt != 1) {
                                 var hei = '115px;';
                             } else {
                                 var hei = '25px;';
                             }
                             if (letterhead == 'T') {
                                 var hei = '40px;';
                             }*/
                            template += templateFooter;
                            template += templateHeader;
                            template += '<table style="width:100%; font-size:9px;">';
                            template += '<tr><td style="height:' + hei + '" colspan="7"></td></tr>';
                            template += '<tr>';
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:90px;font-weight:bold;font-size:10px;padding:3px;">Date</td>';
                            template += '<td colspan="1" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:140px;font-weight:bold;font-size:10px;padding:3px;">Driver / Operator</td>';
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:70px;font-weight:bold;font-size:10px;padding:3px;">From</td>';
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:70px;font-weight:bold;font-size:10px;padding:3px;">To</td>';
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:65px;width:70px;font-weight:bold;font-size:10px;padding:3px;">Break</td>';
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;width:65px;width:70px;font-weight:bold;font-size:10px;padding:3px;">Total Hrs</td>';
                            template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:10px;padding:3px;">Remarks</td>';
                            template += '</tr>';
                            template += '</table>';

                            pagebrk = 0;
                            pagecnt++;

                        }

                        template += '<table style="width:100%;font-size:9px;">';
                        template += '<tr>';
                        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        stdate = stdate.getDate() + "-" + monthNames[stdate.getMonth()] + "-" + stdate.getFullYear();

                        template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:90px;padding:3px;">' + stdate + '</td>';
                        if (kk == 0) {
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:140px;padding:3px;">' + entityid + ' ' + splitFirstWord(firstname) + '</td>';
                        } else {
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:140px;padding:3px;"><br/></td>';
                        }
                        template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;padding:3px;"><br/></td>';
                        template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;padding:3px;"><br/></td>';
                        template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;padding:3px;"><br/></td>';
                        template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;padding:3px;"><br/></td>';
                        template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;padding:3px;"><br/></td>';
                        template += '</tr>';
                        template += '</table>';

                    }


                    if (lnCnt < 31) {
                        var dif = 31 - lnCnt;
                        for (var ex = 0; ex < dif; ex++) {
                            template += '<table style="width:100%;font-size:10px;">';
                            template += '<tr>';
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:90px;padding:3px;"><br/></td>';

                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:140px;padding:3px;"><br/></td>';

                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;padding:3px;"><br/></td>';
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;padding:3px;"><br/></td>';
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;padding:3px;"><br/></td>';
                            template += '<td style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;width:70px;padding:3px;"><br/></td>';
                            template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;padding:3px;"><br/></td>';
                            template += '</tr>';
                            template += '</table>';
                        }

                    }

                    template += templateFooter;

                }

            }
        }

        var xml = '<?xml version="1.0"?><!DOCTYPE html PUBLIC "-//big.faceless.org//report" "report-1.1.dtd" [<!ENTITY nbsp "&#160;">] >'; // start of template
        xml += '<pdf>';
        xml += '<head>';
        xml += '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=windows-1256"/>';
        xml += '<style type="textcss">td p { ';
        xml += 'align: left; }';
        xml += '</style>';
        xml += '<macrolist>';
        xml += '<macro id="myheader">';
        var footer = '';
        if (subsidiary) {
            var filter = ["namenohierarchy", "is", subsidiary];
            var subsRes = nlapiSearchRecord("subsidiary", "customsearch_sub_internal_id", filter);
            var subsinternalID = subsRes[0].getValue("internalid");
        }

        var salesId = rec.getFieldValue("custrecord_sales_order");
        var salesRec = nlapiLoadRecord("salesorder", salesId);
        if (salesRec) {
            var location = salesRec.getFieldValue("location");

        }


        // if (letterhead == 'T') {
        //     //footer += '<table style="width: 100%;"><tr><td style="font-size:10px;font-weight:bold;" align="right">Page ( <pagenumber/> of <totalpages/> ) </td></tr></table>';

        // } else {
        
            if (subsinternalID == '2') {
                xml += '<table class="header" style="width: 100%; margin-left:-40px;margin-top :-10px;"><tr>';
                xml += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9196&amp;c=4647359&amp;h=215721097cda3e1e1ad8" style="width:800px; height:120px;" /></td>';
                xml += '</tr>';
                xml += '</table>';
            }
            if (subsinternalID == '8' && location == '8') {
                xml += '<table class="header" style="width: 100%; margin-left:-14px;margin-top :-10px;"><tr>';
                //xml += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14614&amp;c=4647359&amp;h=706874f46a19b489dcee" style="width:760px; height:120px;" /></td>';
                xml += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7" style="width:760px; height:120px;" /></td>';  
                xml += '</tr>';                             //id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7
                xml += '</table>';
                //footer += '<table style="width: 100%;"><tr><td style="font-size:10px;font-weight:bold;" align="right">Page ( <pagenumber/> of <totalpages/> ) </td></tr></table>';
            }

            if (subsinternalID == '8' && location != '8') {
                xml += '<table class="header" style="width: 100%; margin-left:-14px;margin-top :-10px;"><tr>';
                //xml += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14614&amp;c=4647359&amp;h=706874f46a19b489dcee" style="width:760px; height:120px;" /></td>';
                xml += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26488&amp;c=4647359&amp;h=6Uxc0nbUkUIpXGHsPLniGwEfM-PfsyucvPJwV0Vhus-USYG_" style="width:760px; height:120px;" /></td>';  
                xml += '</tr>';                             //id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7
                xml += '</table>';
            }
        
        // }
        xml += '</macro>';
        xml += '<macro id="nlfooter">';
        // xml += footer;
        if (letterhead == 'T') {
            xml += footer;
        } else {
            if (subsinternalID == '8') {
                xml += ' <table class="footer" border="0" ';
                xml += '       style="width: 100%; margin-left:-10px;margin-top :4px;background-color:#000;">';
                xml += '       <tr>';
                xml += '         <td>';
                xml += '       <img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14615&amp;c=4647359&amp;h=ae717ee9182515bf331e" style="width:750px;height:40%;"/>';

                xml += '        </td>';
                xml += '      </tr>';
                xml += '   </table>';
                xml += '<div style="position:relative;top:-108px;bottom:-92px;left:540px;">';
                xml += '  <img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9205&amp;c=4647359&amp;h=7003b6a4832399179079" style="width:100%;height:106%;"/>';
                xml += '</div> ';

            } else {
                xml += ' <table class="footer" border="0" ';
                xml += '       style="width: 100%; margin-left:-10px;margin-top :-10px;;background-color:#000;">';
                xml += '       <tr>';
                xml += '         <td>';
                xml += '       <img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9210&amp;c=4647359&amp;h=e6070c9cd462193b9b95" style="width:750px;height:40%;"/>';

                xml += '        </td>';
                xml += '      </tr>';
                xml += '   </table>';
                xml += '    <div style="position:relative;top:-100px;bottom:-92px;left:520px;">';
                xml += '      <img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9205&amp;c=4647359&amp;h=7003b6a4832399179079" style="width:90%;height:90%;"/>';
                xml += '   </div> ';
            }


        }

        xml += '</macro>';
        xml += '</macrolist>';
        xml += '</head>';
        //xml += '<body style="font-family:sans-serif;" header="myheader" footer-height="9%" header-height="10%" padding="0.1in 0.1in 0.3in 0.1in" footer="myfooter" size="A4">';
        xml += '<body style="font-family:sans-serif;" header="myheader" header-height="13%" footer-height="5%"  footer="nlfooter" padding="0in 0.1in 0in 0.1in" size="A4">';

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

function splitFirstWord(words) {
    var firstword = words.split(" ");
    return firstword[0];
}