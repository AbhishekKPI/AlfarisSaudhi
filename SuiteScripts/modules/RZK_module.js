/**
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

define(['N/runtime', 'N/format', './RZK_moments.js', 'N/record', 'N/search', 'N/error'],
    function(runtime, format, moment, record, search, error) {

        //Create your own function
        function gettingUserName() {

            var userName = runtime.getCurrentUser().name;
            return userName;
        }

        function gettingTimeZone() {

            var userObj = runtime.getCurrentUser();
            log.debug("userObj------ ", userObj);

            var timeZone = userObj.getPreference({
                name: "TIMEZONE"
            });
            log.debug("timeZone--- ", timeZone);
            return timeZone;

        }

        function parseDate(dateOne) {
            if (dateOne) {
                dateOne = format.parse({
                    value: dateOne,
                    type: format.Type.DATE
                });
                dateOne = moment(dateOne).utc().endOf('day');
                // dateOne = moment(dateOne).format();

            }
            return dateOne;
        }

        function formatDate(dateROBD) {
            // dateROBD = dateROBD.format(formatROBD).toString();
            dateROBD = format.parse({
                value: new Date(dateROBD),
                type: format.Type.DATE
            });

            dateROBD = convertUTCDateToLocalDate(new Date(dateROBD));

            return dateROBD;
        }

        function formatDateMinus(dateROBD) {
            // dateROBD = dateROBD.format(formatROBD).toString();
            dateROBD = format.parse({
                value: new Date(dateROBD),
                type: format.Type.DATE
            });

            // dateROBD = convertUTCDateToLocalDate(new Date(dateROBD));

            return dateROBD;
        }

        function convertUTCDateToLocalDate(date) {
            var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

            var offset = date.getTimezoneOffset() / 60;
            var hours = date.getHours();

            newDate.setHours(hours - offset);

            return newDate;
        }



        function createErrorLog(scriptName, recordProcess, timeStamp, recordID, errorObj) {
            var objRecord = record.create({
                type: 'customrecord_rent_error_log',
                isDynamic: true
            }).setValue({
                fieldId: 'custrecord_rent_error_script_name',
                value: scriptName
            }).setValue({
                fieldId: 'custrecord_rent_error_record_process',
                value: recordProcess
            }).setValue({
                fieldId: 'custrecord_rent_error_timestamp',
                value: timeStamp
            }).setValue({
                fieldId: 'custrecord_rent_error_message',
                value: 'Record ID : ' + recordID + ' | Error String : ' + errorObj.toString()
            }).save({
                enableSourcing: false,
                ignoreMandatoryFields: false
            });

            log.debug("Inside create error log");
        }


        function checkConcurrency(mainSourceID, currentRecType) {
            var concLength = 0;
            var concRecType = 'customrecord_rent_concurrency_check';
            var columnsConc = [];
            columnsConc.push(search.createColumn({
                name: 'internalid'
            }));

            var filtersConc = [];
            filtersConc.push(search.createFilter({
                name: 'custrecord_rent_conc_recid',
                operator: search.Operator.EQUALTO,
                values: mainSourceID
            }));

            filtersConc.push(search.createFilter({
                name: 'custrecord_rent_conc_rectype',
                operator: search.Operator.STARTSWITH,
                values: currentRecType
            }));
            var concObj = {};
            concObj.type = concRecType;
            concObj.columns = columnsConc;
            concObj.filters = filtersConc;
            var concSearch = search.create(concObj);
            var concResultSet = concSearch.run();
            var concResults = concResultSet.getRange(0, 1000);
            if (concResults) {
                concLength = concResults.length;
            }
            return concLength;
        }

        function createConcurrency(mainSourceID, currentRecType) {
            var concuRec = record.create({
                type: 'customrecord_rent_concurrency_check',
                isDynamic: true
            });
            concuRec.setValue({
                fieldId: 'custrecord_rent_conc_recid',
                value: mainSourceID,
                ignoreFieldChange: true
            });
            concuRec.setValue({
                fieldId: 'custrecord_rent_conc_rectype',
                value: currentRecType,
                ignoreFieldChange: true
            });
            var concurId = concuRec.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
            });
            return concurId;
        }

        function deleteConcurrency(concurrencyId) {
            record.delete({
                type: 'customrecord_rent_concurrency_check',
                id: concurrencyId
            });
        }

        function callCreateError() {
            var eTitle = 'RENTEGRATE_NOT_PERMITTED';
            var eMessage = 'You cannot add already one user using this record';
            createError(eTitle, eMessage);
        }


        function createError(eTitle, eMessage) {
            var errorObj = error.create({
                name: eTitle,
                message: eMessage,
                notifyOff: true,
            })
            throw errorObj.message
        }

        function hideChildButtons(scriptContext, serverWidget) {
            var hideFld = scriptContext.form.addField({
                id: 'custpage_hide_buttons',
                label: 'not shown - hidden',
                type: serverWidget.FieldType.INLINEHTML
            });
            var scr = "";
            scr += 'jQuery("input[name^=\'newrec\']").remove();';
            // scr += 'jQuery("#recmachcustrecord_rent_allocasset_allocation_buttons").hide();';
            hideFld.defaultValue = "<script>jQuery(function($){require([], function(){" + scr + ";})})</script>"
        }

        function setupRecord() {
            // Set-Up table loading
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            return setupRecord;
            // END
        }


        function getCrossLocationAllocation() {
            // var setupRecord = setupRecord();
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getCrossLocationAllocation = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_cross_allocation"
            });
            log.debug("getCrossLocationAllocation", getCrossLocationAllocation);
            return getCrossLocationAllocation;
        }

        function getCrossLocationReplacement() {
            // var setupRecord = setupRecord();
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getCrossLocationReplacement = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_cross_replacement"
            });
            log.debug("getCrossLocationReplacement", getCrossLocationReplacement);
            return getCrossLocationReplacement;
        }

        function getWorkshopPageRange() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getWorkshopMaxRange = setupRecord.getText({
                fieldId: "custrecord_rent_setup_workshop_list"
            });
            return getWorkshopMaxRange;
        }

        function getBulkInvPageRange() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getBulkInvPgRange = setupRecord.getText({
                fieldId: "custrecord_rent_setup_bulk_invoice_list"
            });
            return getBulkInvPgRange;
        }

        function getBulkPostPageRange() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getBulkPostRange = setupRecord.getText({
                fieldId: "custrecord_rent_setup_timesheet_list"
            });
            return getBulkPostRange;
        }


        function getAllocationPageRange() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getAllocationRange = setupRecord.getText({
                fieldId: "custrecord_rent_setup_allocation_list"
            });
            return getAllocationRange;
        }


        function getSoCloseOnhire() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var soCloseOnhire = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_so_close_onhire"
            });
            return soCloseOnhire;
        }

        function getSoCloseRobdBilled() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var soCloseRobdBilled = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_so_robd_billed"
            });
            return soCloseRobdBilled;
        }


        function getTimesheetTimes() {
            // var setupRecord = setupRecord();
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var fromTime = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_from_time"
            });
            var toTime = setupRecord.getValue({
                fieldId: "custrecord_rent_set_to_time"
            });
            // var breakTime = setupRecord.getValue({
            //     fieldId: "custrecord_rent_setup_break_time"
            // });

            var timeArray = new Array();
            timeArray.push(fromTime);
            timeArray.push(toTime);
            // timeArray.push(breakTime);
            log.debug("timeArray", timeArray);
            return timeArray;
        }

        function getROBDAvailableUpto() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var robdAvailUpto = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_robd_avail_upto"
            });
            return robdAvailUpto;
        }

        function getInvoiceForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var invoiceForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_invoice_form_id"
            });
            return invoiceForm;
        }
        function getInvoiceContractForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var invoiceForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_inv_form_contr_id"
            });
            return invoiceForm;
        }

        function getCaptureBilling() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var captureBilling = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_capture_billing"
            });
            return captureBilling;
        }


        function getCalenderView() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getCalndrView = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_calender_view"
            });
            return getCalndrView;
        }

        function getQuoteContractForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getQuoteContractForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_quote_contract"
            });
            return getQuoteContractForm;
        }

        function getQuoteContractUnitsForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getQuoteContractUnitsForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_quote_contractunit"
            });
            return getQuoteContractUnitsForm;
        }


        function getQuoteContractTimesheetForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getQuoteContractTimesheetForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_quote_contractime"
            });
            return getQuoteContractTimesheetForm;
        }


        function getQuoteTimesheetForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getQuoteTimesheetForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_quote_timesheet"
            });
            return getQuoteTimesheetForm;
        }


        function getSOContractForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getSOContractForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_so_contract"
            });
            return getSOContractForm;
        }

        function getSOContractUnitsForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getSOContractUnitsForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_so_contractunits"
            });
            return getSOContractUnitsForm;
        }


        function getSOContractTimesheetForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getSOContractTimesheetForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_so_contract_time"
            });
            return getSOContractTimesheetForm;
        }


        function getSOTimesheetForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getSOTimesheetForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_so_timesheet"
            });
            return getSOTimesheetForm;
        }

        function getallocationDefaultForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getallocationDefaultForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_alloc_ass_anc_man"
            });
            return getallocationDefaultForm;
        }

        function getallocationSubstituteForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getallocationSubstituteForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_alloc_substitute"
            });
            return getallocationSubstituteForm;
        }

        function getallocationReRentForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getallocationReRentForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_alloc_re_rent"
            });
            return getallocationReRentForm;
        }

        function getMROChangeRateForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getMROChangeRateForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_mro_change_rate"
            });
            return getMROChangeRateForm;
        }

        function getMROExtendROForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getMROExtendROForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_mro_extend_rental"
            });
            return getMROExtendROForm;
        }

        function getPUTOffhireOForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getPUTOffhireOForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_put_offhire"
            });
            return getPUTOffhireOForm;
        }

        function getPUTReplacementOForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getPUTReplacementOForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_put_replacement"
            });
            return getPUTReplacementOForm;
        }

        function getRODContractForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getRODContractForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_rod_contract"
            });
            return getRODContractForm;
        }

        function getRODTimesheetForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getRODTimesheetForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_rod_timesheet"
            });
            return getRODTimesheetForm;
        }

        function getRODContractUnitsForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getRODUnitsForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_rod_contract_units"
            });
            return getRODUnitsForm;
        }

        function getRODContractTimesheetForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getRODOthersForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_rod_cont_timesheet"
            });
            return getRODOthersForm;
        }



        function getROBDContractForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getROBDContractForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_robd_contract"
            });
            return getROBDContractForm;
        }

        function getROBDTimesheetForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getROBDTimesheetForm = setupRecord.getValue({
                fieldId: "custrecordrent_setup_robd_timesheet"
            });
            return getROBDTimesheetForm;
        }

        function getROBDUnitsForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getROBDUnitsForm = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_robd_units"
            });
            return getROBDUnitsForm;
        }

        function getROBDOthersForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getROBDOthersForm = setupRecord.getValue({
                fieldId: "custrecordrent_setup_robd_others"
            });
            return getROBDOthersForm;
        }

        function getROBDDeliveryChargesForm() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getROBDDeliveryChargesForm = setupRecord.getValue({
                fieldId: "custrecordrent_setup_robd_delivery_charg"
            });
            return getROBDDeliveryChargesForm;
        }

        function getIsDeliveryOnhireAutomated() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getIsDeliveryOnhireAutomated = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_delivery_automated"
            });
            return getIsDeliveryOnhireAutomated;
        }


        function getIsPutOffhireAutomated() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var getIsPutOffhireAutomated = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_pickup_automated"
            });
            return getIsPutOffhireAutomated;
        }


        function getROBDAvailableUnits() {
            var setupRecord = record.load({
                type: "customrecord_rent_setup",
                id: 1,
                isDynamic: false,
            });
            var robdAvailUpto = setupRecord.getValue({
                fieldId: "custrecord_rent_setup_robd_avail_units"
            });
            return robdAvailUpto;
        }



        return {
            gettingUserName: gettingUserName,
            gettingTimeZone: gettingTimeZone,
            parseDate: parseDate,
            formatDate: formatDate,
            createErrorLog: createErrorLog,
            checkConcurrency: checkConcurrency,
            createConcurrency: createConcurrency,
            deleteConcurrency: deleteConcurrency,
            callCreateError: callCreateError,
            createError: createError,
            hideChildButtons: hideChildButtons,
            getCrossLocationAllocation: getCrossLocationAllocation,
            getCrossLocationReplacement: getCrossLocationReplacement,
            setupRecord: setupRecord,
            getWorkshopPageRange: getWorkshopPageRange,
            getBulkInvPageRange: getBulkInvPageRange,
            getBulkPostPageRange: getBulkPostPageRange,
            getAllocationPageRange: getAllocationPageRange,
            getSoCloseOnhire: getSoCloseOnhire,
            getSoCloseRobdBilled: getSoCloseRobdBilled,
            getTimesheetTimes: getTimesheetTimes,
            getROBDAvailableUpto: getROBDAvailableUpto,
            getInvoiceForm: getInvoiceForm,
            getCaptureBilling: getCaptureBilling,
            getCalenderView: getCalenderView,
            getQuoteContractForm: getQuoteContractForm,
            getQuoteContractUnitsForm: getQuoteContractUnitsForm,
            getQuoteContractTimesheetForm: getQuoteContractTimesheetForm,
            getQuoteTimesheetForm: getQuoteTimesheetForm,
            getSOContractForm: getSOContractForm,
            getSOContractUnitsForm: getSOContractUnitsForm,
            getSOContractTimesheetForm: getSOContractTimesheetForm,
            getSOTimesheetForm: getSOTimesheetForm,
            getallocationDefaultForm: getallocationDefaultForm,
            getallocationSubstituteForm: getallocationSubstituteForm,
            getallocationReRentForm: getallocationReRentForm,
            getMROExtendROForm: getMROExtendROForm,
            getMROChangeRateForm: getMROChangeRateForm,
            getPUTOffhireOForm: getPUTOffhireOForm,
            getPUTReplacementOForm: getPUTReplacementOForm,
            getRODContractUnitsForm: getRODContractUnitsForm,
            getRODContractTimesheetForm: getRODContractTimesheetForm,
            getRODTimesheetForm: getRODTimesheetForm,
            getRODContractForm: getRODContractForm,
            getROBDDeliveryChargesForm: getROBDDeliveryChargesForm,
            getROBDOthersForm: getROBDOthersForm,
            getROBDUnitsForm: getROBDUnitsForm,
            getROBDTimesheetForm: getROBDTimesheetForm,
            getROBDContractForm: getROBDContractForm,
            getIsDeliveryOnhireAutomated: getIsDeliveryOnhireAutomated,
            getIsPutOffhireAutomated: getIsPutOffhireAutomated,
            getROBDAvailableUnits:getROBDAvailableUnits,
            formatDateMinus: formatDateMinus,
            getInvoiceContractForm:getInvoiceContractForm
        };

    });