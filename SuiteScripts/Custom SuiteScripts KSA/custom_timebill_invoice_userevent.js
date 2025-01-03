function afterSumbitUpdateTimeTracking(type)
{
	//get the current invoice record    
	var currentRecordId = nlapiGetRecordId();
	var currentRec= nlapiLoadRecord('invoice',currentRecordId);
	// Get the number of line Time Tracking items submitted
	var lines = currentRec.getLineItemCount('time'); 
	var invTotal = currentRec.getFieldValue("total");	
	var invDate = currentRec.getFieldValue("trandate");
	//parse the list of time records
	
	for ( var i=1; i<=lines; i++ )
	{
		//get the ID of the Time Tracking 
		var timeRecId = currentRec.getLineItemValue('time', 'doc', i);
		var timeSelected = currentRec.getLineItemValue('time', 'apply', i);
		var amount =  currentRec.getLineItemValue('time', 'amount', i);
		var rate =  currentRec.getLineItemValue('time', 'rate', i);
		try{
          if (timeSelected == 'T'){
			nlapiSubmitField('timebill', timeRecId, 'custcol_invoice_no', currentRecordId );
			nlapiSubmitField('timebill', timeRecId, 'custcol_inv_amount', amount );
			nlapiSubmitField('timebill', timeRecId, 'custcol_inv_rate', rate );
			nlapiSubmitField('timebill', timeRecId, 'custcol_inv_date', invDate );
			nlapiSubmitField('timebill', timeRecId, 'custcol_inv_total', invTotal );			
			//amount
		}               
		else
		{
			//ensure that updates on invoices when Time Tracking records are unapplied
			var timeRecord = nlapiLoadRecord('timebill', timeRecId);
			var invoiceNoSet = timeRecord.getFieldValue('custcol_invoice_no');
			if (invoiceNoSet != null){
				nlapiSubmitField('timebill', timeRecId, 'custcol_invoice_no', null );
				nlapiSubmitField('timebill', timeRecId, 'custcol_inv_amount', null );
				nlapiSubmitField('timebill', timeRecId, 'custcol_inv_rate', null );
				nlapiSubmitField('timebill', timeRecId, 'custcol_inv_date', null );
				nlapiSubmitField('timebill', timeRecId, 'custcol_inv_total', null );	
			}		            
		}
      
    }catch(e){
      nlapiLogExecution("DEBUG","error",e.message);
    }
		//if it's selected on the invoice, update its custom field
	}
}