class Key {
  constructor(options) {
    this.object = options.object;
    this.name = options.name;
    this.class = [...options.class];
    this.event = options.event;
  }

  createKey() {
    const keyElement = document.createElement('button');
    keyElement.textContent = this.name;
    keyElement.classList.add(...this.class);

    if (this.child) {
      keyElement.appendChild(this.child);
    }

    Object.keys(this.event).forEach((trigger) => {
      keyElement.addEventListener(trigger, () => {
        this.event[trigger].call(this.object, this.data ? this.data : keyElement.textContent);
        this.object.output.textarea.focus();
      });
    });
    return keyElement;
  }

  addClass(...classes) {
    this.class = this.class.concat([...classes]);
  }
}

export default Key;
