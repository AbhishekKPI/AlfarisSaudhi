function pageInitAction(type) {
	var myTD=document.getElementById('tbl_submitter');
	if(myTD){
		myTD.parentNode.removeChild(myTD);
	}
	
	var myTD=document.getElementById('tbl__cancel');
	if(myTD){
		myTD.parentNode.removeChild(myTD);
	}
	
	var myTD=document.getElementById('tbl_resetter');
	
	if(myTD){
		myTD.parentNode.removeChild(myTD);
	}
	
}