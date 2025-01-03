function wrProjectStatus(request, response) {
    if (request.getMethod() == 'GET') {
        var form = nlapiCreateForm('Project Status');
        var soId = request.getParameter('soId');
        var soRec = nlapiLoadRecord("salesorder", soId);
        var equipId = soRec.getFieldValue('custbody_work_order_equipments');
        var sosel = form.addField('custpage_sales', 'select', 'Sales Order', 'transaction').setDisplayType('inline').setDefaultValue(soId);
        var equipsel = form.addField('custpage_equip', 'select', 'Equipment', 'customrecord_ncfar_asset').setDisplayType('inline').setDefaultValue(equipId);
        var woArr = new Array();
        var wo = 0;
        var mainTab = form.addTab('custpage_maintab', 'Work Request');
        var woSubtab = form.addSubTab('custpage_wosubtab', 'Work Request', 'custpage_maintab');
        var woSublist = form.addSubList('custpage_wo_sublist', 'list', '', 'custpage_wosubtab');
        woSublist.addField('custpage_serialno', 'text', 'Sl No.');
        woSublist.addField('custpage_project_id', 'text', 'Project ID').setDisplayType('inline');
        woSublist.addField('custpage_project_name', 'text', 'Project Name');
        woSublist.addField('custpage_project_start_date', 'text', 'Project Start Date');
        woSublist.addField('custpage_project_calc_end_date', 'text', 'Project Calculated End Date');
        woSublist.addField('custpage_status', 'text', 'Status');
        if (equipId) {
            var col = new Array();
            var ftr = new Array();
            col[0] = new nlobjSearchColumn("entityid");
            col[1] = new nlobjSearchColumn("companyname");
            col[2] = new nlobjSearchColumn("startdate");
            col[3] = new nlobjSearchColumn("calculatedenddate");
            col[4] = new nlobjSearchColumn("entitystatus");
            ftr[0] = new nlobjSearchFilter("custentity_equipment", null, 'anyof', equipId);
            var woRes = nlapiSearchRecord('job', null, ftr, col);
            if (woRes) {
                for (var i = 0; i < woRes.length; i++) {
                    woArr[wo] = { 'custpage_serialno': (i + 1), 'custpage_project_id': woRes[i].getValue('entityid'), 'custpage_project_name': woRes[i].getValue('companyname'), 'custpage_project_start_date': woRes[i].getValue('startdate'), 'custpage_project_calc_end_date': woRes[i].getValue('calculatedenddate'), 'custpage_status': woRes[i].getText('entitystatus') };
                    wo++;
                }
                woSublist.setLineItemValues(woArr);
            }
        }
        response.writePage(form);
    }
}
