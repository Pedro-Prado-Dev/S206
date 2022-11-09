/// <reference types="cypress"/>

describe('Criando cenário de teste para o site global sqa', ()=> {

  it('Caso de teste: Registrando um usúario no site com sucesso', ()=>{
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('Inatel')
    cy.get('#Text1').type('Inatel')
    cy.get('#username').type('Inatel')
    cy.get('#password').type('Inatel')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful')

  })

  it('Caso de teste: Registrando um usúario no site com falha (faltando senha)', ()=>{
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
    cy.get('#firstName').type('Inatel')
    cy.get('#Text1').type('Inatel')
    cy.get('#username').type('Inatel')
    cy.get('#password').type('Inatel')
    cy.get('#password').clear()
    cy.get('.has-error > .help-block').should('have.text', 'Password is required')
    cy.get('.btn-primary').should('be.disabled')
  })

  it('Realizando login com sucesso', ()=>{
    
    let info = criarUsuario()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])
  })

  it('Deletando um usuário com sucesso', ()=>{
    
    let info = criarUsuario()
    cy.login(info[0],info[1])
    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    cy.login(info[0],info[1])
    cy.get('.ng-binding').should('have.text', 'Username or password is incorrect')
  })

})

function criarUsuario(){
  let horas = new Date().getHours().toString()
  let minutes= new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let user = horas+minutes+seg+'id'
  let senha = horas+minutes+seg+'senha'
  let userInfo = [user,senha]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return userInfo
}