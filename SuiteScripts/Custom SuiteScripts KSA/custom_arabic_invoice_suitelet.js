function print_test_suite(request,response){
  var invID = request.getParameter('invoiceID');
  var invRes = nlapiLoadRecord('invoice', invID);
  var customer = invRes.getFieldValue('entity');
  var custRec = nlapiLoadRecord('customer',customer);
  var custName = assgn(custRec.getFieldValue('custentity_customer_name'));
  var custArabicname = assgn(custRec.getFieldValue('custentity_customer_long_name_arabic'));
  var customArabicAddress = assgn(custRec.getFieldValue('custentity_address_in_arabic'));
  var crnumber = custRec.getFieldValue('custentity_cr_number');
  if(crnumber){
    crnumber = crnumber;
  }else{
    crnumber = '';
  }
  var subsiTRN = invRes.getFieldValue('custbody_trn');
  var TranId = assgn(invRes.getFieldValue('tranid'));
  var legalentity = assgn(invRes.getFieldValue('custbody_legal_entity'));
  var BillAddress = assgn(invRes.getFieldText('billaddress'));

  var RefNum = assgn(invRes.getFieldValue('otherrefnum'));
  var lpo = assgn(invRes.getFieldValue('custbody_po_number_of_so'));
  var SubTotal = assgn(invRes.getFieldValue('subtotal'));
  var TaxTotal = assgn(invRes.getFieldValue('taxtotal'));
  var Total = assgn(invRes.getFieldValue('total'));
  var Currency = assgn(invRes.getFieldValue('currency'));
  var CurrencySymbol = assgn(invRes.getFieldValue('currencysymbol'));
  var CustAmountIntoWords = assgn(invRes.getFieldValue('custbody_amount_into_words'));
  var TranDate = assgn(invRes.getFieldValue('trandate'));
  var CompanyName = assgn(custRec.getFieldValue('companyname'));
  var VatRegNumber = assgn(custRec.getFieldValue('vatregnumber'));
  if(invRes.getFieldValue('custbody_attention')){
    var CustAttn = assgn(invRes.getFieldValue('custbody_attention'));
  }else{
    var CustAttn = '';
  }
  if(invRes.getFieldValue('custbody_scope_of_work')){
    var CustScopeOfWork = assgn(invRes.getFieldValue('custbody_scope_of_work'));
  }else{
    var CustScopeOfWork = '';
  }
  if(custRec.getFieldValue('salesrep')){
    var SalesRep = assgn(custRec.getFieldValue('salesrep'));
  }else{
    var SalesRep = '';
  }
  if(SalesRep){
    var salesRepRec = nlapiLoadRecord('employee',SalesRep);
    var salesRepId = salesRepRec.getFieldValue('entityid');
    var salesRepName = salesRepRec.getFieldValue('firstname');
  }
  if(custRec.getFieldValue('fax')){
    var Fax = assgn(custRec.getFieldValue('fax'));
  }else{
    var Fax = '';
  }
  if(custRec.getFieldValue('phone')){
    var Phone = assgn(custRec.getFieldValue('phone'));
  }else{
    var Phone = '';
  }
  var DueDate = assgn(invRes.getFieldValue('duedate'));
  if(invRes.getFieldValue('custbody_site')){
    var CustSite = assgn(invRes.getFieldValue('custbody_site'));
  }else{
    var CustSite = '';
  }
  if(invRes.getFieldValue('custbody_customer_doc_ref_no')){
    var docrefnum = assgn(invRes.getFieldValue('custbody_customer_doc_ref_no'));
  }else{
    var docrefnum = '';
  }
  if(invRes.getFieldValue('custbody_invoice_qt_number_cf')){
    var qtNumber = assgn(invRes.getFieldValue('custbody_invoice_qt_number_cf'));
  }else{
    var qtNumber = '';
  }
  if(invRes.getFieldText('custbody_payment_terms')){
    var payTerms = assgn(invRes.getFieldText('custbody_payment_terms'));
  }else{
    var payTerms = '';
  }
  if(invRes.getFieldValue('custbody_bank_details')){
    var bankDetails = assgn(invRes.getFieldValue('custbody_bank_details'));
  }else{
    var bankDetails = '';
  }
  var html = "<?xml version=\"1.0\" ?> ";
  html += "<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> ";
  html += "<pdf> ";
  html += "<head>";
  html += '<style>h3{font-style:bold; margin:0;padding:1%;} table{ border-collapse: collapse;}';
  html +=  '.payment td, .payment tr  { font-size: 12px; margin:0; padding:0;}';
  html +=  '.terms td p {font-size:12px; margin:0;padding:0;}';
  html +=  '.item-table th { border: 1px solid black; border-bottom:0; font-size:13px; }';
  html += '.item-table td { padding:1%; border: 1px solid black; margin:0; padding:0; font-size:12px; }';
  html +=    '.item-table p, span { padding:1%;} </style>' ;
  html += "</head>";
  html += '<body header="nlheader" header-height="12%" footer="nlfooter" footer-height="18pt" padding="0.2in 0.2in 0.2in 0.2in" size="A4">';
  html+= ' <header id="pageHeader">';
  html += '<table id="header" class="bill" style="width:100%;margin-top:50px;"><tr><td>&nbsp;</td></tr>';
  //html +=  '<tr> <td align="center"><h2><span dir="rtl">فاتورة التعريف الضريبي</span> </h2></td></tr> ';
  html += '<tr> <td><table style="width:100%"><tr ><td style="border: 1px solid black;" colspan="2">';
  html += ' <table style="width: 400px;"><tr><td style = "font-size:10px;"><b>Bill To:</b></td></tr>';
  html +=        '<tr>';
  if(legalentity){
    html +=        '<td style=\"font-weight:bold;\" align=\"left\">'+legalentity+'<br />';
  }else{
    html +=        '<td style=\"font-weight:bold;\" align=\"left\">'+custName+'<br/><span dir="rtl">'+custArabicname+' </span></h3>';
  }
  html +=        '</td></tr>';
  if(crnumber){
  html +=             ' <tr><td><h4>CR /<span dir="rtl">سجل تجاري </span> / :'+crnumber+'</h4></td></tr>';
  }
  html +=        '<tr><td><h4>VAT Regn No /<span dir="rtl">الرقم الضريبي </span> : '+VatRegNumber+'</h4></td></tr>';
  html +=        '<tr><td><span dir="rtl">'+customArabicAddress+'</span></td></tr></table>';
  html +=      '</td><td  style="border: 1px solid black;"><table style="width:100%">';
  html +=         ' <tr><td><h3></h3></td></tr>';
  html +=     ' <tr><td><h4>Invoice No / <span dir="rtl">رقم الفاتورة </span>: '+TranId+'</h4></td></tr>';
  html +=        '<tr><td><h4>Invoice Date / <span dir="rtl">تاريخ الفاتورة</span> : '+TranDate+'</h4><br/></td></tr>';
  html +=       '<tr><td><h4>Alfaris Vat No /<span dir="rtl"> الرقم التعريف الضريبي </span>: '+subsiTRN+'</h4></td></tr></table></td></tr>';
  html +=   ' <tr><td style="border: 1px solid black;"><table  class="terms" style="width:100%;font-size:10px;">';
  html +=      '<tr><td><p><b>Tel No / <span dir="rtl"> رقم الهاتف </span></b> : '+Phone+'</p></td></tr>';
  html +=     '<tr><td><p><b>Fax No / <span dir="rtl"> رقم الفاكس </span></b> : '+Fax+'</p></td></tr>';
  html +=      '<tr><td><p><b>Attn / <span dir="rtl"> اعداد</span></b> :'+CustAttn+'</p></td></tr>';
  html +=      '<tr><td><p><b>Contract / <span dir="rtl"> المقاول </span></b> : ';
  if(docrefnum){
    html +=      ''+docrefnum+'</p>';
  }else{
    html +=      ''+qtNumber+'</p>';
  }
  html +=      '</td></tr>';
  html +=     ' <tr><td><p><b>LPO No / <span dir="rtl">ال بي او</span> : ';
  if(RefNum){
    html +=     ''+RefNum+'</b> </p>';  
  }else{
    html +=     ''+lpo+'</b> </p>';
  }
  html += '</td></tr></table></td>';
  html +=    '<td style="border: 1px solid black;"><table  class="terms" style="width:100%;font-size:10px;">';
  html +=     '<tr><td><p><b>Pay Terms / <span dir="rtl">وقت الدفع المسبق </span></b>: '+payTerms+'</p></td></tr>';
  html +=      '<tr><td><p><b>Pay Due / <span dir="rtl">تاريخ الدفع </span></b>:'+DueDate+' </p></td></tr>';
  html +=      '<tr><td><p><b>Sales Rep / <span dir="rtl">مندوب المبيعات</span></b>: '+salesRepId+' '+salesRepName+'</p></td></tr>';
  html +=     ' <tr><td><p><b>Site / <span dir="rtl">الموقع</span> </b>:'+CustSite+'</p></td></tr></table></td>';
  html +=   ' <td style="border: 1px solid black;"><table class="payment" style="width:100%;font-size:10px;">';
  var bankdetails = invRes.getFieldValue('custbody_bank_details').split("\n");
  for(var j = 0; j < bankdetails.length; j++ ){
      if(j == 0){
        var bankname = bankdetails[j].split(":");
        html += "<tr>";
        for(var k = 0; k < bankname.length; k++){
          if(k == 0){
            html += "<td style=\"font-weight:bold;\">"+bankname[0]+" : "+bankname[1]+"</td>";
          }
          if(0){
            html += "<td>"+bankname[1]+"</td>";
          }
        }
        html += "</tr>";
      }
      if(j == 1){
        var bankname = bankdetails[j].split(":");
        html += "<tr>";
        for(var k = 0; k < bankname.length; k++){
          if(k == 0){
            html += "<td style=\"font-weight:bold;\">"+bankname[0]+" : "+bankname[1]+"</td>";
          }
          if(0){
            html += "<td>"+bankname[k]+"</td>";
          }
        }
        html += "</tr>";
      }
      if(j == 2){
        var bankname = bankdetails[j].split(":");
        html += "<tr>";
        for(var k = 0; k < bankname.length; k++){
          if(k == 0){
             html += "<td style=\"font-weight:bold;\">"+bankname[0]+" : "+bankname[1]+"</td>";
          }
          if(0){
            html += "<td>"+bankname[k]+"</td>";
          }
        }
        html += "</tr>";
      }
      if(j == 3){
        var bankname = bankdetails[j].split(":");
        html += "<tr>";
        for(var k = 0; k < bankname.length; k++){
          if(k == 0){
             html += "<td style=\"font-weight:bold;\">"+bankname[0]+" : "+bankname[1]+"</td>";
          }
          if(0){
            html += "<td>"+bankname[k]+"</td>";
          }
        }
        html += "</tr>";
      }
      if(j == 4){
        var bankname = bankdetails[j].split(":");
        html += "<tr>";
        for(var k = 0; k < bankname.length; k++){
          if(k == 0){
            html += "<td style=\"font-weight:bold;\">"+bankname[0]+" : "+bankname[1]+"</td>";
          }
          if(0){
            html += "<td>"+bankname[k]+"</td>";
          }
        }
        html += "</tr>";
      }if(j == 5){
        var bankname = bankdetails[j].split(":");
        html += "<tr>";
        for(var k = 0; k < bankname.length; k++){
          if(k == 0){
            html += "<td style=\"font-weight:bold;\">"+bankname[0]+" : "+bankname[1]+"</td>";
          }
          if(0){
            html += "<td>"+bankname[k]+"</td>";
          }
        }
        html += "</tr>";
      }
      if(j == 6){
        var bankname = bankdetails[j].split(":");
        html += "<tr>";
        for(var k = 0; k < bankname.length; k++){
          if(k == 0){
            html += "<td style=\"font-weight:bold;\">"+bankname[0]+" : "+bankname[1]+"</td>";
          }
          if(0){
            html += "<td>"+bankname[k]+"</td>";
          }
        }
        html += "</tr>";
      }
    }
  html +=      '<tr><td><b>All bank transfer charges to be borne by customer</b></td></tr></table></td></tr></table></td></tr>';
  html += '<tr line-height="200%"><td><p><b>Scope of Work <span dir="rtl">نوع العمل</span>: </b> '+CustScopeOfWork+' </p></td></tr></table></header>';


  html +=  '<table class="item-table" id="item-table" style="width:100%"><thead>';

  html +=    '<tr line-height="110%">';
  html +=      '<th align="center" colspan="3"><p>TS Date</p><span dir="rtl">تاريخ العمل</span></th>';
  html +=      '<th align="center" colspan="3"><p>TS No.</p><span dir="rtl">الرقم</span></th>';
  html +=     '<th align="center" colspan="5"><p>Description</p><span dir="rtl">الوصف</span></th>';
  html +=     '<th align="center" colspan="2"><p>Unit</p><span dir="rtl">الوحدة</span></th>';
  html +=      '<th align="center" colspan="3"><p>Unit Price</p><span dir="rtl">قيمة الوحدة</span></th>';
  html +=      '<th align="center" colspan="3"><p>Amt. Excl.of Vat</p><span dir="rtl">المبلغ قبل الضريبة</span></th>';
  html +=     ' <th align="center" colspan="2"><p>VAT %</p><span dir="rtl">نسبة الضريبة</span></th>';
  html +=      '<th align="center" colspan="3"><p>VAT Amount</p><span dir="rtl">قيمة الضريبة</span></th>';
  html +=      '<th align="center" colspan="3"><p>Total Amount</p><span dir="rtl">المبلغ الاجمالي</span>'+CurrencySymbol+'</th></tr></thead><tbody>';
  var itemcount = invRes.getLineItemCount('time');
  for(var i = 1 ; i<= itemcount ; i++){
    var itemdesc = assgn(invRes.getLineItemValue('time','custcol_al_arabic_description',i));
    var itemdescNormal = assgn(invRes.getLineItemValue('time','memo',i));
    var tsNumber = assgn(invRes.getLineItemValue('time','custcol_ts_number',i));
    var qty = assgn(invRes.getLineItemValue('time','quantity',i));
    var units = assgn(invRes.getLineItemValue('time','custcol_ts_units',i));
    var rate = assgn(invRes.getLineItemValue('time','rate',i));
    var taxRate = assgn(invRes.getLineItemValue('time','taxrate1',i));
    var amt = assgn(invRes.getLineItemValue('time','amount',i));
    var taxAmt = assgn(invRes.getLineItemValue('time','tax1amt',i));
    var grsAmt = assgn(invRes.getLineItemValue('time','grossamt',i));
    var tsStartDate = invRes.getLineItemValue('time','custcol_ts_sdate',i);
    var tsEndDate = invRes.getLineItemValue('time','custcol_ts_edate',i);  
    var tsApply = invRes.getLineItemValue('time','apply',i);
    if(tsApply == "T"){
      html +=      '<tr>';
      if(rate == 0){
        html +=      '<td align="left" colspan="3">&nbsp;</td>';
      }else{
        html +=      '<tr><td align="left" colspan="3">';
        if(tsStartDate == null){
          html += '&nbsp;<br/>';
        }else{
          html += ''+tsStartDate+'<br/>';  
        }
        if(tsEndDate != null){
          html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To<br/>';
        }
        if(tsEndDate == null){
          html += '&nbsp;';
        }else{
          html += ''+tsEndDate+'';
        }
        html += '</td>';
      }

      html +=      '<td align="left" colspan="3">'+tsNumber+'</td>';
      html +=      '<td align="left" colspan="5">'+itemdescNormal+'<br/><span dir="rtl">رسوم استجأر كرين  لحمولة 100  طن</span></td>';
      html +=      '<td align="left" colspan="2">'+units+'</td>';
      html +=      '<td align="right" colspan="3">'+numberWithCommas(rate)+'</td>';
      html +=      '<td align="right" colspan="3">'+numberWithCommas(amt)+'</td>';
      html +=      '<td align="right" colspan="2">'+taxRate+'</td>';
      html +=     ' <td align="right" colspan="3">'+numberWithCommas(taxAmt)+'</td>';
      html +=      '<td align="right" colspan="3">'+numberWithCommas(grsAmt)+'</td></tr>'; 
    }

  }
  html +=     '</tbody><tfoot><tr ><td align="left" colspan="16"><p><b>Amount in words / <span dir="rtl">  كتابة المبلغ بالحروف</span>: '+convert_case(CustAmountIntoWords)+'</b></p></td>';
  html +=      '<td align="right" colspan="3" style = "font-weight:bold;"><p>'+numberWithCommas(SubTotal)+'</p></td>';
  html +=     ' <td align="right" colspan="2"><p></p></td>';
  html +=      '<td align="right" colspan="3" style = "font-weight:bold;"><p>'+numberWithCommas(TaxTotal)+'</p></td>';
  html +=      '<td align="right" colspan="3" style = "font-weight:bold;"><p>'+numberWithCommas(Total)+'</p></td></tr></tfoot></table>';
  html += '</body>';
  html += "</pdf>"; 


  response.write( html);

}
function assgn(fValue) {
  if(fValue)
    fValue = replaceCharacter(fValue);
  else
    fValue = '';

  return fValue;
}

function replaceCharacter(charVal) {
  return charVal.replace(/&/g, "&amp;");
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function convert_case(str) {
  var lower = str.toLowerCase();
  return lower.replace(/(^| )(\w)/g, function(x) {
    return x.toUpperCase();
  });
}