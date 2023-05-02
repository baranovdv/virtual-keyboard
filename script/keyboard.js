import Key from './keyClass.js';
import { CssClasses, KeyboardConst } from './consts.js';

const Keyboard = {
  elements: {
    wrapper: null,
    keyboardContainer: null,
    keys: [],
  },

  output: {
    textarea: null,
    value: '',
    caps: false,
    shift: false,
    lang: 'en',
    pressedButton: null,
    pressedKeys: new Set(),
  },

  keysLayouts: {
    en: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'return',
      'shift-l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'au', 'shift-r',
      'control', 'option', 'command', 'space', 'command', 'option', 'al', 'ad', 'ar', ' '],
    ru: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё',
      'capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'return',
      'shift-l', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'au', 'shift-r',
      'control', 'option', 'command', 'space', 'command', 'option', 'al', 'ad', 'ar', ' '],
  },

  keyCodes: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal',
    'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],

  shiftLayout: {
    en: {
      '`': '~',
      1: '!',
      2: '@',
      3: '#',
      4: '$',
      5: '%',
      6: '^',
      7: '&',
      8: '*',
      9: '(',
      0: ')',
      '-': '_',
      '=': '+',
      '[': '{',
      ']': '}',
      '\\': '|',
      ';': ':',
      "'": '"',
      ',': '<',
      '.': '>',
      '/': '?',
    },
    ru: {
      '`': '[',
      1: '!',
      2: '"',
      3: '№',
      4: '%',
      5: ':',
      6: ',',
      7: '.',
      8: ';',
      9: '(',
      0: ')',
      '-': '_',
      '=': '+',
      '/': '?',
    },
  },

  init() {
    this.createKeyboard(this.output.lang);
    this.createWrapper();
    document.body.appendChild(this.elements.wrapper);

    this.elements.keys = this.elements.keyboardContainer.querySelectorAll('.keyboard__key');
    this.output.textarea = this.elements.wrapper.querySelector(`.${CssClasses.TEXTAREA}`);
    this.enumKeys();

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.physicalKeyDown(event.code);
    });

    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      this.physicalKeyUp(event.code);
    });
  },

  createWrapper() {
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.classList.add(CssClasses.WRAPPER);
    this.elements.wrapper.appendChild(this.createHeader());
    this.elements.wrapper.appendChild(this.createMain());
  },

  createHeader() {
    const header = document.createElement('h1');
    header.classList.add(CssClasses.HEADER);
    header.textContent = 'Virtual keyboard';
    return header;
  },

  createDisclamer() {
    const disclaimer = document.createElement('h3');
    disclaimer.innerHTML = 'Keyboard for mac <br> Language change - control(left) + option(left) for mac or control(left) + alt(left) for win';
    disclaimer.classList.add(CssClasses.DISCLAIMER);
    return disclaimer;
  },

  createMain() {
    const main = document.createElement('main');
    main.classList.add(CssClasses.MAIN);
    main.appendChild(this.createTextarea());
    main.appendChild(this.elements.keyboardContainer);
    main.appendChild(this.createDisclamer());
    return main;
  },

  createTextarea() {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('rows', '3');
    textarea.setAttribute('value', '');
    textarea.setAttribute('autofocus', '');
    textarea.classList.add(CssClasses.TEXTAREA);
    return textarea;
  },

  createKeyboard(lang) {
    const lineShift = ['delete', '\\', 'return', 'shift-r', 'ё'];

    this.elements.keyboardContainer = document.createElement('section');
    this.elements.keyboardContainer.classList.add(CssClasses.KEYBOARD);
    this.keysLayouts[lang].forEach((key) => {
      this.elements.keyboardContainer.appendChild(this.createKey(key));
      if (lineShift.includes(key)) {
        this.elements.keyboardContainer.appendChild(document.createElement('br'));
      }
    });
  },

  createKey(key) {
    const keyElement = new Key({
      object: Keyboard,
      name: key,
      class: [CssClasses.KEY],
      event: { click: this.inputData },
    });

    let i = '';
    switch (key) {
      case 'au':
        keyElement.name = '';
        keyElement.addClass(CssClasses.KEYBOARD_ARROW);

        i = document.createElement('i');
        i.classList.add(CssClasses.KEY_ARROW, CssClasses.KEY_ARROW_UP);

        keyElement.child = i;
        keyElement.event.click = this.arrowUp;
        break;

      case 'al':
        keyElement.name = '';
        keyElement.addClass(CssClasses.KEYBOARD_ARROW);

        i = document.createElement('i');
        i.classList.add(CssClasses.KEY_ARROW, CssClasses.KEY_ARROW_LEFT);

        keyElement.child = i;
        keyElement.event.click = this.arrowLeft;
        break;

      case 'ar':
        keyElement.name = '';
        keyElement.addClass(CssClasses.KEYBOARD_ARROW);

        i = document.createElement('i');
        i.classList.add(CssClasses.KEY_ARROW, CssClasses.KEY_ARROW_RIGHT);

        keyElement.child = i;
        keyElement.event.click = this.arrowRight;
        break;

      case 'ad':
        keyElement.name = '';
        keyElement.addClass(CssClasses.KEYBOARD_ARROW);

        i = document.createElement('i');
        i.classList.add(CssClasses.KEY_ARROW, CssClasses.KEY_ARROW_DOWN);

        keyElement.child = i;
        keyElement.event.click = this.arrowDown;
        break;

      case 'delete':
        keyElement.addClass(CssClasses.KEY_MEDIUM);
        keyElement.event.click = this.deleteData;
        break;

      case 'tab':
        keyElement.addClass(CssClasses.KEY_MEDIUM);
        keyElement.data = '\t';
        break;

      case 'capslock':
        keyElement.addClass(CssClasses.KEY_BIG, CssClasses.KEY_CAPS);
        keyElement.event.click = this.toggleCaps;
        break;

      case 'return':
        keyElement.addClass(CssClasses.KEY_BIG);
        keyElement.data = '\n';
        break;

      case 'shift-l':
        keyElement.addClass(CssClasses.KEY_BIG);
        keyElement.name = key.slice(0, -2);
        keyElement.event = {
          mousedown: this.toggleShift,
          mouseup: this.toggleShift,
        };
        break;

      case 'shift-r':
        keyElement.addClass(CssClasses.KEY_BIG);
        keyElement.name = key.slice(0, -2);
        keyElement.event = {
          mousedown: this.toggleShift,
          mouseup: this.toggleShift,
        };
        break;

      case 'control':
        keyElement.addClass(CssClasses.KEY_MEDIUM);
        keyElement.event = '';
        break;

      case 'option':
        keyElement.event = '';
        break;

      case 'command':
        keyElement.addClass(CssClasses.KEY_MEDIUM);
        keyElement.event = '';
        break;

      case 'space':
        keyElement.name = '';
        keyElement.addClass(CssClasses.KEY_EXTRA_BIG);
        keyElement.data = ' ';
        break;

      case ' ':
        keyElement.addClass(CssClasses.KEY_BLANK);
        break;

      default:
        break;
    }

    if (keyElement.name.length > 2) {
      keyElement.addClass([CssClasses.KEY_DARK]);
    }
    return keyElement.createKey();
  },

  arrowUp() {
    if (this.output.shift) {
      this.output.textarea.selectionStart = 0;
    } else {
      this.output.textarea.selectionEnd = 0;
    }
  },

  arrowLeft() {
    if (this.output.shift) {
      if (this.output.textarea.selectionStart > 0) {
        this.output.textarea.selectionStart -= 1;
      }
    } else {
      this.output.textarea.selectionEnd = this.output.textarea.selectionStart;
      if (this.output.textarea.selectionEnd > 0) {
        this.output.textarea.selectionEnd -= 1;
      }
    }
  },

  arrowRight() {
    if (this.output.shift) {
      if (this.output.textarea.selectionEnd < this.output.textarea.value.length) {
        this.output.textarea.selectionEnd += 1;
      }
    } else {
      this.output.textarea.selectionStart = this.output.textarea.selectionEnd;
      if (this.output.textarea.selectionStart < this.output.textarea.value.length) {
        this.output.textarea.selectionStart += 1;
      }
    }
  },

  arrowDown() {
    if (this.output.shift) {
      this.output.textarea.selectionEnd = this.output.textarea.value.length;
    } else {
      this.output.textarea.selectionStart = this.output.textarea.value.length;
    }
  },

  enumKeys() {
    Array.from(this.elements.keys).forEach((key) => {
      key.classList.add(this.keyCodes[Array.from(this.elements.keys).indexOf(key)]);
    });
  },

  toggleCaps() {
    this.output.caps = !this.output.caps;
    this.elements.keyboardContainer.querySelector(`.${CssClasses.KEY_CAPS}`).classList.toggle('on');
    Array.from(this.elements.keys).forEach((key) => {
      if (key.textContent.length === 1) {
        const buf = key;
        buf.textContent = this.output.caps
          ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    });
  },

  toggleShift() {
    this.output.shift = !this.output.shift;
    this.output.caps = !this.output.caps;
    Array.from(this.elements.keys).forEach((key) => {
      if (key.textContent.length === 1) {
        const buf = key;
        buf.textContent = this.output.caps
          ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        if (this.output.shift) {
          if (Object.keys(this.shiftLayout[this.output.lang]).includes(key.textContent)) {
            const buf2 = key;
            buf2.textContent = this.shiftLayout[this.output.lang][key.textContent];
          }
        }
        if (!this.output.shift) {
          if (Object.values(this.shiftLayout[this.output.lang]).includes(key.textContent)) {
            Object.keys(this.shiftLayout[this.output.lang]).forEach((k) => {
              if (this.shiftLayout[this.output.lang][k] === key.textContent) {
                const buf2 = key;
                buf2.textContent = k;
              }
            });
          }
        }
      }
    });
  },

  inputData(data) {
    let string = this.output.textarea.value;
    const start = this.output.textarea.selectionStart;
    const end = this.output.textarea.selectionEnd;

    string = string.slice(0, start) + data + string.slice(end);
    this.output.textarea.value = string;
    this.output.textarea.selectionStart = start + data.length;
    this.output.textarea.selectionEnd = start === end
      ? end + data.length : this.output.textarea.selectionStart;
  },

  deleteData() {
    let string = this.output.textarea.value;
    const start = this.output.textarea.selectionStart;
    const end = this.output.textarea.selectionEnd;

    if (start === end) {
      string = string.slice(0, start - 1) + string.slice(end);
      this.output.textarea.value = string;
      this.output.textarea.selectionStart = start - 1;
      this.output.textarea.selectionEnd = end - 1;
    } else {
      string = string.slice(0, start) + string.slice(end);
      this.output.textarea.value = string;
      this.output.textarea.selectionStart = start;
      this.output.textarea.selectionEnd = end - (end - start);
    }
  },

  physicalKeyDown(keyCode) {
    this.output.pressedButton = Array.from(this.elements.keys)
      .find((keyElement) => keyElement.classList.contains(keyCode));
    this.output.pressedKeys.add(keyCode);
    this.changeLang(this.output.pressedKeys);
    this.output.pressedButton.classList.add('active');
    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      const event = new Event('mousedown');
      this.output.pressedButton.dispatchEvent(event);
    } else {
      const event = new Event('click');
      this.output.pressedButton.dispatchEvent(event);
    }
  },

  physicalKeyUp(keyCode) {
    this.output.pressedButton = Array.from(this.elements.keys)
      .find((keyElement) => keyElement.classList.contains(keyCode));
    this.output.pressedKeys.delete(keyCode);
    this.output.pressedButton.classList.remove('active');

    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      const event = new Event('mouseup');
      this.output.pressedButton.dispatchEvent(event);
    }
  },

  changeLang(set) {
    if (set.has(KeyboardConst.CHANGE_LANG_BUTTON1) && set.has(KeyboardConst.CHANGE_LANG_BUTTON2)) {
      if (this.output.lang === 'en') {
        this.output.lang = 'ru';
      } else {
        this.output.lang = 'en';
      }
      Array.from(this.elements.keys).forEach((key) => {
        if (key.textContent.length === 1) {
          const buf = key;
          buf.textContent = this.output.caps
            ? this.keysLayouts[this.output.lang][Array.from(this.elements.keys).indexOf(key)]
              .toUpperCase()
            : this.keysLayouts[this.output.lang][Array.from(this.elements.keys).indexOf(key)];
        }
      });
    }
  },
};

export default Keyboard;
