    function createPurchaseInvoice() {
        nlapiLogExecution("DEBUG", "Inside*************");
        try {
            var recordId = nlapiGetContext().getSetting('SCRIPT', 'custscript_invoice_id');
            var timeStamp = nlapiGetContext().getSetting('SCRIPT', 'custscript_timestamp_inv');
            nlapiLogExecution("DEBUG", "recordId * recordId",recordId);
            nlapiLogExecution("DEBUG", "timeStamp * timeStamp",timeStamp);

            var invRec = nlapiLoadRecord("invoice", recordId);
            nlapiLogExecution("DEBUG", "invRec * invRec",invRec);

            // var subsidiary = invRec.getFieldValue('custbody_equipment_subsidiary');
            var subsidiaryVal = invRec.getFieldValue('custbody_ed_equipment_subsidiary');
            nlapiLogExecution("DEBUG", "subsidiaryVal * subsidiaryVal",subsidiaryVal);

            
            var location = invRec.getFieldValue('location');
            var department = invRec.getFieldValue('department');
            var equipemnt = invRec.getFieldValue('class');
            var soRef = invRec.getFieldValue('createdfrom');
            var equipemnts = invRec.getFieldValue('custbody_ed_work_order_equipments');
            nlapiLogExecution("DEBUG", "equipemnts * equipemnts",equipemnts);

            var lnCnt = invRec.getLineItemCount("item");
            var customerID = invRec.getFieldValue("entity");
            nlapiLogExecution("DEBUG", "customerID",customerID);

            var trandate = invRec.getFieldValue("trandate");
            nlapiLogExecution("DEBUG", "trandate * trandate",trandate);

            var approvalStatus = invRec.getFieldValue("approvalstatus");
            var entityID = '';




            if (customerID == 304390) {
            nlapiLogExecution("DEBUG", "customerID 304390",customerID);

                entityID = 494861;
            }
            else if (customerID == 304391) {
            nlapiLogExecution("DEBUG", "customerID 304391",customerID);

                entityID = 494860;
            }


            nlapiLogExecution("DEBUG", "subsidiaryVal===============", subsidiaryVal);
            nlapiLogExecution("DEBUG", "entityID===============", entityID);
            var inv = nlapiCreateRecord('vendorbill');

            inv.setFieldValue('customform',140);
            // inv.setFieldValue('custbody_purchase_type', 1);


            // var vendorSub = nlapiLookupField('vendor', entityID, 'subsidiary');


            var vendRec = nlapiLoadRecord('vendor', entityID);
            var vendorSub = vendRec.getFieldValue('subsidiary');
            nlapiLogExecution("DEBUG", "vendorSub===============", vendorSub);

            // nlapiLogExecution("DEBUG", "vendorSub===============", vendorSub);

            inv.setFieldValue('entity', entityID);
            nlapiLogExecution("DEBUG", "1");

            inv.setFieldValue('approvalstatus',2)

            inv.setFieldValue('trandate', trandate,true);
            nlapiLogExecution("DEBUG", "2");

            // inv.setFieldText('subsidiary', vendorSub);
            // nlapiLogExecution("DEBUG", "3");

            // inv.setFieldValue('custbody_work_order_equipments',equipemnts);
            inv.setFieldValue('custbody_so_ref', soRef);
            nlapiLogExecution("DEBUG", "4");

            // inv.setFieldValue('approvalstatus', 1);
            nlapiLogExecution("DEBUG", "5");

            for (var k = 1; k <= lnCnt; k++) {
            nlapiLogExecution("DEBUG", "lnCnt======Inside=========", lnCnt);

                var item = invRec.getLineItemValue('item', 'item', k);
                var quantity = invRec.getLineItemValue('item', 'quantity', k);
                var rate = invRec.getLineItemValue('item', 'rate', k);
                var item = invRec.getLineItemValue('item', 'item', k);
                var taxcode = invRec.getLineItemValue('item', 'taxcode', k);
                var descrip = invRec.getLineItemValue('item', 'description', k);
                ////////set line item/////////////////////////////////
                nlapiLogExecution("DEBUG", "item===============", item);
                inv.selectNewLineItem("item");
                inv.setCurrentLineItemValue('item', 'item', item);
                inv.setCurrentLineItemValue('item', 'quantity', quantity);
                inv.setCurrentLineItemValue('item', 'rate', rate);
                inv.setCurrentLineItemValue('item', 'description', descrip);
                // inv.setCurrentLineItemValue('item', 'taxcode', taxcode);
                inv.commitLineItem("item");
                ////////End Set line item///////////////////////////////
            }
            var invD = nlapiSubmitRecord(inv);
            nlapiLogExecution("DEBUG", "invD=============== ", invD);
            // nlapiSubmitField("vendorbill", invD, "custbody_record_type", 5);
            nlapiSubmitField("vendorbill", invD, "custbody_wr_sales_invoice", recordId);
            nlapiSubmitField("vendorbill", invD, "custbody_ed_work_order_equipments", equipemnts);
            
            
            if (recordId) {

                nlapiSubmitField("invoice", recordId, "custbody_purchase_inv_ref", invD);
                if (approvalStatus == 1) {
                    nlapiSubmitField("invoice", recordId, "approvalstatus", 2);
                }
                nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_trans_rec_id', recordId);
                nlapiSubmitField('customrecord_response_handling', timeStamp, 'custrecord_message', "Complete");
            }
        }
        catch (err) {
            nlapiLogExecution("DEBUG", "err----------------",err.message);
        }
    }
