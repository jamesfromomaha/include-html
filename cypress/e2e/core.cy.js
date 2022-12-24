describe('Core function', function () {
  before(function () {
    cy.visit('localhost:3000/index.html');
  });

  it('should load the html', function () {
    cy.root().invoke('html').should('include', 'yep it loaded');
  });

  it('should put the content where it belongs', function () {
    cy.get('#the-anchor')
      .prevUntil('p')
      .invoke('text')
      .should('equal', 'yep it loaded');
  });

  it('should evaluate script tags as usual', function () {
    let last = cy.root().children().last();
    last.its('tagName').should('equal', 'I')
    last.invoke('text').should('equal', 'yep it loaded');
  });
});
