Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'},
    }
});

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
               // console.log(user)
                Router.go('/forbidden');
               }
      else{
		            this.next();
        }
	   }
});
  /////SHow routes
  this.route('/routes/', {
     name: 'routes',
     template: 'showRoutes'
  });
    this.route('/settings');
    this.route('/forbidden');
});


Router.plugin('ensureSignedIn', {
  only: ['users','routes','settings'],
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
