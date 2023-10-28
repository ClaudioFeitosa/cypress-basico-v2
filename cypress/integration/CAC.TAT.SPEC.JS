///<reference types="Cypress"/>
describe('Central de atendimento ao cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('01 -verifica o titulo da aplicação', function() {        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('02 - preenche dos campos obrigatorios e envia o formulario', function() {
        cy.get('#firstName').type('Claudio')
        cy.get('#lastName').type('Feitosa')
        cy.get('#email').type('claudio.cpf.cpf@gmail.com')
        cy.get('#open-text-area').type('texto')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })


    it('03 preenche dos campos obrigatorios e envia o formulario log text', function() {
        const   longText = "Sign in. Use your Google Account. Email or phone. Forgot email? CAPTCHA image of text used to distinguish humans from robots ... Sign in Use your Google Account."
        cy.get('#firstName').type('Claudio')
        cy.get('#lastName').type('Feitosa')
        cy.get('#email').type('claudio.cpf.cpf@gmail.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('04 exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        const   longText = "Forgot email? CAPTCHA"
        cy.get('#firstName').type('Claudio')
        cy.get('#lastName').type('Feitosa')
        cy.get('#email').type('claudio.cpf.cpf.gmail.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('05 Campo telefone vazio quando preechido com valor não numerico', function() {
        const   longText = "Forgot email? CAPTCHA"
        cy.get('#firstName').type('Claudio')
        cy.get('#lastName').type('Feitosa')
        cy.get('#email').type('claudio.cpf.cpf@gmail.com')
        cy.get('#phone')
            .type('teste')
            .should('have.value', '')
        //cy.get('#open-text-area').type(longText, {delay:0})
    })

    it('06 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const   longText = "Forgot email? CAPTCHA"
        cy.get('#firstName').type('Claudio')
        cy.get('#lastName').type('Feitosa')
        cy.get('#email').type('claudio.cpf.cpf@gmail.com')
        cy.get('#phone')
            .type('teste')
            .should('have.value', '')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('07 preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        
        cy.get('#firstName')
            .type('Claudio')
            .should('have.value','Claudio')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Feitosa')
            .should('have.value','Feitosa')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('claudio.cpf.cpf@gmail.com')
            .should('have.value','claudio.cpf.cpf@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type(11111222)
            .should('have.value',11111222)
            .clear()
            .should('have.value', '')   
    })

    it('08 exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('09 - Comandos costumizados - envia formulario com sucesso com comandos', function() {
        cy.nomeDoComandoCustomizado()     
        
        cy.get('.success').should('be.visible')
    })

    it('10- seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
          .select('youtube')
          .should('have.value', 'youtube')
    })

    it('11- seleciona um produto (mentoria) por seu velue', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('12- seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
          .select(1)
          .should('have.value','blog')
    })
    it('13-marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type = "radio"][value="feedback"]')
          .check()
          .should('have.value','feedback')
    })
    it('14 -marca cada tipo de atendimento - ajuda', function(){
        cy.get('input[type = "radio"]')
            .should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

            .check()
            .should('be.checked')
    })

    it('15 marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type = "checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('16 seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('17 seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json',{action: 'drag-drop'})
            .should(function($input){
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('18 seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function($input){
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('19 verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
       cy.get('#privacy a').should('have.attr','target','_blank') 
    })
    it('20 - acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            //.should('be.visible', "Talking About Testing")
        cy.contains('Talking About Testing').should('be.visible')
     })

     it('21 - testa a página da política de privacidade de forma independente', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            //.should('be.visible', "Talking About Testing")
        cy.contains('Talking About Testing').should('be.visible')
     })
 

})