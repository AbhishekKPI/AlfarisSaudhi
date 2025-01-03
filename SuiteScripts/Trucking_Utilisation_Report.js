/*
    Script Name:  Trucking_Utilisation_Report
    Author:Reshma Sinu
    Date:16-11-2020
    Description:Truck Utilization monthly wise Report 

    Script Modification Log:

    -- Date --      --Author--  
    16-11-2020      Reshma Sinu 

*/
function truckUtilizationRevenue(request, response) {
    var subsidiary = request.getParameter('custscript_truck_utilization_subsidiary');
    nlapiLogExecution("DEBUG", "subsidiary",subsidiary);
    var startdate = request.getParameter('custscript_truck_utilization_strtdate');
    nlapiLogExecution("DEBUG", "startdate",startdate);
   var enddate = request.getParameter('custscript_truck_utilization_enddate');
   nlapiLogExecution("DEBUG", "enddate",enddate);

    var asset = request.getParameter('custscript_truck_utilization_asset');
    nlapiLogExecution("DEBUG", "asset",asset);

    var nameSub = '';
    try {
        var reportDefinition = nlapiCreateReportDefinition();
       
         var itemCategory = reportDefinition.addRowHierarchy('custrecord_rent_item_category',"itemCategory", 'TEXT');
         var itemSubcategory = reportDefinition.addRowHierarchy('custrecord_rent_item_subcategory', "itemCategory", 'TEXT');
         var assetId = reportDefinition.addRowHierarchy('custrecord_rent_time_rod_asset', "itemCategory", 'TEXT');

       
        var tothrs = reportDefinition.addColumn('formulanumeric', true, 'Total Hours', null, 'INTEGER', null);
        var noofdays = reportDefinition.addColumn('formulanumeric1', true, 'No of Days', null, 'INTEGER', null);



        var columns = new Array();
        
         columns.push(new nlobjSearchColumn("custrecord_rent_item_category","CUSTRECORD_RENT_TIME_ROD_ASSET","GROUP" ));
         columns.push(new nlobjSearchColumn("custrecord_rent_item_subcategory","CUSTRECORD_RENT_TIME_ROD_ASSET", "GROUP"));
       
         columns.push(new nlobjSearchColumn("custrecord_rent_time_rod_asset", null,"GROUP"));
       
         columns.push(new nlobjSearchColumn("formulanumeric",null,"SUM").setFormula("{custrecord_rent_time_tot_extra_hours}+{custrecord_rent_time_tot_nor_hours}"))
         columns.push(new nlobjSearchColumn("formulanumeric",null,"SUM").setFormula("(TO_NUMBER(ABS(TO_DATE({custrecord_rent_time_from_date}) - TO_DATE({custrecord_rent_time_to_date}))))+1"))





        var filters = new Array();

        if (subsidiary) {
            nlapiLogExecution("DEBUG", "subsidiary11111111111",subsidiary);

            filters.push(new nlobjSearchFilter("custrecord_rent_time_subsidiary", null,"anyof", subsidiary).setOr(false));
        }
        if (startdate || enddate) {
            nlapiLogExecution("DEBUG", "enddate1111111111111111111111111111", enddate);
           

            filters.push(new nlobjSearchFilter("custrecord_rent_time_from_date", null, "within", startdate, enddate).setOr(false));

        }
       
        if (asset) {
            nlapiLogExecution("DEBUG", "category111111111111111",asset);
           

            filters.push(new nlobjSearchFilter("custrecord_rent_time_rod_asset",null,"anyof",asset).setOr(false));
        }

            filters.push(new nlobjSearchFilter('custrecord_rent_asset_item_type','custrecord_rent_time_rod_asset', 'anyof', 1));
            filters.push(new nlobjSearchFilter('custrecord_rent_robd_invoice','custrecord_rent_time_robd', 'noneof','@NONE@'));
            filters.push(new nlobjSearchFilter('custrecord_rent_asset_is_truck','custrecord_rent_time_rod_asset', 'anyof', 1));
            filters.push(new nlobjSearchFilter('custrecord_rent_time_status',null, 'anyof',4));




     

        reportDefinition.addSearchDataSource('customrecord_rent_timesheet', null, filters, columns, {
            'custrecord_rent_item_category': columns[0],
             'custrecord_rent_item_subcategory':columns[1],
             'custrecord_rent_time_rod_asset':columns[2],
            'formulanumeric':columns[3],
            'formulanumeric1':columns[4]

          

         
        });


        var form = nlapiCreateReportForm('Truck Utilization Month wise Report');
     
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