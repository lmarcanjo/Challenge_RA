/// <reference types="cypress"/>
const faker = require("faker-br");

context('Testar fluxo de dados do RA', () => {

    it('Acessar o site RA', () => {
        cy.visit('https://www.reclameaqui.com.br/')
        cy.get('#onetrust-accept-btn-handler').click()})

    it('Cadastro consumidor', () => {

        cy.visit('https://www.reclameaqui.com.br/cadastro/')
        cy.get('.col-md-offset-1 > .card > .box-form > .btn').click()})

    it('Cadastro do Consumidor (Ignorando o CPF)', () => {

        const CompleteName = cy.faker.name.firstName();
        const Email = cy.faker.internet.email();
        const Telefone = cy.faker.phone.phoneNumber();
        const Birthday = "16/07/1989"
        const Password = cy.faker.internet.password();
        const CPF = cy.faker.br.cpf();

        cy.get('.name-gap-form > .col-sm-12 > .custom-box > .form-control').type(CompleteName)
        cy.get(':nth-child(3) > .col-sm-12 > .custom-box > .form-control').type(Birthday)
        cy.get(':nth-child(3) > :nth-child(2) > .custom-box').type('00000000000')
        cy.get('.padding-line > :nth-child(3) > .custom-box').type(Telefone)
        cy.get('#gender').click({ Force: true }).get('#ui-select-choices-row-0-0').contains('Feminino').click()
        cy.get('#state').click({ Force: true }).get('#ui-select-choices-row-1-4').contains('Bahia').click()
        cy.get('#city > .ui-select-match > .btn-default > .ui-select-placeholder').click({ force: true }).get('#ui-select-choices-row-2-0 > .ui-select-choices-row-inner > .ng-binding').contains('Salvador').click()
        cy.get('.col-md-6 > .custom-box > .form-control').type(Email)
        cy.get(':nth-child(8) > :nth-child(2) > .custom-box > .form-control').type(Password)
        cy.get(':nth-child(8) > :nth-child(3) > .custom-box > .form-control').type(Password)
        cy.get(':nth-child(2) > .lbl-accept > .ng-pristine').check()
        cy.get(':nth-child(3) > .lbl-accept > .ng-pristine').check()
        cy.get('.ng-invalid.ng-valid-pattern > :nth-child(3) > :nth-child(2)').contains('Preencha seu cpf corretamente')})

    it('Cadastro do Consumidor (Termo de Uso)', () => {

        const CPF = cy.faker.br.cpf();

        cy.visit('https://www.reclameaqui.com.br/cadastro/')
        cy.get('.col-md-offset-1 > .card > .box-form > .btn').click()
        cy.get(':nth-child(3) > :nth-child(2) > .custom-box').type(CPF)
        cy.get('#gender').click({ Force: true }).get('#ui-select-choices-row-0-0').contains('Feminino').click()
        cy.get('#state').click({ Force: true }).get('#ui-select-choices-row-1-4').contains('Bahia').click()
        cy.get('#city > .ui-select-match > .btn-default > .ui-select-placeholder').click({ force: true }).get('#ui-select-choices-row-2-0 > .ui-select-choices-row-inner > .ng-binding').contains('Salvador').click()
        cy.get(':nth-child(3) > .lbl-accept > .ng-pristine').check()
        cy.get(':nth-child(3) > .lbl-accept > .ng-dirty').uncheck()
        cy.get('.row.align-center > :nth-child(1)').contains('Voc?? precisa aceitar a nossa Pol??tica de Privacidade e os Termos de Uso para continuar')})

    it('Cadastro do Consumidor (Preencher com Facebook)', () => {

        const Telefone = cy.faker.phone.phoneNumber();
        const Birthday = "16/07/1989"
        const CPF = cy.faker.br.cpf();
        const Password = cy.faker.internet.password();

        cy.visit('https://www.reclameaqui.com.br/cadastro/')
        cy.get('.col-md-offset-1 > .card > .box-form > .btn').click()//cadastrar
        cy.get('.col-lg-6 > .btn').click()//cadastrar com facebook
        cy.wait(12000)
        cy.get(':nth-child(3) > :nth-child(2) > .custom-box').type(CPF)
        cy.get('.padding-line > :nth-child(3) > .custom-box').type(Telefone)
        cy.get(':nth-child(3) > .col-sm-12 > .custom-box > .form-control').type(Birthday)
        cy.get('#gender').click({ Force: true }).get('#ui-select-choices-row-0-0').contains('Feminino').click()
        cy.get('#state').click({ Force: true }).get('#ui-select-choices-row-1-4').contains('Bahia').click()
        cy.get('#city > .ui-select-match > .btn-default > .ui-select-placeholder').click({ force: true }).get('#ui-select-choices-row-2-0 > .ui-select-choices-row-inner > .ng-binding').contains('Salvador').click()
        cy.get(':nth-child(8) > :nth-child(2) > .custom-box > .form-control').type(Password)
        cy.get(':nth-child(8) > :nth-child(3) > .custom-box > .form-control').type(Password)
        cy.get(':nth-child(2) > .lbl-accept > .ng-pristine').check()
        cy.get(':nth-child(3) > .lbl-accept > .ng-pristine').check()
        cy.get('#btn-create-common-user').should('not.have.value','disabled')})

    it('Cadastro Pessoa Jur??dica', () => {
        const CNPJ = cy.faker.br.cnpj();

        cy.visit('https://www.reclameaqui.com.br/cadastro/')
        cy.get('.col-md-offset-2 > .card > .box-form > .btn').click()
        cy.get('.btn-full-blue').click()
        cy.get('.box-form > .ng-invalid > :nth-child(1) > .form-control').type(CNPJ)
        cy.get('.box-card').contains('Clique para confirmar que voc?? n??o ?? um rob??:')
        cy.get(':nth-child(3) > button.btn').should('have.text', 'Continuar')})

    it('Login na plataforma', () => {

        cy.visit('https://www.reclameaqui.com.br/')
        cy.get('.login-ra__account-text').click()
        cy.get('.primary-title').contains('Que bom que voc?? vai usar o Reclame AQUI :)')})

    it('Login Inv??lido', () => {

        const Username = cy.faker.internet.userName();
        const Password = cy.faker.internet.password();

        cy.visit('https://www.reclameaqui.com.br/')
        cy.get('.login-ra__account-text').click()
        cy.get('#username').type(Username)
        cy.get('#password').type(Password)
        cy.get('#kc-login').click({ Force: true })
        cy.wait(12000) //Fazer o recaptcha manualmente.
        cy.get('.alert').contains('Ops! Alguma informa????o incorreta.')})

    it('logout da plataforma', () => {

        cy.visit('https://www.reclameaqui.com.br')
        cy.get('.login-ra__account-text').click()
        cy.get('#username').type('lmarcanjo@hotmail.com')
        cy.get('#password').type('qwerty123')
        cy.get('#kc-login').click({ Force: true })
        cy.wait(15000) //Fazer o recaptcha manualmente.
        cy.get('.person_description > [style=""]').click()
        cy.get(':nth-child(2) > .link-user > .area-logged').click()
        cy.get('.main-sidebar > :nth-child(13) > a').click()})

    it('Nova Reclama????o na plataforma', () => {

        cy.visit('https://www.reclameaqui.com.br')
        cy.get('.login-ra__account-text').click()
        cy.get('#username').type('lmarcanjo@hotmail.com')
        cy.get('#password').type('qwerty123')
        cy.get('#kc-login').click({ Force: true })
        cy.wait(15000) //Fazer o recaptcha manualmente.
        cy.get('.person_description > [style=""]').click()
        cy.get(':nth-child(2) > .link-user > .area-logged').click()
        cy.get('#btn-complainFlow-userAccount').click()
        cy.get('.container > .big-title').contains('Encontre a empresa para reclamar')})

    it('Reclama????es (rascunho)', () => {

        const dados = { Username: 'lmarcanjo@hotmail.com', PassWord: 'qwerty123',};

        cy.login(dados);
        cy.get('#btn-complainFlow-userAccount').click()
        cy.get('.typeahead-search-blue').type('Teste123')
        cy.get('#btn-searchCompany-complain').click()
        cy.get('.ng-binding > b').click()
        cy.get('.col-md-3 > .brand-logo > .hidden-xs > img').click()})

    it('Reclama????es Sem T??tulo)', () => {
        
        const Texto = cy.faker.lorem.words();
        const dados = { Username: 'lmarcanjo@hotmail.com', PassWord: 'qwerty123', };

        cy.login(dados);
        cy.get('#btn-complainFlow-userAccount').click()
        cy.get('.typeahead-search-blue').type('Teste123')
        cy.get('#btn-searchCompany-complain').click()
        cy.get('.ng-binding > b').click()
        cy.get('#txt-complainFormDescription-complain').type(Texto)
        cy.get('.ng-invalid.ng-valid-mask > :nth-child(1)').contains('Ops! Parece que voc?? esqueceu do t??tulo.')})
    
    it('Reclama????es Sem Hist??ria)', () => {

        const Title = cy.faker.lorem.sentences();
        const dados = { Username: 'lmarcanjo@hotmail.com', PassWord: 'qwerty123',};

        cy.login(dados);
        cy.get('#btn-complainFlow-userAccount').click()
        cy.get('.typeahead-search-blue').type('Teste123')
        cy.get('#btn-searchCompany-complain').click()
        cy.get('.ng-binding > b').click()
        cy.get('#btn-complainFormCompanyTitleComplain-complain').type(Title)
        cy.get('.ng-valid-mask.ng-invalid > :nth-child(2)').click()
        cy.contains('Ops! Parece que voc?? esqueceu de contar sua hist??ria.')})

    it('Reclama????es na plataforma (Trocar de empresa)', () => {

        const dados = { Username: 'lmarcanjo@hotmail.com', PassWord: 'qwerty123',};

        cy.login(dados);
        cy.visit('https://www.reclameaqui.com.br/minha-conta/')
        cy.get('#btn-complainFlow-userAccount').click()
        cy.get('.typeahead-search-blue').type('Teste123')
        cy.get('#btn-searchCompany-complain').click()
        cy.get('.ng-binding > b').click()
        cy.get('#trocarEmpresaReclamada').click()
        cy.get('[ui-view=""] > .container').contains('Encontre a empresa para reclamar')})

    it('Cancelar uma reclama????o', () => {
       
        const dados = { Username: 'lmarcanjo@hotmail.com', PassWord: 'qwerty123',};

        cy.login(dados);
        cy.visit('https://www.reclameaqui.com.br/minha-conta/')
        cy.get('#btn-complainFlow-userAccount').click()
        cy.get('.user-role').click()
        cy.get('.dropdown-menu > :nth-child(1) > a').click()
        cy.get('.btn-disable-complaints-all.ng-scope > .disable-complaints').click({ force: true })
        cy.get('.mktpRelated-top > .disable').contains('Desativar')})})