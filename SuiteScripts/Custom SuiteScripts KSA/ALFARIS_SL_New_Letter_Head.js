function printNewInvoiceLH(request,response){
    var invID = request.getParameter("recid");
    var file = nlapiPrintRecord('TRANSACTION', invID, 'PDF', {formnumber: '135'});
    response.setContentType('PDF', 'CustInvc_'+invID+'.pdf', 'INLINE');
    response.write(file.getValue());
    }