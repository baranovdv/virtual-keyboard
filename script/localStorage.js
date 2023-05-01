export function setLocalStorage(name, item) {
  localStorage.setItem(name, item);
}

export function getLocalStorage(name) {
      return localStorage.getItem(name);
}
