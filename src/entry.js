// ---------------------------------------------------------------------------
// Copenhagen — ESM-точка входа (замена functions/compile.js + склейки файлов)
// Порядок импортов воспроизводит алфавитный порядок конкатенации старого билда,
// при этом window.Controls заполняется до первого создания контрола.
// ---------------------------------------------------------------------------
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import feather from 'feather-icons';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('xml', html);
hljs.registerLanguage('json', json);
hljs.registerLanguage('markdown', markdown);

// Мост легаси-API: CPHEditor.formatters вызывает hljs.highlight(lang, code)
// (сигнатура v9, деприкейтирована в v10.7+). Пробрасываем в новый API
// highlight(code, {language}) — без console-предупреждений на каждую строку.
const _hlHighlight = hljs.highlight.bind(hljs);
hljs.highlight = function (arg1, arg2) {
  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    return _hlHighlight(arg2, { language: arg1 });
  }
  return _hlHighlight(arg1, arg2);
};

// Глобальные утилиты и каркас (легаси-код рассчитывает на глобальную область)
import './utilities/globals.js';
import { Template } from './template/Template.js';
import { Control, EventHandler } from './control/Control.js';

window.hljs = hljs;   // легаси-форматтеры CPHEditor обращаются к hljs как к глобалу
window.feather = feather;

window.Template = Template;
window.Control = Control;
window.EventHandler = EventHandler;

// Утилиты
import './utilities/CodeCompleter.js';
import './utilities/icons/caseicon.js';
import './utilities/icons/regexicon.js';

// Контролы (регистрируют себя в window.Controls)
import './controls/CPHEditor/CPHCursor/CPHCursor.js';
import './controls/CPHEditor/CPHHistory/CPHHistory.js';
import './controls/CPHEditor/CPHUser/CPHUser.js';
import './controls/CPHEditor/CPHContextMenu/CPHContextMenu.js';
import './controls/CPHEditor/CPHFindReplace/CPHFindReplace.js';
import './controls/CPHEditor/CPHEditor.js';

// HTML-шаблоны doT.js -> ES-модули (вместо Template.add(...) из сборщика)
import CPHEditorTemplate from './controls/CPHEditor/CPHEditor.html?dot';
import CPHContextMenuTemplate from './controls/CPHEditor/CPHContextMenu/CPHContextMenu.html?dot';
import CPHFindReplaceTemplate from './controls/CPHEditor/CPHFindReplace/CPHFindReplace.html?dot';

Template.add('CPHEditor', CPHEditorTemplate);
Template.add('CPHContextMenu', CPHContextMenuTemplate);
Template.add('CPHFindReplace', CPHFindReplaceTemplate);

// Публичный API
import './index.js';

// Стили (Vite сам скомпилирует SCSS и вынет CSS при build)
import './styles/index.scss';

export default window.Copenhagen;
