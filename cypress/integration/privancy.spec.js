describe('testa a pagina de privanciade',function(){
    beforeEach(() => {
        cy.visit('./src/privacy.html')
    })

    it('testa a página da política de privacidade de forma independente', function(){
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT')
            .should('be.visible')
        
    })

})