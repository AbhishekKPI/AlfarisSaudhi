function manageTimeSheet(request, response) {	
if (request.getMethod() == 'GET') {
	var form = nlapiCreateForm('Manage Time Sheet');
	var param = request.getParameter("raid");
	var projid = request.getParameter("projid");
    var projrec = nlapiLoadRecord('job',projid);
    var projsub = projrec.getFieldValue('subsidiary');
	var timesheetfilter =["CUSTRECORD_TIMESHEET_RA_ID.internalid","is",param];
	var timesheetres = nlapiSearchRecord('customrecord_time_sheet_header','customsearchtimesheetexist',timesheetfilter);
	var linkHtml = '';
	var printLink = '';
	var printLinklh = '';
	if(timesheetres){
			
		var resArr = new Array();
		for(var i = 0;i<timesheetres.length;i++){
			if(i == 0){
				var b =form.addField('custpage_regno', 'text','Reg. No.');
				b.setDefaultValue (timesheetres[i].getValue('custrecord_register_number'));
				b.setDisplayType('inline');
				var c =form.addField('custpage_customer', 'text','Customer');
				c.setDefaultValue (timesheetres[i].getValue('custrecord_timesheet_customer'));
				c.setDisplayType('inline');
				var d =form.addField('custpage_resource', 'text','Resource');
				d.setDefaultValue (timesheetres[i].getValue('custrecord_timesheet_resource'));
				d.setDisplayType('inline');
				var e =form.addField('custpage_minhrs', 'text','Minimum Hours');
				e.setDefaultValue (timesheetres[i].getValue('custrecord_minimum_hrs_timesheet'));
				e.setDisplayType('inline');	
				var f =form.addField('custpage_item', 'text','Item');
				f.setDefaultValue (timesheetres[i].getValue('custrecord_timesheet_item'));
				f.setDisplayType('inline' );
				var g =form.addField('custpage_rate', 'text','Rate');
				g.setDefaultValue (timesheetres[i].getValue('custrecord_timesheet_itemrate'));
				g.setDisplayType('inline');	var ii =form.addField('custpage_salesorder', 'text','Sales order');
				ii.setDefaultValue (timesheetres[i].getValue('custrecord_timesheet_salesorder'));
				ii.setDisplayType('inline');
				var j =form.addField('custpage_subsidiary', 'text','Subsidiary');
				j.setDefaultValue (timesheetres[i].getValue('custrecord_timesheet_subsidiary'));
				j.setDisplayType('inline');					
				var l =form.addField('custpage_startdate', 'text','Start Date');
				l.setDefaultValue (timesheetres[i].getValue('custrecord_timesheet_start_date'));
				l.setDisplayType('inline');
				var m =form.addField('custpage_unit', 'text','Unit');
				m.setDefaultValue (timesheetres[i].getValue('custrecord_timesheet_item_unit'));
				m.setDisplayType('inline');
			}
			var prefix = '';
			if(timesheetres[i].getValue("custrecord_timesheet_subsidiary")=='AFIHER Abu Dhabi'){
				prefix = 'I';
			}else if(timesheetres[i].getValue("custrecord_timesheet_subsidiary")=='MMGT'){
				prefix = 'M';
			}if(timesheetres[i].getValue("custrecord_timesheet_subsidiary")=='AFER Dubai'){
				prefix = 'A';
			}
			linkHtml = '<a href="/app/common/custom/custrecordentry.nl?rectype=114&id='+timesheetres[i].getValue("internalid")+'&raid='+timesheetres[i].getValue("custrecord_timesheet_ra_id")+'" class="dottedlink">'+prefix+timesheetres[i].getValue("custrecord_custom_ets_no")+'</a>';
			printLinklh = '<a target="_blank" href="/app/site/hosting/scriptlet.nl?script=237&deploy=1&ts=gen&print=1&raid='+timesheetres[i].getValue("custrecord_timesheet_ra_id")+'&sdate='+timesheetres[i].getValue('custrecord_timesheet_start_date')+'&subsi='+timesheetres[i].getValue("custrecord_timesheet_subsidiary")+'&tsid='+timesheetres[i].getValue("internalid")+'&lh=T" class="dottedlink">Print on Letterhead</a>';
			var stats = timesheetres[i].getValue("custrecord_timesheet_status");
			var statusMsg = timesheetres[i].getText("custrecord_timesheet_status");
			if(stats == '1'){
				printLink = '<a target="_blank" href="/app/site/hosting/scriptlet.nl?script=237&deploy=1&ts=gen&print=1&raid='+timesheetres[i].getValue("custrecord_timesheet_ra_id")+'&sdate='+timesheetres[i].getValue('custrecord_timesheet_start_date')+'&subsi='+timesheetres[i].getValue("custrecord_timesheet_subsidiary")+'&tsid='+timesheetres[i].getValue("internalid")+'" class="dottedlink">Print</a>';
			}else{
				printLink = '<a target="_blank" href="/app/site/hosting/scriptlet.nl?script=237&deploy=1&ts=gen&print=1&raid='+timesheetres[i].getValue("custrecord_timesheet_ra_id")+'&sdate='+timesheetres[i].getValue('custrecord_timesheet_start_date')+'&subsi='+timesheetres[i].getValue("custrecord_timesheet_subsidiary")+'&tsid='+timesheetres[i].getValue("internalid")+'" class="dottedlink">Print</a>||<a onclick="editTsDates('+timesheetres[i].getValue("internalid")+')" class="dottedlink" style="cursor:pointer;">Edit</a>';
			}
			resArr[i] = {'custpage_etsno':linkHtml,'custpage_stdate':timesheetres[i].getValue("custrecord_timesheet_start_date"),'custpage_enddate':timesheetres[i].getValue("custrecord_timesheet_enddate"),'custpage_status':statusMsg,'custpage_print':printLink,'custpage_print_lh':printLinklh};
		}
	}
	//old form.addButton('custpage_addtml_tsbtn', 'Generate Additional Timesheet', 'additionalTimesheetGen('+param+')');
	form.addButton('custpage_back_tsbtn', 'Back to Project', 'backToproject('+projid+')');
	form.addButton('custpage_addtml_tsbtn', 'Generate Additional Timesheet', 'addtnlTsGenWindow('+param+','+projsub+')');
	form.setScript('customscript_common_script');
	var mainTab = form.addTab('custpage_offshore_tab', 'Time Sheets');
    //Add a subtab to the first tab
    var notesSubTab = form.addSubTab('custpage_notes_subtab', 'Time Sheets','custpage_offshore_tab');
    var notesSublist = form.addSubList('custpage_notes_sublist','list','', 'custpage_notes_subtab');
    notesSublist.addField('custpage_etsno','text', 'ETS NO');	
    notesSublist.addField('custpage_stdate','text', 'Start Date');
    notesSublist.addField('custpage_enddate','text', 'End Date');
    notesSublist.addField('custpage_status','text', 'Status');
    notesSublist.addField('custpage_print','text', 'Action');
    notesSublist.addField('custpage_print_lh','text','Custom');
    notesSublist.setLineItemValues(resArr);    
    
    
    var mainTab = form.addTab('custpage_offshore_tab1', '');
    //Add a subtab to the first tab
    var notesSubTab = form.addSubTab('custpage_notes_subtab1', 'Time Sheets','custpage_offshore_tab1');
    var notesSublist = form.addSubList('custpage_notes_sublist1','list','', 'custpage_notes_subtab1');
    notesSublist.addField('custpage_noteschk1','checkbox', '#');
    notesSublist.addField('custpage_terms1','text', 'Terms');
    notesSublist.addField('custpage_internalid1','text', 'internalid');
	response.writePage(form);
}
	
}