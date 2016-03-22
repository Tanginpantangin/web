/* global Model */
'use strict';
if (!window.cam) {
    window.cam = {},
        if (!window.cam.service) {
            window.cam.service = {},
        }
}

window.cam.service.Paxalih = {

    //Fonts to Keycode
    _waYapataToKeyCode: {},
    _gilaiPraongToKeyCode: {},
    _camEFEOToKeyCode: {},
    _KTTToKeyCode: {},
    _uniCamKurToKeyCode: {},
    _uniCamVNToKeyCode: {},

    //Valid chars
    _validRumiChar: {},
    _validInraChar: {},
    _validKTTChar: {},

    //Keycode to Fonts
    _keyCodeToWaYapata: {},
    _keyCodeToGilaiPraong: {},
    _keyCodeToCamEFEO: {},
    _keyCodeToKTT: {},
    _keyCodeToUniCamKur: {},
    _keyCodeToUniCamVN: {},

    //Trans To Akhar Cam
    _diipToMaTai: {},
    _diipToTaKai: {},
    _kanaingChars: {},
    _kareiCrih: {},
    _consonantKareiCrih: {},
    _sappaohAngaok: {},
    _sappaoh: {},
    _takaiLikuk: {},
    _vowelLangLikuk: {},
    _takaiDaokLikuk: {}
};
