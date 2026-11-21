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

    self._desHtb = {};

    function isUnicode(type) {
        return type == Model.Enum.FontUniCamKur || type == Model.Enum.FontUniCamVN;
    }

    var unicodeComponents = {};
    unicodeComponents[Model.AKhar.BalauTapong] = [Model.AKhar.Balau, Model.AKhar.TakaiThek];
    unicodeComponents[Model.AKhar.TakaiThekTutTakaiMâk] = [Model.AKhar.TakaiThek, Model.AKhar.TutTakaiMâk];
    unicodeComponents[Model.AKhar.TakaiKikTutTakaiMâkLingiw] = [Model.AKhar.TakaiKik, Model.AKhar.TutTakaiMâk];
    unicodeComponents[Model.AKhar.TraohAwPaohNgâk] = [Model.AKhar.TraohAw, Model.AKhar.PaohNgâk];
    unicodeComponents[Model.AKhar.TraohAwTutTakaiMâk] = [Model.AKhar.TraohAw, Model.AKhar.TutTakaiMâk];
    unicodeComponents[Model.AKhar.TakaiKlakTakaiKuak] = [Model.AKhar.TakaiKlak, Model.AKhar.TakaiKuak];
    unicodeComponents[Model.AKhar.TakaiKlakTakaiKuk] = [Model.AKhar.TakaiKlak, Model.AKhar.TakaiKuk];
    unicodeComponents[Model.AKhar.TakaiThekPaohNgâk] = [Model.AKhar.TakaiThek, Model.AKhar.PaohNgâk];

    self.DoConvert = function(data, sourceType, destitionType) {
        if (isUnicode(sourceType) && isUnicode(destitionType)) {
            return data.split(/\r\n|\r|\n/);
        }

        // Validate inputed string
        var validString = [data];
        base.ValidateInput(validString, sourceType);
        data = validString[0];

        //Set hastable data
        var sourceMap = base.GetDictionaty(sourceType);
        self.SetHastableData(destitionType);

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

            var decoded = word.split('').map(function(character) {
                return sourceMap[character];
            });
            var lstAkhar = isUnicode(destitionType)
                ? expandUnicodeLigatures(decoded)
                : composeLegacy(decoded, sourceType, destitionType);
            var convertedWord = '';
            lstAkhar.forEach(function(akhar) {
                if (self._desHtb[akhar]) {
                    convertedWord += self._desHtb[akhar].toString();
                }
            });

            converted.push(convertedWord);
        });

        return converted.join(' ').split('\n');
    };

    self.SetHastableData = function(destitionType) {
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

    function expandUnicodeLigatures(decoded) {
        var expanded = [];
        decoded.forEach(function(akhar) {
            if (unicodeComponents[akhar]) {
                expanded.push.apply(expanded, unicodeComponents[akhar]);
            } else {
                expanded.push(akhar);
            }
        });
        return expanded;
    }

    function composeLegacy(decoded, sourceType, destitionType) {
        try {
            var ret = [];
            for (var i = 0; i < decoded.length; i++) {
                var saboah = decoded[i];

                // Expand these legacy ligatures for Cam EFEO.
                if (destitionType == Model.Enum.FontCamEFEO) {

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

                if (isUnicode(sourceType)) {
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

                if (sourceType == Model.Enum.FontCamEFEO || (isUnicode(sourceType) && destitionType != Model.Enum.FontCamEFEO)) {

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
            window.logging.writeLogFromConverter(ex);
            return [];
        }
    }
};
