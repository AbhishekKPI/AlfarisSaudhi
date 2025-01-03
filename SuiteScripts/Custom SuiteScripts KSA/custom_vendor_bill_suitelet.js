function vendorBillPrintAction(request,response){
    var recordID = request.getParameter("recID");
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var bill = nlapiLoadRecord('vendorbill', recordID);
    var subsidiary = bill.getFieldValue('subsidiary');
    var tran_no = bill.getFieldValue('transactionnumber');
    var ref_no = bill.getFieldValue('tranid');
    var vendor = bill.getFieldValue('entity');
    var ent_rec = nlapiLoadRecord('vendor',vendor);
    var ven_name = ent_rec.getFieldValue("altname");
    var cur = bill.getFieldText('currency');
    var amt = bill.getFieldValue('usertotal');
    var tran_date = nlapiStringToDate(bill.getFieldValue('trandate'));	
    var tDate = tran_date.getDate()+"-"+monthNames[tran_date.getMonth()]+"-"+tran_date.getFullYear();
    var due_date = nlapiStringToDate(bill.getFieldValue('duedate'));	
    var dueDate = due_date.getDate()+"-"+monthNames[due_date.getMonth()]+"-"+due_date.getFullYear();
    var memo = bill.getFieldValue('memo');
    var account = bill.getFieldText('account');
	var template = "";
    template += '<table style="width:100%;">';
	template += '<tr>';
	template += '<td align="center" style="font-size:16px;font-weight:bold;text-decoration: underline;">VENDOR BILL</td>';
	template += '</tr>';
	template += '</table>';
  
  	template += '<table style="width:100%; font-size:12px;">';
	template += '<tr>';
	template += '<td style="width:25%;font-weight:bold;">Vendor</td><td>:</td><td style="width:34%">'+relaceCharector(ven_name)+'</td>';
    if(ref_no == null){
    template += '<td style="width:15%;font-weight:bold;">Ref #</td><td>:</td><td style="width:34%">&nbsp;</td>';
    }else{
      template += '<td style="width:15%;font-weight:bold;">Ref #</td><td>:</td><td style="width:34%">'+ref_no+'</td>';
    }
	template += '</tr>';
	template += '<tr>';
	template += '<td style="width:25%;font-weight:bold;">Tran #</td><td>:</td><td style="width:34%">'+tran_no+'</td>';
	template += '<td style="width:15%;font-weight:bold;">Currency</td><td>:</td><td style="width:34%">'+cur+'</td>';
	template += '</tr>';
	template += '<tr>';
    template += '<td style="width:25%;font-weight:bold;">Amount</td><td>:</td><td style="width:34%">'+numberWithCommas(amt)+'</td>';
    template += '<td style="width:15%;font-weight:bold;">Date</td><td>:</td><td style="width:34%">'+tDate+'</td>';
  template += '</tr>';
  template += '<tr>';
  template += '<td style="width:25%;font-weight:bold;">Account</td><td>:</td><td style="width:34%">'+relaceCharector(account)+'</td>';
  template += '<td style="width:15%;font-weight:bold;">Due Date</td><td>:</td><td style="width:34%">'+dueDate+'</td>';
  template += '</tr>';
  template += '<tr>';
   if(memo == null){
  template += '<td style="width:25%;font-weight:bold;">&nbsp;</td><td></td><td style="width:70%">&nbsp;</td>';
   }else{
    template += '<td style="width:25%;font-weight:bold;">Memo</td><td>:</td><td style="width:70%">'+relaceCharector(memo)+'</td>';
   }
  template += '</tr>';
  template += '</table>';
  
  var exp_count = bill.getLineItemCount('expense');
  for(var j=1 ; j<exp_count ; j++){
    var cust = bill.getLineItemValue("expense", "customer",j);
    if(cust){
      var cust_true = 1;
    }else{
      var cust_true = 0;
    }
  }
  if(exp_count >=1){
  template += '<table style="font-size:14px;font-weight:bold;"><tr><td>&nbsp;</td></tr><tr><td>Expenses</td></tr></table>';
  
  template += '<table style="width:100%;font-size:12px;">';
		template += '<tr>';
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Account</td>';
  template += '<td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Memo</td>';
		template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;border-right:solid 1px #ccc;">Amount</td>';
	template += '</tr>';
    var exp_amount = 0;
    var exp_total = 0;
    var ex = 1;
   
    for(var i=0;i<exp_count;i++){
      var account_name = bill.getLineItemText("expense", "account", ex);
      var memo = bill.getLineItemValue("expense", "memo", ex);
      var amt = bill.getLineItemValue("expense", "amount", ex);
      
      template += '<tr>';
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(account_name)+'</td>';
      if(memo == null){
        template += '<td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;"></td>';
      }else{
        template += '<td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(memo)+'</td>';
      }
		template += '<td colspan="4" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">'+numberWithCommas(amt)+'</td>';
      template += '</tr>';
      ex++;
      exp_amount = parseFloat(amt);
      exp_total += parseFloat(exp_amount);
    }
    template += '<tr><td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;font-size:14px;">Total</td><td colspan="6" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan = "4" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:14px;">'+numberWithCommas(exp_total.toFixed(2))+'</td></tr>';
    template += '</table>';
  }
  
  var item_count = bill.getLineItemCount('item');
  if(item_count >=1){
    template += '<table style="font-size:14px;font-weight:bold;"><tr><td>&nbsp;</td></tr><tr><td>Items</td></tr></table>';
  
  template += '<table style="width:100%;font-size:12px;">';
		template += '<tr>';
        template += '<td colspan ="2" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Sr. #</td>';
		template += '<td colspan ="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Item</td>';
  		template += '<td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Description</td>';
        template += '<td colspan="2" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Qty</td>';
        template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Rate</td>';
		template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;border-right:solid 1px #ccc;">Amount</td>';
	template += '</tr>';
    var item_amount = 0;
    var item_total = 0;
    var it = 1;
   
    for(var i=0;i<item_count;i++){
      var item_name = bill.getLineItemText("item", "item", it);
      var item_desc = bill.getLineItemValue("item", "description", it);
      var qty = bill.getLineItemValue("item", "quantity", it);
      var rate = bill.getLineItemValue("item", "rate", it);
      var amt1 = bill.getLineItemValue("item", "amount", it);
      
      template += '<tr>';
		template += '<td colspan ="2" align = "center" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+it+'</td>';
        template += '<td colspan ="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(item_name)+'</td>';
      if(item_desc == null){
        template += '<td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;"></td>';
      }else{
        template += '<td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(item_desc)+'</td>';
      }
        template += '<td colspan="2" align = "center" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+qty+'</td>';
        template += '<td colspan="4" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+numberWithCommas(rate)+'</td>';
		template += '<td colspan="4" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">'+numberWithCommas(amt1)+'</td>';
      template += '</tr>';
      it++;
      item_amount = parseFloat(amt1);
      item_total += parseFloat(item_amount);
    }
    template += '<tr><td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;font-size:14px;">Total</td><td colspan="8" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan = "8" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:14px;">'+numberWithCommas(item_total.toFixed(2))+'</td></tr>';
    template += '</table>';
  }

  /*var apply_count = debit.getLineItemCount('apply');
  if(apply_count >=1){
    template += '<table style="font-size:12px;font-weight:bold;"><tr><td>&nbsp;</td></tr><tr><td>Applied On</td></tr></table>';
  
  template += '<table style="width:100%;font-size:12px;">';
		template += '<tr>';
		template += '<td colspan ="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Date</td>';
  		template += '<td colspan="3" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Type</td>';
        template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Ref #</td>';
        template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Org. Amt.</td>';
        template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Amt. Due</td>';
		template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;border-right:solid 1px #ccc;">Payment</td>';
	template += '</tr>';
    var apply_amount = 0;
    var apply_total = 0;
    var ap = 1;
   
    for(var i=1;i<=apply_count;i++){
     
      var check = debit.getLineItemValue("apply","apply",ap);
      if(check == "T"){
      var due_date = debit.getLineItemValue("apply","applydate",ap);
      var type_bill = debit.getLineItemValue("apply", "type",ap);
      var ref = debit.getLineItemValue("apply", "refnum",ap);
      var org_amt = debit.getLineItemValue("apply", "total",ap);
      var amt_due = debit.getLineItemValue("apply", "due",ap);
      var pay_amt = debit.getLineItemValue("apply", "amount",ap);
      
    
      template += '<tr>';
		template += '<td colspan ="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+check+'</td>';
        template += '<td colspan ="3" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+type_bill+'</td>';

        template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+ref+'</td>';
  
        template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+numberWithCommas(org_amt)+'</td>';
        template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+numberWithCommas(amt_due)+'</td>';
		template += '<td colspan="4" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">'+numberWithCommas(pay_amt)+'</td>';
      template += '</tr>';
      ap++;
      apply_amount = parseFloat(pay_amt);
      apply_total += parseFloat(apply_amount);
    }
    }
    template += '<tr><td colspan="7" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;">Total</td><td colspan="12" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan = "4" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;">'+numberWithCommas(apply_total.toFixed(2))+'</td></tr>';
    template += '</table>';
  }*/
	var xml = '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd" [<!ENTITY nbsp "&#160;">] >'; // start of template
    xml += '<pdf>';
    xml += '<head>'; 
    xml += '<style>td p { align:left; }</style>';
    xml += '<macrolist>';
    xml += '<macro id="myheader">';
    // if (subsidiary == '1') {
    //     xml += '<table style="width: 100%;"><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=4237&amp;c=4647359&amp;h=a319612cad8e0476c3cb" style="width:657px; height:120px;" /></td></tr></table>';
    // }
    // if (subsidiary == '2') {
    //     xml += '<table style="width: 100%;"><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=1542&amp;c=4647359&amp;h=6133025b4814846195e4" style="width:657px; height:132px;" /></td></tr></table>';
    // }
      if(subsidiary == 1){
  xml += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-60px; margin-right:-40px;"><tr>';
  xml += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9211&amp;c=4647359&amp;h=fc2ca0a52e15d8d22d59" style="width:800px; height:120px;" /></td>';
  xml += '</tr></table>';
  }
//   for Energy Division- Rental and Workshop
  if(subsidiary == 11 || subsidiary == 12){
    xml += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-60px; margin-right:-40px;"><tr>';
    xml += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9211&amp;c=4647359&amp;h=fc2ca0a52e15d8d22d59" style="width:800px; height:120px;" /></td>';
    xml += '</tr></table>';
    }
  if(subsidiary== 2){
  xml += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-68px; margin-right:-40px;"><tr>';
  xml += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9196&amp;c=4647359&amp;h=215721097cda3e1e1ad8" style="width:800px; height:120px;" /></td>';
  xml += '</tr>';
  xml += '</table>';
  } 
    xml += '</macro>';
    
    xml += '<macro id="myfooter">';
    // if (subsidiary == '1') {
    // 	xml += '<table style="width: 100%;"><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=4340&amp;c=4647359&amp;h=56e77563bccb0bd84c83" style="width:640px;height:100px;" /></td></tr><tr><td style="font-size:10px;font-weight:bold;" align="right">Page ( <pagenumber/> of <totalpages/> ) </td></tr></table>';
    // }
    // if (subsidiary == '2') {
    // 	xml += '<table style="width: 100%;"><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=4339&amp;c=4647359&amp;h=4445456f80222568529a" style="width:640px;height:100px;" /></td></tr><tr><td style="font-size:10px;font-weight:bold;" align="right">Page ( <pagenumber/> of <totalpages/> ) </td></tr></table>';
    // }
    xml +='<table class="footer" border="0" ';
xml +='style="width: 100%; margin-left:-50px; margin-right:-65px; margin-bottom: -255px;background-color:#000;margin-top:68px;">';
xml +='<tr>';
xml +='  <td>';
xml +='<img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9210&amp;c=4647359&amp;h=e6070c9cd462193b9b95" style="width:750px;height:40%;"/>';

xml +='  </td>';
xml +='</tr>';
xml +='</table>';
xml +='<div style="position:relative;top:-235px;bottom:-92px;left:483px;">';
xml +='<img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9205&amp;c=4647359&amp;h=7003b6a4832399179079" style="width:100%;height:100%;"/>';
xml +='</div> ';
    xml += '</macro>';
    xml += '</macrolist>';
    xml += '</head>';
    xml += '<body style="font-family:sans-serif;background-color:#ffffff;" header="myheader" header-height="12%" footer-height="8%" footer="myfooter" size="A4" padding="0.4in,0.4in,0.4in,0.4in">';
  //  xml += '<body style="font-family:sans-serif;" header="myheader" header-height="13%" footer="myfooter" footer-height="8%">';
    xml += template;
    xml += '</body>';
    xml += '</pdf>';
	var file = nlapiXMLToPDF(xml);
	response.setContentType('PDF', 'Vendor Bill - '+bill.getFieldValue('transactionnumber')+'.pdf', 'inline');
	response.write(file.getValue());	
}
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function relaceCharector(charVal) {	
    return charVal.replace(/&/g, "&amp;");
}