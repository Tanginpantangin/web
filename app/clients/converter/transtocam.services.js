/* global Model */
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
            //Init Rumi To Cam data
            self.InitTransToCamData(sourceType, destitionType);

            //Contain converted
            var converted = [];

            //Trig newline character
            data = data.replace(/(?:\r\n|\r|\n)/g, ' \n ');
            // data = data.replace(Model.Constant.NEW_LINE, ' ' + Model.Constant.NEW_LINE + ' ');

            //Plit to words array
            var words = data.split(' ');

            //Convert processing
            words.forEach(function(word) {
                // is newline character
                if (word === Model.Constant.NEW_LINE || !word) {
                    converted.push(word);
                    return;
                }

                var lstAkhar = self.ToKeyCodeByWord(word.toUpperCase(), sourceType);
                var convertedWord = '';

                for (var i = 0; i < lstAkhar.length; i++) {
                    var akhar = lstAkhar[i];
                    switch (destitionType) {
                        case Model.Enum.FontYapata:
                            convertedWord += self._keyCodeToWaYapata[akhar].toString();
                            break;

                            // case Model.Enum.FontKTT:
                            //     convertedWord += self._keyCodeToKTT[akhar].toString();
                            //     break;
                            //
                            // case Model.Enum.FontGilaiPraong:
                            //     if (akhar === Model.AKhar.GakMatai) {
                            //         convertedWord += self._keyCodeToGilaiPraong[Model.AKhar.KakMatai].toString();
                            //     } else {
                            //         convertedWord += self._keyCodeToGilaiPraong[akhar].toString();
                            //     }
                            //     break;
                            //
                            // case Model.Enum.FontCamEFEO:
                            //     if (akhar === Model.AKhar.TakaiKlakTakaiKuak) {
                            //         convertedWord += self._keyCodeToCamEFEO[Model.AKhar.TakaiKlak].toString();
                            //         convertedWord += self._keyCodeToCamEFEO[Model.AKhar.TakaiKuak].toString();
                            //     } else if (akhar === Model.AKhar.TakaiKlakTakaiKuk) {
                            //         convertedWord += self._keyCodeToCamEFEO[Model.AKhar.TakaiKlak].toString();
                            //         convertedWord += self._keyCodeToCamEFEO[Model.AKhar.TakaiKuk].toString();
                            //     } else if (akhar === Model.AKhar.GakMatai) {
                            //         convertedWord += self._keyCodeToCamEFEO[Model.AKhar.KakMatai].toString();
                            //     } else {
                            //         convertedWord += self._keyCodeToCamEFEO[akhar].toString();
                            //     }
                            //     break;
                            //
                            // default:
                            //     if (akhar === Model.AKhar.TakaiKlakTakaiKuak) {
                            //         convertedWord += self._keyCodeToUniCamKur[Model.AKhar.TakaiKlak].toString();
                            //         convertedWord += self._keyCodeToUniCamKur[Model.AKhar.TakaiKuak].toString();
                            //     } else if (akhar === Model.AKhar.TakaiKlakTakaiKuk) {
                            //         convertedWord += self._keyCodeToUniCamKur[Model.AKhar.TakaiKlak].toString();
                            //         convertedWord += self._keyCodeToUniCamKur[Model.AKhar.TakaiKuk].toString();
                            //     } else {
                            //         convertedWord += self._keyCodeToUniCamKur[akhar].toString();
                            //     }
                            //     break;
                    }
                }

                converted.push(convertedWord);
            });

            var result = converted.join(' ');

            // //Trig newline character
            // result = result.Replace(' ' + Model.Constant.NEW_LINE + ' ', Model.Constant.NEW_LINE);

            return result;
        };

        self.InitTransToCamData = function(sourceType, destinationType) {

            base.InitTransToCamData(sourceType);
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

            if (sourceType === Model.Enum.TransKawomTT) {
                self._sapAtah = window.cam.service.Utility.InitSapAtah();
            }
        };
};
