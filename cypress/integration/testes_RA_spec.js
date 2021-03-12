/// <reference types="cypress" />

context('Abrir plataforma', () => {
   
    it('Acessar o site RA', () => {
        cy.visit('https://www.reclameaqui.com.br/')
           })

     it('Cadastro na plataforma (consumidor)', () => {
        cy.get('.login-ra__account-text').click()
        cy.get('.padding-35 > .btn').click()
        cy.get('.col-md-offset-1 > .card > .box-form > .btn').click()
        
     }
     )
})