// Шаблонизатор Copenhagen (наследник легаси-файла из старого билда).
// doT-функции регистрируются по controlName контрола; Control.find шаблон
// ищет по имени конструктора, поэтому перед рендером резолвим ctor -> controlName.

class Template {
  constructor(fn) {
    this._render = typeof fn === 'function' ? fn : function () { return ''; };
  }

  render(control, it) {
    return this._render.call(control, it);
  }

  static _templates = {};

  // Регистрация: Template.add('CPHEditor', dotFn) — по controlName (строка),
  // либо Template.add(CPHFindReplace, dotFn) — по функции-конструктору (легаси).
  static add(nameOrControl, fn) {
    const name = typeof nameOrControl === 'string' ? nameOrControl : nameOrControl.name;
    Template._templates[name] = new Template(fn);
  }

  static find(Control) {
    const name = Control.prototype.controlName || Control.name;
    const template = Template._templates[name];
    if (!template) {
      throw new Error(`Could not find template: "${name}"`);
    }
    return template;
  }
}

export { Template };
