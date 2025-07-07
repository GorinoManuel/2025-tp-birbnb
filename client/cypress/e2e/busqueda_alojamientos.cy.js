describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    //cy.get('.carousel > div:nth-child(2) .item-footer-actions div button:nth-of-type(2)').click()
    cy.get('.appbar-buttons > button:nth-child(1)').click()

    cy.get('.barra-busqueda > button:nth-child(5)').click()

    cy.get('ul > div:nth-child(1)').click().type('Brasil')

    cy.get('div:nth-child(5)').click()

    cy.get('.barra-busqueda > button:nth-child(8)').click()

    const primerCard = cy.get('.carousel .cardlist > div:nth-child(1)')
    primerCard.should('contain', 'Brasil')

    // se debe agregar resto del recorrido hasta reservar
  })
})