describe("Blog App Testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "Full Name",
      username: "user",
      password: "password",
    };

    cy.request("POST", "http://localhost:3003/api/users/register", user);
  });

  it("Login Page Opened", () => {
    cy.contains("Login");
    cy.contains("Blog App");
  });

  describe("Login Form", () => {
    it("A user can be logged in", () => {
      cy.get("#username").type("user");
      cy.get("#password").type("password");
      cy.get("#submitLogin").click();

      cy.contains("Create new blog");
    });

    it("A user fails login", () => {
      cy.get("#username").type("differentuser");
      cy.get("#password").type("incorect");
      cy.get("#submitLogin").click();

      cy.contains("Username or password incorrect");
    });
  });
});
