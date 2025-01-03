function printNewArabicInvoice(request,response){
    var invID = request.getParameter("recid");
    nlapiLogExecution("DEBUG","invID",invID)
    var subsidiary = request.getParameter("subsidiary");
    var invoice = nlapiLoadRecord('invoice', invID);
    var renderer = nlapiCreateTemplateRenderer();
    var template = "";
     template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> "
     template += "<pdf> "
     template += "<head> "
     template += "  <link name=\"arabic-font\" type=\"font\" subtype=\"opentype\" src=\"https://4647359.app.netsuite.com/core/media/media.nl?id=6857&amp;c=4647359&amp;h=GURyHDbOe5NQ6BZxduKx_Gh50v23P-0dnJKOlG4s0A4J4EOm&amp;_xt=.ttf\" src-bold=\"https://4647359.app.netsuite.com/core/media/media.nl?id=21692&amp;c=4647359&amp;h=uHRS2GeV3S7MJFTJYAm2KCuCUsmbBvK_4BERfClx96I1yk1e&amp;_xt=.ttf\" bytes=\"2\" /> "
     template += "	<link name=\"NotoSans\" type=\"font\" subtype=\"truetype\" src=\"${nsfont.NotoSans_Regular}\" src-bold=\"${nsfont.NotoSans_Bold}\" src-italic=\"${nsfont.NotoSans_Italic}\" src-bolditalic=\"${nsfont.NotoSans_BoldItalic}\" bytes=\"2\" /> "
     template += "	<#"
    

     template += "if .locale == \"zh_CN\"> "
     template += "		<link name=\"NotoSansCJKsc\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKsc_Regular}\" src-bold=\"${nsfont.NotoSansCJKsc_Bold}\" bytes=\"2\" /> "
     template += "	<#elseif .locale == \"zh_TW\"> "
     template += "		<link name=\"NotoSansCJKtc\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKtc_Regular}\" src-bold=\"${nsfont.NotoSansCJKtc_Bold}\" bytes=\"2\" /> "
     template += "	<#elseif .locale == \"ja_JP\"> "
     template += "		<link name=\"NotoSansCJKjp\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKjp_Regular}\" src-bold=\"${nsfont.NotoSansCJKjp_Bold}\" bytes=\"2\" /> "
     template += "	<#elseif .locale == \"ko_KR\"> "
     template += "		<link name=\"NotoSansCJKkr\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKkr_Regular}\" src-bold=\"${nsfont.NotoSansCJKkr_Bold}\" bytes=\"2\" /> "
     template += "	<#elseif .locale == \"th_TH\"> "
     template += "		<link name=\"NotoSansThai\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansThai_Regular}\" src-bold=\"${nsfont.NotoSansThai_Bold}\" bytes=\"2\" /> "
     template += "	</#if> "
     template += "    <macrolist> "
     template += "        <macro id=\"nlheader\"> "
     template += "              "
     template += "          <#if record.subsidiary.internalid?string == '1'> "
     template += "            <table class=\"header\" style=\"width: 100%;\"><tr> "
     template += "     <td>&nbsp;"
    
     template += "</td> "
     template += "	</tr></table> "
     template += "            <#else> "
     template += "              <table class=\"header\" style=\"width: 100%;\"><tr> "
     template += "     <td>&nbsp;"
    
    
   
     template += "</td> "
     template += "	</tr></table> "
     template += "              </#"
    
    
    
     template += "if> "
     template += "              <table style=\"height:35%;\"><tr><td>&nbsp;"
    
    
     template += "</td></tr></table> "
     template += "              <table class=\"header\" style=\"width: 100%;top:-20px;\"> "
     template += " <tr> "
     template += "   <td align=\"center\" style=\"width:75%;font-weight:bold;font-size:18px;\">Tax Invoice / <span class=\"arabicfont\" dir=\"rtl\" style=\"font-size:20px;\"><strong>فاتورةضريبة</strong></span></td> "
     template += "   "
     template += "  </tr> "
     template += "</table> "
     template += "            <table style=\"width:100%;margin-top:0.5px;font-size:10px;font-weight:bold;border-left:solid 1px #000000;border-top:solid 1px #000000;border-right:solid 1px #000000;\"> "
     template += "            <tr><td style=\"width:271px;border-right:solid 1px #000000;\">Bill To :</td><td style=\"width:80px;\">&nbsp;"
     template += "</td></tr> "
     template += "            </table> "
     template += "            <table style=\"width:100%;font-size:16px;border-left:solid 1px #000000;border-right:solid 1px #000000;margin-top:0.1px;\"> "
     template += "              <#"
    
     template += "if record.entity.custentity_cr_number?has_content> "
     template += "              <tr> "
     template += "              <#if record.custbody_legal_entity?has_content> "
     template += "              <td style=\"width:359px;font-weight:bold;\" align=\"left\">${record.custbody_legal_entity}</td> "
     template += "              <#else> "
     template += "              <td style=\"width:359px;font-weight:bold;\" align=\"left\">${record.entity.custentity_customer_name}<br/><span class=\"arabicfont\" dir = \"rtl\">${record.entity.custentity_customer_long_name_arabic}</span></td> "
     template += "              </#if> "
     template += "              <td style=\"width:60px;font-weight:bold;font-size:12px;border-left:solid 1px #000000;margin-top:-8px;\" align=\"left\">Invoice No / <span class=\"arabicfont\" dir=\"rtl\">رقم الفاتورة</span> : </td> "
     template += "              <td style=\"width:22px;font-weight:bold;font-size:12px;margin-top:-8px;\" align=\"right\">${record.tranid}</td></tr> "
     template += "                <tr><td style=\"width:359px;font-weight:bold;font-size:12px;\" align=\"left\">CR No / <span class=\"arabicfont\" dir=\"rtl\">سجل تجاري </span> : ${record.entity.custentity_cr_number}<br/>VAT No /<span class=\"arabicfont\" dir=\"rtl\">الرقم الضريبي</span> : ${record.entity.vatregnumber}</td> "
     template += "                <td style=\"width:60px;font-weight:bold;font-size:12px;border-left:solid 1px #000000;margin-top:-23px;\" align=\"left\">Invoice Date / <span class=\"arabicfont\" dir=\"rtl\">تاريخ الفاتورة</span> : </td> "
    + '               <td style=\"width:22px;font-weight:bold;font-size:12px;margin-top:-23px;\" align=\"right\">${record.trandate?string["d.MM.yyyy"]}</td></tr> '
     template += "             <tr><td style=\"width:359px;font-weight:bold;font-size:9px;\" align=\"left\" ><span  class=\"arabicfont\" dir = \"rtl\">${record.entity.custentity_address_in_arabic}</span></td> "
     template += "             <td style=\"width:60px;font-weight:bold;font-size:12px;border-left:solid 1px #000000;margin-top:-35px;\" align=\"left\">Alfaris VAT No /<br/><span class=\"arabicfont\" dir=\"rtl\"> الرقم التعريف الضريبي </span> :</td> "
     template += "             <td style=\"width:22px;font-weight:bold;font-size:12px;margin-top:-35px;\" align=\"right\"> ${record.custbody_trn}<br/> "
     template += "             <barcode codetype=\"qrcode\" showtext=\"false\" height=\"96px\" width=\"96px\"  align=\"center\" value=\"https://4647359.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=547&amp;deploy=1&amp;recid="+invID+"&amp;compid=4647359&amp;h=540601c64000249abf5b\"/> "
     template += "             </td></tr> "
     template += "              "
     template += "                <#else> "
     template += "               <tr><#if record.custbody_legal_entity?has_content> "
     template += "               <td style=\"width:359px;font-weight:bold;\" align=\"left\">${record.custbody_legal_entity}</td> "
     template += "               <#else> "
     template += "               <td style=\"width:359px;font-weight:bold;\" align=\"left\">${record.entity.custentity_customer_name}<br/><span class=\"arabicfont\" dir = \"rtl\">${record.entity.custentity_customer_long_name_arabic}</span></td> "
     template += "               </#if> "
     template += "               <td style=\"width:60px;font-weight:bold;font-size:12px;border-left:solid 1px #000000;margin-top:-18px;\" align=\"left\">Invoice No / <span class=\"arabicfont\" dir=\"rtl\">رقم الفاتورة</span> : </td> "
     template += "               <td style=\"width:22px;font-weight:bold;font-size:12px;margin-top:-18px;\" align=\"right\">${record.tranid}</td></tr> "
     template += "               <tr><td style=\"width:359px;font-weight:bold;font-size:12px;\" align=\"left\">VAT No /<span class=\"arabicfont\" dir=\"rtl\">الرقم الضريبي</span> : ${record.entity.vatregnumber}</td> "
     template += "               <td style=\"width:60px;font-weight:bold;font-size:12px;border-left:solid 1px #000000;margin-top:-35px;\" align=\"left\">Invoice Date / <span class=\"arabicfont\" dir=\"rtl\">تاريخ الفاتورة</span> : </td> "
    + '               <td style=\"width:22px;font-weight:bold;font-size:12px;margin-top:-35px;\" align=\"right\">${record.trandate?string["d.MM.yyyy"]}</td></tr> '
     template += "             <tr><td style=\"width:359px;font-weight:bold;font-size:9px;\" align=\"left\" ><span  class=\"arabicfont\" dir = \"rtl\">${record.entity.custentity_address_in_arabic}</span></td> "
     template += "             <td style=\"width:60px;font-weight:bold;font-size:12px;border-left:solid 1px #000000;margin-top:-35px;\" align=\"left\">Al Faris VAT No /<br/><span class=\"arabicfont\" dir=\"rtl\"> الرقم التعريف الضريبي </span> : </td> "
     template += "             <td style=\"width:22px;font-weight:bold;font-size:12px;margin-top:-35px;\" align=\"right\">${record.custbody_trn}<br/> "
     template += "             <barcode codetype=\"qrcode\" showtext=\"false\" height=\"96px\" width=\"96px\"  align=\"center\" value=\"Seller : ${record.subsidiary.legalname}, Seller Vat# : ${record.custbody_trn}, Date : ${record.createddate},  VAT Amount : ${record.taxtotal}, Buyer Vat# : ${record.entity.vatregnumber}\"/> "
     template += "             </td></tr> "
     template += "               "
     template += "              </#if> "
     template += "            </table> "
     template += "          <table style=\"width:100%;margin-top:0.5px;font-size:10px;\"> "
     template += "    	<tr> "
     template += "      	<td style=\"border-left:solid 1px #000000;border-top:solid 1px #000000;border-bottom:solid 1px #000000;\"> "
     template += "          <table> "
     template += "          <tr><td><b>Tel No / <span class=\"arabicfont\" dir=\"rtl\"> رقم الهاتف </span> : </b> ${record.entity.phone}</td></tr> "
     template += "          <tr><td><b>Fax No / <span class=\"arabicfont\" dir=\"rtl\"> رقم الفاكس </span> : </b> ${record.entity.fax}</td></tr> "
     template += "          <tr><td><b>Attn / <span class=\"arabicfont\" dir=\"rtl\"> اعداد</span> : </b> ${record.custbody_attention}</td></tr> "
     template += "          <tr><td><b>Contract / <span class=\"arabicfont\" dir=\"rtl\"> المقاول </span> : </b> <#if record.custbody_customer_doc_ref_no?has_content>${record.custbody_customer_doc_ref_no}<#else>${record.custbody_invoice_qt_number_cf}</#if></td></tr> "
     template += "          <#if record.custbody_po_number_of_so?has_content><tr><td><b>LPO No / <span class=\"arabicfont\" dir=\"rtl\">ال بي او</span> : </b> ${record.custbody_po_number_of_so}</td></tr><#else><tr><td><b>LPO No / <span class=\"arabicfont\" dir=\"rtl\">ال بي او</span> : </b> ${record.otherrefnum}</td></tr></#if> "
     template += "          </table> "
     template += "      </td> "
     template += "          <td style=\"border-left:solid 1px #000000;border-top:solid 1px #000000;border-bottom:solid 1px #000000;\"> "
     template += "         <table> "
     template += "         <tr><td><b>Pay Terms / <span class=\"arabicfont\" dir=\"rtl\">وقت الدفع المسبق </span> :</b> <#if record.custbody_payment_terms_arabic?has_content><span dir = \"rtl\">${record.custbody_payment_terms_arabic}</span><#else>${record.custbody_payment_terms}</#if></td></tr> "
     template += "         <#if record.duedate?string == \"\"> "
     template += "         <tr><td><b>Pay Due / <span class=\"arabicfont\" dir=\"rtl\">تاريخ الدفع </span> :</b> ${record.duedate}</td></tr> "
    + '         <#else><tr><td><b>Pay Due / <span class=\"arabicfont\" dir=\"rtl\">تاريخ الدفع </span> : </b> ${record.duedate?string["d.MM.yyyy"]}</td></tr> '
     template += "         </#if> "
     template += "         <tr><td><b>Sales Rep / <span class=\"arabicfont\" >مندوب المبيعات</span> : </b> ${record.salesrep.entityid} ${record.salesrep.firstname}</td></tr> "
     template += "         <tr><td><b>Site / <span class=\"arabicfont\" dir=\"rtl\">الموقع</span> : </b> ${record.custbody_site}</td></tr> "
     template += "         </table> "
     template += "         </td> "
     template += "         <td style=\"border-left:solid 1px #000000;border-top:solid 1px #000000;border-bottom:solid 1px #000000;border-right:solid 1px #000000;width:259px;\"> "
     template += "         <#if record.custbody_bank_details?has_content><span>${record.custbody_bank_details}</span></#if> "
     template += "         <br/> "
     template += "        <b style=\"font-size:10px;\">All bank transfer charges to be borne by customer</b> "
     template += "      </td> "
     template += "      </tr></table> "
     template += "          <table style=\"width:100%;\"> "
     template += "            <tr><td style=\"width:20%;\"><b>Scope of work <span class=\"arabicfont\" dir=\"rtl\">نوع العمل</span></b></td><td style=\"width:1%;\"><b>:</b></td><td style=\"width:74%;\">${record.custbody_scope_of_work}</td></tr> "
     template += "          </table> "
     template += "        	</macro> "

      template += "        	<macro id=\"nlfooter\"> "
      template += "       "
      template += "        	</macro> "
      template += "    </macrolist> "
      template += "    <style type=\"text/css\">table "
     + '{        <#if .locale == "zh_CN"> ';
      template += "            font-family: stsong, sans-serif; "
     + '        <#elseif .locale == "zh_TW"> '
      template += "            font-family: msung, sans-serif; "
     + '        <#elseif .locale == "ja_JP"> '
      template += "            font-family: heiseimin, sans-serif; "
     + '        <#elseif .locale == "ko_KR"> '
      template += "            font-family: hygothic, sans-serif; "
     + '        <#elseif .locale == "ru_RU"> '
      template += "            font-family: verdana; "
      template += "        <#else> "
      template += "            font-family: Amiri-font, sans-serif; "
      template += "        </#if> "
      template += "            font-size: 10pt; "
      template += "            table-layout: fixed; "
      template += "        } "
      template += "        th "
      template += "{            font-weight: bold; "
      template += "            font-size: 9pt; "
      template += "            vertical-align: middle; "
      template += "            padding: 5px 6px 3px; "
      template += "            background-color: #e3e3e3; "
      template += "            color: #000000; "
      template += "        } "
      template += "        td p { align:left; } "
      template += "        /*td { "
      template += "    padding: 4px 6px; "
      template += "}*/ "
      template += "        b "
      template += "{            font-weight: bold; "
      template += "            color: #000000; "
      template += "        } "
      template += "        table.header td "
      template += "{            padding: 0px; "
      template += "            font-size: 10pt; "
      template += "        } "
      template += "        table.footer td "
      template += "{            padding: 0px; "
      template += "            font-size: 9pt; "
      template += "        } "
      template += "        table.itemtable th "
      template += "{            padding-bottom: 10px; "
      template += "            padding-top: 10px; "
      template += "        } "
      template += "        table.body td "
      template += "{            padding-top: 2px; "
      template += "        } "
      template += "        table.total "
      template += "{            page-break-inside: avoid; "
      template += "        } "
      template += "        tr.totalrow "
      template += "{            background-color: #e3e3e3; "
      template += "            line-height: 200%; "
      template += "        } "
      template += "        td.totalboxtop "
      template += "{            font-size: 12pt; "
      template += "            background-color: #e3e3e3; "
      template += "        } "
      template += "        td.addressheader "
      template += "{            font-size: 8pt; "
      template += "            padding-top: 6px; "
      template += "            padding-bottom: 2px; "
      template += "        } "
      template += "        td.address "
      template += "{            padding-top: 0px; "
      template += "        } "
      template += "        td.totalboxmid "
      template += "{            font-size: 28pt; "
      template += "            padding-top: 20px; "
      template += "            background-color: #e3e3e3; "
      template += "        } "
      template += "        td.totalboxbot "
      template += "{            background-color: #e3e3e3; "
      template += "            font-weight: bold; "
      template += "        } "
      template += "        span.title "
      template += "{            font-size: 28pt; "
      template += "        } "
      template += "        span.number "
      template += "{            font-size: 16pt; "
      template += "        } "
      template += "        span.itemname "
      template += "{            font-weight: bold; "
      template += "            line-height: 150%; "
      template += "        } "
      template += "        hr "
      template += "{            width: 100%; "
      template += "            color: #d3d3d3; "
      template += "            background-color: #d3d3d3; "
      template += "            height: 1px; "
      template += "        } "
      template += "      span.arabicfont "
      template += "{            font-family: arabic-font, sans-serif; "
      template += "            font-size: 9pt; "
      template += "            table-layout: fixed; "
      template += "            direction:rtl; "
      template += "      } "
      template += "</style> "
      template += "</head> "
       template += "  <#if (record.entity.altname?length lt 59 && record.custbody_attention?length lt 59 && record.custbody_scope_of_work?length lt 59 && record.entity.address?length lt 100) > "
       template += "  		<body header=\"nlheader\" header-height=\"40%\" footer=\"nlfooter\" footer-height=\"9%\" size=\"A4\" padding=\"0.2in 0.2in 0.2in 0.2in\"> "
       template += "     <#else> "
       template += "    	<body header=\"nlheader\" header-height=\"44%\" footer=\"nlfooter\" footer-height=\"9%\" size=\"A4\" padding=\"0.2in 0.2in 0.2in 0.2in\"> "
       template += "   </#if> "
       template += "<#assign taxAmt = 0 /> "
       template += "<#if record.item?has_content> "
       template += "<table class=\"itemtable\" style=\"width: 100%; top:100px;border:1px solid #000000;font-size:10px;\"><!-- start items --><#list record.item?reverse as item><#if item_index==0> "
       template += "<thead> "
       template += "     <tr> "
       template += "         <td align=\"center\" colspan=\"5\" style=\"border-bottom:solid 1px #000000;font-weight:bold;\">TS Date<br/><span class=\"arabicfont\" dir=\"rtl\">تاريخ العمل</span></td> "
       template += "         <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">TS No.<br/><span class=\"arabicfont\" dir=\"rtl\">الرقم</span></td> "
       template += "         <td align=\"center\" colspan=\"12\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Description<br/><span class=\"arabicfont\" dir=\"rtl\">الوصف</span></td> "
       template += "         <td align=\"center\" colspan=\"4\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Unit<br/><span class=\"arabicfont\" dir=\"rtl\">الوحدة</span></td> "
       template += "         <td align=\"center\" colspan=\"5\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Unit Price<br/><span class=\"arabicfont\" dir=\"rtl\">قيمة الوحدة</span></td> "
       template += "         <td align=\"center\" colspan=\"5\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">&nbsp;"
       template += "&nbsp;"
      
      
  
       template += "&nbsp;"
      
      
     
       template += "&nbsp;"
      
      
    
       template += "Amount<br/>(Excl. of VAT)<br/><span class=\"arabicfont\" dir=\"rtl\">المبلغ قبل الضريبة</span></td> "
       template += "         <td align=\"center\" colspan=\"3\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">VAT %<br/><span class=\"arabicfont\" dir=\"rtl\">نسبة الضريبة</span></td> "
       template += "         <td align=\"center\" colspan=\"5\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">VAT Amount<br/><span class=\"arabicfont\" dir=\"rtl\">قيمة الضريبة</span></td> "
       template += "         <td align=\"center\" colspan=\"5\" style=\"border-left:solid 1px #000000;border-bottom:solid 1px #000000;font-weight:bold;\">Total ${item.amount@label} <br/>&nbsp;";
      
      
     
       template += "&nbsp;"
      
      
       template += "&nbsp;"
      
      
       template += "&nbsp;"
      
      
    
       template += "&nbsp;"
      
      
    
       template += "&nbsp;"
      
      
    
       template += "&nbsp;"
      
      
     
       template += "(${record.currencysymbol})<br/><span class=\"arabicfont\" dir=\"rtl\">المبلغ الاجمالي</span></td> "
       template += "      </tr> "
       template += "   </thead> "
       template += "</#"
      
      
     
       template += "if> "
       template += "  <#if item.itemtype?string == 'Discount'> "
       template += "       <tr> "
       template += "      <td align=\"right\" colspan=\"5\" style=\"padding:5px;\">&nbsp;"
      
      
     
       template += "</td> "
       template += "      <td align=\"right\" colspan=\"4\" style=\"padding:5px;border-left:solid 1px #000000;\">&nbsp;"
      
      
     
       template += "</td> "
       template += "      <td align=\"left\" colspan=\"12\" style=\"padding:5px;border-left:solid 1px #000000;\">${item.description}<br/><span class=\"arabicfont\" dir=\"rtl\">${item.custcol_arabic_description}</span</td> "
       template += "      <td align=\"right\" colspan=\"4\" style=\"padding:5px;border-left:solid 1px #000000;\">&nbsp;"
  
      
     
       template += "</td> "
       template += "      <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-left:solid 1px #000000;\">&nbsp;";
      
      
  
       template += "</td> "
       template += "      <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-left:solid 1px #000000;\">&nbsp;"
      
     
       template += "</td> "
       template += "      <td align=\"right\" colspan=\"3\" style=\"padding:5px;border-left:solid 1px #000000;\">&nbsp;"
      
      
      
       template += "</td> "
       template += "      <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
      + '      <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-left:solid 1px #000000;\">(${item.amount?string?replace("-","")})</td> '
       template += "   	   </tr> "
       template += "    <#else> "
       template += "        "
       template += "  <tr> "
       template += "     "
       template += "     <#"
       template += "if item.rate == 0> "
       template += "     <td colspan=\"5\" style=\"text-align:center;\">&nbsp;"
       template += "<br/><span style=\"text-align:center;\">&nbsp;"
       template += "&nbsp;"
       template += "&nbsp;"
       template += "&nbsp;"
       template += "&nbsp;"
       template += "&nbsp;"
       template += "&nbsp;"
       template += "<#"
       template += "if item.custcol_ts_edate?has_content>&nbsp;"
       template += "</#"
       template += "if></span><br/>&nbsp;"
       template += "</td> "
       template += " <#else> "
       template += "   <td colspan=\"5\" style=\"text-align:center;\"><#"
      + 'if item.custcol_ts_sdate?string == \"\">${item.custcol_ts_sdate}<#else>${item.custcol_ts_sdate?string["d.MM.yyyy"]}</#if><br/><#if item.custcol_ts_edate?string != \"\">&nbsp;'
       template += "&nbsp;"
       template += "&nbsp;"
       template += "&nbsp;"
       template += "&nbsp;"
       template += "To</#"
      + 'if><br/><#if item.custcol_ts_edate?string == \"\">${item.custcol_ts_edate}<#else>${item.custcol_ts_edate?string["d.MM.yyyy"]}</#if></td> '
       template += "    </#if> "
       template += "   <td colspan=\"4\" style=\"border-left:solid 1px #000000;\">${item.custcol_ts_number}</td> "
       template += "    <#if item.rate == 0> "
       template += "     <td colspan=\"12\" style=\"border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
       template += "     <td colspan=\"4\" style=\"border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
       template += "    <#else> "
       template += "   <td colspan=\"12\" style=\"border-left:solid 1px #000000;\">${item.description}<br/><span class=\"arabicfont\" dir = \"rtl\">${item.custcol_arabic_description}</span></td> "
       template += "   <td colspan=\"4\" style=\"border-left:solid 1px #000000;\">${item.custcol_ts_units}</td> "
       template += "    </#"
       template += "if> "
       template += "   <#if item.rate == 0> "
       template += "      <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
       template += "      <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
       template += "      <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
       template += "      <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
       template += "      <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
       template += "      <#else> "
      + '       <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">${item.rate?string["#,##0.00"]}</td> '
      + '        <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">${item.amount?string["#,##0.00"]}</td> '
      + '        <td align=\"right\" colspan=\"3\" style=\"border-left:solid 1px #000000;\">${item.taxrate1}</td> '
      + '        <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">${item.tax1amt?string["#,##0.00"]}</td> '
      + '        <td align=\"right\" colspan=\"5\" style=\"border-left:solid 1px #000000;\">${item.grossamt?string["#,##0.00"]}</td> '
       template += "  </#"
       template += "if> "
       template += "     <#assign taxAmt = taxAmt + item.tax1amt /> "
       template += "   </tr></#if> "
       template += "	</#list><!-- end items --> "
       template += "    "
       template += "       <#if record.discountitem?has_content> "
       template += "       <tr> "
       template += "      <td align=\"left\" colspan=\"30\" style=\"padding:5px;border-top:solid 1px #000000;\">${record.custbody_discount_description}</td> "
      + '      <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\">(${record.discounttotal?string?replace("-","")})</td> '
       template += "      <td align=\"right\" colspan=\"3\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\">${record.item[0].taxrate1}</td> "
      + '      <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\">${(taxAmt - record.taxtotal)?string["#,##0.00"]}</td> '
      + '      <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-left:solid 1px #000000;border-top:solid 1px #000000;\">(${(record.discounttotal - (taxAmt - record.taxtotal))?string?replace("-","")})</td> '
       template += "   	   </tr> "
       template += "       </#if> "
       template += "       <#if record.custbody_exclude_amt_words?string == 'Yes' && record.custbody_include_custom_amt_words?string == 'No'> "
       template += "       <tr> "
       template += "       <td align=\"left\" colspan=\"30\" style=\"padding:5px;border-top:solid 1px #000000;\">&nbsp;"
       template += "</td> "
      + '       <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${(record.subtotal + record.discounttotal)?string["#,##0.00"]}</b></td> '
       template += "       <td align=\"right\" colspan=\"3\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
      + '       <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${record.taxtotal?string["#,##0.00"]}</b></td> '
      + '       <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${record.total?string["#,##0.00"]}</b></td> '
       template += "       </tr> "
       template += "         <#elseif record.currencysymbol != \"SAR\"> "
       template += "          "
       template += "       <tr> "
       template += "       <td align=\"left\" colspan=\"30\" style=\"padding:5px;border-top:solid 1px #000000;\"><b>Amount in words : <#"
       template += "if record.custbody_include_custom_amt_words?string == 'Yes'><i><span dir = \"rtl\">${record.currencysymbol} ${record.custbody_custom_amt_in_words}</span></i><#else><i>${record.currencysymbol} ${record.custbody_amount_into_words?capitalize}</i></#if></b></td> "
      + '       <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${(record.subtotal + record.discounttotal)?string["#,##0.00"]}</b></td> '
       template += "       <td align=\"right\" colspan=\"3\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
      + '       <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${record.taxtotal?string["#,##0.00"]}</b></td> '
      + '       <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${record.total?string["#,##0.00"]}</b></td> '
       template += "       </tr> "
       template += "        <tr> "
       template += "        <td align=\"left\" colspan=\"48\" style=\"padding:5px;border-top:solid 1px #000000;\"><span class=\"arabicfont\" dir=\"rtl\">${record.custbody_amount_in_words_arabic} : المبلغ بالكلمات</span></td> "
       template += "       </tr> "
       template += " "
       template += "        <#elseif record.currencysymbol == \"SAR\" && record.custbody_amount_in_words_english_sar?has_content> "
       template += "         "
       template += "         <tr> "
       template += "        <td align=\"left\" colspan=\"30\" style=\"padding:5px;border-top:solid 1px #000000;\"><b>Amount in"
       template += "words:&nbsp;"
       template += "${record.custbody_amount_in_words_english_sar}</b></td> "
       template += "        <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${(record.subtotal + record.discounttotal)?string[\"#,##0.00\"]}</b></td> "
       template += "       <td align=\"right\" colspan=\"3\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\">&nbsp;"
       template += "</td> "
       template += "       <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${record.taxtotal?string[\"#,##0.00\"]}</b></td> "
       template += "       <td align=\"right\" colspan=\"5\" style=\"padding:5px;border-top:solid 1px #000000;border-left:solid 1px #000000;\"><b>${record.total?string[\"#,##0.00\"]}</b></td> "
       template += "       </tr> "
       template += " "
       template += " <#"
       template += "if record.currencysymbol == \"SAR\" && record.custbody_amount_in_words_arabic_sar?has_content> "
       template += " "
       template += "        <tr> "
       template += "        <td align=\"left\" colspan=\"48\" style=\"padding:5px;border-top:solid 1px #000000;\"><b><span class=\"arabicfont\" dir=\"rtl\">${record.custbody_amount_in_words_arabic_sar} : المبلغ بالكلمات</span></b></td> "
       template += "       </tr> "
       template += " </#if> "
       template += " "
       template += "       </#if> "
       template += "       </table> "
       template += "</#if> "
       template += "    <table style=\"width:100%;top:120px;\"> "
       template += "       <tr><td align=\"right\"><b>E. &#38;"
       template += "O.E.</b></td></tr> "
       template += "    </table> "
       template += "    <!--<table style=\"width:100%;\"> "
       template += "      <#"
      
      
     
       template += "if record.custbody_bank_details?has_content><tr><td style=\"font-size:11px;width:25%;font-weight:bold;\">Please arrange payment to :</td><td style=\"font-size:11px;width:75%;font-weight:bold;\">${record.custbody_bank_details}</td></tr> "
       template += "      <tr><td style=\"font-size:11px;width:25%;\">&nbsp;"
      
      
      
       template += "</td><td style=\"font-size:11px;width:75%;font-weight:bold;\">All bank transfer charges to be borne by customer</td> "
       template += "     </tr></#"
      
      
    
       template += "if> "
       template += "    </table>--> "
       template += "    <table style=\"width:100%;top:70px;\"> "
       template += "     <tr><td style=\"line-height:75px;\">&nbsp;"
      
      
     
       template += "</td></tr> "
       template += "     <tr> "
       template += "      <td style=\"font-weight:bold;\" align=\"left\">Company Stamp :<span class=\"arabicfont\" dir = \"rtl\">ختم الشركة</span></td> "
       template += "    <!-- <#"
      
      
      
       template += "if record.custbody_subsidiary_legal_name?has_content><td style=\"width:330px;font-weight:bold;\" align=\"center\">&nbsp;"
      
      
    
       template += "For ${record.custbody_subsidiary_legal_name}<br/><span dir = \"rtl\">${record.subsidiary.custrecord_arabic_legalname}</span></td> "
       template += "     <#else> "
       template += "     <td style=\"width:330px;font-weight:bold;\" align=\"center\">&nbsp;"
      
      
      
       template += "For ${record.subsidiary.legalname}<br/><span dir = \"rtl\">${record.subsidiary.custrecord_arabic_legalname}</span></td> "
       template += "     </#"
      
      
      
       template += "if> --> "
       template += "      <#if record.location.internalid?string != '8'> <!-- EXCEPT for LOCATION -  Faris Al Arab Contracting Co--> "
       template += "        <#if record.custbody_subsidiary_legal_name?has_content> "
       template += "        <td style=\"width:330px;font-weight:bold;\" align=\"center\">&nbsp;"
      
      
       template += "For ${record.custbody_subsidiary_legal_name}<br/><span class=\"arabicfont\" dir = \"rtl\">${record.subsidiary.custrecord_arabic_legalname}</span></td> "
       template += "        <#else> "
       template += "        <td style=\"width:330px;font-weight:bold;\" align=\"center\">&nbsp;"
      
      
      
       template += "For ${record.subsidiary.legalname}<br/><span class=\"arabicfont\" dir = \"rtl\">${record.subsidiary.custrecord_arabic_legalname}</span></td> "
       template += "        </#"
      
      
     
       template += "if> "
       template += "     </#if> "
       template += "      <#if record.location.internalid?string == '8'> <!-- ONLY for LOCATION -  Faris Al Arab Contracting Co--> "
       template += "        <td style=\"width:330px;font-weight:bold;\" align=\"center\">&nbsp;"
      
      
      
       template += "For ${record.location.custrecord_location_legal_name}<br/><span class=\"arabicfont\" dir = \"rtl\">${record.location.custrecord_arabic_location_name}</span></td> "
       template += "     </#"
      
      
     
       template += "if> "
       template += "     </tr> "
       template += "  </table> "
       template += "   <table style=\"top:70px;\"> "
       template += "       <!--<tr><td style=\"width:336px;\" align=\"left\">Received By &nbsp;";
      
      
     
       template += "&nbsp;"
      
      
     
       template += "&nbsp;"
      
     
       template += ": &nbsp;"
      
      
     
       template += "&nbsp;"
      
      
     
       template += "&nbsp;"
      
      
       template += "_________________________________<br /><br />Received Date : &nbsp;"
      
   
       template += "&nbsp;"
      
      
  
       template += "&nbsp;"
      
 
       template += "_________________________________ </td></tr>--> "
       template += "       <tr><td style=\"width:75px;margin-top:5px;\" align=\"left\">Received By /</td><td style=\"width:100px;margin-top:5px;\" align=\"left\"><span class=\"arabicfont\" dir = \"rtl\">المستلم</span> : _________________________________</td></tr> "
       template += "       <tr><td style=\"width:75px;margin-top:5px;\" align=\"left\">Received Date / </td><td style=\"width:100px;margin-top:5px;\" align=\"left\"><span class=\"arabicfont\" dir = \"rtl\">تاريخ الاستلام</span> : ____________________________</td></tr> "
       template += "  </table> "
       template += "  <table style=\"width:100%;top:70px;\"> "
       template += "    <tr><td colspan=\"3\" style=\"font-size:10px;\"><br /><br /></td><td>______________<br/>Prepared by / <span class=\"arabicfont\" dir = \"rtl\">اعد بواسطة</span></td><td>______________<br/>Approved by / <span class=\"arabicfont\" dir = \"rtl\">اعتمد من قبل</span></td></tr> "
       template += "  </table> "
       template += "</body> "
       template += "</pdf>";
    renderer.setTemplate(template);
    renderer.addRecord('record', invoice);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'Invoice_lh'+invoice.getFieldValue("id")+'.pdf', 'inline');
    response.write(file.getValue());
   
  }