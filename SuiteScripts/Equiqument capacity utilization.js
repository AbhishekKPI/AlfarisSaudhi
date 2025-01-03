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
    var subsidiary = request.getParameter('custscript_equip_utilization_subsidiary');
    nlapiLogExecution("DEBUG", "subsidiary",subsidiary);
    var startdate = request.getParameter('custscript_equip_utilization_strtdate');
    nlapiLogExecution("DEBUG", "startdate",startdate);
   var enddate = request.getParameter('custscript_equip_utilization_enddate');
   nlapiLogExecution("DEBUG", "enddate",enddate);

    var asset = request.getParameter('custscript_equip_utilization_location');
    nlapiLogExecution("DEBUG", "asset",asset);

   


    var nameSub = '';
    try {
        var reportDefinition = nlapiCreateReportDefinition();
        // var location = reportDefinition.addRowHierarchy('location', "Location", 'TEXT');
         var itemCategory = reportDefinition.addRowHierarchy('custrecord_rent_item_category',"itemCategory", 'TEXT');
         var itemSubcategory = reportDefinition.addRowHierarchy('custrecord_rent_item_subcategory', "itemCategory", 'TEXT');
         var itemId = reportDefinition.addRowHierarchy('custrecord_rent_asset_item', "itemCategory", 'TEXT');

         var assetId = reportDefinition.addRowHierarchy('custrecord_rent_time_rod_asset', "itemCategory", 'TEXT');
         
         var noofdays = reportDefinition.addColumn('formulanumeric1', true, 'No of Days', null, 'INTEGER', null);
        var tothrs = reportDefinition.addColumn('formulanumeric', true, 'Total Hours', null, 'INTEGER', null);
      
        // var rodAsset = reportDefinition.addColumn('custrecord_rent_time_rod_asset', false, 'Asset', null, 'TEXT', null);
      
        // var status = reportDefinition.addColumn('custrecord_rent_time_status', false, 'Status', null, 'TEXT', null);

        var fromdate = reportDefinition.addColumn('custrecord_rent_time_from_date', false, 'From Date', null, 'DATE', null);
        var todate = reportDefinition.addColumn('custrecord_rent_time_to_date', false, 'To Date', null, 'DATE', null);
        var timesheet = reportDefinition.addColumn('name', false, 'TimeSheet', null, 'TEXT', null);
        var rodstatus = reportDefinition.addColumn('custrecord_rent_time_status', false, 'Status', null, 'TEXT', null);

        var rodAsset = reportDefinition.addColumn('custrecord_rent_time_tot_nor_hours', false, 'Total No Hours', null, 'TEXT', null);
        var extra = reportDefinition.addColumn('custrecord_rent_time_tot_extra_hours', false, 'Extra Hrs', null, 'TEXT', null);

      


        var columns = new Array();
       
         columns.push(new nlobjSearchColumn("custrecord_rent_item_category","CUSTRECORD_RENT_TIME_ROD_ASSET","GROUP" ));
         columns.push(new nlobjSearchColumn("custrecord_rent_item_subcategory","CUSTRECORD_RENT_TIME_ROD_ASSET", "GROUP"));
          columns.push(new nlobjSearchColumn("custrecord_rent_asset_item","CUSTRECORD_RENT_TIME_ROD_ASSET","GROUP"));
         columns.push(new nlobjSearchColumn("custrecord_rent_time_rod_asset", null,"GROUP"));
       
         columns.push(new nlobjSearchColumn("formulanumeric",null,"SUM").setFormula("{custrecord_rent_time_tot_extra_hours}+{custrecord_rent_time_tot_nor_hours}"))
         columns.push(new nlobjSearchColumn("formulanumeric",null,"SUM").setFormula("(TO_NUMBER(ABS(TO_DATE({custrecord_rent_time_from_date}) - TO_DATE({custrecord_rent_time_to_date}))))+1"))

          columns.push(new nlobjSearchColumn("custrecord_rent_time_status", null,'GROUP'));
         columns.push(new nlobjSearchColumn("custrecord_rent_time_from_date", null,'GROUP'));
         columns.push(new nlobjSearchColumn("custrecord_rent_time_to_date", null,'GROUP'));
         columns.push(new nlobjSearchColumn("name", null,'GROUP'));
      
         columns.push(new nlobjSearchColumn("custrecord_rent_time_tot_nor_hours", null,'GROUP'));
         columns.push(new nlobjSearchColumn("custrecord_rent_time_tot_extra_hours", null,'GROUP'));

        
        


        var filters = new Array();
        if (subsidiary) {
            nlapiLogExecution("DEBUG", "subsidiary11111111111",subsidiary);

            filters.push(new nlobjSearchFilter("custrecord_rent_time_subsidiary",null, "anyof", subsidiary).setOr(false));
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
            filters.push(new nlobjSearchFilter('custrecord_rent_time_status',null, 'anyof',4));
            



     

        reportDefinition.addSearchDataSource('customrecord_rent_timesheet', null, filters, columns, {
            // 'custrecord_rent_asset_item':columns[0],
            'custrecord_rent_item_category': columns[0],
             'custrecord_rent_item_subcategory':columns[1],
             'custrecord_rent_asset_item':columns[2],
             'custrecord_rent_time_rod_asset':columns[3],
            'formulanumeric':columns[4],
            'formulanumeric1':columns[5],
            'custrecord_rent_time_status':columns[6],


            // 'custrecord_rent_time_status':columns[6],
            'custrecord_rent_time_from_date':columns[7],
            'custrecord_rent_time_to_date':columns[8],
            'name':columns[9],
            'custrecord_rent_time_tot_nor_hours':columns[10],
            'custrecord_rent_time_tot_extra_hours':columns[11],
           

          

        });


        var form = nlapiCreateReportForm('Equipment Capacity Utilization Month wise  Report');
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