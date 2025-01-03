function customPageInitAction(type){	
  //nlapiSubmitField("resourceallocation", 1353, "project", 3385);
//nlapiSetFieldDisplay("custevent_so_item_description", false);
	if(type == 'edit'){
		var so = nlapiGetFieldValue("custevent_project_salesorder");
		itemSelectBx(so);
	}
	var proj = nlapiGetFieldValue("project");
    console.log(proj);
	var rec = nlapiLoadRecord("job", proj);
	var subsidiary = rec.getFieldValue("subsidiary");
	var rec  = nlapiLoadRecord("subsidiary", subsidiary);	
	var parnetsub = rec.getFieldValue("custrecord_is_energy");
	if(parnetsub != 'T'){
		if(proj){salesOrderSelectBx(proj);}	
		document.getElementById("custevent_service_item_so_fs").style.display="none";
		if(type != 'edit'){
			var html = '<select onchange="itemValueUpdation(this.value)"  id="custom_itemsel" style="width:281px" class="textbox"><option value="">&nbsp;</option></select>';
			document.getElementById("custevent_service_item_so_fs").insertAdjacentHTML("beforeBegin",html);
		}
		document.getElementById("allocationamount_formattedValue").disabled = true;
		var allcnun =  nlapiGetField("allocationunit");	
		var filsid = allcnun.uifield.id.replace("hddn", "inpt");	
		document.getElementById(filsid).disabled = true;
nlapiSetFieldDisplay("projecttask", false);
		//var prjtask = nlapiGetField("projecttask");	
		//var prttskid = prjtask.uifield.id.replace("hddn", "inpt");


//if(prttskid != null){
//document.getElementById(prttskid).style.display = "none";
//document.getElementById("projecttask_fs_lbl_uir_label").style.display = "none";
//document.getElementById("projecttask_fs").style.display = "none";
//}
		
	}else{	
		nlapiSetFieldValue("allocationamount", 1);
		nlapiDisableField("allocationtype", true);
		nlapiDisableField("allocationamount", true);	
		nlapiDisableField("allocationunit", true);	
	}	
	
}
function salesOrderSelectBx(proj) {
	var filter =[["type","anyof","SalesOrd"],'AND',["mainline","is","T"],'AND',["jobMain.internalid","anyof",proj]];
	var srchRes = nlapiSearchRecord('transaction', 'customsearch_sotoprj_resource_allocation',filter);
	var html = '';
	html += '<select onchange="itemSelectBx(this.value)"  id="custom_salesordersel" style="width:281px" class="textbox"><option value="">&nbsp;</option>';
	if(srchRes){
		for(var i=0;i<srchRes.length;i++){	
			var so = nlapiGetFieldValue("custevent_project_salesorder");
			var selected = '';
			if(so == srchRes[i].getValue("internalid")){
				selected = 'selected="selected"';
			}
			html += '<option '+selected+' value="'+srchRes[i].getValue("internalid")+"_"+srchRes[i].getValue("custbody_site")+'">Sales Order #'+srchRes[i].getValue("tranid")+'</option>';
		}
	}	
	html += '</select>';
	document.getElementById("custevent_project_salesorder_fs").insertAdjacentHTML("beforeBegin",html);
	document.getElementById("custevent_project_salesorder_fs").style.display="none";
}
function itemSelectBx(soId) {	
	
	var rs = soId.split("_"); 
	
	nlapiSetFieldValue("custevent_project_salesorder", rs[0]);
	nlapiSetFieldValue("custevent_quote_location", rs[1]);
	var em = document.getElementById("custom_itemsel");
	if(em){
		var elem = document.getElementById("custom_itemsel");
		elem.parentNode.removeChild(elem);
	}
	var html = '';
	html += '<select onchange="itemValueUpdation(this.value)"  id="custom_itemsel" style="width:281px" class="textbox"><option value="">&nbsp;</option>';
	
	if(soId){
		var filter = ["internalid","anyof",rs[0]];
	var srchRes = nlapiSearchRecord('transaction', 'customsearch_so_items_ra',filter);
	if(srchRes){
		
		for(var i=0;i<srchRes.length;i++){
			var soitem = nlapiGetFieldValue("custevent_service_item_so");
			var selected = '';
			if(soitem == srchRes[i].getValue("item")){
				selected = 'selected="selected"';
			}		
			var itID = srchRes[i].getValue("internalid","item")+"_"+srchRes[i].getValue("rate")+"_"+srchRes[i].getText("saleunit","item")+"_"+srchRes[i].getValue("custcol_min_hours")+"_"+srchRes[i].getValue("custcol_min_days")+"_"+srchRes[i].getValue("quantity")+"_"+srchRes[i].getValue("custcol_arabic_description")+"_||"+srchRes[i].getValue("custcol_euip_capacity");
			html += '<option '+selected+' value="'+itID+'">Item #'+srchRes[i].getText("item")+'</option>';
		}	
	}
	}	
	
	html += '</select>';
	document.getElementById("custevent_service_item_so_fs").insertAdjacentHTML("beforeBegin",html);
	document.getElementById("custevent_service_item_so_fs").style.display="none";
} 
function itemValueUpdation(itemId) {
	var descript = itemId.split("_||");	
	nlapiSetFieldValue("custevent_so_item_description", descript[1]);
    var res = itemId.split("_"); 
    //nlapiSetFieldValue("custevent_so_item_description", descript);
	//console.log(itemId);
	
	nlapiSetFieldValue("custevent_service_item_so", res[0]);
	nlapiSetFieldValue("custevent_custom_hdn_itemid", res[0]);	 
	nlapiSetFieldValue("custevent_item_rate", res[1]);
	nlapiSetFieldValue("custevent_ra_sales_unit", res[2]);
	nlapiSetFieldValue("custevent_minimum_hours_hdn", res[3]);
	nlapiSetFieldValue("custevent_minimum_days_hdn", res[4]);
	nlapiSetFieldValue("custevent_quantity_allocated", res[5]);
    nlapiSetFieldValue("custevent_arabic_description", res[6]);
}
function customFieldChangeAction(type,name) {
    if(name == 'allocationresource'){
      var resourcesel = nlapiGetFieldValue('allocationresource');
      var resrec = nlapiLoadRecord('vendor',resourcesel);
      var isoutsourced = resrec.getFieldValue('custentity_vendor_resource_outsourced');
      if(isoutsourced == 'T'){
        nlapiSetFieldDisplay('custevent_res_code',true);
      }else{
        nlapiSetFieldDisplay('custevent_res_code',false);
      }
    }
	var proj = nlapiGetFieldValue("project");		
	var rec = nlapiLoadRecord("job", proj);
	var subsidiary = rec.getFieldValue("subsidiary");	
	var rec  = nlapiLoadRecord("subsidiary", subsidiary);
	var parnetsub = rec.getFieldValue("custrecord_is_energy");
    
	if(name == 'custevent_quantity_allocated'){	
		var units = nlapiGetFieldValue("custevent_ra_sales_unit");
		var allocated = '';
		if(units == 'Hour'){
			allocated = nlapiGetFieldValue("custevent_quantity_allocated") * 1;
		}else if(units == 'Week'){
			allocated = nlapiGetFieldValue("custevent_quantity_allocated") * nlapiGetFieldValue("custevent_minimum_hours_hdn") * nlapiGetFieldValue("custevent_minimum_days_hdn");
		}if(units == 'Day'){
			allocated = nlapiGetFieldValue("custevent_quantity_allocated") * nlapiGetFieldValue("custevent_minimum_hours_hdn");
		}if(units == 'Month'){
			allocated = nlapiGetFieldValue("custevent_quantity_allocated") * nlapiGetFieldValue("custevent_minimum_hours_hdn") * nlapiGetFieldValue("custevent_minimum_days_hdn");
		}else{
			allocated = nlapiGetFieldValue("custevent_quantity_allocated") * 1;
		}
		if(parnetsub != 'T'){
			nlapiSetFieldValue("allocationamount", parseInt(allocated),null,false);
		}
		
	}
	
	
}
