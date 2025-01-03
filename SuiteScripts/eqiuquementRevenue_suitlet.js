/*
    Script Name:PR_PaySlip_Register_Suitlet
    Author:Reshma Sinu
    Date:16-11-2020
    Description:For giving Payslip Report 

    Script Modification Log:

    -- Date --      --Author--  
    16-11-2020      Reshma Sinu 

*/
function eqiuquementRevenue(request, response) {
    var subsidiary = request.getParameter('custscript_equip_subsidiary');
    nlapiLogExecution("DEBUG", "subsidiary", subsidiary);
    var startdate = request.getParameter('custscript_equip_strtdate');
    nlapiLogExecution("DEBUG", "startdate", startdate);
    var enddate = request.getParameter('custscript_equip_enddate');
    nlapiLogExecution("DEBUG", "enddate", enddate);

    var category = request.getParameter('custscript_equip_category');
    nlapiLogExecution("DEBUG", "category", category);

    var subcategory = request.getParameter('custscript_equip_sub_category');
    nlapiLogExecution("DEBUG", "subcategory", subcategory);

    // var status=request.getParameter('custscript_equip_status');
    // var newSubsidiary = subsidiary.split("[]")
    // nlapiLogExecution("DEBUG", "newSubsidiary", newSubsidiary);
    // var newSubsidiary = new Array();

    //     var isArray = subsidiary.toString().indexOf(',');

    //     if (isArray < 0) {

    //         nlapiLogExecution("DEBUG", "isArray", isArray);



    //         subsidiary[0] = nationalityRestr;

    //     } else {

    //         var  subsidiary = nationalityRestr.split(",");

    //         nlapiLogExecution("DEBUG", "subsidiary*********", subsidiary);

    //     }



    var nameSub = '';
    try {
        var reportDefinition = nlapiCreateReportDefinition();
        nlapiLogExecution("DEBUG", "reportDefinition", reportDefinition);

        var itemCategory = reportDefinition.addRowHierarchy('custitem_category', "ItemCategory", 'TEXT');
        var itemSubcategory = reportDefinition.addRowHierarchy('custitem_subcategory', "ItemCategory", 'TEXT');
        var assetItem = reportDefinition.addRowHierarchy('custrecord_rent_asset_item', "ItemCategory", 'TEXT');
        var assetId = reportDefinition.addRowHierarchy('custcol_rent_asset_ref', "ItemCategory", 'TEXT');
        var assetId = reportDefinition.addRowHierarchy('custcol_name', "Name", 'TEXT');


        // var fxgrosamt = reportDefinition.addColumn('fxgrossamount', true, 'Amount', null, 'Currency', null);
        var fxgrosamt = reportDefinition.addColumn('amount', true, 'Amount', null, 'Currency', null);



        var columns = new Array();
        columns.push(new nlobjSearchColumn("custitem_category", "item", "GROUP"));
        columns.push(new nlobjSearchColumn("custitem_subcategory", "item", "GROUP"));
        columns.push(new nlobjSearchColumn("custrecord_rent_asset_item", "CUSTCOL_RENT_ASSET_REF", "GROUP"));
        columns.push(new nlobjSearchColumn("custcol_rent_asset_ref", null, "GROUP"));
        //  columns.push(new nlobjSearchColumn("fxgrossamount",null,"SUM"))

        columns.push(new nlobjSearchColumn("amount", null, "SUM"))




        var filters = new Array();
        try {
            if (subsidiary) {
                nlapiLogExecution("DEBUG", "subsidiary11111111111", subsidiary);

                filters.push(new nlobjSearchFilter("subsidiary", null, "anyof", subsidiary).setOr(false));
            }

            if (startdate || enddate) {
                nlapiLogExecution("DEBUG", "enddate1111111111111111111111111111", enddate);


                filters.push(new nlobjSearchFilter("trandate", null, "within", startdate, enddate).setOr(false));

            }
            if (category) {
                nlapiLogExecution("DEBUG", "category111111111111111", category);


                filters.push(new nlobjSearchFilter("custrecord_rent_item_category", "custcol_rent_asset_ref", "anyof", category).setOr(false));
            }
            if (subcategory) {
                nlapiLogExecution("DEBUG", "subcategory111111111111111", subcategory);

                filters.push(new nlobjSearchFilter("custrecord_rent_item_subcategory", "custcol_rent_asset_ref", "anyof", subcategory).setOr(false));

            }
        } catch (e) {
            nlapiLogExecution("DEBUG", "eror", e.message);
        }

        filters.push(new nlobjSearchFilter('type', null, 'anyof', 'CustInvc').setOr(false));

        filters.push(new nlobjSearchFilter('mainline', null, 'is', "F").setOr(false));

        filters.push(new nlobjSearchFilter('custcol_rent_asset_ref', null, 'noneof', "@NONE@").setOr(false));

        // filters.push(new nlobjSearchFilter('mainline', 'custbody_rent_sales_order', 'is', "T").setOr(false));



        filters.push(new nlobjSearchFilter('status', null, 'anyof', "CustInvc:B", "CustInvc:A").setOr(false));
        filters.push(new nlobjSearchFilter('taxline', null, 'is', "F").setOr(false));
        filters.push(new nlobjSearchFilter('shipping', null, 'is', "F").setOr(false));
        filters.push(new nlobjSearchFilter('amount', null, 'greaterthan', 0.00));




        reportDefinition.addSearchDataSource('invoice', null, filters, columns, {

            'custitem_category': columns[0],
            'custitem_subcategory': columns[1],
            'custrecord_rent_asset_item': columns[2],
            'custcol_rent_asset_ref': columns[3],
            // 'fxgrossamount':columns[4],
            'amount': columns[4],





        });




        var form = nlapiCreateReportForm('Equipment  Wise Revenue Report');
        nlapiLogExecution("DEBUG", "form", form);


        var pvtTable = reportDefinition.executeReport(form);
        nlapiLogExecution("DEBUG", "pvtTable", pvtTable);

        response.writePage(form);




    } catch (e) {
        nlapiLogExecution("DEBUG", "eror", e.message);
    }

} //End function reportFunction()
// END SUITELET ====================================================
function findCurrencySymbol(Currency) {

    var currencySymb;
    var Filters = new Array();
    Filters.push(new nlobjSearchFilter('name', null, 'is', Currency));
    Filters.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
    var column = new Array();
    column.push(new nlobjSearchColumn('name')); //
    column.push(new nlobjSearchColumn('symbol'));
    var searchCurrencySym = nlapiSearchRecord('currency', null, Filters, column);
    if (searchCurrencySym != null) {
        currencySymb = searchCurrencySym[0].getValue('symbol');

    } //End if(searchEarnGrossCheck !=null)
    return currencySymb;
}