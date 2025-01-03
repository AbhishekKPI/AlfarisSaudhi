/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/format', 'N/search', 'N/ui/dialog', 'N/log', 'N/url', 'N/record', '../modules/RZK_moments.js', '../modules/RZK_module.js'],

    function(currentRecord, format, search, dialog, log, url, record, moment, rzk) {

        function pageInit(context) {
            currRec = currentRecord.get();
            var status = currRec.getValue({
                fieldId: "custpage_completion_status"
            });
            if (status) {
                if (status != 'Complete' && status != 'Failed') {
                    autoRefresh();
                }
            }
            return true;
        }

        function autoRefresh() {
            setTimeout(function() {
                location.reload();
            }, 5000);
        }

        function reloadPage() {
            window.location.reload();
        }
        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {
            var name = scriptContext.fieldId;
            var currentRecord = scriptContext.currentRecord;

            if (name == "custpage_subsidiary_multi" || name == "custpage_multi_statementdate" || name == "custpage_multi_startdate" || name == "custpage_page_select_page") {

                var url = window.location.href;

                var deploy = getParameterByName("deploy");

                if (deploy) {
                    url = url + '&deploy=' + deploy;
                }

                if (url.includes('deploy')) {
                    url = url.substring(0, url.indexOf('deploy='));
                    url = url + "deploy=" + deploy;
                }

                var subsidiary_id = currentRecord.getValue({
                    fieldId: 'custpage_subsidiary_multi'
                });

                if (subsidiary_id) {
                    url = url + '&Subsidiary_id=' + subsidiary_id;
                }
                var statementDate = currentRecord.getValue({
                    fieldId: 'custpage_multi_statementdate'
                });
                if (statementDate) {
                    statementDate = rzk.parseDate(statementDate);
                    statementDate = format.format({
                        value: new Date(statementDate),
                        type: format.Type.DATE
                    });
                    url = url + '&statementDate=' + statementDate;
                }
                var startDate = currentRecord.getValue({
                    fieldId: 'custpage_multi_startdate'
                });
                if (startDate) {
                    startDate = rzk.parseDate(startDate);
                    startDate = format.format({
                        value: new Date(startDate),
                        type: format.Type.DATE
                    });
                    url = url + '&startDate=' + startDate;
                }
                var selectedPage = currentRecord.getValue({
                    fieldId: "custpage_page_select_page"
                });
                if (selectedPage) {
                    var maxFltrVal = 0;
                    var minFltrVal = 10;

                    minFltrVal = Number(minFltrVal);
                    if (selectedPage) {
                        var currntPageCount = parseInt(selectedPage) - 1;
                        url = url + '&currntPageCount=' + currntPageCount;
                        url = url + '&selectPageCount=' + selectedPage;
                    }
                    var newMinimum = Number(minFltrVal) * Number(currntPageCount);
                    maxFltrVal = Number(newMinimum) - Number(minFltrVal);
                    url = url + "&maxFltrVal=" + newMinimum; // setting maximum and minimum values
                    url = url + "&minFltrVal=" + maxFltrVal;
                    // window.onbeforeunload = null;
                    // window.location = url;
                    // realoading page with new URL with all params
                }

                window.onbeforeunload = null;

                window.location = url; // reloading page with new URL

            }
            // try {
            //     if (name == "custpage_statementdate" || name == "custpage_startdate") {
            //         var url = window.location.href;

            //         var deploy = getParameterByName("deploy");

            //         if (deploy) {
            //             url = url + '&deploy=' + deploy;
            //         }

            //         if (url.includes('deploy')) {
            //             url = url.substring(0, url.indexOf('deploy='));
            //             url = url + "deploy=" + deploy;
            //         }
            //         var statementDate = currentRecord.getValue({
            //             fieldId: 'custpage_statementdate'
            //         });
            //         var startDate = currentRecord.getValue({
            //             fieldId: 'custpage_startdate'
            //         });
            //         if (statementDate) {
            //             statementDate = rzk.parseDate(statementDate);
            //             statementDate = format.format({
            //                 value: new Date(statementDate),
            //                 type: format.Type.DATE
            //             });
            //             url = url + '&statementDate=' + statementDate;
            //         }
            //         if (startDate) {
            //             startDate = rzk.parseDate(startDate);
            //             startDate = format.format({
            //                 value: new Date(startDate),
            //                 type: format.Type.DATE
            //             });
            //             url = url + '&startDate=' + startDate;
            //         }

            //         window.onbeforeunload = null;

            //         window.location = url; // reloading page with new URL
            //     }
            // } catch (e) {

            // }

            try {
                if (name == "custpage_vendor") {
                    var vendorId = currentRecord.getValue({
                        fieldId: 'custpage_vendor'
                    });
                    console.log("vendorId", vendorId);

                    if (vendorId) {
                        // var subsifield = nlapiGetField("custpage_subsidiary");
                        var subsifield = currentRecord.getField({
                            fieldId: 'custpage_subsidiary'
                        });
                        subsifield.removeSelectOption({ //remove all existing
                            value: null,
                        });

                        var companyname = currentRecord.getValue({
                            fieldId: 'custpage_companyname'
                        });
                        var type = "entity";

                        var columns = [];
                        columns.push(search.createColumn({
                            name: 'internalid',
                            join: 'entityMseSubsidiary'
                        }));
                        columns.push(search.createColumn({
                            name: 'namenohierarchy',
                            join: 'entityMseSubsidiary'
                        }));

                        var filters = [];

                        filters.push(search.createFilter({
                            name: 'internalid',
                            operator: search.Operator.ANYOF,
                            values: vendorId
                        }));

                        var venSearchObj = {};
                        venSearchObj.type = type;
                        venSearchObj.columns = columns;
                        venSearchObj.filters = filters;
                        var venSearch = search.create(venSearchObj);
                        var venResultSet = venSearch.run();
                        var venResult = venResultSet.getRange(0, 100);
                        console.log('venResult', venResult);

                        for (i = 0; i < venResult.length; i++) {
                            var subsiid = venResult[i].getValue({
                                name: "internalid",
                                join: 'entityMseSubsidiary'
                            });
                            var subsiname = venResult[i].getValue({
                                name: "namenohierarchy",
                                join: 'entityMseSubsidiary'
                            });
                            console.log(subsiid, subsiname);
                            if (i == 0) {
                                companyname = companyname + ' Consolidated'
                                subsifield.insertSelectOption({
                                    value: 0,
                                    text: companyname
                                });
                            }
                            if (subsiid && subsiname) {
                                subsifield.insertSelectOption({
                                    value: subsiid,
                                    text: subsiname
                                });
                            }
                        }
                    }
                }
            } catch (e) {
                console.log("Error", e.toString());
            }
        }

        function openingNewWindow() {
            window.open();
        }

        function getParameterByName(name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        function gotoPayoutBillComputRecord(internalId) {
            var redirectUrl = url.resolveRecord({
                recordType: 'customrecord_vendor_payout_bill_computat',
                recordId: internalId,
                isEditMode: false
            });
            console.log(redirectUrl);
            window.open(redirectUrl, '_self');
        }

        function RecreateVendorPayoutBillingRecord(internalId) {
            var redirectUrl = url.resolveScript({
                scriptId: 'customscript_suitelet_for_redirect',
                deploymentId: 'customdeploy_suitelet_for_redirect',
                returnExternalUrl: false
            });

            redirectUrl = redirectUrl + '&vendorPayoutID=' + internalId + '&redirecType=vendorPayoutProceed';
            window.open(redirectUrl, '_self');
        }

        function gotoVendorPayoutRateMaster() {
            var redirectUrl = '/app/common/custom/custrecordentrylist.nl?rectype=42&whence=';
            console.log(redirectUrl);
            window.open(redirectUrl, '_self');
        }

        function vendorStatementPrint() {
            var currRec = currentRecord.get();
            var vendor = currRec.getValue({
                fieldId: "custpage_vendor"
            });
            if (vendor == '' || vendor == null) {
                alert("Please Select Vendor");
                return false;
            }
            var subsidiary = currRec.getValue({
                fieldId: "custpage_subsidiary"
            });
            if (subsidiary == '' || subsidiary == null) {
                alert("Please Select Subsidiary");
                return false;
            }
            var statementDate = currRec.getValue({
                fieldId: "custpage_statementdate"
            });
            if (statementDate == '' || statementDate == null) {
                alert("Please Enter AS Of Date");
                return false;
            }
            var startdate = currRec.getValue({
                fieldId: "custpage_startdate"
            });
            if (startdate == '' || startdate == null) {
                alert("Please Enter StartDate");
                return false;
            }
            statementDate = rzk.parseDate(statementDate);
            statementDate = moment(statementDate).add(1, 'days');
            var statementDate = moment(statementDate).format('DD/MM/YYYY');

            startdate = rzk.parseDate(startdate);
            startdate = moment(startdate).add(1, 'days');
            var startdate = moment(startdate).format('DD/MM/YYYY');

            var redirectUrl = url.resolveScript({
                scriptId: 'customscript_rzk_suitelet_vendor_print',
                deploymentId: 'customdeploy_rzk_suitelet_vendor_print',
                returnExternalUrl: false
            });
            redirectUrl = redirectUrl + '&custparam_vendor=' + vendor + '&custparam_subsidiary=' + subsidiary + '&custparam_statementdate=' + statementDate + '&startDate=' + startdate;
            window.open(redirectUrl);

            // currRec.setValue({
            //     fieldId: "custpage_vendor",
            //     value: ""
            // });
            // currRec.setValue({
            //     fieldId: "custpage_statementdate",
            //     value: ""
            // });
            // var subsifield = currRec.getField({
            //     fieldId: 'custpage_subsidiary'
            // });
            // subsifield.removeSelectOption({ //remove all existing
            //     value: null,
            // });
            // currRec.setValue({
            //     fieldId: "custpage_startdate",
            //     value: ""
            // });
        }

        function vendorMutilpleStatementPrint() {
            var mailReq = confirm("Would You like to send mail for selected Vendors ?");
            log.debug("mailReq---", mailReq);
            var currRec = currentRecord.get();

            var statementDate = currRec.getValue({
                fieldId: "custpage_multi_statementdate"
            });
            if (statementDate == '' || statementDate == null) {
                alert("Please Enter AS Of Date");
                return false;
            }
            statementDate = rzk.parseDate(statementDate);
            statementDate = moment(statementDate).add(1, 'days');
            var statementDate = moment(statementDate).format('DD/MM/YYYY');

            var startdate = currRec.getValue({
                fieldId: "custpage_multi_startdate"
            });
            if (startdate == '' || startdate == null) {
                alert("Please Enter StartDate");
                return false;
            }
            startdate = rzk.parseDate(startdate);
            startdate = moment(startdate).add(1, 'days');
            var startdate = moment(startdate).format('DD/MM/YYYY');

            var vendorIDArray = "";
            var venCount = currRec.getLineCount({
                sublistId: "vendors_sublist"
            });

            for (var i = 0; i < venCount; i++) {
                var select = currRec.getSublistValue({
                    sublistId: 'vendors_sublist',
                    fieldId: 'select',
                    line: i
                });
                if (select == true) {
                    var vendorId = currRec.getSublistValue({
                        sublistId: 'vendors_sublist',
                        fieldId: 'vendorid',
                        line: i
                    });
                    vendorIDArray = vendorIDArray + vendorId + ",";
                }
            }
            if (vendorIDArray == "" || vendorIDArray == null) {
                alert("Please Select Atleast One Vendor");
                return false;
            }
            var redirectUrl = url.resolveScript({
                scriptId: 'customscript_suitelet_multi_vendor_print',
                deploymentId: 'customdeploy_suitelet_multi_vendor_print',
                returnExternalUrl: false
            });
            redirectUrl = redirectUrl + '&custparam_vendor=' + vendorIDArray + '&custparam_statementdate=' + statementDate + '&startDate=' + startdate + '&mail_required=' + mailReq;
            window.open(redirectUrl);
            unmarkall('vendors_sublist', 'select');
            currRec.setValue({
                fieldId: "custpage_multi_statementdate",
                value: ""
            });
            currRec.setValue({
                fieldId: "custpage_subsidiary_multi",
                value: ""
            });
            currRec.setValue({
                fieldId: "custpage_multi_startdate",
                value: ""
            });
        }

        function markall(sublistId, filedId) {

            try {
                var currRec = currentRecord.get();

                var lineCount = currRec.getLineCount({
                    sublistId: sublistId
                });
                for (i = 0; i < lineCount; i++) {
                    var lineNum = currRec.selectLine({
                        sublistId: sublistId,
                        line: i
                    });

                    currRec.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: filedId,
                        value: true,
                        ignoreFieldChange: true
                    });
                    currRec.commitLine({
                        sublistId: sublistId
                    });
                }
            } catch (e) {
                log.error('error', e.toString());
            }
        }

        function unmarkall(sublistId, filedId) {
            try {
                var currRec = currentRecord.get();

                var lineCount = currRec.getLineCount({
                    sublistId: sublistId
                });
                for (i = 0; i < lineCount; i++) {
                    var lineNum = currRec.selectLine({
                        sublistId: sublistId,
                        line: i
                    });

                    currRec.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: filedId,
                        value: false,
                        ignoreFieldChange: true
                    });
                    currRec.commitLine({
                        sublistId: sublistId
                    });
                }
            } catch (e) {
                log.error('error', e.toString());
            }

        }

        function gotoVendorBillRecord(internalId) {
            var redirectUrl = url.resolveRecord({
                recordType: 'customrecord_generate_vendor_bill',
                recordId: internalId,
                isEditMode: false
            });
            console.log(redirectUrl);
            window.open(redirectUrl, '_self');
        }

        return {

            pageInit: pageInit,
            autoRefresh: autoRefresh,
            reloadPage: reloadPage,
            gotoPayoutBillComputRecord: gotoPayoutBillComputRecord,
            gotoVendorPayoutRateMaster: gotoVendorPayoutRateMaster,
            RecreateVendorPayoutBillingRecord: RecreateVendorPayoutBillingRecord,
            markall: markall,
            unmarkall: unmarkall,
            gotoVendorBillRecord: gotoVendorBillRecord,
            fieldChanged: fieldChanged,
            openingNewWindow: openingNewWindow,
            vendorStatementPrint: vendorStatementPrint,
            vendorMutilpleStatementPrint: vendorMutilpleStatementPrint
        };
    });


function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}