/* global Model, XML */
'use strict';

if (!window.cam) {
    window.cam = {};
    if (!window.cam.service) {
        window.cam.service = {};
    }
}
window.cam.service.Utility = {};

window.cam.service.Utility.SetKeyCodeData = function(waQuyetKeyCode, gilaiPraongKeyCode, camEFEOKeyCode,
    kawomTTKeyCode, uniCamKurKeyCode, uniCamVNKeyCode, keyCodeWaQuyet,
    keyCodeGilaiPraong, keyCodeCamEFEO, keyCodeKawomTT, keyCodeUniCamKur,
    keyCodeUniCamVN) {

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
        if (!waQuyetKeyCode[waQuyet]) {
            waQuyetKeyCode[waQuyet] = keyCode;
        }

        //GilaiPraong - Key code
        if (!gilaiPraongKeyCode[gilaiPraong]) {
            gilaiPraongKeyCode[gilaiPraong] = keyCode;
        }

        //CamEFEO - Key code
        if (!camEFEOKeyCode[camEFEO]) {
            camEFEOKeyCode[camEFEO] = keyCode;
        }

        //KawomTuekTuah - Key code
        if (!kawomTTKeyCode[kawomTuekTuah]) {
            kawomTTKeyCode[kawomTuekTuah] = keyCode;
        }

        //UniCamKur - Key code
        if (!uniCamKurKeyCode[uniCamKur]) {
            uniCamKurKeyCode[uniCamKur] = keyCode;
        }

        // Key code - WaQuyet
        if (!keyCodeWaQuyet[keyCode]) {
            keyCodeWaQuyet[keyCode] = waQuyet;
        }

        //Key code - GilaiPraong
        if (!keyCodeGilaiPraong[keyCode]) {
            keyCodeGilaiPraong[keyCode] = gilaiPraong;
        }

        //Key code - CamEFEO
        if (!keyCodeCamEFEO[keyCode]) {
            keyCodeCamEFEO[keyCode] = camEFEO;
        }

        //Key code - KawomTuekTuah
        if (!keyCodeKawomTT[keyCode]) {
            keyCodeKawomTT[keyCode] = kawomTuekTuah;
        }

        //Key code - UniCamKur
        if (!keyCodeUniCamKur[keyCode]) {
            keyCodeUniCamKur[keyCode] = uniCamKur;
        }

        //Key code - UniCamVN
        if (!keyCodeUniCamVN[keyCode]) {
            keyCodeUniCamVN[keyCode] = uniCamKur;
        }
    });
};

window.cam.service.Utility.ReadXMLFile = function(fileName) {
    return XML[fileName];
};

window.cam.service.Utility.SetValidTransChar = function(validCamEFEO, validInra, validKTT) {

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
};

window.cam.service.Utility.InitDiipToMaTai = function() {
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
};

window.cam.service.Utility.InitKanaing = function() {
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
};
window.cam.service.Utility.InitKareiCrih = function(dataType) {
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
};
window.cam.service.Utility.InitDiipToTaKai = function(sourceType) {
    var ret = {};

    ret[Model.AKhar.Ik] = Model.AKhar.TakaiKiak;
    ret[Model.AKhar.Lak] = Model.AKhar.TakaiKlak;
    ret[Model.AKhar.Rak] = Model.AKhar.TakaiKrak;

    if (sourceType == Model.Enum.TransCamEFEO) {
        ret[Model.AKhar.Uk] = Model.AKhar.TakaiKuak;
    } else {
        ret[Model.AKhar.Wak] = Model.AKhar.TakaiKuak;
    }

    return ret;
};
window.cam.service.Utility.InitConsonantKareiCrih = function() {
    var ret = {};

    ret[Model.AKhar.Mâk] = Model.AKhar.Mak;
    ret[Model.AKhar.Nâk] = Model.AKhar.Nak;
    ret[Model.AKhar.Nyâk] = Model.AKhar.Nyak;
    ret[Model.AKhar.Ngâk] = Model.AKhar.Ngak;

    return ret;
};
window.cam.service.Utility.InitSapPaohAngaok = function() {
    var ret = {};

    ret[Model.AKhar.Balau] = true;
    ret[Model.AKhar.BalauTapong] = true;
    ret[Model.AKhar.TakaiKik] = true;
    ret[Model.AKhar.TakaiKikTutTakaiMâkDalem] = true;
    ret[Model.AKhar.TraohAw] = true;
    ret[Model.AKhar.É] = true;

    return ret;
};
window.cam.service.Utility.InitSapPaoh = function() {
    var ret = {};

    ret[Model.AKhar.Ak] = true;
    ret[Model.AKhar.Ik] = true;
    ret[Model.AKhar.Uk] = true;
    ret[Model.AKhar.Ok] = true;
    ret[Model.AKhar.DarDua] = true;
    ret[Model.AKhar.É] = true;
    ret[Model.AKhar.TakaiThek] = true;

    return ret;
};
window.cam.service.Utility.InitTakaiLikuk = function() {
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
};
window.cam.service.Utility.InitVowelLangLikuk = function() {
    var ret = {};

    ret[Model.AKhar.Ak] = true;
    ret[Model.AKhar.Ik] = true;
    ret[Model.AKhar.Uk] = true;
    ret[Model.AKhar.TakaiKâk] = true;
    ret[Model.AKhar.TakaiKik] = true;
    ret[Model.AKhar.TakaiKuk] = true;

    return ret;
};
window.cam.service.Utility.InitTakaiDaokLikuk = function() {
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
};
window.cam.service.Utility.InitVowelKTT = function() {
    var vowel = {};

    vowel.a = 'aa';
    vowel.ô = 'ôô';
    vowel.u = 'uu';
    vowel.ư = 'ưư';
    vowel.ơ = 'ơơ';
    vowel.e = 'ee';

    return vowel;
};
window.cam.service.Utility.InitSapAtah = function() {
    var sapAtah = {};

    sapAtah[Model.AKhar.Ak] = Model.AKhar.Balau;
    sapAtah[Model.AKhar.Ok] = Model.AKhar.TraohAw;
    sapAtah[Model.AKhar.Uk] = Model.AKhar.Balau;
    sapAtah[Model.AKhar.TakaiKâk] = Model.AKhar.Balau;
    sapAtah[Model.AKhar.TakaiThek] = Model.AKhar.BalauTapong;
    sapAtah[Model.AKhar.DarDua] = Model.AKhar.Balau;

    return sapAtah;
};
window.cam.service.Utility.SetTransToKeyCode = function(transKeycode, desType) {

    var columnNo = Model.XMLTransToKeyCol.Rumi;
    var sapPaohAO = '';
    var sapPaohAOM = '';
    var sapPaohAONG = '';
    var sapPaohEM = '';
    var akharIÉNG = '';
    var akharIENG = '';
    var sapPaohAU = '';

    if (desType == Model.Enum.TransCamEFEO) {
        columnNo = Model.XMLTransToKeyCol.Rumi;
        sapPaohAO = Model.Constant.AO_EFEO;
        sapPaohAOM = Model.Constant.AOM_EFEO;
        sapPaohAONG = Model.Constant.AONG_EFEO;
        sapPaohEM = Model.Constant.EM_EFEO;
        akharIÉNG = Model.Constant.IÉNG_EFEO;
        akharIENG = Model.Constant.IENG_EFEO;
        sapPaohAU = Model.Constant.AU_EFEO;
    } else if (desType == Model.Enum.TransInrasara) {
        columnNo = Model.XMLTransToKeyCol.InraSara;
        sapPaohAO = Model.Constant.AO_SARA;
        sapPaohAOM = Model.Constant.AOM_SARA;
        sapPaohAONG = Model.Constant.AONG_SARA;
        sapPaohEM = Model.Constant.EM_SARA;
        akharIÉNG = Model.Constant.IÉNG_SARA;
        akharIENG = Model.Constant.IENG_SARA;
        sapPaohAU = Model.Constant.AU_SARA;
    } else if (desType == Model.Enum.TransKawomTT) {
        columnNo = Model.XMLTransToKeyCol.KawomTuekTuah;
        sapPaohAO = Model.Constant.AO_KawomTT;
        sapPaohAOM = Model.Constant.AOM_KawomTT;
        sapPaohAONG = Model.Constant.AONG_KawomTT;
        sapPaohEM = Model.Constant.EM_KawomTT;
        akharIÉNG = Model.Constant.IÉNG_KawomTT;
        akharIENG = Model.Constant.IENG_KawomTT;
        sapPaohAU = Model.Constant.AU_KawomTT;

        var sappaohE = [];
        sappaohE.push(Model.AKhar.DarDua);
        transKeycode.E = sappaohE;

        var iim = [];
        iim.push(Model.AKhar.TakaiKiak);
        iim.push(Model.AKhar.TakaiKikTutTakaiMâkLingiw);
        transKeycode.IIM = iim;
    }

    //Add au
    var sappaohAu = [];
    sappaohAu.push(Model.AKhar.TakaiKuk);
    sappaohAu.push(Model.AKhar.TakaiThek);
    transKeycode[sapPaohAU] = sappaohAu;

    //Add iéng
    var lstTemp = [];
    lstTemp.push(Model.AKhar.DarSa);
    lstTemp.push(Model.AKhar.TakaiKiak);
    lstTemp.push(Model.AKhar.TakaiThekPaohNgâk);
    transKeycode[akharIÉNG] = lstTemp;

    //Add ieng
    lstTemp = [];
    lstTemp.push(Model.AKhar.TakaiKiak);
    lstTemp.push(Model.AKhar.TakaiThekPaohNgâk);
    transKeycode[akharIENG] = lstTemp;

    var transToKey = this.ReadXMLFile(Model.Constant.TRANS_TO_KEY_FILE);
    transToKey.forEach(function(dtr) {
        var akhar = dtr[Model.XMLTransToKeyCol.KeyCode];
        var transChar = dtr[columnNo].toUpperCase();
        var listAkhar = [];

        //Keycode - Rumi
        var isIrregular = false;
        if (!transKeycode[transChar]) {
            if (transChar == sapPaohAO) {
                listAkhar.push(Model.AKhar.DarSa);
                listAkhar.push(Model.AKhar.TraohAw);
                isIrregular = true;
            }

            if (transChar == sapPaohAOM) {
                listAkhar.push(Model.AKhar.DarSa);
                listAkhar.push(Model.AKhar.TraohAwTutTakaiMâk);
                isIrregular = true;
            }

            if (transChar == sapPaohAONG) {
                listAkhar.push(Model.AKhar.DarSa);
                listAkhar.push(Model.AKhar.TraohAwPaohNgâk);
                isIrregular = true;
            }

            if (transChar == sapPaohEM) {
                listAkhar.push(Model.AKhar.DarSa);
                listAkhar.push(Model.AKhar.TakaiThek);
                listAkhar.push(Model.AKhar.TakaiThekTutTakaiMâk);
                isIrregular = true;
            }

            if (!isIrregular) {
                listAkhar.push(akhar);
            }

            transKeycode[transChar] = listAkhar;
        }
    });

    //add au, am dai
    if (desType == Model.Enum.TransKawomTT) {
        var listAkhar = [];
        listAkhar.push(Model.AKhar.DarSa);
        listAkhar.push(Model.AKhar.TraohAw);

        transKeycode[sapPaohAO] = listAkhar;

        //OO
        transKeycode.OO = listAkhar;

        //AA
        listAkhar = [];
        listAkhar.push(Model.AKhar.Balau);
        transKeycode.AA = listAkhar;

        //UU
        listAkhar = [];
        listAkhar.push(Model.AKhar.Balau);
        listAkhar.push(Model.AKhar.TakaiKuk);
        transKeycode.UU = listAkhar;

        //EE
        listAkhar = [];
        listAkhar.push(Model.AKhar.DarDua);
        listAkhar.push(Model.AKhar.Balau);
        transKeycode.EE = listAkhar;

        //ƯƯ
        listAkhar = [];
        listAkhar.push(Model.AKhar.TakaiKâk);
        listAkhar.push(Model.AKhar.Balau);
        transKeycode.ƯƯ = listAkhar;

        //ƠƠ
        listAkhar = [];
        listAkhar.push(Model.AKhar.BalauTapong);
        transKeycode.ƠƠ = listAkhar;

        //II
        listAkhar = [];
        listAkhar.push(Model.AKhar.TakaiKikTutTakaiMâkDalem);
        transKeycode.II = listAkhar;
    }
};

window.cam.service.Utility.CopyListAkhar = function(listSource) {
    return listSource.slice();
};

window.cam.service.Utility.PopStackToList = function(list, stack, addFirst) {
    while (stack.length() != 0) {
        var index = addFirst ? 0 : list.length;
        list.splice(index, 0, stack.pop());
    }
};

window.cam.service.Utility.SetTransFromXML = function(keyCodeTrans, desType) {
    var colNo = Model.XMLRumiCol.Rumi;
    if (desType == Model.Enum.TransCamEFEO) {
        colNo = Model.XMLRumiCol.Rumi;
    } else if (desType == Model.Enum.TransInrasara) {
        colNo = Model.XMLRumiCol.InraSara;
    } else if (desType == Model.Enum.TransKawomTT) {
        colNo = Model.XMLRumiCol.KawomTT;
    }

    var keyToTrans = this.ReadXMLFile(Model.Constant.KEY_TO_TRANS_FILE);
    keyToTrans.forEach(function(dtr) {
        var keyCode = dtr[Model.XMLRumiCol.KeyCode];
        var trans = dtr[colNo];

        //Keycode - Trans
        if (!keyCodeTrans[keyCode]) {
            keyCodeTrans[keyCode] = trans;
        }
    });
};
