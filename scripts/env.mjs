// Общая jsdom-среда для smoke/parity тестов Copenhagen
import { JSDOM } from 'jsdom';

export function makeDom(html = '<!doctype html><html><body></body></html>') {
  const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true, url: 'http://localhost/' });
  const { window } = dom;
  window.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
  window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
  window.MutationObserver = window.MutationObserver || class { observe(){} disconnect(){} };
  window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){return false} });
  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
  global.getComputedStyle = (...a) => window.getComputedStyle(...a);
  global.requestAnimationFrame = cb => setTimeout(cb, 0);
  global.cancelAnimationFrame = id => clearTimeout(id);
  window.requestAnimationFrame = global.requestAnimationFrame;
  window.cancelAnimationFrame = global.cancelAnimationFrame;
  return window;
}
