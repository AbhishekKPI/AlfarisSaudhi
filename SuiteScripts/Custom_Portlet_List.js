/**
 * @NApiVersion 2.x
 * @NScriptType Portlet
 */
define(['N/search', 'N/ui/serverWidget'], function (search, serverWidget) {

    function render(params) {
        var portlet = params.portlet;
        portlet.title = 'Sample Custom Portlets';

        // Create the search object
        var salesorderSearchObj = search.create({
            type: "salesorder",
            settings: [{ "name": "consolidationtype", "value": "ACCTTYPE" }],
            filters: [
                ["type", "anyof", "SalesOrd"],
                "AND",
                ["custbody_rent_sales_order_type", "anyof", "2"]
            ],
            columns: [
                search.createColumn({ name: "type", label: "Type" }),
                search.createColumn({ name: "tranid", label: "Document Number" }),
                search.createColumn({ name: "entity", label: "Name" }),
                search.createColumn({ name: "account", label: "Account" })
            ]
        });

        // Add columns to the portlet
        portlet.addColumn({
            id: 'custpage_type',
            type: serverWidget.FieldType.TEXT,
            label: 'Type'
        });
        portlet.addColumn({
            id: 'custpage_tranid',
            type: serverWidget.FieldType.TEXT,
            label: 'Document Number'
        });
        portlet.addColumn({
            id: 'custpage_entity',
            type: serverWidget.FieldType.TEXT,
            label: 'Name'
        });
        portlet.addColumn({
            id: 'custpage_account',
            type: serverWidget.FieldType.TEXT,
            label: 'Account'
        });

        // Execute the search and add the results to the portlet
        var resultSet = salesorderSearchObj.run();
        var results = resultSet.getRange({
            start: 0,
            end: 10 // Limit to first 10 results
        });

        var data = results.map(function (result) {
            return {
                'custpage_type': result.getText({ name: 'type' }),
                'custpage_tranid': result.getValue({ name: 'tranid' }),
                'custpage_entity': result.getText({ name: 'entity' }),
                'custpage_account': result.getText({ name: 'account' })
            };
        });

        portlet.addRows({ rows: data });
    }

    return {
        render: render
    };
});
