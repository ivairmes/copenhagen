// Smoke-тест НОВОГО UMD-билда (dist/copenhagen.umd.js) в jsdom
import { makeDom } from './env.mjs';
import fs from 'node:fs';

const window = makeDom('<!doctype html><html><body><div class="editor" data-language="javascript">// hi\nconst x = 1;</div></body></html>');
const code = fs.readFileSync('dist/copenhagen.umd.js', 'utf8');
window.eval(code);
console.log('new Copenhagen API keys:', Object.keys(window.Copenhagen || {}));
const editors = window.Copenhagen.initSelectorAll('.editor');
console.log('new editor count:', editors.length);
console.log('new lines rendered:', window.document.querySelectorAll('[control=CPHEditor] .line').length);
process.exit(0);
