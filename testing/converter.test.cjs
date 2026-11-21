const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const converterDir = path.join(__dirname, '../app/clients/converter');
const context = vm.createContext({
    logging: {
        writeLogFromConverter(error) {
            throw error;
        }
    }
});
context.window = context;
for (const file of [
    'model.js', 'xml.js', 'data-structure.js', 'utility.services.js',
    'paxalih.services.js', 'fonttofont.services.js', 'camtotrans.services.js',
    'transtocam.services.js', 'transtotrans.services.js'
]) {
    vm.runInContext(fs.readFileSync(path.join(converterDir, file), 'utf8'), context, { filename: file });
}

const formats = context.Model.Enum;
const services = context.cam.service;

function convert(input, from, to) {
    const sourceIsFont = from <= formats.FontUniCamVN;
    const targetIsFont = to <= formats.FontUniCamVN;
    const Service = sourceIsFont
        ? (targetIsFont ? services.FontToFontPaxalih : services.CamToTransPaxalih)
        : (targetIsFont ? services.TransToCamPaxalih : services.TransToTransPaxalih);
    return Array.from(new Service().DoConvert(input, from, to));
}

test('Cam VN uses the same Latin decoder as Cam Kur', () => {
    const kur = convert('ꨟꨰ', formats.FontUniCamKur, formats.TransCamEFEO);
    const vn = convert('ꨟꨰ', formats.FontUniCamVN, formats.TransCamEFEO);
    assert.notEqual(vn.join(''), '');
    assert.deepEqual(vn, kur);
});

for (const [from, to] of [
    [formats.FontUniCamKur, formats.FontUniCamVN],
    [formats.FontUniCamVN, formats.FontUniCamKur]
]) {
    test(`Unicode alias ${from} → ${to} preserves code points within paragraphs`, () => {
        const lines = ['  ꨟꨰ ꨆꨮꩃ  ', '', 'ꨆꨩꨮ\t🙂'];
        assert.deepEqual(convert(lines.join('\r\n'), from, to), lines);
    });
}

test('Cam EFEO keeps separate Unicode marks', () => {
    assert.deepEqual(convert('d+!', formats.FontCamEFEO, formats.FontUniCamKur), ['ꨕꨮꩃ']);
});

test('Unicode targets expand legacy ligatures in component order', () => {
    const input = 'k^ k# k[ k" k> k) k( k$';
    const expected = 'ꨆꨩꨮ ꨆꨮꩌ ꨆꨪꩌ ꨆꨱꩃ ꨆꨱꩌ ꨆꨵꨶ ꨆꨵꨭ ꨆꨮꩃ';
    for (const target of [formats.FontUniCamKur, formats.FontUniCamVN]) {
        assert.deepEqual(convert(input, formats.FontYapata, target), [expected]);
    }
});

// Reuse the original browser fixtures. The Protractor assertions use rendered
// text, which trims outer whitespace, and Latin fixtures use mixed casing.
let from;
let to;
const specs = [];
const browserFixtures = {
    browser: { wait() {} },
    by: { id: id => id },
    element(id) {
        return {
            click() {
                const selection = /^(source|destination)-(\d+)$/.exec(id);
                if (selection) {
                    if (selection[1] === 'source') {
                        from = Number(selection[2]);
                    } else {
                        to = Number(selection[2]);
                    }
                }
            }
        };
    },
    describe(_name, register) { register(); },
    beforeEach() {},
    it(name, run) { specs.push({ name, run }); }
};
vm.createContext(browserFixtures);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'specs.js'), 'utf8'), browserFixtures, {
    filename: 'specs.js'
});
browserFixtures.assert = function(input, expected) {
    const actual = convert(input, from, to)[0].trim();
    if (to > formats.FontUniCamVN) {
        assert.equal(actual.toLowerCase(), expected.toLowerCase());
    } else {
        assert.equal(actual, expected);
    }
};
for (const { name, run } of specs) {
    test(name, run);
}
