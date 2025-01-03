var recType = nlapiGetRecordType();
var recId = nlapiGetRecordId();
if (recType == "job") {
  var soRecType = nlapiLookupField('job', nlapiGetRecordId(), 'custentity_record_type');
  var status = nlapiLookupField('job', nlapiGetRecordId(), 'entitystatus');
  if (soRecType == 4 && status == 4) {
    jQuery("#newrecrecmachcustrecord_projects").hide();
    jQuery("#attach").hide();
    jQuery("#customize").hide();
    jQuery("#newrec1735").hide();
    jQuery("#tr_newrecrecmachcustrecord_projects").hide();
    jQuery("#tr_attach").hide();
    jQuery("#tr_customize").hide();
    jQuery("#addalocation").hide();
    jQuery("#tr_addalocation").hide();
  }
}

function jobRejectReason(recid) {
  alert("Please provide your Reject comments.");
  var comments = prompt("Please provide your comments here:");
  if (comments == null || comments == '') {
    alert("Please provide your comments.");
    var comments = prompt("Please provide your comments here:");
  } else {
    var context = nlapiGetContext();
    var currentUser = context.getUser();
    var rec = nlapiLoadRecord("job", recid);
    rec.setFieldValue("custentity_wr_reject_remarks", comments);
    rec.setFieldValue("entitystatus", 3);
    rec.setFieldValue("custentity_wr_rejected_by", currentUser);
    rec.setFieldValue("custentity_wr_rejected_date", nlapiDateToString(new Date(), 'datetimetz'));
    nlapiSubmitRecord(rec, true);
  }
  window.location.reload();
  return true;
}

function soCloseOrder(recid) {
  alert("Please provide your reason.");
  var comments = prompt("Please provide your reason here:");
  if (comments == null || comments == '') {
    alert("Please provide your reason.");
    var comments = prompt("Please provide your reason here:");
  } else {
    var context = nlapiGetContext();
    var currentUser = context.getUser();
    var soRec = nlapiLoadRecord("salesorder", recid);
    soRec.setFieldValue("custbody_custom_status_comment", comments);
    var soItemCount = soRec.getLineItemCount('item');
    for (var i = 1; i <= soItemCount; ++i) {
      soRec.setLineItemValue('item', 'isclosed', i, 'T');
    }
    nlapiSubmitRecord(soRec, true, true);
  }
  window.location.reload();
  return true;
}