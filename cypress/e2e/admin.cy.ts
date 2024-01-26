export function adminTest() {
  describe("Testing catalog section", () => {
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

    it("Should add catalog item", () => {
      cy.visit("http://localhost:3000/admin")
        .get(".admin-panel button")
        .click();
      cy.get(".modal-form").within(() => {
        cy.get("input[name='photo']").selectFile(
          "cypress/e2e/images/camera_image.png"
        );
        cy.get("input[name='name']").type("New catalog Item");
        cy.get("input[name='name']").should("have.value", "New catalog Item");
        cy.get("input[name='price']").type("2000");
        cy.get("input[name='price']").should("have.value", "2000");
        cy.get("input[name='manufacturer']").type("Canon");
        cy.get("input[name='manufacturer']").should("have.value", "Canon");
        cy.get("input[name='type']").type("compact-camera");
        cy.get("input[name='type']").should("have.value", "compact-camera");
        cy.get("input[name='battery_type']").type("Li-ion (LP-E10)");
        cy.get("input[name='battery_type']").should(
          "have.value",
          "Li-ion (LP-E10)"
        );
        cy.get("input[name='pixels']").type("24");
        cy.get("input[name='pixels']").should("have.value", "24");
        cy.get("input[name='max_FPS_video']").type("30");
        cy.get("input[name='max_FPS_video']").should("have.value", "30");
        cy.get("input[name='max_sensitivity']").type("5000");
        cy.get("input[name='max_sensitivity']").should("have.value", "5000");
        cy.get("input[name='min_sensitivity']").type("100");
        cy.get("input[name='min_sensitivity']").should("have.value", "100");
        cy.get("input[name='max_resolution']").type("100");
        cy.get("input[name='max_resolution']").should("have.value", "100");
        cy.get("select[name='wi_fi']").select("true");
        cy.get("select[name='wi_fi']").should("have.value", "true");
        cy.get("input[name='card_support']").type("SD");
        cy.get("input[name='card_support']").should("have.value", "SD");
        cy.get("input[name='matrix_type']").type("CMOS");
        cy.get("input[name='matrix_type']").should("have.value", "CMOS");
        cy.get("input[name='matrix_size']").type("1.5");
        cy.get("input[name='matrix_size']").should("have.value", "1.5");
        cy.get("input[name='warranty']").type("12");
        cy.get("input[name='warranty']").should("have.value", "12");
        cy.get("input[name='in_stock']").type("12");
        cy.get("input[name='in_stock']").should("have.value", "12");
        cy.get("input[name='item_code']").type("5768768");
        cy.get("input[name='item_code']").should("have.value", "5768768");
        cy.get("select[name='is_visible']").select("true");
        cy.get("select[name='is_visible']").should("have.value", "true");
        cy.get("input[type='submit']").click();
      });
    });
  });
}
