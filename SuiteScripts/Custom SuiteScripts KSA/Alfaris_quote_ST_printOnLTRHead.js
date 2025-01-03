


function printproformaInvoice(request,response){

    var quoteID = request.getParameter("recordID");

    var file = nlapiPrintRecord('TRANSACTION', quoteID, 'PDF', {formnumber: '166'});

    response.setContentType('PDF', 'estimate_'+quoteID+'.pdf', 'INLINE');

    response.write(file.getValue());

 

}  
