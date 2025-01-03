function csvImportFunc(){
	var context = nlapiGetContext();
	var fileID = context.getSetting('SCRIPT', 'custscriptfileid');
	var customerCSVImport = nlapiCreateCSVImport();
	customerCSVImport.setMapping("62");
	customerCSVImport.setPrimaryFile(nlapiLoadFile(4668));
	customerCSVImport.setOption("jobName", "New Cost Cenetr Import "+ new Date());
	nlapiSubmitCSVImport(customerCSVImport);
}