function csvImportSuiteletAction() {
	nlapiScheduleScript("customscript_custom_csv_import_scheduled", "customdeploy_csv_import_scheduled_script");
	var form = nlapiCreateForm('Processing......');
	response.writePage(form);
}