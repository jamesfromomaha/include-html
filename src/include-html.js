class IncludeHtml extends HTMLElement {  
  // restrict action to valid values
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
      console.warn('Invalid action %s; assuming append', value);
      this._action = 'append';
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    let action = this.action = this.getAttribute('action');
    let selector = this.getAttribute('selector');
    let url = this.getAttribute('rel');
    let req = new XMLHttpRequest();
    req.onload = function () {
      let target = document.querySelector(selector);
      if (target) {
        let elements = req.response.body.children;
        if (elements) {
          document.adoptNode(req.response.body);
          target[action](...elements);
        }
      }
    };
    req.responseType = 'document';
    req.open('GET', url);
    req.send();
  }
}

window.customElements.define('include-html', IncludeHtml);
