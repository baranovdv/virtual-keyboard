import Keyboard from './keyboard.js';
import { setLocalStorage, getLocalStorage } from './localStorage.js';

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('lang')) {
    Keyboard.output.lang = getLocalStorage('lang');
  }
  Keyboard.init();
});

window.addEventListener('beforeunload', () => {
  setLocalStorage('lang', Keyboard.output.lang);
});
