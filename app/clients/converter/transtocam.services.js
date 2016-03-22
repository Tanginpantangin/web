/* global Model */
'use strict';
if (!window.cam) {
    window.cam = {},
        if (!window.cam.service) {
            window.cam.service = {},
        }
}

window.cam.service.TransToCamPaxalih = {

    _DASH: '-',
    _trans_IM: '',
    _trans_LU: '',
    _trans_LW: '',
    _trans_AI: '',
    _trans_AO: '',
    _trans_AU: '',

    _transToKeycode: {},
    _sapAtah: {},

    DoConvert: function(data, sourceType, destitionType) {
        //Init Rumi To Cam data
        window.cam.service.TransToCamPaxalih.InitTransToCamData(sourceType, destitionType);

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

            var lstAkhar = window.cam.service.TransToCamPaxalih.ToKeyCodeByWord(word.ToUpper(), sourceType);
            var convertedWord = '';

            for (var i = 0; i < lstAkhar.length; i++) {
                var akhar = lstAkhar[i];
                switch (destitionType) {
                    case Model.Enum.FontYapata:
                        convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToWaYapata[akhar].toString();
                        break;

                    // case Model.Enum.FontKTT:
                    //     convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToKTT[akhar].toString();
                    //     break;
                    //
                    // case Model.Enum.FontGilaiPraong:
                    //     if (akhar === Model.AKhar.GakMatai) {
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToGilaiPraong[Model.AKhar.KakMatai].toString();
                    //     } else {
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToGilaiPraong[akhar].toString();
                    //     }
                    //     break;
                    //
                    // case Model.Enum.FontCamEFEO:
                    //     if (akhar === Model.AKhar.TakaiKlakTakaiKuak) {
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToCamEFEO[Model.AKhar.TakaiKlak].toString();
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToCamEFEO[Model.AKhar.TakaiKuak].toString();
                    //     } else if (akhar === Model.AKhar.TakaiKlakTakaiKuk) {
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToCamEFEO[Model.AKhar.TakaiKlak].toString();
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToCamEFEO[Model.AKhar.TakaiKuk].toString();
                    //     } else if (akhar === Model.AKhar.GakMatai) {
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToCamEFEO[Model.AKhar.KakMatai].toString();
                    //     } else {
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToCamEFEO[akhar].toString();
                    //     }
                    //     break;
                    //
                    // default:
                    //     if (akhar === Model.AKhar.TakaiKlakTakaiKuak) {
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToUniCamKur[Model.AKhar.TakaiKlak].toString();
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToUniCamKur[Model.AKhar.TakaiKuak].toString();
                    //     } else if (akhar === Model.AKhar.TakaiKlakTakaiKuk) {
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToUniCamKur[Model.AKhar.TakaiKlak].toString();
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToUniCamKur[Model.AKhar.TakaiKuk].toString();
                    //     } else {
                    //         convertedWord += window.cam.service.TransToCamPaxalih._keyCodeToUniCamKur[akhar].toString();
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
    },
    InitTransToCamData: function(sourceType, destinationType)
       {

           base.InitTransToCamData(sourceType);
           Utility.SetTransToKeyCode(ref window.cam.service.TransToCamPaxalih._transToKeycode, sourceType);

           window.cam.service.TransToCamPaxalih._trans_IM = 'IM';
           window.cam.service.TransToCamPaxalih._trans_AI = 'AI';
           window.cam.service.TransToCamPaxalih._trans_LU = 'LU';
           switch (sourceType)
           {
               case Model.Enum.TransCamEFEO:
                   window.cam.service.TransToCamPaxalih._trans_LW = 'LU';
                   window.cam.service.TransToCamPaxalih._trans_AO = 'AO';
                   window.cam.service.TransToCamPaxalih._trans_AU = 'AU';
                   break;

               default:
                   window.cam.service.TransToCamPaxalih._trans_LW = 'LW';
                   window.cam.service.TransToCamPaxalih._trans_AO = 'AU';
                   break;
           }

           if (sourceType == Model.Enum.TransKawomTT)
           {
               window.cam.service.TransToCamPaxalih._sapAtah = Utility.InitSapAtah();
           }
       }
};
