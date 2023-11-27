class IncludeHtml extends HTMLElement {  
  _action = 'append';
  get action() {
    return this._action;
  }
  set action(value) {
    switch (value) {
    case 'after': case 'append': case 'before': case 'prepend':
      this._action = value;
      break;
    default:
      console.warn(`Invalid action '${value}'`);
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.action = this.getAttribute('action');
    const req = new XMLHttpRequest();
    req.onload = () => {
      const target = document.querySelector(this.getAttribute('selector'));
      if (target) {
        const elements = req.response.body.children;
        if (elements) {
          document.adoptNode(req.response.body);
          target[this.action](...elements);
        }
      }
    };
    req.responseType = 'document';
    req.open('GET', this.getAttribute('rel'));
    req.send();
  }
}

window.customElements.define('include-html', IncludeHtml);
