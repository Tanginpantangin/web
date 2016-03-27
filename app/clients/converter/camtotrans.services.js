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
        var validvar = [data];
        base.ValidateInput(validString, sourceType);
        data = validString[0];

        //Init Cam to Rumi Data
        self.InitCamToTransData(destinationType);

        //Contain converted
        var converted = [];

        //Trig newline character
        data = data.replace(/(?:\r\n|\r|\n)/g, ' \n ');
        // data = data.Replace(Model.Constant.NEW_LINE, ' ' + Model.Constant.NEW_LINE + ' ');

        //Plit to words array
        var words = data.split(' ');

        //Convert processing
        var dictionary = base.GetDictionaty(sourceType);

        words.forEach(function(word) {
            try {
                // is newline character
                if (word == Model.Constant.NEW_LINE || String.IsNullOrEmpty(word)) {
                    converted.push(word);
                    continue;
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
                kanaingAtFirst = base.CutKanaingAtFirst(ref lstAkhar);
                kanaingAtLast = base.CutKanaingAtLast(ref lstAkhar);

                var ret = self.ToRumiByWord(lstAkhar, destinationType);

                // add kanaing at first and last word
                self.PopStackToList(ref ret, kanaingAtFirst, true);
                self.PopStackToList(ref ret, kanaingAtLast, false);

                converted.push(ret);
            } catch (ex) {
                console.log('DoConvert', ex);
            }
        });

        var result = converted.join(' ');

        //Trig newline character
        // result = result.Replace(' ' + Model.Constant.NEW_LINE + ' ', Model.Constant.NEW_LINE);

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
        if (word[0] == wordKareiCrih[0] && word[1] == wordKareiCrih[1] && word[2] == wordKareiCrih[2] && word[3] == wordKareiCrih[3]) {
            return result = 'asau';
        }

        if (count == 0) {
            return '';
        }

        //Hu akhar mâtai di krâh, EX: 'duix-xak'
        var word1 = [];
        var word2 = [];
        for (var i = 0; i < count; i++) {

            var item = word[i];
            if (base.Check_AkharMatai(word[i]) && i != word.length - 1 && i != 0) {
                word1 = word.GetRange(0, i + 1);
                word2 = word.GetRange(i + 1, word.length - (i + 1));
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

                    if (!String.IsNullOrEmpty(akhar_diip)) {
                        result += akhar_diip;
                    }

                    akhar_diip_model = item; //??
                    akhar_diip = self._keyCodeToTrans[item];

                    if (!String.IsNullOrEmpty(takaiAkharAnak)) //Takai krak
                    {
                        if (self._keyCodeToTrans[akhar_diip_model].length > 2) //or > 2 ??
                        {
                            if (base.Check_InaAkhar_PhuAm_Special(akhar_diip_model)) //aiek wek hu repale('â','a')
                            {
                                akhar_diip = akhar_diip.substr(0, 2) + takaiAkharAnak + akhar_diip.substr(2).Replace(sap_Â, 'a'); //Repalce or none???
                            } else {
                                if (desType == Model.Enum.TransCamEFEO) {
                                    akhar_diip = akhar_diip.substr(0, 2) + takaiAkharAnak + akhar_diip.substr(2);
                                } else
                                    akhar_diip = akhar_diip.substr(0, 3) + takaiAkharAnak + akhar_diip.substr(3);
                            }
                            huTakaiKrak = true;
                        } else {
                            if (base.Check_InaAkhar_PhuAm_Special(akhar_diip_model)) //aiek wek hu repale('â','a')
                            {
                                akhar_diip = akhar_diip.substr(0, 1) + takaiAkharAnak + akhar_diip.substr(1).Replace(sap_Â, 'a'); //Repalce or none???
                            } else
                                akhar_diip = akhar_diip.substr(0, 1) + takaiAkharAnak + akhar_diip.substr(1);
                            huTakaiKrak = true;
                        }

                    }

                    if (!String.IsNullOrEmpty(takaiSappaohAnak)) {
                        //Akhar Ak
                        if (akhar_diip_model == Model.AKhar.Ak) {
                            akhar_diip = akhar_diip.substr(0, 1) + akhar_diip.substr(1).Replace('a', takaiSappaohAnak);
                            klakAkharAk = false; //
                        } else {
                            akhar_diip = akhar_diip.Replace('a', takaiSappaohAnak);
                            akhar_diip = akhar_diip.Replace(sap_Â, takaiSappaohAnak); //(â-ư)
                        }
                    }

                    continue;
                }

                //
                if (base.Check_TakaiSapPaohAnak(item)) {
                    takaiSappaohAnak = self._keyCodeToTrans[item];
                    continue;
                }
                if (base.Check_TakaiSapPaohLikuk(item) || base.Check_TakaiSapPaohDiLuic(item)) {

                    var takaiAkhar = self._keyCodeToTrans[item];
                    if (!String.IsNullOrEmpty(akhar_diip)) {
                        if (!String.IsNullOrEmpty(takaiSappaohAnak)) {
                            if (takaiSappaohAnak == sap_Ô) {

                                var sappaohCombine = Convert.ToInt32(((int) Model.AKhar.DarSa).ToString() + ((int) item).ToString());
                                sapPaoh_temp = self._keyCodeToTrans[sappaohCombine].ToString();
                            }

                            akhar_diip = akhar_diip.Replace(sap_Ô, sapPaoh_temp);
                        } else {
                            if (akhar_diip_model == Model.AKhar.Ak) {

                                akhar_diip = akhar_diip.substr(0, 1) + akhar_diip.substr(1).Replace('a', takaiAkhar);
                                klakAkharAk = false;
                            } else {
                                //takai thek <+> takai kuk (ơu - au)
                                if (item == Model.AKhar.TakaiKuk && addedTakaiThek) {
                                    var sappaohCombine = Convert.ToInt32(((int) Model.AKhar.TakaiThek).ToString() + ((int) item).ToString());
                                    sapPaoh_temp = self._keyCodeToTrans[sappaohCombine].ToString();

                                    akhar_diip = akhar_diip.Replace(sap_E, sapPaoh_temp);
                                } else if (item == Model.AKhar.TakaiThek && addedTakaiKuk) {
                                    var sappaohCombine = Convert.ToInt32(((int) Model.AKhar.TakaiThek).ToString() + ((int) Model.AKhar.TakaiKuk).ToString());
                                    sapPaoh_temp = self._keyCodeToTrans[sappaohCombine].ToString();

                                    akhar_diip = akhar_diip.Replace('u', sapPaoh_temp);
                                } else {
                                    akhar_diip = akhar_diip.Replace('a', takaiAkhar); //???aua...
                                    akhar_diip = akhar_diip.Replace(sap_Â, takaiAkhar);

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

                if (this.Check_TakaiAkharAnak(item)) {

                    takaiAkharAnak = self._keyCodeToTrans[item].ToString();
                    continue;
                }

                if (this.Check_TakaiAkharLikuk(item)) //aiek wek
                {

                    var takaiAkhar = self._keyCodeToTrans[item].ToString();
                    if (!String.IsNullOrEmpty(akhar_diip)) {
                        if (self._keyCodeToTrans[akhar_diip_model].ToString().length > 3) //nhja
                        {
                            //wak check -r di dahlau
                            if (huTakaiKrak) {
                                akhar_diip = akhar_diip.substr(0, 4) + takaiAkhar + akhar_diip.substr(4); // (Akhar Nhjak)
                            } else {
                                akhar_diip = akhar_diip.substr(0, 3) + takaiAkhar + akhar_diip.substr(3); //aiek wek
                            }
                        } else if (self._keyCodeToTrans[akhar_diip_model].ToString().length == 3) //> 2??
                        {
                            //wak check -r di dahlau
                            if (huTakaiKrak) //Is_Hu_TakaiKrak_blaoh(akhar_diip)
                            {
                                //if (base.Check_InaAkhar_PhuAm_Special(akhar_diip_model))
                                //{
                                //    akhar_diip = akhar_diip.substr(0, 3) + takaiAkhar + akhar_diip.substr(3);//???aiek wek
                                //}
                                //else
                                if (desType == Model.Enum.TransCamEFEO) {
                                    akhar_diip = akhar_diip.substr(0, 3) + takaiAkhar + akhar_diip.substr(3);
                                } else {
                                    akhar_diip = akhar_diip.substr(0, 4) + takaiAkhar + akhar_diip.substr(4); // (Akhar Nhjak)
                                }

                            } else
                            //if (desType == Model.Enum.TransCamEFEO)
                            //{
                                akhar_diip = akhar_diip.substr(0, 2) + takaiAkhar + akhar_diip.substr(2);
                            //}
                            //else
                            //{
                            //    akhar_diip = akhar_diip.substr(0, 3) + takaiAkhar + akhar_diip.substr(3);//aiek wek
                            //}

                        } else {
                            if (huTakaiKrak) //Is_Hu_TakaiKrak_blaoh(akhar_diip)
                            {
                                akhar_diip = akhar_diip.substr(0, 2) + takaiAkhar + akhar_diip.substr(2);
                            } else {
                                if (takaiAkhar.length == 1) {
                                    if (base.Check_InaAkhar_PhuAm_Special(akhar_diip_model))
                                        akhar_diip = akhar_diip.substr(0, 1) + takaiAkhar + akhar_diip.substr(1).Replace(sap_Â, 'a'); //??? aiek wek
                                    else
                                        akhar_diip = akhar_diip.substr(0, 1) + takaiAkhar + akhar_diip.substr(1);
                                } else
                                    akhar_diip = akhar_diip.substr(0, 1) + akhar_diip.substr(1).Replace(akhar_diip.substr(1), takaiAkhar);
                                //??? aiek hu replace ('â','a')
                            }
                        }
                    } else {
                        result += takaiAkhar;
                    }
                    continue;
                }

                if (this.Check_AkharMatai(item) || base.IsAkharWakMaTai(item, i, count)) {

                    var akharMatai = self._keyCodeToTrans[item].ToString();
                    if (item == Model.AKhar.Wak) {
                        akharMatai = akharMatai.substr(0, 1);
                    }

                    result += akhar_diip + akharMatai;
                    akharDiipAdded = true;
                    continue;
                }

                //Aiek wek????
                if (this.Check_DauCau(item)) {

                    var dau_cau = self._keyCodeToTrans[item].ToString();
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
                if (result[j] == result[j + 1] && result[j] == 'a' && result != 'xaai' && klakAkharAk) //if hu akhar Ak (Xaai)
                {
                    libik_a = j + 1;
                    result = result.substr(0, libik_a) + result.substr(libik_a + 1);
                    break;
                }

                if (result.length > 2 && (result[0] == 'a' && result[1] == 'a') || (result[0] == 'a' && result[1] == 'â') || (result[0] == 'a' && result[1] == 'ư')) //char vs var ???
                {
                    result = result.substr(1);
                }
            }

            //Double Vowel
            if (huBalau && word[word.length - 1] != Model.AKhar.Balau && desType == Model.Enum.TransKawomTT) {
                result = DoubleVowel(result);
            }

            //Cut Vowel
            if (desType == Model.Enum.TransKawomTT) {
                for (var i = result.length - 1; i > 0; i--) {
                    //e -> ai
                    if (result[i].ToString() == 'e' && i == result.length - 1) {
                        result = result.Replace('e', 'ai');
                        break;
                    }

                    //oo -> ao
                    if (result[i].ToString() + result[i - 1].ToString() == 'oo' && i == result.length - 1) {
                        result = result.Replace('oo', 'ao');
                        break;
                    }

                    //ii -> i
                    if (result[i].ToString() + result[i - 1].ToString() == 'ii' && i == result.length - 1) {
                        result = result.Replace('ii', 'i');
                        break;
                    }

                    //ơơ -> ơ
                    if (result[i].ToString() + result[i - 1].ToString() == 'ơơ' && i == result.length - 1) {
                        result = result.Replace('ơơ', 'ơ');
                        break;
                    }
                }
            }

            //End klak ak
            if (result.IndexOf('ppong') != -1)
                result = result.Replace('ppong', 'ppo');

            if (result.IndexOf('ppông') != -1)
                result = result.Replace('ppông', 'ppô');

            if (result.IndexOf('xaii') != -1)
                result = result.Replace('xaii', 'xaai');
        }

        return result;
    }

    private
    var DoubleVowel(var result) {

        for (var i = result.length - 2; i > 0; i--) // not available vowel at the end!!!
        {

            var key = result[i].ToString();
            if (this._vowelKTT.ContainsKey(key)) {
                result = result.Remove(i, 1);
                result = result.Insert(i, this._vowelKTT[key].ToString());
                break;
            }
        }
        return result;
    }

    /// <summary>
    /// Add item from Stack into List
    /// </summary>
    /// <param name='list'>var list</param>
    /// <param name='stack'>Stack of akhar</param>
    /// <param name='addFirst'>add to first flag</param>
    protected void PopStackToList(ref
        var list, Stack <
            var > stack,
            var addFirst) {
        while (stack.length != 0) {

            var index = addFirst ? 0 : list.length;

            list = list.Insert(index, self._keyCodeToTrans[stack.Pop()].ToString());
        }
    }

    /// <summary>
    /// Init data converting
    /// </summary>
    protected void InitCamToTransData(Model.Enum destinationType) {

        this._kanaingChars = Utility.InitKanaing();
        this._vowelKTT = Utility.InitVowelKTT();
        //Set Keycode to Trans hashtable
        Utility.SetTransFromXML(ref self._keyCodeToTrans, destinationType);
    }

}
};
