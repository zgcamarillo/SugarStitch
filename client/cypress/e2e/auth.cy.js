describe('Auth Flow', () => {
  const testUser = {
    firstName: 'Cypress',
    lastName: 'Tester',
    age: '25',
    phoneNumber: '1234567890',
    email: `cypress${Date.now()}@test.com`,
    password: 'Password123!',
    expertise: 'beginner',
  }

  it('registers and then logs in successfully', () => {
    cy.visit('/register')

    cy.get('input[name="firstName"]').type(testUser.firstName)
    cy.get('input[name="lastName"]').type(testUser.lastName)
    cy.get('input[name="age"]').type(testUser.age)
    cy.get('input[name="phoneNumber"]').type(testUser.phoneNumber)
    cy.get('input[name="email"]').type(testUser.email)
    cy.get('input[name="password"]').type(testUser.password)
    cy.get('select[name="expertise"]').select(testUser.expertise)

    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click()
    })

    cy.contains(/registered|success|account created/i).should('exist')

    cy.visit('/login')

    cy.get('input[name="email"]').type(testUser.email)
    cy.get('input[name="password"]').type(testUser.password)

    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click()
    })

    cy.url().should('include', '/account')
  })
})