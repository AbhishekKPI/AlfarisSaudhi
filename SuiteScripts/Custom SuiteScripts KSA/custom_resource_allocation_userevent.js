function BeforeLaodAction() {
	var currentContext = nlapiGetContext(); 	
	if( (currentContext.getExecutionContext() == 'userinterface') && (type == 'create' || type == 'edit' || type == 'view'))
	{
		nlapiSetFieldDisplay("custevent_equipment_ts_number", false);
		nlapiSetFieldDisplay("custevent_custom_hdn_itemid", false);
		nlapiSetFieldDisplay("custevent_minimum_hours_hdn", true);
		nlapiSetFieldDisplay("custevent_minimum_days_hdn", true);	
		var proj = nlapiGetFieldValue("project");		
		var rec = nlapiLoadRecord("job", proj);		
		var subsidiary = rec.getFieldValue("subsidiary");
		var rec  = nlapiLoadRecord("subsidiary", subsidiary);		
		var parnetsub = rec.getFieldValue("custrecord_is_energy");
		nlapiSetFieldDisplay("project", false);
		if(parnetsub != 'T'){
			nlapiSetFieldDisplay("allocationamount", false);
			nlapiSetFieldDisplay("allocationunit", false);
			nlapiSetFieldDisplay("allocationtype", false);
			nlapiSetFieldDisplay("custevent_cstm_ra_unit_type", false);
		}else{
			nlapiSetFieldDisplay("custevent_project_salesorder", false);	
			nlapiSetFieldDisplay("custevent_service_item_so", false);			
			nlapiSetFieldDisplay("custevent_ra_sales_unit", false);				
			nlapiSetFieldDisplay("custevent_item_rate", false);		
			nlapiSetFieldDisplay("projecttask", true);							
			nlapiSetFieldDisplay("allocationtype", false);
			nlapiSetFieldDisplay("allocationamount", false);	
			nlapiSetFieldDisplay("allocationunit", false);
			
		}
    }
  if(type == 'create'){
    nlapiSetFieldDisplay('custevent_res_code',false);
  }
  if(type == 'edit' || type == 'view'){
    var rescode = nlapiGetFieldValue('custevent_res_code');
    if(rescode){
      nlapiSetFieldDisplay('custevent_res_code',true);
    }
  }
}
function afterSubmitAction(type){
  if(type == 'create' || type == 'edit'){
    var resource = nlapiGetFieldValue("allocationresource");
    var resrec = nlapiLoadRecord("vendor", resource);
    var isoutsourced = resrec.getFieldValue('custentity_vendor_resource_outsourced');
    if(isoutsourced == 'T'){
      var proj = nlapiGetFieldValue("project");
      nlapiSubmitField('job',proj,'custentity_project_resource_outsourced','T');
    }
  }
  return true;
}
