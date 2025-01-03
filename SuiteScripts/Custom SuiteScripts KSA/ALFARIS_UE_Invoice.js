/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 

 */
define(['N/ui/serverWidget', 'N/log', 'N/record', 'N/search', '../../Amount  in Words Arabic/amount_in_words_arabic.js', 'N/format', 'N/format/i18n', 'N/encode','./moment.js', 'N/runtime'],

    function (serverWidget, log, record, search, arabic, format, format1, encode,moment, runtime) {



        function beforeSubmitAction(scriptContext) {
            // var cur_rec = scriptContext.newRecord;
            // var userrole = runtime.getCurrentUser().role;
            // log.debug("userrole", userrole);
            // var user = runtime.getCurrentUser().id;
            // log.debug("user", user);

            // if(userrole == "1005"){
            //     if(user){
            //         cur_rec.setValue({
            //             fieldId: 'custbody_created_by',
            //             value: user
            //            });
            //     }
              
            // }

        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */

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
               // log.debug(' federalidnumber', federalidnumber);
                var legalname = subsidiaryRec.getValue({ fieldId: 'legalname' });
             //   log.debug(' legalname', legalname);
                QRCodeData1 = legalname.toString();
                QRCodeData2 = federalidnumber.toString();

                var createddate = invoiceRecord.getValue({ fieldId: 'createddate' });
                log.debug("createddate111", createddate);

                createddate = createddate.toISOString();
                log.debug("createddate22222", createddate);


                var formattedTime = moment(createddate).subtract('hours',1).format("hh:mm");
                log.debug("formattedTime", formattedTime);

               

                // var your_date_object = new Date();
                //  your_date_object.setTime(Date.parse( date_string ));

                // var min = createddate.getUTCMinutes();
                // log.debug("min", min);
                // if (min < 10) {
                //     min = "0" + min;
                // }
                // var hour = createddate.getUTCHours();
                // log.debug("hour", hour);
                // if (hour < 10) {
                //     hour = "0" + hour;
                // }
                // var second = createddate.getUTCSeconds();
                // log.debug("second", second);
                // var entireTime = hour + ":" + min;
                // log.debug("entireTime", entireTime);

                //    var   parsedDateStringAsRawDateObject = format.format({
                //     value: createddate,
                //     type: format.Type.DATE
                //     });
                //     log.debug("parsedDateStringAsRawDateObject", parsedDateStringAsRawDateObject);



                //    var date1 = new Date(date);
                //    log.debug("date1",date1);

                // var formattedDate = format.parse({
                //     value: createddate,
                //     type: format.Type.DATE
                // });

                

                //  var   parsedDateStringAsRawDateObject = format.format({
                //     value: createddate,
                //     type: format.Type.DATE
                //     });

                //   log.debug("formattedDate",formattedDate);

                //   var time = formattedDate.getTime();

                //   // time = time.toISOString();
                //   log.debug("time", time);

                //    const  date1 = createddate.getDate();
                //    log.debug("date1",date1);

                var trandate = invoiceRecord.getValue({ fieldId: 'trandate' });
             //   log.debug("trandate", trandate);

                const dateObj = new Date(trandate);
                var month = dateObj.getUTCMonth() + 1;
                if (parseInt(month) < 10) {
                    month = "0" + month;
                  //  log.debug("month", month);
                }
                log.debug("month", month);
                var day1 = dateObj.getUTCDate();
                if (parseInt(day1) < 10) {
                    day1 = "0" + day1;
                }
              //  log.debug("day1", day1);
                var year1 = dateObj.getUTCFullYear();
               // log.debug("year1", year1);
                var entireDate = year1 + "-" + month + "-" + day1;
                log.debug("entireDate", entireDate);

                var qrdate = entireDate+" "+ formattedTime;
              //  var qrdate = entireDate;
                log.debug("qrdate", qrdate);

                // dateTime = dateTime.toISOString();
                var total = invoiceRecord.getValue({ fieldId: 'total' });
              //  log.debug("total", total);
                var taxtotal = invoiceRecord.getValue({ fieldId: 'taxtotal' });
              //  log.debug("taxtotal", taxtotal);
                QRCodeData3 = qrdate.toString();
             //   log.debug("QRCodeData3", QRCodeData3);
                QRCodeData4 = total.toFixed(2).toString();
             //   log.debug("QRCodeData4", QRCodeData4);
                QRCodeData5 = taxtotal.toFixed(2).toString();
             //   log.debug("QRCodeData5", QRCodeData5);
                var str1 = convertDecToHex('01', QRCodeData1);
             //   log.debug("str1", str1);
                var str2 = convertDecToHex('02', QRCodeData2);
             //   log.debug("str2", str2);
                var str3 = convertDecToHex('03', QRCodeData3);
             //   log.debug("str3", str3);
                var str4 = convertDecToHex('04', QRCodeData4);
             //   log.debug("str4", str4);
                var str5 = convertDecToHex('05', QRCodeData5);
             //   log.debug("str5", str5);
                //converting string to hex
                var hexQRCode = str1 + QRCodeData1.hexEncode() + str2 + QRCodeData2.hexEncode() + str3 + QRCodeData3.hexEncode() + str4 + QRCodeData4.hexEncode() + str5 + QRCodeData5.hexEncode();

             //   log.debug(' hexQRCode', hexQRCode);

                //string to Base64
                var d1 = convertStringToDifferentEncoding(hexQRCode);
                log.debug('d1', d1);
                var d2 = converting(d1);
                log.debug('d2', d2);

                // invoiceRecord.setValue({ fieldId: 'custbody_qr_code_data', value: d1 });

                // var recordId = invoiceRecord.save({
                //     enableSourcing: false,
                //     ignoreMandatoryFields: false
                // });


                // var currentRecord = scriptContext.newRecord;
                // var objRecord = record.load({
                //   type: record.Type.INVOICE,
                //   id: currentRecord.id
                // });
                var total = invoiceRecord.getValue({
                    fieldId: 'total'
                });

                var Amt = invoiceRecord.getValue({
                    fieldId: 'total'
                });
                //  log.debug("Amt", Amt);
                var amtInWords = toWordsconver(Amt);
                //  log.debug("amtInWords", amtInWords);


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

                var beforeDecimalWords = format1.spellOut({
                    number: beforeDecimal,
                    locale: "en_EN"
                });
                var afterDecimalWords = format1.spellOut({
                    number: afterDecimal,
                    locale: "en_EN"
                });
                //  log.debug("beforeDecimalWords", beforeDecimalWords);
                //  log.debug("afterDecimalWords", afterDecimalWords);
                if (afterDecimal > 0) {
                    var engAmountWords = beforeDecimalWords + " Saudi Riyals and " + afterDecimalWords + " Halalas";
                } else {
                    var engAmountWords = beforeDecimalWords + " Saudi Riyals Only";
                }
                engAmountWords = capitalize(engAmountWords, true);
                //  log.debug("engAmountWords", engAmountWords);

                var beforeDecimalWordsAr = format1.spellOut({
                    number: beforeDecimal,
                    locale: "ar_AR"
                });
                var afterDecimalWordsAr = format1.spellOut({
                    number: afterDecimal,
                    locale: "ar_AR"
                });
                //  log.debug("beforeDecimalWordsAr", beforeDecimalWordsAr);
                //   log.debug("afterDecimalWordsAr", afterDecimalWordsAr);
                if (afterDecimal > 0) {
                    var arAmountWords = beforeDecimalWordsAr + "  ريالاً سعودياًو   و " + afterDecimalWordsAr + " هللة  ";
                } else {
                    var arAmountWords = beforeDecimalWordsAr + "  ريالاً سعودياًو   فقط";
                }
                //  log.debug("arAmountWords", arAmountWords);


                invoiceRecord.setValue({ fieldId: 'custbody_qr_code_data', value: d1 });
                invoiceRecord.setValue({ fieldId: 'custbody_amount_in_words_english_sar', value: engAmountWords });
                invoiceRecord.setValue({ fieldId: 'custbody_amount_in_words_arabic_sar', value: arAmountWords });
                invoiceRecord.setValue({ fieldId: 'custbody_amount_in_words_arabic', value: amtInWords });

                var recordId = invoiceRecord.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: false
                });

                // var otherId = record.submitFields({
                //   type: invoiceRecord,
                //   id: currentRecord.id,
                //   values: {
                //     'custbody_amount_in_words_english_sar': engAmountWords,
                //     'custbody_amount_in_words_arabic_sar': arAmountWords,
                //     'custbody_amount_in_words_arabic': amtInWords,
                //    //'custbody_qr_code_data':d1
                //   }
                // });

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
            //  log.debug('tag-----1111------', tag);
            //  log.debug('value-----1111------', value);
          //  log.debug('valueLen-----1111------', valueLen);

            if (valueLen < 16) {
                var lengthHex = tag + "0" + Number(valueLen).toString(16).toUpperCase(); // converting to Hex
            } else {
                var lengthHex = tag + Number(valueLen).toString(16).toUpperCase(); // converting to Hex
            }

          //  log.debug('lengthHex-----1111------', lengthHex);


            return lengthHex.toString();
        }
        return {
            afterSubmit: AfterSubmitAction,
            // beforeSubmit : beforeSubmitAction
        };

    });