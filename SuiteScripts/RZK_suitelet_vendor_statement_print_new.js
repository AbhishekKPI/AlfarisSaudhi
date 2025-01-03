/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
// This sample shows how to render search results into a PDF file.
define(['N/render', 'N/format', 'N/search', 'N/file', 'N/log', 'N/record', 'N/render', '../modules/RZK_moments.js', '../modules/RZK_module.js', 'N/config'],
    function(render, format, search, file, log, record, render, moment, rzk, config) {
        /**
         * Definition of the Suitelet script trigger point.
         *
         * @param {Object} context
         * @param {ServerRequest} context.request - Encapsulation of the incoming request
         * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
         * @Since 2015.2
         */
        function onRequest(context) {
            var response = context.response;

            var vendorID = context.request.parameters['custparam_vendor'];
            var subsidiaryId = context.request.parameters['custparam_subsidiary'];
            var statement_date = context.request.parameters['custparam_statementdate'];
            var cur = context.request.parameters['custparam_currency'];
            var startDate = context.request.parameters['startDate'];
            var cur = '';
            var currency = '';
            if (subsidiaryId != 0) {
                var currencyLookup = search.lookupFields({
                    type: "subsidiary",
                    id: subsidiaryId,
                    columns: 'currency'
                });
                var cur = currencyLookup['currency'][0].value;

                  var currencyLookup = search.lookupFields({
                    type: "currency",
                    id: cur,
                    columns: 'symbol'
                });
                var currency = currencyLookup['symbol'];
                var subID=subsidiaryId;

            }else{
                 var vendorLookup = search.lookupFields({
                    type: "vendor",
                    id: Number(vendorID),
                    columns: 'subsidiary'
                });
                var subID = vendorLookup['subsidiary'][0].value;
                log.debug("subID---",subID);

                var currencyLookup = search.lookupFields({
                    type: "subsidiary",
                    id: subID,
                    columns: 'currency'
                });
                var cur = currencyLookup['currency'][0].value;
                var currency = currencyLookup['currency'][0].text;
            }
            var stat_date = statement_date;
            var vendorRec = record.load({
                type: 'vendor',
                id: Number(vendorID),
                isDynamic: true
            });
            var isperson = vendorRec.getValue({
                fieldId: 'isperson'
            });
            var company_name = '';

            if (isperson == true) {
                var firstname = vendorRec.getValue({
                    fieldId: 'firstname'
                });
                var lastname = vendorRec.getValue({
                    fieldId: 'lastname'
                });
                company_name = firstname + " " + lastname;
            } else {
                var company_name = vendorRec.getValue({
                    fieldId: 'companyname'
                });
            }
            var defaultaddress = vendorRec.getValue({
                fieldId: 'defaultaddress'
            });
            if (defaultaddress) {
                var customer_add = vendorRec.getValue({
                    fieldId: 'defaultaddress'
                });
                customer_add = relaceCharector(customer_add);
            } else {
                var customer_add = '';
            }
            var phone_num = vendorRec.getValue({
                fieldId: 'phone'
            });
            var fax_num = vendorRec.getValue({
                fieldId: 'fax'
            });
            var credit_lim = vendorRec.getValue({
                fieldId: 'creditlimit'
            });
            var credit_days = vendorRec.getValue({
                fieldId: 'terms'
            });
            // var currency = vendorRec.getText({
            //     fieldId: 'currency'
            // });
            var subs_legal_name = '';
            var subs_ph = '';
            var subs_fax = '';
            var subs_add = '';
            var currency_text = '';
            var vat_Sub = '';
           
                var subsidiaryRec = record.load({
                    type: 'subsidiary',
                    id: Number(subID),
                    isDynamic: true
                });
                var subs_legal_name = subsidiaryRec.getValue({
                    fieldId: 'legalname'
                });
                var subs_ph = subsidiaryRec.getValue({
                    fieldId: 'addrphone'
                });
                var subs_fax = subsidiaryRec.getValue({
                    fieldId: 'fax'
                });
                var subs_add = subsidiaryRec.getValue({
                    fieldId: 'mainaddress_text'
                });
                var currency_text = subsidiaryRec.getText({
                    fieldId: 'currency'
                });
                var vat_Sub = subsidiaryRec.getValue({
                    fieldId: 'federalidnumber'
                });
            

            var ageingoneAmnt = '';
            var ageingTwoAmnt = '';
            var ageingThreeAmnt = '';
            var ageingFourAmnt = '';
            var balanceAmount = 0;
            var balanceForwardDetails = [];

            var recType = 'transaction';
            var columns = [];
            columns.push(search.createColumn({
                name: "amount",
                summary: "SUM",
                label: "Amount"
            }));
            columns.push(search.createColumn({
                name: "creditamount",
                summary: "SUM",
                label: "Amount (Credit)"
            }));
            columns.push(search.createColumn({
                name: "debitamount",
                summary: "SUM",
                label: "Amount (Debit)"
            }));

            var filters = [];

            // filters.push(search.createFilter({
            //     name: 'isinactive',
            //     operator: search.Operator.IS,
            //     values: false
            // }));
            filters.push(search.createFilter({
                name: 'accounttype',
                operator: search.Operator.ANYOF,
                values: ['AcctPay']
            }));
            filters.push(search.createFilter({
                name: 'posting',
                operator: search.Operator.IS,
                values: true
            }));
            filters.push(search.createFilter({
                name: 'type',
                operator: search.Operator.ANYOF,
                values: ["VendBill", "VendCred", "VendPymt", "Check", "Journal", "SysJrnl", 'Custom105']
            }));
            filters.push(search.createFilter({
                name: 'internalid',
                operator: search.Operator.ANYOF,
                join: 'vendorline',
                values: vendorID
            }));
            if (subsidiaryId != 0) {
                filters.push(search.createFilter({
                    name: 'subsidiary',
                    operator: search.Operator.ANYOF,
                    values: subsidiaryId
                }));
                filters.push(search.createFilter({
                    name: 'currency',
                    operator: search.Operator.ANYOF,
                    values: cur
                }));
            }

            filters.push(search.createFilter({
                name: 'trandate',
                operator: search.Operator.ONORBEFORE,
                values: startDate
            }));

            var balanceForwardSearchObj = {};
            balanceForwardSearchObj.type = recType;
            balanceForwardSearchObj.columns = columns;
            balanceForwardSearchObj.filters = filters;
            var balanceForward = search.create(balanceForwardSearchObj);
            var balForward = balanceForward.run();
            // var balanceForward = search.create({
            //     type: "transaction",
            //     filters: [
            //         ["accounttype", "anyof", "AcctPay"],
            //         "AND", ["posting", "is", "T"],
            //         "AND", ["type", "anyof", "VendBill", "VendCred", "VendPymt", "Check", "Journal", "SysJrnl", 'Custom105'],
            //         "AND", ["vendorline.internalid", "anyof", vendorID],
            //         "AND", ["subsidiary", "anyof", subsidiaryId],
            //         'AND', ['trandate', 'onorbefore', startDate],
            //         "AND", ["currency", "anyof", cur],
            //     ],
            //     columns: [
            //         search.createColumn({
            //             name: "amount",
            //             summary: "SUM",
            //             label: "Amount"
            //         }),
            //         search.createColumn({
            //             name: "creditamount",
            //             summary: "SUM",
            //             label: "Amount (Credit)"
            //         }),
            //         search.createColumn({
            //             name: "debitamount",
            //             summary: "SUM",
            //             label: "Amount (Debit)"
            //         })
            //     ]
            // });
            // var balForward = balanceForward.run();
            balForward.each(function(result) {

                var amount = result.getValue({
                    name: "amount",
                    summary: "SUM"
                });

                balanceAmount = Number(balanceAmount) + Number(amount);
                balanceForwardDetails.push({
                    "tr_date": startDate,
                    "balanceAmount": numberWithCommas(Number(balanceAmount).toFixed(2))
                });

                return true;
            });



            var VendorDetails = [];
            var recType = 'transaction';
            var columns = [];
            columns.push(search.createColumn({
                name: "internalid",
                summary: "GROUP",
                label: "Internal ID"
            }));
            columns.push(search.createColumn({
                name: "internalid",
                join: "vendorLine",
                summary: "MIN",
                label: "Internal ID"
            }));
            columns.push(search.createColumn({
                name: "transactionnumber",
                summary: "MIN",
                label: "Transaction Number"
            }));
            columns.push(search.createColumn({
                name: "type",
                summary: "MIN",
                label: "Type"
            }));
            columns.push(search.createColumn({
                name: "amount",
                summary: "SUM",
                label: "Amount"
            }));
            columns.push(search.createColumn({
                name: "creditamount",
                summary: "SUM",
                label: "Amount (Credit)"
            }));
            columns.push(search.createColumn({
                name: "debitamount",
                summary: "SUM",
                label: "Amount (Debit)"
            }));
            columns.push(search.createColumn({
                name: "trandate",
                summary: "MIN",
                label: "Date",
                sort: search.Sort.ASC,
            }));
            columns.push(search.createColumn({
                name: "daysopen",
                summary: "SUM",
                label: "Date"
            }));
            columns.push(search.createColumn({
                name: "formulanumeric",
                summary: "MAX",
                formula: "ROUND({today}-{trandate},2)",
                label: "Formula (Numeric)"
            }));


            var filters = [];
            filters.push(search.createFilter({
                name: 'accounttype',
                operator: search.Operator.ANYOF,
                values: ['AcctPay']
            }));
            filters.push(search.createFilter({
                name: 'posting',
                operator: search.Operator.IS,
                values: true
            }));
            filters.push(search.createFilter({
                name: 'type',
                operator: search.Operator.ANYOF,
                values: ["VendBill", "VendCred", "VendPymt", "Check", "Journal", "SysJrnl", 'Custom105']
            }));
            filters.push(search.createFilter({
                name: 'internalid',
                operator: search.Operator.ANYOF,
                join: 'vendorline',
                values: vendorID
            }));
            if (subsidiaryId != 0) {
                filters.push(search.createFilter({
                    name: 'subsidiary',
                    operator: search.Operator.ANYOF,
                    values: subsidiaryId
                }));
                filters.push(search.createFilter({
                    name: 'currency',
                    operator: search.Operator.ANYOF,
                    values: cur
                }));
            }

            filters.push(search.createFilter({
                name: 'trandate',
                operator: search.Operator.ONORBEFORE,
                values: stat_date
            }));
            filters.push(search.createFilter({
                name: 'trandate',
                operator: search.Operator.ONORAFTER,
                values: startDate
            }));

            var vendorBillSearchObj = {};
            vendorBillSearchObj.type = recType;
            vendorBillSearchObj.columns = columns;
            vendorBillSearchObj.filters = filters;
            var vendorBillSearch = search.create(vendorBillSearchObj);
            var vendorBill = vendorBillSearch.run()

            // var vendorBillSearch = search.create({
            //     type: "transaction",
            //     filters: [
            //         ["accounttype", "anyof", "AcctPay"],
            //         "AND", ["posting", "is", "T"],
            //         "AND", ["type", "anyof", "VendBill", "VendCred", "VendPymt", "Check", "Journal", "SysJrnl", 'Custom105'],
            //         "AND", ["vendorline.internalid", "anyof", vendorID],
            //         "AND", ["subsidiary", "anyof", subsidiaryId],
            //         'AND', ['trandate', 'onorbefore', stat_date],
            //         'AND', ['trandate', 'onorafter', startDate],
            //         "AND", ["currency", "anyof", cur],
            //     ],
            //     columns: [
            //         search.createColumn({
            //             name: "internalid",
            //             summary: "GROUP",
            //             label: "Internal ID"
            //         }),
            //         search.createColumn({
            //             name: "internalid",
            //             join: "vendorLine",
            //             summary: "MIN",
            //             label: "Internal ID"
            //         }),
            //         search.createColumn({
            //             name: "transactionnumber",
            //             summary: "MIN",
            //             label: "Transaction Number"
            //         }),
            //         search.createColumn({
            //             name: "type",
            //             summary: "MIN",
            //             label: "Type"
            //         }),
            //         search.createColumn({
            //             name: "amount",
            //             summary: "SUM",
            //             label: "Amount"
            //         }),
            //         search.createColumn({
            //             name: "creditamount",
            //             summary: "SUM",
            //             label: "Amount (Credit)"
            //         }),
            //         search.createColumn({
            //             name: "debitamount",
            //             summary: "SUM",
            //             label: "Amount (Debit)"
            //         }),
            //         search.createColumn({
            //             name: "trandate",
            //             summary: "MIN",
            //             label: "Date",
            //             sort: search.Sort.ASC,
            //         }),
            //         search.createColumn({
            //             name: "daysopen",
            //             summary: "SUM",
            //             label: "Date"
            //         }),
            //         search.createColumn({
            //             name: "formulanumeric",
            //             summary: "MAX",
            //             formula: "ROUND({today}-{trandate},2)",
            //             label: "Formula (Numeric)"
            //         })

            //     ]
            // });
            // var vendorBill = vendorBillSearch.run();
            vendorBill.each(function(result) {
                var tran_date = result.getValue({
                    name: "trandate",
                    summary: "MIN",
                    sort: search.Sort.ASC
                });
                var tranid = result.getValue({
                    name: "transactionnumber",
                    summary: "MIN"
                });
                var tr_date = tran_date;
                var tranType = result.getValue({
                    name: "type",
                    summary: "MIN"
                });
                var amount = result.getValue({
                    name: "amount",
                    summary: "SUM"
                });
                var creditAmount = result.getValue({
                    name: "creditamount",
                    summary: "SUM"
                });
                var daysOpen = result.getValue({
                    name: "daysopen",
                    summary: "SUM"
                });
                if (creditAmount) {
                    creditAmount = creditAmount;
                } else {
                    creditAmount = 0;
                }
                var debitAmount = result.getValue({
                    name: "debitamount",
                    summary: "SUM"
                });
                if (debitAmount) {
                    debitAmount = debitAmount;
                } else {
                    debitAmount = 0;
                }

                balanceAmount = Number(balanceAmount) + Number(amount);
                VendorDetails.push({
                    "tr_date": tr_date,
                    "tranid": tranid,
                    "tranType": tranType,
                    "creditAmount": numberWithCommas(creditAmount),
                    "debitAmount": numberWithCommas(debitAmount),
                    "balanceAmount": numberWithCommas(Number(balanceAmount).toFixed(2))
                });
                if (tranType == 'Journal') {
                    var daysOpen = result.getValue({
                        name: "formulanumeric",
                        summary: "MAX",
                        formula: "ROUND({today}-{trandate},2)"
                    });
                }
                log.debug("daysOpen--", daysOpen);
                if (daysOpen >= 0 && daysOpen <= 30) {
                    var amount = result.getValue({
                        name: "amount",
                        summary: "SUM"
                    });
                    ageingoneAmnt = Number(ageingoneAmnt) + Number(amount);
                }
                if (daysOpen > 30 && daysOpen <= 60) {
                    var amount = result.getValue({
                        name: "amount",
                        summary: "SUM"
                    });
                    ageingTwoAmnt = Number(ageingTwoAmnt) + Number(amount);
                }
                if (daysOpen > 60 && daysOpen <= 90) {
                    var amount = result.getValue({
                        name: "amount",
                        summary: "SUM"
                    });
                    ageingThreeAmnt = Number(ageingThreeAmnt) + Number(amount);
                }
                if (daysOpen > 90) {
                    var amount = result.getValue({
                        name: "amount",
                        summary: "SUM"
                    });
                    ageingFourAmnt = Number(ageingFourAmnt) + Number(amount);
                }
                return true;
            });

            if (phone_num) {
                phone_num = phone_num;
            } else {
                phone_num = 0;
            }
            if (fax_num) {
                fax_num = fax_num;
            } else {
                fax_num = 0;
            }
            if (subs_fax) {
                subs_fax = subs_fax;
            } else {
                subs_fax = 0;
            }
            try {
                var imagesPath = '';
                var companyInfo = config.load({
                    type: config.Type.COMPANY_INFORMATION
                });
                var formlogo = companyInfo.getValue({
                    fieldId: 'formlogo'
                });

                var PrefixUrl = companyInfo.getValue({
                    fieldId: 'appurl'
                });
                if (formlogo) {
                    fileObj = file.load({
                        id: formlogo
                    });
                    imagesPath = PrefixUrl + fileObj.url;
                }
            } catch (e) {}
            if (imagesPath) {
                imagesPath = relaceCharector(imagesPath);
            } else {
                imagesPath = "";
            }

            jsonObj = {
                //-----------  Vendor Start ----------//
                imagesPath: imagesPath,
                vat_Sub: vat_Sub,
                stat_date: stat_date,
                current_date: stat_date,
                company_name: company_name,
                customer_add: customer_add,
                phone_num: phone_num,
                fax_num: fax_num,
                credit_lim: credit_lim,
                credit_days: credit_days,
                currency_text: currency_text,
                //-----------  Vendor End ----------//

                //-----------  Subsidiary Start ----------//
                subs_legal_name: subs_legal_name,
                subs_ph: subs_ph,
                subs_fax: subs_fax,
                subs_add: subs_add,
                //-----------  Subsidiary End ----------//

                //-----------  balance Forward Details Start ----------//
                balanceForwardDetails: balanceForwardDetails,
                //-----------  balance Forward Details End ----------//

                //-----------  Vendor Deatails Star ----------//
                VendorDetails: VendorDetails,
                //-----------  Vendor Deatails End ----------//

                //-----------  Day Limit Table Start ----------//
                currency: currency,
                ageingoneAmnt: numberWithCommas(Number(ageingoneAmnt).toFixed(2)),
                ageingTwoAmnt: numberWithCommas(Number(ageingTwoAmnt).toFixed(2)),
                ageingThreeAmnt: numberWithCommas(Number(ageingThreeAmnt).toFixed(2)),
                ageingFourAmnt: numberWithCommas(Number(ageingFourAmnt).toFixed(2)),
                balanceAmount: numberWithCommas(Number(balanceAmount).toFixed(2))
                    //-----------  Day Limit Table End ----------//


            }
            var templateFile = file.load('Templates/PDF Templates/RZK_Suitelet_Vendor_Statment_Print_New.html');
            var renderer = render.create();
            renderer.templateContent = templateFile.getContents();

            renderer.addCustomDataSource({
                format: render.DataSource.OBJECT,
                alias: "myJsonObject",
                data: jsonObj
            });

            var newfile = renderer.renderAsPdf();
            response.writeFile(newfile, true);
        }

        return {
            onRequest: onRequest
        };
    });

function relaceCharector(charVal) {
    if (charVal) {
        return charVal.replace(/&/g, "&amp;");
    } else {
        return charVal;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function strReplace(str, replaceVal) {
    var res = str.replace(replaceVal, "");
    return res;
}

function inDays(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return parseInt((t2 - t1) / (24 * 3600 * 1000));
}



// function numberWithCommas(x) {

//     var parts = x.toString().split(".");

//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//     return parts.join(".");

// }