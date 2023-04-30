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
  KEYBOARD_ARROW: "keyboard__arrow",
  KEY_ARROW: "key__arrow",
  KEY_ARROW_UP: "key__arrow_up",
  KEY_ARROW_RIGHT: "key__arrow_right",
  KEY_ARROW_LEFT: "key__arrow_left",
  KEY_ARROW_DOWN: "key__arrow_down",
}

const TEXT_BUTTON_LEFT = "<";

let cardContainer = null;

const Keyboard = {
  elements: {
    wrapper: null,
    keyboardContainer: null,
    keys: []
  },

  output: {
    textarea: null,
    value: "",
    caps: false,
    shift: false,
    pressedKeys: new Set()
  },

  keysLayouts: {
    en: ["`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-","=","delete",
    "tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[","]","\\",
    "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l",";","\'","return",
    "shift-l", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/","au","shift-r",
    "control","option","command","space","command","option","al","ad","ar"," "],
    ru: []
  },

  shiftLayout: {
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

  init() {
    this.createKeyboard('en');
    this.createWrapper();

    document.body.appendChild(this.elements.wrapper);
    this.elements.keys = this.elements.keyboardContainer.querySelectorAll(".keyboard__key");
    this.output.textarea = this.elements.wrapper.querySelector(`.${CssClasses.TEXTAREA}`);

    document.addEventListener('keydown', (event) => {
      // console.log(event.code, event.key);
      this.physicalKeyDown(event.key);
      
    });
  
    document.addEventListener('keyup', (event) => {
      this.physicalKeyUp(event.key);
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
    const lineShift = ["delete", "\\", "return", "shift-r"];
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
        keyElement.addEventListener('mousedown', () => {
          this.inputData("	");
        });
        break;

      case "capslock":
        keyElement.classList.add(CssClasses.KEY_BIG);
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

  toggleCaps() {
    this.output.caps = !this.output.caps; 
    for(key of this.elements.keys) {
      if(key.textContent.length === 1) {
        key.textContent = this.output.caps ? key.textContent.toUpperCase() : key.textContent.toLowerCase(); 
      }
    }
  },

  toggleShift() {
    this.output.shift = !this.output.shift; 
    for(key of this.elements.keys) {
      if(key.textContent.length === 1) {
        key.textContent = this.output.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase(); 

        if(this.output.shift) {
          if(Object.keys(this.shiftLayout).includes(key.textContent)) {
            key.textContent = this.shiftLayout[key.textContent]
          }
        }
        
        if(!this.output.shift) {
          
          if(Object.values(this.shiftLayout).includes(key.textContent)) {
            console.log(key.textContent);
            for(let k in this.shiftLayout) {
              if(this.shiftLayout[k] === key.textContent) {
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

  physicalKeyDown(key) {
    key = this.keyCheck(key);
    
    console.log(key);

    let pressedButton = Array.from(this.elements.keys).find(keyElement => keyElement.textContent.toLowerCase() === key);
    // console.log(pressedButton);

    let event = new Event('mousedown');
    pressedButton.dispatchEvent(event);
  },

  physicalKeyUp(key) {
    key = this.keyCheck(key);
    let pressedButton = Array.from(this.elements.keys).find(keyElement => keyElement.textContent.toLowerCase() === key);

    let event = new Event('mouseup');
    pressedButton.dispatchEvent(event);
  },

  keyCheck(key) {
    switch(key) {
      case 'Backspace': 
        key = 'delete';
        break;

      case 'CapsLock': 
        key = 'capslock';
        break;

      case 'Shift': 
        key = 'shift';
        break;

      case 'Control': 
        key = 'control';
        break;

      case 'Alt': 
        key = 'option';
        break;

      case 'Meta': 
        key = 'command';
        break;

      case 'Tab': 
        key = 'tab';
        break;

      default:
        break;
    }
    return key;
  },

}

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();

});