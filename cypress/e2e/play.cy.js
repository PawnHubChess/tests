beforeEach(() => {
  cy.viewport("macbook-15");
  cy.intercept("WebSocketConnection.ts").as("svelte");
  cy.visit("/play");
  cy.wait("@svelte");
});

describe("empty spec", () => {
  it("passes", () => {
    cy.wait(3000);

    cy.get("#entirePageLocalServer").check();
    cy.get("#input1").type("0000"); // debug id
    cy.get("#input2").type("1234");
    cy.get("#connectButton").click();

    // Now on game page

    Cypress.on("uncaught:exception", (err, runnable) => {
      if (
        err.message.includes("Cannot read properties of ") ||
        err.message.includes("srcSquare") ||
        err.message.includes("ResizeObserver")
      ) {
        // Ignore these errors
        return false;
      }
    });


    cy.wait(1000);

    cy.url().should("contain", "/play/game");
    cy.get("chess-board").should("be.visible");
  });
});
