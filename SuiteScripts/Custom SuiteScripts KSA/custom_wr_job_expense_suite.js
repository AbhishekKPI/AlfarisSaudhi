function wrProjectExpenseList(request, response) {
    if (request.getMethod() == 'GET') {
        var form = nlapiCreateForm('PROJECT EXPENSE REPORT');
        var jobId = request.getParameter('jobId');
        var res = nlapiLoadRecord("job", jobId);
        var equipText = res.getFieldText('custentity_equipment');
        form.addButton('custpage_button_expense', 'Print', "printJobExpReport(" + jobId + ")");
        var jobsel = form.addField('custpage_sales', 'select', 'Project', 'job').setDisplayType('inline').setDefaultValue(jobId);
        var equipmnt = form.addField('custpage_equip', 'text', 'Equipment').setDisplayType('inline').setDefaultValue(equipText);
        var woArr = new Array();
        var wo = 0;
        var totalestcost = 0;
        var mainTab = form.addTab('custpage_maintab', 'Expense');
        var sublist = form.addSubList('custpage_main_sublist', 'list', 'Expense Report', 'custpage_maintab');
        sublist.addField('custpage_name', 'text', 'Name');
        sublist.addField('custpage_designation', 'text', 'Designation');
        sublist.addField('custpage_cat', 'text', 'Category');
        sublist.addField('custpage_date', 'text', 'Date');
        sublist.addField('custpage_amount', 'text', 'Amount');
        var col = new Array();
        var ftr = new Array();
        col[0] = new nlobjSearchColumn("altname", "employee");
        col[1] = new nlobjSearchColumn("trandate");
        col[2] = new nlobjSearchColumn("amount");
        col[3] = new nlobjSearchColumn("title", "employee");
        col[4] = new nlobjSearchColumn("expensecategory");
        ftr[0] = new nlobjSearchFilter("type", null, 'anyof', 'ExpRept');
        ftr[1] = new nlobjSearchFilter("mainline", null, 'is', 'F');
        ftr[2] = new nlobjSearchFilter("internalid", "customer", 'anyof', jobId);
        var woRes = nlapiSearchRecord('expensereport', null, ftr, col);
        if (woRes) {
            var laborcost = 0;
            for (var i = 0; i < woRes.length; i++) {
                var row = i + 1;
                var empName = woRes[i].getValue('altname', "employee");
                var trandate = woRes[i].getValue('trandate');
                var amnt = woRes[i].getValue('amount');
                var designation = woRes[i].getValue('title', "employee");
                var category = woRes[i].getText('expensecategory');
                sublist.setLineItemValue('custpage_name', row, empName);
                sublist.setLineItemValue('custpage_designation', row, designation);
                sublist.setLineItemValue('custpage_cat', row, category);
                sublist.setLineItemValue('custpage_date', row, trandate);
                sublist.setLineItemValue('custpage_amount', row, amnt);
            }
        }
        response.writePage(form);
        form.setScript('customscript_wr_namechange_client');
    }
}
