describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#username").type("abc");
    cy.get("#password").type("abc");
  });

  describe("Log in", function () {
    beforeEach(function () {
      cy.addUser({
        name: "Tedrick Thompson",
        username: "Tedrickz",
        password: "ThirtyThree",
      });
    });

    it("works with correct creds", function () {
      cy.get("#username").type("Tedrickz");
      cy.get("#password").type("ThirtyThree");

      cy.contains("Login").click();

      cy.contains("Hello, Tedrick Thompson");
    });

    it("fails with incorrect creds", function () {
      cy.get("#username").type("wrong");
      cy.get("#password").type("ThirtyThree");

      cy.contains("Login").click();

      cy.get(".fail").contains("Wrong credentials");
      cy.get(".fail").should("have.css", "background-color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "Hello, Tedrick Thompson");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.addUser({
        name: "Tedrick Thompson",
        username: "Tedrickz",
        password: "ThirtyThree",
      });
      cy.login({
        username: "Tedrickz",
        password: "ThirtyThree",
      });
    });

    it("A blog can be created", function () {
      cy.contains("Create New Blog").click();

      cy.get(".titleInput").type("A test blog title");
      cy.get(".urlInput").type("www.test.com");

      cy.contains("Submit Blog").click();

      cy.contains("A test blog title");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.addBlog({
          title: "Another test blog title",
          author: "Tedrick Thompson",
          url: "www.test.com",
        });
      });

      it("it should be displayed", function () {
        cy.contains("Another test blog title");
      });

      it("the like button should be clickable", function () {
        cy.get(".detailToggle:first").click();
        cy.contains("Like").click();
      });

      it("it can be deleted by the user who created it", function () {
        cy.get(".detailToggle:first").click();
        cy.contains("Delete").click();

        cy.contains("Blog deleted successfully");
        cy.get(".success").should(
          "have.css",
          "background-color",
          "rgb(0, 128, 0)"
        );
        cy.get("html").should("not.contain", "Another test blog title");
      });

      it("it cannot be deleted by a user who did not create it", function () {
        cy.addUser({
          name: "Another User",
          username: "number2",
          password: "password",
        });

        cy.login({
          username: "number2",
          password: "password",
        });

        cy.get(".detailToggle:first").click();
        cy.contains("Delete").click();

        cy.get("html").should("contain", "Another test blog title");
        cy.get(".fail").should(
          "contain",
          "Request failed with status code 403"
        );
      });
    });
  });

  describe.only("When there are multiple blog posts", function () {
    beforeEach(function () {
      cy.addUser({
        name: "Tedrick Thompson",
        username: "Tedrickz",
        password: "ThirtyThree",
      });
      cy.login({
        username: "Tedrickz",
        password: "ThirtyThree",
      });
    });

    it("the posts are ordered from most to least likes", function () {
      cy.addBlog({
        title: "Moderately popular blog post",
        author: "Tedrick Thompson",
        url: "www.test.com",
        likes: 50,
      });

      cy.addBlog({
        title: "Unpopular blog post",
        author: "Tedrick Thompson",
        url: "www.test.com",
        likes: 1,
      });

      cy.addBlog({
        title: "Popular blog post",
        author: "Tedrick Thompson",
        url: "www.test.com",
        likes: 100,
      });

      cy.get(".blogCard:first").contains("Popular blog post");
      cy.get(".blogCard:last").contains("Unpopular blog post");
    });
  });
});
