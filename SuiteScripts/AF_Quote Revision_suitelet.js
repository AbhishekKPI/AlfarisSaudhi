function clientRevisionActionSuitelet(request, response) {
    var form = nlapiCreateForm('Quote Revision');
    var qtID = request.getParameter("qtID");
    var from = request.getParameter('from');

    // var quoteRecord = nlapiLoadRecord('estimate',qtID);
    // var tranid = quoteRecord.getFieldValue('tranid');
    // var customer = quoteRecord.getFieldText('entity');
    // var date = quoteRecord.getFieldValue('trandate');
    // var subsidiary = quoteRecord.getFieldText('subsidiary');
    if (request.getMethod() == 'GET') {
        // form.addField('custpage_qt_tran_date', 'text', 'DATE').setDisplayType('inline').setDefaultValue(date);
        // form.addField('custpage_qt_tran_id', 'text', 'QUOTATION #').setDisplayType('inline').setDefaultValue(tranid);
        // form.addField('custpage_qt_customer', 'text', 'CUSTOMER').setDisplayType('inline').setDefaultValue(customer);
        // form.addField('custpage_qt_subsidiary', 'text', 'SUBSIDIARY').setDisplayType('inline').setDefaultValue(subsidiary);
        form.addField('custpage_qt_id', 'text', 'QuoteID').setDisplayType('hidden').setDefaultValue(qtID);
        form.addField('custpage_from', 'text', 'from').setDisplayType('hidden').setDefaultValue(from);
        form.addButton('custpage_back_int', 'Back', onclick = "javascript:history.go(-1)");
        form.addSubmitButton('Proceed');
    }
    if (request.getMethod() == 'POST') {
        var qtID = request.getParameter('custpage_qt_id');
        nlapiLogExecution('DEBUG', 'qtID', qtID);

        var from = request.getParameter('custpage_from');
        nlapiLogExecution('DEBUG', 'from', from);
        var timestamp = stamp();
        //Custom Record for status
        var record = nlapiCreateRecord('customrecord_response_handling');
        record.setFieldValue("name", parseInt(timestamp));
        record.setFieldValue("custrecord_time_stamp", parseInt(timestamp));
        record.setFieldValue("custrecord_message", "Processing...");
        var responseID = nlapiSubmitRecord(record, true, true);
        nlapiLogExecution('DEBUG', 'responseID', responseID);

        if (from == 'est') {
            nlapiLogExecution('DEBUG', 'est');
            var redirectType = 'quoteFromEst';
        } else if (from == 'quote') {
            nlapiLogExecution('DEBUG', 'quote');
            var redirectType = 'reviseQuote';
        }

        var params = new Array();
        params['custscript_quote_id_sch_cr'] = qtID;
        params['custscript_timestamp_sch_cr'] = responseID;
        params['custscript_edirect_type'] = redirectType;
        var status = nlapiScheduleScript('customscript_af_quote_revision_sc', null, params);
        nlapiLogExecution('DEBUG', 'status', status);
        var params = {};
        params['timestamp'] = timestamp;
        params['redirectType'] = redirectType;

        nlapiSetRedirectURL('SUITELET', "customscript_suitelet_for_loading_alloc", "customdeploy_suitelet_for_loading_alloc", null, params);
        nlapiLogExecution('DEBUG', 'redirected', 'redirected');
    }
    response.writePage(form);
}

function stamp() {
    var tStamp = Math.floor(Date.now() / 1000);
    return tStamp;
}