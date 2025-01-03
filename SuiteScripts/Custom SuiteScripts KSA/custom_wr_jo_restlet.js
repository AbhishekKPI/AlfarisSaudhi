function callSuiteletTest(datain) {
    var msg = "test"
    nlapiLogExecution("DEBUG", "datain", datain);
    var jobId = datain.jobID;
    var filter1 = new Array();
    var cols111 = new Array();
    cols111[0] = new nlobjSearchColumn("tranid");
    cols111[1] = new nlobjSearchColumn("trandate");
    cols111[2] = new nlobjSearchColumn("item");
    cols111[3] = new nlobjSearchColumn('displayname', 'item');
    cols111[4] = new nlobjSearchColumn("quantity");
    cols111[5] = new nlobjSearchColumn("quantityshiprecv");
    cols111[6] = new nlobjSearchColumn("formulanumeric");
    cols111[6].setFormula("{quantityshiprecv}-{quantity}");
    cols111[7] = new nlobjSearchColumn('stockunit', 'item');
    cols111[8] = new nlobjSearchColumn("location");
    cols111[9] = new nlobjSearchColumn("specialorder");
    cols111[10] = new nlobjSearchColumn('rate', 'purchaseOrder');
    cols111[11] = new nlobjSearchColumn("internalid");
    cols111[12] = new nlobjSearchColumn('type', 'item');
    cols111[13] = new nlobjSearchColumn('memo');
    cols111[14] = new nlobjSearchColumn('memo', 'purchaseOrder');
    cols111[15] = new nlobjSearchColumn("formulanumeric")
    cols111[15].setFormula("CASE WHEN {item.inventorylocation.id}IN ({location.id}) THEN  {item.locationaveragecost} END");
    cols111[16] = new nlobjSearchColumn('internalid', 'purchaseorder');
    cols111[17] = new nlobjSearchColumn('stockunit', 'item');
    //cols111[18] = new nlobjSearchColumn('taxamount', 'purchaseOrder');
    //cols111[18] = new nlobjSearchColumn('taxamount', 'purchaseOrder');


    cols111[18] = new nlobjSearchColumn("formulacurrency")
    cols111[18].setFormula("ABS({purchaseorder.taxamount})");
    cols111[19] = new nlobjSearchColumn('cost', 'item');
    cols111[20] = new nlobjSearchColumn('subsidiary');

    filter1[0] = new nlobjSearchFilter('type', null, 'anyof', 'SalesOrd');
    filter1[1] = new nlobjSearchFilter('shipping', null, 'is', 'F');
    filter1[2] = new nlobjSearchFilter('cogs', null, 'is', 'F');
    filter1[3] = new nlobjSearchFilter('mainline', null, 'is', 'F');
    filter1[4] = new nlobjSearchFilter('taxline', null, 'is', 'F');
    filter1[5] = new nlobjSearchFilter('internalid', 'job', 'anyof', jobId);
    filter1[6] = new nlobjSearchFilter('custbody_record_type', null, 'anyof', 2);
    filter1[7] = new nlobjSearchFilter('formulanumeric', null, 'isnotempty', '');
    filter1[7].setFormula('CASE WHEN {item.inventorylocation.id}IN ({location.id}) THEN {item.locationaveragecost} END');


    var woResDm1 = nlapiSearchRecord("transaction", null, filter1, cols111);
    var totalmatest = 0;
    var totalmaterCostest = 0;
    var totalOutmaterCost = 0;
    var totaloutmat = 0;
    var totalmaterCost = 0;
    var totalmat = 0;
    var count = 1;
    var count1 = 1;
    var avgCostest = 0;
    var resultArray = [];
    if (woResDm1) {
        var columns = woResDm1[0].getAllColumns();
         nlapiLogExecution("DEBUG", "woResDm1.length=========", woResDm1.length);
        for (var f = 0; f < woResDm1.length; f++) {
            var sono = woResDm1[f].getValue('tranid');
            var item = woResDm1[f].getValue('item');
            var itemCode = woResDm1[f].getText('item');
            var descrp = woResDm1[f].getValue('displayname', 'item');
            var quantity = woResDm1[f].getValue('quantity');
            var fulfil = woResDm1[f].getValue('quantityshiprecv');
            var itemType = woResDm1[f].getValue('type', 'item');
            var specialorder = woResDm1[f].getValue('specialorder');
            var rate = woResDm1[f].getValue('rate', 'purchaseOrder');
            var remain = woResDm1[f].getValue(columns[6]);
            var poDescription = woResDm1[f].getValue('memo', 'purchaseOrder');
            var purchaseorder = woResDm1[f].getValue('internalid', 'purchaseorder');
            var soInternlid = woResDm1[f].getValue('internalid');
            var avgCostest = 0;
            var sodate = woResDm1[f].getValue('trandate');
            var soDescription = woResDm1[f].getValue('memo');
            var unit = woResDm1[f].getText('stockunit', 'item');
            var purchaseprice = woResDm1[f].getValue('cost', 'item');
            var subsidiary = woResDm1[f].getValue('subsidiary')
            nlapiLogExecution("DEBUG", "purchaseprice=========",purchaseprice);

            if(subsidiary != 12){
                if(purchaseprice && purchaseprice!=''){
                    avgCostest = woResDm1[f].getValue(columns[19]);
                    nlapiLogExecution("DEBUG", "avgCostest=111========",avgCostest);
                }else{
                    avgCostest = woResDm1[f].getValue(columns[15]);
                    nlapiLogExecution("DEBUG", "avgCostest=========",avgCostest);
                }
            } else {
                avgCostest = woResDm1[f].getValue(columns[15]);
                nlapiLogExecution("DEBUG", "avgCostest===== 12 subsidiary====",avgCostest);
            }
            

            var taxamount = woResDm1[f].getValue(columns[18]);
            nlapiLogExecution("DEBUG", "taxamount=========",taxamount);
            if (itemType == "Non-inventory Item") {
                var filtIn = new Array();
                var colIn = new Array();
                colIn[0] = new nlobjSearchColumn("vendorcost");
                filtIn[0] = new nlobjSearchFilter("type", null, 'anyof', 'NonInvtPart');
                filtIn[1] = new nlobjSearchFilter("isdropshipitem", null, 'is', 'T');
                filtIn[2] = new nlobjSearchFilter("ispreferredvendor", null, 'is', 'T');
                filtIn[3] = new nlobjSearchFilter("internalidnumber", null, 'equalto', item);
                var nonInvSearch = nlapiSearchRecord("noninventoryitem", null, filtIn, colIn);
                if (nonInvSearch) {
                    avgCostest = nonInvSearch[0].getValue('vendorcost');
                }
            }

            // nlapiLogExecution("DEBUG", "jobId************", jobId);
            // nlapiLogExecution("DEBUG", "soInternlid************", soInternlid);
            // nlapiLogExecution("DEBUG", "item************", item);
            var qtyAuth = 0;
            var filt = new Array();
            var col = new Array();
            col[0] = new nlobjSearchColumn("tranid", null);
            col[1] = new nlobjSearchColumn("trandate", null);
            col[2] = new nlobjSearchColumn("quantity", null);
            col[3] = new nlobjSearchColumn("amount", null);
            col[4] = new nlobjSearchColumn("item", null);
            col[5] = new nlobjSearchColumn("status", null);
            filt[0] = new nlobjSearchFilter("type", null, 'anyof', 'RtnAuth');
            filt[1] = new nlobjSearchFilter("internalidnumber", 'jobmain', 'equalto', jobId);
            filt[2] = new nlobjSearchFilter("shipping", null, 'is', 'F');
            filt[3] = new nlobjSearchFilter("cogs", null, 'is', 'F');
            filt[4] = new nlobjSearchFilter("mainline", null, 'is', 'F');
            filt[5] = new nlobjSearchFilter("taxline", null, 'is', 'F');
            filt[6] = new nlobjSearchFilter("createdfrom", null, 'anyof', soInternlid);
            filt[7] = new nlobjSearchFilter("item", null, 'anyof', item);
            var retSearch = nlapiSearchRecord("returnauthorization", null, filt, col);
            if (retSearch) {
                qtyAuth = retSearch[0].getValue('quantity');
                fulfil = Number(fulfil) + Number(qtyAuth);
                //nlapiLogExecution("DEBUG", "fulfil*******************", fulfil);
                // nlapiLogExecution("DEBUG", "qtyAuth*******************", qtyAuth);
            }

            if (rate && taxamount) {
                 //nlapiLogExecution("DEBUG", "taxamount*******************", taxamount);
              //   taxamount=Number(taxamount/quantity);
              	nlapiLogExecution("DEBUG", "taxamount*******************", taxamount);
              nlapiLogExecution("DEBUG", "rate*******before************", rate);
                rate = Number(rate);
                nlapiLogExecution("DEBUG", "rate*******************", rate);
            }

            // if (fulfil > 0) {
            resultArray.push({
                "sono": sono,
                "item": item,
                "itemCode": itemCode,
                "descrp": descrp,
                "quantity": quantity,
                "fulfil": fulfil,
                "itemType": itemType,
                "specialorder": specialorder,
                "rate": rate,
                "remain": remain,
                "poDescription": poDescription,
                "purchaseorder": purchaseorder,
                "soInternlid": soInternlid,
                "avgCostest": avgCostest,
                "qtyAuth": qtyAuth,
                "sodate": sodate,
                "soDescription": soDescription,
                "unit": unit,
                "taxamount":taxamount
            });
            // }

        }
    }
    return resultArray;
}