// Smoke-тест легаси-билда в jsdom: прогоняем старый www/compiled/copenhagen.v0-3-0.js
import { JSDOM } from 'jsdom';
import fs from 'node:fs';

const dom = new JSDOM(`<!doctype html><html><body><div class="editor" data-language="javascript">// hi
const x = 1;</div></body></html>`, { runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.ResizeObserver = class { observe(){} disconnect(){} };
window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
window.matchMedia = window.matchMedia || (q => ({ matches:false, media:q, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){} }));
global.window = window; global.document = window.document; global.navigator = window.navigator;
global.getComputedStyle = window.getComputedStyle.bind(window);
global.requestAnimationFrame = cb => setTimeout(cb, 0);
window.requestAnimationFrame = global.requestAnimationFrame;

const code = fs.readFileSync('www/compiled/copenhagen.v0-3-0.js', 'utf8');
window.eval(code);
console.log('legacy Copenhagen API keys:', Object.keys(window.Copenhagen || {}));
const editors = window.Copenhagen.initSelectorAll('.editor');
console.log('legacy editor count:', editors.length);
console.log('legacy lines rendered:', window.document.querySelectorAll('[control=CPHEditor] .line').length);
process.exit(0);
