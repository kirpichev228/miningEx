export function authTest() {
  describe("Testing of authorized user", () => {
    before(() => {
      cy.visit("http://localhost:3000/catalog")
        .get("header")
        .within(() => {
          cy.get("button").should("contain", "Log in").click();
        });
      cy.get(".modal-form input[type='email']").type("prykhodzka99@gmail.com");
      cy.get(".modal-form input[type='email']").should(
        "have.value",
        "prykhodzka99@gmail.com"
      );
      cy.get(".modal-form input[type='password']").type("123456");
      cy.get(".modal-form input[type='password']").should(
        "have.value",
        "123456"
      );
      cy.get(".modal-form input[type='submit']").click();
      cy.wait(3000);
    });

    it("Should have access to cabinet", () => {
      cy.visit("http://localhost:3000/cabinet");
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/cabinet");
      });
    });

    it("Should have access to cart", () => {
      cy.visit("http://localhost:3000/cart");
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/cart");
      });
    });
  });

  describe("Testing of unauthorized user", () => {
    it("Should not have access to cabinet", () => {
      cy.visit("http://localhost:3000/cabinet");
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/catalog");
      });
    });

    it("Should not have access to cart", () => {
      cy.visit("http://localhost:3000/cart");
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/catalog");
      });
    });
  });
}
