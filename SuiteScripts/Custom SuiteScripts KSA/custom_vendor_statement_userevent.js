function beforeLoadAction(type, form, request){
	form.addButton('custpage_bd_tsbtn', 'Print Statement', 'printVendorStatement()');
	form.setScript('customscript_common_script');
}