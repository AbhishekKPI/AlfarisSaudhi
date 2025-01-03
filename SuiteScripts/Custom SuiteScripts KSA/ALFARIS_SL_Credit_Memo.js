function printInvoiceArabic(request,response){
    var invID = request.getParameter("recid");
    var file = nlapiPrintRecord('TRANSACTION', invID, 'PDF', {formnumber: '137'});
  
    response.setContentType('PDF', 'creditmemo_'+invID+'.pdf', 'INLINE');
  
    response.write(file.getValue());
}