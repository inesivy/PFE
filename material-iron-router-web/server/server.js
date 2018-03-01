
////////////////////////////////////////////////////////////////////
// Startup
//

  if(Meteor.isServer) {
     // When Meteor starts, create new collection in Mongo if not exists.
      Meteor.startup(function () {
          Routes = new Meteor.Collection('routes');
          ////////////////////////////////////////////////////////////////////
          // Create Test Users
          //
          if (Meteor.users.find().fetch().length === 1) {

            console.log('Creating users: ');

            var users = [
                {name:"Normal User",email:"normal@example.com",roles:['normal']},
                {name:"Admin User",email:"admin@example.com",roles:['admin']}
              ];

            _.each(users, function (userData) {
              var id,
                  user;

              console.log(userData);

              id = Accounts.createUser({
                email: userData.email,
                password: "user",
                profile: { name: userData.name }
              });

              // email verification
              Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

              Roles.addUsersToRoles(id, userData.roles);

            });
          }

      });
      // GET /user - returns every message from MongoDB collection.

      Router.route('/users',{where: 'server'})
          .get(function(){
              var response = User.find().fetch();
              this.response.setHeader('Content-Type','application/json');
              this.response.end(JSON.stringify(response));
          })

        // POST /message - {message as post data}
        // Add new message in MongoDB collection.

          .post(function(){
              var response;
              if(this.request.body.userName === undefined || this.request.body.userPassword === undefined) {
                  response = {
                      "error" : true,
                      "message" : "invalid data"
                  };
              } else {
                  User.insert({
                      UserName : this.request.body.userName,
                      UserPassword : this.request.body.userPassword
                  });
                  response = {
                      "error" : false,
                      "message" : "User added."
                  }
              }
              this.response.setHeader('Content-Type','application/json');
              this.response.end(JSON.stringify(response));
          });

      Router.route('/users/:id',{where: 'server'})

          // GET /message/:id - returns specific records

          .get(function(){
              var response;
              if(this.params.id !== undefined) {
                  var data = User.find({_id : this.params.id}).fetch();
                  if(data.length > 0) {
                      response = data
                  } else {
                      response = {
                          "error" : true,
                          "message" : "User not found."
                      }
                  }
              }
              this.response.setHeader('Content-Type','application/json');
              this.response.end(JSON.stringify(response));
          })

          // PUT /message/:id {message as put data}- update specific records.

          .put(function(){
              var response;
              if(this.params.id !== undefined) {
                  var data = User.find({_id : this.params.id}).fetch();
                  if(data.length > 0) {
                      if(User.update({_id : data[0]._id},{$set : {UserName : this.request.body.userName,UserPassword : this.request.body.userPassword}}) === 1) {
                          response = {
                              "error" : false,
                              "message" : "User information updated."
                          }
                      } else {
                          response = {
                              "error" : true,
                              "message" : "User information not updated."
                          }
                      }
                  } else {
                      response = {
                          "error" : true,
                          "message" : "User not found."
                      }
                  }
              }
              this.response.setHeader('Content-Type','application/json');
              this.response.end(JSON.stringify(response));
          })

          // DELETE /message/:id delete specific record.

          .delete(function(){
              var response;
              if(this.params.id !== undefined) {
                  var data = User.find({_id : this.params.id}).fetch();
                  if(data.length >  0) {
                      if(User.remove(data[0]._id) === 1) {
                          response = {
                              "error" : false,
                              "message" : "User deleted."
                          }
                      } else {
                          response = {
                              "error" : true,
                              "message" : "User not deleted."
                          }
                      }
                  } else {
                      response = {
                          "error" : true,
                          "message" : "User not found."
                      }
                  }
              }
              this.response.setHeader('Content-Type','application/json');
              this.response.end(JSON.stringify(response));
          });





  ////////////////////////////////////////////////////////////////////
  // Prevent non-authorized users from creating new users
  //

  Accounts.validateNewUser(function (user) {
    var loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['admin'])) {
      return true;
    }

    throw new Meteor.Error(403, "Not authorized to create new users");
  });
}



////////////////////////////////////////////////////////////////////
// Publish
//


// Authorized users can view routes
Meteor.publish("showRoutes", function () {
  var user = Meteor.users.findOne({_id:this.userId});

  if (Roles.userIsInRole(user, ["admin","normal"])) {
    console.log('publishing routes', this.userId)
    return Meteor.routes.find();
  }

  this.stop();
  return;
});
// Authorized users can view settings
Meteor.publish("settings", function () {
  var user = Meteor.users.findOne({_id:this.userId});

  if (Roles.userIsInRole(user, ["admin","normal"])) {
    console.log('publishing settings', this.userId)
    return user;
  }

  this.stop();
  return;
});
// Authorized admins can manage user accounts
Meteor.publish("addRoutes", function () {
  var user = Meteor.users.findOne({_id:this.userId});

  if (!Roles.userIsInRole(user, ["admin"])) {
    console.log('missing permissions', this.userId)
    throw new Meteor.Error(403, "Access denied")
  }
  this.stop();
  return;
});
// Authorized admins can manage user accounts
Meteor.publish("manageUsers", function () {
  var user = Meteor.users.findOne({_id:this.userId});

  if (Roles.userIsInRole(user, ["admin"])) {
    console.log('publishing users', this.userId)
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1}});
  }
  this.stop();
  return;
});
