describe('Ziyang: page exist', () => {
  it('passes', () => {
    cy.viewport('iphone-6');
    cy.visit('http://Ugdev.cs.smu.ca:3421')
  })
})

describe('Ziyang: DropDown exist', () => {
  it('passes', () => {
    cy.visit('http://Ugdev.cs.smu.ca:3421');
    cy.get('#dropdown').should('exist');
  })
})
