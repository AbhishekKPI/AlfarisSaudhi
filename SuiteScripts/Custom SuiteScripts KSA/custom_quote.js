//var monthNames = ["1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12"];
function quotePageInitAction(type){
	if(type == 'create'){
		var today = nlapiStringToDate(nlapiGetFieldValue("trandate"));
     	var newDate = nlapiDateToString(nlapiAddDays(today,10));
      	nlapiSetFieldValue('expectedclosedate',newDate);
		var lastOfMonth = nlapiDateToString(new Date(today.getFullYear(),today.getMonth()+1, 0));
      	nlapiSetFieldValue('duedate',lastOfMonth);
    }
		nlapiSetFieldDisplay("custbody_notes_terms", false);
		nlapiSetFieldDisplay("custbody_notes_terms_id", false);	
		nlapiSetFieldDisplay("custbody_inclusions_terms", false);
		nlapiSetFieldDisplay("custbody_inclusions_termsid", false);
		nlapiSetFieldDisplay("custbody_exclusion_terms", false);
		nlapiSetFieldDisplay("custbody_exclusion_terms_id", false);
  		nlapiSetFieldDisplay("custbody_thirdparty_terms", false);
		nlapiSetFieldDisplay("custbody_thirdparty_termsid", false);
  		nlapiSetFieldDisplay("custbody_aramco_terms", false);
		nlapiSetFieldDisplay("custbody_aramco_termsid", false);
  		nlapiSetFieldDisplay("custbody_marine_terms", false);
		nlapiSetFieldDisplay("custbody_marine_termsid", false);
}
function fieldChangeAction(type,name) {
	if(name == 'trandate'){	
      	var today = nlapiStringToDate(nlapiGetFieldValue("trandate"));
     	var newDate = nlapiDateToString(nlapiAddDays(today,10));
      	nlapiSetFieldValue('expectedclosedate',newDate);
		var lastOfMonth = nlapiDateToString(new Date(today.getFullYear(),today.getMonth()+1, 0));
      	nlapiSetFieldValue('duedate',lastOfMonth);
	}
	if(name == "entitystatus"){
		var status = nlapiGetFieldValue("entitystatus");
		if(status == 14){			
			nlapiSetFieldDisplay("custbody_reason_for_closed_lost", true);
		}else{
			nlapiSetFieldDisplay("custbody_reason_for_closed_lost", false);
		}
		nlapiSetFieldMandatory("custbody_reason_for_closed_lost", true);
	}
}
function quoteSaveAction() {
	var status = nlapiGetFieldValue("entitystatus");
	if(status == 14){			
		var reason = nlapiGetFieldValue("custbody_reason_for_closed_lost");
		if(reason == ""){
			alert("Please enter value(s) for: Closed lost reason");
			return false;			
		}
	}	
	
	//Notes Terms Start
	var actualTerms = '';
	var actualTermsID = '';
	var notescount = nlapiGetLineItemCount('custpage_notes_sublist');
	var inside = 0;
    
	for(var i=1; i< notescount+1; i++)
	  {
		var selectedNotes = nlapiGetLineItemValue('custpage_notes_sublist', 'custpage_noteschk', i);		
		if(selectedNotes == 'T'){
			var splter = "";
			var spltrID = "";
			if(inside == 0){
				splter = "";
				spltrID = "";
			}else{
				splter  = "|_|";
				spltrID = "_";
			}
			actualTerms += splter+nlapiGetLineItemValue('custpage_notes_sublist', 'custpage_terms', i);
			actualTermsID += spltrID+nlapiGetLineItemValue('custpage_notes_sublist', 'custpage_internalid', i);
			inside++;
		}
	  }
	  nlapiSetFieldValue("custbody_notes_terms", actualTerms);
	  nlapiSetFieldValue("custbody_notes_terms_id", actualTermsID);	
	  //Notes Terms End
	  //Inclusions Terms Start
	  var actualTerms = '';
	  var actualTermsID = '';
	  var notescount = nlapiGetLineItemCount('custpage_inclusion_sublist');
		
	  var inside = 0;
		for(var i=1; i< notescount+1; i++)
		  {
			selectedNotes = nlapiGetLineItemValue('custpage_inclusion_sublist', 'custpage_inclusionchk', i);
			if(selectedNotes == 'T'){
				var splter = "";
				var spltrID = "";
				if(inside == 0){
					splter = "";
					spltrID = "";
				}else{
					splter  = "|_|";
					spltrID = "_";
				}
				actualTerms += splter+nlapiGetLineItemValue('custpage_inclusion_sublist', 'custpage_inclusionterms', i);
				actualTermsID += spltrID+nlapiGetLineItemValue('custpage_inclusion_sublist', 'custpage_inclusion_internalid', i);
				inside++;
			}
		  }
		  nlapiSetFieldValue("custbody_inclusions_terms", actualTerms);
		  nlapiSetFieldValue("custbody_inclusions_termsid", actualTermsID);	
	  //Inclusions Terms End
	  //Exclusion Terms Start
		  var actualTerms = '';
			var actualTermsID = '';
			var notescount = nlapiGetLineItemCount('custpage_exclusion_sublist');
			
			var inside = 0;
			for(var i=1; i< notescount+1; i++)
			  {
				selectedNotes = nlapiGetLineItemValue('custpage_exclusion_sublist', 'custpage_exclusionchk', i);
				if(selectedNotes == 'T'){
					var splter = "";
					var spltrID = "";
					if(inside == 0){
						splter = "";
						spltrID = "";
					}else{
						splter  = "|_|";
						spltrID = "_";
					}
					actualTerms += splter+nlapiGetLineItemValue('custpage_exclusion_sublist', 'custpage_exclusionterms', i);
					actualTermsID += spltrID+nlapiGetLineItemValue('custpage_exclusion_sublist', 'custpage_exclusion_internalid', i);
					inside++;
				}
			  }
			  nlapiSetFieldValue("custbody_exclusion_terms", actualTerms);
			  nlapiSetFieldValue("custbody_exclusion_terms_id", actualTermsID);
	  //Exclusion Terms end
     //Third Party Terms Start
		    var actualTerms = '';
			var actualTermsID = '';
			var notescount = nlapiGetLineItemCount('custpage_thirdparty_sublist');
			
			var inside = 0;
			for(var i=1; i< notescount+1; i++)
			  {
				selectedNotes = nlapiGetLineItemValue('custpage_thirdparty_sublist', 'custpage_thirdpartychk', i);		
				if(selectedNotes == 'T'){
					var splter = "";
					var spltrID = "";
					if(inside == 0){
						splter = "";
						spltrID = "";
					}else{
						splter  = "|_|";
						spltrID = "_";
					}
					actualTerms += splter+nlapiGetLineItemValue('custpage_thirdparty_sublist', 'custpage_thirdpartyterms', i);
					actualTermsID += spltrID+nlapiGetLineItemValue('custpage_thirdparty_sublist', 'custpage_thirdpartyinternalid', i);
					inside++;
				}
			  }
			  nlapiSetFieldValue("custbody_thirdparty_terms", actualTerms);
			  nlapiSetFieldValue("custbody_thirdparty_termsid", actualTermsID);
	  //Third Party Terms end
     //Aramco Terms Start
		    var actualTerms = '';
			var actualTermsID = '';
			var notescount = nlapiGetLineItemCount('custpage_aramco_sublist');
			
			var inside = 0;
			for(var i=1; i< notescount+1; i++)
			  {
				selectedNotes = nlapiGetLineItemValue('custpage_aramco_sublist', 'custpage_aramcochk', i);		
				if(selectedNotes == 'T'){
					var splter = "";
					var spltrID = "";
					if(inside == 0){
						splter = "";
						spltrID = "";
					}else{
						splter  = "|_|";
						spltrID = "_";
					}
					actualTerms += splter+nlapiGetLineItemValue('custpage_aramco_sublist', 'custpage_aramcoterms', i);
					actualTermsID += spltrID+nlapiGetLineItemValue('custpage_aramco_sublist', 'custpage_aramcointernalid', i);
					inside++;
				}
			  }
			  nlapiSetFieldValue("custbody_aramco_terms", actualTerms);
			  nlapiSetFieldValue("custbody_aramco_termsid", actualTermsID);
	  //Aramco Terms end
      //Marine Terms Start
		    var actualTerms = '';
			var actualTermsID = '';
			var notescount = nlapiGetLineItemCount('custpage_marine_sublist');
			
			var inside = 0;
			for(var i=1; i< notescount+1; i++)
			  {
				selectedNotes = nlapiGetLineItemValue('custpage_marine_sublist', 'custpage_marinechk', i);		
				if(selectedNotes == 'T'){
					var splter = "";
					var spltrID = "";
					if(inside == 0){
						splter = "";
						spltrID = "";
					}else{
						splter  = "|_|";
						spltrID = "_";
					}
					actualTerms += splter+nlapiGetLineItemValue('custpage_marine_sublist', 'custpage_marineterms', i);
					actualTermsID += spltrID+nlapiGetLineItemValue('custpage_marine_sublist', 'custpage_marineinternalid', i);
					inside++;
				}
			  }
			  nlapiSetFieldValue("custbody_marine_terms", actualTerms);
			  nlapiSetFieldValue("custbody_marine_termsid", actualTermsID);
	  //Marine Terms end
	return true;
}
function dateConversion(tranDate){
	tranDate = tranDate.replace("-", " ");
	tranDate = tranDate.replace("-", " ");	
	return today = new Date(tranDate);
}
function validateLineAction(type) {	
	var priceLevel = nlapiGetCurrentLineItemValue('item','price');	
	if(priceLevel  == '1' || priceLevel == '-1'){
		var rate = nlapiGetCurrentLineItemValue("item", "rate");
		if(rate == ""){rate = 0;}
		var basePrice = nlapiGetCurrentLineItemValue("item", "custcol_min_base_price");	
		if(basePrice == ""){basePrice = 0;}			
		if(parseFloat(rate) < parseFloat(basePrice)){				
			alert("Quote is below minimum base price hence approval required.");
		}
	}
	return true;
}
function printonLetterheadAction() {
	var estimateId = nlapiGetFieldValue("id");	
	window.open("/app/site/hosting/scriptlet.nl?script=209&deploy=1&estID="+estimateId);
}