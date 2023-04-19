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

  describe("Blogs Manipulation", () => {
    beforeEach(() => {
      const user = { username: "user", password: "password" };

      cy.request("POST", "http://localhost:3003/login", user).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("User can create a blog", () => {
      cy.get("#createBlogBtn").click();

      cy.get("#blogTitle").type("50 shades of grey");
      cy.get("#blogAuthor").type("Randynel");
      cy.get("#blogUrl").type("www.google.com");

      cy.get("#submitCreateBlogBtn").click();

      cy.contains("Blog Added Successfully");
    });

    it("User can delete a blog", () => {
      const blog = {
        title: "Title",
        author: "Rnadom Author",
        url: "RandonUrl",
      };

      cy.request({
        url: "http://localhost:3003/api/blogs",
        method: "POST",
        body: blog,
        headers: {
          authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      });

      cy.get(".blog-list-item").click();

      cy.get(".btn-danger").click();

      cy.on("window:confirm", () => true);

      cy.contains("Blog Deleted Successfully");
    });
  });
});
