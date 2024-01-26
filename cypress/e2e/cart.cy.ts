export function cartTest() {
  describe("Testing catalog item", () => {
    it("Should have button for adding item to cart", () => {
      cy.visit("http://localhost:3000/catalog")
        .get(".catalog__wrapper .catalog-item")
        .first()
        .within(() => {
          cy.get("button").should("contain", "Add to cart");
        });
    });
  });

  describe("Testing addition of items", () => {
    beforeEach(() => {
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

    it("Should add item to cart on click", () => {
      cy.visit("http://localhost:3000/catalog")
        .get(".catalog__wrapper .catalog-item")
        .first()
        .within(() => {
          cy.get("button").click();
        });
      cy.visit("http://localhost:3000/cart")
        .get(".table tbody tr")
        .should("have.length", 1);
    });

    it("Should delete item from cart", () => {
      cy.visit("http://localhost:3000/catalog")
        .get(".catalog__wrapper .catalog-item")
        .first()
        .within(() => {
          cy.get("button").click();
        });
      cy.visit("http://localhost:3000/cart")
        .get(".table tbody tr")
        .first()
        .get(".table-icon__wrap")
        .click();
      cy.get(".cart-placeholder .cart-placeholder__wrapper p").should(
        "contain",
        "Your cart is empty"
      );
    });

    it("Should increase number of items in cart if clicking on button multiple times", () => {
      cy.visit("http://localhost:3000/catalog")
        .get(".catalog__wrapper .catalog-item")
        .first()
        .within(() => {
          cy.get("button").click();
          cy.get("button").click();
        });
      cy.visit("http://localhost:3000/cart")
        .get(".table tbody tr input[type='number']")
        .should("have.value", 2);
    });
  });
}
