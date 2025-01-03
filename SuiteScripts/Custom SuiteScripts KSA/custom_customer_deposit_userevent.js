function beforeloadAction(type, form, request) {
	if(type == 'create')
	{
		nlapiSetFieldDisplay("custbody_pdc_deposit_tobank", false);
		nlapiSetFieldValue("custbody_pdc_receipt", "T");		
		var aa = nlapiGetField("custbody_pdc_receipt");
      if(aa){
        aa.setDisplayType('disabled');
      }
      var bb = nlapiGetField("salesorder");
      bb.setDisplayType('hidden');
		
	}else if(type == 'edit'){
		//nlapiSetFieldDisplay("custbody_pdc_receipt", true);
		nlapiSetFieldDisplay("custbody_pdc_deposit_tobank", true);
		var bb = nlapiGetField("salesorder");
	      bb.setDisplayType('hidden');
	}else if(type == 'view'){
		
      var bb = nlapiGetField("salesorder");
      bb.setDisplayType('hidden');
      
      var PDCrec = nlapiGetFieldValue("custbody_pdc_receipt");
      if(PDCrec == 'T'){
    	  var aa = nlapiGetField("custbody_pdc_receipt");
    	  aa.setDisplayType('disabled');
    	  var aa = nlapiGetField("custbody_pdc_deposit_tobank");
    	  aa.setDisplayType('hidden');
      }else{
    	  var aa = nlapiGetField("custbody_pdc_deposit_tobank");
    	  aa.setDisplayType('disabled');
    	  var aa = nlapiGetField("custbody_pdc_receipt");
    	  aa.setDisplayType('hidden');
      }
      
    }
}
	