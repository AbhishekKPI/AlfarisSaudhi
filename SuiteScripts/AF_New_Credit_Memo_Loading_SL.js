/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log', 'N/search', 'N/ui/serverWidget', 'N/runtime', 'N/format'],
    function (record, log, search, serverWidget, runtime, format) {
        /**
         * Definition of the Suitelet script trigger point.
         *
         * @param {Object} context
         * @param {ServerRequest} context.request - Encapsulation of the incoming request
         * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
         * @Since 2015.2
         */
        var lineNumber = 0;

        function rentOnRequestAction(context) {
            // Code section : 1
            log.audit('In loading suitelet');
            // Get method
            var flag = 0;
            if (context.request.method == 'GET') {
                //  try {
                var title = 'Process status';

                var recordID = context.request.parameters['recordID'];
                log.debug('recordID ** ', recordID);

                var memoRecLoad = record.load({
                    type: "creditmemo",
                    id: recordID,
                })

                var newMemoRef = memoRecLoad.getValue({
                    fieldId: "custbody_af_new_credit_memo_ref"
                })

                var Subsidiary = memoRecLoad.getValue({
                    fieldId: "subsidiary"
                })

                var customer = memoRecLoad.getValue({
                    fieldId: "entity"
                })

                var customForm = memoRecLoad.getValue({
                    fieldId: "customform"
                })

                var date = memoRecLoad.getValue({
                    fieldId: "trandate"
                })

                var creditNo = memoRecLoad.getValue({
                    fieldId: "tranid"
                })

                var updatedTranId = creditNo + ".";




                var postPeriod = memoRecLoad.getValue({
                    fieldId: "postingperiod"
                })


                var PONo = memoRecLoad.getValue({
                    fieldId: "otherrefnum"
                })

                var exRate = memoRecLoad.getValue({
                    fieldId: "exchangerate"
                })

                var asDate = memoRecLoad.getValue({
                    fieldId: "asofdate"
                })


                var salesRepPhone = memoRecLoad.getValue({
                    fieldId: "custbody_office_phone"
                })

                var amntWordsArb = memoRecLoad.getValue({
                    fieldId: "custbody_amount_in_words_arabic"
                })

                var amntWordsArbSar = memoRecLoad.getValue({
                    fieldId: "custbody_amount_in_words_arabic_sar"
                })

                var amntWordsEngSar = memoRecLoad.getValue({
                    fieldId: "custbody_amount_in_words_english_sar"
                })

                var qrCode = memoRecLoad.getValue({
                    fieldId: "custbody_qr_code_data"
                })

                //--from
                var jobs = memoRecLoad.getValue({
                    fieldId: "job"
                })
                var mem = memoRecLoad.getValue({
                    fieldId: "memo"
                })
                var partners = memoRecLoad.getValue({
                    fieldId: "partner"
                })
                var region = memoRecLoad.getValue({
                    fieldId: "custbody_region"
                })
                var salesRep = memoRecLoad.getValue({
                    fieldId: "salesrep"
                })
                var salesEffDate = memoRecLoad.getValue({
                    fieldId: "saleseffectivedate"
                })
                var cls = memoRecLoad.getValue({
                    fieldId: "class"
                })
                var dep = memoRecLoad.getValue({
                    fieldId: "department"
                })
                var submitId = memoRecLoad.getValue({
                    fieldId: "bulkprocsubmission"
                })
                var submitDate = memoRecLoad.getValue({
                    fieldId: "custbody_submitted_date"
                })
                var wrServType = memoRecLoad.getValue({
                    fieldId: "custbody_service_type"
                })
                var comment = memoRecLoad.getValue({
                    fieldId: "custbody_custom_status_comment"
                })
                var travelStart = memoRecLoad.getValue({
                    fieldId: "custbody10"
                })
                var travelEnd = memoRecLoad.getValue({
                    fieldId: "custbody13"
                })
                var jobStart = memoRecLoad.getValue({
                    fieldId: "custbody11"
                })
                var jobEnd = memoRecLoad.getValue({
                    fieldId: "custbody12"
                })
                var mobPhone = memoRecLoad.getValue({
                    fieldId: "custbody_mobile_phone"
                })
                var email = memoRecLoad.getValue({
                    fieldId: "custbody_email"
                })
                var phone = memoRecLoad.getValue({
                    fieldId: "custbody_phone"
                })
                var edTemp = memoRecLoad.getValue({
                    fieldId: "custbody_ed_template"
                })
                var edIntro = memoRecLoad.getValue({
                    fieldId: "custbody_ed_introduction"
                })
                var emirate = memoRecLoad.getValue({
                    fieldId: "custbody_emirate_nw"
                })
                var siteName = memoRecLoad.getValue({
                    fieldId: "custbody_sitename"
                })
                var extraInvRef = memoRecLoad.getValue({
                    fieldId: "custbody_extra_charge_invoice_ref"
                })


                //applying line count
                var appliedInvoices = [];
                var applyLineCount = memoRecLoad.getLineCount({ sublistId: 'apply' });
                for (var i = 0; i < applyLineCount; i++) {
                    var isApplied = memoRecLoad.getSublistValue({
                        sublistId: 'apply',
                        fieldId: 'apply', // Whether the transaction is applied
                        line: i
                    });
                    log.debug("isApplied", isApplied)
                    // If the transaction is applied, get its internal ID
                    var transactionType = memoRecLoad.getSublistValue({
                        sublistId: 'apply',
                        fieldId: 'type',
                        line: i
                    });

                    // Process only if it's an applied invoice
                    if (isApplied == true && transactionType == 'Invoice') {
                        var transactionInternalId = memoRecLoad.getSublistValue({
                            sublistId: 'apply',
                            fieldId: 'refnum',
                            line: i
                        });
                        var appliedAmt = memoRecLoad.getSublistValue({
                            sublistId: 'apply',
                            fieldId: 'amount',
                            line: i
                        });

                        // Store the transaction's internal ID in the array
                        appliedInvoices.push({

                            "internalId": transactionInternalId,
                            "appliedAmt": appliedAmt,
                            "apply": true,
                        });
                    }
                }

                log.debug("appliedInvoices", appliedInvoices)

                var lineCount = memoRecLoad.getLineCount({ sublistId: 'item' });
                var itemCount = [];

                for (var m = 0; m < lineCount; m++) {
                    var items = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'item',
                        line: m
                    });
                    var qty = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        line: m
                    });
                    var rate = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'rate',
                        line: m
                    });

                    //---from
                    var amount = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'amount',
                        line: m
                    });
                    var taxRate = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'taxrate1',
                        line: m
                    });
                    var grossAmt = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'grossamt',
                        line: m
                    });
                    var chargeType = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'chargetype',
                        line: m
                    });
                    var charges = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'charges',
                        line: m
                    });
                    var minHours = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_min_hours',
                        line: m
                    });
                    var minDays = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_min_days',
                        line: m
                    });
                    var minBasePrice = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_min_base_price',
                        line: m
                    });
                    var relAsset = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_far_trn_relatedasset',
                        line: m
                    });
                    var hidePrint = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_hide_in_print',
                        line: m
                    });
                    var preHrlyRate = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_preffered_hourly_rate',
                        line: m
                    });
                    var remarks = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_remarks',
                        line: m
                    });
                    var soLineNo = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_so_line_unique_number',
                        line: m
                    });
                    var minPrHour = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_minimum_hours_print',
                        line: m
                    });
                    var minPrday = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_minimum_days_print',
                        line: m
                    });
                    var KmpRate = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_per_km_rate',
                        line: m
                    });
                    var chargeRzn = memoRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_ksa_allowance_charge_reason',
                        line: m
                    });




                    itemCount.push({
                        "itemId": items,
                        "quantity": qty,


                        //--from
                        "rate": rate,
                        "amount": amount,
                        "taxRate": taxRate,
                        "grossAmt": grossAmt,
                        "chargeType": chargeType,
                        "charges": charges,
                        "minHours": minHours,
                        "minDays": minDays,
                        "minBasePrice": minBasePrice,
                        "relAsset": relAsset,
                        "hidePrint": hidePrint,
                        "preHrlyRate": preHrlyRate,
                        "remarks": remarks,
                        "soLineNo": soLineNo,
                        "minPrHour": minPrHour,
                        "minPrday": minPrday,
                        "KmpRate": KmpRate,
                        "chargeRzn": chargeRzn,

                    })

                }
                log.debug("itemCount", itemCount)




                log.debug("Subsidiary", Subsidiary)
                if (Subsidiary == 8) {
                    var newSub = 22
                } else if (Subsidiary == 16) {
                    var newSub = 23
                }

                log.debug("newSub---", newSub)
                log.debug("newMemoRef==", newMemoRef)

                if (!newMemoRef) {
                    log.debug("getting inside if not = newMemoRef===", newMemoRef)
                    try {
                        var memoRec = record.create({
                            type: "creditmemo",
                            id: recordID,
                            isDynamic: true,

                        });

                        memoRec.setValue({
                            fieldId: "customform",
                            value: customForm
                        })

                        memoRec.setValue({
                            fieldId: "entity",
                            value: customer
                        })

                        // memoRec.setValue({
                        //     fieldId: "tranid",
                        //     value: creditNo
                        // })

                        // var creditmemoFieldNo = memoRec.getValue({
                        //     fieldId: "tranid",
                        // })
                        // log.debug("creditmemoFieldNo",creditmemoFieldNo)

                        memoRec.setValue({
                            fieldId: "location",
                            value: ""
                        })

                        memoRec.setValue({
                            fieldId: "subsidiary",
                            value: newSub
                        })


                        memoRec.setValue({
                            fieldId: "custbody_af_new_credit_memo_ref",
                            value: recordID
                        })

                        memoRec.setValue({
                            fieldId: "trandate",
                            value: date
                        })

                        memoRec.setValue({
                            fieldId: "postingperiod",
                            value: postPeriod
                        })

                        memoRec.setValue({
                            fieldId: "otherrefnum",
                            value: PONo
                        })

                        memoRec.setValue({
                            fieldId: "exchangerate",
                            value: exRate
                        })

                        memoRec.setValue({
                            fieldId: "asofdate",
                            value: asDate
                        })

                        memoRec.setValue({
                            fieldId: "custbody_office_phone",
                            value: salesRepPhone
                        })

                        memoRec.setValue({
                            fieldId: "custbody_amount_in_words_arabic",
                            value: amntWordsArb
                        })

                        memoRec.setValue({
                            fieldId: "custbody_amount_in_words_arabic_sar",
                            value: amntWordsArbSar
                        })

                        memoRec.setValue({
                            fieldId: "custbody_amount_in_words_english_sar",
                            value: amntWordsEngSar
                        })

                        memoRec.setValue({
                            fieldId: "custbody_qr_code_data",
                            value: qrCode
                        })


                        //---from
                        memoRec.setValue({
                            fieldId: "job",
                            value: jobs
                        })
                        memoRec.setValue({
                            fieldId: "memo",
                            value: mem
                        })
                        memoRec.setValue({
                            fieldId: "partner",
                            value: partners
                        })
                        memoRec.setValue({
                            fieldId: "custbody_region",
                            value: region
                        })
                        memoRec.setValue({
                            fieldId: "salesrep",
                            value: salesRep
                        })
                        memoRec.setValue({
                            fieldId: "saleseffectivedate",
                            value: salesEffDate
                        })
                        memoRec.setValue({
                            fieldId: "class",
                            value: cls
                        })
                        memoRec.setValue({
                            fieldId: "department",
                            value: dep
                        })
                        memoRec.setValue({
                            fieldId: "bulkprocsubmission",
                            value: submitId
                        })
                        memoRec.setValue({
                            fieldId: "custbody_submitted_date",
                            value: submitDate
                        })
                        memoRec.setValue({
                            fieldId: "custbody_service_type",
                            value: wrServType
                        })
                        memoRec.setValue({
                            fieldId: "custbody_custom_status_comment",
                            value: comment
                        })
                        memoRec.setValue({
                            fieldId: "custbody10",
                            value: travelStart
                        })
                        memoRec.setValue({
                            fieldId: "custbody13",
                            value: travelEnd
                        })
                        memoRec.setValue({
                            fieldId: "custbody11",
                            value: jobStart
                        })
                        memoRec.setValue({
                            fieldId: "custbody12",
                            value: jobEnd
                        })
                        memoRec.setValue({
                            fieldId: "custbody_mobile_phone",
                            value: mobPhone
                        })
                        memoRec.setValue({
                            fieldId: "custbody_email",
                            value: email
                        })
                        memoRec.setValue({
                            fieldId: "custbody_phone",
                            value: phone
                        })
                        memoRec.setValue({
                            fieldId: "custbody_ed_template",
                            value: edTemp
                        })
                        memoRec.setValue({
                            fieldId: "custbody_ed_introduction",
                            value: edIntro
                        })
                        memoRec.setValue({
                            fieldId: "custbody_emirate_nw",
                            value: emirate
                        })
                        memoRec.setValue({
                            fieldId: "custbody_sitename",
                            value: siteName
                        })
                        memoRec.setValue({
                            fieldId: "custbody_extra_charge_invoice_ref",
                            value: extraInvRef
                        })





                        for (var m = 0; m < itemCount.length; m++) {
                            var item = itemCount[m].itemId;
                            var quant = itemCount[m].quantity;


                            //--from
                            var rates = itemCount[m].rate;
                            var amount = itemCount[m].amount;
                            var taxRate = itemCount[m].taxRate;
                            var grossAmt = itemCount[m].grossAmt;
                            var chargeType = itemCount[m].chargeType;
                            var charges = itemCount[m].charges;
                            var minHours = itemCount[m].minHours;
                            var minDays = itemCount[m].minDays;
                            var minBasePrice = itemCount[m].minBasePrice;
                            var relAsset = itemCount[m].relAsset;
                            var hidePrint = itemCount[m].hidePrint;
                            var preHrlyRate = itemCount[m].preHrlyRate;
                            var remarks = itemCount[m].remarks;
                            var soLineNo = itemCount[m].soLineNo;
                            var minPrHour = itemCount[m].minPrHour;
                            var minPrday = itemCount[m].minPrday;
                            var KmpRate = itemCount[m].KmpRate;
                            var chargeRzn = itemCount[m].chargeRzn;

                            log.debug("item", item)

                            memoRec.selectNewLine({
                                sublistId: 'item'
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'item',
                                value: item
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'quantity',
                                value: quant
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'rate',
                                value: rates
                            });


                            //---from--
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'amount',
                                value: amount
                            });

                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'taxrate1',
                                value: taxRate
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'grossamt',
                                value: grossAmt
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'chargetype',
                                value: chargeType
                            });
                            // memoRec.setCurrentSublistValue({
                            //     sublistId: 'item',
                            //     fieldId: 'charges',
                            //     value: charges
                            // });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_min_hours',
                                value: minHours
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_min_days',
                                value: minDays
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_min_base_price',
                                value: minBasePrice
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_far_trn_relatedasset',
                                value: relAsset
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_hide_in_print',
                                value: hidePrint
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_preffered_hourly_rate',
                                value: preHrlyRate
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_remarks',
                                value: remarks
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_so_line_unique_number',
                                value: soLineNo
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_minimum_hours_print',
                                value: minPrHour
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_minimum_days_print',
                                value: minPrday
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_per_km_rate',
                                value: KmpRate
                            });
                            memoRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_ksa_allowance_charge_reason',
                                value: chargeRzn
                            });


                            memoRec.commitLine({
                                sublistId: 'item'
                            });
                        }
                        //apply line count
                        for (var i = 0; i < appliedInvoices.length; i++) {
                            var internalId = appliedInvoices[i].internalId;
                            var apply = appliedInvoices[i].apply;
                            var appliedAmt = appliedInvoices[i].appliedAmt;

                            var newApplyLineCount = memoRec.getLineCount({ sublistId: 'apply' });
                            log.debug("newApplyLineCount==", newApplyLineCount)
                            for (var n = 0; n < newApplyLineCount; n++) {
                                var newRecDocNum = memoRec.getSublistValue({
                                    sublistId: 'apply',
                                    fieldId: 'refnum',
                                    line: n
                                });
                                log.debug("internalId==", internalId)
                                log.debug("newRecDocNum==", newRecDocNum)
                                if (newRecDocNum == internalId) {
                                    memoRec.selectLine({
                                        sublistId: 'apply',
                                        line: n
                                    });
                                    log.debug("line selected")
                                    memoRec.setCurrentSublistValue({
                                        sublistId: 'apply',
                                        fieldId: 'amount',
                                        line: n,
                                        value: appliedAmt
                                    })
                                    log.debug("after setting value==", appliedAmt)
                                    memoRec.commitLine({
                                        sublistId: 'apply'
                                    })
                                    log.debug("Committed")
                                }
                            }

                        }

                        var lineItemCount = memoRec.getLineCount({
                            sublistId: "item"
                        })

                        log.debug("lineItemCount", lineItemCount)


                        //updating in old Memo
                        var updatedMemo = record.load({
                            type: "creditmemo",
                            id: recordID,
                            isDynamic: true
                        })
                        updatedMemo.setValue({
                            fieldId: "tranid",
                            value: updatedTranId
                        })
                        updatedMemo.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        })



                        memoRec.setValue({
                            fieldId: 'tranid',
                            value: creditNo
                        });

                        var savememoRec = memoRec.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        })
                        log.debug("savememoRec==", savememoRec)


                        record.submitFields({
                            type: 'creditmemo',
                            id: savememoRec,
                            values: {
                                custbody_af_new_credit_memo_ref: recordID,
                            }
                        });
                        log.debug("After Submit Field in new Record")

                        record.submitFields({
                            type: 'creditmemo',
                            id: recordID,
                            values: {
                                custbody_af_new_credit_memo_ref: savememoRec,
                            }
                        });



                    } catch (e) {
                        flag = 1
                        var errMsg = e.message
                        log.error('error', e.toString());
                    }
                } else {
                    log.debug("getting inside else newMemoRef===", newMemoRef)
                    var savememoRec = newMemoRef;
                }

                var form = serverWidget.createForm({
                    title: title,
                    hideNavBar: false
                });

                // Status field
                var statusField = form.addField({
                    id: 'custpage_completion_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Completion Status'
                });

                if (flag == 1) {
                    statusField.defaultValue = 'Failed';
                }
                else {
                    statusField.defaultValue = 'Completed';
                }
                statusField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE // diaply type inline
                });

                var errorField = form.addField({
                    id: 'custpage_error_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Error Status'
                });
                if (flag == 1) {
                    errorField.defaultValue = errMsg;
                }
                else {
                    errorField.defaultValue = '';
                }
                errorField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE // diaply type inline
                });
                var list = form.addSublist({
                    id: 'loading_details',
                    type: serverWidget.SublistType.STATICLIST,
                    label: title
                });

                // SL number field
                list.addField({
                    id: 'slno',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'SL.NO',
                    align: serverWidget.LayoutJustification.CENTER
                });

                // Record type field
                list.addField({
                    id: 'record',
                    type: serverWidget.FieldType.TEXT,
                    label: 'RECORD',
                    align: serverWidget.LayoutJustification.LEFT
                });

                // Action field
                list.addField({
                    id: 'action',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'ACTION',
                    align: serverWidget.LayoutJustification.LEFT
                });

                // status field
                list.addField({
                    id: 'status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'STATUS',
                    align: serverWidget.LayoutJustification.LEFT
                });



                //redirect link to famasset
                var htmlImage = list.addField({
                    id: 'custpage_htmlfield',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: 'Credit Memo RECORD'
                });


                var scStatus;
                log.debug('scStatus last', scStatus);
                if (scStatus != "Complete" && scStatus != "Failed") {
                    form.addButton({
                        id: 'custpage_refresh',
                        label: 'Refresh',
                        functionName: 'reloadPage' // the function called when the button is pressed
                    });
                }


                // setting values fromsaved search in form fields 
                var rev_status = "Pending";
                var res1 = {};

                res1['slno'] = "1"
                res1['record'] = 'Credit Memo Record - ' + savememoRec


                if (flag == 1) {
                    res1['action'] = 'Failed';
                }
                else {
                    res1['action'] = 'Completed';
                }
                if (flag == 1) {
                    res1['status'] = 'Failed';
                }
                else {
                    res1['status'] = 'Success';
                }




                list.setSublistValue({
                    id: 'slno',
                    line: 0,
                    value: res1['slno']
                });
                list.setSublistValue({
                    id: 'record',
                    line: 0,
                    value: res1['record']
                });
                list.setSublistValue({
                    id: 'action',
                    line: 0,
                    value: res1['action']
                });
                list.setSublistValue({
                    id: 'status',
                    line: 0,
                    value: res1['status']
                });
                list.setSublistValue({
                    id: 'custpage_htmlfield',
                    line: 0,
                    value: "<a href=https://4647359-sb1.app.netsuite.com/app/accounting/transactions/custcred.nl?id=" + savememoRec + ">" + savememoRec + "</a>"
                });
                context.response.writePage(form);
            }
        }

        return {
            onRequest: rentOnRequestAction
        };

    });

// Code section :10
//  common function for saved search

var delay = (function () {
    //  log.debug("Testing....Delay");
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

