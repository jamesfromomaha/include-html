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
    this.url = this.getAttribute('src');
    let self = this;
    let req = new XMLHttpRequest();
    req.responseType = "document";
    req.onload = 
    req.open("GET", "file.html");
    req.send();
    // trigger the iframe load
    this.iframe.src = this.url;
  }

  onresponse() {
      let target = document.querySelector(self.selector);
      if (target)
        for (let el of req.response.body.children)
          target[self.action](document.adoptNode(el));
    };
}
