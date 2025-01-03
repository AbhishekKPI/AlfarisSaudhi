function responseHandlingAction(request,response){
  if ( request.getMethod() == 'GET' )
  {
    var timeStamp =  request.getParameter('timestamp');
    var redirectType = request.getParameter('redirectType');
    var filter = ["custrecord_time_stamp", "equalto", timeStamp];
    var itemRes = nlapiSearchRecord("customrecord_response_handling", "customsearch_response_handle_search", filter);
   // nlapiLogExecution("DEBUG","itemRes",itemRes.length);
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
      html += '<td>'+itemRes[0].getValue('custrecord_message')+'</td>';
      nlapiLogExecution("DEBUG","ID=============",itemRes[0].getValue('custrecord_trans_rec_id'));
      if(itemRes[0].getValue('custrecord_trans_rec_id')){
          if (redirectType == 'createProjects') {
              html += '<td><a href="/app/accounting/transactions/salesord.nl?id=' + itemRes[0].getValue('custrecord_trans_rec_id') + '">Click here to view Sales Order</a></td>';
            }
            else if (redirectType == 'updateJobCost') {
              html += '<td><a href="/app/accounting/transactions/salesord.nl?id=' + itemRes[0].getValue('custrecord_trans_rec_id') + '">Click here to view Sales Order</a></td>';
            }
            else if (redirectType == 'purchaseInvoice') {
              html += '<td><a href="/app/accounting/transactions/custinvc.nl?id=' + itemRes[0].getValue('custrecord_trans_rec_id') + '">Click here to view Sales Invoice</a></td>';
            }
            else if (redirectType == 'closeProjects') {
              html += '<td><a href="/app/accounting/project/project.nl?id=' + itemRes[0].getValue('custrecord_trans_rec_id') + '">Click here to view Project</a></td>';
            }

      }else{
        html += '<td><img style="width:210px;height:40px;" src="https://system.eu2.netsuite.com/core/media/media.nl?id=2468&amp;c=4976022&amp;h=14ef09b5f1128dfd6c35" /></td>';
      }


      html += '</tr>';
      html += '<tr><td colspan="2"><button align="center" onclick="javascript:window.location.reload();">Refresh</button></td></tr>'; 
      html +='</table>';
      
      html += '</div>';
      html += '</body></html>';
      response.write(html);

  }
}