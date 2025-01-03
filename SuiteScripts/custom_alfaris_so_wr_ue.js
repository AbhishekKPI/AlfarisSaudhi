function beforeLoadWRAction(type, form, request) {
    if (type == "create" || type == "copy" || type == "edit") {
        var customform = nlapiGetFieldValue('customform');
              nlapiLogExecution("DEBUG","customform=====",customform);

       if(customform==159){
            nlapiSetFieldValue('custbody_record_type', 5, null, true);
      
        }else if(customform==160){
            nlapiSetFieldValue('custbody_record_type', 2, null, true);
      
        }
      
        var recType = nlapiGetFieldValue('custbody_record_type');
        nlapiLogExecution("DEBUG","recType=====",recType);
        if (recType == 1 || recType == 4 || recType == 5) {
            form.setScript('customscript_wr_namechange_client');
        }
    }

    if (type == "edit") {//freeze job end date
        var recid = nlapiGetRecordId();
        var soRec = nlapiLoadRecord("salesorder", recid);
        var soRecType = soRec.getFieldValue('custbody_record_type');
        if (soRecType == 1) {//cd
            var allowjobFlag = false;
            var showCreateProbtnEd = false;
            var lnCnt = soRec.getLineItemCount("item");
            var roleID = nlapiGetRole();
            var procWr = soRec.getFieldValue('custbody_process_work_request');
            for (var k = 1; k <= lnCnt; k++) {
                var createpr = soRec.getLineItemValue('item', 'custcol_create_project', k);
                var approveJob = soRec.getLineItemValue('item', 'custcol_allow_job_creation', k);
                var projectCreated = soRec.getLineItemValue('item', 'custcol_project_ref', k);
                if (createpr == 'T' && (approveJob != '' || approveJob == null || approveJob == 'F') && (projectCreated == '' || projectCreated == null) && soRecType == 1) {
                    allowjobFlag = true;
                }
            }
            if (allowjobFlag == true) {
                nlapiGetField('custbody_custom_end_date').setDisplayType('disabled');
            }
        }
    }
    if (type == "create") {
        var customform = nlapiGetFieldValue('customform');
        var soRecType = nlapiGetFieldValue('custbody_record_type');
        if (customform == 143 || customform == 160) {//Demand bulletin CD /ED form
            try {
                //form.setScript('customscript_wr_namechange_client');
                var projectDmId = request.getParameter("projectDMId");
                var jobRec = nlapiLoadRecord("job", projectDmId);
                var customer = jobRec.getFieldValue('parent');
                var subsidiary = jobRec.getFieldValue('subsidiary');
                var currency = jobRec.getFieldValue('currency');
               // var prjEquip = jobRec.getFieldValue('custentity_equipment');
                var prjEquip = jobRec.getFieldValue('custentity_ed_equipment');
                nlapiSetFieldValue('tranid', '');
                nlapiSetFieldValue('entity', customer);
                nlapiSetFieldValue('job', projectDmId);
             
                nlapiSetFieldValue('subsidiary', subsidiary);
                nlapiSetFieldValue('currency', currency);
                if(customform == 160){//if ED form
                    var prjEquip = jobRec.getFieldValue('custentity_ed_equipment');
                    nlapiSetFieldValue('custbody_ed_work_order_equipments', prjEquip);
                }else{
                    if(prjEquip){
                        nlapiSetFieldValue('custbody_ed_work_order_equipments', prjEquip);
                    }
                }
            } catch (err) {
                nlapiLogExecution("DEBUG", "err----------------");
            }
        }
    }
    if (type == "view") {
        var recid = nlapiGetRecordId();
        var soRec = nlapiLoadRecord("salesorder", recid);
        var customform = soRec.getFieldValue('customform');
        var soRecType = soRec.getFieldValue('custbody_record_type');
        var equipId = soRec.getFieldValue('custbody_work_order_equipments');
        nlapiLogExecution("DEBUG", "recid-----========", recid);


        if (soRecType == 2) {//demand bulletin
            var jobID = soRec.getFieldValue('job');
            var soStatus = soRec.getFieldValue('orderstatus');
            if(jobID){
            var jobRecType = nlapiLookupField('job', jobID, 'custentity_record_type');
            var role = nlapiGetRole();
            if (soStatus != 'H' && jobRecType == 3 && (role == 1021 || role == 3 || role == 1143 || role == 1140)) {
                form.addButton('custpage_close_order', 'Close Order', 'soCloseOrder(' + recid + ')');
                form.setScript('customscript_custom_wr_job_button_remove');
            }
            }
        }

        if (soRecType == 1 || soRecType == 4 || soRecType == 5) {
            var customStatus = soRec.getFieldValue('custbody_custom_approval_status');

            var role = nlapiGetRole();
            // if (role == 1071 && customStatus == 2) {
            //     form.removeButton('edit');
            // }

            var procWr = soRec.getFieldValue('custbody_process_work_request');

            var stats = soRec.getFieldValue('orderstatus');
            if (procWr == 'F' && (role == 3 || role == 1021 || role == 1022 || role == 1143 || role == 1140) && soRecType == 1 && customStatus == 2) {
                form.addButton('custpage_work_request', 'Process Work Request', 'window.open(\'/app/accounting/transactions/salesord.nl?id=' + recid + '&e=T&processWR=T\',\'_self\')');
            }
            //form.addButton('custpage_wr_project_list', 'WR Project Status', 'wrProjStatusAction(' + equipId + ',' + recid + ')');
            //form.addButton('custpage_wr_job_demand_bulletin', 'All Projects Demand Bulletin', 'wrJobDemandBulletin(' + equipId + ',' + recid + ')');
            form.addButton('custpage_printworkrequest', 'Print Work Request', 'window.open(\'/app/site/hosting/scriptlet.nl?script=767&deploy=1&recId=' + recid + '&end=true\')');
            /////////////////////////////////UPDATE PROJECT COST//////////////////////////////////////
            var toPrjCostFlag = false;
            var filter = new Array();
            var cols = new Array();
            cols[0] = new nlobjSearchColumn("item", null);
            filter[0] = new nlobjSearchFilter("type", null, 'anyof', 'SalesOrd');
            filter[1] = new nlobjSearchFilter("status", 'custcol_project_ref', 'anyof', 1);
            filter[2] = new nlobjSearchFilter("custcol_total_project_cost", null, 'is', 'F');
            filter[3] = new nlobjSearchFilter("internalidnumber", null, 'equalto', recid);
            var updprjcost = nlapiSearchRecord("salesorder", null, filter, cols);
            //nlapiLogExecution("DEBUG", "updprjcost================", JSON.stringify(updprjcost));
            if (updprjcost) {
                for (var j = 0; j < updprjcost.length; j++) {
                    var itemVal = updprjcost[j].getValue('item');
                    if (itemVal) {
                        toPrjCostFlag = true;
                    }
                }
            }
            // nlapiLogExecution("DEBUG", "toPrjCostFlag---------------", toPrjCostFlag);
            var role = nlapiGetRole();
            if (toPrjCostFlag == true && (role == 3 || (soRecType == 1 && role == 1023) || ((soRecType == 4 || soRecType == 5) && role == 1020))) {
                form.addButton('custpage_updateprojectcost', 'Update Project Cost', 'updateProjectCost(' + recid + ')');
            }
            /////////////////////////////////END UPDATE PROJECT COST//////////////////////////////////////
            var showCreateProbtn = false;
            var allowjobFlag = false;
            var showCreateProbtnEd = false;
            var lnCnt = soRec.getLineItemCount("item");
            for (var k = 1; k <= lnCnt; k++) {
                var createpr = soRec.getLineItemValue('item', 'custcol_create_project', k);
                var approveJob = soRec.getLineItemValue('item', 'custcol_allow_job_creation', k);
                var projectCreated = soRec.getLineItemValue('item', 'custcol_project_ref', k);
                //nlapiLogExecution("DEBUG","approveJob======",approveJob);
              nlapiLogExecution("DEBUG", "customStatus---------------", customStatus);
             nlapiLogExecution("DEBUG", "createpr---------------", createpr);
             nlapiLogExecution("DEBUG", "soRecType---------------", soRecType);
                if (customStatus == 2 && createpr == 'T' && approveJob == 'T' && (projectCreated == '' || projectCreated == null) && soRecType == 1) {
                    showCreateProbtn = true;
                }
                if (customStatus == 2 && createpr == 'T' && (projectCreated == '' || projectCreated == null) && (soRecType == 4 || soRecType == 5)) {
                    showCreateProbtnEd = true;
                }
                // nlapiLogExecution("DEBUG", "approveJob======", approveJob);
                if (createpr == 'T' && (approveJob == '' || approveJob == null || approveJob == 'F') && (projectCreated == '' || projectCreated == null) && soRecType == 1) {
                    allowjobFlag = true;
                }
            }
            var role = nlapiGetRole();
            nlapiLogExecution("DEBUG", "showCreateProbtnEd======", showCreateProbtnEd);
            if (allowjobFlag == true && (role == 3 || role == 1024 || role == 1021 || role == 1143 || role == 1140) && procWr == "T") {
                form.addButton("custpage_approv_project_creation", "Approve Project Creation", "approveJobCreation(" + recid + ")");
            }
            nlapiLogExecution("DEBUG", "showCreateProbtn---------------", showCreateProbtn);
            nlapiLogExecution("DEBUG", "procWr---------------", procWr);
            if (showCreateProbtn == true && (role == 3 || role == 1021 || role == 1022 ) && procWr == "T") {
                nlapiLogExecution("DEBUG","RECORDID",recid);
                form.addButton("custpage_create_project", "Create Project", "createProjects(" + recid + ")");
            }

            if (showCreateProbtnEd == true && (role == 3 || role == 1143 || role == 1140)) {
                nlapiLogExecution("DEBUG","RECORDID====",recid);
                form.addButton("custpage_create_project", "Create Project", "createProjects(" + recid + ")");
            }
            form.setScript('customscript_wr_namechange_client');
        }
        if (soRecType == 2) {
            form.addButton('custpage_printpickingticket', 'Print Picking Ticket', 'window.open(\'/app/site/hosting/scriptlet.nl?script=867&deploy=1&recId=' + recid + '&end=true\')');
            form.setScript('customscript_wr_namechange_client');
        }
    }
}
function afterSubmitWRAction(type, form, request) {
    if (type == "create" || type == "copy") {
        var recid = nlapiGetRecordId();
        var soRec = nlapiLoadRecord("salesorder", recid);
        var customform = soRec.getFieldValue('customform');
        var estimatedEndDate = soRec.getFieldValue('custbody_tentative_job_end_date');
        var recType = soRec.getFieldValue('custbody_record_type');
        if (recType == 1 || recType == 4 || recType==5) {

            var jobEndDate = soRec.getFieldValue('custbody_custom_end_date');
            //if (recType == 1 || recType == 5) {
            var runhrskms = soRec.getFieldValue('custbody_wr_current_run_hrs_kms');

            var equip='';var lastServDate='';
            if(customform==159 || customform==160){//Energy Division SO
                var equip = soRec.getFieldValue('custbody_ed_work_order_equipments');
                var lastServDate = soRec.getFieldValue('custbody_ed_wr_current_serv_date');
				if(equip && equip!=null){
                	nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_last_service_date', lastServDate);
                	nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_run_hrs_kms', runhrskms);
                }
            }else{
                if(customform==146 || customform==143){
                    var equipFam = soRec.getFieldValue('custbody_work_order_equipments');
                    var lastServDate = soRec.getFieldValue('custbody_wr_current_serv_date');
                    if(equipFam && equipFam!=null){
                        nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_last_service_date', lastServDate);
                        nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_run_hrs_kms', runhrskms);
                    }
                    ///////
                    var equip = soRec.getFieldValue('custbody_ed_work_order_equipments');
                    if(equip && equip!=null){
                        nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_last_service_date', lastServDate);
                        nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_run_hrs_kms', runhrskms);
                    }

                    //////
                }
                
            }


            
           //  nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_equipment_status', 4);
			if (equip) {
              if (recType == 1) {
                  var currentCarrEngine = soRec.getFieldValue('custbody_curr_carr_eng_hrs');
                  var currTopEngine = soRec.getFieldValue('custbody_curr_top_engine_hrs');
                  var currentKms = soRec.getFieldValue('custbody_current_kms');
                  if(equipFam && equipFam!=null){
                    nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_currnt_carr_engine_hrs', currentCarrEngine);
                    nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_curr_top_engine_hrs', currTopEngine);
                    nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_current_kms', currentKms);
                  }
                 
              }
              if(customform==159 || customform==160){
                      var equipStatus = nlapiLookupField('customrecord_rent_asset', equip, 'custrecord_rent_asset_status');
                      soRec.setFieldValue("custbody_ed_equipment_status", equipStatus);
              }else{
                if(equipFam && equipFam!=null){
                      var equipStatusFam = nlapiLookupField('customrecord_ncfar_asset', equipFam, 'custrecord_equipment_status');
                      soRec.setFieldValue("custbody_equipment_status", equipStatusFam);
                }
                var equipStatus = nlapiLookupField('customrecord_rent_asset', equip, 'custrecord_rent_asset_status');
                soRec.setFieldValue("custbody_ed_equipment_status", equipStatus);

              }

                  // soRec.setFieldValue("custbody_wr_so_equipment_status", equipStatus);
              

              if (estimatedEndDate) {
                  estimatedEndDate = new Date(nlapiStringToDate(estimatedEndDate));

                  if(customform==159 || customform==160){
                      nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_asset_ws_end_date', estimatedEndDate);
                  }else{
                    if(equipFam && equipFam!=null){
                      nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_asset_ws_end_date', estimatedEndDate);
                    }
                    nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_asset_ws_end_date', estimatedEndDate);
                  }

              }


              //soRec.setFieldValue("custbody_equipment_status", 4);
              //soRec.setFieldValue("custbody_wr_so_equipment_status", 4);
              nlapiSubmitRecord(soRec, false, true);
            }

        }
    }
    if (type == "edit") {
        var soRecType = nlapiGetFieldValue('custbody_record_type');
        var customform = nlapiGetFieldValue('customform');

        if (soRecType == 1 || soRecType == 4 || soRecType == 4) {
            var recid = nlapiGetRecordId();
            if(customform==159 || customform==160){//Energy Division SO
                var equip = nlapiGetFieldValue('custbody_ed_work_order_equipments');
                var lastServDate = nlapiGetFieldValue('custbody_ed_wr_current_serv_date');
            }else{
                var equipFam = nlapiGetFieldValue('custbody_work_order_equipments');
                var lastServDate = nlapiGetFieldValue('custbody_wr_current_serv_date');
                var equip = nlapiGetFieldValue('custbody_ed_work_order_equipments');
            }

            var startDate = nlapiGetFieldValue('custbody_custom_start_date');
            var endDate = nlapiGetFieldValue('custbody_custom_end_date');
            var runhrskms = nlapiGetFieldValue('custbody_wr_current_run_hrs_kms');
            var statusChanged = nlapiGetFieldValue('custbody_wr_status_changed');
            var estimatedEndDate = nlapiGetFieldValue('custbody_tentative_job_end_date');
            nlapiLogExecution("DEBUG","endDate=====",endDate);
            if (endDate) {
               // var oldRec = nlapiGetOldRecord();
               // var oldEndDate = oldRec.getFieldValue("custbody_custom_end_date");
                //  if (endDate != oldEndDate) {

                if(customform==159 || customform==160){
                    nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_last_service_date', lastServDate);
                    nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_run_hrs_kms', runhrskms);
                    var equipStats = nlapiGetFieldValue('custbody_ed_equipment_status');
                    var equip = nlapiGetFieldValue('custbody_ed_work_order_equipments');
                    var initialEquipmentStatus = nlapiGetFieldValue('custbody_ed_wr_initial_equip_status');

                    nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_asset_status', 1);
                    nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_asset_workshop_so_ref', recid);
                    nlapiSubmitField('salesorder', recid, 'custbody_wr_status_changed',"T");
                    nlapiSubmitField('salesorder', recid, 'custbody_ed_equipment_status', 1);
                    nlapiLogExecution("DEBUG","recid=====",recid);
                }else{
                    if(equipFam){
                        nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_last_service_date', lastServDate);
                    nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_run_hrs_kms', runhrskms);
                  //  var equipStats = nlapiGetFieldValue('custbody_equipment_status');
                    var equipFam = nlapiGetFieldValue('custbody_work_order_equipments');
                   // var initialEquipmentStatus = nlapiGetFieldValue('custbody_wr_initial_equip_status');

                    nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_equipment_status', 2);
                    nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_workshop_so_ref', recid);
                    }
                    if(equip){
                        nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_last_service_date', lastServDate);
                        nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_run_hrs_kms', runhrskms);
                        var equipStats = nlapiGetFieldValue('custbody_ed_equipment_status');
                        var equip = nlapiGetFieldValue('custbody_ed_work_order_equipments');
                        var initialEquipmentStatus = nlapiGetFieldValue('custbody_ed_wr_initial_equip_status');
    
                        nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_asset_status', 1);
                        nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_asset_workshop_so_ref', recid);
                    }

                    nlapiSubmitField('salesorder', recid, 'custbody_wr_status_changed',"T");
                    nlapiSubmitField('salesorder', recid, 'custbody_equipment_status', 2);
                    nlapiLogExecution("DEBUG","recid=====",recid);
                }
                

               /* if (initialEquipmentStatus) {
                    if (initialEquipmentStatus == 13) {
                        nlapiSubmitField('customrecord_ncfar_asset', equip, 'custrecord_assetstatus', 1);
                    } else {
                        nlapiSubmitField('customrecord_ncfar_asset', equip, 'custrecord_assetstatus', initialEquipmentStatus);
                    }
                }
                else {
                    if (equipStats == 1) { //Available Hire
                        nlapiSubmitField('customrecord_ncfar_asset', equip, 'custrecord_assetstatus', 1);
                    } else if (equipStats == 4) { //On Hire
                        nlapiSubmitField('customrecord_ncfar_asset', equip, 'custrecord_assetstatus', 4);
                    } else if (equipStats == 9) { //Breakdown
                        nlapiSubmitField('customrecord_ncfar_asset', equip, 'custrecord_assetstatus', 4);
                    }
                }*/
                
               /* if (initialEquipmentStatus) {
                    if (initialEquipmentStatus == 13) {
                        soRec.setFieldValue("custbody_equipment_status", 1);
                    } else {
                        soRec.setFieldValue("custbody_equipment_status", initialEquipmentStatus);
                    }
                }
                else {
                    if (equipStats == 1) { //Available Hire
                        soRec.setFieldValue("custbody_equipment_status", 1);
                    } else if (equipStats == 4) { //On Hire
                        soRec.setFieldValue("custbody_equipment_status", 4);
                    } else if (equipStats == 9) { //Breakdown
                        soRec.setFieldValue("custbody_equipment_status", 4);
                    }
                }*/
              //  nlapiSubmitRecord(soRec, false, true);
                //}

            }

            if (estimatedEndDate) {
                estimatedEndDate = new Date(nlapiStringToDate(estimatedEndDate));
                if(customform==159 || customform==160){
                    nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_asset_ws_end_date', estimatedEndDate);

                }else{
                    if(equipFam){
                        nlapiSubmitField('customrecord_ncfar_asset', equipFam, 'custrecord_asset_ws_end_date', estimatedEndDate);

                    }
                    if(equip){
                        nlapiSubmitField('customrecord_rent_asset', equip, 'custrecord_rent_asset_ws_end_date', estimatedEndDate);
                    }
                    
                }
                
            }
        }
    }
}
///update job fulfillment status
if (type == "create" || type == "copy" || type == "edit") {
    var soRecType = nlapiGetFieldValue('custbody_record_type');
    if (soRecType == 2) {
        var recid = nlapiGetRecordId();
        var soRec = nlapiLoadRecord("salesorder", recid);
        var jobID = soRec.getFieldValue('job');
        var demFlag = false;
        var filterso = new Array();
        filterso[0] = new nlobjSearchFilter('custbody_record_type', null, 'anyof', 2);
        filterso[1] = new nlobjSearchFilter('type', null, 'anyof', 'SalesOrd');
        filterso[2] = new nlobjSearchFilter('internalidnumber', 'jobmain', 'equalto', jobID);
        filterso[3] = new nlobjSearchFilter('mainline', null, 'is', 'T');
        filterso[4] = new nlobjSearchFilter('custentity_wr_bulk_status_updt', 'jobmain', 'is', 'F');
        var colso = new Array();
        colso[0] = new nlobjSearchColumn("statusref");
        var srchResSo = nlapiSearchRecord("salesorder", null, filterso, colso);
        if (srchResSo) {
            for (var k = 0; k < srchResSo.length; k++) {
                var soStatus = srchResSo[k].getValue("statusref");
                if (soStatus != "pendingBilling" && soStatus != "closed" && soStatus != "cancelled") {
                    demFlag = true;
                }
            }
            if (demFlag == true) {
                nlapiSubmitField('job', jobID, 'custentity_wr_fulfillmentstatus', 'Fulfillment of DB not completed');
            } else {
                nlapiSubmitField('job', jobID, 'custentity_wr_fulfillmentstatus', 'Fulfillment of DB completed');
            }
        }
    }
}
function stamp() {
    var tStamp = Math.floor(Date.now() / 1000);
    return tStamp;
}