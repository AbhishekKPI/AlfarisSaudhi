function beforeLoadAction(type, form, request) {
  var currentContext = nlapiGetContext();
  nlapiLogExecution("DEBUG", "currentContext", currentContext);

  if ((currentContext.getExecutionContext() == 'userinterface') && (type == 'edit' || type == 'view')) {
    if ((currentContext.getRoleId() == "administrator") || (currentContext.getRoleId() == "customrole_invoice_approver")) {
      nlapiSetFieldDisplay("approvalstatus", true);
    } else {
      nlapiSetFieldDisplay("approvalstatus", false);
    }
    var invoiceID = nlapiGetFieldValue("id");

    var customform = nlapiGetFieldValue("customform");
    if (type == 'view') {

      var invRec = nlapiLoadRecord("invoice", invoiceID);

      var customform = invRec.getFieldValue("customform");

      //form.addButton('custpage_printon_lh','Print on Letterhead','invoicePrintOnlhAction('+invoiceID+')');
      var subsidiary = nlapiGetFieldValue("subsidiary");
      var location = nlapiGetFieldValue("location");
      if (subsidiary != "2") {
        // form.addButton('custpage_printon_lh','Print Arabic Invoice','invoicelh('+invoiceID+')');
      }
      // form.addButton('custpage_printonenglish','Print Inv in English','invoiceeng('+invoiceID+')');
      // form.addButton('custpage_printonenglishlh','Print on Letterhead in English','invoiceenglh('+invoiceID+')');
      var userRec = nlapiGetContext();
      nlapiLogExecution("DEBUG", "customform", customform);
      nlapiLogExecution("AUDIT", "test", userRec.user);
      // if (customform != 154) {commented on 12/06.2023 bcz arabic buttons should appear only for 	KSA Service Invoice Main Form id-126
      if (customform == 126) {

        nlapiLogExecution("DEBUG", "getting inside else", customform);
        //New Print Arabic Invoice this button is commented on 12-06-2023 
        if (!((subsidiary === "8" || subsidiary === "16") && (location === "8" || location === "21"))) {
            form.addButton('custpage_printonneww_lh', 'New Print Arabic Invoice', 'window.open(\'/app/site/hosting/scriptlet.nl?script=547&deploy=1&recid=' + invoiceID + '&end=true\')');
            //  form.addButton('custpage_printonnewenglishlh','New Print on Letterhead in English','window.open(\'/app/site/hosting/scriptlet.nl?script=545&deploy=1&recid='+invoiceID+'&end=true\')');

            //New Print on Letterhead Invoice this button is commented on 12-06-2023 
            form.addButton('custpage_printonnew_lh', 'New Print on Letterhead', 'window.open(\'/app/site/hosting/scriptlet.nl?script=546&deploy=1&recid=' + invoiceID + '&end=true\')');
            //     if(userRec.user == '4'){
            // form.addButton('custpage_printonneww_lh','New  Arabic Invoice','window.open(\'/app/site/hosting/scriptlet.nl?script=552&deploy=1&recid='+invoiceID+'&end=true\')');  
            //  }
            // form.addButton('custpage_print_arabic','Print Arabic Invoice','arabicInvoice('+invoiceID+')');
          
        }
      }
    }

    form.setScript('customscript_common_script');
  }
  if (type == 'create' || type == 'edit') {
    var paytrms = nlapiGetFieldValue("custbody_payment_terms");
    if (paytrms) {
      var res = nlapiLoadRecord("term", paytrms);
      var duedate = res.getFieldValue("daysuntilnetdue");
      if (duedate >= 1) {
        var currentDate = nlapiStringToDate(nlapiGetFieldValue('trandate'));
        var NewDueDate = nlapiDateToString(nlapiAddDays(currentDate, duedate));
        nlapiSetFieldValue('duedate', NewDueDate);
      } else {
        nlapiSetFieldValue('duedate', nlapiGetFieldValue('trandate'));
      }

    }
  }
  var so = nlapiGetFieldValue("createdfrom");
  if (so) {
    var output = nlapiLoadRecord("salesorder", so);
    var str = output.getFieldText("createdfrom");
    var res = str.replace("Quote #", "");
    nlapiSetFieldValue("custbody_invoice_qt_number_cf", res);
  }
}