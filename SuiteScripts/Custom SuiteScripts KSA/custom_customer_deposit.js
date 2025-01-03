function pageinitAction(type){
  if(type == 'create'){
		var hdnFileID = nlapiGetField('account');
		hdnFileID = hdnFileID.uifield.id;
      console.log(hdnFileID);
      //document.getElementById(hdnFileID).style.display = 'none';
      document.getElementById(hdnFileID).style.display="none";
      nlapiSetFieldValue('custbody_payment_method',2);
	}
  if(type == "edit"){
    nlapiSetFieldDisabled('custbody_actual_cheque_date',true);
  }
}
function fieldChangeAction(type, name)
{	
	var tt = nlapiGetField("undepfunds");
	console.log(tt);
	if(name == "custbody_payment_method"){
		var fieldTxt = nlapiGetFieldText("custbody_payment_method");
		if(fieldTxt == "PDC" || fieldTxt=="Cheque"){
			/*document.getElementById('custbody_chequeno_fs_lbl').innerHTML = 'Cheque No<label class="uir-required-icon">*</label>';
			document.getElementById('custbody_chequedate_fs_lbl').innerHTML = 'Cheque Date<label class="uir-required-icon">*</label>';		
			document.getElementById('custbody_chequebank_fs_lbl').innerHTML = 'Drawn On<label class="uir-required-icon">*</label>';*/
            nlapiSetFieldMandatory('custbody_chequeno', true);
            nlapiSetFieldMandatory('custbody_chequedate', true);
            nlapiSetFieldMandatory('custbody_chequebank', true);
		}else{
			/*document.getElementById('custbody_chequeno_fs_lbl').innerHTML = 'Cheque No';
			document.getElementById('custbody_chequedate_fs_lbl').innerHTML = 'Cheque Date';
			document.getElementById('custbody_chequebank_fs_lbl').innerHTML = 'Drawn On';*/
            nlapiSetFieldMandatory('custbody_chequeno', false);
            nlapiSetFieldMandatory('custbody_chequedate', false);
            nlapiSetFieldMandatory('custbody_chequebank', false);
		}
    }
  if(name == 'custbody_actual_cheque_date'){
    var act_date = nlapiGetFieldValue('custbody_actual_cheque_date');
    nlapiSetFieldValue('custbody_chequedate',act_date);
  }
  if(name == "custbody_pdc_receipt"){			
		var pdcrecipt = nlapiGetFieldValue("custbody_pdc_receipt");
		if(pdcrecipt == "T"){
			nlapiSetFieldValue("custbody_pdc_deposit_tobank", "F",true);			
		}
	}
	
	if(name == "custbody_pdc_deposit_tobank"){			
		var pdcrecipt = nlapiGetFieldValue("custbody_pdc_deposit_tobank");
		if(pdcrecipt == "T"){
			nlapiSetFieldValue("custbody_pdc_receipt", "F",true);			
		}
	}	
  
}
function  saveRecordAction(){
  var flag = 0;
	var fieldTxt = nlapiGetFieldText("custbody_payment_method");
if(fieldTxt == "PDC" || fieldTxt=="Cheque"){
	var chqeno = nlapiGetFieldValue("custbody_chequeno");		
	var chqDate = nlapiGetFieldValue("custbody_chequedate");
	var drawnOn = nlapiGetFieldValue('custbody_chequebank');
	if(chqeno == ''){
		alert("Please enter cheque number");			
		return false;
	}else if(chqDate == ''){
		alert("Please enter cheque date");	
		return false;
	}else if(drawnOn == ''){
		alert("Please enter cheque drawn on");
		return false;
	}	
}
  var pdc = nlapiGetFieldValue("custbody_pdc_receipt");
var undepf = nlapiGetFieldValue("undepfunds");
	if(pdc == 'T'){
		if(undepf == 'T'){
			return true;
		}else{
			alert("Please select UNDEP. FUNDS");
			return false;
		}
	}else if(pdc == 'F'){
		if(undepf == 'F'){
			return true;
		}else{
			alert("Please select ACCOUNT");
			return false;
		}
	}
}
