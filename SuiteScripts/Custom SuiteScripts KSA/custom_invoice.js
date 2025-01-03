function pageInitAction(type) {
  console.log(type);
  if(type == 'create' || type == 'copy'){
    nlapiSetFieldDisplay('custbody_custom_amt_in_words',false);
    var custname = nlapiGetFieldValue('entity');
    if(custname != ''){
      var subsid = nlapiGetFieldValue('subsidiary');
      if(subsid == 1){
      nlapiSetFieldValue('custbody_bank_account',1);
    }else if(subsid == 2){
      nlapiSetFieldValue('custbody_bank_account',2);
    }
    }
  }
}
function fieldchangeAction(type,name){
	if(name == 'custbody_payment_terms'){
		var paytrms = nlapiGetFieldValue("custbody_payment_terms");
		if(paytrms){			
			var res = nlapiLoadRecord("term", paytrms);
			var duedate = res.getFieldValue("daysuntilnetdue");
			if(duedate >= 1){
				var currentDate = nlapiStringToDate(nlapiGetFieldValue('trandate'));
				var NewDueDate = nlapiDateToString(nlapiAddDays(currentDate,duedate));
				nlapiSetFieldValue('duedate', NewDueDate);
			}else{
				nlapiSetFieldValue('duedate', nlapiGetFieldValue('trandate'));
			}
		}
	}
  if(name == "entity"){
    console.log('hello');
    var subsid = nlapiGetFieldValue('subsidiary');
    console.log(subsid);
    if(subsid == 1){
      nlapiSetFieldValue('custbody_bank_account',1);
      //autoBankInfoGen(1);
    }else if(subsid == 2){
      nlapiSetFieldValue('custbody_bank_account',2);
      //autoBankInfoGen(2);
    }else if(subsid == 8){
      nlapiSetFieldValue('custbody_bank_account',4);
    }
  }
  if(name == 'custbody_include_custom_amt_words'){
    var includeamt = nlapiGetFieldValue('custbody_include_custom_amt_words');
    if(includeamt == 'T'){
      nlapiSetFieldDisplay('custbody_custom_amt_in_words',true);
    }else{
      nlapiSetFieldDisplay('custbody_custom_amt_in_words',false);
    }
  }
}
function saveRecordAction() {
var createdfrom = nlapiGetFieldValue("createdfrom");
  if(createdfrom){
    var taxsetup = TaxValidationCheck();
    if(taxsetup == 1){
      return true;
    }else{
      return false;
    }
  }else{
    return true;
  }
	return true;
}
function autoBankInfoGen(loadId){
  var bankrec = nlapiLoadRecord('customrecord_bank_details',loadId);
  var bankdetails = bankrec.getFieldValue('custrecord_all_bank_data');
  var bankid = bankrec.getFieldValue('recordid');
  nlapiSetFieldValue('custbody_bank_details',bankdetails);
  nlapiSetFieldValue('custbody_bank_account',bankid);
}
function TaxValidationCheck(){
  var lineCount = nlapiGetLineItemCount("item");
  if(lineCount > 0){
      var trandate = nlapiGetFieldValue("trandate");
      var subsidiary = nlapiGetFieldValue("subsidiary");
      if(nlapiStringToDate(trandate) >= nlapiStringToDate("1/7/2020")){
      for(var i=1; i<=lineCount; i++){
        var taxCode = nlapiGetLineItemValue('item', 'taxcode', i);
          if(taxCode != 913){
            var txt;
            var rconf = confirm("Old Tax Code is selected. Kindly re-validate the Tax Code. \nDo You Want to Proceed!!!");
            if (rconf == true) {
              return 1;
            } else {
              return 0;
            }
          }else{
            return 1;
          }
        }
      }else{
      return 1;
      }
  }else{
    return 1;
  }  
}