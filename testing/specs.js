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

describe('Convert page', function() {
    beforeEach(function() {
        // Open convert page
        browser.get('http://localhost:8080/#/converter');
    });

    var assertEFEOToYapata = function(source, expected) {
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

    var selectEFEOtoYapata = function() {
        // Select EFEO transliteration
        element(by.id('source-more')).click();
        element(by.id('source-6')).click();

        // Select Yapata font
        element(by.id('destination-0')).click();
    };

    it('convert from EFEO to font Yapata 1', function() {
        selectEFEOtoYapata();
        assertEFEOToYapata('Mai raweng palei adei aey hai juai mboh mâda blaoh war aey xa-ai. Dua urang sa pajaih ppajiéng mai, juai nâh rabha ka talah tung hatai.',
            '=m rw$ pl] ad] a@Y =h =j& -OH md% -b*<H wR a@Y x=I. d&% ur/ s% p=jH F-j`$ =m, =j& nH rB% k% tlH t~/ h=t.');
    });

    it('convert from EFEO to font Yapata 2', function() {
        selectEFEOtoYapata();
        assertEFEOToYapata('Ké kan cek kraong glai min kar di tian xa-ai, tambuak takai mai ka adei buei hai. Mboh mbaok mbluak di jién padai, xa-ai saong adei ndom klaw cheh chai.',
            '-k^ kN c@K -\\k" =g* m{N kR d} t`N x=I, tO&K t=k =m k% ad] b&] =h. -OH -O<K O)K d} -j`@N p=d, x=I -s" ad] -Q\' k*w S@H =S.');
    });
});

describe('Convert from Cham to transliteration', function() {
    beforeEach(function() {
        // Open convert page
        browser.get('http://localhost:8080/#/converter', 20000);
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
        var source = 'hj%N bL l{a&%, r~%P \\t# a`% am% l{aN y~H y~H. pQ`K b{l%N y&K a=m%K -n< -m<T -a< AN oH z~Y E{R. O$ -k`# O$ a;%N a=m%K am% hl%R t`N. mr%T s% jl%N -r"< an%K -n< bC. l{-gY ZK apH l{gH ZK cd&%% oH md% O&H kR. \\bH p=d m=\\EY -j`@N -QC v[ a=m%K am% an{T p-y@R. xn/ atH c`{P rOH J%K dh(w s`\' hd]. eL r~%P \\d] hl] b~w tL. a^N =z \\p" -g*" an%K l{k~w Q&% -n", E~N aqK b{lN hd], a`% hr] hdH h=d, an%K w@K g{lC =m -F%K l{E] -F%K a`%, s% r{t~H E~N th% a=m%K am% b~Y t`N. s/ F-Q^ pg% jl@H o% m" \\d@H y~w ur/. m{N a=m%K am% t`N h% -hY \\p" k% an%K r-l%. xn/ atH c`{P rOH -p`@H k% jl%N hd]. wR r~%P \\d] k% an%K dH -O<K.';
        var expected = 'hajan bal liaua, rup trem aia amâ lian yuh yuh. pandiak bilan yuak amaik nao maot ao khan oh nguy thir. mbeng kiém mbeng ân amaik amâ halar tian. mârat sa jalan raong anâk nao bac. ligoy ngak apah ligah ngak cadua oh mâda mbuah kar. brah padai mâthraiy jién ndoc nyim amaik amâ anit payér. xanâng atah ciip rambah jhak dahluw siam hadei. él rup drei halei buw tal. aen ngai praong glaong anâk likuw ndua naong, thun anak bilan hadei, aia harei hadah hadai, anâk wek gilac mai ppok lithei ppok aia, sa rituh thun taha amaik amâ buy tian. sang ppandé paga jaleh o maong dreh yuw urang. min amaik amâ tian ha hoy praong ka anâk ralo. xanâng atah ciip rambah piéh ka jalan hadei. war rup drei ka anâk dah mbaok.';
        assert(source, expected);
    });

    it('should convert from font Yapata to Inrasara transliteration', function() {
        select(convertType.FontYapata, convertType.TransInrasara);
        var source = 'hj%N bL l{a&%, r~%P \\t# a`% am% l{aN y~H y~H. pQ`K b{l%N y&K a=m%K -n< -m<T -a< AN oH z~Y E{R. O$ -k`# O$ a;%N a=m%K am% hl%R t`N. mr%T s% jl%N -r"< an%K -n< bC. l{-gY ZK apH l{gH ZK cd&%% oH md% O&H kR. \\bH p=d m=\\EY -j`@N -QC v[ a=m%K am% an{T p-y@R. xn/ atH c`{P rOH J%K dh(w s`\' hd]. eL r~%P \\d] hl] b~w tL. a^N =z \\p" -g*" an%K l{k~w Q&% -n", E~N aqK b{lN hd], a`% hr] hdH h=d, an%K w@K g{lC =m -F%K l{E] -F%K a`%, s% r{t~H E~N th% a=m%K am% b~Y t`N. s/ F-Q^ pg% jl@H o% m" \\d@H y~w ur/. m{N a=m%K am% t`N h% -hY \\p" k% an%K r-l%. xn/ atH c`{P rOH -p`@H k% jl%N hd]. wR r~%P \\d] k% an%K dH -O<K.';
        var expected = 'hajan bal liawa, rup trơm aia amư lian yuh yuh. pađiak bilan ywak amaik nau maut au khan oh nguy thir. bbơng kiem bbơng ưn amaik amư halar tian. mưrat sa jalan raung anưk nau bac. ligoy ngak apah ligah ngak cadwa oh mưda bbwah kar. brah padai mưthraiy jien đoc nhim amaik amư anit payer. xanưng atah ciip rabbah jhak dahluw siam hadei. el rup drei halei buw tal. aơn ngai praung glaung anưk likuw đwa naung, thun anak bilan hadei, aia harei hadah hadai, anưk wơk gilac mai ppok lithei ppok aia, sa rituh thun taha amaik amư buy tian. sang ppađe paga jalơh o maung drơh yuw urang. min amaik amư tian ha hoy praung ka anưk ralo. xanưng atah ciip rabbah pieh ka jalan hadei. war rup drei ka anưk dah bbauk.';
        assert(source, expected);
    });

    it('should convert from font Yapata to KTT transliteration', function() {
        select(convertType.FontYapata, convertType.TransKawomTT);
        var source = 'hj%N bL l{a&%, r~%P \\t# a`% am% l{aN y~H y~H. pQ`K b{l%N y&K a=m%K -n< -m<T -a< AN oH z~Y E{R. O$ -k`# O$ a;%N a=m%K am% hl%R t`N. mr%T s% jl%N -r"< an%K -n< bC. l{-gY ZK apH l{gH ZK cd&%% oH md% O&H kR. \\bH p=d m=\\EY -j`@N -QC v[ a=m%K am% an{T p-y@R. xn/ atH c`{P rOH J%K dh(w s`\' hd]. eL r~%P \\d] hl] b~w tL. a^N =z \\p" -g*" an%K l{k~w Q&% -n", E~N aqK b{lN hd], a`% hr] hdH h=d, an%K w@K g{lC =m -F%K l{E] -F%K a`%, s% r{t~H E~N th% a=m%K am% b~Y t`N. s/ F-Q^ pg% jl@H o% m" \\d@H y~w ur/. m{N a=m%K am% t`N h% -hY \\p" k% an%K r-l%. xn/ atH c`{P rOH -p`@H k% jl%N hd]. wR r~%P \\d] k% an%K dH -O<K.';
        var expected = 'hajan bal liawa, rup trơm aia amư lian yuh yuh. pađiak bilan ywak amek nao moot aao khan ôh nguy thir. bbơng kiêm bbơng ưn amek amư halar tian. mưrat sa jalan roong anưk nao bac. ligôy ngak apah ligah ngak cadwa ôh mưda bbwah kar. brah padai mưthrey jiên đôc nhim amek amư anit payêr. xanưng atah ciip rabbah jhak dahluw siam hadei. êl rup drei halei buw tal. aơơn ngai prong gloong anưk likuw đwa noong, thun anak bilan hadei, aia harei hadah hadai, anưk wơk gilac mai ppôk lithei ppôk aia, sa rituh thun taha amek amư buy tian. sang ppađê paga jalơh ô mong drơh yuw urang. min amek amư tian ha hôy prong ka anưk ralô. xanưng atah ciip rabbah piêh ka jalan hadei. war rup drei ka anưk dah bbook.';
        assert(source, expected);
    });
});
