Cypress.Commands.add('preencherCamposDoFomulario', function(){
    const longtext = 'TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO  TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO'

    cy.get('input[type="text"]:eq(0)').type('Carlos', {delay:0}).should('have.value', 'Carlos')
    cy.get('input[type="text"]:eq(1)').type('Bastos', {delay:0}).should('have.value', 'Bastos')
    cy.get('input[type="email"]').type('cj.cypress@curso.com', {delay:0}).should('have.value', 'cj.cypress@curso.com')
    cy.get('textarea').type(longtext, {delay:0}).should('have.value', longtext)
})