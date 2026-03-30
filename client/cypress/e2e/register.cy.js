describe('Register Page', () => {
  it('loads the register form', () => {
    cy.visit('/register')

    cy.contains('REGISTER').should('exist')
    cy.get('input[name="firstName"]').should('exist')
    cy.get('input[name="lastName"]').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
  })

  it('allows typing into the register form', () => {
    cy.visit('/register')

    cy.get('input[name="firstName"]').type('Zee')
    cy.get('input[name="lastName"]').type('Tester')
    cy.get('input[name="age"]').type('25')
    cy.get('input[name="phoneNumber"]').type('1234567890')
    cy.get('input[name="email"]').type('zee@example.com')
    cy.get('input[name="password"]').type('password123')

    cy.get('input[name="firstName"]').should('have.value', 'Zee')
    cy.get('input[name="email"]').should('have.value', 'zee@example.com')
  })
})