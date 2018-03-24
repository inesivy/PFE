module.exports = {
  'Demo tests PFE' : function (browser) {
      let selectID = '//select[@id="at-nav-button"]'
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('html', 1000)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.container > h1', 'Bienvenue sur CR-exaBGP')
      .assert.containsText('.container > p', 'Gérer votre réseau devient facile.')
      .click('a#at-nav-button')
      .setValue('input.validate', 'admin@example.com')
      .setValue('input.validate#at-field-password', 'user')
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
      .end();
  }
};









