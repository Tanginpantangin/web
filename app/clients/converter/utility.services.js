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
    }

    // /// <summary>
    // /// Init Kanaing hashtable
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitKanaing()
    // {
    //     Hashtable ret = new Hashtable();
    //
    //     ret.Add(",", null);
    //     ret.Add(".", null);
    //     ret.Add("!", null);
    //     ret.Add("?", null);
    //     ret.Add(";", null);
    //     ret.Add("(", null);
    //     ret.Add(")", null);
    //     ret.Add("-", null);
    //
    //     return ret;
    // }
    //
    // /// <summary>
    // /// Init Karei Crih Char hashtable
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitKareiCrih(Model.Enum dataType)
    // {
    //     Hashtable ret = new Hashtable();
    //     string xaaiTrans;
    //     string saaiTrans;
    //     string aiTrans;
    //     string ppoTrans;
    //     string liauaTrans;
    //     string auaTrans;
    //     string aiaTrans;
    //     string iaTrans;
    //     string aoTrans;
    //
    //     xaaiTrans = "XAAI";
    //     saaiTrans = "SAAI";
    //     aiTrans = "AI";
    //     aiaTrans = "AIA";
    //     iaTrans = "IA";
    //     switch (dataType)
    //     {
    //
    //         case Model.Enum.TransCamEFEO:
    //             ppoTrans = "PPO";
    //             liauaTrans = "LIAUA";
    //             auaTrans = "AUA";
    //             aoTrans = "AO";
    //             break;
    //
    //         case Model.Enum.TransInrasara:
    //             ppoTrans = "PPO";
    //             liauaTrans = "LIAWA";
    //             auaTrans = "AWA";
    //             aoTrans = "AU";
    //             break;
    //
    //         default:
    //             ppoTrans = "PPÔ";
    //             liauaTrans = "LIAWA";
    //             auaTrans = "AWA";
    //             aoTrans = "AU";
    //             break;
    //     }
    //
    //     //xaai
    //     List<Model.AKhar> xaai = new List<Model.AKhar>();
    //     xaai.Add(Model.AKhar.Xak);
    //     xaai.Add(Model.AKhar.DarDua);
    //     xaai.Add(Model.AKhar.Ai);
    //     ret.Add(xaaiTrans, xaai);
    //
    //     //ai
    //     List<Model.AKhar> ai = new List<Model.AKhar>();
    //     ai.Add(Model.AKhar.DarDua);
    //     ai.Add(Model.AKhar.Ai);
    //     ret.Add(aiTrans, ai);
    //
    //     //saai
    //     List<Model.AKhar> saai = new List<Model.AKhar>();
    //     saai.Add(Model.AKhar.SakPraong);
    //     saai.Add(Model.AKhar.DarDua);
    //     saai.Add(Model.AKhar.Ai);
    //     ret.Add(saaiTrans, saai);
    //
    //     //po
    //     List<Model.AKhar> ppo = new List<Model.AKhar>();
    //     ppo.Add(Model.AKhar.DarSa);
    //     ppo.Add(Model.AKhar.PakPraong);
    //     ppo.Add(Model.AKhar.TakaiThek);
    //     ret.Add(ppoTrans, ppo);
    //
    //     //liaua
    //     List<Model.AKhar> liaua = new List<Model.AKhar>();
    //     liaua.Add(Model.AKhar.Lak);
    //     liaua.Add(Model.AKhar.TakaiKik);
    //     liaua.Add(Model.AKhar.Ak);
    //     liaua.Add(Model.AKhar.TakaiKuak);
    //     liaua.Add(Model.AKhar.Balau);
    //     ret.Add(liauaTrans, liaua);
    //
    //     //aua
    //     List<Model.AKhar> aua = new List<Model.AKhar>();
    //     aua.Add(Model.AKhar.Ak);
    //     aua.Add(Model.AKhar.TakaiKuak);
    //     aua.Add(Model.AKhar.Balau);
    //     ret.Add(auaTrans, aua);
    //
    //     //aia
    //     List<Model.AKhar> aia = new List<Model.AKhar>();
    //     aia.Add(Model.AKhar.Ak);
    //     aia.Add(Model.AKhar.TakaiKiak);
    //     aia.Add(Model.AKhar.Balau);
    //     ret.Add(aiaTrans, aia);
    //     //ia
    //     ret.Add(iaTrans, aia);
    //
    //     //ao
    //     List<Model.AKhar> ao = new List<Model.AKhar>();
    //     ao.Add(Model.AKhar.DarSa);
    //     ao.Add(Model.AKhar.Ak);
    //     ao.Add(Model.AKhar.TraohAw);
    //     ret.Add(aoTrans, ao);
    //
    //     return ret;
    // }
    //
    // /// <summary>
    // /// Init Karei Diip To Takai HashTable
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitDiipToTaKai(Model.Enum sourceType)
    // {
    //     Hashtable ret = new Hashtable();
    //
    //     ret.Add(Model.AKhar.Ik, Model.AKhar.TakaiKiak);
    //     ret.Add(Model.AKhar.Lak, Model.AKhar.TakaiKlak);
    //     ret.Add(Model.AKhar.Rak, Model.AKhar.TakaiKrak);
    //
    //     if (sourceType == Model.Enum.TransCamEFEO)
    //     {
    //
    //         ret.Add(Model.AKhar.Uk, Model.AKhar.TakaiKuak);
    //     }
    //     else
    //     {
    //
    //         ret.Add(Model.AKhar.Wak, Model.AKhar.TakaiKuak);
    //     }
    //
    //     return ret;
    // }
    //
    // /// <summary>
    // /// Init Consonant Karei Crih Hashtable
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitConsonantKareiCrih()
    // {
    //     Hashtable ret = new Hashtable();
    //
    //     ret.Add(Model.AKhar.Mâk, Model.AKhar.Mak);
    //     ret.Add(Model.AKhar.Nâk, Model.AKhar.Nak);
    //     ret.Add(Model.AKhar.Nyâk, Model.AKhar.Nyak);
    //     ret.Add(Model.AKhar.Ngâk, Model.AKhar.Ngak);
    //
    //     return ret;
    // }
    //
    // /// <summary>
    // /// Init Sap Poah Angaok Hashtable
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitSapPaohAngaok()
    // {
    //     Hashtable ret = new Hashtable();
    //
    //     ret.Add(Model.AKhar.Balau, null);
    //     ret.Add(Model.AKhar.BalauTapong, null);
    //     ret.Add(Model.AKhar.TakaiKik, null);
    //     ret.Add(Model.AKhar.TakaiKikTutTakaiMâkDalem, null);
    //     ret.Add(Model.AKhar.TraohAw, null);
    //     ret.Add(Model.AKhar.É, null);
    //
    //     return ret;
    // }
    //
    // /// <summary>
    // /// Init Sap Poah Hashtable
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitSapPaoh()
    // {
    //     Hashtable ret = new Hashtable();
    //
    //     ret.Add(Model.AKhar.Ak, null);
    //     ret.Add(Model.AKhar.Ik, null);
    //     ret.Add(Model.AKhar.Uk, null);
    //     ret.Add(Model.AKhar.Ok, null);
    //     ret.Add(Model.AKhar.DarDua, null);
    //     ret.Add(Model.AKhar.É, null);
    //     ret.Add(Model.AKhar.TakaiThek, null);
    //
    //     return ret;
    // }
    //
    // /// <summary>
    // /// Init Takai Likuk Hashtable
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitTakaiLikuk()
    // {
    //     Hashtable ret = new Hashtable();
    //
    //     ret.Add(Model.AKhar.TakaiKiak, null);
    //     ret.Add(Model.AKhar.TakaiKlak, null);
    //     ret.Add(Model.AKhar.TakaiKuak, null);
    //     ret.Add(Model.AKhar.TakaiKlakTakaiKuak, null);
    //     ret.Add(Model.AKhar.TakaiKlakTakaiKuk, null);
    //     ret.Add(Model.AKhar.TakaiKuk, null);
    //     ret.Add(Model.AKhar.TakaiThek, null);
    //     ret.Add(Model.AKhar.TakaiKâk, null);
    //
    //     return ret;
    // }
    //
    // /// <summary>
    // /// Init Vowel Lang Likuk Hashtable
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitVowelLangLikuk()
    // {
    //     Hashtable ret = new Hashtable();
    //
    //     ret.Add(Model.AKhar.Ak, null);
    //     ret.Add(Model.AKhar.Ik, null);
    //     ret.Add(Model.AKhar.Uk, null);
    //     ret.Add(Model.AKhar.TakaiKâk, null);
    //     ret.Add(Model.AKhar.TakaiKik, null);
    //     ret.Add(Model.AKhar.TakaiKuk, null);
    //
    //     return ret;
    // }
    //
    // /// <summary>
    // /// Init Takai Daok Likuk Hashtable
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitTakaiDaokLikuk()
    // {
    //     Hashtable ret = new Hashtable();
    //
    //     ret.Add(Model.AKhar.TakaiKik, null);
    //     ret.Add(Model.AKhar.TakaiKikTutTakaiMâkDalem, null);
    //     ret.Add(Model.AKhar.TakaiKikTutTakaiMâkLingiw, null);
    //     ret.Add(Model.AKhar.TakaiKikTutTakaiYak, null);
    //     ret.Add(Model.AKhar.TakaiThek, null);
    //     ret.Add(Model.AKhar.TakaiThekTutTakaiMâk, null);
    //     ret.Add(Model.AKhar.TakaiThekPaohNgâk, null);
    //     ret.Add(Model.AKhar.TakaiKuk, null);
    //     ret.Add(Model.AKhar.TakaiKâk, null);
    //     ret.Add(Model.AKhar.TakaiKiak, null);
    //     ret.Add(Model.AKhar.TakaiKuak, null);
    //     ret.Add(Model.AKhar.TakaiKlak, null);
    //     ret.Add(Model.AKhar.TakaiKlakTakaiKuak, null);
    //     ret.Add(Model.AKhar.TakaiKlakTakaiKuk, null);
    //     ret.Add(Model.AKhar.TraohAw, null);
    //
    //     return ret;
    // }
    //
    // /// <summary>
    // /// Init Vowel Kawom Tuek Tuah
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitVowelKTT()
    // {
    //     Hashtable vowel = new Hashtable();
    //     vowel.Add("a", "aa");
    //     vowel.Add("ô", "ôô");
    //     vowel.Add("u", "uu");
    //     vowel.Add("ư", "ưư");
    //     vowel.Add("ơ", "ơơ");
    //     vowel.Add("e", "ee");
    //
    //     return vowel;
    // }
    //
    // /// <summary>
    // /// Init Sap Atah
    // /// </summary>
    // /// <returns>hashtable</returns>
    // public static Hashtable InitSapAtah()
    // {
    //     Hashtable sapAtah = new Hashtable();
    //
    //     sapAtah.Add(Model.AKhar.Ak, Model.AKhar.Balau);
    //     sapAtah.Add(Model.AKhar.Ok, Model.AKhar.TraohAw);
    //     sapAtah.Add(Model.AKhar.Uk, Model.AKhar.Balau);
    //     sapAtah.Add(Model.AKhar.TakaiKâk, Model.AKhar.Balau);
    //     sapAtah.Add(Model.AKhar.TakaiThek, Model.AKhar.BalauTapong);
    //     sapAtah.Add(Model.AKhar.DarDua, Model.AKhar.Balau);
    //
    //     return sapAtah;
    // }
};
