class IncludeHtml extends HTMLElement {  
  // restrict action to valid values
  set action(value) {
    switch (value) {
    case 'after': case 'append': case 'before': case 'prepend':
      this.action = value;
      break;
    default:
      console.warn('Invalid action %s; assuming append', value);
      this.action = 'append';
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.action = this.getAttribute('action');
    this.selector = this.getAttribute('selector');
    this.url = this.getAttribute('rel');
    let req = new XMLHttpRequest();
    req.responseType = 'document';
    req.onload = this.onresponse.bind(this);
    req.open('GET', url);
    req.send();
  }

  onresponse() {
    let target = document.querySelector(this.selector);
    if (target)
      for (let el of req.response.body.children)
        target[this.action](document.adoptNode(el));
  };
}
