import assert from 'assert'

class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    urlInput: () => cy.get('#imageUrl'),
    titleFeedback: () => cy.get('#titleFeedback'),
    urlFeedback: () => cy.get('#urlFeedback'),
    btnSubmit: () => cy.get('#btnSubmit')
  }

  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text)
  }

  typeUrl(text) {
    if (!text) return;
    this.elements.urlInput().type(text)
  }
  clickSubmit() {
    this.elements.btnSubmit().click()
  }
}
const registerForm = new RegisterForm()
const colors = {
  erros: 'rgb(220, 53, 69)',
  success: ''
}


describe('Image Registration', () => {
  describe('Submitting an image with invalid inputs', () => {
    //serve p 1 teste nao sujar o outro
    after(() => {
      cy.clearAllLocalStorage()
    });
    //Criar classes
    const input = {
      title: '',
      url: ''
    }
    it('I am on the image registration page', () => {
      cy.visit('/')
    })

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title)
    })
    it(`Then I enter "${input.url}" in the title field`, () => {
      registerForm.typeUrl(input.url)

    })
    it(`Then I click the submit button`, () => {
      registerForm.clickSubmit()
    })
    it(`Then I should see "Please type a title for the image" message above the title field`, () => {
      registerForm.elements.titleFeedback().should('contains.text', 'Please type a title for the image')
      //p debuggar
      //registerForm.elements.titleFeedback().should(elements => { debugger})
    })
    it(`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
      registerForm.elements.urlFeedback().should('contains.text', 'Please type a valid URL')

    })
    it(`And I should see an exclamation icon in the title and URL fields`, () => {
      //debuggar um elemento especifico
      //registerForm.elements.titleInput().should(([element]) => {debugger})
      /*verificar o que tem de CSS
      registerForm.elements.titleInput().should(([element]) => {
        const styles = window.getComputedStyle(element)
        const boder = styles.getPropertyValue('border-right-color')
        debugger})*/

      registerForm.elements.titleInput().should(([element]) => {
        const styles = window.getComputedStyle(element)
        const border = styles.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.erros)

      })

    })
  })
})