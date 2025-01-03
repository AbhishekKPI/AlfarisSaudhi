function copyTimeSheetAction(request, response) {
	var form = nlapiCreateForm('Copy Timesheet');
	
	if (request.getMethod() == 'GET') {
		var projID  = request.getParameter("projid");
		
		var b =form.addField('custpage_proj', 'text','projid');
		b.setDefaultValue (projID);
		b.setDisplayType('hidden');
		
		var filters = ["custrecord_custom_projectid_ts","is",projID];
		var copyTs  = nlapiSearchRecord("customrecord_time_sheet_header", "customsearch_coppytimesheet", filters);
		var tsPostedArray = new Array();
		var tsresourceArray = new Array();
		var inc = 0;
		var rinc = 0;
		if(copyTs){			
			for(var i=0; i<copyTs.length; i++){
				if(copyTs[i].getValue("custrecord_timesheet_status") == 1){
					tsPostedArray[inc] = {'custpage_resource':copyTs[i].getValue("custrecord_timesheet_resource"),'custpage_tsno':copyTs[i].getValue("internalid"),'custpage_frdate':copyTs[i].getValue("custrecord_timesheet_start_date"),'custpage_todate':copyTs[i].getValue("custrecord_timesheet_start_date"),'custpage_status':copyTs[i].getValue("custrecord_timesheet_status")};
					inc++;	
				}else{
					tsresourceArray[rinc] = {'custpage_rtc_resource':copyTs[i].getValue("custrecord_timesheet_resource"),'custpage_rtc_tsno':copyTs[i].getValue("internalid"),'custpage_rtc_frdate':copyTs[i].getValue("custrecord_timesheet_start_date"),'custpage_rtc_todate':copyTs[i].getValue("custrecord_timesheet_start_date"),'custpage_rtc_status':copyTs[i].getValue("custrecord_timesheet_status")};
					rinc++;
				}						    
			}
		}
		//var tsSubTab = form.addSubTab('custpage_ts_subtab', 'Notes');
		var tsSublist = form.addSubList('custpage_ts_sublist','list','Posted Timesheets');
		tsSublist.addField('custpage_resource','text', 'Resource');
		tsSublist.addField('custpage_tsno','text', 'Timesheet#');
		tsSublist.addField('custpage_frdate','date','From Date');
		tsSublist.addField('custpage_todate','date','To Date');
		tsSublist.addField('custpage_status','text','Status');
		tsSublist.addField('custpage_copyfrom','radio','Copy from');
		tsSublist.setLineItemValues(tsPostedArray);
		
		
		//var rtsSubTab = form.addSubTab('custpage_rts_subtab', 'Notes');
		var rtsSublist = form.addSubList('custpage_rts_sublist','list','Resource Timesheets');
		rtsSublist.addField('custpage_rtc_resource','text', 'Resource');
		rtsSublist.addField('custpage_rtc_tsno','text', 'Timesheet#');
		rtsSublist.addField('custpage_rtc_frdate','date','From Date');
		rtsSublist.addField('custpage_rtc_todate','date','To Date');
		rtsSublist.addField('custpage_rtc_status','text','Status');
		rtsSublist.addField('custpage_rtc_copyfrom','checkbox','Copy To');
		rtsSublist.setLineItemValues(tsresourceArray);		
		
		form.addSubmitButton("Submit");
		response.writePage(form);		
	}
	if (request.getMethod() == 'POST') {
		var html = '';
		var postedTscount = request.getLineItemCount('custpage_ts_sublist');
		var rtsCount = request.getLineItemCount('custpage_rts_sublist');
		var errorcd  = 0;
		if(rtsCount){
			for(var i=1; i< postedTscount+1; i++)
			  {
				 var radioItem = request.getLineItemValue('custpage_ts_sublist', 'custpage_copyfrom', i);
				  
				   if(radioItem == 'T')
				   {	
					   var copyfrTsID = request.getLineItemValue('custpage_ts_sublist', 'custpage_tsno', i);
					   html += '<div>copyfrTsID '+copyfrTsID+'</div>';			   
					   errorcd = 1;
				   }
			  }				
			html += '<div>Count'+rtsCount+'</div>';
			for(var init=1;init<rtsCount+1;init++){
				var checkedItem = request.getLineItemValue('custpage_rts_sublist', 'custpage_rtc_copyfrom', init);
				if(checkedItem == 'T'){					
					var copyrsTsID = request.getLineItemValue('custpage_rts_sublist', 'custpage_rtc_tsno', init);
					html += '<div>copyrsTsID '+copyrsTsID+'</div>';
					 var filters = ["custrecord_timeseet_dtls_etsno","anyof",copyrsTsID];
					 var res = nlapiSearchRecord("customrecord_timesheet_details", "customsearch_custom_ts_details_view", filters);
					 if(res){
						 for(var k=0;k<res.length;k++){	
							 	html += '<div>TEST'+res[k].getValue("id")+'</div>';	
								nlapiDeleteRecord("customrecord_timesheet_details", res[k].getValue("id"));
							}
					 }
					 var filters = ["custrecord_timeseet_dtls_etsno","anyof",copyfrTsID];
					 var result = nlapiSearchRecord("customrecord_timesheet_details", "customsearch_custom_ts_details_view", filters);
					 if(result){
						 html += '<div>'+result.length+'</div>';
							for(var j=0;j<result.length;j++){	
								html += '<div>TET '+result[j].getValue("id")+'</div>';	
								var rec = nlapiCopyRecord('customrecord_timesheet_details', result[j].getValue("id"));
								rec.setFieldValue('custrecord_timeseet_dtls_etsno', copyrsTsID);
								nlapiSubmitRecord(rec);								
							}
							
						}
				}					
				 
			}
			
		}
		if(errorcd == 0){
			form.addField("custpage_transaction_total", "text").setDisplayType('inline').setDefaultValue("Please select copy-from time sheet and coy-to for time sheet.");
			//form.addButton("back", "Back",redirectToproj());
			response.writePage( form );			
		}else{
			var prjid = request.getParameter("custpage_proj");
			//window.location = "/app/accounting/project/project.nl?id="+prjid;
			nlapiSetRedirectURL('RECORD', 'job', prjid, true);
		}
		
	}
	
}
function redirectToproj() {
	var prjid = request.getParameter("custpage_proj");
	nlapiSetRedirectURL('RECORD', 'job', prjid, true);
}