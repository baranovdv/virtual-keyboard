export function setLocalStorage(Obj) {
  localStorage.setItem('lang', Obj.output.lang);
}

export function getLocalStorage(Obj) {
  if (localStorage.getItem('lang')) {
    Obj.output.lang = localStorage.getItem('lang');
  }
}
