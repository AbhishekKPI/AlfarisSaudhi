/**
 * @NApiVersion 2.0
 * @NScriptType Portlet
 */

define(['N/ui/serverWidget'], function (serverWidget) {
    function render(params) {
        var portlet = params.portlet;
        portlet.title = 'Custom Portlet Example';

        var content = portlet.addField({
            id: 'custpage_htmlfield',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'HTML Content'
        });

        content.defaultValue = '<h1> Welcome to KPI Custom Portlet!</h1>';
    }
    return {
        render: render
    };
});
