/* global Model,Stack */
'use strict';
if (!window.cam) {
    window.cam = {};
    if (!window.cam.service) {
        window.cam.service = {};
    }
}

window.cam.service.TransToCamPaxalih = function() {
    var self = this;
    var base = new window.cam.service.Paxalih();

    self._DASH = '-';
    self._trans_IM = '';
    self._trans_LU = '';
    self._trans_LW = '';
    self._trans_AI = '';
    self._trans_AO = '';
    self._trans_AU = '';

    self._transToKeycode = {};
    self._sapAtah = {};

    self.DoConvert = function(data, sourceType, destitionType) {
        // Validate inputed string
        var validString = [data];
        base.ValidateInput(validString, sourceType);
        data = validString[0];

        //Init Rumi To Cam data
        self.InitTransToCamData(sourceType, destitionType);

        //Contain converted
        var converted = [];

        //Trig newline character
        data = data.replace(/(?:\r\n|\r|\n)/g, ' \n ');
        // console.log('data', data);
        // data = data.replace(Model.Constant.NEW_LINE, ' ' + Model.Constant.NEW_LINE + ' ');

        //Plit to words array
        var words = data.split(' ');

        //Convert processing
        words.forEach(function(word) {
            // is newline character
            if (word == Model.Constant.NEW_LINE || !word) {
                converted.push(word);
                return;
            }

            var lstAkhar = self.ToKeyCodeByWord(word.toUpperCase(), sourceType);
            // console.log('lstAkhar', lstAkhar);
            var convertedWord = '';

            for (var i = 0; i < lstAkhar.length; i++) {
                var akhar = lstAkhar[i];
                switch (destitionType) {
                    case Model.Enum.FontYapata:
                        convertedWord += base._keyCodeToWaYapata[akhar].toString();
                        break;

                    case Model.Enum.FontKTT:
                        convertedWord += base._keyCodeToKTT[akhar].toString();
                        break;

                    case Model.Enum.FontGilaiPraong:
                        if (akhar == Model.AKhar.GakMatai) {
                            convertedWord += base._keyCodeToGilaiPraong[Model.AKhar.KakMatai].toString();
                        } else {
                            convertedWord += base._keyCodeToGilaiPraong[akhar].toString();
                        }
                        break;

                    case Model.Enum.FontCamEFEO:
                        if (akhar == Model.AKhar.TakaiKlakTakaiKuak) {
                            convertedWord += base._keyCodeToCamEFEO[Model.AKhar.TakaiKlak].toString();
                            convertedWord += base._keyCodeToCamEFEO[Model.AKhar.TakaiKuak].toString();
                        } else if (akhar == Model.AKhar.TakaiKlakTakaiKuk) {
                            convertedWord += base._keyCodeToCamEFEO[Model.AKhar.TakaiKlak].toString();
                            convertedWord += base._keyCodeToCamEFEO[Model.AKhar.TakaiKuk].toString();
                        } else if (akhar == Model.AKhar.GakMatai) {
                            convertedWord += base._keyCodeToCamEFEO[Model.AKhar.KakMatai].toString();
                        } else {
                            convertedWord += base._keyCodeToCamEFEO[akhar].toString();
                        }
                        break;

                    default:
                        if (akhar == Model.AKhar.TakaiKlakTakaiKuak) {
                            convertedWord += base._keyCodeToUniCamKur[Model.AKhar.TakaiKlak].toString();
                            convertedWord += base._keyCodeToUniCamKur[Model.AKhar.TakaiKuak].toString();
                        } else if (akhar == Model.AKhar.TakaiKlakTakaiKuk) {
                            convertedWord += base._keyCodeToUniCamKur[Model.AKhar.TakaiKlak].toString();
                            convertedWord += base._keyCodeToUniCamKur[Model.AKhar.TakaiKuk].toString();
                        } else {
                            convertedWord += base._keyCodeToUniCamKur[akhar].toString();
                        }
                        break;
                }
            }

            converted.push(convertedWord);
        });

        var result = converted.join(' ');

        // //Trig newline character
        // result = result.Replace(' ' + Model.Constant.NEW_LINE + ' ', Model.Constant.NEW_LINE);
        // console.log('result', result.split('\n'));

        return result.split('\n');
    };

    self.InitTransToCamData = function(sourceType) {

        base.InitTransToCamData(sourceType);
        self._transToKeycode = {};
        window.cam.service.Utility.SetTransToKeyCode(self._transToKeycode, sourceType);

        self._trans_IM = 'IM';
        self._trans_AI = 'AI';
        self._trans_LU = 'LU';
        switch (sourceType) {
            case Model.Enum.TransCamEFEO:
                self._trans_LW = 'LU';
                self._trans_AO = 'AO';
                self._trans_AU = 'AU';
                break;

            default:
                self._trans_LW = 'LW';
                self._trans_AO = 'AU';
                break;
        }

        if (sourceType == Model.Enum.TransKawomTT) {
            self._sapAtah = window.cam.service.Utility.InitSapAtah();
        }
    };

    self.ToKeyCodeByWord = function(word, sourceType) {
        try {
            var ret = [];
            var kanaingAtFirst = new Stack();
            var kanaingAtLast = new Stack();

            var addLastCharProcess = true;
            var wordArr = word.split(self._DASH);
            wordArr.forEach(function(item) {
                var wordAkhar = [];
                var wordStr = item;
                wordStr = [wordStr];

                //Cut kanaing at first and last word
                kanaingAtFirst = self.CutKanaingAtFirst(wordStr);
                kanaingAtLast = self.CutKanaingAtLast(wordStr);

                //Specail word
                if (base._kareiCrih[wordStr[0]]) {
                    wordAkhar = window.cam.service.Utility.CopyListAkhar(base._kareiCrih[wordStr[0]]);

                    // add kanaing at first and last word
                    window.cam.service.Utility.PopStackToList(wordAkhar, kanaingAtFirst, true);
                    window.cam.service.Utility.PopStackToList(wordAkhar, kanaingAtLast, false);

                    wordAkhar.forEach(function(item) {
                        ret.push(item);
                    });
                    addLastCharProcess = false;
                    return;
                }

                addLastCharProcess = true;
                var retForCode = [];
                var prevChar = [Model.AKhar.Square];

                var roundCount = 0;
                while (wordStr[0]) {
                    if (roundCount == Model.Constant.MAX_ROUND) {
                        break;
                    }

                    //convert to keycode
                    switch (sourceType) {
                        case Model.Enum.TransCamEFEO:
                            self.ToKeycodeFromCamEFEO(wordStr, wordAkhar, retForCode);
                            break;

                        case Model.Enum.TransInrasara:
                            self.ToKeycodeFromInrasara(wordStr, wordAkhar, retForCode);
                            break;

                        default:
                            self.ToKeycodeFromKTT(wordStr, wordAkhar, retForCode, prevChar);
                            break;
                    }
                }

                // console.log('wordAkhar', wordAkhar);
                wordAkhar.forEach(function(item) {
                    ret.push(item);
                });
                roundCount++;
            });

            //add balau on the last char
            if (ret.length != 0 && addLastCharProcess) {
                var indexLastChar = base.GetIndexLastChar(ret);
                var lastAkhar = ret[indexLastChar];
                if ((base.IsAkharDiip(lastAkhar) || base.IsTakaiLikuk(lastAkhar)) &&
                    ret.indexOf(Model.AKhar.DarDua.toString()) == -1 &&
                    !(lastAkhar == Model.AKhar.TakaiThek && indexLastChar > 0 && ret[indexLastChar - 1] == Model.AKhar.TakaiKuk)) {
                    ret.splice(indexLastChar + 1, 0, Model.AKhar.Balau);
                }

                if (ret.length != 0 && base._takaiDaokLikuk[ret[0]]) {
                    ret.splice(0, 0, Model.AKhar.Ak);
                }
            }

            // add kanaing at first and last word
            window.cam.service.Utility.PopStackToList(ret, kanaingAtFirst, true);
            window.cam.service.Utility.PopStackToList(ret, kanaingAtLast, false);

            return ret;
        } catch (err) {
            console.log('ToKeyCodeByWord', err);
            return [];
        }
    };

    self.CutKanaingAtFirst = function(value) {

        var ret = new Stack();
        var roundCount = 0;
        while (value[0]) {
            if (roundCount == Model.Constant.MAX_ROUND) {
                break;
            }

            var achar = value[0].substr(0, 1);
            if (!base._kanaingChars[achar]) {
                break;
            }

            var listKanaing = self._transToKeycode[achar];
            if (listKanaing) {
                ret.push(listKanaing[0]);
            }

            value[0] = value[0].substr(1);
            roundCount++;
        }

        return ret;
    };

    self.CutKanaingAtLast = function(value) {

        var ret = new Stack();
        var roundCount = 0;
        while (value[0]) {
            if (roundCount == Model.Constant.MAX_ROUND) {
                break;
            }

            var achar = value[0].substr(value[0].length - 1, 1);
            if (!base._kanaingChars[achar]) {
                break;
            }

            var listKanaing = self._transToKeycode[achar];
            if (listKanaing) {
                ret.push(listKanaing[0]);
            }

            value[0] = value[0].substr(0, value[0].length - 1);
            roundCount++;
        }

        return ret;
    };

    self.ToKeycodeFromCamEFEO = function(word, ret, retForCode) {
        var akharList = self.ToKeyCodeByChar(word, retForCode);
        // console.log('akharList', akharList);
        for (var i = 0; i < akharList.length; i++) {
            var akhar = akharList[i];
            if (akhar == Model.AKhar.Ak && !base.HuLanglikuk(retForCode) && ret.length != 0) {
                retForCode.push(akhar);
                continue;
            }

            //Get the next akhar
            var nextAkhar = Model.AKhar.Square;
            if (word[0]) {
                nextAkhar = self.GetNextChar(word);
            }

            //curent char is "i" or "é" and the next char is akhar matai
            if (word[0]) {
                //Convert akhar diip to takai akhar
                if (base._diipToTaKai[akhar] && !base._diipToMaTai[nextAkhar] &&
                    !base.HuLanglikuk(retForCode) && ret.length != 0 &&
                    !base.Check_AkharMatai(ret[ret.length - 1])) {

                    if (!((akhar == Model.AKhar.Rak && ret.length != 0 &&
                                base.IsVowels(ret[ret.length - 1])) ||
                            ((akhar == Model.AKhar.Ik || akhar == Model.AKhar.Uk) &&
                                base.IsConsonant(nextAkhar) && !base._diipToMaTai[nextAkhar]))) {

                        akhar = base._diipToTaKai[akhar];
                    }
                }

                //"u","o"
                if ((akhar == Model.AKhar.Ok || akhar == Model.AKhar.Uk) &&
                    !base.HuLanglikuk(retForCode) && ret.length != 0) {

                    if (akhar == Model.AKhar.Ok) {
                        akhar = Model.AKhar.DarSa;
                    } else {
                        akhar = Model.AKhar.TakaiKuk;
                    }
                }

                //Convert akhar diip to sap paoh
                if ((base._diipToMaTai[nextAkhar] && !base.HuLanglikuk(retForCode) && ret.length != 0) ||
                    (base.IsConsonant(nextAkhar) && !base._diipToMaTai[nextAkhar])) {
                    if (akhar == Model.AKhar.Ik && ret.length != 0) {
                        akhar = Model.AKhar.TakaiKik;
                    } else if (akhar == Model.AKhar.É) {
                        akhar = Model.AKhar.DarSa;
                        akharList.push(Model.AKhar.TakaiThek);
                    }
                }

                //TaikaiKlakTaikaiKuak & TaikaiKlakTaikaiKuk
                if (akhar == Model.AKhar.TakaiKlakTakaiKuak) {
                    if (!base.IsSapPaoh(nextAkhar)) {
                        akhar = Model.AKhar.TakaiKlakTakaiKuk;
                    }
                }

                //Mâk, Nâk, Nyâk, Ngâk
                if (base._consonantKareiCrih[akhar] && nextAkhar == Model.AKhar.Ak) {
                    akhar = base._consonantKareiCrih[akhar];
                }
            }

            //Sap paoh deng anak akhar
            var index = ret.length;
            var indexForCode = retForCode.length;
            if (akhar == Model.AKhar.DarSa || akhar == Model.AKhar.DarDua ||
                akhar == Model.AKhar.TakaiKrak) {
                index = base.GetIndexAkharDiip(ret);

                //fix have taikai Krak
                if (index > 0 && ret[index - 1] == Model.AKhar.TakaiKrak) {
                    index--;
                }

                indexForCode = base.GetIndexAkharDiip(retForCode);

                //fix have taikai Krak
                if (indexForCode > 0 && retForCode[indexForCode - 1] == Model.AKhar.TakaiKrak) {
                    indexForCode--;
                }
            }

            //end the word
            if ((!word[0] || base._kanaingChars[word[0].substr(0, 1)]) && ret.length != 0) {
                //Convert akhar diip to akhar matai
                if (base._diipToMaTai[akhar]) {
                    akhar = base._diipToMaTai[akhar];
                    if (akhar == Model.AKhar.NgâkMatai) {
                        if (!base._sappaohAngaok[ret[ret.length - 1]]) {
                            akhar = Model.AKhar.PaohNgâk;
                        }

                        var indexAkharDiip = base.GetIndexAkharDiip(ret);
                        if (indexAkharDiip - 1 >= 0) {

                            var akharDengAnak = ret[indexAkharDiip - 1];
                            if (akharDengAnak == Model.AKhar.DarSa || akharDengAnak == Model.AKhar.DarDua) {
                                akhar = Model.AKhar.NgâkMatai;
                            }
                        }
                    }
                }

                //"i"
                if (akhar == Model.AKhar.Ik) {
                    akhar = Model.AKhar.TakaiKikTutTakaiMâkDalem;
                }

                //"é"
                if (akhar == Model.AKhar.É) {
                    akharList.push(Model.AKhar.DarSa);
                    akharList.push(Model.AKhar.BalauTapong);
                    continue;
                }

                //"o"
                if (akhar == Model.AKhar.Ok) {
                    akharList.push(Model.AKhar.DarSa);
                    continue;
                }

                //"u"
                if (akhar == Model.AKhar.Uk) {
                    akharList.push(Model.AKhar.TakaiKuk);
                    continue;
                }

                //"e"
                if (akhar == Model.AKhar.TakaiThek &&
                    !(akharList.length > 1 && akharList[akharList.length - 2] == Model.AKhar.TakaiKuk) &&
                    i == akharList.length - 1) {
                    akharList.push(Model.AKhar.BalauTapong);
                    continue;
                }
            }

            //Remove takai kâkk when have consonant KareiCrih
            if (akhar == Model.AKhar.TakaiKâk && ret.length != 0 && base._consonantKareiCrih[ret[base.GetIndexAkharDiip(ret)]]) {
                retForCode.splice(indexForCode, 0, akhar);
                continue;
            }

            ret.splice(index, 0, akhar);
            retForCode.splice(indexForCode, 0, akhar);
        }
    };

    self.ToKeycodeFromInrasara = function(word, ret, retForCode) {

        var akharList = self.ToKeyCodeByChar(word, retForCode);
        for (var i = 0; i < akharList.length; i++) {

            var akhar = akharList[i];
            if (akhar == Model.AKhar.Ak && !base.HuLanglikuk(retForCode) && ret.length != 0) {
                retForCode.push(akhar);
                continue;
            }

            //Get the next akhar
            var nextAkhar = Model.AKhar.Square;
            if (word[0]) {
                nextAkhar = self.GetNextChar(word);
            }

            //curent char is "i" or "é" and the next char is akhar matai
            if (word[0]) {
                //Convert akhar diip to takai akhar
                if (base._diipToTaKai[akhar] && !base._diipToMaTai[nextAkhar] &&
                    !base.HuLanglikuk(retForCode) && ret.length != 0 && !base.Check_AkharMatai(ret[ret.length - 1])) {

                    if (!((akhar == Model.AKhar.Rak && ret.length != 0 && base.IsVowels(ret[ret.length - 1])) ||
                            ((akhar == Model.AKhar.Ik || akhar == Model.AKhar.Wak) && base.IsConsonant(nextAkhar) && !base._diipToMaTai[nextAkhar]))) {

                        akhar = base._diipToTaKai[akhar];
                    }
                }

                //"u","o"
                if ((akhar == Model.AKhar.Ok || akhar == Model.AKhar.Uk) && !base.HuLanglikuk(retForCode) && ret.length != 0) {
                    if (akhar == Model.AKhar.Ok) {
                        akhar = Model.AKhar.DarSa;
                    } else {
                        akhar = Model.AKhar.TakaiKuk;
                    }
                }

                //Convert akhar diip to sap paoh
                if ((base._diipToMaTai[nextAkhar] && !base.HuLanglikuk(retForCode) && ret.length != 0) ||
                    (base.IsConsonant(nextAkhar) && !base._diipToMaTai[nextAkhar])) {
                    if (akhar == Model.AKhar.Ik && ret.length != 0) {
                        akhar = Model.AKhar.TakaiKik;
                    } else if (akhar == Model.AKhar.É) {
                        akhar = Model.AKhar.DarSa;
                        akharList.push(Model.AKhar.TakaiThek);
                    }
                }

                //TaikaiKlakTaikaiKuak & TaikaiKlakTaikaiKuk
                if (akhar == Model.AKhar.TakaiKlakTakaiKuak) {
                    if (!base.IsSapPaoh(nextAkhar)) {
                        akhar = Model.AKhar.TakaiKlakTakaiKuk;
                    }
                }

                //Mâk, Nâk, Nyâk, Ngâk
                if (base._consonantKareiCrih[akhar] && nextAkhar == Model.AKhar.Ak) {
                    akhar = base._consonantKareiCrih[akhar];
                }
            }

            //Sap paoh deng anak akhar
            var index = ret.length;
            var indexForCode = retForCode.length;
            if (akhar == Model.AKhar.DarSa || akhar == Model.AKhar.DarDua || akhar == Model.AKhar.TakaiKrak) {

                index = base.GetIndexAkharDiip(ret);
                //fix have taikai Krak
                if (index > 0 && ret[index - 1] == Model.AKhar.TakaiKrak) {
                    index--;
                }

                indexForCode = base.GetIndexAkharDiip(retForCode);

                //fix have taikai Krak
                if (indexForCode > 0 && retForCode[indexForCode - 1] == Model.AKhar.TakaiKrak) {
                    indexForCode--;
                }
            }

            //end the word
            if ((!word[0] || base._kanaingChars[word[0].substr(0, 1)]) && ret.length != 0) {
                //Convert akhar diip to akhar matai
                if (base._diipToMaTai[akhar]) {
                    akhar = base._diipToMaTai[akhar];
                    if (akhar == Model.AKhar.NgâkMatai) {
                        if (!base._sappaohAngaok[ret[ret.length - 1]]) {
                            akhar = Model.AKhar.PaohNgâk;
                        }

                        var indexAkharDiip = base.GetIndexAkharDiip(ret);
                        if (indexAkharDiip - 1 >= 0) {
                            var akharDengAnak = ret[indexAkharDiip - 1];
                            if (akharDengAnak == Model.AKhar.DarSa || akharDengAnak == Model.AKhar.DarDua) {
                                akhar = Model.AKhar.NgâkMatai;
                            }
                        }
                    }
                }

                //"i"
                if (akhar == Model.AKhar.Ik) {
                    akhar = Model.AKhar.TakaiKikTutTakaiMâkDalem;
                }

                //"é"
                if (akhar == Model.AKhar.É) {
                    akharList.push(Model.AKhar.DarSa);
                    akharList.push(Model.AKhar.BalauTapong);
                    continue;
                }

                //"o"
                if (akhar == Model.AKhar.Ok) {
                    akharList.push(Model.AKhar.DarSa);
                    continue;
                }

                //"u"
                if (akhar == Model.AKhar.Uk) {
                    akharList.push(Model.AKhar.TakaiKuk);
                    continue;
                }

                //"e"
                if (akhar == Model.AKhar.TakaiThek &&
                    !(akharList.length > 1 && akharList[akharList.length - 2] == Model.AKhar.TakaiKuk) &&
                    i == akharList.length - 1) {
                    akharList.push(Model.AKhar.BalauTapong);
                    continue;
                }
            }

            //Remove takai kâkk when have consonant KareiCrih
            if (akhar == Model.AKhar.TakaiKâk && ret.length != 0 && base._consonantKareiCrih[ret[base.GetIndexAkharDiip(ret)]]) {
                retForCode.splice(indexForCode, 0, akhar);
                continue;
            }

            ret.splice(index, 0, akhar);
            retForCode.splice(indexForCode, 0, akhar);
        }
    };

    self.ToKeycodeFromKTT = function(word, ret, retForCode, preChar) {
        var akharList = self.ToKeyCodeByChar(word, retForCode);
        for (var i = 0; i < akharList.length; i++) {
            var akhar = akharList[i];

            //Sap Atah Process
            if (retForCode.length != 0 && self._sapAtah[akhar] && akhar == preChar[0]) {
                var akharAtah = self._sapAtah[akhar];
                if (akharAtah == Model.AKhar.BalauTapong) {
                    ret.splice(ret.length - 1, 1);
                    retForCode.splice(retForCode.length - 1, 1);
                }

                ret.push(akharAtah);
                retForCode.push(akharAtah);
                continue;
            }

            //Set prev char
            preChar[0] = akhar;
            if (akhar == Model.AKhar.Ak && !base.HuLanglikuk(retForCode) && ret.length != 0) {
                retForCode.push(akhar);
                continue;
            }

            //Get the next akhar
            var nextAkhar = Model.AKhar.Square;
            if (word[0]) {
                nextAkhar = self.GetNextChar(word);
            }

            //curent char is "i" or "é" and the next char is akhar matai
            if (word[0]) {
                //Convert akhar diip to takai akhar
                if (base._diipToTaKai[akhar] && !base._diipToMaTai[nextAkhar] &&
                    !base.HuLanglikuk(retForCode) && ret.length != 0 && !base.Check_AkharMatai(ret[ret.length - 1])) {

                    if (!((akhar == Model.AKhar.Rak && ret.length != 0 && base.IsVowels(ret[ret.length - 1])) ||
                            ((akhar == Model.AKhar.Ik || akhar == Model.AKhar.Uk) &&
                                base.IsConsonant(nextAkhar) && !base._diipToMaTai[nextAkhar]))) {
                        akhar = base._diipToTaKai[akhar];
                    }
                }

                //"u","o"
                if ((akhar == Model.AKhar.Ok || akhar == Model.AKhar.Uk) && !base.HuLanglikuk(retForCode) && ret.length != 0) {
                    if (akhar == Model.AKhar.Ok) {
                        akhar = Model.AKhar.DarSa;
                    } else {
                        akhar = Model.AKhar.TakaiKuk;
                    }
                }

                //Convert akhar diip to sap paoh
                if ((base._diipToMaTai[nextAkhar] && !base.HuLanglikuk(retForCode) && ret.length != 0) ||
                    (base.IsConsonant(nextAkhar) && !base._diipToMaTai[nextAkhar])) {
                    if (akhar == Model.AKhar.Ik && ret.length != 0) {
                        akhar = Model.AKhar.TakaiKik;
                    } else if (akhar == Model.AKhar.É) {
                        akhar = Model.AKhar.DarSa;
                        akharList.push(Model.AKhar.TakaiThek);
                    }
                }

                //TaikaiKlakTaikaiKuak & TaikaiKlakTaikaiKuk
                if (akhar == Model.AKhar.TakaiKlakTakaiKuak) {
                    if (!base.IsSapPaoh(nextAkhar)) {
                        akhar = Model.AKhar.TakaiKlakTakaiKuk;
                    }
                }

                //Mâk, Nâk, Nyâk, Ngâk
                if (base._consonantKareiCrih[akhar] && nextAkhar == Model.AKhar.Ak) {
                    akhar = base._consonantKareiCrih[akhar];
                }
            }

            //Convert akhar ai to DarDua
            if (akhar == Model.AKhar.Ai && ret.length != 0 && base.IsConsonant(ret[ret.length - 1])) {
                akhar = Model.AKhar.DarDua;
            }

            //Sap paoh deng anak akhar
            var index = ret.length;
            var indexForCode = retForCode.length;
            if (akhar == Model.AKhar.DarSa || akhar == Model.AKhar.DarDua || akhar == Model.AKhar.TakaiKrak) {
                index = base.GetIndexAkharDiip(ret);
                //fix have taikai Krak
                if (index > 0 && ret[index - 1] == Model.AKhar.TakaiKrak) {
                    index--;
                }

                indexForCode = base.GetIndexAkharDiip(retForCode);
                //fix have taikai Krak
                if (indexForCode > 0 && retForCode[indexForCode - 1] == Model.AKhar.TakaiKrak) {
                    indexForCode--;
                }
            }

            //end the word
            if ((!word[0] || base._kanaingChars[word[0].substr(0, 1)]) && ret.length != 0) {
                //Convert akhar diip to akhar matai
                if (base._diipToMaTai[akhar]) {
                    akhar = base._diipToMaTai[akhar];
                    if (akhar == Model.AKhar.NgâkMatai) {
                        if (!base._sappaohAngaok[ret[ret.length - 1]]) {
                            akhar = Model.AKhar.PaohNgâk;
                        }

                        var indexAkharDiip = base.GetIndexAkharDiip(ret);
                        if (indexAkharDiip - 1 >= 0) {
                            var akharDengAnak = ret[indexAkharDiip - 1];
                            if (akharDengAnak == Model.AKhar.DarSa || akharDengAnak == Model.AKhar.DarDua) {
                                akhar = Model.AKhar.NgâkMatai;
                            }
                        }
                    }
                }

                //"i"
                if (akhar == Model.AKhar.Ik) {
                    akhar = Model.AKhar.TakaiKikTutTakaiMâkDalem;
                }

                //"é"
                if (akhar == Model.AKhar.É) {
                    akharList.push(Model.AKhar.DarSa);
                    akharList.push(Model.AKhar.BalauTapong);
                    continue;
                }

                //"o"
                if (akhar == Model.AKhar.Ok) {
                    akharList.push(Model.AKhar.DarSa);
                    continue;
                }

                //"u"
                if (akhar == Model.AKhar.Uk) {
                    akharList.push(Model.AKhar.TakaiKuk);
                    continue;
                }

                //"e"
                if (akhar == Model.AKhar.TakaiThek &&
                    !(akharList.length > 1 && akharList[akharList.length - 2] == Model.AKhar.TakaiKuk) &&
                    i == akharList.length - 1) {
                    akharList.push(Model.AKhar.BalauTapong);
                    continue;
                }
            }

            //Remove takai kâkk when have consonant KareiCrih
            if (akhar == Model.AKhar.TakaiKâk && ret.length != 0 && base._consonantKareiCrih[ret[base.GetIndexAkharDiip(ret)]]) {
                retForCode.splice(indexForCode, 0, akhar);
                continue;
            }

            ret.splice(index, 0, akhar);
            retForCode.splice(indexForCode, 0, akhar);
        }
    }

    self.ToKeyCodeByChar = function(value, retForCode) {

        var ret = [];
        var character = value[0];

        for (var i = character.length; i > 0; i--) {

            //fix "IM" is takai kik & akhar nâk | fix "LU" Is Akhar Lak
            //fix "AI" Is Akhar Ak
            if ((character == self._trans_IM && value[0].length > 2) ||
                (character == self._trans_LU && retForCode && (retForCode.length == 0 || base.HuLanglikuk(retForCode))) ||
                (character == self._trans_LW && retForCode && (retForCode.length == 0 || base.HuLanglikuk(retForCode))) ||
                (character == self._trans_AI && retForCode && (retForCode.length == 0 || base.HuLanglikuk(retForCode))) ||
                (character == self._trans_AO && retForCode && (retForCode.length == 0 || base.HuLanglikuk(retForCode))) ||
                (character == self._trans_AU && retForCode && (retForCode.length == 0 || base.HuLanglikuk(retForCode)))) {
                character = character.substr(0, character.length - 1);
                continue;
            }

            if (self._transToKeycode[character]) {
                ret = window.cam.service.Utility.CopyListAkhar(self._transToKeycode[character]);
                break;
            }

            character = character.substr(0, character.length - 1);
        }

        var cuttingIndex = character.length ? character.length : 1;
        value[0] = value[0].substr(cuttingIndex);
        return ret;
    };

    self.GetNextChar = function(word) {
        var ret = Model.AKhar.Square;
        var nextAkharList = self.ToKeyCodeByChar(word.slice());
        if (nextAkharList.length != 0) {
            ret = nextAkharList[0];
        }

        return ret;
    };
};
