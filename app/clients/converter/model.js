window.Model = {
    AKhar: {
        Kak: 0,
        Khak: 1,
        Gak: 2,
        Ghak: 3,
        Ngâk: 4,
        Ngak: 5,

        Cak: 6,
        Chak: 7,
        Jak: 8,
        Jhak: 9,
        Nyâk: 10,
        Nyak: 11,
        Njak: 12,

        Tak: 13,
        Thak: 14,
        Dak: 15,
        Dhak: 16,
        Nâk: 17,
        Nak: 18,
        Ndak: 19,

        Pak: 20,
        Phak: 21,
        Bak: 22,
        Bhak: 23,
        Mâk: 24,
        Mak: 25,
        Mbak: 26,

        Yak: 27,
        Rak: 28,
        Lak: 29,
        Wak: 30,
        Xak: 31,
        Hak: 32,

        PakPraong: 33,
        SakPraong: 34,

        Ak: 35,
        Ik: 36,
        Uk: 37,
        É: 38,
        Ai: 39,
        Ok: 40,

        KakMatai: 41,
        GakMatai: 42,
        NgâkMatai: 43,
        CakMatai: 44,
        TakMatai: 45,
        NâkMatai: 46,
        PakMatai: 47,
        TutTakaiMâk: 48,
        YakMatai: 49,
        RakMatai: 50,
        LakMatai: 51,
        WakMatai: 52,
        XakMatai: 53,
        PaohDaNih: 54,

        Balau: 55,
        BalauTapong: 56,
        DarSa: 57,
        DarDua: 58,
        TakaiKik: 59,
        TakaiKikTutTakaiMâkDalem: 60,
        TakaiKikTutTakaiMâkLingiw: 61,
        TakaiKikTutTakaiYak: 62,
        TakaiThek: 63,
        TakaiThekTutTakaiMâk: 64,
        TakaiThekPaohNgâk: 65,
        TakaiKuk: 66,
        TakaiKâk: 67,
        TakaiKrak: 68,
        TakaiKiak: 69,
        TakaiKuak: 70,
        TakaiKlak: 71,
        TakaiKlakTakaiKuak: 72,
        TakaiKlakTakaiKuk: 73,
        TraohAw: 74,
        TraohAwPaohNgâk: 75,
        TraohAwTutTakaiMâk: 76,
        PaohNgâk: 77,

        Sa: 78,
        Dua: 79,
        Kluw: 80,
        Ppak: 81,
        Limâ: 82,
        Nem: 83,
        Tajuh: 84,
        Dalipan: 85,
        Salipan: 86,
        Saoh: 87,

        KanaingSa: 88,
        KanaingDua: 89,
        KanaingKaokMâTi: 90,
        Colon: 91,
        ExclamationMark: 92,
        QuestionMark: 93,
        Minus: 94,
        Patuk: 95,
        Square: 96
    },
    Constant: {
        KEY_TO_FONT_FILE: 'KeyToFont',
        KEY_TO_TRANS_FILE: 'KeyToTrans',
        TRANS_TO_KEY_FILE: 'TransToKey',
        VALID_TRANS_CHAR_FILE: 'ValidTransChar',

        LOG_FILE: 'log.txt',
        LANG_SELECTED_FILE: 'Lang.txt',

        MIN_FONT_SIZE: 5,
        MAX_FONT_SIZE: 100,

        DEFAULT_FONT_CAM_SIZE: 20,
        DEFAULT_FONT_YUEN_SIZE: 12,

        FONT_YAPATA_NAME: 'Akhar Thrah 1',
        FONT_GILAIPRAONG_NAME: 'Champa 2 (GP)',
        FONT_CAM_EFEO_NAME: 'CAMTANRAN',
        FONT_KTT_NAME: 'Blue 1.1',
        FONT_UNI_CAMKUR: 'CJM Kh 001',
        FONT_UNI_CAMVN: 'Cham_Roman',
        FONT_YUEN_NAME: 'Tahoma',

        AO_EFEO: 'AO',
        AOM_EFEO: 'AOM',
        AONG_EFEO: 'AONG',
        EM_EFEO: 'ÉM',
        Â_EFEO: 'Â',
        Ô_EFEO: 'O',
        E_EFEO: 'E',
        IÉNG_EFEO: 'IÉNG',
        IENG_EFEO: 'IENG',
        AU_EFEO: 'AU',

        AO_SARA: 'AU',
        AOM_SARA: 'AUM',
        AONG_SARA: 'AUNG',
        EM_SARA: 'EM',
        Â_SARA: 'Ư',
        Ô_SARA: 'O',
        E_SARA: 'Ơ',
        IÉNG_SARA: 'IENG',
        IENG_SARA: 'IƠNG',
        AU_SARA: 'ƠU',

        AO_KawomTT: 'AU',
        AOM_KawomTT: 'OOM',
        AONG_KawomTT: 'OONG',
        EM_KawomTT: 'ÊM',
        Â_KawomTT: 'Ư',
        Ô_KawomTT: 'Ô',
        E_KawomTT: 'Ơ',
        IÉNG_KawomTT: 'IÊNG',
        IENG_KawomTT: 'IƠNG',
        AU_KawomTT: 'ƠU',

        URL_LASTEST_VERSION: 'http://tanginpantangin.com/CurrentVersion.txt',
        URL_SOURCE_FILE: 'http://tanginpantangin.com/XalihAkharCam.zip',

        MAX_ROUND: 100,
        NEW_LINE: '\n',
        NEW_LINE_CHAR: '\n'
    },
    Enum: {
        FontYapata: 0,
        FontGilaiPraong: 1,
        FontCamEFEO: 2,
        FontKTT: 3,
        FontUniCamKur: 4,
        FontUniCamVN: 5,

        TransCamEFEO: 6,
        TransInrasara: 7,
        TransKawomTT: 8
    },
    LangID: {
        Cam: 0,
        Vietnamese: 1,
        English: 2
    },
    Info: {
        DevelopMode: false
    },
    MesseageCode: {
        MES_PLEASE_INPUT: 0,
        MES_DATA_INVALID: 1,
        MES_UPDATE_QUESTION: 2,
        MES_UPDATE_FAILED: 3
    },
    XMLKeyCodeCol: {
        KeyCode: 'KeyCode',
        WaQuyet: 'WaQuyet',
        GilaiPraong: 'GilaiPraong',
        CamEFEO: 'CamEFEO',
        KawomTuekTuah: 'KawomTuekTuah',
        UnicodeCamKur: 'UniCamKur',
        UnicodeCamVN: 6
    },
    XMLRumiCol: {
        KeyCode: 'KeyCode',
        Rumi: 'Rumi',
        InraSara: 'InraSara',
        KawomTT: 'KawomTuekTuah'
    },
    XMLTransToKeyCol: {
        KeyCode: 'KeyCode',
        Rumi: 'Rumi',
        InraSara: 'Inrasara',
        KawomTuekTuah: 'KTT',
    }
};
