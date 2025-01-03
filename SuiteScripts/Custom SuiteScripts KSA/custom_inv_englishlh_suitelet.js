function printInvoiceEngLH(request,response){
var invID = request.getParameter("Invoice");
var file = nlapiPrintRecord('TRANSACTION', invID, 'PDF', {formnumber: '128'});
response.setContentType('PDF', 'CustInvc_'+invID+'.pdf', 'INLINE');
response.write(file.getValue());
}