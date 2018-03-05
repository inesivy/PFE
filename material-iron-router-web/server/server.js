
////////////////////////////////////////////////////////////////////
// Startup
//

  if(Meteor.isServer) {
     // When Meteor starts, create new collection in Mongo if not exists.
      Meteor.startup(function () {
          var Routes = new Meteor.Collection('routes');
          ////////////////////////////////////////////////////////////////////
          // Create Test Users
          //
          if (Meteor.users.find().fetch().length === 0) {

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
              Meteor.users.update({_id: id}, { $set: {'emails.0.verified': true } });

              Roles.addUsersToRoles(id, userData.roles);

            });
          }

      });
    

  ////////////////////////////////////////////////////////////////////
  // Prevent non-authorized users from creating new users
  //

  Accounts.validateNewUser(function (user) {
    return true;
    /*
    var loggedInUser = user;
    if (Roles.userIsInRole(loggedInUser, ['admin'])) {
      return true;
    }

    throw new Meteor.Error(403, "Not authorized to create new users");
    */
  });
}



////////////////////////////////////////////////////////////////////
// Publish
//


// Authorized users can view routes
Meteor.publish("showRoutes", function () {
  var user = Meteor.users.findOne({ _id: this.userId });

  if (Roles.userIsInRole(user, ["admin","normal"])) {
    console.log('publishing routes', this.userId);
    return Meteor.routes.find();
  }

  this.stop();
});
// Authorized users can view settings
Meteor.publish("settings", function () {
  var user = Meteor.users.findOne({_id:this.userId});

  if (Roles.userIsInRole(user, ["admin","normal"])) {
    console.log('publishing settings', this.userId)
    return user;
  }

  this.stop();
});
// Authorized admins can manage user accounts
Meteor.publish("addRoutes", function () {
  var user = Meteor.users.findOne({_id:this.userId});

  if (!Roles.userIsInRole(user, ["admin"])) {
    console.log('missing permissions', this.userId)
    throw new Meteor.Error(403, "Access denied")
  }
  this.stop();
});
// Authorized admins can manage user accounts
Meteor.publish("manageUsers", function () {
  var user = Meteor.users.findOne({_id:this.userId});

  if (Roles.userIsInRole(user, ["admin"])) {
    console.log('publishing users', this.userId)
    return Meteor.users.find({}, { fields: { emails: 1, profile: 1, roles: 1 }});
  }
  this.stop();
});
