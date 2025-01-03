function makeDepositAction(request,response){
  var resourceID = request.getParameter("raid");	
  var recID = request.getParameter("recID");
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var res = nlapiLoadRecord("deposit", recID);
  var subsidiary = res.getFieldValue('subsidiary');
  var location = res.getFieldValue('location');
  var dep_no = res.getFieldValue('tranid');
  var account = res.getFieldText('account');
  var amount = res.getFieldValue('total');
  var cur = res.getFieldText('currency');
  var docRef = res.getFieldValue("custbody_customer_doc_ref_no");
  
  var tranDate = nlapiStringToDate(res.getFieldValue('trandate'));
  var tDate = tranDate.getDate()+"-"+monthNames[tranDate.getMonth()]+"-"+tranDate.getFullYear();
  
  var memo = res.getFieldValue('memo');
  var pay_method = res.getFieldText('custbody_payment_method');
  var paycount = res.getLineItemCount("payment");
  var depcount = res.getLineItemCount("other");
  var cashcount = res.getLineItemCount("cashback");
  var cash_total = 0;
  var pay_total = 0;
  var dep_total = 0;
  var template = '';
  template += '<table style="width:100%;">';
	template += '<tr>';
	template += '<td align="center" style="font-size:14px;font-weight:bold;text-decoration: underline;">Deposit</td>';
	template += '</tr>';
	template += '</table>';
  
  template += '<table style="width:100%; font-size:12px;">';
		template += '<tr>';
		template += '<td style="width:25%;font-weight:bold;">Deposit #</td><td>:</td><td style="width:34%">'+dep_no+'</td>';
  template += '<td style="width:15%;font-weight:bold;">Date</td><td>:</td><td style="width:34%">'+tDate+'</td>';
		template += '</tr>';
		template += '<tr>';
		template += '<td style="width:25%;font-weight:bold;">Amount</td><td>:</td><td style="width:34%">'+amount+'</td>';
		template += '<td style="width:15%;font-weight:bold;">Currency</td><td>:</td><td style="width:34%">'+cur+'</td>';
		template += '</tr>';
		template += '<tr>';
         template += '<td style="width:25%;font-weight:bold;">Payment Method</td><td>:</td><td style="width:34%">'+pay_method+'</td>';
  if(memo == null){
    template += '<td style="width:15%;font-weight:bold;">Memo</td><td>:</td><td style="width:34%"></td>';
  }else{
    template += '<td style="width:15%;font-weight:bold;">Memo</td><td>:</td><td style="width:34%">'+relaceCharector(memo)+'</td>';
  }
		template += '</tr>';
  template += '<tr>';
  template += '<td style="width:25%;font-weight:bold;">Account</td><td>:</td><td style="width:34%">'+relaceCharector(account)+'</td>';
  template += '</tr>';
		template += '</table>';
     
    template += '<table style="font-size:12px;font-weight:bold;"><tr><td>&nbsp;</td></tr><tr><td>Payment Details</td></tr></table>';

  template += '<table style="width:100%;font-size:12px;">';
		template += '<tr>';
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Date</td>';
		template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Doc #</td>';
     template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Payment Method</td>';
  template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Memo</td>';
		template += '<td colspan="5" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;border-right:solid 1px #ccc;">Amount</td>';
		template += '</tr>';
     var pay_amount = 0;
    var pay_total = 0;
    var pa = 1;
    for(var j=1;j<=paycount;j++){
      var pay_dep = res.getLineItemValue("payment", "deposit", j);
      if(pay_dep == "T"){
      var doc_date = nlapiStringToDate(res.getLineItemValue("payment","docdate", pa));
      var docum_date = doc_date.getDate()+"-"+monthNames[doc_date.getMonth()]+"-"+doc_date.getFullYear();  
      var ref = res.getLineItemValue('payment','docnumber',pa);
      var pay_meth = res.getLineItemText("payment", "paymentmethod", pa);
      var memo_1 = res.getLineItemValue("payment", "memo", pa);
      var amt_1 = res.getLineItemValue("payment", "paymentamount", pa);
      
      template += '<tr>';
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+docum_date+'</td>';
      template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+ref+'</td>';
		template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+pay_meth+'</td>';
        if(memo_1 == null){
        template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;"></td>';
        }else{
         template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(memo_1)+'</td>';
        }
		template += '<td colspan="5" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">'+amt_1+'</td>';
      template += '</tr>';
      pa++;
        pay_amount = parseFloat(amt_1);
      pay_total += parseFloat(pay_amount);
      }
    }
  template += '<tr><td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;">Total</td><td colspan="16" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan="2" style="border-bottom:solid 1px #ccc;font-weight:bold;">'+cur+'</td><td colspan = "5" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;">'+numberWithCommas(pay_total.toFixed(2))+'</td></tr>';
    template += '</table>';
  
  if(depcount >= 1){
    template += '<table style="font-size:12px;font-weight:bold;"><tr><td>&nbsp;</td></tr><tr><td>Other Deposits</td></tr></table>';
    var emp_count = 0;
  for(var m = 0;m <depcount ;m++){
     var employee = res.getLineItemValue("other", "entity", (m+1));
    if(employee){
      emp_count = parseInt(emp_count + 1);
    }
  }
  template += '<table style="width:100%;font-size:12px;">';
		template += '<tr>';
        if(emp_count > 0){
        template += '<td colspan ="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Name</td>';
        }
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Account</td>';
		template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Payment Method</td>';
  template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Memo</td>';
		template += '<td colspan="5" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;border-right:solid 1px #ccc;">Amount</td>';
		template += '</tr>';
  var dep_amount = 0;
    var dep_total = 0;
    var od = 1;
    
    for(var i=0;i<depcount;i++){
      var account_name = res.getLineItemText("other", "account", od);
      var pay = res.getLineItemText("other", "paymentmethod", od);
      var memo = res.getLineItemValue("other", "memo", od);
      var amt = res.getLineItemValue("other", "amount", od);
      
      template += '<tr>';
        if(emp_count >0){
          var depname =  res.getLineItemText("other", "entity", od);
          template += '<td colspan ="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(depname)+'</td>';
        }
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(account_name)+'</td>';
		template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+pay+'</td>';
      if(memo == null){
        template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;"></td>';
      }else{
        template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(memo)+'</td>';
      }
		template += '<td colspan="5" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">'+amt+'</td>';
      template += '</tr>';
      od++;
      dep_amount = parseFloat(amt);
      dep_total += parseFloat(dep_amount);
    }
    if(emp_count > 0){
       template += '<tr><td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;">Total</td><td colspan="16" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan="2" style="border-bottom:solid 1px #ccc;font-weight:bold;">'+cur+'</td><td colspan = "5" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;">'+numberWithCommas(dep_total.toFixed(2))+'</td></tr>';
    }else{
      template += '<tr><td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;">Total</td><td colspan="12" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan="2" style="border-bottom:solid 1px #ccc;font-weight:bold;">'+cur+'</td><td colspan = "5" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;">'+numberWithCommas(dep_total.toFixed(2))+'</td></tr>';
    }
    template += '</table>';
  }
  if(cashcount >= 1){
    template += '<table style="font-size:12px;font-weight:bold;"><tr><td>&nbsp;</td></tr><tr><td>Cash Back Details</td></tr></table>';
  
  
  template += '<table style="width:100%;font-size:12px;">';
		template += '<tr>';
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Account</td>';
  template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Memo</td>';
		template += '<td colspan="5" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;border-right:solid 1px #ccc;">Amount</td>';
		template += '</tr>';
  var cash_amount = 0;
    var cash_total = 0;
    
    var cb = 1;
    for(var k=0;k<cashcount;k++){
      var account = res.getLineItemText("cashback", "account", cb);
      var memo_2 = res.getLineItemValue("cashback", "memo", cb);
      var amt_2 = res.getLineItemValue("cashback", "amount", cb);
      
      template += '<tr>';
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(account)+'</td>';
      if(memo_2 == null){
        template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;"></td>';
      }else{
        template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(memo_2)+'</td>';
      }
		template += '<td colspan="5" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">'+amt_2+'</td>';
      template += '</tr>';
      cb++;
      cash_amount = parseFloat(amt_2);
      cash_total = parseFloat(cash_total + cash_amount);
    }
    template += '<tr><td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;">Total</td><td colspan="8" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan="2" style="border-bottom:solid 1px #ccc;font-weight:bold;">'+cur+'</td><td colspan = "5" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;">'+numberWithCommas(cash_total.toFixed(2))+'</td></tr>';
    template += '</table>';
  }
  template += '<table style="width :100%;">';
    template +='<tr><td>&nbsp;</td></tr>';
    template += '<tr><td style="font-size:12px;font-weight:bold;border-bottom:solid 0.2px #e3e3e3;border-top:solid 0.2px #e3e3e3;"><b>Total Amount</b></td><td style="border-bottom:solid 0.2px #e3e3e3;border-top:solid 0.2px #e3e3e3;">&nbsp;</td><td align="right" style="font-size:12px;font-weight:bold;border-bottom:solid 0.2px #e3e3e3;border-top:solid 0.2px #e3e3e3;">'+numberWithCommas((parseFloat(pay_total)+parseFloat(dep_total)-parseFloat(cash_total)).toFixed(2))+'</td></tr>';
  template +='</table>';
  
	var xml = '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd" [<!ENTITY nbsp "&#160;">] >';
	xml += '<pdf>';
	xml += '<head>'; 
	xml += '<style>td p { align:left; }</style>';
	xml += '<macrolist>';
	xml += '<macro id="nlheader">';
	if(subsidiary == 1){
  xml += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-60px; margin-right:-40px;"><tr>';
  xml += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26487&amp;c=4647359&amp;h=N7yMHyudqD68aN6yaYCarDgu-nT4u0aoi7g3lKZ708dlEsDK" style="width:760px; height:120px;" /></td>';
  xml += '</tr></table>';
	}
  if(subsidiary == 11){
    xml += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-60px; margin-right:-40px;"><tr>';
    xml += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26937&amp;c=4647359&amp;h=ZxOm5iwM9lPCaL2O5i19J6klbng6EfwWNN29D6p5dCs4NgZB" style="width:760px; height:120px;" /></td>';
    xml += '</tr></table>';
  }
  if(subsidiary == 2){
	xml += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-60px; margin-right:-40px;"><tr>';
  xml += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26489&amp;c=4647359&amp;h=8jLOJuWgAnB4EXpAfSKtQfxbGPoNlcPY1buLTrUncQpcjvHG" style="width:760px; height:120px;" /></td>';
  xml += '</tr>';
  xml += '</table>';
	}	
   if(subsidiary == 8 && location == 8){
  xml += '<table class="header" style="width: 100%; margin-top:-50px;margin-left:-52px;"><tr>';
  xml += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7" style="width:768px; height:140px;" /></td>';
  xml += '</tr>';
  xml += '</table>';
  }

  if(subsidiary == 8 && location != 8){
    xml += '<table class="header" style="width: 100%; margin-top:-50px;margin-left:-52px;"><tr>';
    xml += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26488&amp;c=4647359&amp;h=6Uxc0nbUkUIpXGHsPLniGwEfM-PfsyucvPJwV0Vhus-USYG_" style="width:768px; height:140px;" /></td>';
    xml += '</tr>';
    xml += '</table>';
    }
	xml += '</macro>';
	// xml += '<macro id="nlfooter">';
	// xml += '<table class="footer" style="width: 100%;">';
	// xml += '<tr>';
	// xml += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=1543&amp;c=4647359&amp;h=90677a0f341bea21aec2" style="width:655px;height:70px;"/></td>';
	// xml += '</tr>';
	// xml += '<tr>';
 //  if(docRef){
 //    xml += '<td align="left" style="width:75%;">'+docRef+' - '+res.getFieldText('subsidiary')+' / '+dep_no+'</td>';
 //  }
	// //xml += '<td align="left" style="width:75%;"><#if record.custbody_customer_doc_ref_no?has_content>${record.custbody_customer_doc_ref_no} -</#if> ${record.subsidiary} / ${record.tranid} - <#if record.entity.isperson?string == "T"> ${record.entity.altname}<#else>${record.entity.companyname}</#if></td>';
	// xml += '<td align="right">&nbsp;( Page <pagenumber/> of <totalpages/> ) </td>';
	// xml += '</tr></table>';
	// xml += '</macro>';
xml +='<macro id="nlfooter">';
if(subsidiary == 8){  
  xml +='<table class="footer" border="0" ';
   xml +='style="width: 100%; margin-left:-50px; margin-right:-65px; margin-bottom: -255px;background-color:#000;margin-top:68px;">';
  xml +='<tr>';
  xml +=' <td>';
  xml +='<img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14615&amp;c=4647359&amp;h=ae717ee9182515bf331e" style="width:758px;height:55%;"/>';
  xml +=' </td>';
  xml +=' </tr>';
  xml +=' </table>';
}else{
  xml +='<table class="footer" border="0" ';
  xml +='style="width: 100%; margin-left:-50px; margin-right:-65px; margin-bottom: -255px;background-color:#000;margin-top:68px;">';
  xml +='<tr>';
  xml +='  <td>';
  xml +='<img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9210&amp;c=4647359&amp;h=e6070c9cd462193b9b95" style="width:750px;height:40%;"/>';
  xml +='  </td>';
  xml +='</tr>';
  xml +='</table>';
}
xml += '<div style="position:relative;top:-225px;bottom:-92px;left:518px;">';
xml += '<img src="https://4647359.app.netsuite.com/core/media/media.nl?id=19981&amp;c=4647359&amp;h=W94ZlflwUJ1kjaRqNCY6I65R8MhjYA31fyCdylTaaKdkxXtN" style="width:31%;height:30%;"/>';
xml += '</div>';
  xml +='</macro>';
	xml += '</macrolist>';
	xml += '</head>';
	xml += '<body style="font-family:sans-serif;background-color:#ffffff;" header="nlheader" header-height="14%" footer-height="8%" footer="nlfooter" size="A4">';
	//  xml += '<body style="font-family:sans-serif;" header="myheader" header-height="13%" footer="myfooter" footer-height="8%">';
	xml += template;
	xml += '</body>';
	xml += '</pdf>';  
	
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'MakeDeposits.pdf','inline');
    response.write(file.getValue());
}
function relaceCharector(charVal) {	
    return charVal.replace(/&/g, "&amp;");
}
function numberWithCommas(x) {
					return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}