// import "../style.css";

const CssClasses = {
  BODY: "body",
  WRAPPER: "wrapper",
  MAIN: "main",
  TEXTAREA: "main__output",
  HEADER: "header__title",
  KEYBOARD: "keyboard",
  KEY: "keyboard__key",
  KEY_MEDIUM: "keyboard__key_med",
  KEY_BIG: "keyboard__key_big",
  KEY_EXTRA_BIG: "keyboard__key_extra-big",
  KEY_DARK: "keyboard__key_dark",
  KEY_BLANK: "keyboard__key_blank",
  KEY_CAPS: "keyboard__key_caps",
  KEYBOARD_ARROW: "keyboard__arrow",
  KEY_ARROW: "key__arrow",
  KEY_ARROW_UP: "key__arrow_up",
  KEY_ARROW_RIGHT: "key__arrow_right",
  KEY_ARROW_LEFT: "key__arrow_left",
  KEY_ARROW_DOWN: "key__arrow_down",
}

const CHANGE_LANG_BUTTON1 = 'ControlLeft';
const CHANGE_LANG_BUTTON2 = 'AltLeft';

const Keyboard = {
  elements: {
    wrapper: null,
    keyboardContainer: null,
    keys: [],
  },

  output: {
    textarea: null,
    value: "",
    caps: false,
    shift: false,
    lang: 'en',
    pressedButton: null,
    pressedKeys: new Set(),
  },

  keysLayouts: {
    en: ["`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-","=","delete",
    "tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[","]","\\",
    "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l",";","\'","return",
    "shift-l", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/","au","shift-r",
    "control","option","command","space","command","option","al","ad","ar"," "],
    ru: ["`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-","=","delete",
    "tab","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ","ё",
    "capslock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж","э","return",
    "shift-l", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/","au","shift-r",
    "control","option","command","space","command","option","al","ad","ar"," "]
  },

  keyCodes: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal',
    'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],

  // langLayout: {
  //   '"':['@'], '№':['#'], '%':['$'], ':': ['%'], ',':['^'], '.':['&'], ';':['*'], '`':[']','['], 'q':['й'], 'w':['ц'], 'e':['у'],'r':['к'], 't':['е'], 'y':['н'],'u':['г'], 'i':['ш'], 'o':['щ'],'p':['з'], '{':['х'], '}':['ъ'],'\\':['ё'], 'a':['ф'], 's':['ы'],'d':['в'], 'f':['а'], 'g':['п'],'h':['р'], 'j':['о'], 'k':['л'], 'l':['д'], ':[':['ж'], '"':['э'], 'z':['я'],'x':['ч'], 'c':['с'], 'v':['м'],'b':['и'], 'n':['т'], 'm':['ь'],'],':['б'], '<':['б'] ,'>':['ю'], '.':['ю'], '/':['?'],
  //   '~':['[',']'], 'й':['q'], 'ц':['w'], 'у':['e'],'к':['r'], 'е':['t'], 'н':['y'],'г':['u'], 'ш':['i'], 'щ':['o'],'з':['p'], 'х':['[','{'], 'ъ':[']','}'],'ё':['\\','|'], 'ф':['a'], 'ы':['s'],'в':['d'], 'а':['f'], 'п':['g'],'р':['h'], 'о':['j'], 'л':['k'], 'д':['l'], 'ж':[';',':'], 'э':['"',"'"], 'я':['z'],'ч':['x'], 'с':['c'], 'м':['v'],'и':['b'], 'т':['n'], 'ь':['m'],'б':[']','<'], 'ю':['.','>'], '?':['/'],
  // },

  shiftLayout: {
  en: {
      '`': '~',
      '1': '!',
      '2': '@',
      '3': '#',
      '4': '$',
      '5': '%',
      '6': '^',
      '7': '&',
      '8': '*',
      '9': '(',
      '0': ')',
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
      '1': '!',
      '2': '"',
      '3': '№',
      '4': '%',
      '5': ':',
      '6': ',',
      '7': '.',
      '8': ';',
      '9': '(',
      '0': ')',
      '-': '_',
      '=': '+',
      '/': '?',
    },
  },

  init() {
    this.createKeyboard('en');
    
    this.createWrapper();

    document.body.appendChild(this.elements.wrapper);
    

    this.elements.keys = this.elements.keyboardContainer.querySelectorAll(".keyboard__key");
    this.output.textarea = this.elements.wrapper.querySelector(`.${CssClasses.TEXTAREA}`);
    this.enumKeys();
 
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      console.log(event.key, event.code);
      // this.physicalKeyDown(event.key.trim() ? event.key : event.code);
      this.physicalKeyDown(event.code);
      
    });
  
    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      this.physicalKeyUp(event.code);
      // this.physicalKeyUp(event.key.trim() ? event.key : event.code);
      // console.log(event.code, event.key);
    });

  },

  createWrapper() {
    this.elements.wrapper = document.createElement("div");
    this.elements.wrapper.classList.add(CssClasses.WRAPPER);

    this.elements.wrapper.appendChild(this.createHeader());
    this.elements.wrapper.appendChild(this.createMain());
    
  },

  createHeader() {
    const header = document.createElement("h1");
    header.classList.add(CssClasses.HEADER);
    header.textContent = "Virtual keyboard";
    return header;
  },
  
  createMain() {
    const main = document.createElement("main");
    main.classList.add(CssClasses.MAIN);
    main.appendChild(this.createTextarea());
    main.appendChild(this.elements.keyboardContainer);
    return main;
  },

  createTextarea() {
    const textarea = document.createElement("textarea");
    textarea.setAttribute("rows", "3");
    textarea.setAttribute("value", "");
    textarea.classList.add(CssClasses.TEXTAREA);
    return textarea;
  },

  createKeyboard(lang) {
    const lineShift = ["delete", "\\", "return", "shift-r", "ё"];
    this.elements.keyboardContainer = document.createElement("section");
    this.elements.keyboardContainer.classList.add(CssClasses.KEYBOARD);

    this.keysLayouts[lang].forEach(key => {
      this.elements.keyboardContainer.appendChild(this.createKey(key));
      if(lineShift.includes(key)) {
        this.elements.keyboardContainer.appendChild(document.createElement("br"));
      }
    });
  },

  createKey(key) {
    const keyElement = document.createElement("button");
    keyElement.classList.add(CssClasses.KEY);
    let i = "";
    switch(key) {
      case "au":
        i = document.createElement("i");
        i.classList.add(CssClasses.KEY_ARROW, CssClasses.KEY_ARROW_UP);
        keyElement.classList.add(CssClasses.KEYBOARD_ARROW);
        keyElement.appendChild(i);
        break;

      case "al":
        i = document.createElement("i");
        i.classList.add(CssClasses.KEY_ARROW, CssClasses.KEY_ARROW_LEFT);
        keyElement.classList.add(CssClasses.KEYBOARD_ARROW);
        keyElement.appendChild(i);
        break;

      case "ar":
        i = document.createElement("i");
        i.classList.add(CssClasses.KEY_ARROW, CssClasses.KEY_ARROW_RIGHT);
        keyElement.classList.add(CssClasses.KEYBOARD_ARROW);
        keyElement.appendChild(i);
        break;

      case "ad":
        i = document.createElement("i");
        i.classList.add(CssClasses.KEY_ARROW, CssClasses.KEY_ARROW_DOWN);
        keyElement.classList.add(CssClasses.KEYBOARD_ARROW);
        keyElement.appendChild(i);
        break;

      case "delete":
        keyElement.classList.add(CssClasses.KEY_MEDIUM);
        keyElement.textContent = key;
        keyElement.addEventListener('mousedown', () => {
          this.output.textarea.value = this.output.textarea.value.slice(0,-1);
        });
        break;
        
      case "tab":
        keyElement.classList.add(CssClasses.KEY_MEDIUM);
        keyElement.textContent = key;
        keyElement.addEventListener('mousedown', (event) => {
          this.inputData("	");
        });
        break;

      case "capslock":
        keyElement.classList.add(CssClasses.KEY_BIG, CssClasses.KEY_CAPS);
        keyElement.textContent = key;

        keyElement.addEventListener('mousedown', () => {
          this.toggleCaps();
        });
        break;

      case "return":
        keyElement.classList.add(CssClasses.KEY_BIG);
        keyElement.textContent = key;
        keyElement.addEventListener('mousedown', () => {
          this.inputData("\n");
        });
        break;

      case "shift-l":
        keyElement.classList.add(CssClasses.KEY_BIG);
        keyElement.textContent = key.slice(0,-2);
        keyElement.addEventListener('mousedown', () => {
          this.toggleShift();
        });
        keyElement.addEventListener('mouseup', () => {
          this.toggleShift();
        });
        break;

      case "shift-r":
        keyElement.classList.add(CssClasses.KEY_BIG);
        keyElement.textContent = key.slice(0,-2);
        keyElement.addEventListener('mousedown', () => {
          this.toggleShift();
        });
        keyElement.addEventListener('mouseup', () => {
          this.toggleShift();
        });
        break;

      case "control":
        keyElement.classList.add(CssClasses.KEY_MEDIUM);
        keyElement.textContent = key;
        break;

      case "option":
        keyElement.textContent = key;
        break;

      case "command":
        keyElement.classList.add(CssClasses.KEY_MEDIUM);
        keyElement.textContent = key;
        break;

      case "space":
        keyElement.classList.add(CssClasses.KEY_EXTRA_BIG);
        keyElement.addEventListener('mousedown', () => {
          this.inputData(" ");
        });
        break;

      case " ":
        keyElement.classList.add(CssClasses.KEY_BLANK);
        break;

      default: 
        keyElement.textContent = key;
        keyElement.addEventListener('mousedown', () => {
          this.inputData(keyElement.textContent);
        });
        break;
    }

    if(key.length > 2) {
      keyElement.classList.add(CssClasses.KEY_DARK);
    }

    return keyElement;
  },

  enumKeys() {
    for(key of this.elements.keys) {
      key.classList.add(this.keyCodes[Array.from(this.elements.keys).indexOf(key)]);
    }
  },

  toggleCaps() {
    this.output.caps = !this.output.caps;
    this.elements.keyboardContainer.querySelector(`.${CssClasses.KEY_CAPS}`).classList.toggle('on');
    console.log(this.output.caps)
    // this.output.shift = !this.output.shift; 
    for(key of this.elements.keys) {
      if(key.textContent.length === 1) {
        key.textContent = this.output.caps ? key.textContent.toUpperCase() : key.textContent.toLowerCase(); 
      }
    }
  },

  toggleShift() {
    this.output.shift = !this.output.shift;
    this.output.caps = !this.output.caps;

    for(key of this.elements.keys) {
      if(key.textContent.length === 1) {
        key.textContent = this.output.caps ? key.textContent.toUpperCase() : key.textContent.toLowerCase(); 

        if(this.output.shift) {
          if(Object.keys(this.shiftLayout[this.output.lang]).includes(key.textContent)) {
            key.textContent = this.shiftLayout[this.output.lang][key.textContent]
          }
        }
        
        if(!this.output.shift) {
          if(Object.values(this.shiftLayout[this.output.lang]).includes(key.textContent)) {
            for(let k in this.shiftLayout[this.output.lang]) {
              if(this.shiftLayout[this.output.lang][k] === key.textContent) {
                key.textContent = k;
                break;
              }
            }
          }
        }

      }
    }
  },

  inputData(data) {
    this.output.textarea.value += data;
  },

  physicalKeyDown(keyCode) {
    this.output.pressedButton = Array.from(this.elements.keys).find(keyElement => keyElement.classList.contains(keyCode));

    this.output.pressedKeys.add(keyCode);
    this.changeLang(this.output.pressedKeys);

    console.log(this.output.pressedKeys);

    this.output.pressedButton.classList.add("active");
    let event = new Event('mousedown');
    this.output.pressedButton.dispatchEvent(event);
  },

  physicalKeyUp(keyCode) {
    this.output.pressedButton = Array.from(this.elements.keys).find(keyElement => keyElement.classList.contains(keyCode));
    this.output.pressedKeys.delete(keyCode);
    console.log(this.output.pressedKeys);

    this.output.pressedButton.classList.remove("active");
    let event = new Event('mouseup');
    this.output.pressedButton.dispatchEvent(event);
  },

  changeLang(set) {
    if(set.has(CHANGE_LANG_BUTTON1) && set.has(CHANGE_LANG_BUTTON2)) {
      if(this.output.lang === 'en'){
        this.output.lang = 'ru';
      } else {
        this.output.lang = 'en';
      }
      for(key of this.elements.keys) {
        if(key.textContent.length === 1) {
          key.textContent = this.output.caps ?
            this.keysLayouts[this.output.lang][Array.from(this.elements.keys).indexOf(key)].toUpperCase() : 
            this.keysLayouts[this.output.lang][Array.from(this.elements.keys).indexOf(key)];
        }
      }
    }
  }

}

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();

});