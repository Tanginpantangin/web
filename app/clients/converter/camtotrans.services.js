/* global Model,Stack */
'use strict';
if (!window.cam) {
    window.cam = {};
    if (!window.cam.service) {
        window.cam.service = {};
    }
}

window.cam.service.CamToTransPaxalih = function() {
    var self = this;
    var base = new window.cam.service.Paxalih();
    self._keyCodeToTrans = {};
    self._vowelKTT = {};

    self.DoConvert = function(data, sourceType, destinationType) {
        // Validate inputed string
        var validString = [data];
        base.ValidateInput(validString, sourceType);
        data = validString[0];

        //Init Cam to Rumi Data
        self.InitCamToTransData(destinationType);

        //Contain converted
        var converted = [];

        //Trig newline character
        data = data.replace(/(?:\r\n|\r|\n)/g, ' \n ');
        // data = data.replace(Model.Constant.NEW_LINE, ' ' + Model.Constant.NEW_LINE + ' ');

        //Plit to words array
        var words = data.split(' ');

        //Convert processing
        var dictionary = base.GetDictionaty(sourceType);

        words.forEach(function(word) {
            try {
                // is newline character
                if (word == Model.Constant.NEW_LINE || !word) {
                    converted.push(word);
                    return;
                }

                var lstAkhar = [];
                for (var i = 0; i < word.length; i++) {
                    var c = word[i];
                    var akhar = dictionary[c];
                    lstAkhar.push(akhar);
                }

                var kanaingAtFirst = new Stack();
                var kanaingAtLast = new Stack();

                //Cut kanaing at first and last word
                kanaingAtFirst = base.CutKanaingAtFirst(lstAkhar);
                kanaingAtLast = base.CutKanaingAtLast(lstAkhar);

                var ret = [self.ToRumiByWord(lstAkhar, destinationType)];

                // add kanaing at first and last word
                self.PopStackToList(ret, kanaingAtFirst, true);
                self.PopStackToList(ret, kanaingAtLast, false);

                converted.push(ret[0]);
            } catch (ex) {
                console.log('DoConvert', ex);
            }
        });

        var result = converted.join(' ');

        //Trig newline character
        // result = result.replace(' ' + Model.Constant.NEW_LINE + ' ', Model.Constant.NEW_LINE);

        return result.split('\n');
    };

    self.ToRumiByWord = function(word, desType) {
        //List empty
        if (word.length == 0) {
            return '';
        }

        var sap_Â = '';
        var sap_Ô = '';
        var sap_E = '';

        if (desType == Model.Enum.TransCamEFEO) {
            sap_Â = Model.Constant.Â_EFEO;
            sap_Ô = Model.Constant.Ô_EFEO;
            sap_E = Model.Constant.E_EFEO;
        } else if (desType == Model.Enum.TransInrasara) {
            sap_Â = Model.Constant.Â_SARA;
            sap_Ô = Model.Constant.Ô_SARA;
            sap_E = Model.Constant.E_SARA;
        } else if (desType == Model.Enum.TransKawomTT) {
            sap_Â = Model.Constant.Â_KawomTT;
            sap_Ô = Model.Constant.Ô_KawomTT;
            sap_E = Model.Constant.E_KawomTT;
        }

        var result = '';
        var akhar_diip = '';
        var akhar_diip_model = Model.AKhar.Kak;
        var takaiSappaohAnak = '';
        var takaiAkharAnak = '';
        var sapPaoh_temp = '';
        var count = word.length;

        var akharDiipAdded = false;
        var huTakaiKrak = false;
        var klakAkharAk = true;
        var huBalau = false;
        var addedTakaiThek = false;
        var addedTakaiKuk = false;

        var wordKareiCrih = [Model.AKhar.Ak,
            Model.AKhar.SakPraong,
            Model.AKhar.TakaiKuk,
            Model.AKhar.TakaiThek
        ];
        if (count == 4 && word[0] == wordKareiCrih[0] && word[1] == wordKareiCrih[1] && word[2] == wordKareiCrih[2] && word[3] == wordKareiCrih[3]) {
            return 'asau';
        }

        if (count == 0) {
            return '';
        }

        //Hu akhar mâtai di krâh, EX: 'duix-xak'
        var word1 = [];
        var word2 = [];
        for (var i = 0; i < count; i++) {
            if (base.Check_AkharMatai(word[i]) && i != word.length - 1 && i != 0) {
                word1 = word.slice(0, i + 1);
                word2 = word.slice(i + 1, word.length);
                break;
            }
        }

        if (word1.length != 0) {
            result = self.ToRumiByWord(word1, desType) + self.ToRumiByWord(word2, desType);
        } else {
            //Xalih bhian
            for (var i = 0; i < count; i++) {

                var item = word[i];
                if (base.Check_Angka(item)) {
                    result += self._keyCodeToTrans[item];
                    continue;
                }

                //hu balau
                if (base.Check_Balau(item)) {
                    huBalau = true;
                }

                //end angka
                if ((base.Check_InaAkhar_PhuAm(item) || base.Check_InaAkhar_NguyenAm(item)) && !base.IsAkharWakMaTai(item, i, count)) {

                    if (akhar_diip) {
                        result += akhar_diip;
                    }

                    akhar_diip_model = item; //??
                    akhar_diip = self._keyCodeToTrans[item].toUpperCase();

                    if (takaiAkharAnak) //Takai krak
                    {
                        if (self._keyCodeToTrans[akhar_diip_model].length > 2) //or > 2 ??
                        {
                            if (base.Check_InaAkhar_PhuAm_Special(akhar_diip_model)) //aiek wek hu repale('â','a')
                            {
                                akhar_diip = akhar_diip.substr(0, 2) + takaiAkharAnak + akhar_diip.substr(2).replace(new RegExp(sap_Â, 'g'), 'A'); //Repalce or none???
                            } else {
                                if (self._keyCodeToTrans[akhar_diip_model].length > 3)//nhjra
                                   {
                                       akhar_diip = akhar_diip.substr(0, 3) + takaiAkharAnak + akhar_diip.substr(3);//mba; bba; nhjra ???
                                   }
                                   else
                                       akhar_diip = akhar_diip.substr(0, 2) + takaiAkharAnak + akhar_diip.substr(2);
                            }
                            huTakaiKrak = true;
                        } else {
                            if (base.Check_InaAkhar_PhuAm_Special(akhar_diip_model)) //aiek wek hu repale('â','a')
                            {
                                akhar_diip = akhar_diip.substr(0, 1) + takaiAkharAnak + akhar_diip.substr(1).replace(new RegExp(sap_Â, 'g'), 'A'); //Repalce or none???
                            } else
                                akhar_diip = akhar_diip.substr(0, 1) + takaiAkharAnak + akhar_diip.substr(1);
                            huTakaiKrak = true;
                        }

                    }

                    if (takaiSappaohAnak) {
                        //Akhar Ak
                        if (akhar_diip_model == Model.AKhar.Ak) {
                            akhar_diip = akhar_diip.substr(0, 1) + akhar_diip.substr(1).replace(new RegExp('A', 'g'), takaiSappaohAnak);
                            klakAkharAk = false; //
                        } else {
                            akhar_diip = akhar_diip.replace(new RegExp('A', 'g'), takaiSappaohAnak);
                            akhar_diip = akhar_diip.replace(new RegExp(sap_Â, 'g'), takaiSappaohAnak); //(â-ư)
                        }
                    }
                    continue;
                }

                //
                if (base.Check_TakaiSapPaohAnak(item)) {
                    takaiSappaohAnak = self._keyCodeToTrans[item].toUpperCase();
                    continue;
                }
                if (base.Check_TakaiSapPaohLikuk(item) || base.Check_TakaiSapPaohDiLuic(item)) {

                    var takaiAkhar = self._keyCodeToTrans[item].toUpperCase();
                    if (akhar_diip) {
                        if (takaiSappaohAnak) {
                            if (takaiSappaohAnak == sap_Ô) {
                                var sappaohCombine = Model.AKhar.DarSa.toString() + item.toString();
                                sapPaoh_temp = self._keyCodeToTrans[sappaohCombine].toString().toUpperCase();
                            }

                            akhar_diip = akhar_diip.replace(new RegExp(sap_Ô, 'g'), sapPaoh_temp);
                        } else {
                            if (akhar_diip_model == Model.AKhar.Ak) {

                                akhar_diip = akhar_diip.substr(0, 1) + akhar_diip.substr(1).replace(new RegExp('A', 'g'), takaiAkhar);
                                klakAkharAk = false;
                            } else {
                                //takai thek <+> takai kuk (ơu - au)
                                if (item == Model.AKhar.TakaiKuk && addedTakaiThek) {
                                    var sappaohCombine = Model.AKhar.TakaiThek.toString() + item.toString();
                                    sapPaoh_temp = self._keyCodeToTrans[sappaohCombine].toString().toUpperCase();

                                    akhar_diip = akhar_diip.replace(new RegExp(sap_E, 'g'), sapPaoh_temp);
                                } else if (item == Model.AKhar.TakaiThek && addedTakaiKuk) {
                                    var sappaohCombine = Model.AKhar.TakaiThek.toString() + Model.AKhar.TakaiKuk.toString();
                                    sapPaoh_temp = self._keyCodeToTrans[sappaohCombine].toString().toUpperCase();
                                    akhar_diip = akhar_diip.replace(new RegExp('U', 'g'), sapPaoh_temp);
                                } else {
                                    akhar_diip = akhar_diip.replace(new RegExp('A', 'g'), takaiAkhar); //???aua...
                                    akhar_diip = akhar_diip.replace(new RegExp(sap_Â, 'g'), takaiAkhar);

                                    if (item == Model.AKhar.TakaiThek) {
                                        addedTakaiThek = true;
                                    }
                                    if (item == Model.AKhar.TakaiKuk) {
                                        addedTakaiKuk = true;
                                    }
                                }
                            }
                        }
                    } else {
                        result += takaiAkhar;
                    }
                    continue;
                }

                if (base.Check_TakaiAkharAnak(item)) {

                    takaiAkharAnak = self._keyCodeToTrans[item].toString().toUpperCase();
                    continue;
                }

                if (base.Check_TakaiAkharLikuk(item)) //aiek wek
                {

                    var takaiAkhar = self._keyCodeToTrans[item].toString().toUpperCase();
                    if (akhar_diip) {
                        if (self._keyCodeToTrans[akhar_diip_model].toString().length > 3) //nhja
                        {
                            //wak check -r di dahlau
                            if (huTakaiKrak) {
                                akhar_diip = akhar_diip.substr(0, 4) + takaiAkhar + akhar_diip.substr(4); // (Akhar Nhjak)
                            } else {
                                akhar_diip = akhar_diip.substr(0, 3) + takaiAkhar + akhar_diip.substr(3); //aiek wek
                            }
                        } else if (self._keyCodeToTrans[akhar_diip_model].toString().length == 3) //> 2??
                        {
                            //wak check -r di dahlau
                            if (huTakaiKrak) //Is_Hu_TakaiKrak_blaoh(akhar_diip)
                            {
                                if (desType == Model.Enum.TransCamEFEO) {
                                    akhar_diip = akhar_diip.substr(0, 3) + takaiAkhar + akhar_diip.substr(3);
                                } else {
                                    akhar_diip = akhar_diip.substr(0, 4) + takaiAkhar + akhar_diip.substr(4); // (Akhar Nhjak)
                                }

                            } else
                                akhar_diip = akhar_diip.substr(0, 2) + takaiAkhar + akhar_diip.substr(2);
                        } else {
                            if (huTakaiKrak) //Is_Hu_TakaiKrak_blaoh(akhar_diip)
                            {
                                akhar_diip = akhar_diip.substr(0, 2) + takaiAkhar + akhar_diip.substr(2);
                            } else {
                                if (takaiAkhar.length == 1) {
                                    if (base.Check_InaAkhar_PhuAm_Special(akhar_diip_model))
                                        akhar_diip = akhar_diip.substr(0, 1) + takaiAkhar + akhar_diip.substr(1).replace(new RegExp(sap_Â, 'g'), 'A'); //??? aiek wek
                                    else
                                        akhar_diip = akhar_diip.substr(0, 1) + takaiAkhar + akhar_diip.substr(1);
                                } else
                                    akhar_diip = akhar_diip.substr(0, 1) + akhar_diip.substr(1).replace(new RegExp(akhar_diip.substr(1), 'g'), takaiAkhar);
                            }
                        }
                    } else {
                        result += takaiAkhar;
                    }
                    continue;
                }

                if (base.Check_AkharMatai(item) || base.IsAkharWakMaTai(item, i, count)) {

                    var akharMatai = self._keyCodeToTrans[item].toString();
                    if (item == Model.AKhar.Wak) {
                        akharMatai = akharMatai.substr(0, 1);
                    }

                    result += akhar_diip + akharMatai;
                    akharDiipAdded = true;
                    continue;
                }

                if (base.Check_DauCau(item)) {

                    var dau_cau = self._keyCodeToTrans[item].toString();
                    if (!akharDiipAdded) {
                        akhar_diip += dau_cau;
                    } else
                        result += dau_cau;

                    continue;
                }
            }

            if (!akharDiipAdded) {

                result += akhar_diip;
            }

            //Klak 'aa...'
            var libik_a = 0;
            for (var j = 0; j < result.length - 1; j++) {
                if (result[j] == result[j + 1] && result[j] == 'A' && result != 'XAAI' && klakAkharAk) //if hu akhar Ak (Xaai)
                {
                    libik_a = j + 1;
                    result = result.substr(0, libik_a) + result.substr(libik_a + 1);
                    break;
                }

                if (result.length > 2 && (result[0] == 'A' && result[1] == 'A') ||
                (result[0] == 'A' && result[1] == 'Â') || (result[0] == 'A' && result[1] == 'Ư')) //char vs var ???
                {
                    result = result.substr(1);
                }
            }

            //Double Vowel
            if (huBalau && word[word.length - 1] != Model.AKhar.Balau && desType == Model.Enum.TransKawomTT) {
                result = self.DoubleVowel(result).toUpperCase();
            }

            //Cut Vowel
            if (desType == Model.Enum.TransKawomTT) {
                for (var i = result.length - 1; i > 0; i--) {
                    //e -> ai
                    if (result[i].toString() == 'E' && i == result.length - 1) {
                        result = result.replace(new RegExp('E', 'g'), 'AI');
                        break;
                    }

                    //oo -> ao
                    if (result[i].toString() + result[i - 1].toString() == 'OO' && i == result.length - 1) {
                        result = result.replace(new RegExp('OO', 'g'), 'AO');
                        break;
                    }

                    //ii -> i
                    if (result[i].toString() + result[i - 1].toString() == 'II' && i == result.length - 1) {
                        result = result.replace(new RegExp('II', 'g'), 'I');
                        break;
                    }

                    //ơơ -> ơ
                    if (result[i].toString() + result[i - 1].toString() == 'ƠƠ' && i == result.length - 1) {
                        result = result.replace(new RegExp('ƠƠ', 'g'), 'Ơ');
                        break;
                    }
                }
            }

            //End klak ak
            if (result.indexOf('PPONG') != -1)
                result = result.replace(new RegExp('PPONG', 'g'), 'PPO');

            if (result.indexOf('PPÔNG') != -1)
                result = result.replace(new RegExp('PPÔNG', 'g'), 'PPÔ');

            if (result.indexOf('XAII') != -1)
                result = result.replace(new RegExp('XAII', 'g'), 'XAAI');
        }

        return result.toLowerCase();
    };

    self.DoubleVowel = function(result) {

        for (var i = result.length - 2; i > 0; i--) // not available vowel at the end!!!
        {
            var key = result[i].toString();
            if (self._vowelKTT[key]) {
                result = result.slice(0, i) + result.slice(i + 1, result.length);
                result = result.splice(i, 0, self._vowelKTT[key].toString());
                break;
            }
        }
        return result;
    };

    self.PopStackToList = function(list, stack, addFirst) {
        while (stack.length() != 0) {
            var index = addFirst ? 0 : list[0].length;
            //  list = list.Insert(index, this._keyCodeToTrans[stack.Pop()].ToString());
            list[0] = list[0].slice(0, index) + self._keyCodeToTrans[stack.pop()].toString() + list[0].slice(index, list[0].length);
        }
    };

    self.InitCamToTransData = function(destinationType) {

        base._kanaingChars = window.cam.service.Utility.InitKanaing();
        self._vowelKTT = window.cam.service.Utility.InitVowelKTT();
        window.cam.service.Utility.SetTransFromXML(self._keyCodeToTrans, destinationType);
    };
};
