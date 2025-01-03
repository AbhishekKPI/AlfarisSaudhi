function beforeLoadAction(type, form, request){
  nlapiSetFieldDisplay("custrecord_ledger_employee",false);
  form.addButton('custpage_testbutton', 'Print Ledger', 'printLedger();');
  form.setScript('customscript_common_script');
}