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
      if (value) console.warn(`Invalid action '${value}'`);
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.action = this.getAttribute('action');
    const req = new XMLHttpRequest();
    req.onload = () => {
      const { head, body } = req.response;
      if (head || body) {
        const target = document.querySelector(this.getAttribute('selector'));
        if (target) {
          let nodes = [];
          if (head) nodes.push(...document.adoptNode(head).childNodes);
          if (body) nodes.push(...document.adoptNode(body).childNodes);
          target[this.action](...nodes);
        } else {
          console.warn(`Selector '${this.getAttribute('selector')}' did not find anything`);
        }
      }
    };
    req.responseType = 'document';
    req.open('GET', this.getAttribute('rel'));
    req.send();
  }
}

window.customElements.define('include-html', IncludeHtml);
