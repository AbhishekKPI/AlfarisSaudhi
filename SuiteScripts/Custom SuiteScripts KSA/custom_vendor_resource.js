function pageInitAction(type) {
	if(type == 'create'){
		nlapiSetFieldValue("isjobresourcevend", "T");
	}	
}
function saveRecordAction() {
	var isprjres = nlapiGetFieldValue("isjobresourcevend");	
	/*if(isprjres == 'T'){
		var famasset = nlapiGetFieldValue("custentity_fam_asset");		
		console.log(famasset);
		if(famasset){
			nlapiSetFieldValue("autoname", "F");
			nlapiSetFieldValue("entityid", nlapiGetFieldValue("custentity_fam_asset_id"));		
			return true;
		}else{	
			alert("Please enter value(s) for: FAM ASSET");
			return false;
		}
	}*/
	return true;
}