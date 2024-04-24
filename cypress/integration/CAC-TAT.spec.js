/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      })
    
    const longtext = 'TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO  TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO TEXTO'

    it('preenche os campos obrigatórios e envia o formulário', function() {
        
        cy.get('input[type="text"]:eq(0)').type('Carlos')
        cy.get('input[type="text"]:eq(1)').type('Bastos')
        cy.get('input[type="email"]').type('cj.cypress@curso.com')
        cy.get('textarea').type(longtext, {delay:0})
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    
        cy.get('input[type="text"]:eq(0)').type('Carlos')
        cy.get('input[type="text"]:eq(1)').type('Bastos')
        cy.get('input[type="email"]').type('emailInválido')
        cy.get('textarea').type('Quero pizza')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('validar campo digitavel vazio', function() {
    
        cy.get('input[type="number"]').type('Texto').should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    
        cy.get('input[type="text"]:eq(0)').type('Carlos')
        cy.get('input[type="text"]:eq(1)').type('Bastos')
        cy.get('input[type="email"]').type('cj.cypress@curso.com')
        cy.get('#phone-checkbox').check()
        cy.get('textarea').type('Quero pizza')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })


    it('usar o comando clear', function() {
       
        cy.get('input[type="text"]:eq(0)').type('Carlos', {delay:0}).should('have.value', 'Carlos')
        cy.get('input[type="text"]:eq(1)').type('Bastos', {delay:0}).should('have.value', 'Bastos')
        cy.get('input[type="email"]').type('cj.cypress@curso.com', {delay:0}).should('have.value', 'cj.cypress@curso.com')
        cy.get('textarea').type(longtext, {delay:0}).should('have.value', longtext)

        cy.get('input[type="text"]:eq(0)').clear().should('have.value', '')
        cy.get('input[type="text"]:eq(1)').clear().should('have.value', '')
        cy.get('input[type="email"]').clear().should('have.value', '')
        cy.get('textarea').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

    cy.get('.button').click()
    cy.get('.error').should('be.visible')
    })

    it('preencher campos do formulario atravez de um comando customizado', function(){
        cy.preencherCamposDoFomulario()

        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('localizar elemento com contains', function(){
        cy.preencherCamposDoFomulario()

        cy.contains('Env').click()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('select').select('YouTube').should('have.value', 'youtube')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"]').check().should('be.checked')
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('#email-checkbox').check().should('be.checked')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#phone-checkbox').uncheck()

        cy.get('#check').last().should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload').selectFile('/Users/carlosalberto/vscode-workspace/cypress-basico-v2/cypress/fixtures/example.json')

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.contains('Política de Privacidade').should('have.attr', 'target', '_blank')

    })

    it.only('testa a página da política de privacidade de forma independente', function(){
        cy.contains('Política de Privacidade').invoke('removeAttr', 'target').click()
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')

    })
})
