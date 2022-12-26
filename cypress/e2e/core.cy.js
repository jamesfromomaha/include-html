describe('Core function', function () {
  beforeEach(function () {
    cy.visit('localhost:3000/index.html');
  });

  it('should load the html', function () {
    cy.get('body')
      .invoke('html')
      .should('include', 'yep it loaded');
  });

  it('should put the content where it belongs', function () {
    cy.get('#the-anchor')
      .prevAll('p:first')
      .invoke('text')
      .should('equal', 'yep it loaded');
  });
});
