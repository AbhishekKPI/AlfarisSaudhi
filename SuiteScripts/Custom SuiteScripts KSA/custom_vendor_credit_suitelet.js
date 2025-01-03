function debitNotePrintAction(request,response){
    var recordID = request.getParameter("recID");
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var debit = nlapiLoadRecord('vendorcredit', recordID);
    var subsidiary = debit.getFieldValue('subsidiary');
    var tran_no = debit.getFieldValue('transactionnumber');
    var ref_no = debit.getFieldValue('tranid');
    var vendor = debit.getFieldValue('entity');
    var ent_rec = nlapiLoadRecord('vendor',vendor);
    var ven_name = ent_rec.getFieldValue("altname");
    var cur = debit.getFieldText('currency');
    var amt = debit.getFieldValue('usertotal');
    var tran_date = nlapiStringToDate(debit.getFieldValue('trandate'));	
    var tDate = tran_date.getDate()+"-"+monthNames[tran_date.getMonth()]+"-"+tran_date.getFullYear();
    var memo = debit.getFieldValue('memo');
    var account = debit.getFieldText('account');
	var template = "";
    template += '<table style="width:100%;">';
	template += '<tr>';
	template += '<td align="center" style="font-size:16px;font-weight:bold;text-decoration: underline;">DEBIT NOTES</td>';
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
	template += '<td style="width:25%;font-weight:bold;">Transaction #</td><td>:</td><td style="width:34%">'+tran_no+'</td>';
	template += '<td style="width:15%;font-weight:bold;">Currency</td><td>:</td><td style="width:34%">'+cur+'</td>';
	template += '</tr>';
	template += '<tr>';
    template += '<td style="width:25%;font-weight:bold;">Amount</td><td>:</td><td style="width:34%">'+numberWithCommas(amt)+'</td>';
    template += '<td style="width:15%;font-weight:bold;">Date</td><td>:</td><td style="width:34%">'+tDate+'</td>';
  template += '</tr>';
  template += '<tr>';
  template += '<td style="width:25%;font-weight:bold;">Account</td><td>:</td><td style="width:70%">'+relaceCharector(account)+'</td>';
  template += '</tr>';
  template += '<tr>';
   if(memo == null){
  template += '<td style="width:25%;font-weight:bold;">&nbsp;</td><td></td><td style="width:70%">&nbsp;</td>';
   }else{
    template += '<td style="width:25%;font-weight:bold;">Memo</td><td>:</td><td style="width:70%">'+relaceCharector(memo)+'</td>'; 
   }
  template += '</tr>';
  template += '</table>';
  
  var exp_count = debit.getLineItemCount('expense');
  if(exp_count >=1){
  template += '<table style="font-size:14px;font-weight:bold;"><tr><td>&nbsp;</td></tr><tr><td>Expenses</td></tr></table>';
  
  template += '<table style="width:100%;font-size:12px;">';
		template += '<tr>';
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Account</td>';
  template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;">Memo</td>';
		template += '<td colspan="5" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-top:solid 1px #ccc;font-weight:bold;align:center;border-right:solid 1px #ccc;">Amount</td>';
	template += '</tr>';
    var exp_amount = 0;
    var exp_total = 0;
    var ex = 1;
   
    for(var i=0;i<exp_count;i++){
      var account_name = debit.getLineItemText("expense", "account", ex);
      var memo = debit.getLineItemValue("expense", "memo", ex);
      var amt = debit.getLineItemValue("expense", "amount", ex);
      
      template += '<tr>';
		template += '<td colspan ="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(account_name)+'</td>';
      if(memo == null){
        template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;"></td>';
      }else{
        template += '<td colspan="10" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(memo)+'</td>';
      }
		template += '<td colspan="5" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">'+numberWithCommas(amt)+'</td>';
      template += '</tr>';
      ex++;
      exp_amount = parseFloat(amt);
      exp_total += parseFloat(exp_amount);
    }
    template += '<tr><td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;font-size:14px;">Total</td><td colspan="10" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan = "5" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:14px;">'+numberWithCommas(exp_total.toFixed(2))+'</td></tr>';
    template += '</table>';
  }
  
  var item_count = debit.getLineItemCount('item');
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
   
    for(var i=0;i<exp_count;i++){
      var item_name = debit.getLineItemText("item", "item", it);
      var item_desc = debit.getLineItemValue("item", "description", it);
      var qty = debit.getLineItemValue("item", "quantity", it);
      var rate = debit.getLineItemValue("item", "rate", it);
      var amt1 = debit.getLineItemValue("item", "amount", it);
      
      template += '<tr>';
		template += '<td colspan ="2" align ="center" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+it+'</td>';
        template += '<td colspan ="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(item_name)+'</td>';
      if(item_desc == null){
        template += '<td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;"></td>';
      }else{
        template += '<td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+relaceCharector(item_desc)+'</td>';
      }
        template += '<td colspan="2" align ="center" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+qty+'</td>';
        template += '<td colspan="4" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+numberWithCommas(rate)+'</td>';
		template += '<td colspan="4" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">'+numberWithCommas(amt1)+'</td>';
      template += '</tr>';
      it++;
      item_amount = parseFloat(amt1);
      item_total += parseFloat(item_amount);
    }
    template += '<tr><td colspan="6" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;font-size:14px;">Total</td><td colspan="10" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan = "5" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:14px;">'+numberWithCommas(item_total.toFixed(2))+'</td></tr>';
    template += '</table>';
  }
  
  var apply_count = debit.getLineItemCount('apply');
  var applied_amount= debit.getFieldValue('applied');
  if(applied_amount > 0){
    template += '<table style="font-size:14px;font-weight:bold;"><tr><td>&nbsp;</td></tr><tr><td>Applied On</td></tr></table>';
  
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
      var due_date = nlapiStringToDate(debit.getLineItemValue("apply","applydate",ap));
      var dueDate = due_date.getDate()+"-"+monthNames[due_date.getMonth()]+"-"+due_date.getFullYear();
      var type_bill = debit.getLineItemValue("apply", "type",ap);
      var ref = debit.getLineItemValue("apply", "refnum",ap);
      var org_amt = debit.getLineItemValue("apply", "total",ap);
      var amt_due = debit.getLineItemValue("apply", "due",ap);
      var pay_amt = debit.getLineItemValue("apply", "amount",ap);
      
    
      template += '<tr>';
		template += '<td colspan ="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+dueDate+'</td>';
        template += '<td colspan ="3" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+type_bill+'</td>';

        template += '<td colspan="4" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+ref+'</td>';
  
        template += '<td colspan="4" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+numberWithCommas(org_amt)+'</td>';
        template += '<td colspan="4" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;">'+numberWithCommas(amt_due)+'</td>';
		template += '<td colspan="4" align ="right" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;">'+numberWithCommas(pay_amt)+'</td>';
      template += '</tr>';
      ap++;
      apply_amount = parseFloat(pay_amt);
      apply_total += parseFloat(apply_amount);
    }
    }
    template += '<tr><td colspan="7" style="border-left:solid 1px #ccc;border-bottom:solid 1px #ccc;font-weight:bold;font-size:14px;">Total</td><td colspan="12" style="border-bottom:solid 1px #ccc;">&nbsp;</td><td colspan = "4" align ="right" style="border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;font-weight:bold;font-size:14px;">'+numberWithCommas(apply_total.toFixed(2))+'</td></tr>';
    template += '</table>';
  }
	var xml = '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd" [<!ENTITY nbsp "&#160;">] >'; // start of template
    xml += '<pdf>';
    xml += '<head>'; 
    xml += '<style>td p { align:left; }</style>';
    xml += '<macrolist>';

    xml += '<macro id="myheader">';
    if (subsidiary == '1') {//
      //xml += '<table style="width: 100%;"><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=1855&amp;c=4119372&amp;h=b46037635396c70b981c" style="width:657px; height:130px;" /></td></tr></table>';
      xml += '<table class="header" style="width: 100%;margin-left:-45px; margin-right:-65px;margin-top:-46px; "><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26487&amp;c=4647359&amp;h=N7yMHyudqD68aN6yaYCarDgu-nT4u0aoi7g3lKZ708dlEsDK"  style="width:63%;height:60%;"/></td></tr></table>';
    } 

    if (subsidiary == '2') {//
      //xml += '<table style="width: 100%;"><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=1855&amp;c=4119372&amp;h=b46037635396c70b981c" style="width:657px; height:130px;" /></td></tr></table>';
      xml += '<table class="header" style="width: 100%;margin-left:-45px; margin-right:-65px;margin-top:-46px; "><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26489&amp;c=4647359&amp;h=8jLOJuWgAnB4EXpAfSKtQfxbGPoNlcPY1buLTrUncQpcjvHG"  style="width:63%;height:60%;"/></td></tr></table>';
    } 
    if (subsidiary == '8') {//
      //xml += '<table style="width: 100%;"><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=1855&amp;c=4119372&amp;h=b46037635396c70b981c" style="width:657px; height:130px;" /></td></tr></table>';
      xml += '<table class="header" style="width: 100%;margin-left:-45px; margin-right:-65px;margin-top:-46px; "><tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26488&amp;c=4647359&amp;h=6Uxc0nbUkUIpXGHsPLniGwEfM-PfsyucvPJwV0Vhus-USYG_"  style="width:63%;height:60%;"/></td></tr></table>';
    } 
    xml += '</macro>';

      xml += '<macro id="myfooter">';

      xml += '<table class="footer" style="width: 100%;margin-left:-45px; margin-right:-65px;margin-top:100px;font-size:12px;font-weight:normal;">';
      xml += '<tr><td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=22289&amp;c=4647359&amp;h=RqN0ZlhUyHnIqITW00RkJlkwlhQ3_qQjISqhN5ihvAiMBU_V"  style="width:53%;height:60%;"/></td></tr>';
      // xml += '<tr><td align="left" style="font-size:9px;">*This is a computer generated statement,that requires no signature.</td></tr>';
      //xml += '<tr><td align="left">Vendor Ref# ' + vendorID + '</td><td align="right">( page <pagenumber/> of <totalpages/> ) </td></tr>';
         //  xml += '<tr><td align="center">( page <pagenumber/> of <totalpages/> ) </td></tr>';
      xml += '</table>';
      xml += '</macro>';
      xml += '</macrolist>';
    xml += '</head>';
    xml += '<body style="font-family:sans-serif;background-color:#ffffff;" header="myheader" header-height="14%" footer-height="15%" footer="myfooter" size="A4">';
  //  xml += '<body style="font-family:sans-serif;" header="myheader" header-height="13%" footer="myfooter" footer-height="8%">';
    xml += template;
    xml += '</body>';
    xml += '</pdf>';
	var file = nlapiXMLToPDF(xml);
	response.setContentType('PDF', 'Debit Note - '+debit.getFieldValue('transactionnumber')+'.pdf', 'inline');
	response.write(file.getValue());	
}
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function relaceCharector(charVal) {	
    return charVal.replace(/&/g, "&amp;");	
}