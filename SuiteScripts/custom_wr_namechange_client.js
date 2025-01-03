var recType = nlapiGetRecordType();
//alert("recType----"+recType);

var recId = nlapiGetRecordId();
if (recType == "salesorder") {
  var soForm = nlapiLookupField('salesorder', nlapiGetRecordId(), 'customform');
  var soRecType = nlapiLookupField('salesorder', nlapiGetRecordId(), 'custbody_record_type');
  if (soRecType == 1 ) {
    jQuery(".uir-page-title-firstline").replaceWith('<h1 class="uir-record-type">Work Request</h1>');
  } else if (soRecType == 2) {
    jQuery(".uir-page-title-firstline").replaceWith('<h1 class="uir-record-type">Demand Bulletin</h1>');
  }
}


if (recType == "invoice") {
  if (recId) {
    var invRec = nlapiLoadRecord("invoice", recId);
    var approvalStatus = invRec.getFieldValue('approvalstatus');
    var recordType = invRec.getFieldValue('custbody_record_type');
    if (approvalStatus == 2 && (recordType == 1 )) {
      jQuery('#tbl_custpageworkflow308').remove();
    }
  }
}

if (recType == "job") {
  var jobRecordType = nlapiLookupField('job', nlapiGetRecordId(), 'custentity_record_type');
  //alert("jobRecordType----"+jobRecordType);
  if (jobRecordType == 3 || jobRecordType == 4) {
    jQuery('#recmachcustrecord_ra_project_ref_main_form').remove();
  }
}



function createPurchaseInvoice(id) {
  var confirmmsg = confirm("Do you really want to continue ?");
  if (confirmmsg == true) {
    window.open('/app/site/hosting/scriptlet.nl?script=1176&deploy=1&recId=' + id, '_self');
  }
}
function createProjects(id) {
  var confirmmsg = confirm("Do you really want to continue ?");
  if (confirmmsg == true) {
    var userID = nlapiGetContext().getUser();
    var recid = nlapiGetRecordId();
    var col = new Array();
    var ftr = new Array();
    col[0] = new nlobjSearchColumn("internalid", "", "COUNT");
    ftr[0] = new nlobjSearchFilter("custrecord_con_user", null, 'anyof', userID);
    ftr[1] = new nlobjSearchFilter("custrecord_con_so", null, 'anyof', recid);
    var woRes = nlapiSearchRecord('customrecord_wr_concurrency', null, ftr, col);
    if (woRes) {
      soCount = woRes[0].getValue('internalid', "", "COUNT");
      console.log("soCount************" + soCount);
      if (Number(soCount) <= 0) {
        window.open('/app/site/hosting/scriptlet.nl?script=1276&deploy=1&recId=' + id, '_self');
      }
      else {
        alert("You cannot create already one user processing");
        jQuery("#custpage_create_project").attr("disabled", "disabled");
      }
    }
  }
}

function approveJobCreation(soId) {
  var confirmmsg = confirm("Do you really want to continue ?");
  if (confirmmsg == true) {
    var soRec = nlapiLoadRecord("salesorder", soId);
    var lnCnt = soRec.getLineItemCount("item");
    for (var kk = 1; kk <= lnCnt; kk++) {
      var createproject = soRec.getLineItemValue('item', 'custcol_create_project', kk);
      var projectref = soRec.getLineItemValue('item', 'custcol_project_ref', kk);
      if (projectref == '' || projectref == null) {
        if (createproject == "T") {
          soRec.setLineItemValue('item', 'custcol_allow_job_creation', kk, 'T');
        }
      }
    }
    nlapiSubmitRecord(soRec, true, true);
  }
  window.location.reload();
}

function wrProjStatusAction(eqpId, soId) {
  window.open('/app/site/hosting/scriptlet.nl?script=625&deploy=1&soId=' + soId + '&eqpId=' + eqpId, "Work Request Project Status", "width=1000,height=600");
}
function wrJobDemandBulletin(eqpId, soId) {
  window.open('/app/site/hosting/scriptlet.nl?script=627&deploy=1&soId=' + soId + '&eqpId=' + eqpId, "Work Request Project Status", "width=1000,height=600");
}
function updateProjectCost(soId) {
  var confrm = confirm("Do you really want to continue?");
  if (confrm == true) {
    window.open('/app/site/hosting/scriptlet.nl?script=1376&deploy=1&recId=' + soId);
  }
}
function closeProject(jobId) {
  var confrm = confirm("Do you really want to continue?");
 // alert("jobId---------------"+jobId);
  if (confrm == true) {
    window.open('/app/site/hosting/scriptlet.nl?script=1074&deploy=1&recId=' + jobId);

    // var totalProjectCost = 0;
    // var totalLabCost = 0;
    // var totalLaborCost = 0;
    // var totalmaterCost = 0;
    // var cols = new Array();
    // var filtr = new Array(); totalmaterCost
    // cols[0] = new nlobjSearchColumn("hours");
    // cols[1] = new nlobjSearchColumn("employee");
    // cols[2] = new nlobjSearchColumn("laborcost", "employee");
    // filtr[0] = new nlobjSearchFilter("type", null, 'anyof', 'A');
    // filtr[1] = new nlobjSearchFilter("customer", null, 'anyof', jobId);
    // var timeSearch = nlapiSearchRecord('timebill', null, filtr, cols);
    // if (timeSearch) {
    //   var hors = 0;
    //   var horsMnt = 0;
    //   for (var kk = 0; kk < timeSearch.length; kk++) {
    //     var row1 = kk + 1;
    //     var hours = timeSearch[kk].getValue('hours');
    //     var employee = timeSearch[kk].getText('employee');
    //     var laborcost = timeSearch[kk].getValue('laborcost', 'employee');
    //     if (hours) {
    //       var hoursplit = hours.split(':');
    //       hors = hoursplit[0];
    //       horsMnt = hoursplit[1];
    //       if (horsMnt == '00') {
    //         horsMnt = 1;
    //       }
    //       else if (horsMnt == '15') {
    //         horsMnt = 0.25;
    //       }
    //       else if (horsMnt == '30') {
    //         horsMnt = 0.5;
    //       }
    //       else if (horsMnt == '45') {
    //         horsMnt = 0.75;
    //       }
    //     }
    //     totalLabCost = Number(hors) * Number(laborcost);
    //     totalLabCost = Number(totalLabCost) * Number(horsMnt);

    //     totalLaborCost = Number(totalLaborCost) + Number(totalLabCost);
    //   }
    // }

    // var filter = ["jobmain.internalid", "anyof", jobId];
    // var woResDm = nlapiSearchRecord("transaction", "customsearch_work_request_related_so_2_2", filter);
    // var totalmat = 0;
    // if (woResDm) {
    //   for (var j = 0; j < woResDm.length; j++) {
    //     var row = j + 1;
    //     var sono = woResDm[j].getValue('tranid');
    //     var sodate = woResDm[j].getValue('trandate');
    //     var item = woResDm[j].getValue('item');
    //     var itemCode = woResDm[j].getText('item');
    //     var descrp = woResDm[j].getValue('displayname', 'item');
    //     var quantity = woResDm[j].getValue('quantity');
    //     var fulfil = woResDm[j].getValue('quantityshiprecv');
    //     var remain = woResDm[j].getValue('formulanumeric');
    //     var unit = woResDm[j].getText('stockunit', 'item');
    //     var location = woResDm[j].getValue('location');


    //     var colLoc = new Array();
    //     var filtLoc = new Array();
    //     colLoc[0] = new nlobjSearchColumn("location");
    //     filtLoc[0] = new nlobjSearchFilter("type", null, 'anyof', 'ItemShip');
    //     filtLoc[1] = new nlobjSearchFilter("custbody_record_type", null, 'anyof', 2);
    //     filtLoc[2] = new nlobjSearchFilter("item", null, 'anyof', item);
    //     filtLoc[3] = new nlobjSearchFilter("custbody_project", null, 'anyof', jobId);
    //     filtLoc[4] = new nlobjSearchFilter("mainline", null, 'anyof', 'T');
    //     var itemFulSearch = nlapiSearchRecord('itemfulfillment', null, filtLoc, colLoc);
    //     if (itemFulSearch) {
    //       location = itemFulSearch[0].getValue('location');
    //     }

    //     var avgCost = 0;
    //     var itemtype = nlapiLookupField('item', parseInt(item), 'type');
    //     itemtype = getRecItemType(itemtype);
    //     var rec = nlapiLoadRecord(itemtype, item);
    //     var lnCnt = rec.getLineItemCount("locations");
    //     for (var k = 1; k <= lnCnt; k++) {
    //       var loca = rec.getLineItemValue("locations", "locationid", k);
    //       if (loca == location) {
    //         avgCost = rec.getLineItemValue("locations", "averagecostmli", k);
    //         avgCost = avgCost;
    //       }
    //     }

    //     var filtIn = new Array();
    //     var colIn = new Array();
    //     colIn[0] = new nlobjSearchColumn("vendorcost");
    //     filtIn[0] = new nlobjSearchFilter("type", null, 'anyof', 'NonInvtPart');
    //     filtIn[1] = new nlobjSearchFilter("isdropshipitem", null, 'is', 'T');
    //     filtIn[2] = new nlobjSearchFilter("ispreferredvendor", null, 'is', 'T');
    //     filtIn[3] = new nlobjSearchFilter("internalidnumber", null, 'equalto', item);
    //     var nonInvSearch = nlapiSearchRecord("noninventoryitem", null, filtIn, colIn);
    //     if (nonInvSearch) {
    //       avgCost = nonInvSearch[0].getValue('vendorcost');
    //     }
    //     var filt = new Array();
    //     var col = new Array();
    //     col[0] = new nlobjSearchColumn("tranid", null);
    //     col[1] = new nlobjSearchColumn("trandate", null);
    //     col[2] = new nlobjSearchColumn("quantity", null);
    //     col[3] = new nlobjSearchColumn("amount", null);
    //     col[4] = new nlobjSearchColumn("item", null);
    //     col[5] = new nlobjSearchColumn("status", null);
    //     filt[0] = new nlobjSearchFilter("type", null, 'anyof', 'RtnAuth');
    //     filt[1] = new nlobjSearchFilter("internalidnumber", 'jobmain', 'equalto', jobId);
    //     filt[2] = new nlobjSearchFilter("shipping", null, 'is', 'F');
    //     filt[3] = new nlobjSearchFilter("cogs", null, 'is', 'F');
    //     filt[4] = new nlobjSearchFilter("mainline", null, 'is', 'F');
    //     filt[5] = new nlobjSearchFilter("taxline", null, 'is', 'F');
    //     var retSearch = nlapiSearchRecord("returnauthorization", null, filt, col);
    //     if (retSearch) {
    //       for (var kk = 0; kk < retSearch.length; kk++) {
    //         var qtyAuth = retSearch[kk].getValue('quantity');
    //         var itemAuth = retSearch[kk].getValue('item');
    //         if (item == itemAuth) {
    //           fulfil = Number(fulfil) + Number(qtyAuth);
    //         }
    //       }
    //     }
    //     totalmat = Number(fulfil) * Number(avgCost);
    //     totalmaterCost = Number(totalmaterCost) + Number(totalmat);
    //   }
    // }

    // console.log("totalmaterCost==================" + totalmaterCost);
    // console.log("totalLaborCost==================" + totalLaborCost);
    // totalProjectCost = Number(totalmaterCost) + Number(totalLaborCost);
    // nlapiSubmitField("job", jobId, "custentity_total_project_cost", totalProjectCost, false, false);
    // nlapiSubmitField("job", jobId, "entitystatus", 1, false, false);
    // window.location.reload();
  }
}
function getRecItemType(itemtype) {
  itemtype = itemtype.toLowerCase();
  itemtype = (itemtype == "invtpart" ? "inventoryitem" : (itemtype == "noninvtpart" ? "noninventoryitem" : (itemtype == "group" ? "itemgroup" : itemtype)));
  itemtype = (itemtype == "service" || itemtype == "kit" ? itemtype + "item" : (itemtype == "othcharge" ? "otherchargeitem" : itemtype));
  return itemtype;
}

function ClosePurchase(recId) {
  var purchaseRec = nlapiLoadRecord("purchaseorder", recId);
  var closeReason = purchaseRec.getFieldValue("custbody_close_reason");
  if (closeReason == '' || closeReason == null) {
    alert("Please Enter Close Reason");
    return false;
  } else {
    close_remaining(recId, 'purchord');
  }
}
var recType = nlapiGetRecordType();
if (recType == "purchaseorder") {
  var poForm = nlapiLookupField('purchaseorder', nlapiGetRecordId(), 'customform');
  if (poForm == 136) {
    jQuery("#tdbody_closeremaining").hide();
  }
}
function closeOldPurchaseOrder(recId) {
  close_remaining(recId, 'purchord');
}

function printProjectCost(jobId) {
  window.open('/app/site/hosting/scriptlet.nl?script=1075&deploy=1&recId=' + jobId);
}
function printProjectEstCost(jobId) {
  window.open('/app/site/hosting/scriptlet.nl?script=1073&deploy=1&recId=' + jobId);
}
function printTimeDetails(recId) {
  window.open('/app/site/hosting/scriptlet.nl?script=406&deploy=1&recId=' + recId);
}

function printJobExpReport(recId) {
  window.open('/app/site/hosting/scriptlet.nl?script=1072&deploy=1&recId=' + recId);
}