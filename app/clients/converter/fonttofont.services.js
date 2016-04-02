/* global Model */
'use strict';
if (!window.cam) {
    window.cam = {};
    if (!window.cam.service) {
        window.cam.service = {};
    }
}

window.cam.service.FontToFontPaxalih = function() {
    var self = this;
    var base = new window.cam.service.Paxalih();

    self._srcHtb = {};
    self._desHtb = {};

    self.DoConvert = function(data, sourceType, destitionType) {

        // Validate inputed string
        var validString = [data];
        base.ValidateInput(validString, sourceType);
        data = validString[0];

        //Set hastable data
        self.SetHastableData(sourceType, destitionType);

        //Contain converted
        var converted = [];

        //Trig newline character
        data = data.replace(/(?:\r\n|\r|\n)/g, ' \n ');

        //Plit to words array
        var words = data.split(' ');

        //Convert processing
        words.forEach(function(word) {
            // is newline character
            if (word == Model.Constant.NEW_LINE || !word) {
                converted.push(word);
                return;
            }

            var lstAkhar = self.ToKeyCodeByWord(word, sourceType, destitionType);
            var convertedWord = '';
            lstAkhar.forEach(function(akhar) {
                if (self._desHtb[akhar]) {
                    convertedWord += self._desHtb[akhar].toString(); //to_unicode???
                }
            });

            converted.push(convertedWord);
        });

        return converted.join(' ').split('\n');
    };

    self.SetHastableData = function(sourceType, destitionType) {

        //Set source data
        switch (sourceType) {
            case Model.Enum.FontYapata:
                self._srcHtb = base._waYapataToKeyCode;
                break;

            case Model.Enum.FontGilaiPraong:
                self._srcHtb = base._gilaiPraongToKeyCode;
                break;

            case Model.Enum.FontCamEFEO:
                self._srcHtb = base._camEFEOToKeyCode;
                break;

            case Model.Enum.FontUniCamKur:
                self._srcHtb = base._uniCamKurToKeyCode;
                break;

            case Model.Enum.FontUniCamVN:
                self._srcHtb = base._uniCamVNToKeyCode;
                break;

            default:
                self._srcHtb = base._KTTToKeyCode;
                break;
        }

        //Set destination data
        switch (destitionType) {
            case Model.Enum.FontYapata:
                self._desHtb = base._keyCodeToWaYapata;
                break;

            case Model.Enum.FontGilaiPraong:
                self._desHtb = base._keyCodeToGilaiPraong;
                break;

            case Model.Enum.FontCamEFEO:
                self._desHtb = base._keyCodeToCamEFEO;
                break;

            case Model.Enum.FontUniCamKur:
                self._desHtb = base._keyCodeToUniCamKur;
                break;

            case Model.Enum.FontUniCamVN:
                self._desHtb = base._keyCodeToUniCamVN;
                break;

            default:
                self._desHtb = base._keyCodeToKTT;
                break;
        }
    };

    self.ToKeyCodeByWord = function(word, sourceType, destitionType) {
        try {
            var ret = [];
            for (var i = 0; i < word.length; i++) {
                var chr = word[i];

                //Get current akhar
                var saboah = self._srcHtb[chr];

                //Just correct for FontUniCamKur & FontUniCamVN
                if (destitionType == Model.Enum.FontUniCamKur || destitionType == Model.Enum.FontUniCamVN) {
                    //Baluw tapong
                    if (saboah == Model.AKhar.BalauTapong) {
                        ret.push(Model.AKhar.Balau);
                        ret.push(Model.AKhar.TakaiThek);
                        continue;
                    }

                    //Takai Thek Tut Takai Mâk
                    if (saboah == Model.AKhar.TakaiThekTutTakaiMâk) {
                        ret.push(Model.AKhar.TakaiThek);
                        ret.push(Model.AKhar.TutTakaiMâk);
                        continue;
                    }

                    //Takai Kik Tut Takai Mâk Lingiw
                    if (saboah == Model.AKhar.TakaiKikTutTakaiMâkLingiw) {
                        ret.push(Model.AKhar.TakaiKik);
                        ret.push(Model.AKhar.TutTakaiMâk);
                        continue;
                    }

                    //Traok Aw Paoh Ngâk
                    if (saboah == Model.AKhar.TraohAwPaohNgâk) {
                        ret.push(Model.AKhar.TraohAw);
                        ret.push(Model.AKhar.PaohNgâk);
                        continue;
                    }

                    //Traok Aw Tut Takai Mâk
                    if (saboah == Model.AKhar.TraohAwTutTakaiMâk) {
                        ret.push(Model.AKhar.TraohAw);
                        ret.push(Model.AKhar.TutTakaiMâk);
                        continue;
                    }
                }

                //Correct with FontUniCamKur and FontCamEFEO
                if ((destitionType == Model.Enum.FontCamEFEO && sourceType != Model.Enum.FontUniCamKur) || (destitionType == Model.Enum.FontUniCamKur && sourceType != Model.Enum.FontCamEFEO) || (destitionType == Model.Enum.FontCamEFEO && sourceType != Model.Enum.FontUniCamVN) || (destitionType == Model.Enum.FontUniCamVN && sourceType != Model.Enum.FontCamEFEO)) {

                    //Takai Klak Takai Kuak
                    if (saboah == Model.AKhar.TakaiKlakTakaiKuak) {
                        ret.push(Model.AKhar.TakaiKlak);
                        ret.push(Model.AKhar.TakaiKuak);
                        continue;
                    }

                    //Takai Klak Takai Kuk
                    if (saboah == Model.AKhar.TakaiKlakTakaiKuk) {
                        ret.push(Model.AKhar.TakaiKlak);
                        ret.push(Model.AKhar.TakaiKuk);
                        continue;
                    }

                    //Takai Thek Paoh Ngâk
                    if (saboah == Model.AKhar.TakaiThekPaohNgâk) {
                        ret.push(Model.AKhar.TakaiThek);
                        ret.push(Model.AKhar.PaohNgâk);
                        continue;
                    }
                }

                //Gak Mâtai
                if ((destitionType == Model.Enum.FontCamEFEO || destitionType == Model.Enum.FontGilaiPraong) && saboah == Model.AKhar.GakMatai) {
                    ret.push(Model.AKhar.KakMatai);
                    continue;
                }

                if (sourceType == Model.Enum.FontUniCamKur || sourceType == Model.Enum.FontUniCamVN) {
                    //Baluw Tapong
                    if (saboah == Model.AKhar.TakaiThek && ret.length != 0 && ret[ret.length - 1] == Model.AKhar.Balau) {
                        ret.splice(ret.length - 1, 1);
                        ret.push(Model.AKhar.BalauTapong);
                        continue;
                    }

                    //Takai Thek Tut Takai Mâk
                    if (saboah == Model.AKhar.TutTakaiMâk && ret.length != 0 && ret[ret.length - 1] == Model.AKhar.TakaiThek) {
                        ret.splice(ret.length - 1, 1);
                        ret.push(Model.AKhar.TakaiThekTutTakaiMâk);
                        continue;
                    }

                    //Takai Kik Tut Takai Mâk Lingiw
                    if (saboah == Model.AKhar.TutTakaiMâk && ret.length != 0 && ret[ret.length - 1] == Model.AKhar.TakaiKik) {
                        ret.splice(ret.length - 1, 1);
                        ret.push(Model.AKhar.TakaiKikTutTakaiMâkLingiw);
                        continue;
                    }

                    //Traok Aw Paoh Ngâk
                    if (saboah == Model.AKhar.PaohNgâk && ret.length != 0 && ret[ret.length - 1] == Model.AKhar.TraohAw) {
                        ret.splice(ret.length - 1, 1);
                        ret.push(Model.AKhar.TraohAwPaohNgâk);
                        continue;
                    }

                    //Traok Aw Tut Takai Mâk
                    if (saboah == Model.AKhar.TutTakaiMâk && ret.length != 0 && ret[ret.length - 1] == Model.AKhar.TraohAw) {
                        ret.splice(ret.length - 1, 1);
                        ret.push(Model.AKhar.TraohAwTutTakaiMâk);
                        continue;
                    }
                }

                //if (sourceType == Model.Enum.FontCamEFEO || sourceType == Model.Enum.FontUniCamKur)
                if ((sourceType == Model.Enum.FontCamEFEO && destitionType != Model.Enum.FontUniCamKur) || (sourceType == Model.Enum.FontUniCamKur && destitionType != Model.Enum.FontCamEFEO) || (sourceType == Model.Enum.FontCamEFEO && destitionType != Model.Enum.FontUniCamVN) || (sourceType == Model.Enum.FontUniCamVN && destitionType != Model.Enum.FontCamEFEO)) {

                    //Takai Klak Takai Kuak
                    if (saboah == Model.AKhar.TakaiKuak && ret.length != 0 && ret[ret.length - 1] == Model.AKhar.TakaiKlak) {
                        ret.splice(ret.length - 1, 1);
                        ret.push(Model.AKhar.TakaiKlakTakaiKuak);
                        continue;
                    }

                    //Takai Klak Takai Kuk
                    if (saboah == Model.AKhar.TakaiKuk && ret.length != 0 && ret[ret.length - 1] == Model.AKhar.TakaiKlak) {
                        ret.splice(ret.length - 1, 1);
                        ret.push(Model.AKhar.TakaiKlakTakaiKuk);
                        continue;
                    }

                    //Takai Thek Paoh Ngâk
                    if (saboah == Model.AKhar.PaohNgâk && ret.length != 0 && ret[ret.length - 1] == Model.AKhar.TakaiThek) {
                        ret.splice(ret.length - 1, 1);
                        ret.push(Model.AKhar.TakaiThekPaohNgâk);
                        continue;
                    }
                }

                ret.push(saboah);
            }

            return ret;
        } catch (ex) {
            console.log('ToKeyCodeByWord', ex);
            return [];
        }
    }
};
