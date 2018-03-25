module.exports = {
  'Identification' : function (browser) {
    browser
      //Go to CR-exaBGP website
      .url('http://localhost:3000/')

      //checks if javascript is set up correctly
      .waitForElementVisible('html', 1000)
      .waitForElementVisible('body', 1000)
      
      .assert.containsText('.container > h1', 'Bienvenue sur CR-exaBGP')
      .assert.containsText('.container > p', 'Gérer votre réseau devient facile.')

      //checks if access is not allowed without authentication
      .assert.elementNotPresent(".mdi-alert-warning")
      .click('a[href="/routes"]')
      .assert.urlEquals('http://localhost:3000/routes')
      .assert.containsText('.at-title', 'Se connecter')
      .assert.elementPresent(".mdi-alert-warning")
      .assert.containsText('span', 'Vous devez être connecté')

      //checks the identification for the admin
      //with the wrong address
      .setValue('input.validate#at-field-email', 'admin@example.coms')
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')
      .assert.containsText('span', 'Votre identifiant ou votre mot de passe est incorrect')

      //with a wrong password
      //.assert.elementNotPresent(".container")
      .click('.brand-logo')
      .assert.containsText('.container > h1', 'Bienvenue sur CR-exaBGP')
      .assert.elementNotPresent(".at-title")
      .click('a#at-nav-button')
      .assert.elementPresent(".at-title")
      .assert.urlEquals('http://localhost:3000/sign-in')
      .assert.containsText('.at-title', 'Se connecter')
      .setValue('input.validate#at-field-email', 'admin@example.com')
      .setValue('input.validate#at-field-password', 'User')
      .click('button#at-btn')
      .assert.containsText('span', 'Votre identifiant ou votre mot de passe est incorrect')
      .clearValue('input.validate#at-field-password')
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')
      .assert.elementNotPresent(".mdi-alert-warning")
  },

'Add a route' : function (browser) {
    browser

}
      /*
      //.assert.title("Se connecter")
      .assert.elementNotPresent(".mdi-alert-warning")
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')
      .pause(1000)
      .assert.elementPresent(".mdi-alert-warning")
      .pause(1000)
      //browser.expect.element('.mdi-alert-warning').to.not.be.present;
      .setValue('input.validate', 'admin@example.com')
      //.setValue('input.validate#at-field-password', 'user')
//mdi-alert-warning
      //.useXpath()
      //.click(selectID)
      .click('button#at-btn')
      .pause(1000)
      //.useCss()
      .click('a[href="/routes"]')
      .assert.containsText('.center', 'Affichage des routes')
      .click('.btn-floating[data-modal="signIn"]')
      //.click('button#edit_button_routes')
      .pause(2000)
      .setValue('input.validate#address', '192.168.10.1')
      .setValue('input.validate#nexthop', '192.168.0.1')
      .click('input.validate#med')
      .setValue('input.validate#med', '5')
      .setValue('input.validate#local_pref', '2')
      //.setValue('input.validate#origin', '192.168.0.1')
      .click('button.btn')
      .pause(1000)
//cliquer sur ok
      .click('.sorting_1')
      .click('button#delete_button_routes')
      .pause(500)
      .acceptAlert()
      //.waitForElementVisible('selector')
      //.click('selector')
      //.click('@driver.switch_to.alert.accept')
      .pause(5000)
      //.end();*/


  /*'aa' : function (browser) {
    browser
      //Go to CR-exaBGP website
      .url('http://localhost:3000/')
      .waitForElementVisible('html', 1000)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.container > h1', 'Bienvenue sur CR-exaBGP')
      .assert.containsText('.container > p', 'Gérer votre réseau devient facile.')
  },*/

  after: (browser) => {
        browser.end();
    }
};









