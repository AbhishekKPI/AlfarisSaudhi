function pageInitAction1(type) {
	nlapiSetFieldDisplay("custbody_purchase_vouch_ijv", false);
	//nlapiDisableField("custbody_purchase_vouch_ijv", true);
	if(type == 'edit'){
		accountList('2');
		var hdnFileID = nlapiGetField('account');
		hdnFileID = hdnFileID.uifield.id;		
		valuUpdation('2',document.getElementById(hdnFileID).value);		
		if(nlapiGetFieldValue("custbody_inter_company")){
			interCompSubsidiaryUpdation('2', nlapiGetFieldValue("custbody_inter_company"));
		}
		var fieldTxt = nlapiGetFieldText("custbody_payment_method");
		if(fieldTxt == "PDC" || fieldTxt=="Cheque" || fieldTxt=="LC"){
			document.getElementById('custbody_chequeno_fs_lbl').innerHTML = 'Cheque No.<label class="uir-required-icon">*</label>';
			document.getElementById('custbody_chequedate_fs_lbl').innerHTML = 'Cheque Date.<label class="uir-required-icon">*</label>';		
			document.getElementById('custbody_chequebank_fs_lbl').innerHTML = 'Cheque Drawn On.<label class="uir-required-icon">*</label>';		
		}else{
			document.getElementById('custbody_chequeno_fs_lbl').innerHTML = 'Cheque No.';
			document.getElementById('custbody_chequedate_fs_lbl').innerHTML = 'Cheque Date.';
			document.getElementById('custbody_chequebank_fs_lbl').innerHTML = 'Cheque Drawn On.';
		}
	}else{
		nlapiSetFieldDisplay("custbody_inter_company", false);
		nlapiSetFieldDisplay("custbody_bank_ac", false);
	}
}
function fieldChangeAction1(type, name)
{
var field = nlapiGetField(name);
	if(name == "disc"){		
		var context = nlapiGetContext();
		//CFO
		var cfo = context.getRole();
		var currentLine = nlapiGetCurrentLineItemValue("apply", "disc");
		if(cfo != 41 && currentLine > 100){
			alert("Maximum allowed discount is (100.00). Use credit note for further discount.");
			nlapiSetCurrentLineItemValue("apply", "disc", "100.00");
		}
	}
	if(name == "custbody_payment_method"){
		var fieldTxt = nlapiGetFieldText("custbody_payment_method");
		if(fieldTxt == "PDC" || fieldTxt=="Cheque" || fieldTxt=="LC"){
			document.getElementById('custbody_chequeno_fs_lbl').innerHTML = 'Cheque No.<label class="uir-required-icon">*</label>';
			document.getElementById('custbody_chequedate_fs_lbl').innerHTML = 'Cheque Date.<label class="uir-required-icon">*</label>';		
			document.getElementById('custbody_chequebank_fs_lbl').innerHTML = 'Cheque Drawn On.<label class="uir-required-icon">*</label>';		
		}else{
			document.getElementById('custbody_chequeno_fs_lbl').innerHTML = 'Cheque No.';
			document.getElementById('custbody_chequedate_fs_lbl').innerHTML = 'Cheque Date.';
			document.getElementById('custbody_chequebank_fs_lbl').innerHTML = 'Cheque Drawn On.';
		}
	}
	if(name != 'amount' || name == 'disc'){
		try{
		/*var undepFld = nlapiGetField('undepfunds');
		var chkVal = undepFld.uifield[1].checked;*/

		
		
		}catch (e){
            console.log("error"+e.message);
        }
        var chkVal = true;
        var hdnFileID = nlapiGetField('account');
		hdnFileID = hdnFileID.uifield.id;

	}
	if(name == 'customer' && chkVal == true){
		console.log("chkVal inside=="+chkVal);
		try{
		//nlapiSetFieldValue("undepfunds", "T");
		}catch (e){
            console.log("error11"+e.message);
        }
		nlapiSetFieldValue(hdnFileID, "");
		nlapiSetFieldValue("custbody_inter_company", "");
		nlapiSetFieldValue("custbody_bank_ac", "");
		nlapiSetFieldDisplay("custbody_inter_company", false);
		nlapiSetFieldDisplay("custbody_bank_ac", false);
		var element =  document.getElementById('interCompSubsidiary');
		if (typeof(element) != 'undefined' && element != null)
		{
			document.getElementById("interCompSubsidiary").remove();
		}
		var element =  document.getElementById('subsidiaryBanAc');
		if (typeof(element) != 'undefined' && element != null)
		{
			document.getElementById("subsidiaryBanAc").remove();
		}
	}
	if(chkVal == true && name == 'subsidiary')
	{
		accountList(1);
	}
	if(chkVal == false && name == 'subsidiary'){
		var element =  document.getElementById('bankList');
		if (typeof(element) != 'undefined' && element != null)
		{
			document.getElementById("bankList").disabled=true;
			document.getElementById("bankList").value='';
			document.getElementById(hdnFileID).value='';
		}
	}
	if(chkVal == true && type != 'apply'  && type != 'deposit' && type != 'credit')
	{
    
		if(field.name == 'account' && field.uifield.id == "hddn_account_fs"){
			//var inAcc = nlapiGetField("inpt_account");			
			//document.getElementById("custbody_inter_company_fs")
			var accountData = nlapiGetFieldValue(field.uifield.id);// document.getElementById("hddn_account4").value;
			if(accountData){
				var record = nlapiLoadRecord('account', accountData);
				var recordVal = record.getFieldValue('custrecord_is_ic_bank_acc');
				console.log(recordVal);
				if(recordVal == "T"){					
					nlapiSetFieldDisplay("custbody_inter_company", true);
					nlapiSetFieldDisplay("custbody_bank_ac", true);
				}else{
					nlapiSetFieldDisplay("custbody_inter_company", false);
					nlapiSetFieldDisplay("custbody_bank_ac", false);
				}
			}
		}
	}
}
function accountList(typeAction) {
	var selected = '';
	var su = 0;
	if(nlapiGetFieldValue("subsidiary")){ su = nlapiGetFieldValue("subsidiary");}	
	var filter = ["subsidiary","anyof",su];
	
	var bankDetails = nlapiSearchRecord('account', 'customsearch_custom_account_list_bank',filter);
	
	console.log("chkVal su=="+su);
	var temp = '<select onchange="valuUpdation(1,this.value)"  id="bankList" style="width:189px;height:27px;" class="textbox">';
	temp += '<option style="padding:4px;" value=""></option>';
	if(bankDetails){
		for(var i=0; i<bankDetails.length; i++){
			if(typeAction == 2){
				var hdnFileID = nlapiGetField('account');
				hdnFileID = hdnFileID.uifield.id;
				var accId = document.getElementById(hdnFileID).value;
				if(accId == bankDetails[i].id){
					selected  = "selected='selected'";
				}else{
					selected  = "";
				}
			}
			temp += '<option '+selected+' style="padding:4px;"  value='+bankDetails[i].id+'>'+bankDetails[i].getValue("name")+'</option>';
		}
	}
	temp += '</select>';
	var element =  document.getElementById('bankList');
	if (typeof(element) != 'undefined' && element != null)
	{
		document.getElementById("bankList").remove();
		document.getElementById("account_fs").insertAdjacentHTML("beforeBegin",temp);
		document.getElementById("bankList").disabled=false;
		//document.getElementById("account_fs").insertAdjacentHTML("beforeBegin",temp);
	}else{
		document.getElementById("account_fs").insertAdjacentHTML("beforeBegin",temp);
		document.getElementById("account_fs").style.display="none";
    }
}

function valuUpdation(typeaction ,vals){	
	var hdnFileID = nlapiGetField('account');
	hdnFileID = hdnFileID.uifield.id;
	document.getElementById(hdnFileID).value=vals;
	//nlapiSetFieldValue(hdnFileID, value);
		var accountval = nlapiGetFieldValue("account");
		if(accountval){
			var record = nlapiLoadRecord('account', accountval);
			var recordVal = record.getFieldValue('custrecord_is_ic_bank_acc');
			if(recordVal == "T"){
				nlapiSetFieldDisplay("custbody_inter_company", true);
				nlapiSetFieldDisplay("custbody_bank_ac", true);
				var su = 0;
				if(nlapiGetFieldValue("subsidiary")){ su = nlapiGetFieldValue("subsidiary");}
				var filter = ["internalid","noneof",su];
				var interCompany = nlapiSearchRecord('subsidiary', 'customsearch_sub_internal_id',filter);
				var selected = '';
				var interCompSubsi = '<select onchange="interCompSubsidiaryUpdation(1,this.value)" id="interCompSubsidiary" style="width:281px;height:27px;" class="textbox">';	
				interCompSubsi += '<option style="padding:4px;" value=""></option>';
				if(interCompany){
					for(var i=0; i<interCompany.length; i++){
						if(typeaction == 2){
							if(nlapiGetFieldValue("custbody_inter_company") == interCompany[i].getValue("internalid")){selected = 'selected="selected"';}else{selected='';}
						}
						interCompSubsi += '<option '+selected+'  style="padding:4px;" value='+interCompany[i].getValue("internalid")+'>'+interCompany[i].getValue("namenohierarchy")+'</option>';
					}
				}
				interCompSubsi += '</select>';
				var element =  document.getElementById('interCompSubsidiary');
				if (typeof(element) != 'undefined' && element != null)
				{
					document.getElementById("interCompSubsidiary").remove();
					document.getElementById("custbody_inter_company_fs").insertAdjacentHTML("beforeBegin",interCompSubsi);
					document.getElementById("interCompSubsidiary").disabled=false;
					document.getElementById("custbody_inter_company_fs").style.display="none";
					nlapiSetFieldValue("custbody_inter_company", '');
					//document.getElementById("account_fs").insertAdjacentHTML("beforeBegin",temp);
				}else{
					document.getElementById("custbody_inter_company_fs").insertAdjacentHTML("beforeBegin",interCompSubsi);
					document.getElementById("custbody_inter_company_fs").style.display="none";
				}
				var element =  document.getElementById('subsidiaryBanAc');
				if (typeof(element) != 'undefined' && element != null)
				{
					/*document.getElementById("subsidiaryBanAc").remove();					
					document.getElementById("subsidiaryBanAc").disabled=false;			
					document.getElementById("custbody_bank_ac_fs").style.display="none";
					nlapiSetFieldValue("custbody_bank_ac", '');	
					nlapiDisableField("custbody_bank_ac", true);*/
					interCompSubsidiaryUpdation(1,0);
				}
			}else{
				nlapiSetFieldDisplay("custbody_inter_company", false);
				nlapiSetFieldDisplay("custbody_bank_ac", false);
			}
		}
}
function interCompSubsidiaryUpdation(typeaction,vals) {	 
	 nlapiSetFieldValue("custbody_inter_company", vals,null,true);
	var filter = ["subsidiary","anyof",vals];
	var subsidiaryBac = nlapiSearchRecord('account', 'customsearch_custom_account_list_bank',filter);
		var subBankList = '<select id="subsidiaryBanAc" onchange="subsidiaryBankUpdation(this.value)" style="width:281px;height:27px;" class="textbox">';	
		subBankList += '<option style="padding:4px;" value=""></option>';
		var selected = '';
		if(subsidiaryBac){
			for(var i=0; i<subsidiaryBac.length; i++){
				if(typeaction == 2){
					if(nlapiGetFieldValue("custbody_bank_ac") == subsidiaryBac[i].id){selected = 'selected="selected"';}else{selected='';}
				}
				subBankList += '<option '+selected+' style="padding:4px;"  value='+subsidiaryBac[i].id+'>'+subsidiaryBac[i].getValue("name")+'</option>';
			}
		}
		subBankList += '</select>';
		var element =  document.getElementById('subsidiaryBanAc');
		if (typeof(element) != 'undefined' && element != null)
		{
			document.getElementById("subsidiaryBanAc").remove();
			document.getElementById("custbody_bank_ac_fs").insertAdjacentHTML("beforeBegin",subBankList);
			document.getElementById("subsidiaryBanAc").disabled=false;
			//document.getElementById("account_fs").insertAdjacentHTML("beforeBegin",temp);
			document.getElementById("custbody_bank_ac_fs").style.display="none";
			nlapiSetFieldValue("custbody_bank_ac", '');
		}else{
			document.getElementById("custbody_bank_ac_fs").insertAdjacentHTML("beforeBegin",subBankList);
			document.getElementById("custbody_bank_ac_fs").style.display="none";
		}
}
function subsidiaryBankUpdation(vals) {	
	nlapiSetFieldValue("custbody_bank_ac", vals, null, true);
}

function makeIJVAction(){	
	var pvjiv = nlapiGetFieldValue("custbody_purchase_vouch_ijv");
	var fieldTxt = nlapiGetFieldText("custbody_payment_method");
	if(fieldTxt == "PDC" || fieldTxt=="Cheque" || fieldTxt=="LC"){
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
	var hdnFileID = nlapiGetField('account');
	hdnFileID = hdnFileID.uifield.id;	
	var accountData1 = nlapiGetFieldValue(hdnFileID);	
	console.log("saverecord accountData1=="+accountData1);
	if(accountData1){		
		var record = nlapiLoadRecord('account', accountData1);
		var recordVal = record.getFieldValue('custrecord_is_ic_bank_acc');
	}	
	console.log("saverecord recordVal=="+recordVal);
	if(pvjiv){
		//update
		if(recordVal == "T"){		
			var subsidiary = nlapiGetFieldValue("subsidiary");
			var toSubsidiary =  nlapiGetFieldValue("custbody_inter_company");//nlapiGetFieldValue("custbody_internal_company"); 
			//document.getElementById("hddn_account4").value;	
			var accountData2 = nlapiGetFieldValue('custbody_bank_ac');//document.getElementById("inpt_custbody_bank_ac6").value;
			var amount = nlapiGetFieldValue('total');	// document.getElementById("payment_formattedValue").value;
			//var memo = nlapiGetFieldValue("memo");
			var custName = document.getElementById("entity_display").value;
			var subsidiaryTxt =nlapiGetFieldValue("inpt_account"); 
			//var accountData1Txt =nlapiGetFieldValue("inpt_custbody_bank_ac");
			var accountData1Txt =nlapiGetFieldText("custbody_bank_ac");	
			var toSubsidiaryTxt =  nlapiGetFieldValue("inpt_custbody_inter_company");
			//var mt = nlapiGetFieldValue("tranid")+"#"+nlapiGetFieldValue("custbody_receipt_voucher_no");
			var mt = nlapiGetFieldValue("tranid");
			//var memoTxt = custName+mt"("+subsidiaryTxt+"), "+accountData1Txt+"("+toSubsidiaryTxt+")";
			var memoTxt = custName+" "+mt+" in "+toSubsidiaryTxt;

			var rec = nlapiLoadRecord('intercompanyjournalentry',pvjiv);
			rec.setFieldValue("trandate", nlapiGetFieldValue("trandate"));
			rec.setFieldValue('subsidiary', subsidiary);//MMGT first.
			rec.setFieldValue('tosubsidiary', toSubsidiary);//Subsidiary Second
			rec.setFieldValue('memo',memoTxt);
			rec.setLineItemValue('line', 'linesubsidiary', 1, subsidiary);
			rec.setLineItemValue('line', 'account', 1, accountData1);
			rec.setLineItemValue('line', 'debit', 1, amount);
			rec.setLineItemValue('line', 'memo', 1, memoTxt);			
			
			rec.setLineItemValue('line', 'linesubsidiary', 2, subsidiary);
			rec.setLineItemValue('line', 'account', 2, 386);
			rec.setLineItemValue('line', 'credit', 2, amount);
			rec.setLineItemValue('line', 'memo', 2, memoTxt);
			
			rec.setLineItemValue('line', 'linesubsidiary', 3, toSubsidiary);			
			rec.setLineItemValue('line', 'account', 3, 386);
			rec.setLineItemValue('line', 'debit', 3, amount);
			rec.setLineItemValue('line', 'memo', 3, memoTxt);			
			
			rec.setLineItemValue('line', 'linesubsidiary', 4, toSubsidiary);
			rec.setLineItemValue('line', 'account', 4, accountData2);
			rec.setLineItemValue('line', 'credit', 4, amount);
			rec.setLineItemValue('line', 'memo', 4, memoTxt);			
			nlapiSubmitRecord(rec);
		}
	}else{
		if(recordVal == "T"){
			var subsidiary = nlapiGetFieldValue("subsidiary");
			var toSubsidiary =  nlapiGetFieldValue("custbody_inter_company");//nlapiGetFieldValue("custbody_internal_company"); 
			//document.getElementById("hddn_account4").value;	
			var accountData2 = nlapiGetFieldValue('custbody_bank_ac');//document.getElementById("inpt_custbody_bank_ac6").value;
			var amount = nlapiGetFieldValue('total');	// document.getElementById("payment_formattedValue").value;
			//var memo = nlapiGetFieldValue("memo");
			
			var custName = document.getElementById("entity_display").value;
			var subsidiaryTxt =nlapiGetFieldValue("inpt_account"); 
			//var accountData1Txt =nlapiGetFieldValue("inpt_custbody_bank_ac");
			var accountData1Txt =nlapiGetFieldText("custbody_bank_ac");	
			var toSubsidiaryTxt =  nlapiGetFieldValue("inpt_custbody_inter_company");
			//var mt = nlapiGetFieldValue("tranid")+"#"+nlapiGetFieldValue("custbody_receipt_voucher_no");
			var mt = nlapiGetFieldValue("tranid");
			//var memoTxt = custName+mt"("+subsidiaryTxt+"), "+accountData1Txt+"("+toSubsidiaryTxt+")";
			var memoTxt = custName+" "+mt+" in "+toSubsidiaryTxt;
			
			var rec = nlapiCreateRecord('intercompanyjournalentry');
			rec.setFieldValue("trandate", nlapiGetFieldValue("trandate"));
			rec.setFieldValue('subsidiary', subsidiary);
			rec.setFieldValue('tosubsidiary', toSubsidiary);//Subsidiary Second
			rec.setFieldValue('memo',memoTxt);

			rec.selectNewLineItem('line');
			rec.setCurrentLineItemValue('line', 'linesubsidiary', subsidiary);//Subsidiary First
			rec.setCurrentLineItemValue('line', 'account', accountData1);
			rec.setCurrentLineItemValue('line', 'debit', amount); 
			rec.setCurrentLineItemValue('line', 'memo', memoTxt); 
			rec.commitLineItem('line'); 
			
			rec.selectNewLineItem('line');
			rec.setCurrentLineItemValue('line', 'linesubsidiary', subsidiary);
			rec.setCurrentLineItemValue('line', 'account', 386);
			rec.setCurrentLineItemValue('line', 'credit', amount);  
			rec.setCurrentLineItemValue('line', 'memo', memoTxt); 
			rec.commitLineItem('line'); 

			rec.selectNewLineItem('line');
			rec.setCurrentLineItemValue('line', 'linesubsidiary', toSubsidiary);
			rec.setCurrentLineItemValue('line', 'account', 386);
			rec.setCurrentLineItemValue('line', 'debit', amount); 
			rec.setCurrentLineItemValue('line', 'memo', memoTxt); 
			rec.commitLineItem('line'); 
			
			rec.selectNewLineItem('line');
			rec.setCurrentLineItemValue('line', 'linesubsidiary', toSubsidiary);
			rec.setCurrentLineItemValue('line', 'account', accountData2);
			rec.setCurrentLineItemValue('line', 'credit', amount); 
			rec.setCurrentLineItemValue('line', 'memo', memoTxt); 
			rec.commitLineItem('line'); 
			var pvijv = nlapiSubmitRecord(rec);
			nlapiSetFieldValue("custbody_purchase_vouch_ijv", pvijv, null, false);		
			nlapiSetFieldValue("custbody_inter_jv_id", pvijv, null, false);	
		}
	}
	return true;
}