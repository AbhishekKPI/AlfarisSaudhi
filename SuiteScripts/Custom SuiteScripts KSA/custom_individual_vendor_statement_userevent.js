function beforeLoadAction(type, form, request){
		form.addButton('custpage_bd_tsbtn', 'Print Statement','printVendorStatement();');
		form.setScript('customscript_custom_common_script');
}