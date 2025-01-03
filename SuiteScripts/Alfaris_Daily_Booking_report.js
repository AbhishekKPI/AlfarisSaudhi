/*
    Script Name:PR_PaySlip_Register_Suitlet
    Author:Reshma Sinu
    Date:16-11-2020
    Description:For giving Payslip Report 

    Script Modification Log:

    -- Date --      --Author--  
    16-11-2020      Reshma Sinu 

*/
function dailyBooking(request, response) {
    var subsidiary = request.getParameter('custscript_daily_booking_subsidiary');
    nlapiLogExecution("DEBUG", "subsidiary",subsidiary);
    var itemcategory = request.getParameter('custscript__daily_booking_category');
    nlapiLogExecution("DEBUG", "itemcategory",itemcategory);
   var subcategory = request.getParameter('custscript_daily_booking_sub_category');
   nlapiLogExecution("DEBUG", "subcategory",subcategory);

    var asset = request.getParameter('custscript_daily_booking_asset');
    nlapiLogExecution("DEBUG", "asset",asset);

 var fromDate = request.getParameter('custscript_daily_booking_from_date');
   nlapiLogExecution("DEBUG", "fromDate",fromDate);

    var toDate = request.getParameter('custscript_daily_booking_to_date');
    nlapiLogExecution("DEBUG", "toDate",toDate);
    
   


    var nameSub = '';
    try {
        var reportDefinition = nlapiCreateReportDefinition();
        // var location = reportDefinition.addRowHierarchy('location', "Location", 'TEXT');
         var itemCategory = reportDefinition.addRowHierarchy('custrecord_rent_item_category',"itemCategory", 'TEXT');
         var itemSubcategory = reportDefinition.addRowHierarchy('custrecord_rent_item_subcategory', "itemCategory", 'TEXT');
         var assetId = reportDefinition.addRowHierarchy('custrecord_rent_time_rod_asset', "itemCategory", 'TEXT');
         

        //   var fxgrosamt = reportDefinition.addRowHierarchy('fxgrossamount', "Gross Amount", 'TEXT');




       
        var code = reportDefinition.addColumn('custrecord_rent_rod_requested_item', false, 'Code', null, 'TEXT', null);
        var capacity = reportDefinition.addColumn('custrecord_rent_rod_quantity', false, 'Cap', null, 'TEXT', null);
        // var rodAsset = reportDefinition.addColumn('custrecord_rent_time_rod_asset', false, 'Asset', null, 'TEXT', null);
        var rodstatus = reportDefinition.addColumn('custrecord_rent_time_customer', false, 'Client', null, 'TEXT', null);
       var fromdate = reportDefinition.addColumn('custrecord_rent_timesheet_site', false, 'Site', null, 'TEXT', null);
        var todate = reportDefinition.addColumn('name', false, 'TimeSheetNo', null, 'TEXT', null);
        var rodAsset = reportDefinition.addColumn('custrecord_rent_time_post_time_remark', false, 'Remarks', null, 'TEXT', null);
        var extra = reportDefinition.addColumn('custrecord_rent_time_site_contract', false, 'Site Contact', null, 'TEXT', null);
        var helpers= reportDefinition.addColumn('custrecord_rent_rod_all_helpers', false, 'Helpers', null, 'TEXT', null);
        var operators= reportDefinition.addColumn('custrecord_rent_rod_all_operators', false, 'Operators', null, 'TEXT', null);


       

        var columns = new Array();
         columns.push(new nlobjSearchColumn("custrecord_rent_item_category","CUSTRECORD_RENT_TIME_ROD_ASSET","GROUP" ));
         columns.push(new nlobjSearchColumn("custrecord_rent_item_subcategory","CUSTRECORD_RENT_TIME_ROD_ASSET", "GROUP"));
      
         columns.push(new nlobjSearchColumn("custrecord_rent_time_rod_asset", null,"GROUP"));
         columns.push(new nlobjSearchColumn("custrecord_rent_rod_requested_item","CUSTRECORD_RENT_TIME_ROD","GROUP" ));
         columns.push(new nlobjSearchColumn("custrecord_rent_rod_quantity","CUSTRECORD_RENT_TIME_ROD","SUM"));
         columns.push(new nlobjSearchColumn("custrecord_rent_time_customer", null,"GROUP"));
         columns.push(new nlobjSearchColumn("custrecord_rent_timesheet_site", null,"GROUP"));
         columns.push(new nlobjSearchColumn("name", null,"GROUP"));
         columns.push(new nlobjSearchColumn("custrecord_rent_time_post_time_remark", null,"GROUP"));
         columns.push(new nlobjSearchColumn("custrecord_rent_time_site_contract", null,"GROUP"));
         columns.push(new nlobjSearchColumn("custrecord_rent_rod_all_helpers","CUSTRECORD_RENT_TIME_ROD","GROUP"));
         columns.push(new nlobjSearchColumn("custrecord_rent_rod_all_operators","CUSTRECORD_RENT_TIME_ROD","GROUP"));

         




       

      
      
        
       


        var filters = new Array();
        if (subsidiary) {
            nlapiLogExecution("DEBUG", "subsidiary11111111111",subsidiary);

            filters.push(new nlobjSearchFilter("custrecord_rent_time_subsidiary",null, "anyof", subsidiary).setOr(false));
        }
        if (fromDate || toDate) {
            nlapiLogExecution("DEBUG", "enddate1111111111111111111111111111", fromDate);
           

            filters.push(new nlobjSearchFilter("custrecord_rent_time_from_date", null, "within", fromDate, toDate).setOr(false));

        }
       
       
        if (asset) {
            nlapiLogExecution("DEBUG", "category111111111111111",asset);
           

            filters.push(new nlobjSearchFilter("custrecord_rent_time_rod_asset",null,"anyof",asset).setOr(false));
        }
        if (itemcategory) {
            nlapiLogExecution("DEBUG", "category111111111111111",itemcategory);
           

            filters.push(new nlobjSearchFilter("custrecord_rent_item_category","custrecord_rent_time_rod_asset","anyof",itemcategory).setOr(false));
        }
        if (subcategory) {
            nlapiLogExecution("DEBUG", "subcategory111111111111111",subcategory);
          
            filters.push(new nlobjSearchFilter("custrecord_rent_item_subcategory","custrecord_rent_time_rod_asset","anyof",subcategory).setOr(false));
            
        }

      
       
            filters.push(new nlobjSearchFilter("custrecord_rent_time_status",null,"noneof",4));
           



     

        reportDefinition.addSearchDataSource('customrecord_rent_timesheet', null, filters, columns, {
            // 'custrecord_rent_asset_item':columns[0],
            'custrecord_rent_item_category': columns[0],
             'custrecord_rent_item_subcategory':columns[1],
             'custrecord_rent_time_rod_asset':columns[2],
            'custrecord_rent_rod_requested_item':columns[3],
            'custrecord_rent_rod_quantity':columns[4],
            // 'custrecord_rent_time_status':columns[5],
           'custrecord_rent_time_customer':columns[5],
           
            'custrecord_rent_timesheet_site':columns[6],
                  'name':columns[7],
            'custrecord_rent_time_post_time_remark':columns[8],
            'custrecord_rent_time_site_contract':columns[9],
            
            'custrecord_rent_rod_all_helpers':columns[10],
            'custrecord_rent_rod_all_operators':columns[11],
            
           

          

        });


        var form = nlapiCreateReportForm('Daily Booking Report');
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