function responseHandlingAction(request, response) {
    if (request.getMethod() == 'GET') {
        var timeStamp = request.getParameter('timestamp');
        var redirectType = request.getParameter('redirectType');
        var filter = ["custrecord_time_stamp", "equalto", timeStamp];
        // var itemRes = nlapiSearchRecord("customrecord_response_handling", "customsearch_response_handle_search_2", filter);
        var itemRes = nlapiSearchRecord("customrecord_response_handling", "customsearch_response_handle_search", filter);
        nlapiLogExecution("DEBUG", "itemRes", itemRes.length);
        var html = '';
        html += '<!DOCTYPE html> \
      <html> \
      <head> \
      <meta http-equiv="refresh" content="5"> \
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> \
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> \
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">\</script> \
      </head><body width="50%"> \
      <h3 style="text-alilgn:center;">Response</h3> \
      <div class="table-responsive"> \
      <table class="table table-bordered" id="dataTable" align="center" width="100%" cellspacing="0"> \
    <tr> \
      <th>Status</th> \
      <th>Action</th> \
      </tr>';
        html += '<tr>';
        html += '<td>' + itemRes[0].getValue('custrecord_message') + '</td>';
        if (itemRes[0].getValue('custrecord_trans_rec_id')) {
          nlapiLogExecution("DEBUG", "inside");  

            // var cashflow_search_url = nlapiResolveURL("RECORD", "customrecord_cahs_flow_master", itemRes[0].getValue('custrecord_trans_rec_id'), "VIEW");
            var estimate_search_url = nlapiResolveURL("RECORD", "estimate", itemRes[0].getValue('custrecord_trans_rec_id'), "VIEW");
          nlapiLogExecution("DEBUG", "estimate_search_url", estimate_search_url);  
          // if (redirectType == 'cf_updateAEDamount') {
            //     html += '<td><a href="' + cashflow_search_url + '">Click here to redirect to Cash Flow Page</a></td>';
            // } else if (redirectType == 'cashFlowRes') {
            //     html += '<td><a href="' + cashflow_search_url + '">Click here to redirect to Cash Flow Page</a></td>';
            // } else if (redirectType == 'cf_updateBankBalance') {
            //     html += '<td><a href="' + cashflow_search_url + '">Click here to redirect to Cash Flow Page</a></td>';
            // } else if (redirectType == 'cf_updateResult') {
            //     html += '<td><a href="' + cashflow_search_url + '">Click here to redirect to Cash Flow Page</a></td>';
            // } else 
            if (redirectType == 'reviseQuote') {
                html += '<td><a href="' + estimate_search_url + '">Click here to redirect to Revised Quotation</a></td>';
                // html += '<td><a href="/app/accounting/transactions/estimate.nl?id="' + itemRes[0].getValue('custrecord_trans_rec_id') + '"&end=true">Click here to redirect to Revised Quotation</a></td>';
            } else if (redirectType == 'quoteFromEst') {
                html += '<td><a href="' + estimate_search_url + '">Click here to redirect to Revised Quotation</a></td>';
                // html += '<td><a href="/app/accounting/transactions/estimate.nl?id="' + itemRes[0].getValue('custrecord_trans_rec_id') + '"&end=true">Click here to redirect to Revised Quotation</a></td>';
            }
          
        } else {
            html += '<td><img style="width:210px;height:40px;" src="https://system.eu2.netsuite.com/core/media/media.nl?id=2468&amp;c=4976022&amp;h=14ef09b5f1128dfd6c35" /></td>';
        }
        html += '</tr>';
        html += '<tr><td colspan="4"><button align="center" onclick="javascript:window.location.reload();">Refresh</button></td></tr>';
        html += '</table>';

        html += '</div>';
        html += '</body></html>';
        response.write(html);

    }
}