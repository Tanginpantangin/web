'use strict';
if (!window.cam) {
    window.cam = {};
    if (!window.cam.service) {
        window.cam.service = {};
    }
}

window.cam.service.Paxalih = function() {
    var self = this;

    self._waYapataToKeyCode = {};
    self._gilaiPraongToKeyCode = {};
    self._camEFEOToKeyCode = {};
    self._KTTToKeyCode = {};
    self._uniCamKurToKeyCode = {};
    self._uniCamVNToKeyCode = {};

    //Valid chars
    self._validRumiChar = {};
    self._validInraChar = {};
    self._validKTTChar = {};

    //Keycode to Fonts
    self._keyCodeToWaYapata = {};
    self._keyCodeToGilaiPraong = {};
    self._keyCodeToCamEFEO = {};
    self._keyCodeToKTT = {};
    self._keyCodeToUniCamKur = {};
    self._keyCodeToUniCamVN = {};

    //Trans To Akhar Cam
    self._diipToMaTai = {};
    self._diipToTaKai = {};
    self._kanaingChars = {};
    self._kareiCrih = {};
    self._consonantKareiCrih = {};
    self._sappaohAngaok = {};
    self._sappaoh = {};
    self._takaiLikuk = {};
    self._vowelLangLikuk = {};
    self._takaiDaokLikuk = {};

    window.cam.service.Utility.SetKeyCodeData(self._waYapataToKeyCode, self._gilaiPraongToKeyCode, self._camEFEOToKeyCode, self._KTTToKeyCode, self._uniCamKurToKeyCode, self._uniCamVNToKeyCode,
        self._keyCodeToWaYapata, self._keyCodeToGilaiPraong, self._keyCodeToCamEFEO, self._keyCodeToKTT, self._keyCodeToUniCamKur, self._keyCodeToUniCamVN);

    window.cam.service.Utility.SetValidTransChar(self._validRumiChar, self._validInraChar, self._validKTTChar);

    self.InitTransToCamData = function(sourceType) {
        self._diipToMaTai = window.cam.service.Utility.InitDiipToMaTai();
        self._diipToTaKai = window.cam.service.Utility.InitDiipToTaKai(sourceType);
        self._kanaingChars = window.cam.service.Utility.InitKanaing();
        self._kareiCrih = window.cam.service.Utility.InitKareiCrih(sourceType);
        self._consonantKareiCrih = window.cam.service.Utility.InitConsonantKareiCrih();
        self._sappaohAngaok = window.cam.service.Utility.InitSapPaohAngaok();
        self._sappaoh = window.cam.service.Utility.InitSapPaoh();
        self._takaiLikuk = window.cam.service.Utility.InitTakaiLikuk();
        self._vowelLangLikuk = window.cam.service.Utility.InitVowelLangLikuk();
        self._takaiDaokLikuk = window.cam.service.Utility.InitTakaiDaokLikuk();
    };
};
