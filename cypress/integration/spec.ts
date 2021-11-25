describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('SUDOKU SOLVER')
  })

  it("solve a easy problem provided in norvig's format", () => {
    cy.visit('/')
    cy.contains('SUDOKU SOLVER')
    cy.get('#problem').type('003020600900305001001806400008102900700000008006708200002609500800203009005010300')
    cy.get('.submit-button > button').click()
    cy.get('#problemGrid').within(() => {
      cy.get('.firstRow > input').eq(2).should('have.value',3)
      cy.get('.firstRow > input').eq(4).should('have.value',2)
      return cy.get('.firstRow > input').eq(6).should('have.value',6)
    })

    cy.get('.solve-button').click()

    cy.get('#solutionGrid').within(() => {
      cy.get('.firstRow > input').eq(0).should('have.value',4)
      cy.get('.firstRow > input').eq(1).should('have.value',8)
      cy.get('.firstRow > input').eq(2).should('have.value',3)
      cy.get('.firstRow > input').eq(3).should('have.value',9)
      cy.get('.firstRow > input').eq(4).should('have.value',2)
      cy.get('.firstRow > input').eq(5).should('have.value',1)
      cy.get('.firstRow > input').eq(6).should('have.value',6)
      cy.get('.firstRow > input').eq(7).should('have.value',5)
      return cy.get('.firstRow > input').eq(8).should('have.value',7)
    })
  })

  it("solve a hard problem provided in norvig's format", () => {
    cy.visit('/')
    cy.contains('SUDOKU SOLVER')
    cy.get('#problem').type('4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......')
    cy.get('.submit-button > button').click()
    cy.get('#problemGrid').within(() => {
      cy.get('.firstRow > input').eq(0).should('have.value',4)
      cy.get('.firstRow > input').eq(6).should('have.value',8)
      return cy.get('.firstRow > input').eq(8).should('have.value',5)
    })

    cy.get('.solve-button').click()

    cy.get('#solutionGrid').within(() => {
      cy.get('.firstRow > input').eq(0).should('have.value',4)
      cy.get('.firstRow > input').eq(1).should('have.value',1)
      cy.get('.firstRow > input').eq(2).should('have.value',7)
      cy.get('.firstRow > input').eq(3).should('have.value',3)
      cy.get('.firstRow > input').eq(4).should('have.value',6)
      cy.get('.firstRow > input').eq(5).should('have.value',9)
      cy.get('.firstRow > input').eq(6).should('have.value',8)
      cy.get('.firstRow > input').eq(7).should('have.value',2)
      return cy.get('.firstRow > input').eq(8).should('have.value',5)
    })
  })
})
