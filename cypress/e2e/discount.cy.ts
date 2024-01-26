export function discountTest() {
  describe("Testing discounts", () => {
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

    it("Should be able to add discount", () => {
      cy.visit("http://localhost:3000/admin/discounts")
        .get(".admin-panel button")
        .click();
      cy.get(".modal-form").within(() => {
        cy.get("input[name='date_start']").type("2022-10-10");
        cy.get("input[name='date_end']").type("2022-12-12");
        // cy.contains("[data-handler'selectDay'] a", "25").click();

        cy.get("input[name='discount_number']").type("20");
        cy.get("input[type='submit']").click();
      });
    });
  });
}
