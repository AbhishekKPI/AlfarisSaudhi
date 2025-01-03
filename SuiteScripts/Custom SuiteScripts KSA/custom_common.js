if(document.getElementById("tbl_newrecrecmachcustrecord_timeseet_dtls_etsno")){
  document.getElementById("tbl_newrecrecmachcustrecord_timeseet_dtls_etsno").style.display="none";}
if(document.getElementById("tbl_attach")){document.getElementById("tbl_attach").style.display="none";}  
if(document.getElementById("tbl_customize")){document.getElementById("tbl_customize").style.display="none";}  
if(document.getElementById("tbl_newrecrecmachcustrecord_ts_header_etsno_hf")){document.getElementById("tbl_newrecrecmachcustrecord_ts_header_etsno_hf").style.display="none";}
function timesheetLineItem(recID) {
  window.location = "/app/site/hosting/scriptlet.nl?script=236&deploy=1&tsid="+recID;
}
function rateandunitChange(raid,tsid) {
  window.location =  '/app/site/hosting/scriptlet.nl?script=235&deploy=1&raid='+raid+'&tsid='+tsid;
}
function manageTimesheet(projid,raid) {
  window.location =  '/app/site/hosting/scriptlet.nl?script=244&deploy=1&projid='+projid+'&raid='+raid;
}
function quotePrintOnlhAction(estID){
  window.open("/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&template=107&label=Quote&printtype=transaction&trantype=estimate&id="+estID);
}
function quotePrintPI(estID){
  window.open("/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&template=121&label=Quote&printtype=transaction&trantype=estimate&id="+estID);
} 
function printOnLetterhead(raid,tsid){
  window.open("/app/site/hosting/scriptlet.nl?script=237&deploy=1&ts=gen&print=1&lh=T&raid="+raid+"&tsid="+tsid); 
} 
function additionalTimesheetGen(raid) {   
  window.location =  "/app/site/hosting/scriptlet.nl?script=237&deploy=1&ts=gen&print=0&raid="+raid;
}
function postTimesheetGen(prjid) {
  var etsNo = getParameterFromURL("id");
  window.location = "/app/common/custom/custrecordentry.nl?rectype=111&etsno="+etsNo+"&prjid="+prjid;
}

function getParameterFromURL(param){
  if(param=(new RegExp('[?&]'+encodeURIComponent(param)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(param[1]);
}
function copyTimesheet(raid,internalid){
  window.location =  '/app/site/hosting/scriptlet.nl?script=142&deploy=1&raid='+raid+'&etsid='+internalid;
}
function editTsDates(tsID) {  
  window.open("/app/site/hosting/scriptlet.nl?script=238&deploy=1&tsid="+tsID, "", "width=460,height=330"); 
}
function addtnlTsGenWindow(raID,projsub) {
  window.open("/app/site/hosting/scriptlet.nl?script=238&deploy=1&raid="+raID+"&projsub="+projsub+"&gen=1", "", "width=460,height=330");
}
function addBreakdownts(tsheaderID) { 
  window.open("/app/common/custom/custrecordentry.nl?rectype=108&cf=26&tsheadID="+tsheaderID,"","");
}
function postBreakdownTimesheet(tsheaderID,tsID) {
  window.location =  '/app/site/hosting/scriptlet.nl?script=239&deploy=1&bdtsid='+tsheaderID+'&timesheetID='+tsID;
}
function backToproject(projID) {    
  window.location =  "/app/accounting/project/project.nl?e=T&id="+projID;
}
function printCheck(checkID,status){
  if(status == 1){
    window.open("/app/site/hosting/scriptlet.nl?script=260&deploy=1&recID="+checkID);
  }else{
    window.open("/app/site/hosting/scriptlet.nl?script=261&deploy=1&recID="+checkID);
  }
}
function printcheck(voucherId){
  window.open("/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&template=122&label=VendPymt&printtype=transaction&trantype=vendpymt&id="+voucherId);
}
function invoicePrintOnlhAction(invoiceID){
  window.open("/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&label=Invoice&printtype=transaction&trantype=custinvc&template=111&id="+invoiceID);
}
function invoicelh(invoiceID){
  window.open("/app/site/hosting/scriptlet.nl?script=342&deploy=1&invoiceID="+invoiceID);
}
function invoiceenglh(invoiceID){
  window.open("/app/site/hosting/scriptlet.nl?script=402&deploy=1&invoiceID="+invoiceID);
}
function invoiceeng(invoiceID){
  window.open("/app/site/hosting/scriptlet.nl?script=401&deploy=1&invoiceID="+invoiceID);
}
function arabicInvoice(invoiceID){
  window.open("/app/site/hosting/scriptlet.nl?script=399&deploy=1&invoiceID="+invoiceID);
}
function printVendorStatement(){
  var vendor = nlapiGetFieldValue('custrecord_vendor_statement');
  var stat_date = nlapiGetFieldValue('custrecord_vendor_statement_date');
  var currency_sel = nlapiGetFieldValue('custrecord_statement_currency');
  var currency_text = nlapiGetFieldText("custrecord_statement_currency");
  var subsi = nlapiGetFieldValue('custrecord_subsidiary_vendor_statement');
  var cur_date = nlapiGetFieldValue('custrecord_statetment_current_date');

  if(vendor == ''){
    alert("Please select the Vendor");
    return false;
  }else if(subsi == ''){
    alert("Please select the Subsidiary");
    return false;
  }else if(currency_sel == ''){
    alert("Please select the Currency");
    return false;
  }else if(stat_date == ''){
    alert("Please select the Statement Date");
    return false;
  }
  window.open("/app/site/hosting/scriptlet.nl?script=2531&deploy=1&vendor="+vendor+"&stat_date="+stat_date+"&currency_sel="+currency_sel+"&subsi="+subsi+"&cur_date="+cur_date+"&currency_text="+currency_text);
  document.getElementById("main_form").reset();
}
function printLedger(){
  var account = nlapiGetFieldValue('custrecord_ledger_account');
  var accounttext = nlapiGetFieldText("custrecord_ledger_account");
  var fromdate = nlapiGetFieldValue('custrecord_from_date');
  var todate = nlapiGetFieldValue('custrecord_to_date');
  var subsi = nlapiGetFieldValue('custrecord_ledger_report_subsidiary');
  var empledger = nlapiGetFieldValue('custrecord_get_employee_ledger');
  var empname = nlapiGetFieldValue('custrecord_ledger_employee');

  if(account == ''){
    alert("Please select the Account");
    return false;
  }else if(fromdate == ''){
    alert("Please select the From Date");
    return false;
  }else if(todate == ''){
    alert("Please select the To Date");
    return false;
  }else if(subsi == ''){
    alert("Please select the Subsidiary");
    return false;
  }else if(empledger == 'T'){
    if(empname == ''){
      alert("Please select the Employee");
      return false;
    }
  }
  window.open("/app/site/hosting/scriptlet.nl?script=279&deploy=1&account="+account+"&fromdate="+fromdate+"&todate="+todate+"&accounttext="+accounttext+"&subsi="+subsi+"&empledger="+empledger+"&empname="+empname);
  document.getElementById("main_form").reset();
  if(empledger == "T"){
    nlapiSetFieldValue("custrecord_get_employee_ledger","F");
    nlapiSetFieldDisplay("custrecord_ledger_employee",false);
  }
}
function printcreditarabic(recId){
  //window.open("/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&template=116&label=CreditNote&printtype=transaction&trantype=CustCred&id="+recId);
  window.open("/app/site/hosting/scriptlet.nl?script=503&deploy=1&creditmemoID="+recId);
}

function printcreditlh(recId){
  //window.open("/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&template=116&label=CreditNote&printtype=transaction&trantype=CustCred&id="+recId);
  window.open("/app/site/hosting/scriptlet.nl?script=343&deploy=1&creditmemoID="+recId);
}
function printVendorCredit(recid){
  window.open("/app/site/hosting/scriptlet.nl?script=284&deploy=1&recID="+recid);
}
function cancelChangeRateUnit(timesheetID){
  window.location =  "/app/common/custom/custrecordentry.nl?id="+timesheetID+"&rectype=114";
}
function printEnterBill(billId){
  window.open("/app/site/hosting/scriptlet.nl?script=286&deploy=1&recID="+billId);  
}
function printSupplierLedger(){
  var vendor = nlapiGetFieldValue('custrecord_ledger_vendor');
  var currency_sel = nlapiGetFieldValue('custrecord_ledger_currency');
  var currency_text = nlapiGetFieldText("custrecord_ledger_currency");
  var subsi = nlapiGetFieldValue('custrecord_ledger_subsidiary');
  var fromdate = nlapiGetFieldValue('custrecord_ledger_from_date');
  var todate = nlapiGetFieldValue('custrecord_ledger_to_date');
  //var balance = nlapiGetFieldValue('custrecord_ledger_balance');
  if(vendor == ''){
    alert("Please select the Vendor");
    return false;
  }else if(subsi == ''){
    alert("Please select the Subsidiary");
    return false;
  }else if(currency_sel == ''){
    alert("Please select the Currency");
    return false;
  }else if(fromdate == ''){
    alert("Please select the From Date");
    return false;
  }else if(todate == ''){
    alert("Please select the To Date");
    return false;
  }
  var d1 = nlapiStringToDate(fromdate);
  var d2 = nlapiStringToDate(todate);
  var days = inDays(d1,d2);
  if(days < 0){
    alert("From Date cannot be after To Date");
    return false;
  }
  window.open("/app/site/hosting/scriptlet.nl?script=341&deploy=1&vendor="+vendor+"&fromdate="+fromdate+"&subsi="+subsi+"&todate="+todate+"&currency_text="+currency_text+"&currency_sel="+currency_sel);
  document.getElementById("main_form").reset();
}
function printNewSupplierLedger(){
  var vendor = nlapiGetFieldValue('custrecord_ledger_vendor');
  var currency_sel = nlapiGetFieldValue('custrecord_ledger_currency');
  var currency_text = nlapiGetFieldText("custrecord_ledger_currency");
  var subsi = nlapiGetFieldValue('custrecord_ledger_subsidiary');
  var fromdate = nlapiGetFieldValue('custrecord_ledger_from_date');
  var todate = nlapiGetFieldValue('custrecord_ledger_to_date');
  //var balance = nlapiGetFieldValue('custrecord_ledger_balance');
  if(vendor == ''){
    alert("Please select the Vendor");
    return false;
  }else if(subsi == ''){
    alert("Please select the Subsidiary");
    return false;
  }else if(currency_sel == ''){
    alert("Please select the Currency");
    return false;
  }else if(fromdate == ''){
    alert("Please select the From Date");
    return false;
  }else if(todate == ''){
    alert("Please select the To Date");
    return false;
  }
  var d1 = nlapiStringToDate(fromdate);
  var d2 = nlapiStringToDate(todate);
  var days = inDays(d1,d2);
  if(days < 0){
    alert("From Date cannot be after To Date");
    return false;
  }
  window.open("/app/site/hosting/scriptlet.nl?script=2527&deploy=1&vendor="+vendor+"&fromdate="+fromdate+"&subsi="+subsi+"&todate="+todate+"&currency_text="+currency_text+"&currency_sel="+currency_sel);
  document.getElementById("main_form").reset();
}
function inDays(d1, d2) {
  var t2 = d2.getTime();
  var t1 = d1.getTime();
  return parseInt((t2-t1)/(24*3600*1000));
}
function csvImportCostcenter(recID){  
  if (confirm("Do you really Want to import costcenter??") == true) {
    window.open("/app/site/hosting/scriptlet.nl?script=344&deploy=1&recID="+recID);
  } else {
    return false;
  }
}
function makeDeposit(recID){
  window.open("/app/site/hosting/scriptlet.nl?script=394&deploy=1&recID="+recID);
  //console.log(recId);
}
///////////////////////////////////9/4/19
function printEmployeeLedger(){
  var account = nlapiGetFieldValue('custrecord_employee_ledger_account');
  var accounttext = nlapiGetFieldText("custrecord_employee_ledger_account");
  var fromdate = nlapiGetFieldValue('custrecord_employee_ledger_from_date');
  var todate = nlapiGetFieldValue('custrecord_employee_ledger_to_date');
  var subsi = nlapiGetFieldValue('custrecord_employee_ledger_subsidiary');
 // var empledger = nlapiGetFieldValue('custrecord_get_employee_ledger');
 // var empname = nlapiGetFieldValue('custrecord_ledger_employee');

  if(account == ''){
    alert("Please select the Account");
    return false;
  }else if(fromdate == ''){
    alert("Please select the From Date");
    return false;
  }else if(todate == ''){
    alert("Please select the To Date");
    return false;
  }else if(subsi == ''){
    alert("Please select the Subsidiary");
    return false;
  }
  window.open("/app/site/hosting/scriptlet.nl?script=452&deploy=1&account="+account+"&fromdate="+fromdate+"&todate="+todate+"&accounttext="+accounttext+"&subsi="+subsi);
  document.getElementById("main_form").reset();
 
}