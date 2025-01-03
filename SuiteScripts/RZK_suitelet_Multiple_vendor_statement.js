/**
 *@NApiVersion 2.x
 *@NModuleScope Public
 *@NScriptType Suitelet
 
 * Module Description
 * Includes parsOnRequestAction
 *
 * Version    Date            Author        Remarks
 * 2.0.0      27 Nov 2020     Priyesh       Generate Print  Statement
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
        function multiplePrint(context) {
            // Code section : 1
            if (context.request.method === 'GET') {

                var Subsidiary_id = context.request.parameters['Subsidiary_id'];
                var minFltrVal = context.request.parameters['minFltrVal'];
                var maxFltrVal = context.request.parameters['maxFltrVal'];
                var minPrevFltrVal = context.request.parameters['minPrevFltrVal'];
                var maxPrevFltrVal = context.request.parameters['maxPrevFltrVal'];
                var filtercurrntPageCount = context.request.parameters['currntPageCount'];
                var filteroldPageCount = context.request.parameters['oldPageCount'];
                var selectPageCount = context.request.parameters['selectPageCount'];

                // Section One - Forms - See 'Steps for Creating a Custom Form' in topic 'Sample Custom Form Script'
                var form = serverWidget.createForm({
                    title: 'Print Statement'
                });

                form.addButton({
                    id: "custpage_markall",
                    label: "Mark All",
                    functionName: "markall('vendors_sublist','select')"
                });
                form.addButton({
                    id: "custpage_unmarkall",
                    label: "Un-Mark All",
                    functionName: "unmarkall('vendors_sublist','select')"
                });

                var statementdate = form.addField({
                    id: 'custpage_statementdate',
                    type: serverWidget.FieldType.DATE,
                    label: 'STATEMENT DATE'
                });
                statementdate.isMandatory = true;

                var subsidiary_main = form.addField({
                    id: 'custpage_subsidiary_multi',
                    type: serverWidget.FieldType.SELECT,
                    label: 'SUBSIDIARY',
                    source: 'subsidiary'
                });

                if (Subsidiary_id) {
                    subsidiary_main.defaultValue = Subsidiary_id;

                }
                form.addSubmitButton({
                    label: 'Print'
                });

                //pagenitaion
                var minRangeVal = 0;
                var maxRangeVal = 10;
                var newMinRange;
                var newMaxRange;
                var newMin;

                maxRangeVal = Number(maxRangeVal);
                var minRange = minRangeVal;
                var maxRange = maxRangeVal;
                if (minFltrVal && maxFltrVal) {
                    newMinRange = Number(maxFltrVal);
                    maxRange = Number(maxFltrVal) + maxRangeVal;
                    minRange = newMinRange;
                }
                if (minPrevFltrVal && maxPrevFltrVal) {
                    newMaxRange = Number(minPrevFltrVal);
                    newMin = Number(newMaxRange) - maxRangeVal;
                    maxRange = newMaxRange;
                    if (newMin > 0) {
                        minRange = newMin;
                    }
                }
                var minVal = form.addField({
                    id: 'custpage_min',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Min'
                });
                var maxVal = form.addField({
                    id: 'custpage_max',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Max'
                });
                minVal.defaultValue = minRange;
                maxVal.defaultValue = maxRange;

                minVal.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN
                });

                maxVal.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN
                });

                var slNo = 1;
                var lastSlno = '';
                try {
                    //adding Asset De-Allocation sublist
                    var VendorsSublist = form.addSublist({
                        id: 'vendors_sublist',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Vendors'
                    });

                    // Adding fields in Asset De-Allocation sublist
                    var select_soa = VendorsSublist.addField({ // select check box
                        id: 'select',
                        type: serverWidget.FieldType.CHECKBOX,
                        label: 'SELECT',
                        align: serverWidget.LayoutJustification.CENTER
                    });

                    var internalId_soa = VendorsSublist.addField({ // ID 
                        id: 'internalid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'ID',
                        align: serverWidget.LayoutJustification.RIGHT
                    });
                    internalId_soa.updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED // making it disabled
                    });

                    var customer_soa = VendorsSublist.addField({ // VENDOR
                        id: 'vendorid',
                        type: serverWidget.FieldType.SELECT,
                        label: 'VENDOR',
                        align: serverWidget.LayoutJustification.RIGHT,
                        source: 'vendor'
                    });
                    customer_soa.updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED // making it disabled
                    });

                    var currency_soa = VendorsSublist.addField({ // CURRENCY
                        id: 'currency',
                        type: serverWidget.FieldType.SELECT,
                        label: 'CURRENCY',
                        align: serverWidget.LayoutJustification.RIGHT,
                        source: 'currency'
                    });
                    currency_soa.updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED // making it disabled
                    });

                    var subsidiary_soa = VendorsSublist.addField({ // CURRENCY
                        id: 'subsidiary',
                        type: serverWidget.FieldType.SELECT,
                        label: 'SUBSIDIARY',
                        align: serverWidget.LayoutJustification.RIGHT,
                        source: 'subsidiary'
                    });
                    subsidiary_soa.updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED // making it disabled
                    });

                    var balance_soa = VendorsSublist.addField({ // Item
                        id: 'balance',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'BALANCE',
                        align: serverWidget.LayoutJustification.RIGHT,
                    });
                    // location_rod.updateDisplayType({
                    //     displayType: serverWidget.FieldDisplayType.DISABLED // making it disabled
                    // });

                    // search all the created ROD .

                    var type = "vendor";

                    var columns = [];
                    columns.push(search.createColumn({
                        name: 'entityid'
                    }));
                    columns.push(search.createColumn({
                        name: 'altname'
                    }));
                    columns.push(search.createColumn({
                        name: 'email'
                    }));
                    columns.push(search.createColumn({
                        name: 'phone'
                    }));
                    columns.push(search.createColumn({
                        name: 'fax'
                    }));
                    columns.push(search.createColumn({
                        name: 'currency'
                    }));
                    columns.push(search.createColumn({
                        name: 'balance'
                    }));
                    columns.push(search.createColumn({
                        name: 'internalid'
                    }));
                    columns.push(search.createColumn({
                        name: 'subsidiary'
                    }));

                    var filters = [];

                    filters.push(search.createFilter({
                        name: 'isinactive',
                        operator: search.Operator.IS,
                        values: false
                    }));

                    filters.push(search.createFilter({
                        name: 'category',
                        operator: search.Operator.ANYOF,
                        values: [4, 5]
                    }));
                    if (Subsidiary_id) {
                        filters.push(search.createFilter({
                            name: 'subsidiary',
                            operator: search.Operator.ANYOF,
                            values: Subsidiary_id
                        }));
                    }

                    var venSearchObj = {};
                    venSearchObj.type = type;
                    venSearchObj.columns = columns;
                    venSearchObj.filters = filters;
                    var venSearch = search.create(venSearchObj);
                    var venResultSet = venSearch.run();
                    var venResult = venResultSet.getRange(minRange, maxRange);
                    var lineCount = 0;

                    if (venResult) {
                        if (minRange) {
                            slNo = minRange + 1;
                        }
                        log.debug('rodResult  length', venResult.length);
                        for (var i = 0; i < venResult.length; i++) {
                            var internalid = venResult[i].getValue({
                                name: 'internalid'
                            });
                            var entityid = venResult[i].getValue({
                                name: 'entityid'
                            });
                            var altname = venResult[i].getValue({
                                name: 'altname'
                            });
                            var currency = venResult[i].getValue({
                                name: 'currency'
                            });
                            var balance = venResult[i].getValue({
                                name: 'balance'
                            });
                            var subsidiary = venResult[i].getValue({
                                name: 'subsidiary'
                            });

                            // Setting values in sublist fields

                            if (entityid) {
                                VendorsSublist.setSublistValue({ //internalid
                                    id: 'internalid',
                                    line: lineCount,
                                    value: entityid
                                });
                            }
                            if (internalid) {
                                VendorsSublist.setSublistValue({ //vendor
                                    id: 'vendorid',
                                    line: lineCount,
                                    value: internalid
                                });
                            }

                            if (currency) {
                                VendorsSublist.setSublistValue({ // currency
                                    id: 'currency',
                                    line: lineCount,
                                    value: currency
                                });
                            }
                            if (currency) {
                                VendorsSublist.setSublistValue({ // currency
                                    id: 'currency',
                                    line: lineCount,
                                    value: currency
                                });
                            }
                            if (balance) {
                                VendorsSublist.setSublistValue({ //balance
                                    id: 'balance',
                                    line: lineCount,
                                    value: balance
                                });
                            }
                            if (subsidiary) {
                                VendorsSublist.setSublistValue({ //subsidiary
                                    id: 'subsidiary',
                                    line: lineCount,
                                    value: subsidiary
                                });
                            }
                            lineCount++;
                            if (i == (venResult.length - 1)) {
                                lastSlno = slNo;
                            }
                            slNo++;
                        }


                    }
                } catch (e) {
                    log.error('error', e.toString());
                }
                try {

                    var type = "vendor";

                    var columns = [];
                    columns.push(search.createColumn({
                        name: 'entityid'
                    }));
                    var filters = [];

                    filters.push(search.createFilter({
                        name: 'isinactive',
                        operator: search.Operator.IS,
                        values: false
                    }));

                    filters.push(search.createFilter({
                        name: 'category',
                        operator: search.Operator.ANYOF,
                        values: [4, 5]
                    }));
                    if (Subsidiary_id) {
                        filters.push(search.createFilter({
                            name: 'subsidiary',
                            operator: search.Operator.ANYOF,
                            values: Subsidiary_id
                        }));
                    }
                    var venSearchObjPage = {};
                    venSearchObjPage.type = type;
                    venSearchObjPage.columns = columns;
                    venSearchObjPage.filters = filters;
                    var venSearchPage = search.create(venSearchObjPage);
                    var venResultSetPage = venSearchPage.run();
                    var venResultPage = venResultSetPage.getRange(0, 1000);
                    var lastCount = 0;
                    if (venResultPage) {
                        for (var kk = 0; kk < venResultPage.length; kk++) {
                            lastCount++;
                        }
                    }
                    if (lastSlno) {
                        lastSlno = lastSlno - 1;
                    }
                    var page = 1;
                    var pageCount = form.addField({
                        id: 'custpage_page_count_current',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Page current'
                    });
                    if (filtercurrntPageCount) {
                        page = Number(filtercurrntPageCount) + 1;
                    }
                    if (filteroldPageCount) {
                        page = Number(filteroldPageCount) - 1;
                    }
                    pageCount.defaultValue = page;


                    pageCount.updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.HIDDEN
                    });
                    var pageval = form.addField({
                        id: 'custpage_pageval',
                        type: serverWidget.FieldType.INLINEHTML,
                        label: ' '
                    });

                    var pageval = form.addField({
                        id: 'custpage_show_pageval',
                        type: serverWidget.FieldType.INLINEHTML,
                        label: 'Page'
                    });
                    pageval.defaultValue = "<br/><span style='font-size: 13px;color: #255599;' ><b>Page - " + page.toString() + "</b></span>";
                    if (lastCount > 0) {
                        var fld = form.addField({
                            id: 'custpage_htmlfield',
                            type: serverWidget.FieldType.INLINEHTML,
                            label: 'Page'
                        });
                        fld.defaultValue = "<br/><span style='font-size: 13px;color: #255599;' ><b>" + (minRange + 1) + " to " + (lastSlno + 1) + " of " + lastCount + "</b></span>";
                    }
                    var pageVal = (minRange + 1);

                    var selectedPage = 1;
                    var pageDropDown = 0;

                    if (Number(lastCount > 0)) {
                        pageDropDown = Math.ceil(lastCount / maxRangeVal);
                    }

                    var pageDrop = form.addField({
                        id: 'custpage_page_select_page',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Select Page'
                    });

                    if (selectPageCount) {
                        selectedPage = selectPageCount;
                        log.debug("selectedPage", selectedPage);
                    }
                    if (filtercurrntPageCount) {
                        selectedPage = Number(filtercurrntPageCount) + 1;
                    }
                    if (filteroldPageCount) {
                        selectedPage = Number(filteroldPageCount) - 1;
                    }

                    pageDrop.defaultValue = selectedPage;

                    for (var p = 1; p <= pageDropDown; p++) {
                        pageDrop.addSelectOption({
                            value: p,
                            text: 'Page - ' + p
                        });
                    }
                } catch (e) {

                }

                form.clientScriptModulePath = './RZK_Common_CS.js';

                context.response.writePage(form);
            } else if (context.request.method == 'POST') {
                var statementdate = context.request.parameters.custpage_statementdate;
                var vendorIDArray = "";
                var venCount = context.request.getLineCount({
                    group: "vendors_sublist"
                });
                for (var i = 0; i < venCount; i++) {
                    var select = context.request.getSublistValue({
                        group: 'vendors_sublist',
                        name: 'select',
                        line: i
                    });
                    if (select == 'T') {
                        var vendorId = context.request.getSublistValue({
                            group: 'vendors_sublist',
                            name: 'vendorid',
                            line: i
                        });
                        vendorIDArray = vendorIDArray + vendorId + ",";

                    }
                }


                var suiteletScript = redirect.toSuitelet({
                    scriptId: 'customscript_rzk_suitelet_vendor_stateme',
                    deploymentId: "customdeploy_rzk_suitelet_vendor_stateme",
                    parameters: {
                        'custparam_vendor': vendorIDArray,
                        'custparam_statementdate': statementdate
                    }
                });
                // var redirectUrl = url.resolveScript({
                //     scriptId: 'customscript_suitelet_multi_vendor_print',
                //     deploymentId: 'customdeploy_suitelet_multi_vendor_print',
                //     parameters: {
                //         'custparam_vendor': vendorIDArray,
                //         'custparam_statementdate': statementdate
                //     }
                // });

                // redirectUrl = redirectUrl + '&vendorPayoutID=' + internalId + '&redirecType=vendorPayoutProceed';
                // window.open(redirectUrl);
            }
        }
        return {
            onRequest: multiplePrint
        };

    });