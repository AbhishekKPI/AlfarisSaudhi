function pageInitAction(type) { 
  if(type == 'copy'){
    if(nlapiGetFieldValue("entity")){
      nlapiSetFieldValue("custbody_vendor_not_prjctresource", nlapiGetFieldValue("entity"),false);
    }
  }
	nlapiSetFieldDisplay("entity", false);
}
function fieldChangeAction(type,name) {	
	if(name === "custbody_vendor_not_prjctresource"){		
		nlapiSetFieldValue("entity", nlapiGetFieldValue("custbody_vendor_not_prjctresource"),false);
	}
   if(type == "expense"){
		if(name == "account"){
			var accountID = nlapiGetCurrentLineItemValue("expense", "account");
			var lineIndex = nlapiGetCurrentLineItemIndex("expense");
			if(accountID == 207 || accountID == 208 || accountID == 296){
				nlapiSetLineItemDisabled("expense", "customer", true, lineIndex);
              	nlapiSetLineItemDisabled("expense", "custcol_employee", false, lineIndex);
			}else{
				nlapiSetLineItemDisabled("expense", "customer", false, lineIndex);
              	nlapiSetLineItemDisabled("expense", "custcol_employee", true, lineIndex);
			}
			
		}
	}
}

function validateLineAction(type) {
	var boolComplete = true;
	var accountID = nlapiGetCurrentLineItemValue("expense", "account");
	if(accountID == 207 || accountID == 208 || accountID == 296){
		var employee = nlapiGetCurrentLineItemValue("expense", "custcol_employee");
		if(employee){
			 boolComplete = true;
		}else{
			alert("Please enter value(s) for: Employee");
			 boolComplete = false;
		}
	}else{
		nlapiSetCurrentLineItemValue("expense", "custcol_employee", "");		
		boolComplete = true;		 
	}
	return boolComplete;
}

/*function saveRecordAction() { 		
	var expenseLnCnt = nlapiGetLineItemCount("expense");
	var amount = 0;
	for(var i=0; i<expenseLnCnt; i++){
		var iscostcenter = nlapiGetLineItemValue("expense", "custcol_is_cost_center", (i+1));
		if(iscostcenter == 'T'){
			amount = +amount + +nlapiGetLineItemValue("expense", "amount",(i+1));
		}		
	}
	var actualAmount = 0;
	var internalID = nlapiGetFieldValue("id");
	if(amount != 0 && internalID != ""){
		var filter = ["custrecord_ref_doc_number","anyof",internalID];	
		var res = nlapiSearchRecord("customrecord_cost_center", "customsearch_cost_center_sumof_amount",filter);
		console.log(res);
		if(res != null){			
			actualAmount = res[0].getValue("custrecord_cost_center_amount",null,"sum");
		}		
		if(amount == actualAmount){
			return true;
		}else{
			alert("Cost center mismatch occured");
			return false;
		}
	}	
	return true;
}*/
function saveRecordAction() {
  var recID = nlapiGetFieldValue("id");
  if(recID){
	//nlapiSetFieldValue("custbody_cost_center_mismatch", "F");
	var fieldTxt = nlapiGetFieldText("custbody_payment_method");
	var chqDate = nlapiGetFieldValue("custbody_chequedate");
	if(chqDate == '' && fieldTxt == "Cheque"){
		alert("Please enter value(s) for: Cheque date");	
		return false;
	}
	var expenseLnCnt = nlapiGetLineItemCount("expense");
	var amount = 0;
	for(var i=0; i<expenseLnCnt; i++){
		var iscostcenter = nlapiGetLineItemValue("expense", "custcol_is_cost_center", (i+1));
		var lineitemAcc = nlapiGetLineItemValue("expense", "account", (i+1));
		var lineitemAmnt = nlapiGetLineItemValue("expense", "amount", (i+1));
		if(iscostcenter == 'T'){
			var costCnt  = nlapiGetLineItemCount("recmachcustrecord_ref_doc_number");
			for(var j=0;j<costCnt;j++){
				var accCost = nlapiGetLineItemValue("recmachcustrecord_ref_doc_number", "custrecord_cost_center_account", (j+1));
				console.log(accCost +"=="+ lineitemAcc);
				if(accCost == lineitemAcc){
					amount = +amount + +nlapiGetLineItemValue("recmachcustrecord_ref_doc_number", "custrecord_cost_center_amount",(j+1));
				}
			}
			console.log(lineitemAmnt +" != " + amount);
			if(lineitemAmnt != amount){
				alert("Cost Center mismatch");
				return false;
			//console.log("costCnt"+costCnt);
			//amount = +amount + +nlapiGetLineItemValue("expense", "amount",(i+1));
		}		
	}  
				//nlapiSetFieldValue("custbody_cost_center_mismatch", "T");
	}
  }
	/*var actualAmount = 0;
	var internalID = nlapiGetFieldValue("id");
	if(amount != 0 && internalID != ""){
		var filter = ["custrecord_ref_doc_number","anyof",internalID];	
		var res = nlapiSearchRecord("customrecord_cost_center", "customsearch_cost_center_sumof_amount",filter);
		console.log(res);
		if(res != null){			
			actualAmount = res[0].getValue("custrecord_cost_center_amount",null,"sum");
		}		
		if(amount == actualAmount){
			return true;
		}else{
			alert("Cost center mismatch occured");
			return false;
		}
	}	*/
	return true;
}