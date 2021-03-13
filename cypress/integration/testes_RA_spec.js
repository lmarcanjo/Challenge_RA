/// <reference types="cypress" />

context('Abrir plataforma', () => {
   
    it('Acessar o site RA', () => {
        cy.visit('https://www.reclameaqui.com.br/')
        cy.get('#onetrust-accept-btn-handler').click()
           })



    it('Cadastro na plataforma (consumidor)', () => {

        cy.visit('https://www.reclameaqui.com.br/cadastro/')
        cy.get('.col-md-offset-1 > .card > .box-form > .btn').click()
    })
    it('Dados de cadastro do Consumidor (Ignorando o CPF)', () => {

        const CompleteName = "Jéssica Catarina da Silva"
        const Email = "jessicasilva@cantinadafazenda.com.br"
        const Telefone = "71991170555"
        const Birthday = "16/07/1989"

        cy.get('.name-gap-form > .col-sm-12 > .custom-box > .form-control').type(CompleteName)
        cy.get(':nth-child(3) > .col-sm-12 > .custom-box > .form-control').type(Birthday)
        cy.get(':nth-child(3) > :nth-child(2) > .custom-box').type('00000000000')
        cy.get('.padding-line > :nth-child(3) > .custom-box').type(Telefone)
        cy.get('#gender').click({Force:true}).get('#ui-select-choices-row-0-0').contains('Feminino').click()
        cy.get('#state').click({Force:true}).get('#ui-select-choices-row-1-4').contains('Bahia').click()
        cy.get('#city > .ui-select-match > .btn-default > .ui-select-placeholder').click({force:true}).get('#ui-select-choices-row-2-0 > .ui-select-choices-row-inner > .ng-binding').contains('Salvador').click()
        cy.get('.col-md-6 > .custom-box > .form-control').type(Email)
        cy.get(':nth-child(8) > :nth-child(2) > .custom-box > .form-control').type('123456')
        cy.get(':nth-child(8) > :nth-child(3) > .custom-box > .form-control').type('123456')
        cy.get(':nth-child(2) > .lbl-accept > .ng-pristine').check()
        cy.get(':nth-child(3) > .lbl-accept > .ng-pristine').check()        
        cy.get('.ng-invalid.ng-valid-pattern > :nth-child(3) > :nth-child(2)').contains('Preencha seu cpf corretamente')
    })
     it('Dados de cadastro do Consumidor (Termo de Uso )', () => {
        const customer = {
        CompleteName: "Jessica Catarina da Silva",
        Email: "jessicasilva@cantinadafazenda.com.br",
        Telefone: "71991170555",
        Birthday: "16/07/1989",
        Password: "123456"
        };

        cy.atalhos(customer);

        cy.get(':nth-child(3) > :nth-child(2) > .custom-box').type('19145519315')
        cy.get('#gender').click({Force:true}).get('#ui-select-choices-row-0-0').contains('Feminino').click()
        cy.get('#state').click({Force:true}).get('#ui-select-choices-row-1-4').contains('Bahia').click()
        cy.get('#city > .ui-select-match > .btn-default > .ui-select-placeholder').click({force:true}).get('#ui-select-choices-row-2-0 > .ui-select-choices-row-inner > .ng-binding').contains('Salvador').click()
        cy.get(':nth-child(3) > .lbl-accept > .ng-dirty').uncheck()
        cy.get('.row.align-center > :nth-child(1)').contains('Você precisa aceitar a nossa Política de Privacidade e os Termos de Uso para continuar')
        
    })
     it('Dados de cadastro do Consumidor (Preencher com Facebook )', () => {

        const Telefone = "71991170555"
        const Birthday = "16/07/1989"

        cy.visit('https://www.reclameaqui.com.br/cadastro/')
        cy.get('.col-md-offset-1 > .card > .box-form > .btn').click()
        cy.get('.col-lg-6 > .btn').click() 
        cy.wait(6000)

        cy.get(':nth-child(3) > :nth-child(2) > .custom-box').type('19145519315')
        cy.get('.padding-line > :nth-child(3) > .custom-box').type(Telefone)
        cy.get(':nth-child(3) > .col-sm-12 > .custom-box > .form-control').type(Birthday)
        cy.get('#gender').click({Force:true}).get('#ui-select-choices-row-0-0').contains('Feminino').click()
        cy.get('#state').click({Force:true}).get('#ui-select-choices-row-1-4').contains('Bahia').click()
        cy.get('#city > .ui-select-match > .btn-default > .ui-select-placeholder').click({force:true}).get('#ui-select-choices-row-2-0 > .ui-select-choices-row-inner > .ng-binding').contains('Salvador').click()
        cy.get(':nth-child(8) > :nth-child(2) > .custom-box > .form-control').type('123456')
        cy.get(':nth-child(8) > :nth-child(3) > .custom-box > .form-control').type('123456')
        cy.get(':nth-child(2) > .lbl-accept > .ng-pristine').check()
        cy.get(':nth-child(3) > .lbl-accept > .ng-pristine').check()        
        cy.get('#btn-create-common-user').should('not.have.value','disabled')

     })

        it('Cadastro na plataforma (Pessoa Jurídica)', () => { 

            cy.visit('https://www.reclameaqui.com.br/cadastro/') 
            cy.get('.col-md-offset-2 > .card > .box-form > .btn').click()
            cy.get('.btn-full-blue').click()
            cy.get('.box-form > .ng-invalid > :nth-child(1) > .form-control').type('97659486000106')
            cy.wait(12000) //Fazer o recaptcha manualmente.
            cy.get(':nth-child(3) > button.btn').should('not.have.value','disabled')
            
    })
     
        it('Login na plataforma', () => {

            cy.visit('https://www.reclameaqui.com.br/')
            cy.get('.login-ra__account-text').click()
            cy.get('.primary-title').contains('Que bom que você vai usar o Reclame AQUI :)')  
    })  
    
        it('Login Inválido', () => {

            cy.visit('https://www.reclameaqui.com.br/')
            cy.get('.login-ra__account-text').click() 
            cy.get('#username').type('teste')
            cy.get('#password').type('forçandooerro')
            cy.get('#kc-login').click({Force:true})
            cy.wait(12000) //Fazer o recaptcha manualmente.
            cy.get('.alert').contains('Ops! Alguma informação incorreta.')
    })

        it('logout da plataforma', () => {

            cy.visit('https://www.reclameaqui.com.br')
            cy.get('.login-ra__account-text').click() 
            cy.get('#username').type('lmarcanjo@hotmail.com')
            cy.get('#password').type('qwerty123')
            cy.get('#kc-login').click({Force:true})
            cy.wait(20000) //Fazer o recaptcha manualmente.
            cy.get('.person_description > [style=""]').click()
            cy.get(':nth-child(2) > .link-user > .area-logged').click()
            cy.get('.main-sidebar > :nth-child(13) > a').click()

    })
        it('Nova Reclamação na plataforma', () => {

            cy.visit('https://www.reclameaqui.com.br')
            cy.get('.login-ra__account-text').click() 
            cy.get('#username').type('lmarcanjo@hotmail.com')
            cy.get('#password').type('qwerty123')
            cy.get('#kc-login').click({Force:true})
            cy.wait(20000) //Fazer o recaptcha manualmente.
            cy.get('.person_description > [style=""]').click()
            cy.get(':nth-child(2) > .link-user > .area-logged').click()
            cy.get('#btn-complainFlow-userAccount').click()
            cy.get('.container > .big-title').contains('Encontre a empresa para reclamar')

    })
    
        it('Reclamações (rascunho)', () => {

            const dados = {
                Username :'lmarcanjo@hotmail.com',
                PassWord :'qwerty123',
           };

           cy.login(dados);

           cy.get('.typeahead-search-blue').type('Teste123')
           cy.get('#btn-searchCompany-complain').click()
           cy.get('.ng-binding > b').click()
           cy.get('.col-md-3 > .brand-logo > .hidden-xs > img').click()


    })

        it('Reclamações Sem Título)', () => { 

            const dados = {
                Username :'lmarcanjo@hotmail.com',
                PassWord :'qwerty123',
           };

           cy.login(dados);

           cy.get('.typeahead-search-blue').type('Teste123')
           cy.get('#btn-searchCompany-complain').click()
           cy.get('.ng-binding > b').click()
           cy.get('#txt-complainFormDescription-complain').type('Nunca inclua dados pessoais no texto. A empresa receberá seus dados junto com a reclamação.')
           cy.get('.ng-invalid.ng-valid-mask > :nth-child(1)').contains('Ops! Parece que você esqueceu do título.')


    })
        it('Reclamações Sem História)', () => {
            const dados = {
                Username :'lmarcanjo@hotmail.com',
                PassWord :'qwerty123',
           };

           cy.login(dados);

           cy.get('.typeahead-search-blue').type('Teste123')
           cy.get('#btn-searchCompany-complain').click()
           cy.get('.ng-binding > b').click()
           cy.get('#btn-complainFormCompanyTitleComplain-complain').type('tesssssste')
           cy.get('.ng-valid-mask.ng-invalid > :nth-child(2)').click()
           cy.contains('Ops! Parece que você esqueceu de contar sua história.')


    })

         it('Reclamações na plataforma (Trocar de empresa)', () => {

            const dados = {
                Username :'lmarcanjo@hotmail.com',
                PassWord :'qwerty123',
           };

           cy.login(dados);


           cy.get('.typeahead-search-blue').type('Teste123')
           cy.get('#btn-searchCompany-complain').click()
           cy.get('.ng-binding > b').click()
           cy.get('#trocarEmpresaReclamada').click()
           cy.get('[ui-view=""] > .container').contains('Encontre a empresa para reclamar')


    })
         it.only('Cancelar uma reclamação', () => { 

            const dados = {
                Username :'lmarcanjo@hotmail.com',
                PassWord :'qwerty123',
           };

           cy.login(dados);
            
           cy.get('.user-role').click()
           cy.get('.dropdown-menu > :nth-child(1) > a').click()
           cy.get('.btn-disable-complaints-all.ng-scope > .disable-complaints').click({force:true})
           cy.get('.mktpRelated-top > .disable').contains('Desativar')
           

         })
})