/* global Model */
'use strict';
if (!window.cam) {
    window.cam = {};
    if (!window.cam.service) {
        window.cam.service = {};
    }
}

window.cam.service.TransToTransPaxalih = function() {
    var self = this;
    var base = new window.cam.service.Paxalih();

    self.DoConvert = function(data, sourceType, destitionType) {
        // Validate inputed string
        var validString = [data];
        base.ValidateInput(validString, sourceType);
        data = validString[0];

        //Contain converted
        var converted = [];

        //Trig newline character
        //    data = data.replace(Model.Constant.NEW_LINE, ' ' + Model.Constant.NEW_LINE + ' ');
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

            var convertedWord = '';
            switch (sourceType) {
                case Model.Enum.TransInrasara:
                    convertedWord = self.InrasaraToCamEFEOByWord(word);
                    break;

                case Model.Enum.TransCamEFEO:
                    convertedWord = self.CamEFEOToInrasaraByWord(word);
                    break;

                default:
                    //case Model.Enum.TransKawomTT:
                    if (destitionType == Model.Enum.TransCamEFEO) {
                        convertedWord = self.KTTToCamEFEOByWord(word);
                        break;
                    } else //if (destitionType == Model.Enum.TransInrasara)
                    {
                        convertedWord = self.KTTToInrasaraByWord(word);
                        break;
                    }
            }

            converted.push(convertedWord);
        });

        var result = converted.join(' ').toLowerCase();

        //Trig newline character
        // result = result.replace(' ' + Model.Constant.NEW_LINE + ' ', Model.Constant.NEW_LINE);

        return result.split('\n');
    };

    self.InrasaraToCamEFEOByWord = function(word) {
        var result = word.toLowerCase();
        var hashInra2EFEO = {};
        hashInra2EFEO.nhj = 'nj';
        hashInra2EFEO.bb = 'mb';
        hashInra2EFEO.ư = 'â';
        hashInra2EFEO.e = 'é';
        hashInra2EFEO.au = 'ao';
        try {
            var keys = Object.keys(hashInra2EFEO);
            keys.forEach(function(key) {
                if (result.indexOf('ei') === -1) {
                    result = result.replace(new RegExp(key, 'g'), hashInra2EFEO[key]);
                }
            });

            result = result.replace(new RegExp('ơ', 'g'), 'e');
            result = result.replace(new RegExp('nh', 'g'), 'ny');

            //Akhar wak
            if (result.indexOf('w') !== -1) {
                var idex = result.indexOf('w');
                var str_check = 'aưiu';
                if ((idex != result.length - 1) && (idex != 0) &&
                    (str_check.indexOf(result[idex - 1]) === -1)) {
                    result = result.replace(new RegExp('w', 'g'), 'u');
                }
            }

            return result;
        } catch (ex) {
            window.logging.writeLogFromConverter(ex);
            return '';
        }
    };

    self.CamEFEOToInrasaraByWord = function(word) {
        var result = word.toLowerCase();
        var hashEFEO2Inra = {};
        hashEFEO2Inra.nj = 'nhj';
        hashEFEO2Inra.ny = 'nh';
        hashEFEO2Inra.mb = 'bb';
        hashEFEO2Inra.â = 'ư';
        hashEFEO2Inra.e = 'ơ';

        try {
            var keys = Object.keys(hashEFEO2Inra);
            keys.forEach(function(key) {
                if (result.indexOf('ei') === -1) {
                    result = result.replace(new RegExp(key, 'g'), hashEFEO2Inra[key]);
                }
            });

            //Akhar wak
            if (result.indexOf('u') !== -1) {
                var idex = result.indexOf('u');
                var str_check = 'aie';
                if ((idex != result.length - 1) && (idex != 0) &&
                    (str_check.indexOf(result[idex + 1]) !== -1)) {
                    result = result.replace(new RegExp('u', 'g'), 'w');
                }
            }

            result = result.replace(new RegExp('é', 'g'), 'e');
            result = result.replace(new RegExp('ao', 'g'), 'au');

            return result;
        } catch (ex) {
            window.logging.writeLogFromConverter(ex);
            return '';
        }
    };

    self.KTTToCamEFEOByWord = function(word) {
        var result = word.toLowerCase();
        var hashKTTT2EFEO = {};
        hashKTTT2EFEO.nhj = 'nj';
        hashKTTT2EFEO.nh = 'ny';
        hashKTTT2EFEO.bb = 'mb';
        hashKTTT2EFEO.đ = 'nd';
        hashKTTT2EFEO.aa = 'a';
        hashKTTT2EFEO.ưư = 'â';
        hashKTTT2EFEO.uu = 'u';
        hashKTTT2EFEO.ơ = 'e';
        hashKTTT2EFEO.ơơ = 'e';
        hashKTTT2EFEO.ê = 'é';
        hashKTTT2EFEO.ô = 'o';
        hashKTTT2EFEO.oo = 'ao';
        hashKTTT2EFEO.ee = 'ai';

        var hashKTTT2EFEO_plus = {};
        hashKTTT2EFEO_plus.e = 'ai';
        hashKTTT2EFEO_plus.o = 'ao';
        hashKTTT2EFEO_plus.ư = 'â'

        try {
            var keys = [];
            if (result.indexOf('ei') === -1 && result.indexOf('oo') === -1 &&
                result.indexOf('ee') === -1 && result.indexOf('ưư') === -1) {

                keys = Object.keys(hashKTTT2EFEO_plus);
                keys.forEach(function(key) {
                    result = result.replace(new RegExp(key, 'g'), hashKTTT2EFEO_plus[key]);
                });
            }

            keys = Object.keys(hashKTTT2EFEO);
            keys.forEach(function(key) {
                result = result.replace(new RegExp(key, 'g'), hashKTTT2EFEO[key]);
            });

            if (result.indexOf('w') !== -1) {
                var idex = result.indexOf('w');
                var str_check = 'aâiu';
                if ((idex != result.length - 1) && (idex != 0) &&
                    (str_check.indexOf(result[idex - 1]) === -1)) {
                    result = result.replace(new RegExp('w', 'g'), 'u');
                }
            }
            return result;
        } catch (ex) {
            window.logging.writeLogFromConverter(ex);
            return '';
        }
    };

    self.KTTToInrasaraByWord = function(word) {
        var result = word.toLowerCase();
        var hashKTTT2Inra = {};

        hashKTTT2Inra.aa = 'a';
        hashKTTT2Inra.ưư = 'ư';
        hashKTTT2Inra.uu = 'u';
        hashKTTT2Inra.ơơ = 'ơ';
        hashKTTT2Inra.ê = 'e';
        hashKTTT2Inra.ô = 'o';
        hashKTTT2Inra.oo = 'au';
        hashKTTT2Inra.ee = 'ai';

        var hashKTTT2Inra_plus = {};
        hashKTTT2Inra_plus.e = 'ai';
        hashKTTT2Inra_plus.o = 'au';

        try {
            var keys = [];

            if (result.indexOf('ei') === -1 && result.indexOf('oo') === -1 &&
                result.indexOf('ee') === -1) {
                keys = Object.keys(hashKTTT2Inra_plus);
                keys.forEach(function(key) {
                    result = result.replace(new RegExp(key, 'g'), hashKTTT2Inra_plus[key]);
                });
            }

            keys = Object.keys(hashKTTT2Inra);
            keys.forEach(function(key) {
                result = result.replace(new RegExp(key, 'g'), hashKTTT2Inra[key]);
            });

            return result;
        } catch (ex) {
            window.logging.writeLogFromConverter(ex);
            return '';
        }
    };
};
