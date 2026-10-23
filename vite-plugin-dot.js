/**
 * Vite-плагин для легаси-шаблонов doT.js.
 * Импорт вида `import tpl from './X.html?dot'` компилирует doT-шаблон
 * в ES-модуль с default-экспортом функции — прямая замена строковой
 * генерации `Template.add(...)` из старого functions/compile.js.
 */
import dot from 'dot';

export default function dotPlugin() {
  return {
    name: 'vite-plugin-dot',
    transform(code, id) {
      if (!id.endsWith('.html?dot')) return null;
      const fn = dot.template(code).toString();
      // doT возвращает "function anonymous(it) {...}" — нормализуем имя
      const normalized = fn.replace(/^function[^(]*\(/, 'function (');
      return {
        code: `const template = ${normalized};\nexport default template;`,
        map: null,
      };
    },
  };
}
