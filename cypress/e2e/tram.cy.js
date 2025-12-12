describe('Homepage E2E', () => {
  it('loads the homepage and displays main components', () => {
    cy.visit('http://ugdev.cs.smu.ca:3421');

    cy.contains("View Dictionary").should("exist");
    cy.contains("Mi'kmaq Pictionary").should("exist");
    cy.contains("Go to Pictionary Game").should("exist");
    
    
    cy.contains("Go to Pictionary Game").click();
    
  });
});


