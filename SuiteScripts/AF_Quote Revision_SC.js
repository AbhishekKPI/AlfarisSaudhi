function quoteRevisionSCAction() {
    nlapiLogExecution('DEBUG', 'coming inside***************');
    var qtId = nlapiGetContext().getSetting('SCRIPT', 'custscript_quote_id_sch_cr');
    var timeStamp = nlapiGetContext().getSetting('SCRIPT', 'custscript_timestamp_sch_cr');
    var redirectType = nlapiGetContext().getSetting('SCRIPT', 'custscript_edirect_type');

    nlapiLogExecution('DEBUG', 'qtId***************', qtId);
    nlapiLogExecution('DEBUG', 'timeStamp***************', timeStamp);
    nlapiLogExecution('DEBUG', 'redirectType***************', redirectType);


    if (redirectType == 'reviseQuote') {
        var qtRec = nlapiLoadRecord('estimate', qtId);
        var qtCopyRec = nlapiCopyRecord('estimate', qtId, null);
        var itemCount = qtRec.getLineItemCount('item');
        var tranIDOld = qtRec.getFieldValue("custbody_cust_doc_number");
        if (tranIDOld) {
            var tranID = qtRec.getFieldValue("custbody_cust_doc_number");
        } else {
            var tranID = qtRec.getFieldValue("tranid");
        }
        var versionCnt = qtRec.getFieldValue("custbody_quote_revision_version");

        var revID = tranIDGeneration(tranID);
        qtCopyRec.setFieldValue('custbody_quote_revision_version', (+versionCnt + +1), true);
        qtCopyRec.setFieldValue('custbody_revised_from', qtId, true);
        qtCopyRec.setFieldValue('custbody_inactive_based_on_the', "F", true);
        qtCopyRec.setFieldValue('custbody_quote_revision', "T", true);
        qtCopyRec.setFieldValue('custbody_cust_doc_number', revID + ".REV" + (+versionCnt + +1), true);
        //qtCopyRec.setFieldValue('tranid', revID + "/REV" + (+versionCnt + +1), true);
        var qtCopyRecID = nlapiSubmitRecord(qtCopyRec, false, true);

        nlapiSubmitField('estimate', qtCopyRecID, 'tranid', revID + ".REV" + (+versionCnt + +1), false);
        nlapiSubmitField('estimate', qtId, 'custbody_inactive_based_on_the', "T", false);
        // nlapiSubmitField('estimate', qtId, 'custbody_quote_revision', "T", false);
        nlapiSubmitField('estimate', qtId, 'entitystatus', 14, false);
        var rent_estimate_ref = qtRec.getFieldValue("custbody_rent_estimate_ref");

        nlapiSubmitField('customsale_rent_estimate', rent_estimate_ref, 'custbody_rent_est_quote_ref', qtCopyRecID);

        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_trans_rec_id', qtCopyRecID);
        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_message', "Complete");
    } else if (redirectType == 'quoteFromEst') {
        var qtRec = nlapiLoadRecord('estimate', qtId);
        nlapiLogExecution('DEBUG', 'qtRec === ', qtId);
        var qtCopyRec = nlapiCopyRecord('estimate', qtId, null);

        var tranIDOld = qtRec.getFieldValue("custbody_cust_doc_number");
        var tranDate = qtRec.getFieldValue("trandate");
        // var toDate = tranDate;


        var rent_estimate_ref = qtRec.getFieldValue('custbody_rent_estimate_ref');
        nlapiLogExecution('DEBUG', 'rent_estimate_ref === ', rent_estimate_ref);

        if (tranIDOld) {
            var tranID = qtRec.getFieldValue("custbody_cust_doc_number");
        } else {
            var tranID = qtRec.getFieldValue("tranid");
        }
        var versionCnt = qtRec.getFieldValue("custbody_quote_revision_version");

        var revID = tranIDGeneration(tranID);
        qtCopyRec.setFieldValue('custbody_quote_revision_version', (+versionCnt + +1), true);
        qtCopyRec.setFieldValue('custbody_revised_from', qtId, true);
        qtCopyRec.setFieldValue('custbody_inactive_based_on_the', "F", true);
        qtCopyRec.setFieldValue('custbody_cust_doc_number', revID + ".REV" + (+versionCnt + +1), true);
        //qtCopyRec.setFieldValue('tranid', revID + "/REV" + (+versionCnt + +1), true);


        var itemCount = qtCopyRec.getLineItemCount('item');
        nlapiLogExecution('DEBUG', 'itemcount to remobve === ', itemCount);
        // for (var j = itemCount; j > 0; j--) {
        //     qtRec.removeLineItem('item', j);
        //     nlapiLogExecution('DEBUG','line removed === ',j);
        // }

        for (var i = 1; i <= itemCount; i++) // loop through all the line items
        {
            var x = 1;
            qtCopyRec.removeLineItem('item', x); // remove the first line item
            nlapiLogExecution('DEBUG', 'line removed === ');

        }

        if (rent_estimate_ref) {
            // var estimateRec = record.load({
            //     type: 'customsale_rent_estimate',
            //     id: Number(rent_estimate_ref),
            //     isDynamic: true
            // });
            var estimateRec = nlapiLoadRecord("customsale_rent_estimate", Number(rent_estimate_ref));

            var allow_lump_sum = estimateRec.getFieldValue("custbody_allow_lump_sum");
            var combined_project = estimateRec.getFieldValue("custbody_combined_project");
            var memo = estimateRec.getFieldValue("memo");
            qtCopyRec.setFieldValue('custbody_allow_lump_sum', allow_lump_sum);
            qtCopyRec.setFieldValue('custbody_combined_project', combined_project);
            qtCopyRec.setFieldValue('memo', memo);

            // if (allowLumpsum == false) {
            var itemCount = estimateRec.getLineItemCount('item');
            nlapiLogExecution('DEBUG', ' itemCount === ', itemCount);
            // log.debug('inside estimaterecord itemCount', itemCount);
            var line = 1;
            var ancLine = 1;
            var updateLine;
            var noofOperators;
            var noofHelpers;
            var noofSupervisor;
            var noofRiggers;
            var noofDriver;
            var mainParentItem = 0;
            var parentPerHourRate = 0;
            var parentExtraHourRate = 0;
            var mainParentItemLine = 0;
            var parentTotalRate = 0;
            var parentTotalHourlyRate = 0;
            var parentTotalDailyRate = 0;
            var parentTotalWeeklyRate = 0;
            var parentTotalMonthlyRate = 0;
            for (var i = 1; i <= itemCount; i++) {

                var included = estimateRec.getLineItemValue('item', 'custcol_rent_include_asset_item', i);
                var itemType = estimateRec.getLineItemValue('item', 'custcol_rent_item_type', i);
                nlapiLogExecution('DEBUG', 'included test === ', included);
                nlapiLogExecution('DEBUG', 'itemType === ', itemType);

                var actaulItemType = estimateRec.getLineItemValue('item', 'itemtype', i);
                nlapiLogExecution('DEBUG', 'actaulItemType === ', actaulItemType);

                var item = estimateRec.getLineItemValue('item', 'item', i);
                nlapiLogExecution('DEBUG', 'item === ', item);

                var itemName = estimateRec.getLineItemText('item', "item", i)
                nlapiLogExecution('DEBUG', 'itemName === ', itemName);

                // if (actaulItemType == "Description") {


                    var quantity = estimateRec.getLineItemValue('item', 'custcol_rent_rental_quantity', i);

                    var rate = estimateRec.getLineItemValue('item', 'rate', i);
                    nlapiLogExecution('DEBUG', 'rate === ', rate);
                    var lineAmount = estimateRec.getLineItemValue('item', 'amount', i);


                    var parentItem = estimateRec.getLineItemValue('item', 'custcol_rent_est_parent_item', i);


                    var parentItemLineNum = estimateRec.getLineItemValue('item', 'custcol_rent_est_parent_item_line_num', i);


                    var manpowerType = estimateRec.getLineItemValue('item', 'custcol_rent_manpower_type', i);

                    var lineuniqueKey = estimateRec.getLineItemValue('item', 'lineuniquekey', i);


                    var agreedHours = estimateRec.getLineItemValue('item', 'custcol_rent_agreed_hours', i);


                    var perHourRate = estimateRec.getLineItemValue('item', 'custcol_rent_per_hour_rate', i);


                    var extraHoursLoad = estimateRec.getLineItemValue('item', 'custcol_rent_extra_hours_load', i);


                    var extraHourRate = estimateRec.getLineItemValue('item', 'custcol_rent_extra_hours_rate', i);


                    var agreedHoursPerDay = estimateRec.getLineItemValue('item', 'custcol_rent_agreed_hours_per_day', i);


                    var rentalUnit = estimateRec.getLineItemValue('item', 'custcol_rent_rental_unit', i);


                    var billingRule = estimateRec.getLineItemValue('item', 'custcol_rent_billing_rule', i);


                    var description = estimateRec.getLineItemValue('item', 'description', i);




                    var rodType = estimateRec.getLineItemValue('item', 'custcol_rent_rod_type', i);


                    var pref_daily_rate = estimateRec.getLineItemValue('item', 'custcol_pref_daily_rate', i);


                    var pref_monthly_rate = estimateRec.getLineItemValue('item', 'custcol_pref_monthly_rate', i);


                    var pref_weekly_rate = estimateRec.getLineItemValue('item', 'custcol_pref_weekly_rate', i);


                    var pref_daily_hours = estimateRec.getLineItemValue('item', 'custcol_preffered_daily_hours', i);


                    var pref_monthly_hours = estimateRec.getLineItemValue('item', 'custcol_preffered_monthly_hours', i);


                    var pref_weekly_hours = estimateRec.getLineItemValue('item', 'custcol_preffered_weekly_hours', i);
                    var pref_hourly_rate = estimateRec.getLineItemValue('item', 'custcol_preffered_hourly_rate', i);
                    var pref_hourly_hours = estimateRec.getLineItemValue('item', 'custcol_preffered_hourly_hours', i);
                    var pref_hourly_days = estimateRec.getLineItemValue('item', 'custcol_preffered_hourly_days', i);
                    var pref_monthly_days = estimateRec.getLineItemValue('item', 'custcol_preffered_monthly_days', i);
                    var pref_weekly_days = estimateRec.getLineItemValue('item', 'custcol_preffered_weekly_days', i);
                    var pref_daily_days = estimateRec.getLineItemValue('item', 'custcol_preffered_daily_days', i);
                    var individualItem = estimateRec.getLineItemValue('item', 'custcol_is_individual_item', i);
                    var isTruck = estimateRec.getLineItemValue('item', 'custcol_is_truck', i);
                    var tax_code = estimateRec.getLineItemValue('item', 'custcol_estimate_tax_code', i);
                    var nonPosting = estimateRec.getLineItemValue('item', 'custcol_non_posting_assets', i);
                // }
                // log.debug('actaulItemType', actaulItemType);

                // log.debug('actaulItemType', actaulItemType);

                var nohdwm = 1;
                var fromDate = nlapiStringToDate(tranDate);
                // calculation for To date
                if (fromDate && nohdwm) {
                    var todt = '';
                    var toDate = '';
                    if (rentalUnit == 4) { ///monthly
                        // todt = moment(fromDate, 'D/M/YYYY').add((nohdwm), 'months').subtract(1, 'days');
                        todt = nlapiAddMonths(fromDate, nohdwm);
                        todt = nlapiAddDays(todt, -1);
                    } else if (rentalUnit == 3) { ///weekly
                        // todt = moment(fromDate, 'D/M/YYYY').add(((nohdwm * 7) - 1), 'days');
                        todt = nlapiAddDays(fromDate, (nohdwm * 7));
                        todt = nlapiAddDays(todt, -1);
                    } else if (rentalUnit == 2) { ///days
                        // todt = moment(fromDate, 'D/M/YYYY').add((nohdwm), 'days');
                        todt = nlapiAddDays(fromDate, nohdwm);
                        todt = nlapiAddDays(todt, -1);
                    } else {
                        todt = fromDate;
                    }
                    // nlapiLogExecution("DEBUG", 'todt==========', todt);
                    if (todt) {

                        toDate = nlapiDateToString(todt);
                        // nlapiLogExecution('DEBUG', 'toDate  === ', toDate);
                    }
                }
                // var toDate = tranDate;



                // nlapiLogExecution('DEBUG', 'before Description  testing === ');
                if (actaulItemType == 'Description' || actaulItemType == -3) {
                    nlapiLogExecution('DEBUG', 'Description  testing  in === item', item);
                    // nlapiLogExecution('DEBUG', 'Description  testing === description', description);
                    // nlapiLogExecution('DEBUG', 'Description  testing === line', line);
                    qtCopyRec.setLineItemValue('item', 'item', line, item);
                    qtCopyRec.setLineItemValue('item', 'description', line, description);
                    // qtCopyRec.setLineItemValue('item', 'taxcode', line, 16);
                    //  qtCopyRec.setLineItemValue('item', 'amount', line, 0);
                    nlapiLogExecution('DEBUG', 'Description  testing out === item', item);
                    // nlapiLogExecution('DEBUG', 'toDate  === ', toDate);

                    line++;
                }
                // log.debug('manpowerType', manpowerType);
                // log.debug('quantity', quantity);
                // nlapiLogExecution('DEBUG', ' manpowerType 111=== ', manpowerType);
                // nlapiLogExecution('DEBUG', ' itemType 111=== ', itemType);
                // nlapiLogExecution('DEBUG', ' included 111=== ', included);

                if ((itemType == 1 && included == true) || (itemType == 1 && included == "T")) {
                    nlapiLogExecution('DEBUG', 'item  testing --1=== ');

                    //    log.debug('itemType Asset and included loop is', i);

                    updateLine = line;
                    mainParentItem = item;
                    mainParentItemLine = lineuniqueKey;
                    // parentTotalRate = lineAmount;
                    parentTotalRate = rate;
                    parentPerHourRate = perHourRate;
                    parentExtraHourRate = extraHourRate;
                    parentTotalDailyRate = pref_daily_rate;
                    parentTotalWeeklyRate = pref_weekly_rate;
                    parentTotalMonthlyRate = pref_monthly_rate;
                    parentTotalHourlyRate = pref_hourly_rate;

                    var text = qtCopyRec.setLineItemValue('item', 'item', line, item);

                    qtCopyRec.setLineItemValue('item', 'description', line, description);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_item_type', line, itemType);
                    if (quantity)
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_rental_quantity', line, quantity.toString());
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_rental_unit', line, rentalUnit);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_billing_rule', line, billingRule);
                    qtCopyRec.setLineItemValue('item', 'custcol_pref_daily_rate', line, pref_daily_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_pref_monthly_rate', line, pref_monthly_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_pref_weekly_rate', line, pref_weekly_rate);

                    //preferred hours start
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_daily_hours', line, pref_daily_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_monthly_hours', line, pref_monthly_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_weekly_hours', line, pref_weekly_hours);
                    var subTotal = 0;
                    //// check
                    if (quantity && rate) {
                        subTotal = Number(quantity) * Number(rate) * 1;
                        qtCopyRec.setLineItemValue('item', 'amount', line, subTotal);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_est_subtotal', line, subTotal);
                    }
                    // qtCopyRec.setLineItemValue('item', 'amount', line, 0);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_agreed_hours', line, agreedHours);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_per_hour_rate', line, perHourRate);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_extra_hours_load', line, extraHoursLoad);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_extra_hours_rate', line, extraHourRate);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_agreed_hours_per_day', line, agreedHoursPerDay);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_rod_type', line, rodType);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_rate', line, pref_hourly_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_hours', line, pref_hourly_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_days', line, pref_hourly_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_weekly_days', line, pref_weekly_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_daily_days', line, pref_daily_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_monthly_days', line, pref_monthly_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_from_date', line, tranDate);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_no_of_hdwm', line, "1");
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_to_date', line, toDate);
                    qtCopyRec.setLineItemValue('item', 'price', line, -1);
                    qtCopyRec.setLineItemValue('item', 'pricelevels', line, -1);
                    qtCopyRec.setLineItemValue('item', 'rate', line, rate);
                    qtCopyRec.setLineItemValue('item', 'grossamount', line, 0);
                    nlapiLogExecution('DEBUG', 'rate1111==3333====', rate);

                    qtCopyRec.setLineItemValue('item', 'custcol_is_individual_item', line, individualItem);
                    qtCopyRec.setLineItemValue('item', 'taxcode', line, tax_code);
                    qtCopyRec.setLineItemValue('item', 'custcol_non_posting_assets', line, nonPosting);

                    // noofOperators = "";
                    // noofHelpers = "";
                    // noofSupervisor = "";
                    line++;


                } else if ((itemType == 2 && included == true) || (itemType == 2 && included == "T")) {
                    // nlapiLogExecution('DEBUG', ' testing 2222=== ');

                    // log.debug('inside estimaterecord item type manpower and included');

                    qtCopyRec.setLineItemValue('item', 'item', line, item);
                    qtCopyRec.setLineItemValue('item', 'description', line, description);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_item_type', line, itemType);
                    if (quantity)
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_rental_quantity', line, quantity.toString());
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_rental_unit', line, rentalUnit);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_billing_rule', line, billingRule);
                    qtCopyRec.setLineItemValue('item', 'custcol_pref_daily_rate', line, pref_daily_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_pref_monthly_rate', line, pref_monthly_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_pref_weekly_rate', line, pref_weekly_rate);


                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_daily_hours', line, pref_daily_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_monthly_hours', line, pref_monthly_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_weekly_hours', line, pref_weekly_hours);
                    // qtCopyRec.setLineItemValue('item', 'amount', line, 0);
                    var subTotal = 0;
                    if (quantity && rate) {
                        subTotal = +quantity * +rate * 1;
                        qtCopyRec.setLineItemValue('item', 'amount', line, subTotal);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_est_subtotal', line, subTotal);
                    }
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_est_parent_item', line, parentItem);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_est_parent_item_line_num', line, parentItemLineNum);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_agreed_hours', line, agreedHours);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_per_hour_rate', line, perHourRate);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_extra_hours_load', line, extraHoursLoad);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_extra_hours_rate', line, extraHourRate);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_agreed_hours_per_day', line, agreedHoursPerDay);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_rod_type', line, rodType);

                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_rate', line, pref_hourly_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_hours', line, pref_hourly_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_days', line, pref_hourly_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_weekly_days', line, pref_weekly_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_daily_days', line, pref_daily_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_monthly_days', line, pref_monthly_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_from_date', line, tranDate);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_no_of_hdwm', line, "1");
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_to_date', line, toDate);
                    qtCopyRec.setLineItemValue('item', 'price', line, -1);
                    qtCopyRec.setLineItemValue('item', 'pricelevels', line, -1);
                    qtCopyRec.setLineItemValue('item', 'rate', line, rate);
                    qtCopyRec.setLineItemValue('item', 'grossamount', line, 0);
                    nlapiLogExecution('DEBUG', 'rate1111======', rate);

                    qtCopyRec.setLineItemValue('item', 'custcol_is_individual_item', line, individualItem);
                    qtCopyRec.setLineItemValue('item', 'taxcode', line, tax_code);
                    qtCopyRec.setLineItemValue('item', 'custcol_non_posting_assets', line, nonPosting);

                    nlapiLogExecution('DEBUG', 'testing---1');

                    line++;

                } else if (actaulItemType != 'Description') {
                    nlapiLogExecution('DEBUG', ' testing 3333=== ');

                    // log.debug('parentItem', parentItem);
                    // log.debug('mainParentItem', mainParentItem);
                    // log.debug('parentItemLineNum', parentItemLineNum);
                    // log.debug('mainParentItemLine', mainParentItemLine);

                    // nlapiLogExecution('DEBUG', 'parentItem---1', parentItem);
                    // nlapiLogExecution('DEBUG', 'mainParentItem---1', mainParentItem);
                    // nlapiLogExecution('DEBUG', 'parentItemLineNum---1', parentItemLineNum);
                    // nlapiLogExecution('DEBUG', 'mainParentItemLine---1', mainParentItemLine);
                    // nlapiLogExecution('DEBUG', 'outside i', i);

                    // if (parentItem != null && mainParentItem != null && parentItemLineNum != null && mainParentItemLine != null){
                    if ((parentItem == mainParentItem) && (parentItemLineNum == mainParentItemLine)) {
                        // nlapiLogExecution('DEBUG', 'inside condition manpowerType  === updateLine', manpowerType + ' ==== ' + updateLine);
                        // nlapiLogExecution('DEBUG', 'indide i', i);

                        if (manpowerType == 1) {
                            nlapiLogExecution('DEBUG', ' testing 3333111=== ');

                            // parentTotalRate = +parentTotalRate + +lineAmount;
                            parentTotalRate = Number(parentTotalRate) + Number(rate);
                            parentTotalDailyRate = Number(parentTotalDailyRate) + Number(pref_daily_rate);
                            parentTotalHourlyRate = Number(parentTotalHourlyRate) + Number(pref_hourly_rate);
                            parentTotalWeeklyRate = Number(parentTotalWeeklyRate) + Number(pref_weekly_rate);
                            parentTotalMonthlyRate = Number(parentTotalMonthlyRate) + Number(pref_monthly_rate);
                            parentPerHourRate = Number(parentPerHourRate) + Number(perHourRate);
                            parentExtraHourRate = Number(parentExtraHourRate) + Number(extraHourRate);

                            noofOperators = quantity;
                            qtCopyRec.setLineItemValue('item', 'custcol_rent_noof_operators', updateLine, noofOperators.toString());
                        } else if (manpowerType == 2) {
                            // nlapiLogExecution('DEBUG', ' testing 3333222=== ');

                            // parentTotalRate = +parentTotalRate + +lineAmount;
                            parentTotalRate = Number(parentTotalRate) + Number(rate);
                            parentTotalDailyRate = Number(parentTotalDailyRate) + Number(pref_daily_rate);
                            parentTotalHourlyRate = Number(parentTotalHourlyRate) + Number(pref_hourly_rate);
                            parentTotalWeeklyRate = Number(parentTotalWeeklyRate) + Number(pref_weekly_rate);
                            parentTotalMonthlyRate = Number(parentTotalMonthlyRate) + Number(pref_monthly_rate);
                            parentPerHourRate = Number(parentPerHourRate) + Number(perHourRate);
                            parentExtraHourRate = Number(parentExtraHourRate) + Number(extraHourRate);
                            noofHelpers = quantity;

                            qtCopyRec.setLineItemValue('item', 'custcol_rent_noof_helpers', updateLine, noofHelpers.toString());

                        } else if (manpowerType == 3) {

                            // parentTotalRate = +parentTotalRate + +lineAmount;
                            parentTotalRate = Number(parentTotalRate) + Number(rate);
                            parentTotalDailyRate = Number(parentTotalDailyRate) + Number(pref_daily_rate);
                            parentTotalHourlyRate = Number(parentTotalHourlyRate) + Number(pref_hourly_rate);
                            parentTotalWeeklyRate = Number(parentTotalWeeklyRate) + Number(pref_weekly_rate);
                            parentTotalMonthlyRate = Number(parentTotalMonthlyRate) + Number(pref_monthly_rate);
                            parentPerHourRate = Number(parentPerHourRate) + Number(perHourRate);
                            parentExtraHourRate = Number(parentExtraHourRate) + Number(extraHourRate);
                            noofSupervisor = quantity;
                            qtCopyRec.setLineItemValue('item', 'custcol_rent_noof_supervisors', updateLine, noofSupervisor.toString());
                        } else if (manpowerType == 6) {

                            // parentTotalRate = +parentTotalRate + +lineAmount;
                            parentTotalRate = Number(parentTotalRate) + Number(rate);
                            parentTotalDailyRate = Number(parentTotalDailyRate) + Number(pref_daily_rate);
                            parentTotalHourlyRate = Number(parentTotalHourlyRate) + Number(pref_hourly_rate);
                            parentTotalWeeklyRate = Number(parentTotalWeeklyRate) + Number(pref_weekly_rate);
                            parentTotalMonthlyRate = Number(parentTotalMonthlyRate) + Number(pref_monthly_rate);
                            parentPerHourRate = Number(parentPerHourRate) + Number(perHourRate);
                            parentExtraHourRate = Number(parentExtraHourRate) + Number(extraHourRate);
                            noofRiggers = quantity;
                            qtCopyRec.setLineItemValue('item', 'custcol_rent_noof_riggers', updateLine, noofRiggers.toString());
                        } else if (manpowerType == 4) { // Driver

                            parentTotalRate = Number(parentTotalRate) + Number(rate);
                            parentTotalDailyRate = Number(parentTotalDailyRate) + Number(pref_daily_rate);
                            parentTotalHourlyRate = Number(parentTotalHourlyRate) + Number(pref_hourly_rate);
                            parentTotalWeeklyRate = Number(parentTotalWeeklyRate) + Number(pref_weekly_rate);
                            parentTotalMonthlyRate = Number(parentTotalMonthlyRate) + Number(pref_monthly_rate);
                            parentPerHourRate = Number(parentPerHourRate) + Number(perHourRate);
                            parentExtraHourRate = Number(parentExtraHourRate) + Number(extraHourRate);
                            noofDriver = quantity;
                            qtCopyRec.setLineItemValue('item', 'custcol_rent_no_of_driver', updateLine, noofDriver.toString());

                        } else if ((itemType == 1 && included == false && isTruck == true) || (itemType == 1 && included == "F" && isTruck == "T")) {
                            parentTotalRate = Number(parentTotalRate) + Number(rate);
                            parentTotalDailyRate = Number(parentTotalDailyRate) + Number(pref_daily_rate);
                            parentTotalHourlyRate = Number(parentTotalHourlyRate) + Number(pref_hourly_rate);
                            parentTotalWeeklyRate = Number(parentTotalWeeklyRate) + Number(pref_weekly_rate);
                            parentTotalMonthlyRate = Number(parentTotalMonthlyRate) + Number(pref_monthly_rate);
                            parentPerHourRate = Number(parentPerHourRate) + Number(perHourRate);
                            parentExtraHourRate = Number(parentExtraHourRate) + Number(extraHourRate);
                        }
                        // log.debug('parentTotalRate', parentTotalRate);
                        nlapiLogExecution('DEBUG', ' testing 3333555=== ', updateLine);
                        // nlapiLogExecution('DEBUG', ' parentTotalRate 333355511=== ', (parentTotalRate));

                        qtCopyRec.setLineItemValue('item', 'rate', updateLine, (parentTotalRate));
                        // nlapiLogExecution('DEBUG', ' testing 333355511=== ');

                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_rate', updateLine, parentTotalHourlyRate);
                        qtCopyRec.setLineItemValue('item', 'custcol_pref_daily_rate', updateLine, parentTotalDailyRate);
                        // nlapiLogExecution('DEBUG', ' testing 333355522=== ', parentTotalDailyRate);

                        qtCopyRec.setLineItemValue('item', 'custcol_pref_monthly_rate', updateLine, parentTotalMonthlyRate);
                        // nlapiLogExecution('DEBUG', ' testing 333355533=== ', parentTotalMonthlyRate);

                        qtCopyRec.setLineItemValue('item', 'custcol_pref_weekly_rate', updateLine, parentTotalWeeklyRate);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_extra_hours_rate', updateLine, parentExtraHourRate);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_per_hour_rate', updateLine, parentPerHourRate);
                        // nlapiLogExecution('DEBUG', ' testing 333355544=== ', parentTotalWeeklyRate);


                    } else {
                        nlapiLogExecution('DEBUG', ' testing 4444=== ');

                        qtCopyRec.setLineItemValue('item', 'item', line, item);
                        qtCopyRec.setLineItemValue('item', 'description', line, description);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_item_type', line, itemType);
                        if (quantity)
                            qtCopyRec.setLineItemValue('item', 'custcol_rent_rental_quantity', line, quantity.toString());
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_rental_unit', line, rentalUnit);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_billing_rule', line, billingRule);
                        qtCopyRec.setLineItemValue('item', 'custcol_pref_daily_rate', line, pref_daily_rate);
                        qtCopyRec.setLineItemValue('item', 'custcol_pref_monthly_rate', line, pref_monthly_rate);
                        qtCopyRec.setLineItemValue('item', 'custcol_pref_weekly_rate', line, pref_weekly_rate);

                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_daily_hours', line, pref_daily_hours);
                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_monthly_hours', line, pref_monthly_hours);
                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_weekly_hours', line, pref_weekly_hours);
                        // qtCopyRec.setLineItemValue('item', 'amount', line, 0);
                        var subTotal = 0;
                        if (quantity && rate) {
                            subTotal = +quantity * +rate * 1;
                            qtCopyRec.setLineItemValue('item', 'amount', line, subTotal);
                            qtCopyRec.setLineItemValue('item', 'custcol_rent_est_subtotal', line, subTotal);
                        }
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_agreed_hours', line, agreedHours);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_per_hour_rate', line, perHourRate);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_extra_hours_load', line, extraHoursLoad);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_extra_hours_rate', line, extraHourRate);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_agreed_hours_per_day', line, agreedHoursPerDay);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_rod_type', line, rodType);

                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_rate', line, pref_hourly_rate);
                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_hours', line, pref_hourly_hours);
                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_days', line, pref_hourly_days);
                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_weekly_days', line, pref_weekly_days);
                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_daily_days', line, pref_daily_days);
                        qtCopyRec.setLineItemValue('item', 'custcol_preffered_monthly_days', line, pref_monthly_days);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_from_date', line, tranDate);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_no_of_hdwm', line, "1");
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_to_date', line, toDate);
                        qtCopyRec.setLineItemValue('item', 'price', line, -1);
                        qtCopyRec.setLineItemValue('item', 'pricelevels', line, -1);
                        qtCopyRec.setLineItemValue('item', 'rate', line, rate);
                        qtCopyRec.setLineItemValue('item', 'grossamount', line, 0);

                        nlapiLogExecution('DEBUG', 'rate==22222====', rate);
                        qtCopyRec.setLineItemValue('item', 'custcol_is_individual_item', line, individualItem);

                        qtCopyRec.setLineItemValue('item', 'custcol_estimate_tax_code', line, tax_code);

                        qtCopyRec.setLineItemValue('item', 'custcol_non_posting_assets', line, nonPosting);

                        // noofOperators = "";
                        // noofHelpers = "";
                        // noofSupervisor = "";
                        line++;
                    }
                    // }
                } else if (actaulItemType != 'Description') { // if item type is anything and include is not checked 

                    nlapiLogExecution('DEBUG', 'if item type is anything and include is not checked ');
                    qtCopyRec.setLineItemValue('item', 'item', line, item);
                    qtCopyRec.setLineItemValue('item', 'description', line, description);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_item_type', line, itemType);
                    if (quantity)
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_rental_quantity', line, quantity.toString());
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_rental_unit', line, rentalUnit);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_billing_rule', line, billingRule);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_from_date', line, tranDate);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_no_of_hdwm', line, "1");
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_to_date', line, toDate);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_rate', line, pref_hourly_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_pref_daily_rate', line, pref_daily_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_pref_monthly_rate', line, pref_monthly_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_pref_weekly_rate', line, pref_weekly_rate);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_hours', line, pref_hourly_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_daily_hours', line, pref_daily_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_monthly_hours', line, pref_monthly_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_weekly_hours', line, pref_weekly_hours);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_hourly_days', line, pref_hourly_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_daily_days', line, pref_daily_days);
                    qtCopyRec.setLineItemValue('item', 'custcol_preffered_monthly_days', line, pref_monthly_days);
                    // qtCopyRec.setLineItemValue('item', 'amount', line, 0);
                    var subTotal = 0;
                    if (quantity && rate) {
                        subTotal = +quantity * +rate * 1;
                        qtCopyRec.setLineItemValue('item', 'amount', line, subTotal);
                        qtCopyRec.setLineItemValue('item', 'custcol_rent_est_subtotal', line, subTotal);
                    }
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_agreed_hours', line, agreedHours);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_per_hour_rate', line, perHourRate);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_extra_hours_load', line, extraHoursLoad);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_extra_hours_rate', line, extraHourRate);
                    qtCopyRec.setLineItemValue('item', 'custcol_rent_rod_type', line, rodType);
                    qtCopyRec.setLineItemValue('item', 'custcol_is_individual_item', line, individualItem);
                    qtCopyRec.setLineItemValue('item', 'price', line, -1);
                    qtCopyRec.setLineItemValue('item', 'pricelevels', line, -1);
                    qtCopyRec.setLineItemValue('item', 'rate', line, rate);

                    qtCopyRec.setLineItemValue('item', 'taxcode', line, tax_code);
                    qtCopyRec.setLineItemValue('item', 'grossamount', line, 0);

                    qtCopyRec.setLineItemValue('item', 'custcol_non_posting_assets', line, nonPosting);

                    // noofOperators = "";
                    // noofHelpers = "";
                    // noofSupervisor = "";
                    line++;

                }

                nlapiLogExecution('DEBUG', 'rate==22222====', "Coming after if NJJJJJ");




                nlapiLogExecution('DEBUG', 'itemType==22222====', itemType);

                if (itemType == 3) { // ancillary
                    nlapiLogExecution('DEBUG', 'itemType==33333====', itemType);

                    qtCopyRec.setLineItemValue('recmachcustrecord_rent_ancillary_det_quote_ref', 'custrecord_rent_ancillary_det_item', ancLine, item);
                    if (quantity)
                        qtCopyRec.setLineItemValue('recmachcustrecord_rent_ancillary_det_quote_ref', 'custrecord_rent_ancillary_det_quantity', ancLine, quantity.toString());
                    qtCopyRec.setLineItemValue('recmachcustrecord_rent_ancillary_det_quote_ref', 'custrecord_rent_ancillary_det_rate', ancLine, rate);
                    qtCopyRec.setLineItemValue('recmachcustrecord_rent_ancillary_det_quote_ref', 'custrecord_rent_ancillary_det_parent_ite', ancLine, parentItem);
                    qtCopyRec.setLineItemValue('recmachcustrecord_rent_ancillary_det_quote_ref', 'custrecord_rent_ancillary_det_parent_lin', ancLine, parentItemLineNum);
                    var amount = +rate * +quantity;
                    qtCopyRec.setLineItemValue('recmachcustrecord_rent_ancillary_det_quote_ref', 'custrecord_rent_anc_details_amnt', ancLine, amount);
                    ancLine++;
                    nlapiLogExecution('DEBUG', 'itemType==444444====', itemType);

                }
            }
            nlapiLogExecution('DEBUG', 'rate==22222====', "Coming after if NJJJJJ 22222222");

            // qtCopyRec.commitLineItem('item');
        }
        qtCopyRec.setFieldValue('custbody_quote_revision', 'T');
        nlapiLogExecution('DEBUG', 'rate==22222====', "Coming after if NJJJJJ 33333333");

        var qtCopyRecID = nlapiSubmitRecord(qtCopyRec, false, true);
        nlapiLogExecution('DEBUG', 'rate==22222====', "Coming after if NJJJJJ 444444");

        nlapiLogExecution('DEBUG', 'qtCopyRecID', qtCopyRecID);
        // nlapiLogExecution('DEBUG', 'rent_estimate_ref', rent_estimate_ref);

        nlapiSubmitField('estimate', qtCopyRecID, 'tranid', revID + ".REV" + (+versionCnt + +1), false);
        nlapiLogExecution('DEBUG', 'rate==22222====', "Coming after if NJJJJJ 55555555");

        nlapiSubmitField('estimate', qtId, 'custbody_inactive_based_on_the', "T", false);
        nlapiLogExecution('DEBUG', 'rate==22222====', "Coming after if NJJJJJ 66666666");

        // nlapiSubmitField('estimate', qtId, 'custbody_quote_revision', "T", false);
        nlapiSubmitField('estimate', qtId, 'entitystatus', 14, false);

        nlapiSubmitField('customsale_rent_estimate', rent_estimate_ref, 'custbody_rent_est_quote_ref', qtCopyRecID);
        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_trans_rec_id', qtCopyRecID);
        nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_message', "Complete");
    }
}

function tranIDGeneration(tranID) {
    var revtranID = tranID;
    var res = revtranID.split(".");
    var revStr = res[res.length - 1];
    var strLeng = revStr.length;
    // nlapiLogExecution('DEBUG', 'res', res);
    // nlapiLogExecution('DEBUG', 'revStr', revStr);
    // nlapiLogExecution('DEBUG', 'strLeng', strLeng);
    var resn = revStr.substring(0, 3);
    // nlapiLogExecution('DEBUG', 'resn', resn);
    if (resn == 'REV') {
        var lastIndex = revtranID.lastIndexOf(".");
        // nlapiLogExecution('DEBUG', 'lastIndex', lastIndex);
        revtranID = revtranID.substring(0, lastIndex);
        // nlapiLogExecution('DEBUG', 'revtranID', revtranID);
    }
    // nlapiLogExecution('DEBUG', 'revtranID', revtranID);
    return revtranID;
}