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
    var subsidiary = request.getParameter('custscript_equipment_standby_subsidiary');
    nlapiLogExecution("DEBUG", "subsidiary",subsidiary);
//     var startdate = request.getParameter('custscript_equipment_standby_strtdate');
//     nlapiLogExecution("DEBUG", "startdate",startdate);
//    var enddate = request.getParameter('custscript_equipment_standby_enddate');
//    nlapiLogExecution("DEBUG", "enddate",enddate);

    var nameSub = '';
    try {
        var reportDefinition = nlapiCreateReportDefinition();
         var ItemCategory = reportDefinition.addRowHierarchy('custrecord_rent_item_category', "ItemCategory", 'TEXT');
         var itemCategory = reportDefinition.addRowHierarchy('custrecord_rent_item_subcategory',"ItemCategory", 'TEXT');
         var itemSubcategory = reportDefinition.addRowHierarchy('custrecord_rent_asset_item', "ItemCategory", 'TEXT');
         var itemAsset = reportDefinition.addRowHierarchy('name', "ItemCategory", 'TEXT');

       
         var count = reportDefinition.addColumn('internalid', true, 'COUNT', null, 'INTEGER', null);
         var onHire = reportDefinition.addColumn('formulanumeric', true, 'ONHIRE', null, 'INTEGER', null);
        var available = reportDefinition.addColumn('formulanumeric', true, 'AVAILABLE', null, 'INTEGER', null);



        var columns = new Array();
        columns.push(new nlobjSearchColumn("custrecord_rent_item_category",null,"GROUP"));
        columns.push(new nlobjSearchColumn("custrecord_rent_item_subcategory",null,"GROUP"));
        columns.push(new nlobjSearchColumn("custrecord_rent_asset_item",null,"GROUP"));
        columns.push(new nlobjSearchColumn("name",null,"GROUP"));
        columns.push(new nlobjSearchColumn("internalid",null,"COUNT"));
      


          


      
             columns.push(new nlobjSearchColumn("formulanumeric",null,"COUNT").setFormula("CASE when {custrecord_rent_asset_status} = 'On-Hire' THEN  {internalid}  ELSE 0 END "))
          columns.push(new nlobjSearchColumn("formulanumeric",null,"COUNT").setFormula("CASE when {custrecord_rent_asset_status} = 'Available Hire' THEN  {internalid}  ELSE 0 END "))




        var filters = new Array();
        if (subsidiary) {
            nlapiLogExecution("DEBUG", "subsidiary11111111111",subsidiary);

            filters.push(new nlobjSearchFilter("custrecord_rent_asset_subsidiary", null,"anyof", subsidiary).setOr(false));
        }
        // if (startdate || enddate) {
        //     nlapiLogExecution("DEBUG", "enddate1111111111111111111111111111", enddate);
           

        //     filters.push(new nlobjSearchFilter("custrecord_rent_dfs_date", null, "within", startdate, enddate).setOr(false));

        // }

        // filters.push(new nlobjSearchFilter('custrecord_rent_dfs_date',null, 'within','thismonth'));

            filters.push(new nlobjSearchFilter('custitem_rent_is_truck', 'custrecord_rent_asset_item', 'anyof', "2"));

            filters.push(new nlobjSearchFilter('custitem_rent_item_type','custrecord_rent_asset_item', 'anyof', "1"));
            
            filters.push(new nlobjSearchFilter('custrecord_rent_asset_status',null,'anyof', "1"));
           

     

        reportDefinition.addSearchDataSource('customrecord_rent_asset', null, filters, columns, {
            'custrecord_rent_item_category': columns[0],
             'custrecord_rent_item_subcategory':columns[1],
             'custrecord_rent_asset_item':columns[2],
             'name':columns[3],
             
             'internalid':columns[4],
             'formulanumeric':columns[5],
             'formulanumeric':columns[6],
           


        });


        var form = nlapiCreateReportForm('Equipment Standby Report - Month Wise');
        // form.addButton('custpage_button','Back','history.go(-1)');
        var pvtTable = reportDefinition.executeReport(form);
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