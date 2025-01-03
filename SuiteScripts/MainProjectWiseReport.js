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
    nlapiLogExecution("DEBUG", "subsidiary",subsidiary);
    var startdate = request.getParameter('custscript_equip_strtdate');
    nlapiLogExecution("DEBUG", "startdate",startdate);
   var enddate = request.getParameter('custscript_equip_enddate');
   nlapiLogExecution("DEBUG", "enddate",enddate);

    var category = request.getParameter('custscript_equip_category');
    nlapiLogExecution("DEBUG", "category",category);

    var subcategory = request.getParameter('custscript_equip_sub_category');
    nlapiLogExecution("DEBUG", "subcategory",subcategory);
    var mainproject = request.getParameter('custscript_equip_mainproject');
    nlapiLogExecution("DEBUG", "mainproject",mainproject);



    var nameSub = '';
    try {
        var reportDefinition = nlapiCreateReportDefinition();
        var mainProject = reportDefinition.addRowHierarchy('custbody_af_main_project', "Main Project", 'TEXT');
         var subProject = reportDefinition.addRowHierarchy('entityid', "Main Project", 'TEXT');
         var itemCategory = reportDefinition.addRowHierarchy('custitem_category',"Main Project", 'TEXT');
         var itemSubcategory = reportDefinition.addRowHierarchy('custitem_subcategory', "Main Project", 'TEXT');
         var assetId = reportDefinition.addRowHierarchy('custcol_rent_asset_ref', "Main Project", 'TEXT');

        //   var fxgrosamt = reportDefinition.addRowHierarchy('fxgrossamount', "Gross Amount", 'TEXT');




        // var itemCategory = reportDefinition.addColumn('custitem_category', false, 'Item Category', null, 'TEXT', null);
        // var itemSubcategory = reportDefinition.addColumn('custitem_subcategory', false, 'Item SubCategory', null, 'TEXT', null);
        // var assetItem = reportDefinition.addColumn('custrecord_rent_asset_item', false, 'Item Capacity', null, 'TEXT', null);
        // var assetId = reportDefinition.addColumn('custcol_rent_asset_ref', false, 'Asset', null, 'TEXT', null);
        // var fxgrosamt = reportDefinition.addColumn('fxgrossamount', true, 'Amount', null, 'currency', null);
        var fxgrosamt = reportDefinition.addColumn('amount', true, 'Amount', null, 'currency', null);


        var columns = new Array();
        columns.push(new nlobjSearchColumn("custbody_af_main_project",'CUSTBODY_RENT_SALES_ORDER',"GROUP"));
        columns.push(new nlobjSearchColumn("entityid",'customer',"GROUP"));
         columns.push(new nlobjSearchColumn("custitem_category","item","GROUP" ));
         columns.push(new nlobjSearchColumn("custitem_subcategory","item", "GROUP"));
        //   columns.push(new nlobjSearchColumn("custrecord_rent_asset_item","CUSTCOL_RENT_ASSET_REF","GROUP"));
         columns.push(new nlobjSearchColumn("custcol_rent_asset_ref", null,"GROUP"));
        //  columns.push(new nlobjSearchColumn("fxgrossamount",null,"SUM"))
        columns.push(new nlobjSearchColumn("amount",null,"SUM"))



        var filters = new Array();
        if (subsidiary) {
            nlapiLogExecution("DEBUG", "subsidiary11111111111",subsidiary);

            filters.push(new nlobjSearchFilter("subsidiary",null, "anyof", subsidiary).setOr(false));
        }
        if (startdate || enddate) {
            nlapiLogExecution("DEBUG", "enddate1111111111111111111111111111", enddate);


            filters.push(new nlobjSearchFilter("trandate", null, "within", startdate, enddate).setOr(false));

        }
        if (category) {
            nlapiLogExecution("DEBUG", "category111111111111111",category);
           

            filters.push(new nlobjSearchFilter("custrecord_rent_item_category","custcol_rent_asset_ref","anyof",category).setOr(false));
        }
        if (subcategory) {
            nlapiLogExecution("DEBUG", "subcategory111111111111111",subcategory);
          
            filters.push(new nlobjSearchFilter("custrecord_rent_item_subcategory","custcol_rent_asset_ref","anyof",subcategory).setOr(false));
            
        }
        if (mainproject) {
            nlapiLogExecution("DEBUG", "mainproject111111111111111",mainproject);
          
            filters.push(new nlobjSearchFilter("custbody_af_main_project","custbody_rent_sales_order","anyof",mainproject).setOr(false));
            
        }
     

        filters.push(new nlobjSearchFilter('type',null, 'anyof','CustInvc').setOr(false));

            filters.push(new nlobjSearchFilter('mainline', null, 'is', "F").setOr(false));

            filters.push(new nlobjSearchFilter('custcol_rent_asset_ref',null, 'noneof', "@NONE@").setOr(false));

            filters.push(new nlobjSearchFilter('mainline', 'custbody_rent_sales_order', 'is', "T").setOr(false));
            filters.push(new nlobjSearchFilter('status', null, 'anyof', "CustInvc:B", "CustInvc:A").setOr(false));

            filters.push(new nlobjSearchFilter('amount', null, 'greaterthan', 0.00));
            filters.push(new nlobjSearchFilter('taxline', null, 'is', "F").setOr(false));
            filters.push(new nlobjSearchFilter('shipping', null, 'is', "F").setOr(false));
           

     

        reportDefinition.addSearchDataSource('invoice', null, filters, columns, {
            'custbody_af_main_project': columns[0],
              'entityid': columns[1],
             'custitem_category':columns[2],
             'custitem_subcategory':columns[3],
            'custcol_rent_asset_ref':columns[4],
            // 'fxgrossamount':columns[5]
            'amount':columns[5]


            //  'custrecord_pr_payslip_det_amount': columns[0],
            // 'custrecord_pr_payslip_det_comp_type': columns[1],
            // 'department': columns[3],
            // 'formulatext': columns[0],


        });


        var form = nlapiCreateReportForm('Main Project Wise Revenue Report');
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