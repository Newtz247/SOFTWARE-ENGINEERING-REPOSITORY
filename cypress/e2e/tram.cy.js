describe('Homepage E2E', () => {
  it('loads the homepage and displays main components', () => {
    cy.visit('http://localhost:3000');

    cy.contains("View Dictionary").should("exist");
    cy.contains("Mi'kmaq Pictionary").should("exist");
    cy.contains("Go to Pictionary Game").should("exist");
    
    
    cy.contains("Go to Pictionary Game").click();
    
  });
});


