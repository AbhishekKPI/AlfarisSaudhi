document.getElementById("jobresourceslnk").style.display = 'none';
document.getElementById("tbl_addtime").style.display = 'none';
document.getElementById("tbl_addweeklytime").style.display = 'none';
document.getElementById("timeitem_main_form").style.display = 'none';

function coreCopyTimeSheetAction() {	
	var projID = getParameterFromURL("id");	
	window.location =  '/app/site/hosting/scriptlet.nl?script=245&deploy=1&projid='+projID;	
}

function getParameterFromURL(param){
	if(param=(new RegExp('[?&]'+encodeURIComponent(param)+'=([^&]*)')).exec(location.search))
	return decodeURIComponent(param[1]);
}
function generateTimsheet(projID,raID,subsidiary){
	window.open("/app/site/hosting/scriptlet.nl?script=238&deploy=1&projid="+projID+'&raid='+raID+'&projsub='+subsidiary, "", "width=460,height=330");	
}