/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 

 */
define(['N/ui/serverWidget', 'N/log', 'N/record', 'N/search', '../../Amount  in Words Arabic/amount_in_words_arabic.js', 'N/format/i18n', 'N/encode'],

  function (serverWidget, log, record, search, arabic, format, encode) {

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */

    function printbeforeLoad(scriptContext) {
      var recid = scriptContext.newRecord.id;
      var currentRecord = scriptContext.newRecord
      subsidiary = currentRecord.getValue({
        fieldId: 'subsidiary',
    });
    location = currentRecord.getValue({
        fieldId: 'location',
    });
   
    
      if (scriptContext.type == "view") {
        if ((subsidiary == "8" || subsidiary == "16") && (location == "8" || location == "21") ) {
          log.debug("getting inside new print button")
          scriptContext.form.addButton({
            id: 'custpage_new_credit_memo_pdf',
            label: 'New Credit Memo',
            functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=' + 3006 + '&deploy=1&recordID=' + recid + '&end=true\')'
          });

        }
      }
    }

    function AfterSubmitAction(scriptContext) {
      // Code section : 2
      //  Updating Invoice amount in Sales order
      try {
        var invRec = scriptContext.newRecord;
        var fieldLookUp = search.lookupFields({
          type: search.Type.TRANSACTION,
          id: invRec.id,
          columns: 'recordtype'
        });
        var invoiceRecord = record.load({
          type: fieldLookUp.recordtype,
          id: invRec.id,
          isDynamic: true
        });
        //  log.debug("invoiceRecord", invoiceRecord);
        // var recordType = scriptContext.newRecord.type;

        // log.debug("recordType", recordType);

        var subsidiary = invoiceRecord.getValue({ fieldId: 'subsidiary' });
        //   log.debug(' subsidiary', subsidiary);
        var val = "";
        var QRCodeData1 = "";
        var QRCodeData2 = "";
        var QRCodeData3 = "";
        var QRCodeData4 = "";
        var QRCodeData5 = "";

        var subsidiaryRec = record.load({
          type: 'subsidiary',
          id: subsidiary,
          isDynamic: true
        });

        var federalidnumber = subsidiaryRec.getValue({ fieldId: 'federalidnumber' });
        var legalname = subsidiaryRec.getValue({ fieldId: 'legalname' });

        QRCodeData1 = legalname.toString();
        QRCodeData2 = federalidnumber.toString();

        var createddate = invoiceRecord.getValue({ fieldId: 'createddate' });
        createddate = createddate.toISOString();
        var total = invoiceRecord.getValue({ fieldId: 'total' });
        var taxtotal = invoiceRecord.getValue({ fieldId: 'taxtotal' });

        QRCodeData3 = createddate.toString();

        QRCodeData4 = total.toFixed(2).toString();

        QRCodeData5 = taxtotal.toFixed(2).toString();

        var str1 = convertDecToHex('01', QRCodeData1);
        var str2 = convertDecToHex('02', QRCodeData2);
        var str3 = convertDecToHex('03', QRCodeData3);
        var str4 = convertDecToHex('04', QRCodeData4);
        var str5 = convertDecToHex('05', QRCodeData5);

        //converting string to hex
        var hexQRCode = str1 + QRCodeData1.hexEncode() + str2 + QRCodeData2.hexEncode() + str3 + QRCodeData3.hexEncode() + str4 + QRCodeData4.hexEncode() + str5 + QRCodeData5.hexEncode();

        log.debug(' hexQRCode', hexQRCode);

        //string to Base64
        var d1 = convertStringToDifferentEncoding(hexQRCode);
        log.debug('d1', d1);
        var d2 = converting(d1);
        log.debug('d2', d2);


        //  var currentRecord = scriptContext.newRecord;
        //  var objRecord = record.load({
        //     type: "creditmemo",
        //     id: currentRecord.id
        //    });

        var total = invoiceRecord.getValue({
          fieldId: 'total'
        });

        var Amt = invoiceRecord.getValue({
          fieldId: 'total'
        });
        log.debug("Amt", Amt);
        var amtInWords = toWordsconver(Amt);
        log.debug("amtInWords", amtInWords);

        var amount = invoiceRecord.getValue({
          fieldId: 'total'
        });

        amount = parseFloat(amount);
        var numarray =
          [
            (amount > 0) ? Math.floor(amount) : Math.ceil(amount),
            amount % 1
          ];

        var beforeDecimal = numarray[0];
        var afterDecimal = numarray[1];
        afterDecimal = Number(afterDecimal).toFixed(2);
        afterDecimal = afterDecimal.toString();
        afterDecimal = afterDecimal.replace('0.', '');
        afterDecimal = Number(afterDecimal);

        var beforeDecimalWords = format.spellOut({
          number: beforeDecimal,
          locale: "en_EN"
        });
        var afterDecimalWords = format.spellOut({
          number: afterDecimal,
          locale: "en_EN"
        });
        log.debug("beforeDecimalWords", beforeDecimalWords);
        log.debug("afterDecimalWords", afterDecimalWords);
        if (afterDecimal > 0) {
          var engAmountWords = beforeDecimalWords + " Saudi Riyals and " + afterDecimalWords + " Halalas";
        } else {
          var engAmountWords = beforeDecimalWords + " Saudi Riyals Only";
        }
        engAmountWords = capitalize(engAmountWords, true);
        log.debug("engAmountWords", engAmountWords);

        var beforeDecimalWordsAr = format.spellOut({
          number: beforeDecimal,
          locale: "ar_AR"
        });
        var afterDecimalWordsAr = format.spellOut({
          number: afterDecimal,
          locale: "ar_AR"
        });
        log.debug("beforeDecimalWordsAr", beforeDecimalWordsAr);
        log.debug("afterDecimalWordsAr", afterDecimalWordsAr);
        if (afterDecimal > 0) {
          var arAmountWords = beforeDecimalWordsAr + "  ريالاً سعودياًو   و " + afterDecimalWordsAr + " هللة  ";
        } else {
          var arAmountWords = beforeDecimalWordsAr + "  ريالاً سعودياًو   فقط";
        }
        log.debug("arAmountWords", arAmountWords);


        invoiceRecord.setValue({ fieldId: 'custbody_qr_code_data', value: d1 });
        invoiceRecord.setValue({ fieldId: 'custbody_amount_in_words_english_sar', value: engAmountWords });
        invoiceRecord.setValue({ fieldId: 'custbody_amount_in_words_arabic_sar', value: arAmountWords });
        invoiceRecord.setValue({ fieldId: 'custbody_amount_in_words_arabic', value: amtInWords });

        var recordId = invoiceRecord.save({
          enableSourcing: false,
          ignoreMandatoryFields: false
        });

        // var otherId = record.submitFields({
        //   type: "creditmemo",
        //   id: currentRecord.id,
        //   values: {
        //     'custbody_amount_in_words_english_sar': engAmountWords,
        //       'custbody_amount_in_words_arabic_sar': arAmountWords,
        //       'custbody_amount_in_words_arabic':amtInWords,
        //       'custbody_qr_code_data':d1
        //   }
        // });

        //  var AmtInArabic = objRecord.setValue({
        //     fieldId: 'custbody_amount_in_words_arabic',
        //     value:amtInWords
        // });
        // objRecord.save();
      } catch (e) {
        log.debug("DEBUG", "error", e.message);
      }
    }
    function capitalize(string, a) {
      var tempstr = string.toLowerCase();
      if (a == false || a == undefined)
        return tempstr.replace(tempstr[0], tempstr[0].toUpperCase());
      else {
        return tempstr.split(" ").map(function (i) {
          return i[0].toUpperCase() + i.substring(1)
        }).join(" ");
      }
    }
    String.prototype.hexEncode = function () {
      var hex, i;

      var result = "";
      for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("" + hex).slice(-4);
      }

      return result;
    }




    function convertStringToDifferentEncoding(stringInput) {

      var base64EncodedString = encode.convert({
        string: stringInput,
        inputEncoding: encode.Encoding.HEX,
        outputEncoding: encode.Encoding.BASE_64
      });
      return base64EncodedString;

    }

    function converting(stringInput) {

      var base64EncodedString = encode.convert({
        string: stringInput,
        inputEncoding: encode.Encoding.BASE_64,
        outputEncoding: encode.Encoding.UTF_8
      });
      return base64EncodedString;

    }
    function convertDecToHex(tag, value) {
      var valueLen = value.length;
      if (valueLen < 16) {
        var lengthHex = tag + "0" + Number(valueLen).toString(16).toUpperCase(); // converting to Hex
      } else {
        var lengthHex = tag + Number(valueLen).toString(16).toUpperCase(); // converting to Hex
      }

      return lengthHex.toString();
    }
    return {
      beforeLoad: printbeforeLoad,
      afterSubmit: AfterSubmitAction
    };

  });