function wrJobDemandBulletin(request, response) {
    if (request.getMethod() == 'GET') {
        var form = nlapiCreateForm('All Projects Demand Bulletin');
        var soId = request.getParameter('soId');
        var soRec = nlapiLoadRecord("salesorder", soId);
        var equipId = soRec.getFieldValue('custbody_work_order_equipments');
        var equipsel = form.addField('custpage_equip', 'select', 'Equipment', 'customrecord_ncfar_asset').setDisplayType('inline').setDefaultValue(equipId);
        var mainTab = form.addTab('custpage_maintab', 'Work Request');
        var woSubtab = form.addSubTab('custpage_wosubtab', 'Work Request', 'custpage_maintab');
        var woSublist = form.addSubList('custpage_wo_sublist', 'list', '', 'custpage_wosubtab');
        //woSublist.addField('custpage_serialno', 'text', 'Sl No.');
        // woSublist.addField('custpage_project_id', 'text', 'Project ID');
        woSublist.addField('custpage_project_id', 'select', 'Project', 'job').setDisplayType('inline');
        woSublist.addField('custpage_so', 'text', 'SO');
        woSublist.addField('custpage_so_date', 'text', 'SO Date');
        woSublist.addField('custpage_item_qty', 'text', 'Item Quantity');
        woSublist.addField('custpage_fulfill_qty', 'text', 'Fulfilled Quantity');
        woSublist.addField('custpage_remaining_qty', 'text', 'Remaining Quantity');
        if (equipId) {
            ////////Get Projects//////////////////////
            var col = new Array();
            var ftr = new Array();
            col[0] = new nlobjSearchColumn("custcol_project_ref");
            ftr[0] = new nlobjSearchFilter("type", null, 'anyof', 'SalesOrd');
            ftr[1] = new nlobjSearchFilter("customform", null, 'anyof', 168);
            ftr[2] = new nlobjSearchFilter("custcol_project_ref", null, 'noneof', '@NONE@');
            ftr[3] = new nlobjSearchFilter("internalidnumber", null, 'equalto', soId);
            var wrprojectsearch = nlapiSearchRecord('salesorder', null, ftr, col);
            //nlapiLogExecution("DEBUG", "wrprojectsearch=================", JSON.stringify(wrprojectsearch));
            if (wrprojectsearch) {
                var woArr = new Array();
                var wo = 0;
                for (var j = 0; j < wrprojectsearch.length; j++) {
                    var projectInId = wrprojectsearch[j].getValue("custcol_project_ref");
                    // nlapiLogExecution("DEBUG", "projectInId=================", projectInId);
                    ////////////////Get Demand Bulletin Details/////////////////////
                    var cols = new Array();
                    var filter = new Array();
                    cols[0] = new nlobjSearchColumn("internalid", "jobMain");
                    cols[1] = new nlobjSearchColumn("tranid");
                    cols[2] = new nlobjSearchColumn("trandate");
                    cols[3] = new nlobjSearchColumn("quantity");
                    cols[4] = new nlobjSearchColumn("quantityshiprecv");
                    cols[5] = new nlobjSearchColumn("formulanumeric");
                    cols[5].setFormula("{quantity}-{quantityshiprecv}");
                    
                    filter[0] = new nlobjSearchFilter("internalid", "jobmain", 'anyof', projectInId);
                    filter[1] = new nlobjSearchFilter("shipping", null, 'is', 'F');
                    filter[2] = new nlobjSearchFilter("cogs", null, 'is', projectInId);
                    filter[3] = new nlobjSearchFilter("internalid", "jobmain", 'anyof', projectInId);
                    filter[4] = new nlobjSearchFilter("mainline", null, 'is', 'F');
                    filter[5] = new nlobjSearchFilter("taxline", null, 'is', 'F');
                    var woRes = nlapiSearchRecord('salesorder', null, filter, cols);
                    //nlapiLogExecution("DEBUG", "woRes=================", JSON.stringify(woRes));
                    if (woRes) {
                        for (var i = 0; i < woRes.length; i++) {
                            nlapiLogExecution("DEBUG", "i=================", i);
                            woArr[wo] = { 'custpage_project_id': woRes[i].getValue('internalid', 'jobMain'), 'custpage_so': woRes[i].getValue('tranid'), 'custpage_so_date': woRes[i].getValue('trandate'), 'custpage_item_qty': woRes[i].getValue('quantity'), 'custpage_fulfill_qty': woRes[i].getValue('quantityshiprecv'), 'custpage_remaining_qty': woRes[i].getValue('formulanumeric') };
                            wo++;
                        }
                        woSublist.setLineItemValues(woArr);
                    }
                }
            }
        }
        response.writePage(form);
    }
}
