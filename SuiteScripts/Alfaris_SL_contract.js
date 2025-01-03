/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/log', 'N/runtime', 'N/record', 'N/search', 'N/email', 'N/format', 'N/config', 'N/task', 'N/redirect'],
    function(serverWidget, log, runtime, record, search, email, format, config, task, redirect) {
        function onRequest(scriptContext) {
            if (scriptContext.request.method === 'GET') {

                var rentalUnitParam = scriptContext.request.parameters['rentalUnit'];
                var robdid = scriptContext.request.parameters.robdID;

                var robdRec = record.load({
                    type: 'customrecord_rent_robd',
                    id: robdid,
                    isDynamic: false,
                });

                var billFromDate = robdRec.getValue({
                    fieldId: 'custrecord_rent_robd_bill_from_date'
                });
                var billToDate = robdRec.getValue({
                    fieldId: 'custrecord_rent_robd_bill_to_date'
                });

                var billableDays = robdRec.getValue({
                    fieldId: 'custrecord_rent_robd_billable_days'
                });
                var amount = robdRec.getValue({
                    fieldId: 'custrecord_rent_robd_invoicing_amount'
                });
                var invoiceRef = robdRec.getValue({
                    fieldId: 'custrecord_rent_robd_invoice'
                });

                var extraChargeInvoiceRef = robdRec.getValue({
                    fieldId: 'custrecord_rent_robd_extra_charge_invoic'
                });
                var ratetoCalculate = robdRec.getValue({
                    fieldId: 'custrecord_rent_robd_agreed_rate'
                });







                // Creating forms and fields

                var form = serverWidget.createForm({
                    title: 'Update ROBD'
                });

                var Robd_Id = form.addField({
                    id: 'custpage_robd_id',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Robd Id',
                    align: serverWidget.LayoutJustification.CENTER
                });

                Robd_Id.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE
                });
                Robd_Id.defaultValue = robdid;


                var invoice_Id = form.addField({
                    id: 'custpage_invoice_id',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Invoice ID',
                    source: 'transaction', // type is transaction
                    align: serverWidget.LayoutJustification.CENTER
                });

                invoice_Id.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE
                });
                invoice_Id.defaultValue = invoiceRef;

                var extra_invoice_Id = form.addField({
                    id: 'custpage_extra_invoice_id',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Extra charge Invoice ID',
                    source: 'transaction', // type is transaction
                    align: serverWidget.LayoutJustification.CENTER
                });

                extra_invoice_Id.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE
                });
                extra_invoice_Id.defaultValue = extraChargeInvoiceRef;

                var billfrmDate = form.addField({
                    id: 'custpage_frm_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Bill From Date'
                });
                billfrmDate.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                billfrmDate.defaultValue = billFromDate;

                var billdate = form.addField({
                    id: 'custpage_to_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Bill To Date'
                });
                billdate.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                billdate.defaultValue = billToDate;


                var billdays = form.addField({
                    id: 'custpage_bill_days',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Billable Days'
                });
                billdays.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                billdays.defaultValue = billableDays;

                var robdAMT = form.addField({
                    id: 'custpage_amount',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Invoicing Amount',
                    // align: serverWidget.LayoutJustification.Le
                });
                robdAMT.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                robdAMT.defaultValue = amount;

                var rate = form.addField({
                    id: 'custpage_rate_calculate',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Rate',
                    // align: serverWidget.LayoutJustification.
                });
                rate.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN
                });
                rate.defaultValue = ratetoCalculate;














                var billfromDate = form.addField({
                    id: 'custpage_from_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Adjust Bill From Date'
                });
                // billfromDate.updateDisplayType({
                //     displayType: serverWidget.FieldDisplayType.DISABLED
                // });
                // billfromDate.defaultValue = billFromDate;

                var billtoDate = form.addField({
                    id: 'custpage_bill_to_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Adjust Bill To Date'
                });
                // billtoDate.updateDisplayType({
                //     displayType: serverWidget.FieldDisplayType.DISABLED
                // });
                // billtoDate.defaultValue = billToDate;

                // var date1 = new Date(billfromDate);
                // var date2 = new Date(billtoDate);
                // var diffTime = Math.abs(date2 - date1);
                // var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


                var billabledays = form.addField({
                    id: 'custpage_billable_days',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Adjust Billable Days'
                });
                billabledays.isMandatory = true;
                billabledays.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                // billabledays.defaultValue = diffDays;

                var robdAmount = form.addField({
                    id: 'custpage_robd_amount',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Adjust Invoicing Amount'
                });
                robdAmount.isMandatory = true;
                robdAmount.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                // robdAmount.defaultValue = amount;


                var comment = form.addField({
                    id: 'custpage_comment',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Reason for Adjustment'
                });
                comment.isMandatory = true;
                // comment.updateDisplayType({
                //     displayType: serverWidget.FieldDisplayType.DISABLED
                // });
                // robdAmount.defaultValue = amount;




                form.addSubmitButton({
                    label: 'Update ROBD'
                });

                form.addButton({
                    id: 'custpage_calculate_button',
                    label: 'Calculate Amount',
                    functionName: 'calculateAmountContract'
                });


                form.addButton({
                    id: 'custpage_button',
                    label: 'Cancel',
                    functionName: 'goBack'
                });

                // 29685
                form.clientScriptFileId = 29685
                    // form.clientScriptModulePath = 'ClientScript/RENTEGRATE_Modify_ROBD_CS.js';

                scriptContext.response.writePage(form);

            }
            if (scriptContext.request.method == 'POST') {
                var robdID = scriptContext.request.parameters.custpage_robd_id;
                var actualInvoice = scriptContext.request.parameters.custpage_invoice_id;
                var extraInvoice = scriptContext.request.parameters.custpage_extra_invoice_id;

                var billFromDate = scriptContext.request.parameters.custpage_from_date;
                var billToDate = scriptContext.request.parameters.custpage_bill_to_date;
                var billableDays = scriptContext.request.parameters.custpage_billable_days;
                var robdAmount = scriptContext.request.parameters.custpage_robd_amount;
                var comment = scriptContext.request.parameters.custpage_comment;

                log.debug("billFromDate",billFromDate)
                log.debug("billToDate",billToDate)
                log.debug("billableDays",billableDays)
                log.debug("robdAmount",robdAmount)
                log.debug("comment",comment)
                
                billFromDate = format.format({
                    value: billFromDate,
                    type: format.Type.DATE
                });
                billFromDate = format.parse({
                    value: billFromDate,
                    type: format.Type.DATE
                });
                billToDate = format.format({
                    value: billToDate,
                    type: format.Type.DATE
                });
                billToDate = format.parse({
                    value: billToDate,
                    type: format.Type.DATE
                });


                log.debug("billFromDate format",billFromDate)
                log.debug("billToDate format",billToDate)
                // try {
                    var assetRec = record.submitFields({
                        type: 'customrecord_rent_robd',
                        id: robdID,
                        values: {
                            custrecord_rent_robd_bill_from_date: billFromDate,
                            custrecord_rent_robd_bill_to_date: billToDate,
                            custrecord_rent_robd_billable_days: billableDays,
                            custrecord_rent_robd_agreed_amount: robdAmount,
                            custrecord_rent_robd_invoicing_rate:robdAmount,
                            custrecord_rent_robd_invoicing_amount:robdAmount,
                            custrecord_robd_adjusted: true,
                            custrecord_reason_for_adjustment: comment
                        },
                        options: {
                            enableSourcing: false,
                            ignoreMandatoryFields : true
                        }
                    });

                    // update in Invocie
                    if (actualInvoice) {
                        var invoiceRec = record.load({
                            type: 'invoice',
                            id: actualInvoice,
                            isDynamic: false,
                        });
                        var itemCount = invoiceRec.getLineCount('item');
                        for (var i = 0; i < itemCount; i++) {
                            var invRobdID = invoiceRec.getSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_robd',
                                line: i
                            });

                            if (invRobdID == robdID) {
                                log.debug("invRobdID invRobdID",invRobdID)
                                log.debug("robdID robdID",robdID)
                                invoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_rent_from_date',
                                    line: i,
                                    value: billFromDate
                                });
                                log.debug("1",billFromDate)
                                invoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_rent_to_date',
                                    line: i,
                                    value: billToDate
                                });
                                log.debug("2",billToDate)
                                invoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_billable_days',
                                    line: i,
                                    value: billableDays
                                });
                                log.debug("3")
                                invoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'rate',
                                    line: i,
                                    value: robdAmount
                                });
                                log.debug("4")
                                invoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'amount',
                                    line: i,
                                    value: robdAmount
                                });
                                log.debug("5")
                            }

                        }
                        var recordId = invoiceRec.save({
                            enableSourcing: false,
                            ignoreMandatoryFields: true
                        });
                         log.debug('invoice updated NORMAL');
                    }

                    if (extraInvoice) {
                        var extrainvoiceRec = record.load({
                            type: 'invoice',
                            id: extraInvoice,
                            isDynamic: false,
                        });
                        var itemCount = extrainvoiceRec.getLineCount('item');
                        for (var j = 0; j < itemCount; j++) {
                            var invRobdID = extrainvoiceRec.getSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_robd',
                                line: j
                            });

                            log.debug('invPrHrRateExtra Extra invoice == ', invRobdID);

                            if (invRobdID == robdID) {
                                log.debug('inside robd same NORMAL== ');

                                extrainvoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_rent_from_date',
                                    line: j,
                                    value: new Date(billFromDate)
                                });
                                extrainvoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_rent_to_date',
                                    line: j,
                                    value: new Date(billToDate)
                                });
                                extrainvoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_billable_days',
                                    line: j,
                                    value: billableDays
                                });
                                extrainvoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'rate',
                                    line: j,
                                    value: robdAmount
                                });
                                extrainvoiceRec.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'amount',
                                    line: j,
                                    value: robdAmount
                                });
                            }
                        }
                        var recordId = extrainvoiceRec.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        });
                        log.debug('invoice updated EXTRA');
                    }

                    redirect.toRecord({
                        type: 'customrecord_rent_robd',
                        id: robdID
                    });



                // } catch (e) {
                //     log.error('error', e.toString());
                // }

            }
        }

        function stamp() {
            var tStamp = Math.floor(Date.now() / 1000);
            return tStamp;
        }

        return {
            onRequest: onRequest
        };
    });