/// <reference types="cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })

describe('Criando cenário de teste para o site da Amazon', ()=>{

    it('Caso de teste: busca aleatória não encontrada', () => {
        let busca = criarBusca()
        cy.visit('https://www.amazon.com.br/')
        cy.get('#twotabsearchtextbox').type(busca)
        cy.get('#nav-search-submit-button').click()
        cy.wait(1000)
        cy.get('.s-no-outline > :nth-child(1) > :nth-child(1)').should('contain.text', 'Nenhum resultado')
    })
    it('Caso de teste: Login com erro (email invalido)',() =>{
        let email = criarEmail ()
        cy.visit('https://www.amazon.com.br/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2F%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=brflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&')
        cy.get('#ap_email').type(email)
        cy.get('.a-button-inner > #continue').click()
        cy.wait(1000)
        cy.get('.a-alert-heading').should('contain.text', 'Houve um problema')
    })
    it('Caso de teste: Busca correta', () =>{
        cy.visit('https://www.amazon.com.br/')
        cy.get('#twotabsearchtextbox').type('Bola')
        cy.get('#nav-search-submit-button').click()
        cy.get('[data-asin="B07FQR1N2M"] > .sg-col-inner > .s-widget-container > [data-component-type="s-impression-logger"] > .s-featured-result-item > .s-card-container > .a-spacing-base > .s-product-image-container > .rush-component > .a-link-normal > .a-section > .s-image').click()
        cy.wait(1000)
        cy.get('#productTitle').should('contain.text', 'Bola')
    })
    it('Caso de teste: Login com erro (email invalido)',() =>{
        let email = criarEmail ()
        let senha = criarBusca ()
        cy.visit('https://www.amazon.com.br/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2F%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=brflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&')
        cy.get('#createAccountSubmit').click()
        cy.get('#ap_customer_name').type('Pedro')
        cy.get('#ap_email').type(email)
        cy.get('#ap_password').type(senha)
        cy.get('#ap_password_check').type(senha)
        cy.get('#continue').click()
        cy.wait(1000)
        cy.get('.a-spacing-small > h1').should('contain.text', 'Verificar o endereço de e-mail')
    })
    it('Caso de teste: Verificar se consegue recuperar sua senha de um email invalido',() =>{
        let email = criarEmail ()
        cy.visit('https://www.amazon.com.br/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2F%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=brflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&')
        cy.get('.a-expander-prompt').click()
        cy.get('#auth-fpp-link-bottom').click()
        cy.get('#ap_email').type(email)
        cy.get('#continue').click()
        cy.get('.a-alert-heading').should('contain.text','Houve um problema')
    })
    it('Caso de teste: Busca por categorias de alimentos e bebidas', () => {
        cy.visit('https://www.amazon.com.br/')
        cy.get('#nav-hamburger-menu').click()
        cy.wait(1000)
        cy.get('.hmenu-visible > :nth-child(15) > .hmenu-item').click()
        cy.wait(1000)
        cy.get('.hmenu-visible > :nth-child(3) > .hmenu-item').click()
        cy.wait(1000)
        cy.get('.a-list-item > .a-size-base').should('contain.text', 'Alimentos e Bebidas')
    })



})

function criarBusca(){
    let horas = new Date().getHours().toString()
    let minutes= new Date().getMinutes().toString()
    let seg = new Date().getSeconds().toString()
    let codigo = horas+minutes+seg+'id'

    return codigo
}
function criarEmail(){
    let horas = new Date().getHours().toString()
    let minutes= new Date().getMinutes().toString()
    let seg = new Date().getSeconds().toString()
    let email = 'p'+horas+minutes+seg+'@gmail.com'

    return email
}
