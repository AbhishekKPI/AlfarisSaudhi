function printNewInvoiceEngLH(request,response){
    var invID = request.getParameter("recid");
    var file = nlapiPrintRecord('TRANSACTION', invID, 'PDF', {formnumber: '134'});
    response.setContentType('PDF', 'CustInvc_'+invID+'.pdf', 'INLINE');
    response.write(file.getValue());
    }