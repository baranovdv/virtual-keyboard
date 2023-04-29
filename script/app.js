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
  KEY_BLANK: "keyboard__key_blank"
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
    value: "",
    caps: false
  },

  keysLayouts: {
    en: ["`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-","+","delete",
    "tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p","{","}","|",
    "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l",";","\'","return",
    "shift-l", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/","arup","shift-r",
    "control","option","command","space","command","option","arl","ard","arr"," "],
    ru: []
  },

  init() {
    this.createKeyboard('en');
    this.createWrapper();

    document.body.appendChild(this.elements.wrapper);
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
    const lineShift = ["delete", "|", "return", "shift-r"];
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

    switch(key) {
      case "delete":
        keyElement.classList.add(CssClasses.KEY_MEDIUM);
        keyElement.textContent = key;
        break;
        
      case "tab":
        keyElement.classList.add(CssClasses.KEY_MEDIUM);
        keyElement.textContent = key;
        break;

      case "capslock":
        keyElement.classList.add(CssClasses.KEY_BIG);
        keyElement.textContent = key;
        break;

      case "return":
        keyElement.classList.add(CssClasses.KEY_BIG);
        keyElement.textContent = key;
        break;

      case "shift-l":
        keyElement.classList.add(CssClasses.KEY_BIG);
        keyElement.textContent = key.slice(0,-2);
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
        break;

      case " ":
        keyElement.classList.add(CssClasses.KEY_BLANK);
        break;

      default: 
        keyElement.textContent = key;
        break;
    }

    if(key.length > 1) {
      keyElement.classList.add(CssClasses.KEY_DARK);
    }

    return keyElement;
  }

}

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});