/* global Model, XML */

'use strict';
if (!window.cam) {
    window.cam = {};
    if (!window.cam.service) {
        window.cam.service = {};
    }
}

window.cam.service.Utility = {
    SetKeyCodeData: function(waQuyetKeyCode, gilaiPraongKeyCode, camEFEOKeyCode,
        kawomTTKeyCode, uniCamKurKeyCode, uniCamVNKeyCode, keyCodeWaQuyet,
        keyCodeGilaiPraong, keyCodeCamEFEO, keyCodeKawomTT, keyCodeUniCamKur,
        keyCodeUniCamVN) {

        // //Cam - Keycode
        // waQuyetKeyCode = {};
        // gilaiPraongKeyCode = {};
        // camEFEOKeyCode = {};
        // kawomTTKeyCode = {};
        // uniCamKurKeyCode = {};
        // uniCamVNKeyCode = {};
        //
        // //Keycode - Cam
        // keyCodeWaQuyet = {};
        // keyCodeGilaiPraong = {};
        // keyCodeCamEFEO = {};
        // keyCodeKawomTT = {};
        // keyCodeUniCamKur = {};
        // keyCodeUniCamVN = {};

        //Read XML file
        var keyToFontDate = this.ReadXMLFile(Model.Constant.KEY_TO_FONT_FILE);
        keyToFontDate.forEach(function(dtr) {

            var keyCode = dtr[Model.XMLKeyCodeCol.KeyCode];
            var waQuyet = dtr[Model.XMLKeyCodeCol.WaQuyet];
            var gilaiPraong = dtr[Model.XMLKeyCodeCol.GilaiPraong];
            var camEFEO = dtr[Model.XMLKeyCodeCol.CamEFEO];
            var kawomTuekTuah = dtr[Model.XMLKeyCodeCol.KawomTuekTuah];
            var uniCamKur = dtr[Model.XMLKeyCodeCol.UnicodeCamKur];
            // var uniCamVN = dtr[Model.XMLKeyCodeCol.UnicodeCamVN].toString();

            //WaQuyet - Key code
            waQuyetKeyCode[waQuyet] = keyCode;

            //GilaiPraong - Key code
            gilaiPraongKeyCode[gilaiPraong] = keyCode;

            //CamEFEO - Key code
            camEFEOKeyCode[camEFEO] = keyCode;

            //KawomTuekTuah - Key code
            kawomTTKeyCode[kawomTuekTuah] = keyCode;

            //UniCamKur - Key code
            uniCamKurKeyCode[uniCamKur] = keyCode;

            // Key code - WaQuyet
            keyCodeWaQuyet[keyCode] = keyCode;

            //Key code - GilaiPraong
            keyCodeGilaiPraong[keyCode] = gilaiPraong;

            //Key code - CamEFEO
            keyCodeCamEFEO[keyCode] = camEFEO;

            //Key code - KawomTuekTuah
            keyCodeKawomTT[keyCode] = kawomTuekTuah;

            //Key code - UniCamKur
            keyCodeUniCamKur[keyCode] = uniCamKur;

            //Key code - UniCamVN
            keyCodeUniCamVN[keyCode] = uniCamKur;
        });
    },
    ReadXMLFile: function(fileName) {
        return XML[fileName];
    },
    SetValidTransChar: function(validCamEFEO, validInra, validKTT) {
        // validCamEFEO = new Hashtable();
        // validInra = new Hashtable();
        // validKTT = new Hashtable();

        var validChars = this.ReadXMLFile(Model.Constant.VALID_TRANS_CHAR_FILE);
        validChars.forEach(function(dtr) {
            //Valid Rumi CharWW
            var rumiChar = dtr.Rumi;
            if (rumiChar) {
                validCamEFEO[rumiChar.toUpperCase()] = true;
            }

            //Valid Inrasara Char
            var inraChar = dtr.Inrasara;
            if (inraChar) {
                validInra[inraChar.toUpperCase()] = true;
            }

            //Valid KTT Char
            var kttChar = dtr.KTT;
            if (kttChar) {
                validKTT[kttChar.toUpperCase()] = true;
            }
        });
    },
    InitDiipToMaTai: function() {
        var ret = {};

        ret[Model.AKhar.Kak] = Model.AKhar.KakMatai;
        ret[Model.AKhar.Gak] = Model.AKhar.GakMatai;
        ret[Model.AKhar.Ngâk] = Model.AKhar.NgâkMatai;
        ret[Model.AKhar.Cak] = Model.AKhar.CakMatai;
        ret[Model.AKhar.Tak] = Model.AKhar.TakMatai;
        ret[Model.AKhar.Nâk] = Model.AKhar.NâkMatai;
        ret[Model.AKhar.Pak] = Model.AKhar.PakMatai;
        ret[Model.AKhar.Mâk] = Model.AKhar.TutTakaiMâk;
        ret[Model.AKhar.Yak] = Model.AKhar.YakMatai;
        ret[Model.AKhar.Rak] = Model.AKhar.RakMatai;
        ret[Model.AKhar.Lak] = Model.AKhar.LakMatai;
        ret[Model.AKhar.Wak] = Model.AKhar.WakMatai;
        ret[Model.AKhar.Xak] = Model.AKhar.XakMatai;
        ret[Model.AKhar.Hak] = Model.AKhar.PaohDaNih;

        return ret;
    },
    InitKanaing: function() {
        var ret = {};

        ret[','] = true;
        ret['.'] = true;
        ret['!'] = true;
        ret['?'] = true;
        ret[';'] = true;
        ret['('] = true;
        ret[')'] = true;
        ret['-'] = true;

        return ret;
    },
    InitKareiCrih: function(dataType) {
        var ret = {};
        var xaaiTrans;
        var saaiTrans;
        var aiTrans;
        var ppoTrans;
        var liauaTrans;
        var auaTrans;
        var aiaTrans;
        var iaTrans;
        var aoTrans;

        xaaiTrans = 'XAAI';
        saaiTrans = 'SAAI';
        aiTrans = 'AI';
        aiaTrans = 'AIA';
        iaTrans = 'IA';
        switch (dataType) {
            case Model.Enum.TransCamEFEO:
                ppoTrans = 'PPO';
                liauaTrans = 'LIAUA';
                auaTrans = 'AUA';
                aoTrans = 'AO';
                break;

            case Model.Enum.TransInrasara:
                ppoTrans = 'PPO';
                liauaTrans = 'LIAWA';
                auaTrans = 'AWA';
                aoTrans = 'AU';
                break;

            default:
                ppoTrans = 'PPÔ';
                liauaTrans = 'LIAWA';
                auaTrans = 'AWA';
                aoTrans = 'AU';
                break;
        }

        //xaai
        var xaai = [];
        xaai.push(Model.AKhar.Xak);
        xaai.push(Model.AKhar.DarDua);
        xaai.push(Model.AKhar.Ai);
        ret[xaaiTrans] = xaai;

        //ai
        var ai = [];
        ai.push(Model.AKhar.DarDua);
        ai.push(Model.AKhar.Ai);
        ret[aiTrans] = ai;

        //saai
        var saai = [];
        saai.push(Model.AKhar.SakPraong);
        saai.push(Model.AKhar.DarDua);
        saai.push(Model.AKhar.Ai);
        ret[saaiTrans] = saai;

        //po
        var ppo = [];
        ppo.push(Model.AKhar.DarSa);
        ppo.push(Model.AKhar.PakPraong);
        ppo.push(Model.AKhar.TakaiThek);
        ret[ppoTrans] = ppo;

        //liaua
        var liaua = [];
        liaua.push(Model.AKhar.Lak);
        liaua.push(Model.AKhar.TakaiKik);
        liaua.push(Model.AKhar.Ak);
        liaua.push(Model.AKhar.TakaiKuak);
        liaua.push(Model.AKhar.Balau);
        ret[liauaTrans] = liaua;

        //aua
        var aua = [];
        aua.push(Model.AKhar.Ak);
        aua.push(Model.AKhar.TakaiKuak);
        aua.push(Model.AKhar.Balau);
        ret[auaTrans] = aua;

        //aia
        var aia = [];
        aia.push(Model.AKhar.Ak);
        aia.push(Model.AKhar.TakaiKiak);
        aia.push(Model.AKhar.Balau);
        ret[aiaTrans] = aia;
        //ia
        ret[iaTrans] = aia;

        //ao
        var ao = [];
        ao.push(Model.AKhar.DarSa);
        ao.push(Model.AKhar.Ak);
        ao.push(Model.AKhar.TraohAw);
        ret[aoTrans] = ao;

        return ret;
    },
    InitDiipToTaKai: function(sourceType) {
        var ret = {};

        ret[Model.AKhar.Ik] = Model.AKhar.TakaiKiak;
        ret[Model.AKhar.Lak] = Model.AKhar.TakaiKlak;
        ret[Model.AKhar.Rak] = Model.AKhar.TakaiKrak;

        if (sourceType === Model.Enum.TransCamEFEO) {
            ret[Model.AKhar.Uk] = Model.AKhar.TakaiKuak;
        } else {
            ret[Model.AKhar.Wak] = Model.AKhar.TakaiKuak;
        }

        return ret;
    },
    InitConsonantKareiCrih: function() {
        var ret = {};

        ret[Model.AKhar.Mâk] = Model.AKhar.Mak;
        ret[Model.AKhar.Nâk] = Model.AKhar.Nak;
        ret[Model.AKhar.Nyâk] = Model.AKhar.Nyak;
        ret[Model.AKhar.Ngâk] = Model.AKhar.Ngak;

        return ret;
    },
    InitSapPaohAngaok: function() {
        var ret = {};

        ret[Model.AKhar.Balau] = true;
        ret[Model.AKhar.BalauTapong] = true;
        ret[Model.AKhar.TakaiKik] = true;
        ret[Model.AKhar.TakaiKikTutTakaiMâkDalem] = true;
        ret[Model.AKhar.TraohAw] = true;
        ret[Model.AKhar.É] = true;

        return ret;
    },
    InitSapPaoh: function() {
        var ret = {};

        ret[Model.AKhar.Ak] = true;
        ret[Model.AKhar.Ik] = true;
        ret[Model.AKhar.Uk] = true;
        ret[Model.AKhar.Ok] = true;
        ret[Model.AKhar.DarDua] = true;
        ret[Model.AKhar.É] = true;
        ret[Model.AKhar.TakaiThek] = true;

        return ret;
    },
    InitTakaiLikuk: function() {
        var ret = {};

        ret[Model.AKhar.TakaiKiak] = true;
        ret[Model.AKhar.TakaiKlak] = true;
        ret[Model.AKhar.TakaiKuak] = true;
        ret[Model.AKhar.TakaiKlakTakaiKuak] = true;
        ret[Model.AKhar.TakaiKlakTakaiKuk] = true;
        ret[Model.AKhar.TakaiKuk] = true;
        ret[Model.AKhar.TakaiThek] = true;
        ret[Model.AKhar.TakaiKâk] = true;

        return ret;
    },
    InitVowelLangLikuk: function() {
        var ret = {};

        ret[Model.AKhar.Ak] = true;
        ret[Model.AKhar.Ik] = true;
        ret[Model.AKhar.Uk] = true;
        ret[Model.AKhar.TakaiKâk] = true;
        ret[Model.AKhar.TakaiKik] = true;
        ret[Model.AKhar.TakaiKuk] = true;

        return ret;
    },
    InitTakaiDaokLikuk: function() {
        var ret = {};

        ret[Model.AKhar.TakaiKik] = true;
        ret[Model.AKhar.TakaiKikTutTakaiMâkDalem] = true;
        ret[Model.AKhar.TakaiKikTutTakaiMâkLingiw] = true;
        ret[Model.AKhar.TakaiKikTutTakaiYak] = true;
        ret[Model.AKhar.TakaiThek] = true;
        ret[Model.AKhar.TakaiThekTutTakaiMâk] = true;
        ret[Model.AKhar.TakaiThekPaohNgâk] = true;
        ret[Model.AKhar.TakaiKuk] = true;
        ret[Model.AKhar.TakaiKâk] = true;
        ret[Model.AKhar.TakaiKiak] = true;
        ret[Model.AKhar.TakaiKuak] = true;
        ret[Model.AKhar.TakaiKlak] = true;
        ret[Model.AKhar.TakaiKlakTakaiKuak] = true;
        ret[Model.AKhar.TakaiKlakTakaiKuk] = true;
        ret[Model.AKhar.TraohAw] = true;

        return ret;
    },
    InitVowelKTT: function() {
        var vowel = {};

        vowel.a = 'aa';
        vowel.ô = 'ôô';
        vowel.u = 'uu';
        vowel.ư = 'ưư';
        vowel.ơ = 'ơơ';
        vowel.e = 'ee';

        return vowel;
    },
    InitSapAtah: function() {
        var sapAtah = {};

        sapAtah[Model.AKhar.Ak] = Model.AKhar.Balau;
        sapAtah[Model.AKhar.Ok] = Model.AKhar.TraohAw;
        sapAtah[Model.AKhar.Uk] = Model.AKhar.Balau;
        sapAtah[Model.AKhar.TakaiKâk] = Model.AKhar.Balau;
        sapAtah[Model.AKhar.TakaiThek] = Model.AKhar.BalauTapong;
        sapAtah[Model.AKhar.DarDua] = Model.AKhar.Balau;

        return sapAtah;
    }
};
