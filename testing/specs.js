/* global describe,it,browser,element,by,expect,beforeEach*/
'use strict';

var convertType = {
    FontYapata: 0,
    FontGilaiPraong: 1,
    FontCamEFEO: 2,
    FontKTT: 3,
    FontUniCamKur: 4,
    FontUniCamVN: 5,

    TransCamEFEO: 6,
    TransInrasara: 7,
    TransKawomTT: 8
};

var assert = function(source, expected) {
    // Input source text
    var sourceCtrl = element(by.model('ctrl.sourceText'));
    sourceCtrl.clear().then(function() {
        sourceCtrl.sendKeys(source);
    });

    // Get destination text
    var elm = element.all(by.repeater('text in ctrl.destinations')).get(0);

    // Check expectation
    expect(elm.getText()).toEqual(expected);
};

// describe('Convert page', function() {
//     beforeEach(function() {
//         // Open convert page
//         browser.get('http://localhost:8080/#/converter');
//     });
//
//     var assertEFEOToYapata = function(source, expected) {
//         // Input source text
//         var sourceCtrl = element(by.model('ctrl.sourceText'));
//         sourceCtrl.clear().then(function() {
//             sourceCtrl.sendKeys(source);
//         });
//
//         // Get destination text
//         var elm = element.all(by.repeater('text in ctrl.destinations')).get(0);
//
//         // Check expectation
//         expect(elm.getText()).toEqual(expected);
//     };
//
//     var selectEFEOtoYapata = function() {
//         // Select EFEO transliteration
//         element(by.id('source-more')).click();
//         element(by.id('source-6')).click();
//
//         // Select Yapata font
//         element(by.id('destination-0')).click();
//     };
//
//     it('convert from EFEO to font Yapata 1', function() {
//         selectEFEOtoYapata();
//         assertEFEOToYapata('Mai raweng palei adei aey hai juai mboh mâda blaoh war aey xa-ai. Dua urang sa pajaih ppajiéng mai, juai nâh rabha ka talah tung hatai.',
//             '=m rw$ pl] ad] a@Y =h =j& -OH md% -b*<H wR a@Y x=I. d&% ur/ s% p=jH F-j`$ =m, =j& nH rB% k% tlH t~/ h=t.');
//     });
//
//     it('convert from EFEO to font Yapata 2', function() {
//         selectEFEOtoYapata();
//         assertEFEOToYapata('Ké kan cek kraong glai min kar di tian xa-ai, tambuak takai mai ka adei buei hai. Mboh mbaok mbluak di jién padai, xa-ai saong adei ndom klaw cheh chai.',
//             '-k^ kN c@K -\\k" =g* m{N kR d} t`N x=I, tO&K t=k =m k% ad] b&] =h. -OH -O<K O)K d} -j`@N p=d, x=I -s" ad] -Q\' k*w S@H =S.');
//     });
// });

describe('Convert from Cham to transliteration', function() {
    beforeEach(function() {
        // Open convert page
        browser.get('http://localhost:8080/#/converter');
    });

    var select = function(soureType, destinationType) {

        // Select EFEO transliteration
        element(by.id('source-' + soureType)).click();

        // Select Yapata font
        element(by.id('destination-more')).click();
        element(by.id('destination-' + destinationType)).click();
    };

    it('should convert from font Yapata to EFEO transliteration', function() {
        select(convertType.FontYapata, convertType.TransCamEFEO);
        var source = 'c\' s" b{n} h~% m{N,';
        var expected = 'cam saong bini hu min,';
        assert(source, expected);
    });
});
