import { authTest } from "./auth.cy";
import { cartTest } from "./cart.cy";
import { adminTest } from "./admin.cy";
import { discountTest } from "./discount.cy";

describe("Cart tests", () => {
  // cartTest();
});

describe("Authorization tests", () => {
  // authTest();
});

describe("Admin tests", () => {
  //adminTest();
});

describe("Discounts test", () => {
  discountTest();
});
/*
describe("Check non-existing urls", () => {
  it("Should show error and redirect to catalog page if user trying to access non-existing page", () => {
    cy.visit("http://localhost:3000/blabla");
    cy.get(".section-404__title").should("contain", "Page not found");
    cy.get(".section-404__button").should("contain", "Go to catalog").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/catalog");
    });
  });
});
*/
