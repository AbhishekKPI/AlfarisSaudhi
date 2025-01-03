function beforeLoadAction(type,form,request){			
   if (type == "create") {
     nlapiSetFieldDisplay("custbody_cheque_no", false);
     nlapiSetFieldDisplay("custbody_cheque_date", false);        
     nlapiSetFieldDisplay("custbody_tt_no", false);
     nlapiSetFieldDisplay("printvoucher", false);
     nlapiSetFieldDisplay("tobeprinted", false);     
     nlapiSetFieldValue("tobeprinted", "F");
     
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
  if(type == 'view'){
    var recId = nlapiGetRecordId();
    form.addButton('custpage_printbutton','Print Check','printcheck('+recId+');');
    form.setScript('customscript_common_script');
  }
}
function afterSubmitAction(type) {
    var subsidiary = nlapiGetFieldValue("subsidiary");
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
      nlapiSubmitField("customrecord_custom_configuration", 18, "custrecord_current_number", genNo);
        }

        /////////////////////////////////////////////////////////
        var custbody_purchase_vouch_ijv = nlapiGetFieldValue("custbody_purchase_vouch_ijv");
         var recID = nlapiGetRecordId();
    if(custbody_purchase_vouch_ijv){
      nlapiSubmitField("vendorpayment", recID, "custbody_inter_jv_id", custbody_purchase_vouch_ijv);
    }
///////////////////////////////////////////////////////////

    }

  
  if(type == "edit"){
    var recID = nlapiGetRecordId();
    var customID = nlapiGetFieldValue("custbody_custom_id");
    if(customID){
    	nlapiSubmitField("vendorpayment", recID, "tobeprinted", "F");
     	nlapiSubmitField("vendorpayment", recID, "tranid", customID);
    }
  }
	return true;
}