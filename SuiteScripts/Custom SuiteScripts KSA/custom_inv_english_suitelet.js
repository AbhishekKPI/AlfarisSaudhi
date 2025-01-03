function printInvoiceEng(request,response){
var invID = request.getParameter("invoiceID");
var file = nlapiPrintRecord('TRANSACTION', invID, 'PDF', {formnumber: '127'});

response.setContentType('PDF', 'CustInvc_'+invID+'.pdf', 'INLINE');

response.write(file.getValue());
}