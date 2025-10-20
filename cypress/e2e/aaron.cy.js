describe("Aaron", () => {
  it('should find the text in the mobile view', () => {
    cy.visit('http://ugdev.cs.smu.ca:3421'); 
    cy.get('#angie-header-mobile').contains("mikwite'tmk+t Angie");
  });

  it('should find the text in the desktop view', () => {
    cy.visit('http://ugdev.cs.smu.ca:3421'); 
    cy.get('#angie-header-desktop').contains("mikwite'tmk+t Angie");
  });
});
