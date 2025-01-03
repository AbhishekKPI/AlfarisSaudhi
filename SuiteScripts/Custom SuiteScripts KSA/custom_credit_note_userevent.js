function beforeLoadAction(type,form,request){
if(type == "view"){
var recid = nlapiGetRecordId();
var subsidiary =  nlapiGetFieldValue("subsidiary");
var location =  nlapiGetFieldValue("location");
if (!((subsidiary === "8" || subsidiary === "16") && (location === "8" || location === "21"))) {
//form.addButton('custpage_testbutton','Print On Letterhead','printcreditlh('+recid+');');
  form.addButton('custpage_testbutton','Print On Letterhead','printcreditlh('+recid+');');
  form.addButton('custpage_creditarabic','Print Arabic','printcreditarabic('+recid+');');
  var userRec=nlapiGetContext();   
  nlapiLogExecution("AUDIT", "test", userRec.user);

  form.addButton('custpage_newcredit','New Print Arabic','window.open(\'/app/site/hosting/scriptlet.nl?script=548&deploy=1&recid='+recid+'&end=true\')');
  form.addButton('custpage_newcredit','New Print On Letterhead','window.open(\'/app/site/hosting/scriptlet.nl?script=551&deploy=1&recid='+recid+'&end=true\')');
 }


// // Ed-print
//   form.addButton('custpage_newcredit','ED-Print','window.open(\'/app/site/hosting/scriptlet.nl?script=2399&deploy=1&recid='+recid+'&end=true\')');
// //  }
// //Ed-Print on Leterhead
//     form.addButton('custpage_newcredit','ED-Print On Letterhead', 'window.open(\'/app/site/hosting/scriptlet.nl?script=2400&deploy=1&recid='+recid+'&end=true\')');
// //  }


form.setScript('customscript_common_script');
}
}