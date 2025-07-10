describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.appbar-buttons > button:nth-child(1)').click()

    cy.get('.barra-busqueda > button:nth-child(5)').click()

    cy.get('ul > div:nth-child(1)').click().type('Brasil')

    cy.get('div:nth-child(5)').click()

    const botonBuscar = cy.get('.barra-busqueda > button:nth-child(8)')
    botonBuscar.should('contain', 'Buscar')
    botonBuscar.click()

    const primerCard = cy.get('.carousel .cardlist > div:nth-child(1)')
    primerCard.should('contain', 'Brasil')


    const botonVerMas = cy.get('.cardAlojamiento > div:nth-child(3) .cardButton div button')
    botonVerMas.should('contain', 'ver mas +')
    botonVerMas.click()

    // Alojamientos Detail
    const imagenAlojamiento = cy.get('.image')
    imagenAlojamiento.find('img').should('be.visible')


    // Descripcion del alojamiento
    cy.get('.image-footer .description').find('.chips-box').should('be.visible')
    cy.get('.image-footer .description').find('h1').should('be.visible')

    cy.get('.image-footer .description > p:nth-child(4)').should('include.text','Dirección:')
    cy.get('.image-footer .description > p:nth-child(5)').should('include.text','Precio por noche:')
    cy.get('.image-footer .description > p:nth-child(6)').should('include.text','Horario de Check In:')
    cy.get('.image-footer .description > p:nth-child(7)').should('include.text','Horario de Check Out:')
    cy.get('.image-footer .description > p:nth-child(8)').should('include.text','huesped/es')
    
    // Boton de reservar
    cy.get('.image-footer .buying-section form > div:nth-child(1)').type(1)
    cy.get('.image-footer .buying-section form > div:nth-child(2)').type('2025-09-17')
    cy.get('.image-footer .buying-section form > div:nth-child(3)').type('2025-09-21')

    cy.get('.image-footer .buying-section form > button').should('contain', 'Reservar')
    cy.get('.image-footer .buying-section form > button').click()
  })
})