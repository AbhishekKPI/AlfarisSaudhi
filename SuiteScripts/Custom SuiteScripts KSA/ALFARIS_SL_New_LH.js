function printNewLH(request, response) {
    var invID = request.getParameter("recid");
    var subsidiary = request.getParameter("subsidiary");
    var invoice = nlapiLoadRecord('creditmemo', invID);
    var renderer = nlapiCreateTemplateRenderer();
    var template = "";
    template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> ";
    template += "<pdf> ";
    template += "   <head> ";
    template += " <link name=\"arabic-font\" type=\"font\" subtype=\"opentype\" src=\"https://4647359.app.netsuite.com/core/media/media.nl?id=6857&amp;c=4647359&amp;h=GURyHDbOe5NQ6BZxduKx_Gh50v23P-0dnJKOlG4s0A4J4EOm&amp;_xt=.ttf\" src-bold=\"https://4647359.app.netsuite.com/core/media/media.nl?id=21692&amp;c=4647359&amp;h=uHRS2GeV3S7MJFTJYAm2KCuCUsmbBvK_4BERfClx96I1yk1e&amp;_xt=.ttf\" bytes=\"2\" />";
    template += "      <#";
    template += "if .locale == \"ru_RU\"> ";
    template += "      <link name=\"verdana\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.verdana}\" src-bold=\"${nsfont.verdana_bold}\" bytes=\"2\" /> ";
    template += "      </#if> ";
    template += "      <macrolist> ";
    template += '<macro id="nlheader">';
    template += '<#if record.subsidiary.internalid?string == \'1\'>';
    template += '<table class="header" style="width: 100%; margin-top:-32px;margin-left:-68px; margin-right:-40px;"><tr>';
    template += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26487&amp;c=4647359&amp;h=N7yMHyudqD68aN6yaYCarDgu-nT4u0aoi7g3lKZ708dlEsDK" style="width:800px; height:120px;" /></td>';
    template += '</tr>';

    template += '</table>';
    template += '</#if>';
    template += '<!-- SALLC -->';
    template += '<#if record.subsidiary.internalid?string == \'2\'>  ';

    template += '<table class="header" style="width: 100%; margin-top:-32px;margin-left:-68px; margin-right:-40px;"><tr>';
    template += '<td><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=26489&amp;c=4647359&amp;h=8jLOJuWgAnB4EXpAfSKtQfxbGPoNlcPY1buLTrUncQpcjvHG" style="width:800px; height:120px;" /></td>';
    template += '</tr>';

    template += '</table>';
    template += '</#if>';
    // Subsidiary and location based Logo 
    template += ' <#if record.subsidiary.internalid?string == \'8\'&& record.location.internalid?string == \'8\'> ';
    template += '           <table class="header" style="width: 100%; margin-top:-48px;margin-left:-50px;"><tr>';
    // template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26488&amp;c=4647359&amp;h=6Uxc0nbUkUIpXGHsPLniGwEfM-PfsyucvPJwV0Vhus-USYG_" style="width:768px; height:140px;" /></td>';
    template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7" style="width:768px; height:140px;" /></td>';

    template += '</tr>';

    template += '</table>';
    template += ' </#if>';

    template += ' <#if record.subsidiary.internalid?string == \'22\' || record.subsidiary.internalid?string == \'23\'> ';
    template += '           <table class="header" style="width: 100%; margin-top:-48px;margin-left:-50px;"><tr>';
    // template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26488&amp;c=4647359&amp;h=6Uxc0nbUkUIpXGHsPLniGwEfM-PfsyucvPJwV0Vhus-USYG_" style="width:768px; height:140px;" /></td>';
    template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7" style="width:768px; height:140px;" /></td>';

    template += '</tr>';

    template += '</table>';
    template += ' </#if>';


    template += '<#if record.subsidiary.internalid?string == \'8\' && record.location.internalid?string != \'8\'>';
    template += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-50px;"><tr>';
    template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26488&amp;c=4647359&amp;h=6Uxc0nbUkUIpXGHsPLniGwEfM-PfsyucvPJwV0Vhus-USYG_" style="width:768px; height:140px;" /></td>';
    template += '</tr>';

    template += '</table>';
    template += ' </#if>';

    template += '<#if record.subsidiary.internalid?string == \'16\' && record.location.internalid?string == \'21\'>';
    template += '<table class="header" style="width: 100%; margin-top:-48px;margin-left:-50px;"><tr>';
    //template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14614&amp;c=4647359&amp;h=flaMNO15PsYKQzLVQzTzireG0thAuPI1FDrrkdJqQ3Qz8ERo" style="width:768px; height:140px;" /></td>';
    template += '<td><img src="https://4647359.app.netsuite.com/core/media/media.nl?id=26496&amp;c=4647359&amp;h=21w54VT21qJNaGVHZPaPVTzW9PW2DgyTFourxU2Qxl7fVlb7" style="width:768px; height:140px;" /></td>';

    template += '</tr>';

    template += '</table>';
    template += ' </#if>';




    template += '</macro>';
    template += '<macro id="nlfooter">';
    template += '  <table style="width:100%; padding-top:10px;font-size:8pt">';
    template += '            <tr><td align="right">&nbsp;( Page <pagenumber/> of <totalpages/> )</td></tr>';
    template += '          </table>';
    template += "<#if record.subsidiary.internalid?string == '8'>  ";
    template += '          <table class="footer" border="0" ';
    template += '              style="width: 100%;background-color:#000;margin-top:48px;margin-left :-40px;">';
    template += '              <tr>';
    template += '<td>';
    template += '<img src="https://4647359.app.netsuite.com/core/media/media.nl?id=14615&amp;c=4647359&amp;h=ae717ee9182515bf331e" style="width:758px;height:55%;"/>';

    template += '  </td>';
    template += '  </tr>';
    template += ' </table>';
    template += ' <div style="position:relative;top:-92px;bottom:-92px;left:490px;">';
    template += '                <img src="https://4647359.app.netsuite.com/core/media/media.nl?id=19981&amp;c=4647359&amp;h=W94ZlflwUJ1kjaRqNCY6I65R8MhjYA31fyCdylTaaKdkxXtN" style="width:38%;height:35%;"/>';
    template += '            </div> ';
    template += '             <#else>';
    template += '              <table class="footer" border="0" ';
    template += '                style="width: 100%; margin-left:-30px; margin-right:-65px; margin-bottom: -255px;background-color:#000;margin-top:40px;">';
    template += '                <tr>';
    template += '                  <td>';
    template += '                <img src="https://system.eu2.netsuite.com/core/media/media.nl?id=9210&amp;c=4647359&amp;h=e6070c9cd462193b9b95" style="width:750px;height:40%;"/>';
    template += '                ';
    template += '                  </td>';
    template += '                </tr>';
    template += ' </table>';
    template += '           <div style="position:relative;top:-258px;bottom:-92px;left:490px;">';
    template += '               <img src="https://4647359.app.netsuite.com/core/media/media.nl?id=19981&amp;c=4647359&amp;h=W94ZlflwUJ1kjaRqNCY6I65R8MhjYA31fyCdylTaaKdkxXtN" style="width:38%;height:35%;"/>';
    template += '            </div> ';
    template += '            </#if>';
    template += '</macro>';
    template += "      </macrolist> ";
    template += "    <style type=\"text/css\">table ";
    template += "{            font-family: sans-serif; ";
    template += "    		font-family:arial,helvetica,sans-serif; ";
    template += "            font-size: 10pt; ";
    template += "            table-layout: fixed; ";
    template += "        } ";
    template += "        th ";
    template += "{            font-weight: bold; ";
    template += "            font-size: 9pt; ";
    template += "            vertical-align: middle; ";
    template += "            padding: 5px 6px 3px; ";
    template += "            background-color: #e3e3e3; ";
    template += "            color: #000000; ";
    template += "        } ";
    template += "        td p { align:left; } ";
    template += "        /*td { ";
    template += "    padding: 4px 6px; ";
    template += "}*/ ";
    template += "        b ";
    template += "{            font-weight: bold; ";
    template += "            color: #000000; ";
    template += "        } ";
    template += "        table.header td ";
    template += "{            padding: 0px; ";
    template += "            font-size: 10pt; ";
    template += "        } ";
    template += "        table.footer td ";
    template += "{            padding: 0px; ";
    template += "            font-size: 9pt; ";
    template += "        } ";
    template += "        table.itemtable th ";
    template += "{            padding-bottom: 10px; ";
    template += "            padding-top: 10px; ";
    template += "        } ";
    template += "        table.body td ";
    template += "{            padding-top: 2px; ";
    template += "        } ";
    template += "        table.total ";
    template += "{            page-break-inside: avoid; ";
    template += "        } ";
    template += "        tr.totalrow ";
    template += "{            background-color: #e3e3e3; ";
    template += "            line-height: 200%; ";
    template += "        } ";
    template += "        td.totalboxtop ";
    template += "{            font-size: 12pt; ";
    template += "            background-color: #e3e3e3; ";
    template += "        } ";
    template += "        td.addressheader ";
    template += "{            font-size: 8pt; ";
    template += "            padding-top: 6px; ";
    template += "            padding-bottom: 2px; ";
    template += "        } ";
    template += "        td.address ";
    template += "{            padding-top: 0px; ";
    template += "        } ";
    template += "        td.totalboxmid ";
    template += "{            font-size: 28pt; ";
    template += "            padding-top: 20px; ";
    template += "            background-color: #e3e3e3; ";
    template += "        } ";
    template += "        td.totalboxbot ";
    template += "{            background-color: #e3e3e3; ";
    template += "            font-weight: bold; ";
    template += "        } ";
    template += "        span.title ";
    template += "{            font-size: 28pt; ";
    template += "        } ";
    template += "        span.number ";
    template += "{            font-size: 16pt; ";
    template += "        } ";
    template += "        span.itemname ";
    template += "{            font-weight: bold; ";
    template += "            line-height: 150%; ";
    template += "        } ";
    template += "        hr ";
    template += "{            width: 100%; ";
    template += "            color: #d3d3d3; ";
    template += "            background-color: #d3d3d3; ";
    template += "            height: 1px; ";
    template += "        } ";
    template += "span.arabicfont{";
    template += "  font-family: arabic-font, sans-serif;";
    template += "  font-size: 9pt;";
    template += "  table-layout: fixed;";
    template += "   direction:rtl;";
    template += "  } ";
    template += "</style> ";
    template += "   </head> ";
    template += "   <body header=\"nlheader\" header-height=\"13%\" footer=\"nlfooter\" footer-height=\"11%\" padding=\"0.3in 0.3in 0.3in 0.3in\" size=\"A4\"> ";
 

    template += "<table style=\"width:100%;font-size:-30px;font-weight:bold;\"> ";
    template += "  <tr><td style=\"font-weight:bold; font-size: 14pt;\" align=\"center\">CREDIT NOTE / <span class=\"arabicfont\" font-size=\"14px\" dir=\"rtl\">اشعار دائن  </span></td></tr> ";
    template += " </table>";
    template += "";


    template += "      <table style=\"width: 100%; margin-top: 10px;border:solid 1px #000000;font-size:12px;top:10px;\"> ";
    template += "         <tr> ";
    template += "            <td style=\"border-right:1px solid black;\" colspan=\"6\" align=\"left\"> ";
    template += "               <table> ";
    template += "                  <tr> ";
    template += '                     <td style=\"font-size:15px;font-weight:bold;\">${record.entity.altname}<br/><span class="arabicfont" dir="rtl" style="font-size :10px;">  ${record.entity.custentity_customer_long_name_arabic}</span></td> ';
    template += "                  </tr> ";
    // template += "                  <tr> ";
    // template += "                     <td>${record.entity.address}<br/></td> ";
    // template += "                  </tr> ";
    // template += "                  <tr> ";
    // template += "                     <td>${record.entity.phone}</td> ";
    // template += "                  </tr> ";
    template += "                  <tr><td >";
    template += " <#if record.entity.custentity_address_in_arabic?has_content>";
    template += '<span class="arabicfont" dir="rtl" style="font-size :15px;"> ${record.entity.custentity_address_in_arabic}</span>';
    template += "</#if>";
    template += "</td></tr>"
    template += "               </table> ";
    template += "            </td> ";
    template += "            <td colspan=\"6\" align=\"left\"> ";
    template += "               <table> ";
    // template += ' <#if record.otherrefnum?has_content>';
    template += '            <tr><td style=\"font-weight:bold;\">DATE :&nbsp;&nbsp;<span class="arabicfont" dir="rtl">  تاريخ الفاتورة</span>  ${record.trandate?string["d-MMM-yyyy"]}</td></tr> ';
    template += "                  <tr> ";
    template += '                    <td><b>LPO No :&nbsp;<span class="arabicfont" dir="rtl" style="font-size :10px;">  رقم ال بي او </span>&nbsp;</b> ${record.otherrefnum}<br/></td> ';
    template += "                  </tr> ";
    //  template += ' </#if>';
    // template += ' <#if record.entity.terms?has_content>';
    template += "                  <tr> ";
    template += '                     <td><b>Pay. Term : </b> &nbsp;<span class="arabicfont" dir="rtl" style="font-size :10px;"> شروط العقد </span>&nbsp;${record.entity.terms}<br/></td> ';
    template += "                  </tr> ";
    // template += ' </#if>';
    // template += ' <#if record.duedate?has_content>';
    template += "                  <tr> ";
    template += '                     <td><b>Pay Due :</b> &nbsp;<span class="arabicfont" dir="rtl" style="font-size :10px;"> استحقاق الدفعة  </span>&nbsp;${record.duedate}<br/></td> ';
    template += "                  </tr> ";
    // template += ' </#if>';
    template += "                  <tr> ";
    template += '                    <td><b>Sales Rep :</b> &nbsp;<span class="arabicfont" dir="rtl" style="font-size :10px;"> لمندوب: </span>&nbsp;${record.salesrep.entityid} ${record.salesrep.firstname}<br/></td> ';
    template += "                  </tr> ";
    template += "                  <tr> ";
    template += '                     <td><b>Location :</b> &nbsp;<span class="arabicfont" dir="rtl" style="font-size :10px;"> الموقع :</span>&nbsp;${record.location}';





    template += '</td> ';
    template += "                  </tr> ";
    template += ' <tr><td><b>Invoice No :</b>';
    template += ' <#list record.apply as apply>';
    template += ' <span><#if apply.apply?string == "Yes"> ${apply.refnum}</#if></span>';
    template += ' </#list>';
    template += ' </td></tr>';
    template += "               </table> ";
    template += "            </td> ";
    template += "         </tr> ";
    template += "      </table> ";

    template += "      <br/> ";



    var supplierName = ""
    var streetName = ""
    var postalCode = ""
    var country = ""
    var city = ""
    var district = ""
    var buildingNum = ""
    var crNum = ""
    var supplierVatRegNum = ""
    var secondaryNum = ""
    var supplierNameArbc = ""
    var streetNameArbc = ""
    var districtArbc = ""
    var countryArbc = "المملكة العربية السعودية"


    template += " <#if record.subsidiary.internalid?string == '1'>";
    var supplierName = "SG Crane Division - Rental"
    var streetName = "P.O Box No. 273,Jubail"
    var postalCode = "31951"
    var country = "Kingdom of Saudi Arabia"
    var city = "Eastern Province"
    var district = "31951"
    var buildingNum = ""
    var crNum = ""
    var supplierVatRegNum = "300554867400003"

    template += " <#elseif record.subsidiary.internalid?string == '8' || record.subsidiary.internalid?string == '16' >";
    var supplierName = "Faris Al Arab Transport Company"
    var supplierNameArbc = "شركة فارس العرب للنقل البرى"
    var streetName = "7214 Bin Shaibah, Jubail"
    var streetNameArbc = "7214 بن شيبة, الجبيل"
    var postalCode = "35523"
    var country = "Kingdom of Saudi Arabia"
    var city = "Jubail"
    var district = "Al Merkab"
    var districtArbc = "المرقاب"
    var buildingNum = "7214"
    var crNum = "2055126787"
    var secondaryNum = "5041"
    var supplierVatRegNum = "310448935200003"


    template += " <#elseif record.subsidiary.internalid?string == '12' || record.subsidiary.internalid?string == '11'>";
    var supplierName = "Saudi Al Faris International Company"
    var supplierNameArbc = "شركة الفارس السعودية الدولية"
    var streetName = "7214 Bin Shaibah, Jubail"
    var streetNameArbc = "7214 بن شيبة, الجبيل"
    var postalCode = "35523"
    var country = "Kingdom of Saudi Arabia"
    var city = "Jubail"
    var district = "Al Merkab"
    var districtArbc = "المرقاب"
    var buildingNum = "7214"
    var crNum = "2055015075"
    var secondaryNum = "5041"
    var supplierVatRegNum = "30554867400003"


    template += "</#if>";



    template += '  <table width="100%"   border="1" style="margin-top :10px;">';
    template += '                                                       <tr>';
    template += '                                                           <td width="50%" border-right="1px solid black" >';
    template += '                                                              <table font-size="9pt" align="right"  width="100%">';
    template += '';
    template += '                                                                       <tr>';
    template += '                                                                           <td align="left" width="25%" colspan="8"><b>Supplier Information:</b></td>';
    template += '                                             ';
    template += '                                                                       </tr>';
    template += '                                                                       <tr>';
    template += '                                                                           <td align="left" width="25%" colspan="8">';
    template += '                                                                           ';
    template += '                                                                          ';
    template += '                                                                            ' + supplierName + '<br/>' + streetName + '<br/>Zip code :' + postalCode + ' - ' + secondaryNum + '<br/>' + district + ', ' + country + '<br/>Vat No: ' + supplierVatRegNum + '';
    template += '';
    template += '                                                                           </td>';
    template += '                                             ';
    template += '                                                                          </tr>';
    template += '';
    template += '                                                                        ';
    template += '                                                                       ';
    template += '';
    template += '';
    template += '';
    template += '                                                           </table>';
    template += '                                                       </td>';
    template += '                                                       <td  width="50%">';
    template += '           ';
    template += '                                                                        <table font-size="9pt" align="right"  width="100%">';
    template += '';
    template += '                                                                       <tr>';
    template += '                                                                           <td align="right"   colspan="8"> <b><span class="arabicfont" >:معلومات المورد</span></b></td>';
    template += '           ';
    template += '                                                                         ';
    template += '                                                                       </tr>';
    template += '                                                 ';
    template += '                                                                       <tr>';
    template += '                                                                           ';
    template += '                                                                           <td align="right"   colspan="8"> <span class="arabicfont" >' + supplierNameArbc + '<br/>' + streetNameArbc + '<br/>الرمز البريدي:' + postalCode + ' - ' + secondaryNum + '<br/>' + districtArbc + ', ' + countryArbc + '<br/> ';
    template += '                                                                           الرقم الضربي:${supplierVatRegNum}';
    template += '                                                                           </span></td>';

    template += '                                                                       </tr>';

    template += '                                                           </table>';
    template += '                                                       </td>';

    template += '                                                   </tr>';

    template += '                                                    <tr>';
    template += '                                                           <td border-top="1px solid black" width="50%" border-right="1px solid black" >';
    template += '                                                               <table font-size="9pt" align="right"  width="100%">';
    template += '';
    template += '                                                                       <tr>';
    template += '                                                                           <td align="left" width="25%" colspan="8"><b>Buyer Information:</b></td>';
    template += '                                             ';
    template += '                                                                       </tr>';
    template += '                                                                       <tr>';
    template += '                                                                           <td align="left" width="25%" colspan="8">';
    template += '                                                                           ';
    template += '                                                                          ';
    template += '                                                                            ${record.entity.address}';
    template += '';
    template += '                                                                           </td>';
    template += '                                             ';
    template += '                                                                          </tr>';
    template += '';
    template += '                                                                          <tr>';
    template += '                                                                       <td align="left" width="25%" colspan="4">';
    template += '                                                                            <b>Building No : </b> ${record.billingaddress.custrecord_building}';
    template += '                                                                          </td>';
    template += '                                                                           <td align="left" width="25%" colspan="4">';
    template += '                                                                          ';
    template += '                                                                           <b>Postal Code :  </b>${record.billingaddress.zip}';
    template += '';
    template += '                                                                           </td>';
    template += '                                                                       </tr>';
    template += '                                                                          <tr>';
    template += '                                                                       <td align="left" width="25%" colspan="4">';
    template += '                                                                           <b>Additional No : </b> ${record.billingaddress.custrecord_buildingname}';
    template += '                                                                          </td>';
    template += '                                                                           <td align="left" width="25%" colspan="4">';
    template += '                                                                           <b>Vat No : </b> ${record.entity.vatregnumber}';
    template += '                                                                           </td>';
    template += '                                                                       </tr> ';
    template += '';
    template += '';
    template += '';
    template += '                                                           </table>';
    template += '                                                       </td>';
    template += '                                                       <td border-top="1px solid black" width="50%">';
    template += '           ';
    template += '                                                                        <table font-size="9pt" align="right"  width="100%">';
    template += '';
    template += '                                                                       <tr>';
    template += '                                                                           <td align="right" width="25%"  colspan="8"> <b><span class="arabicfont" >:معلومات المشتري</span></b> </td>';
    template += '           ';
    template += '                                                                         ';
    template += '                                                                       </tr>';
    template += '                                                 ';
    template += '                                                                       <tr>';
    template += '                                                                           ';
    template += '                                                                           <td align="right" width="25%"  colspan="8"> <span class="arabicfont" >${record.entity.custentity_address_in_arabic}</span></td>';
    template += '';
    template += '                                             ';
    template += '                                                                       </tr>';
    template += '';
    template += '      ';
    template += '                                                                      <tr>';
    template += '                                                                      ';
    template += '                                                                           <td align="right" width="25%" colspan="5">${record.billingaddress.zip}  <span class="arabicfont" ><b>: الرمز بريدي</b> </span>  </td>';
    template += '';
    template += '                                                                            <td align="right" width="25%" colspan="3">${record.billingaddress.custrecord_building} <span class="arabicfont"> <b>: رقم المبنى</b> </span></td>';
    template += '                                                                     ';
    template += '                                                                       </tr>';
    template += '                                                                      <tr>';
    template += '';
    template += '                                                                       <td align="right" width="25%" colspan="5">${record.entity.vatregnumber} <span class="arabicfont">  <b>: الرقم الضربي</b> </span></td>';
    template += '';
    template += '                                                                        <td align="right" width="25%" colspan="3">${record.billingaddress.custrecord_buildingname}<span class="arabicfont" >  <b>:&nbsp; رقم إضافي </b> </span>  </td>';
    template += '';
    template += '                                                                       </tr>';
    template += '';
    template += '';
    template += '';
    template += '                                                                          ';
    template += '           ';
    template += '                                                           </table>';
    template += '                                                       </td>';
    template += '           ';
    template += '                                                   </tr>';
    template += '           ';
    template += '                                               </table>';





    template += '  <br/>';







    template += "      <#";
    template += "if record.item?has_content> ";
    template += "      <table class=\"itemtable\" style=\"width: 100%; margin-top: 10px;border:1px solid #000000;top:10px;\"> ";
    template += "         <!-- start items --><#list record.item as item><#if item_index==0> ";
    template += "         <thead> ";
    template += "            <tr style=\"line-height:180%;\"> ";
    template += '               <td align=\"center\" colspan=\"6\" style=\"border-bottom:solid 1px #000000;font-weight:bold;\">Item<br/><span class="arabicfont" dir="rtl" style="font-size :10px;">البضاعة</span></td>';
    template += '               <td align=\"center\" colspan=\"12\"  style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Job Description<br/><span class="arabicfont" dir="rtl" style="font-size :10px;"> لوصف </span></td> ';
    template += '               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Quantity<br/><span class="arabicfont" dir="rtl" style="font-size :10px;"> كمية  </span></td> ';
    template += '               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align="center">Unit Price<br/><span class="arabicfont" dir="rtl" style="font-size :10px;"> قيمة الوحدة </span></p></td> ';
    template += '               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align="center">Taxable Amount<br/><span class="arabicfont" dir="rtl" style="font-size :10px;">المبلغ الخاضع للضريبة</span></p></td> ';
    template += '               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Tax Rate<br/><span class="arabicfont" dir="rtl" style="font-size :10px;">معدل الضريبة</span></td> ';
    template += '               <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align="center">Tax(${record.currencysymbol})<br/><span class="arabicfont" dir="rtl" style="font-size :10px;">(ريال سعودي) الضريبة</span></p></td> ';
    template += '               <td align=\"center\" colspan=\"5\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\"><p align="center">Total<br/><span class="arabicfont" dir="rtl" style="font-size :10px;">المجموع</span></p></td> ';
    template += "            </tr> ";
    template += "         </thead> ";
    template += "         </#if> ";
    template += "         <tr style=\"line-height:200%;\"> ";
    template += "            <#assign rescode = 0/> ";
    template += '            <td align=\"center\" colspan=\"6\" valign=\"justify\">${item.item}<br/><span class="arabicfont" dir="rtl" style="font-size :10px;"> مزكرة الائتمان الصادرة </span></td> ';
    template += '            <td align=\"center\" colspan=\"12\" valign=\"justify\" style=\"border-left:solid 1px #000000;\">${item.description}<br/><span class="arabicfont" dir="rtl">${item.custcol_arabic_description}</span></td> ';
    template += "            <td align=\"center\" colspan=\"4\" valign=\"justify\" style=\"border-left:solid 1px #000000;\">${item.quantity}</td> ";
    template += "            <td align=\"right\" colspan=\"4\" valign=\"justify\" style=\"border-left:solid 1px #000000;\">${item.rate?string[\"#,##0.00\"]}</td> ";
    template += "            <td align=\"right\" colspan=\"4\" valign=\"justify\" style=\"border-left:solid 1px #000000;\">${item.amount?string[\"#,##0.00\"]}</td> ";
    template += "            <td align=\"right\" colspan=\"4\" valign=\"justify\" style=\"border-left:solid 1px #000000;\">${item.taxrate1}</td> ";
    template += "            <td align=\"right\" colspan=\"4\" valign=\"justify\" style=\"border-left:solid 1px #000000;\">(${item.tax1amt?string[\"#,##0.00\"]})</td> ";
    template += "            <td align=\"right\" colspan=\"5\" valign=\"justify\" style=\"padding:5px;border-left:solid 1px #000000;\">(${item.grossamt?string[\"#,##0.00\"]})</td> ";
    template += "         </tr> ";
    template += "         </#list><!-- end items --> ";
    template += ' <tr style="line-height:180%;">';
    template += '<td align ="right" colspan="38" style="font-weight :bold;border-top:solid 1px #000000;">Total excluding VAT&nbsp;<span class="arabicfont" dir="rtl" style="font-size :10px;font-weight :bold;"> الإجمالي باستثناء ضريبة القيمة المضافة </span></td>';
    template += '<td align="right" colspan="5" style="border-top:solid 1px #000000;border-left:solid 1px #000000;">(${record.subtotal?string["#,##0.00"]})</td>';
    template += '</tr>';
    template += '<tr style="line-height:180%;">';
    template += '	<td align ="right" colspan="38" style="font-weight :bold;border-top:solid 1px #000000;">Total VAT&nbsp;<span class="arabicfont" dir="rtl" style="font-size :10px;font-weight :bold;"> نسبة الضريبة </span></td>';
    template += '	<td align="right" colspan="5" style="border-top:solid 1px #000000;border-left:solid 1px #000000;">(${record.taxtotal?string["#,##0.00"]})</td>';
    template += '</tr>';
    template += '<tr style="line-height:180%;">';
    template += '<td align ="right" colspan="38" style="font-weight :bold;border-top:solid 1px #000000;">Total Including VAT&nbsp;<span class="arabicfont" dir="rtl" style="font-size :10px;font-weight :bold;"> الإجمالي بما في ذلك ضريبة القيمة المضاف  </span></td>';
    template += '<td align="right" colspan="5" style="border-top:solid 1px #000000;border-left:solid 1px #000000;">(${record.total?string["#,##0.00"]})</td>';
    template += '</tr>';
    template += '<#if record.currencysymbol != "SAR" && record.custbody_amount_into_words?has_content>';
    template += "         <tr style=\"line-height:180%;\"> ";
    template += '           <td align =\"left\" colspan=\"43\" style=\"padding:5px;border-top:solid 1px #000000;\"><b>Amount in words:&nbsp;&nbsp;<#if record.custbody_include_custom_amt_words?string == \'Yes\'><i><span dir = "rtl">${record.currencysymbol} ${record.custbody_custom_amt_in_words}</span></i><#else><i>${record.currencysymbol} ${record.custbody_amount_into_words?capitalize}</i></#if></b></td> ';
    template += "         </tr> ";
    template += ' </#if>';
    template += '<#if record.currencysymbol != "SAR" && record.custbody_amount_in_words_arabic?has_content>';
    template += "         <tr style=\"line-height:180%;\"> ";
    template += '           <td align =\"left\" colspan=\"43\" style=\"padding:5px;border-top:solid 1px #000000;\"><span class="arabicfont" dir="rtl">${record.custbody_amount_in_words_arabic}:المبلغ بالكلمات</span></td> ';
    template += "         </tr> ";
    template += ' </#if>';
    template += '<#if record.currencysymbol == "SAR" && record.custbody_amount_in_words_english_sar?has_content>';
    template += "         <tr style=\"line-height:180%;\"> ";
    template += '           <td align =\"left\" colspan=\"43\" style=\"padding:5px;border-top:solid 1px #000000;\"><b>Amount in words:&nbsp;&nbsp;${record.custbody_amount_in_words_english_sar}</b></td> ';
    template += "         </tr> ";
    template += ' </#if>';
    template += '<#if record.currencysymbol == "SAR" && record.custbody_amount_in_words_arabic_sar?has_content>';
    template += "         <tr style=\"line-height:180%;\"> ";
    template += '           <td align =\"left\" colspan=\"43\" style=\"padding:5px;border-top:solid 1px #000000;\"><span class="arabicfont" dir="rtl">${record.custbody_amount_in_words_arabic_sar}:المبلغ بالكلمات</span></td> ';
    template += "         </tr> ";
    template += ' </#if>';
    template += "      </table> ";
    template += '   <table align="right" style="width:100%; margin-top:10px">';
    template += '      ';
    template += '    <tr>';
    template += '    <td width="90%" align="right">';
    template += '    <#if record.custbody_psg_ei_qr_string?has_content>';
    template += '    <barcode codetype="qrcode" showtext="false" height="95" width="95"  align="right" value="${record.custbody_psg_ei_qr_string?html}"/>';
    template += '<#elseif  record.custbody_qr_code_data?has_content>';
    template += '         <barcode codetype="qrcode" showtext="false" height="95px" width="95px"  align="right" value="${record.custbody_qr_code_data}"/>';
    template += '</#if>';
    template += '</td>';
    template += '<td width="10%" align="center"><b>E. &#38; O.E.</b></td>';
    template += '</tr>';
    template += '';
    template += ' </table>';
    template += "      </#";
    template += "if> ";
    template += '<table style="width:100%;top:45px;">';

    template += "<tr>";
    template += '<td style="font-weight:bold;" align="left">Company Stamp :<span class="arabicfont" dir = "rtl">ختم الشركة</span></td>';
    template += '<!-- <#if record.custbody_subsidiary_legal_name?has_content><td style="width:330px;font-weight:bold;" align="center">&nbsp;For ${record.custbody_subsidiary_legal_name}<br/><span dir = "rtl">${record.subsidiary.custrecord_arabic_legalname}</span></td>';
    template += " <#else>";
    template += ' <td style="width:330px;font-weight:bold;" align="center">&nbsp;For ${record.subsidiary.legalname}<br/><span dir = "rtl">${record.subsidiary.custrecord_arabic_legalname}</span></td>';
    template += "</#if> -->";
    template += "  <#if record.location.internalid?string != '8'> <!-- EXCEPT for LOCATION -  Faris Al Arab Contracting Co-->";
    template += "    <#if record.custbody_subsidiary_legal_name?has_content>";
    template += '     <td style="width:330px;font-weight:bold;" align="center">&nbsp;For ${record.custbody_subsidiary_legal_name}<br/><span class="arabicfont" dir = "rtl">${record.subsidiary.custrecord_arabic_legalname}</span></td>';
    template += "    <#else>";
    template += '   <td style="width:330px;font-weight:bold;" align="center">&nbsp;For ${record.subsidiary.legalname}<br/><span class="arabicfont" dir = "rtl">${record.subsidiary.custrecord_arabic_legalname}</span></td>';
    template += "    </#if>";
    template += " </#if>";
    template += "  <#if record.location.internalid?string == '8'> <!-- ONLY for LOCATION -  Faris Al Arab Contracting Co-->";
    template += '   <td style="width:330px;font-weight:bold;" align="center">&nbsp;For ${record.location.custrecord_location_legal_name}<br/><span class="arabicfont" dir = "rtl">${record.location.custrecord_arabic_location_name}</span></td>';
    template += " </#if>";
    template += " </tr>";
    template += "</table>";
    template += '<table style="top:50px;">';
    template += '   <!--<tr><td style="width:336px;" align="left">Received By &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;_________________________________<br /><br />Received Date : &nbsp;&nbsp;&nbsp;_________________________________ </td></tr>-->';
    template += '    <tr><td style="width:75px;margin-top:5px;" align="left">Received By /</td><td style="width:100px;margin-top:5px;" align="left"><span class="arabicfont" dir = "rtl">المستلم</span> : _________________________________</td></tr>';
    template += '    <tr><td style="width:75px;margin-top:5px;" align="left">Received Date / </td><td style="width:100px;margin-top:5px;" align="left"><span class="arabicfont" dir = "rtl">تاريخ الاستلام</span> : ____________________________</td></tr>';
    template += "</table>";
    template += '<table style="width:100%;top:30px;">';
    template += '<tr><td colspan="3" style="font-size:10px;"><br /><br /></td><td>______________<br/>Prepared by / <span class="arabicfont" dir = "rtl">اعد بواسطة</span></td><td>______________<br/>Approved by / <span class="arabicfont" dir = "rtl">اعتمد من قبل</span></td></tr>';
    template += "</table>";
    template += "   </body> ";
    template += "</pdf>";
    renderer.setTemplate(template);
    renderer.addRecord('record', invoice);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'CreditMemo' + invoice.getFieldValue("id") + '.pdf', 'inline');
    response.write(file.getValue());
}