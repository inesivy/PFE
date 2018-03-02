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

    this.route('/manageUsers',{
	    name: 'manageUsers',
	    template: 'manageUsers',
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
  this.route('/showRoutes/', {
     name: 'showRoutes',
     template: 'showRoutes'
  });
  ///ADD routes
      this.route('/addRoutes',{
      //  where: 'server',
  	    name: 'addRoutes',
  	    template: 'addRoutes',
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
    this.route('/settings');
    this.route('/forbidden');
});
  //API
      Router.route('/routes', {
        where: 'server',
        //allowedRoles: ['']
      })
    .get(function(){
          var response = Routes.find().fetch();
          console.log(response)
          this.response.setHeader('Content-Type','application/json');
          this.response.end(JSON.stringify(response));
      })
      .post(function(){
         var response;
          if(this.request.body.address === undefined || this.request.body.path === undefined||
          this.request.body.community === undefined || this.request.body.next_hop === undefined||
          this.request.body.origin === undefined || this.request.body.local === undefined||
          this.request.body.med === undefined) {
              response = {
                  "error" : true,
                  "message" : "invalid data"
              };
          } else {
              Routes.insert({
                  Address : this.request.body.address,
                  Path : this.request.body.path,
                  NextHop : this.request.body.next_hop,
                  Community : this.request.body.community,
                  Origin : this.request.body.origin,
                  LocalPreference : this.request.body.local,
                  Med : this.request.body.med
              });
              response = {
                  "error" : false,
                  "message" : "Route added."
              }
          }
          this.response.setHeader('Content-Type','application/json');
          this.response.end(JSON.stringify(response));
      });



  ///delete and update Routes
  Router.route('/routes/:id', {
      //path: '/showRoutes/:id',
      where: 'server'
  })
  .delete(function(){
      var response;
          if(this.params.id !== undefined) {
              var data = Routes.find({_id : this.params.id}).fetch();
              if(data.length >  0) {
                  if(Routes.remove(data[0]._id) === 1) {
                      response = {
                          "error" : false,
                          "message" : "Route deleted."
                      }
                  } else {
                      response = {
                          "error" : true,
                          "message" : "Route not deleted."
                      }
                  }
              } else {
                  response = {
                      "error" : true,
                      "message" : "Route not found."
                  }
              }
          }
          this.response.setHeader('Content-Type','application/json');
          this.response.end(JSON.stringify(response));
  })
  .put(function(){
    var response;
       if(this.params.id !== undefined) {
           var data = Routes.find({_id : this.params.id}).fetch();
           if(data.length > 0) {
               if(Routes.update({_id : data[0]._id},{$set : {Address : this.request.body.address,Path : this.request.body.path,
               NextHop : this.request.body.next_hop,Community : this.request.body.community,Origin : this.request.body.origin,
               LocalPreference : this.request.body.local, Med : this.request.body.med }}) === 1) {
                   response = {
                       "error" : false,
                       "message" : "Route information updated."
                   }
               } else {
                   response = {
                       "error" : true,
                       "message" : "Route information not updated."
                   }
               }
           } else {
               response = {
                   "error" : true,
                   "message" : "Route not found."
               }
           }
       }
       this.response.setHeader('Content-Type','application/json');
       this.response.end(JSON.stringify(response));
  });


Router.plugin('ensureSignedIn', {
  only: ['manageUsers','showRoutes','addRoutes','settings'],
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
