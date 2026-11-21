const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

// Load ngClipboard.js with a minimal fake Angular/DOM: the factory must copy plain text only.
function load() {
    let factory;
    const mod = {
        factory(name, fn) { if (name === 'ngClipboard') factory = fn; return mod; },
        directive() { return mod; }
    };
    const appended = [];
    let copied = null;
    const doc = {
        body: {
            appendChild(el) { appended.push(el); },
            removeChild() {}
        },
        createElement() { return { style: {}, set textContent(v) { this._t = v; }, get textContent() { return this._t; } }; },
        createRange() { return { selectNodeContents() {} }; },
        execCommand() { copied = appended[appended.length - 1].textContent; return true; }
    };
    const sel = { removeAllRanges() {}, addRange() {} };
    const ctx = vm.createContext({
        angular: { module: () => mod },
        window: { getSelection: () => sel },
        console
    });
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../app/lib/ngClipboard.js'), 'utf8'), ctx);
    // $compile is deliberately NOT injectable any more: calling factory without it must work.
    const api = factory(Object.assign([doc], { find() { throw new Error('jqLite find must not be used'); } }));
    return { api, getCopied: () => copied };
}

for (const input of [
    '<img src=x onerror=alert(1)>',
    "{{constructor.constructor('alert(1)')()}}",
    '<span ng-init="qaProof=7*7">QA</span> & <b>x</b>'
]) {
    test('copy keeps user input as literal text: ' + input, () => {
        const { api, getCopied } = load();
        assert.equal(api.toClipboard(input), true);
        assert.equal(getCopied(), input);
    });
}

test('copy joins output paragraphs with newlines and tolerates empty values', () => {
    const { api, getCopied } = load();
    api.toClipboard(['a', 'b', 'c']);
    assert.equal(getCopied(), 'a\nb\nc');
    assert.equal(api.toPlainText(undefined), '');
    assert.equal(api.toPlainText(null), '');
});

test('error logging and controller never reference user text', () => {
    const app = fs.readFileSync(path.join(__dirname, '../app/app.js'), 'utf8');
    const ctrl = fs.readFileSync(path.join(__dirname, '../app/clients/converter.controller.js'), 'utf8');
    assert.ok(!/sourceText/.test(app));
    assert.ok(!/sourceText:\s*self\.sourceText/.test(ctrl));
    assert.ok(!/\$compile/.test(fs.readFileSync(path.join(__dirname, '../app/lib/ngClipboard.js'), 'utf8')));
});
