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

                var invRecLoad = record.load({
                    type: "invoice",
                    id: recordID,
                })

                var newInvRef = invRecLoad.getValue({
                    fieldId: "custbody_af_new_invoice_ref"
                })

                var Subsidiary = invRecLoad.getValue({
                    fieldId: "subsidiary"
                })

                var customer = invRecLoad.getValue({
                    fieldId: "entity"
                })

                var customForm = invRecLoad.getValue({
                    fieldId: "customform"
                })

                var date = invRecLoad.getValue({
                    fieldId: "trandate"
                })
                log.debug("trandate", date)

                var invNo = invRecLoad.getValue({
                    fieldId: "tranid"
                })

                log.debug("invNo of main rec", invNo)


                var updatedTranId = invNo + ".";







                var term = invRecLoad.getValue({
                    fieldId: "terms"
                })

                var salesRep = invRecLoad.getValue({
                    fieldId: "salesrep"
                })

                var duedate = invRecLoad.getValue({
                    fieldId: "duedate"
                })

                var postPeriod = invRecLoad.getValue({
                    fieldId: "postingperiod"
                })

                var startDate = invRecLoad.getValue({
                    fieldId: "startdate"
                })

                var endDate = invRecLoad.getValue({
                    fieldId: "enddate"
                })

                var billCycle = invRecLoad.getValue({
                    fieldId: "custbody_rent_billing_cycle"
                })

                var PONo = invRecLoad.getValue({
                    fieldId: "otherrefnum"
                })

                var bankAcc = invRecLoad.getValue({
                    fieldId: "custbody_bank_account"
                })

                var soRef = invRecLoad.getValue({
                    fieldId: "custbody_rent_sales_order"
                })

                var bankDetail = invRecLoad.getValue({
                    fieldId: "custbody_bank_details"
                })

                var exRate = invRecLoad.getValue({
                    fieldId: "exchangerate"
                })

                var asDate = invRecLoad.getValue({
                    fieldId: "asofdate"
                })

                var payTerms = invRecLoad.getValue({
                    fieldId: "custbody_payment_terms"
                })

                var salesRepPhone = invRecLoad.getValue({
                    fieldId: "custbody_office_phone"
                })

                var approvalStatus = invRecLoad.getValue({
                    fieldId: "approvalstatus"
                })

                var amntWordsArb = invRecLoad.getValue({
                    fieldId: "custbody_amount_in_words_arabic"
                })

                var amntWordsArbSar = invRecLoad.getValue({
                    fieldId: "custbody_amount_in_words_arabic_sar"
                })

                var amntWordsEngSar = invRecLoad.getValue({
                    fieldId: "custbody_amount_in_words_english_sar"
                })

                var qrCode = invRecLoad.getValue({
                    fieldId: "custbody_qr_code_data"
                })

                var site = invRecLoad.getValue({
                    fieldId: "custbody_site"
                })

                var scopeWork = invRecLoad.getValue({
                    fieldId: "custbody_scope_of_work"
                })

                var attn = invRecLoad.getValue({
                    fieldId: "custbody_attention"
                })
                var soType = invRecLoad.getValue({
                    fieldId: "custbody_rent_sales_order_type"
                })
                var soRef = invRecLoad.getValue({
                    fieldId: "custbody_rent_sales_order"
                })
                var mem = invRecLoad.getValue({
                    fieldId: "memo"
                })
                // var oppo = invRecLoad.getValue({
                //     fieldId: "opportunity"
                // })
                var cls = invRecLoad.getValue({
                    fieldId: "class"
                })
                var jobs = invRecLoad.getValue({
                    fieldId: "job"
                })
                var dep = invRecLoad.getValue({
                    fieldId: "department"
                })
                var rem = invRecLoad.getValue({
                    fieldId: "custbody_sa_remarks"
                })
                var siteCon = invRecLoad.getValue({
                    fieldId: "custbody_site_contact"
                })
                var extInvRef = invRecLoad.getValue({
                    fieldId: "custbody_extra_charge_invoice_ref"
                })
                var emirate = invRecLoad.getValue({
                    fieldId: "custbody_emirate_nw"
                })
                var siteinspect = invRecLoad.getValue({
                    fieldId: "custbody_related_site_inspections"
                })
                var quote = invRecLoad.getValue({
                    fieldId: "custbody_quote_intro"
                })
                var notes = invRecLoad.getValue({
                    fieldId: "custbody_special_notes"
                })

                var salesTeamCount = invRecLoad.getLineCount({ sublistId: 'salesteam' });
                var salesCount = []
                for (var i = 0; i < salesTeamCount; i++) {
                    var salesEmp = invRecLoad.getSublistValue({
                        sublistId: 'salesteam',
                        fieldId: 'employee',
                        line: i
                    });
                    log.debug("salesEmp", salesEmp)
                    var isPrimary = invRecLoad.getSublistValue({
                        sublistId: 'salesteam',
                        fieldId: 'isprimary',
                        line: i
                    });
                    var salesRole = invRecLoad.getSublistValue({
                        sublistId: 'salesteam',
                        fieldId: 'salesrole',
                        line: i
                    });
                    salesCount.push({
                        "salesEmp": salesEmp,
                        "isPrimary": isPrimary,
                        "salesRole": salesRole,
                    })
                }



                var lineCount = invRecLoad.getLineCount({ sublistId: 'item' });
                var itemCount = [];

                for (var m = 0; m < lineCount; m++) {
                    var items = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'item',
                        line: m
                    });
                    var qty = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        line: m
                    });
                    var rate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'rate',
                        line: m
                    });
                    var amnt = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'amount',
                        line: m
                    });
                    var description = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'description',
                        line: m
                    });
                    var arabicDesc = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_arabic_description',
                        line: m
                    });
                    var agreedRate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_inv_agreed_rate',
                        line: m
                    })
                    var perHourRate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_per_hour_rate',
                        line: m
                    })
                    var tsNo = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_timesheet_no',
                        line: m
                    })
                    var rentFromDate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_from_date',
                        line: m
                    })
                    var rentToDate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_to_date',
                        line: m
                    })
                    var tsFromDate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_timesheet_from_date',
                        line: m
                    })
                    var tsToDate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_timesheet_end_date',
                        line: m
                    })
                    var rodRef = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_rod',
                        line: m
                    })
                    var robdRef = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_robd',
                        line: m
                    })
                    var rentalUnit = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'rent_rental_unit',
                        line: m
                    })
                    var billableDays = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_billable_days',
                        line: m
                    })
                    var assRef = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_asset_ref',
                        line: m
                    });
                    var unit = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_total_normal_hours',
                        line: m
                    });
                    var custRentalUnit = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_rental_unit',
                        line: m
                    });

                    var rentalQty = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_rental_quantity',
                        line: m
                    });
                    var billRule = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_billing_rule',
                        line: m
                    });
                    var agrHour = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_agreed_hours',
                        line: m
                    });
                    var agrHourDay = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_agreed_hours_per_day',
                        line: m
                    });
                    var agrUnit = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_agreed_units',
                        line: m
                    });
                    var extraHrLoad = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_extra_hours_load',
                        line: m
                    });
                    var rodType = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_rod_type',
                        line: m
                    });
                    var minHr = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_min_hours',
                        line: m
                    });
                    var minDay = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_min_days',
                        line: m
                    });
                    var minBasePrice = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_min_base_price',
                        line: m
                    });
                    var relAsset = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_far_trn_relatedasset',
                        line: m
                    });
                    var tsUnit = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_ts_units',
                        line: m
                    });
                    var tsNumber = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_ts_number',
                        line: m
                    });
                    var tsDate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_ts_sdate',
                        line: m
                    });
                    var hidePrint = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_hide_in_print',
                        line: m
                    });
                    var slNum = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_serial_slot_number',
                        line: m
                    });
                    var allowCreat = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_allow_job_creation',
                        line: m
                    });
                    var projStatus = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_proj_status',
                        line: m
                    });
                    var margin = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_margin',
                        line: m
                    });
                    var custRate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_custom_rate',
                        line: m
                    });
                    var robdType = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_robd_type',
                        line: m
                    });
                    var preHrlyRate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_preffered_hourly_rate',
                        line: m
                    });
                    var remarks = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_remarks',
                        line: m
                    });
                    var soLineNo = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_so_line_unique_number',
                        line: m
                    });

                    var totalKm = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_inv_total_km',
                        line: m
                    });
                    var KmpRate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_per_km_rate',
                        line: m
                    });
                    var chargeRzn = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_ksa_allowance_charge_reason',
                        line: m
                    });
                    var extraPrRate = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_extra_hours_rate',
                        line: m
                    });

                    var regPlateNo = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_reg_plate_no',
                        line: m
                    });

                    var totalExtraHr = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_total_extra_hours',
                        line: m
                    });
                    var minPrHour = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_minimum_hours_print',
                        line: m
                    });
                    var minPrday = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_minimum_days_print',
                        line: m
                    });
                    var invHrType = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_invoice_item_hour_type',
                        line: m
                    });
                    var extraUnitLoad = invRecLoad.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rent_extra_units_load',
                        line: m
                    });


                    itemCount.push({
                        "itemId": items,
                        "quantity": qty,
                        "rate": rate,
                        'agreedRate': agreedRate,
                        'perHourRate': perHourRate,
                        'tsNo': tsNo,
                        'rentFromDate': rentFromDate,
                        'rentToDate': rentToDate,
                        'tsFromDate': tsFromDate,
                        'tsToDate': tsToDate,
                        'rodRef': rodRef,
                        'robdRef': robdRef,
                        'rentalUnit': rentalUnit,
                        'billableDays': billableDays,
                        "assetRef": assRef,
                        "unit": unit,
                        "amnt": amnt,
                        "description": description,
                        "arabicDesc": arabicDesc,

                        "custRentalUnit": custRentalUnit,
                        "rentalQty": rentalQty,
                        "billRule": billRule,
                        "agrHour": agrHour,
                        "agrHourDay": agrHourDay,
                        "agrUnit": agrUnit,
                        "extraHrLoad": extraHrLoad,
                        "rodType": rodType,
                        "minHr": minHr,
                        "minDay": minDay,
                        "minBasePrice": minBasePrice,
                        "relAsset": relAsset,
                        "tsUnit": tsUnit,
                        "tsNumber": tsNumber,
                        "tsDate": tsDate,
                        "hidePrint": hidePrint,
                        "slNum": slNum,
                        "allowCreat": allowCreat,
                        "projStatus": projStatus,
                        "margin": margin,
                        "custRate": custRate,
                        "robdType": robdType,
                        "preHrlyRate": preHrlyRate,
                        "remarks": remarks,
                        "soLineNo": soLineNo,
                        "totalKm": totalKm,
                        "KmpRate": KmpRate,
                        "chargeRzn": chargeRzn,
                        "extraPrRate": extraPrRate,
                        "prHourRate": prHourRate,
                        "regPlateNo": regPlateNo,
                        "totalExtraHr": totalExtraHr,
                        "minPrHour": minPrHour,
                        "minPrday": minPrday,
                        "invHrType": invHrType,
                        "extraUnitLoad": extraUnitLoad,
                    })

                }
                log.debug("itemCount", itemCount)




                log.debug("Subsidiary", Subsidiary)
                if (Subsidiary == 8) {
                    var newSub = 22
                    // var location = 22
                } else if (Subsidiary == 16) {
                    var newSub = 23
                    // var location = 23
                }

                log.debug("newSub---", newSub)
                log.debug("newInvRef==", newInvRef)

                if (!newInvRef) {
                    log.debug("getting inside if not = newInvRef===", newInvRef)
                    try {
                        var invRec = record.create({
                            type: "invoice",
                            id: recordID,
                            isDynamic: true,

                        });

                        invRec.setValue({
                            fieldId: "customform",
                            value: customForm
                        })

                        invRec.setValue({
                            fieldId: "entity",
                            value: customer
                        })





                        invRec.setValue({
                            fieldId: "subsidiary",
                            value: newSub
                        })

                        invRec.setValue({
                            fieldId: "location",
                            value: ""
                        })

                        invRec.setValue({
                            fieldId: "custbody_af_new_invoice_ref",
                            value: recordID
                        })

                        invRec.setValue({
                            fieldId: "trandate",
                            value: date
                        })



                        invRec.setValue({
                            fieldId: "terms",
                            value: term
                        })



                        invRec.setValue({
                            fieldId: "duedate",
                            value: duedate
                        })

                        invRec.setValue({
                            fieldId: "postingperiod",
                            value: postPeriod
                        })

                        invRec.setValue({
                            fieldId: "startdate",
                            value: startDate
                        })

                        invRec.setValue({
                            fieldId: "custbody_rent_sales_order",
                            value: soRef
                        })



                        invRec.setValue({
                            fieldId: "enddate",
                            value: endDate
                        })

                        invRec.setValue({
                            fieldId: "custbody_rent_billing_cycle",
                            value: billCycle
                        })

                        invRec.setValue({
                            fieldId: "otherrefnum",
                            value: PONo
                        })

                        // invRec.setValue({
                        //     fieldId: "custbody_rent_sales_order",
                        //     value: SORef
                        // })

                        invRec.setValue({
                            fieldId: "custbody_bank_account",
                            value: bankAcc
                        })

                        invRec.setValue({
                            fieldId: "custbody_bank_details",
                            value: bankDetail
                        })

                        invRec.setValue({
                            fieldId: "exchangerate",
                            value: exRate
                        })



                        invRec.setValue({
                            fieldId: "asofdate",
                            value: asDate
                        })

                        invRec.setValue({
                            fieldId: "custbody_payment_terms",
                            value: payTerms
                        })

                        invRec.setValue({
                            fieldId: "custbody_office_phone",
                            value: salesRepPhone
                        })

                        invRec.setValue({
                            fieldId: "approvalstatus",
                            value: approvalStatus
                        })

                        invRec.setValue({
                            fieldId: "custbody_amount_in_words_arabic",
                            value: amntWordsArb
                        })

                        invRec.setValue({
                            fieldId: "custbody_amount_in_words_arabic_sar",
                            value: amntWordsArbSar
                        })

                        invRec.setValue({
                            fieldId: "custbody_amount_in_words_english_sar",
                            value: amntWordsEngSar
                        })

                        invRec.setValue({
                            fieldId: "custbody_qr_code_data",
                            value: qrCode
                        })

                        //--from
                        invRec.setValue({
                            fieldId: "custbody_site",
                            value: site
                        })
                        invRec.setValue({
                            fieldId: "custbody_scope_of_work",
                            value: scopeWork
                        })
                        invRec.setValue({
                            fieldId: "custbody_attention",
                            value: attn
                        })
                        invRec.setValue({
                            fieldId: "custbody_rent_sales_order_type",
                            value: soType
                        })
                        invRec.setValue({
                            fieldId: "custbody_rent_sales_order",
                            value: soRef
                        })
                        invRec.setValue({
                            fieldId: "memo",
                            value: mem
                        })
                        // invRec.setValue({
                        //     fieldId: "opportunity",
                        //     value: oppo
                        // })
                        invRec.setValue({
                            fieldId: "class",
                            value: cls
                        })
                        invRec.setValue({
                            fieldId: "job",
                            value: jobs
                        })
                        invRec.setValue({
                            fieldId: "department",
                            value: dep
                        })


                        invRec.setValue({
                            fieldId: "custbody_sa_remarks",
                            value: rem
                        })
                        invRec.setValue({
                            fieldId: "custbody_site_contact",
                            value: siteCon
                        })
                        invRec.setValue({
                            fieldId: "custbody_extra_charge_invoice_ref",
                            value: extInvRef
                        })
                        invRec.setValue({
                            fieldId: "custbody_emirate_nw",
                            value: emirate
                        })
                        invRec.setValue({
                            fieldId: "custbody_related_site_inspections",
                            value: siteinspect
                        })
                        invRec.setValue({
                            fieldId: "custbody_quote_intro",
                            value: quote
                        })
                        invRec.setValue({
                            fieldId: "custbody_special_notes",
                            value: notes
                        })

                        var newSalesLineCount = invRec.getLineCount({
                            sublistId: "salesteam"
                        })

                        for (var n = 0; n < newSalesLineCount; n++) {
                            invRec.removeLine({
                                sublistId: 'salesteam',
                                line: n,
                                ignoreRecalc: true
                            });
                            n = n - 1;
                            newSalesLineCount = newSalesLineCount - 1;
                        }

                        for (var i = 0; i < salesCount.length; i++) {
                            var salesEmp = salesCount[i].salesEmp;
                            var isPrimary = salesCount[i].isPrimary;
                            var salesRole = salesCount[i].salesRole;

                            invRec.selectNewLine({
                                sublistId: 'salesteam'
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'salesteam',
                                fieldId: 'employee',
                                value: salesEmp,
                            });
                            invRec.setCurrentSublistValue({
                                sublistId: 'salesteam',
                                fieldId: 'isprimary',
                                value: isPrimary
                            });
                            invRec.setCurrentSublistValue({
                                sublistId: 'salesteam',
                                fieldId: 'salesrole',
                                value: salesRole
                            });

                            invRec.commitLine({
                                sublistId: 'salesteam'
                            });
                        }



                        for (var m = 0; m < itemCount.length; m++) {
                            var item = itemCount[m].itemId;
                            var quant = itemCount[m].quantity;
                            var rates = itemCount[m].rate;
                            var agreedRate = itemCount[m].agreedRate;
                            var perHourRate = itemCount[m].perHourRate;
                            var tsNo = itemCount[m].tsNo;
                            var rentFromDate = itemCount[m].rentFromDate;
                            var rentToDate = itemCount[m].rentToDate;
                            var tsFromDate = itemCount[m].tsFromDate;
                            var tsToDate = itemCount[m].tsToDate;
                            var rodRef = itemCount[m].rodRef;
                            var robdRef = itemCount[m].robdRef;
                            var rentalUnit = itemCount[m].rentalUnit;
                            var billableDays = itemCount[m].billableDays;
                            var assetRef = itemCount[m].assetRef;
                            var unit = itemCount[m].unit;
                            var amnt = itemCount[m].amnt;
                            var description = itemCount[m].description;
                            var arabicDesc = itemCount[m].arabicDesc;

                            var custRentalUnit = itemCount[m].custRentalUnit;
                            var rentalQty = itemCount[m].rentalQty;
                            var billRule = itemCount[m].billRule;
                            var agrHour = itemCount[m].agrHour;
                            var agrHourDay = itemCount[m].agrHourDay;
                            var agrUnit = itemCount[m].agrUnit;
                            var extraHrLoad = itemCount[m].extraHrLoad;
                            var rodType = itemCount[m].rodType;
                            var minHr = itemCount[m].minHr;
                            var minDay = itemCount[m].minDay;
                            var minBasePrice = itemCount[m].minBasePrice;
                            var relAsset = itemCount[m].relAsset;
                            var tsUnit = itemCount[m].tsUnit;
                            var tsNumber = itemCount[m].tsNumber;
                            var tsDate = itemCount[m].tsDate;
                            var hidePrint = itemCount[m].hidePrint;
                            var slNum = itemCount[m].slNum;
                            var allowCreat = itemCount[m].allowCreat;
                            var projStatus = itemCount[m].projStatus;
                            var margin = itemCount[m].margin;
                            var custRate = itemCount[m].custRate;
                            var robdType = itemCount[m].robdType;
                            var preHrlyRate = itemCount[m].preHrlyRate;
                            var remarks = itemCount[m].remarks;
                            var soLineNo = itemCount[m].soLineNo;
                            var totalKm = itemCount[m].totalKm;
                            var KmpRate = itemCount[m].KmpRate;
                            var chargeRzn = itemCount[m].chargeRzn;
                            var extraPrRate = itemCount[m].extraPrRate;
                            var prHourRate = itemCount[m].prHourRate;
                            var regPlateNo = itemCount[m].regPlateNo;
                            var totalExtraHr = itemCount[m].totalExtraHr;
                            var minPrHour = itemCount[m].minPrHour;
                            var minPrday = itemCount[m].minPrday;
                            var invHrType = itemCount[m].invHrType;
                            var extraUnitLoad = itemCount[m].extraUnitLoad;


                            log.debug("item", item)

                            invRec.selectNewLine({
                                sublistId: 'item'
                            });
                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'item',
                                value: item
                            });
                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'quantity',
                                value: quant
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'rate',
                                value: rates
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'amount',
                                value: amnt
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'description',
                                value: description
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_arabic_description',
                                value: arabicDesc
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_inv_agreed_rate',
                                value: agreedRate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_per_hour_rate',
                                value: perHourRate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_timesheet_no',
                                value: tsNo
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_from_date',
                                value: rentFromDate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_to_date',
                                value: rentToDate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_timesheet_from_date',
                                value: tsFromDate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_timesheet_end_date',
                                value: tsToDate
                            });


                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_rod',
                                value: rodRef
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_robd',
                                value: robdRef
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'rent_rental_unit',
                                value: rentalUnit
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_billable_days',
                                value: billableDays
                            });
                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_asset_ref',
                                value: assetRef
                            });
                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_total_normal_hours',
                                value: unit
                            });
                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_rental_unit',
                                value: custRentalUnit
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_rental_quantity',
                                value: rentalQty
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_billing_rule',
                                value: billRule
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_agreed_hours',
                                value: agrHour
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_agreed_hours_per_day',
                                value: agrHourDay
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_agreed_units',
                                value: agrUnit
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_extra_hours_load',
                                value: extraHrLoad
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_rod_type',
                                value: rodType
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_min_hours',
                                value: minHr
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_min_days',
                                value: minDay
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_min_base_price',
                                value: minBasePrice
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_far_trn_relatedasset',
                                value: relAsset
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_ts_units',
                                value: tsUnit
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_ts_number',
                                value: tsNumber
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_ts_sdate',
                                value: tsDate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_hide_in_print',
                                value: hidePrint
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_serial_slot_number',
                                value: slNum
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_allow_job_creation',
                                value: allowCreat
                            });


                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_proj_status',
                                value: projStatus
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_margin',
                                value: margin
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_custom_rate',
                                value: custRate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_robd_type',
                                value: robdType
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_preffered_hourly_rate',
                                value: preHrlyRate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_remarks',
                                value: remarks
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_so_line_unique_number',
                                value: soLineNo
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_inv_total_km',
                                value: totalKm
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_per_km_rate',
                                value: KmpRate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_ksa_allowance_charge_reason',
                                value: chargeRzn
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_extra_hours_rate',
                                value: extraPrRate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_per_hour_rate',
                                value: prHourRate
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_reg_plate_no',
                                value: regPlateNo
                            });


                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_total_extra_hours',
                                value: totalExtraHr
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_minimum_hours_print',
                                value: minPrHour
                            });

                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_minimum_days_print',
                                value: minPrday
                            });
                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_invoice_item_hour_type',
                                value: invHrType
                            });
                            invRec.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_rent_extra_units_load',
                                value: extraUnitLoad
                            });



                            invRec.commitLine({
                                sublistId: 'item'
                            });
                        }

                        var lineItemCount = invRec.getLineCount({
                            sublistId: "item"
                        })

                        log.debug("lineItemCount", lineItemCount)



                        //updating in old invoice
                        var updateInv = record.load({
                            type: "invoice",
                            id: recordID,
                            isDynamic: true
                        })
                        updateInv.setValue({
                            fieldId: "tranid",
                            value: updatedTranId
                        })
                        updateInv.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        })


                        invRec.setValue({
                            fieldId: 'tranid',
                            value: invNo
                        });

                        var saveInvRec = invRec.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        })
                        log.debug("saveInvRec==", saveInvRec)

                        record.submitFields({
                            type: 'invoice',
                            id: saveInvRec,
                            values: {
                                custbody_af_new_invoice_ref: recordID,
                            }
                        });
                        
                        

                        record.submitFields({
                            type: 'invoice',
                            id: recordID,
                            values: {
                                custbody_af_new_invoice_ref: saveInvRec,
                            }
                        });

                        try {
                            record.submitFields({
                                type: 'invoice',
                                id: saveInvRec,
                                values: {
                                    custbody_site: site,
                                    
                                }
                            });
                            log.debug("After Submit Field in new Record")
                        } catch (e) {
                            log.error('error', e.toString());
                        }



                    } catch (e) {
                        flag = 1
                        var errMsg = e.message
                        log.error('error', e.toString());
                    }
                } else {
                    log.debug("getting inside else newInvRef===", newInvRef)
                    var saveInvRec = newInvRef;
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
                    label: 'Invoice RECORD'
                });
                //     htmlImage.defaultValue = "<a href=https://5269234-sb1.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=1001&amp;id=4020>FAM ASSET</a>";
                // list.addField({
                //     id: 'famasset',
                //     type: serverWidget.FieldType.TEXT,
                //     label: 'FAM Asset',
                //     align: serverWidget.LayoutJustification.LEFT
                // });

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
                res1['record'] = 'Invoice Record - ' + saveInvRec


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
                    value: "<a href=https://4647359-sb1.app.netsuite.com/app/accounting/transactions/custinvc.nl?id=" + saveInvRec + ">" + saveInvRec + "</a>"
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

