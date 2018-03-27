
module.exports = {

/////// TEST IDENTIFICATION ////////////////////

  'Identification' : function (browser) {
      
    browser
      .url('http://localhost:3000/')

      //checks if javascript is set up correctly
      .waitForElementVisible('html', 1000)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.container > h1', 'Bienvenue sur CR-exaBGP')
      .assert.containsText('.container > p', 'Gérer votre réseau devient facile.')
      
      //checks if access is not allowed without authentication//
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
      .pause(1000)
      .assert.containsText('span', 'Votre identifiant ou votre mot de passe est incorrect')
      .clearValue('input.validate#at-field-password')
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')
      .assert.elementNotPresent(".mdi-alert-warning")
      .click('a#at-nav-button')

      //checks the identification for the user
       //with the wrong address    
      .click('a#at-nav-button.waves-effect.waves-light.btn')
      .click('a#at-nav-button.waves-effect.waves-light.btn')
      .assert.containsText('h3.header', 'Se connecter')
      .setValue('input#at-field-email.validate', 'normal@example.coms')
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')

       //with a wrong password
      .click('.brand-logo')
      .assert.containsText('.container > h1', 'Bienvenue sur CR-exaBGP')
      .assert.elementNotPresent(".at-title")
      .click('a#at-nav-button')
      .assert.elementPresent(".at-title")
      .assert.urlEquals('http://localhost:3000/sign-in')
      .assert.containsText('.at-title', 'Se connecter')
      .setValue('input.validate#at-field-email', 'normal@example.com')
      .setValue('input.validate#at-field-password', 'User')
      .click('button#at-btn')
      .clearValue('input.validate#at-field-password')
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')
      .assert.elementNotPresent(".mdi-alert-warning")
      .click('button#at-btn')
},

/////// TEST ADD AND DELETE A ROUTE ////////////////////

  'Add and delete a route' : function (browser) {
    browser
      .url('http://localhost:3000/')
      .click('a#at-nav-button')
      .waitForElementVisible('html', 1000)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.header', 'Se connecter')

      .setValue('input.validate', 'normal@example.com')
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')
      .pause(1000)
      .click('a[href="/routes"]')
      .pause(2000)
      .assert.urlEquals('http://localhost:3000/routes')
      .assert.containsText('h1.center', 'Affichage des routes')
     //Checks if a normal user can't add a route
      .assert.elementNotPresent('.btn-floating[data-modal="signIn"]')
     //Checks if a normal user can't delete a route
      .assert.elementNotPresent('button#delete_button_routes')
      .click('a#at-nav-button')
      .pause(1000)

      //Checks if an admin can add a route
      .click('a#at-nav-button')
      .assert.urlEquals('http://localhost:3000/sign-in')
      .setValue('input.validate#at-field-email', 'admin@example.com')
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')
      .pause(1000)
      .click('a[href="/routes"]')
      .pause(2000)
      .assert.containsText('.center', 'Affichage des routes')
      .assert.urlEquals('http://localhost:3000/routes')
      .assert.elementPresent(".dataTables_empty")
      .assert.elementNotPresent("td.sorting_1")
      .click('.btn-floating[data-modal="signIn"]')
      .pause(2000)
      .setValue('input.validate#address', '192.168.10.0/24')
      .setValue('input.validate#nexthop', '192.168.0.1')
      .click('input.validate#med')
      .setValue('input.validate#med', '5')
      .setValue('input.validate#local_pref', '2')
      .click('input#igp')
      .click('button.btn')
      .pause(1000)
      .refresh()
      //.assert.elementPresent("td.sorting_1")
      .assert.containsText('.sorting_1', '192.168.10.0/24')

      //Checks if an admin can delete a route
      .click('td.sorting_1')
      .assert.elementPresent('button#delete_button_routes')
      .click('button#delete_button_routes')
      .acceptAlert()
      .pause(5000)
      .refresh()
      .assert.elementNotPresent('.sorting_1', '192.168.10.0/24')
      .click('a#at-nav-button')
},

 'Modify a route' : function (browser) {
    browser
      .url('http://localhost:3000/')
      .click('a#at-nav-button')
      .waitForElementVisible('html', 1000)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.header', 'Se connecter')

      .setValue('input.validate', 'normal@example.com')
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')
      .pause(1000)
      .click('a[href="/routes"]')
      .pause(2000)
      .assert.urlEquals('http://localhost:3000/routes')
      .assert.containsText('h1.center', 'Affichage des routes')

     //Checks if a normal user can't modify a route
      .assert.elementNotPresent('button#edit_button_routes')
      .click('a#at-nav-button')
      .pause(1000)

      //Checks if an admin can modify a route
      .click('a#at-nav-button')
      .assert.urlEquals('http://localhost:3000/sign-in')
      .setValue('input.validate#at-field-email', 'admin@example.com')
      .setValue('input.validate#at-field-password', 'user')
      .click('button#at-btn')
      .pause(1000)
      .click('a[href="/routes"]')
      .pause(2000)
      .assert.containsText('.center', 'Affichage des routes')
      .assert.urlEquals('http://localhost:3000/routes')
      .click('.btn-floating[data-modal="signIn"]')
      .pause(2000)
      .setValue('input.validate#address', '192.168.10.0/24')
      .setValue('input.validate#nexthop', '192.168.0.1')
      .click('input.validate#med')
      .setValue('input.validate#med', '5')
      .setValue('input.validate#local_pref', '2')
      .click('input#igp')
      .click('button.btn')
      .pause(1000)
      .refresh()
      .assert.containsText('.sorting_1', '192.168.10.0/24')
      .click('td.sorting_1')
      .assert.elementPresent('button#edit_button_routes')
      .click('button#edit_button_routes')
      .pause('2000')
      .clearValue('input.validate#address')
      .pause(2000)
      .setValue('input.validate#address', '192.168.20.0/24')
      .click('button.btn')
      .refresh()
      .assert.containsText('tr.odd td.sorting_1', '192.168.20.0/24')

      .click('td.sorting_1')
      .click('button#delete_button_routes')
      .acceptAlert()
      .refresh()
  },


  after: (browser) => {
        browser.end();
    }
};









