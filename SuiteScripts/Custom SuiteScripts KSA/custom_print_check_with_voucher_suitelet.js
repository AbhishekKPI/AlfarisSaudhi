function printCheckFormatAction(request, response)
{	
	var recordID = request.getParameter("recID"); 	
	var check = nlapiLoadRecord('check', recordID);
	var renderer = nlapiCreateTemplateRenderer();
  	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var template = "";
	template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> ";
	template += "<pdf> ";
	template += "<head> ";
	template += "   <#if .locale == \"ru_RU\"> ";
	template += "   <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> ";
	template += "   </#if> ";	
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
	template += "</head>" ;
	template += "<body padding=\"0.5in 0.5in 0.5in 0.5in\" size=\"A4\"> ";
	template += "<div style=\"position: relative;font-family: Helvetica,sans-serif;top= -11pt;height: 250pt;width: 612pt;page-break-inside: avoid;font-size: 9pt;\"> ";
	template += "   <table style=\"position: absolute;overflow: hidden;left: 489pt;top: 8pt;height: 7pt;width: 85pt;font-size: 5pt;font-weight:500;\"> ";
	template += "      <tr> ";
	template += "         <td align=\"center\">${record.otherrefnum}</td> ";
	template += "      </tr> ";
	template += "   </table> ";
	template += "   <table style=\"position: absolute;overflow: hidden;left: 430pt;top: 20pt;height: 18pt;width: 108pt;font-weight:500;font-size:10pt\"> ";
	template += "      <tr> ";
   if(check.getFieldValue("custbody_mode_of_payment") == "1"){
     template += "<td>${record.custbody_cheque_date?string['d-MMM-yyyy']}</td> ";
   }else{
     template += "<td>${record.trandate?string['d-MMM-yyyy']}</td> ";
   }
	
	template += "      </tr> ";
	template += "   </table> ";
	template += "   <#if record.custbody_name_on_cheque?has_content> ";
	template += "   <table style=\"position: absolute;overflow: hidden;left: 45pt;top: 67pt;height: 18pt;width: 350pt;font-weight:500;font-size:10pt\"> ";
	template += "      <tr> ";
	template += "         <td>${record.custbody_name_on_cheque}</td> ";
	template += "      </tr> ";
	template += "   </table> ";
	template += "   <#else> ";
	template += "   <table style=\"position: absolute;overflow: hidden;left: 45pt;top: 67pt;height: 18pt;width: 350pt;font-weight:500;font-size:10pt\"> ";
	template += "      <tr> ";
	template += "         <td>${record.entity.altname}</td> ";
	template += "      </tr> ";
	template += "   </table> ";
	template += "   </#if> ";
	template += "   <table style=\"position: absolute;overflow: hidden;left: 440pt;top: 124pt;height: 18pt;width: 111pt;font-weight:500;font-size:10pt\"> ";
	template += "      <tr> ";
	template += "         <td>*** <#if (record.usertotal?length > 0)>${record.usertotal?string['#,##0.00']}<#else>${record.total?string['#,##0.00']}</#if></td> ";
	template += "      </tr> ";
	template += "   </table> ";
	template += "   <table style=\"position: absolute;overflow: hidden;left:20pt;top: 95pt;height: 18pt;width: 572pt;font-weight:500;font-size:10pt\"> ";
	template += "      <tr> ";
	template += "         <td>**** ${record.totalwords?capitalize} ****</td> ";
	template += "      </tr> ";
	template += "   </table> ";
	template += "</div>" ;

  	template += "<table style=\"margin-top: 78pt;width:100%;\"> ";
    template += "<tr>";
  	template += " <td style=\"width:14%;\"><b>Payee</b></td>";
  	template += "<td style=\"width:1%;\"><b>:</b></td>";
  	var new_pay_date = nlapiStringToDate(check.getFieldValue("trandate"));
  	var pay_date = new_pay_date.getDate()+"-"+monthNames[new_pay_date.getMonth()]+"-"+new_pay_date.getFullYear();
 	if(check.getFieldValue("custbody_name_on_cheque")){
   		template += "<td 	style=\"width:45%;\">"+relaceCharector(check.getFieldValue("custbody_name_on_cheque"))+"</td>";
 	}else{
   		template += "<td style=\"width:45%;\">"+relaceCharector(check.getFieldText("entity"))+"</td>";
   }
  		template += "<td style=\"width:18%;\"><b>Voucher#</b></td>";
  		template += "<td style=\"width:1%;\"><b>:</b></td>";
  		template += "<td style=\"width:21%;\">"+check.getFieldValue("tranid")+"</td>";
  		template += "</tr>";
  		template += "<tr>";
  	if(check.getFieldValue("custbody_mode_of_payment") == "1"){
        var new_che_date = nlapiStringToDate(check.getFieldValue("custbody_cheque_date"));
        var cheque_date = new_che_date.getDate()+"-"+monthNames[new_che_date.getMonth()]+"-"+new_che_date.getFullYear();
        template += "<td style=\"width:14%;\"><b>Cheque Date</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:45%;\">"+cheque_date+"</td>";
  }else{
        template += "<td style=\"width:14%;\"><b>Pay Date</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:45%;\">"+pay_date+"</td>";
  }
  if(check.getFieldValue("custbody_mode_of_payment") == "1"){
        template += "<td style=\"width:18%;\"><b>Cheque#</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:21%;\">"+check.getFieldValue("custbody_cheque_no")+"</td>";
  }else if(check.getFieldValue("custbody_mode_of_payment") == "3"){
        template += "<td style=\"width:18%;\"><b>TT#</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:21%;\">"+check.getFieldValue("custbody_tt_no")+"</td>";
  }else{
        template += "<td style=\"width:18%;\"><b>Payment Method</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:21%;\">"+check.getFieldText("custbody_mode_of_payment")+"</td>";
  }
  		template += "</tr>";
        template += "<tr>";
        template += "<td style=\"width:14%;\"><b>Currency</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:85%;\" colspan=\"3\">"+check.getFieldValue('currencysymbol')+"</td>";
    	template += "</tr>";
   		template += "<tr>";
        template += "<td style=\"width:14%;\"><b>Account</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:85%;\" colspan=\"3\">"+relaceCharector(check.getFieldText('account'))+"</td>";
    	template += "</tr>";
  	if(check.getFieldValue("memo")){
    	template += "<tr>";
        template += "<td style=\"width:14%;\"><b>Remarks</b></td>";
        template += "<td style=\"width:1%;\"><b>:</b></td>";
        template += "<td style=\"width:85%;\" colspan=\"5\">"+relaceCharector(check.getFieldValue("memo"))+"</td>";
    	template += "</tr>";
  	}
		template += "</table>" ;
	
	template += "<p style=\"font-weight:bold;font-size:12px; font-family: sans-serif;\">Expenses</p> ";
  	var expLineCnt = check.getLineItemCount("expense");
  	var emp_count = 0;
  	for(var j=0 ; j<expLineCnt ; j++){
    var employee = check.getLineItemValue("expense", "custcol_employee", (j+1));
    if(employee){
      emp_count = parseInt(emp_count + 1);
    }
  	}
  template += "<table  style=\"width: 100%; margin-top: 8px;border:solid 1px #000000;\"> ";
	template += "   <thead> ";
	template += "      <tr> ";
	template += "         <td colspan=\"6\" style=\"border-right:solid 1px #000000;\"><b>Account</b></td> ";
	template += "         <td colspan=\"6\"  style=\"border-right:solid 1px #000000;\"><b>Memo</b></td> ";
    if(emp_count > 0){
     template += "        <td colspan=\"4\"  style=\"border-right:solid 1px #000000;\"><b>Employee</b></td> ";
     }
	template += "         <td  align=\"right\" colspan=\"2\"><b>Amount</b></td> ";
	template += "      </tr> ";
	template += "   </thead> ";	
	
	
	for(var i=0;i<expLineCnt;i++){
		template += "   <tr> ";
		template += "      <td  colspan=\"6\" line-height=\"150%\" style=\"border-top:solid 1px #000000;border-right:solid 1px #000000;\">"+relaceCharector(check.getLineItemText("expense", "account", (i+1)))+"</td> ";
        if(check.getLineItemValue("expense", "memo", (i+1))){
          template += "      <td colspan=\"6\" style=\"border-top:solid 1px #000000;border-right:solid 1px #000000;\">"+relaceCharector(check.getLineItemValue("expense", "memo", (i+1)))+"</td> ";
        }else{
          template += "      <td colspan=\"6\" style=\"border-top:solid 1px #000000;border-right:solid 1px #000000;\">&nbsp;</td> ";
        }
		if(emp_count > 0){
        template += "      <td colspan=\"4\" style=\"border-top:solid 1px #000000;border-right:solid 1px #000000;\">"+check.getLineItemText("expense", "custcol_employee", (i+1))+"</td> ";
        }
		template += "      <td align=\"right\" colspan=\"2\" style=\"border-top:solid 1px #000000;\">"+numberWithCommas(check.getLineItemValue("expense", "amount", (i+1)))+"</td> ";
		template += "   </tr> ";
	}
	
	template += "</table>" ;
	
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
	template += "</table>" ;	
	
	template += "   </body> ";
	template += "</pdf>" ;
	renderer.setTemplate(template);
	renderer.addRecord('record', check);
	var xml = renderer.renderToString();
	var file = nlapiXMLToPDF(xml);
	response.setContentType('PDF', 'Check'+check.getFieldValue('id')+'.pdf', 'inline');
	response.write(file.getValue());
}
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function relaceCharector(charVal) {
    return charVal.replace(/&/g, "&amp;");
}