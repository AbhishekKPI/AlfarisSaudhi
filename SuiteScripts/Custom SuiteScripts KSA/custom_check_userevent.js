function beforeLoadAction(type,form,request){
  //nlapiSetFieldDisplay('entity',false);
   if (type == "create") {
        nlapiSetFieldDisplay("custbody_cheque_no", false);
        nlapiSetFieldDisplay("custbody_cheque_date", false);      
        nlapiSetFieldDisplay("custbody_tt_no", false);      
    } 
if(type == "view"){
    var recID = nlapiGetRecordId();
  	var rec = nlapiLoadRecord('check',recID);
  	var cclinecount = rec.getLineItemCount('recmachcustrecord_ref_doc_number');
	form.addButton('custpage_checkbutton','Print','printCheck('+recID+',1);');
	form.addButton('custpage_checkbutton','Print Check','printCheck('+recID+',0);');
    form.addButton('custpage_csvimport','Import Costcenter','csvImportCostcenter('+recID+');');  
    if(cclinecount >=1){
      form.addButton('custpage_printccvoucher','Print Voucher with CC','printVouchercc('+recID+');');
    }
	form.setScript('customscript_common_script');
}
  if (type == 'edit' || type == 'view') {
        var modeofpayment = nlapiGetFieldValue("custbody_mode_of_payment");
        if (modeofpayment == 1) {
            var cheque_date = nlapiGetField('custbody_cheque_date');
            cheque_date.setMandatory(true);
            var cheque_no = nlapiGetField('custbody_cheque_no');
            cheque_no.setMandatory(true);           
            nlapiSetFieldDisplay("custbody_cheque_date", true);
            nlapiSetFieldDisplay("custbody_cheque_no", true);            
            nlapiSetFieldDisplay("custbody_tt_no", false);
        } else if (modeofpayment == 3) {
            var tt_no = nlapiGetField('custbody_tt_no');
            tt_no.setMandatory(true);
            nlapiSetFieldDisplay("custbody_tt_no", true);
            nlapiSetFieldDisplay("custbody_cheque_date", false);
            nlapiSetFieldDisplay("custbody_cheque_no", false);           
        } else {
            nlapiSetFieldDisplay("custbody_tt_no", false);
            nlapiSetFieldDisplay("custbody_cheque_date", false);
            nlapiSetFieldDisplay("custbody_cheque_no", false);           
        }
    }
}
function afterSubmitAction(type) {
    var subsidiary = nlapiGetFieldValue("subsidiary");
    nlapiLogExecution('DEBUG','inside AF',subsidiary);
	if(type == "create"){
        if(subsidiary == '1'){
          var res = nlapiLoadRecord("customrecord_custom_configuration", 3);
	      var currentNo = res.getFieldValue("custrecord_current_number");
	      var genNo = +currentNo + +1;
		  nlapiSubmitField("customrecord_custom_configuration", 3, "custrecord_current_number", genNo);
        }else if(subsidiary == '2'){
          var res = nlapiLoadRecord("customrecord_custom_configuration", 4);
	      var currentNo = res.getFieldValue("custrecord_current_number");
	      var genNo = +currentNo + +1;
		  nlapiSubmitField("customrecord_custom_configuration", 4, "custrecord_current_number", genNo);
        }else if(subsidiary == '8'){
            var res = nlapiLoadRecord("customrecord_custom_configuration", 18);
            var currentNo = res.getFieldValue("custrecord_current_number");
            var genNo = +currentNo + +1;
            nlapiLogExecution('DEBUG','inside AF SUB 8 ',genNo);
            nlapiSubmitField("customrecord_custom_configuration", 18, "custrecord_current_number", genNo);
          }
    }
	return true; 
}