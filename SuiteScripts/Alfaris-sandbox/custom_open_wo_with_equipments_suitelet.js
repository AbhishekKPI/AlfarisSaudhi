function woOpenEquipmentList(request, response)
{
  if(request.getMethod() == 'GET')
  {
    var form = nlapiCreateForm('Work Order Related Equipment Details');
    var equipId = request.getParameter('eqpId');
    var soId = request.getParameter('soId');
    var equipsel = form.addField('custpage_equip','select','Equipment','customrecord_ncfar_asset').setDisplayType('inline').setDefaultValue(equipId);
    var woArr = new Array();
    var wo = 0;
    var mainTab = form.addTab('custpage_maintab','Work Orders');
    var woSubtab = form.addSubTab('custpage_wosubtab','Work Orders','custpage_maintab');
    var woSublist = form.addSubList('custpage_wo_sublist','list','', 'custpage_wosubtab');
    woSublist.addField('custpage_serialno','text','Sl No.');
    woSublist.addField('custpage_wo','text','Work Orders').setDisplayType('inline');
    woSublist.addField('custpage_status','text','Status');
    // if(equipId){
    //   var filter = [["custbody_work_order_equipments","anyOf",equipId]];
    //   var woRes = nlapiSearchRecord("transaction","customsearch_equipmentwise_work_orders_2",filter);
    //   if(woRes){
    //     for(var i=0;i<woRes.length;i++){
    //       woArr[wo] = {'custpage_serialno':(i+1),'custpage_wo':woRes[i].getValue('tranid'),'custpage_status':woRes[i].getText('statusref')};
    //       wo++;
    //     }
    //     woSublist.setLineItemValues(woArr);
    //   }
    // }
   /* var res = nlapiLoadRecord("salesorder",soId);
    res.setFieldValue("custbody_wo_list_viewed","T");
    nlapiSubmitRecord(res,true);*/
    response.writePage( form );
    
  }

}
