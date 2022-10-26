class IncludeHtml extends HTMLElement {  
  // This is wildly ironic, but in lieu of forcing users of this component to
  // copy/paste four lines of boilerplate markup, I will compromise and render
  // the template element from a javascript string. Blargh why isn't there a
  // good way to do this >:(
  static {
    let template = '<template id="breathe-include-html"><iframe style="display none"></iframe><slot></slot></template>';
    document.body.insertAdjacentHtml('afterbegin', template);
  }

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
    // properties
    this.action = this.getAttribute('action');
    this.selector = this.getAttribute('selector');
    this.url = this.getAttribute('src');
    // use the template
    [this.iframe, this.slot] = template.content.cloneNode(true).children;
    // mount the shadow dom and insert the iframe
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.append(this.iframe);
  }

  connectedCallback() {
    // register the callback
    this.iframe.addEventListener('load', (function (event) {
      let target = document.querySelector(this.selector);
      let doc = this.contentDocument;
      if (target)
        for (let element of doc.body.children)
          target[this.action](document.adoptNode(element));
      this.shadow.append(this.slot);
    }).bind(this));
    // trigger the iframe load
    this.iframe.src = this.url;
  }
}
