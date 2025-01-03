function beforeLoadAction(type,name) {	
	var currentContext = nlapiGetContext(); 	
	if( (currentContext.getExecutionContext() == 'userinterface') && (type == 'edit' || type == 'view'))
	{
		form.addButton('custpage_copy_timesheet', 'Copy Timesheet', 'coreCopyTimeSheetAction()');
                var subsidiary = nlapiGetFieldValue("subsidiary");
		var rec  = nlapiLoadRecord("subsidiary", subsidiary);		
		var parnetsub = rec.getFieldValue("custrecord_is_energy");
		
		
			var projID  = nlapiGetFieldValue("id");	
			var filter = ["job.internalid","anyof",projID];
			var resOut = nlapiSearchRecord('resourceallocation','customsearch_resource_details_subtab',filter);
			var resourceArray = new Array();
			var operatorArray = new Array();
			var isreso = 0;
			var isequip = 0;
			var linkHtml = '';			
			if(resOut){
				for(var i=0;i<resOut.length;i++){
					if(resOut[i].getValue("custrecord_timesheet_ra_id","CUSTRECORD_TIMESHEET_RA_ID","min")){
						if(parnetsub != 'T'){
							linkHtml = '<a href="/app/site/hosting/scriptlet.nl?script=244&deploy=1&projid='+resOut[i].getValue("internalid","job","min")+'&raid='+resOut[i].getValue("id",null,"min")+'" class="dottedlink">Manage Time Sheet</a>';	}else{	linkHtml = '<a target="_blank" href="/app/site/hosting/scriptlet.nl?script=144&deploy=1&raid='+resOut[i].getValue("id",null,"min")+'" class="dottedlink">Print</a>';
						}
						
					}else{
						if(parnetsub != 'T'){
							//old linkHtml = '<a href="/app/site/hosting/scriptlet.nl?script=134&deploy=1&projid='+resOut[i].getValue("internalid","job","min")+'&raid='+resOut[i].getValue("id",null,"min")+'" class="dottedlink">Generate Time Sheet</a>||<a onclick="generateTimsheet('+resOut[i].getValue("internalid","job","min")+','+resOut[i].getValue("id",null,"min")+')" class="dottedlink">Test Generate</a>';
							linkHtml = '<a onclick="generateTimsheet('+resOut[i].getValue("internalid","job","min")+','+resOut[i].getValue("id",null,"min")+','+subsidiary+')" class="dottedlink" style="cursor:pointer;">Generate Time Sheet</a>';
						}else{
							linkHtml = '<a target="_blank" href="/app/site/hosting/scriptlet.nl?script=144&deploy=1&raid='+resOut[i].getValue("id",null,"min")+'" class="dottedlink">Print</a>';
							
						}
					}
					if(resOut[i].getValue("isjobresource","employee","min") == 'F'){
				resourceArray[isreso] = {'custpage_ra_id':resOut[i].getValue("id",null,"min"),'custpage_ra_resource':resOut[i].getValue("resource",null,"min"),'custpage_ra_projid':resOut[i].getValue("internalid","job","min"),'custpage_ra_project':resOut[i].getValue("company",null,"min"),'custpage_ra_item':resOut[i].getValue("custevent_service_item_so",null,"min"),'custpage_ra_unit':resOut[i].getValue("custevent_ra_sales_unit",null,"min"),'custpage_ra_itemrate':resOut[i].getValue("custevent_item_rate",null,"min"),'custpage_ra_action':linkHtml};
				isreso++;
					}else{
						operatorArray[isequip] = {'custpage_ra_idscnd':resOut[i].getValue("id",null,"min"),'custpage_ra_resourcescnd':resOut[i].getValue("resource",null,"min"),'custpage_ra_projidscnd':resOut[i].getValue("internalid","job","min"),'custpage_ra_projectscnd':resOut[i].getValue("company",null,"min"),'custpage_ra_itemscnd':resOut[i].getValue("custevent_service_item_so",null,"min"),'custpage_ra_unitscnd':resOut[i].getValue("custevent_ra_sales_unit",null,"min"),'custpage_ra_itemratescnd':resOut[i].getValue("custevent_item_rate",null,"min"),'custpage_ra_actionscnd':linkHtml};						
						isequip++;
					}
					
				}
			}
			
			if(parnetsub != 'T'){
				 var notesSubTab = form.addSubTab('custpage_radets_subtab', 'Resource Details','resources');
				    var radetSublist = form.addSubList('custpage_radetails_sublist','list','', 'custpage_radets_subtab');
				    radetSublist.addField('custpage_ra_id','text', 'Ra ID');
				    radetSublist.addField('custpage_ra_resource','text', 'Resource');
				    radetSublist.addField('custpage_ra_projid','text', 'Project ID');
				    radetSublist.addField('custpage_ra_project','text', 'Project');	    
				    radetSublist.addField('custpage_ra_item','text', 'Item');
				    radetSublist.addField('custpage_ra_unit','text', 'Unit');
				    radetSublist.addField('custpage_ra_itemrate','text', 'Item Rate');
				    radetSublist.addField('custpage_ra_action','text', 'Action');
				    radetSublist.setLineItemValues(resourceArray);
				    
				    var notesSubTabscnd = form.addSubTab('custpage_radets_subtabsecond', 'Operator Details','resources');
				    var radetSublistscnd = form.addSubList('custpage_radetails_sublistscnd','list','', 'custpage_radets_subtabsecond');
				    radetSublistscnd.addField('custpage_ra_idscnd','text', 'Ra ID');
				    radetSublistscnd.addField('custpage_ra_resourcescnd','text', 'Resource');
				    radetSublistscnd.addField('custpage_ra_projidscnd','text', 'Project ID');
				    radetSublistscnd.addField('custpage_ra_projectscnd','text', 'Project');	    
				    radetSublistscnd.addField('custpage_ra_itemscnd','text', 'Item');
				    radetSublistscnd.addField('custpage_ra_unitscnd','text', 'Unit');
				    radetSublistscnd.addField('custpage_ra_itemratescnd','text', 'Item Rate');
				    radetSublistscnd.addField('custpage_ra_actionscnd','text', 'Action');
				    radetSublistscnd.setLineItemValues(operatorArray);
			}else{
				 var notesSubTab = form.addSubTab('custpage_radets_subtab', 'Delivery Notes','resources');
				    var radetSublist = form.addSubList('custpage_radetails_sublist','list','', 'custpage_radets_subtab');
				    radetSublist.addField('custpage_ra_id','text', 'Ra ID');
				    radetSublist.addField('custpage_ra_resource','text', 'Resource');
				    radetSublist.addField('custpage_ra_projid','text', 'Project ID');
				    radetSublist.addField('custpage_ra_project','text', 'Project');	 				 
				    radetSublist.addField('custpage_ra_action','text', 'Action');
				    radetSublist.setLineItemValues(resourceArray);
				    
			}
			   
			
		
	}
	form.setScript('customscript_custom_project_clientscript');
	    
}
