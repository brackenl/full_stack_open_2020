Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedInBlogappUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("addUser", ({ name, username, password }) => {
  cy.request("POST", "http://localhost:3001/api/users/", {
    name,
    username,
    password,
  }).then(({ body }) => {
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("addBlog", ({ title, author, url, likes = 0 }) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedInBlogappUser")).token
      }`,
    },
  }).then(({ body }) => {
    cy.visit("http://localhost:3000");
  });
});
