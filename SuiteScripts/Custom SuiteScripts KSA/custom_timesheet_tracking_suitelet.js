function timesheetTracking(request, response) {
	var form = nlapiCreateForm('Timesheet Tracking');
	form.setScript('customscriptcustom_ts_setscript_client'); 
if (request.getMethod() == 'GET') {	
	form.addSubmitButton("Filter");
	var kk = form.addField("custpage_tsnumber", "text", "Timesheet #");	
	var ll = form.addField("custpage_invnumber", "text", "Invoice #");	

	var srchRes = nlapiSearchRecord("transaction", "customsearch_invoiced_ts_tracking");
	var no = 0;
	var notesArray = new Array();	
		if(srchRes){
			for(var i = 0;i<srchRes.length;i++){				
				notesArray[no] = {'custpage_internalid':srchRes[i].getValue("tranid"),'custpage_ets_no':srchRes[i].getValue("custcol_ts_number"),'custpage_equipment':srchRes[i].getValue("custcol_ts_equipment"),'custpage_unit':srchRes[i].getValue("custcol_ts_units"),'custpage_subsidiary':srchRes[i].getText("SUBSIDIARYNOHIERARCHY")};
				no++;
			}
		}	
	var mainTab = form.addTab('custpage_offshore_tab', 'Timesheets');
	//Add a subtab to the first tab
	var notesSubTab = form.addSubTab('custpage_notes_subtab', 'Details','custpage_offshore_tab');
	var notesSublist = form.addSubList('custpage_notes_sublist','list','', 'custpage_notes_subtab');
	notesSublist.addField('custpage_internalid','text', 'Invoice#');	    
	notesSublist.addField('custpage_ets_no','text', 'Timesheet #');
	notesSublist.addField('custpage_equipment','text', 'Equipment');
	notesSublist.addField('custpage_unit','text', 'Unit');
	notesSublist.addField('custpage_subsidiary','text', 'subsidiary');	
	notesSublist.setLineItemValues(notesArray);
}
if (request.getMethod() == 'POST') {
	
	var tsnumber = request.getParameter("custpage_tsnumber");
	var invnumber = request.getParameter("custpage_invnumber");
	var filter = "";
	if(tsnumber != "" && invnumber != ""){
		filter = [["custcol_ts_number","is",tsnumber],'AND',["tranid","is",invnumber]];
	}else if(tsnumber != ""){
		filter = ["custcol_ts_number","is",tsnumber];
	}else if(invnumber != ""){
		filter = ["tranid","is",invnumber];
	}else{
		filter = [""];
	}	
	form.addButton("custpage_backtopage_btn", "Back", 'backTotimsheetTrack()');
	var srchRes = nlapiSearchRecord("transaction", "customsearch_invoiced_ts_tracking",filter);
	var no = 0;
	var notesArray = new Array();	
		if(srchRes){
			for(var i = 0;i<srchRes.length;i++){				
				notesArray[no] = {'custpage_internalid':srchRes[i].getValue("tranid"),'custpage_ets_no':srchRes[i].getValue("custcol_ts_number"),'custpage_equipment':srchRes[i].getValue("custcol_ts_equipment"),'custpage_unit':srchRes[i].getValue("custcol_ts_units"),'custpage_subsidiary':srchRes[i].getText("SUBSIDIARYNOHIERARCHY")};
				no++;
			}
		}	
	var mainTab = form.addTab('custpage_offshore_tab', 'Timesheets');
	//Add a subtab to the first tab
	var notesSubTab = form.addSubTab('custpage_notes_subtab', 'Details','custpage_offshore_tab');
	var notesSublist = form.addSubList('custpage_notes_sublist','list','', 'custpage_notes_subtab');
	notesSublist.addField('custpage_internalid','text', 'Invoice#');	    
	notesSublist.addField('custpage_ets_no','text', 'Timesheet #');
	notesSublist.addField('custpage_equipment','text', 'Equipment');
	notesSublist.addField('custpage_unit','text', 'Unit');
	notesSublist.addField('custpage_subsidiary','text', 'subsidiary');
	notesSublist.setLineItemValues(notesArray);
}
response.writePage(form);
}