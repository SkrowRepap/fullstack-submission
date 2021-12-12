import { string } from "prop-types"

describe('Blog App', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cjay',
      username: 'Cjay',
      password: 'Cjay123'
    }
    cy.request('POST', 'http://localhost:3003/api/user/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function(){
    cy.contains('Log in')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Cjay')
      cy.get('#password').type('Cjay123')
      cy.get('#loginButton').click()

      cy.contains('Hi!')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('test')
      cy.get('#password').type('test123')
      cy.get('#loginButton').click()

      cy.get('.error').should('contain', 'Invalid' )
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function(){
    beforeEach(function() {
      const account = {
        username: 'Cjay',
        password: 'Cjay123'
      }
      cy.login(account)
      cy.createBlog({
        title: 'React App',
        author: 'React Faith',
        url: 'react.com',
        like: 2
      })
      cy.createBlog({
        title: 'React App 2',
        author: 'React Faith',
        url: 'react.com',
        like: 3
      })
      cy.createBlog({
        title: 'Sorted',
        author: 'Sorted App',
        url: 'sorted-app.com',
        like: 1
      })
    })

    it('A blog can be created!', function() {
      cy.get('.show-button').click()
      cy.contains('Create Blog')

      cy.get('#title').type('test1')
      cy.get('#author').type('Test1 Name')
      cy.get('#url').type('test1.com')
      cy.get('.submit-button').click().wait(1000)

      cy.get('.defaultDisplay').contains('test1')
    })
    describe('User can:', function() {

      it('like a blog', function () {
        cy.get('.view-button').contains('View').click()
        cy.contains('Author: Test1 Name')

        cy.get('#likes-count').then(($span) => {
          // capture what num is right now
          const num1 = parseFloat($span.text())

          cy.get('#like-button')
            .click()
            .wait(500)
            .click()
            .wait(500)
            .then(() => {
              // now capture it again
              const num2 = parseFloat($span.text())

              // make sure it's what we expected
              expect(num2).to.eq(num1 + 2)
            })
        })
      })

      it('deletes a blog', function(){
        cy.wait(1000)
        cy.get('.test1-default-display').contains('View').click().wait(1000)
        cy.on('window:confirm', (str) => {
          expect(str).to.eq('Remove blog test1 by Test1 Name?')
        })

        cy.get('.test1-shown').contains('Remove').click()
        cy.get('.displayDefault').should('not.have', 'test1')
      })

      it.only('sort the blog', function() {
        cy.get('.likes-container').then($element => {
          let strings = $element.text().split('Likes: ').map(str => parseInt(str.replace(/^\s+|\s+$/gm, '')))
          strings.shift()
          expect(strings).to.deep.equal(strings.sort((a,b) => b-a))
        })
        cy.get('#Sorted-default-display').within(() => {
          cy.get('[data-cy=view-button]').click()
        })
        cy.get('.Sorted-shown').within(() => {
          cy.get('[data-cy=like-button]')
            .click().wait(500)
            .click().wait(500)
            .click().wait(500)
            .click().wait(500)
            .click().wait(500)
        })
        cy.get('.likes-container').then($element => {
          let strings = $element.text().split('Likes: ').map(str => parseInt(str.replace(/^\s+|\s+$/gm, '')))
          strings.shift()
          expect(strings).to.deep.equal(strings.sort((a, b) => b - a))
        })
      })
    })
  })

})