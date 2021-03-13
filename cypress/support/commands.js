// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("login", sinon => {
    cy.visit('https://www.reclameaqui.com.br')
    cy.get('.login-ra__account-text').click() 
    cy.get('#username').type(sinon.Username)
    cy.get('#password').type(sinon.PassWord)
    cy.get('#kc-login').click({Force:true})
    cy.wait(20000) //Fazer o recaptcha manualmente.
    cy.get('.person_description > [style=""]').click()
    cy.get(':nth-child(2) > .link-user > .area-logged').click()
    cy.get('#btn-complainFlow-userAccount').click()
    
})


