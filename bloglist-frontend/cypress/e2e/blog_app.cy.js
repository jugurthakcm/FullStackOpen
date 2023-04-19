describe("Blog App Testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Login Page Opened", () => {
    cy.contains("Login");
    cy.contains("Blog App");
  });

  it("A user can be logged in", () => {
    cy.get("#username").type("juujuu");
    cy.get("#password").type("password");
    cy.get("#submitLogin").click();

    cy.contains("Create new blog");
  });
});
