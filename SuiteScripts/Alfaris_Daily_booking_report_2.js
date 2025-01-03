/**
 *@NApiVersion 2.x
 *@NModuleScope Public
 *@NScriptType Suitelet
 
 * Module Description
 * Deployment for leave_balance_reportSuitelet
 * Includes parsOnRequestAction
 *
 * Version    Date            Author        Remarks
 */
 define(['N/record', 'N/search', 'N/format', 'N/task', 'N/ui/serverWidget', 'N/redirect', 'N/runtime', 'N/error', 'N/log'],
 function(record, search, format, task, serverWidget, redirect, runtime, error, log) {

     /**
      * Definition of the Suitelet script trigger point.
      *
      * @param {Object} context
      * @param {ServerRequest} context.request - Encapsulation of the incoming request
      * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
      * @Since 2015.2
      */
     function DailyBooking(context) {
         // Code section : 1
         try {


               
            
             if (context.request.method == 'GET') {
                 var form = serverWidget.createForm({
                     title: 'Daily Booking Report'
                 });

                 var subsidiary = form.addField({
                     id: 'custpage_subsidiary',
                     type: serverWidget.FieldType.SELECT,
                     label: 'Subsidiary',
                     source: 'subsidiary'
                 });
                


                 var category= form.addField({
                     id: 'custpage_category',
                     type: serverWidget.FieldType.SELECT,
                     label: 'Category',
                     source: 'customlist1330'
                 });

                 var subcategory = form.addField({
                     id: 'custpage_sub_category',
                     type: serverWidget.FieldType.SELECT,
                     label: 'Sub Category',
                     source: 'customlist_subcategory'
                 });

                 var asset = form.addField({
                    id: 'custpage_asset',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Asset',
                    source: 'customrecord_rent_asset'
                });
                var subcategory = form.addField({
                    id: 'custpage_from_date',
                    type: serverWidget.FieldType.DATE,
                    label:  'From Date'
                });

                var asset = form.addField({
                   id: 'custpage_to_date',
                   type: serverWidget.FieldType.DATE,
                   label: 'To Date',
                   
               });
               
                
                

                

                 form.addSubmitButton({
                     label: 'Generate Report'
                 });
                 context.response.writePage(form);
             } else if (context.request.method == 'POST') {
                 log.debug('In POST');
                 try {
                     var subsidiary = context.request.parameters.custpage_subsidiary;
                    
                     var category = context.request.parameters.custpage_category;
                     var subcategory = context.request.parameters.custpage_sub_category;
                    var asset=context.request.parameters.custpage_asset;
                    var fromDate= context.request.parameters.custpage_from_date;
                    var toDate=context.request.parameters.custpage_to_date;
                     var timestamp = stamp();
                     redirect.toSuitelet({
                         scriptId: 'customscript_alfaris_daily_booking_repor',
                         deploymentId: 'customdeploy_alfaris_daily_booking_repor',
                         parameters: {
                             'custscript_daily_booking_subsidiary': subsidiary,
                             'custscript__daily_booking_category': category,
                             'custscript_daily_booking_sub_category':subcategory,
                             'custscript_daily_booking_asset':asset,
                             'custscript_daily_booking_from_date':fromDate,
                             'custscript_daily_booking_to_date':toDate,


                         }
                     });
                 } catch (e) {
                     log.error('error', e.toString());
                 }
             }
         } catch (e) {
             log.error('error', e.toString());
         }
     }

     function stamp() {
         var tStamp = Math.floor(Date.now() / 1000);
         return tStamp;
     }

     return {
         onRequest: DailyBooking
     };

 });