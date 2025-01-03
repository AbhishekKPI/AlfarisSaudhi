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
     function EquipmentRevenue(context) {
         // Code section : 1
         try {


               
            
             if (context.request.method == 'GET') {
                 var form = serverWidget.createForm({
                     title: 'Equipment Wise Revenue Report'
                 });

                 var subsidiary = form.addField({
                     id: 'custpage_subsidiary',
                     type: serverWidget.FieldType.SELECT,
                     label: 'Subsidiary',
                     source: 'subsidiary'
                 });
                 var startdate = form.addField({
                     id: 'custpage_ps_startdate',
                     type: serverWidget.FieldType.DATE,
                     label: 'From Date',

                 });

                 var enddate = form.addField({
                     id: 'custpage_ps_enddate',
                     type: serverWidget.FieldType.DATE,
                     label: 'To Date',
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
                //  var status = form.addField({
                //     id: 'custpage_status',
                //     type: serverWidget.FieldType.MULTISELECT,
                //     label: 'Status',
                //     // source: 'approvalstatus'
                // });
                // status.addSelectOption({
                //     value: "",
                //     text: ""
                // });
                // status.addSelectOption({
                //     value: "1",
                //     text: "Invoice:Open"
                // });
                // status.addSelectOption({
                //     value: "2",
                //     text: "Invoice:Paid In Full"
                // });
                // status.addSelectOption({
                //     value: "3",
                //     text: "Invoice:Pending Approval"
                // });
                // status.addSelectOption({
                //     value: "4",
                //     text: "Invoice:Rejected"
                // });
                // status.addSelectOption({
                //     value: "5",
                //     text: "Invoice:Voided"
                // });
                

                

                 form.addSubmitButton({
                     label: 'Generate Report'
                 });
                 context.response.writePage(form);
             } else if (context.request.method == 'POST') {
                 log.debug('In POST');
                 try {
                     var subsidiary = context.request.parameters.custpage_subsidiary;
                     log.debug("subsidiary",subsidiary)
                     var startdate = context.request.parameters.custpage_ps_startdate;
                     var enddate = context.request.parameters.custpage_ps_enddate;
                     var category = context.request.parameters.custpage_category;
                     var subcategory = context.request.parameters.custpage_sub_category;
                    // var status=context.request.parameters.custpage_status;
                     var timestamp = stamp();
                     redirect.toSuitelet({
                         scriptId: 'customscript_eqiuquementrevenue_suitlet',
                         deploymentId: 'customdeploy_eqiuquementrevenue_suitlet',
                         parameters: {
                             'custscript_equip_subsidiary': subsidiary,
                             'custscript_equip_strtdate': startdate,
                             'custscript_equip_enddate': enddate,
                             'custscript_equip_category': category,
                             'custscript_equip_sub_category':subcategory,
                            //  'custscript_equip_status':status,


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
         onRequest: EquipmentRevenue
     };

 });