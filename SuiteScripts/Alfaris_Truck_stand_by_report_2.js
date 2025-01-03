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
     function truckstandbyRevenue(context) {
         // Code section : 1
         try {


               
            
             if (context.request.method == 'GET') {
                 var form = serverWidget.createForm({
                     title: 'Truck StandBy Report- Month wise'
                 });

                 var subsidiary = form.addField({
                     id: 'custpage_subsidiary',
                     type: serverWidget.FieldType.SELECT,
                     label: 'Subsidiary',
                     source: 'subsidiary'
                 });
                
                //  var startdate = form.addField({
                //      id: 'custpage_ps_startdate',
                //      type: serverWidget.FieldType.DATE,
                //      label: 'From Date',

                //  });

                //  var enddate = form.addField({
                //      id: 'custpage_ps_enddate',
                //      type: serverWidget.FieldType.DATE,
                //      label: 'To Date',
                //  });


                
                 form.addSubmitButton({
                     label: 'Generate Report'
                 });
                 context.response.writePage(form);
             } else if (context.request.method == 'POST') {
                 log.debug('In POST');
                 try {
                     var subsidiary = context.request.parameters.custpage_subsidiary;
                     log.debug("subsidiary",subsidiary)
                    //  var startdate = context.request.parameters.custpage_ps_startdate;
                    //  var enddate = context.request.parameters.custpage_ps_enddate;
                    
                   
                     var timestamp = stamp();
                     redirect.toSuitelet({
                         scriptId: 'customscript_truck_stand_rep',
                         deploymentId: 'customdeploy_truck_stand_rep',
                         parameters: {
                             'custscript_truck_standby_subsidiary': subsidiary,
                            //  'custscript_truck_standby_strtdate': startdate,
                            //  'custscript_truck_standby_enddate': enddate,
                              


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
         onRequest: truckstandbyRevenue
     };

 });