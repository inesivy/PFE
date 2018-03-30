Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'},
    }
});
//Configuration du routage pour les pages
Router.map(function() {
    this.route('home', {
        path: '/',

    });

    this.route('/users',{
	    name: 'users',
	    template: 'users',
	    onBeforeAction: function(){
             var user = Meteor.user();
	     if (!Roles.userIsInRole(user, ["admin"])) {
                Router.go('/forbidden');
               }
      else{
		            this.next();
        }
	   }
});
  this.route('/routes/', {
     name: 'routes',
     template: 'showRoutes'
  });
    this.route('/settings');
    this.route('/forbidden');
});

//Il faut etre connecté pour acceder à cettes pages
Router.plugin('ensureSignedIn', {
  only: ['users','routes','settings'],
});

//Configuration des routes pour le template de l'authentification et de connexion
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
