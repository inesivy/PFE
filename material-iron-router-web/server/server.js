
////////////////////////////////////////////////////////////////////
// Startup
//

  if(Meteor.isServer) {
     // When Meteor starts, create new collection in Mongo if not exists.
      Meteor.startup(function () {
          Routes = new Meteor.Collection('routes');
          ////////////////////////////////////////////////////////////////////
          // Creation 2 utilisateurs (administrateur et utilisateur normal)
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
              Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

              Roles.addUsersToRoles(id, userData.roles);

            });
          }

      });

  Meteor.methods({
  updateEmail(newAddress) {
    var userId = this.userId;
    if (userId) {
      var currentEmail = Meteor.users.findOne(userId).emails[0].address;
      Accounts.addEmail(userId, newAddress);
      Accounts.removeEmail(userId, currentEmail)
    }
    return;
  },
  inviteUser(email){
//Configuration pour pouvoir envoyer les emails
    smtp = {
    username: 'russkiypaladin@gmail.com',//identifiant de la boite email du serveur
    password: 'heckfyxbr23',//mot de passe de la boite email du serveur
    server: 'smtp.gmail.com',
    port: 587
    }
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    var password=Random.id(10);// On crée le mot de passe aleatoire pour un utilisateur
    id = Accounts.createUser({
      email: email,
      password: password,
      profile: { name: email }
    });
    // email verification
    Meteor.users.update({_id: id}, {$set:{'emails.0.verified': false}});
    Roles.addUsersToRoles(id, ['normal']);
    from=smtp.username;
    subject='Invitation pour Black Hole';
    address='http:localhost:3000';
    text="Vous pouvez vous connecter à l'adresse suivante: "+address+" avec le mot de passe suivant:"+password+" /n"+
     "Nous vous conseillons de changer votre mot de passe lors de votre première connexion.";
    Email.send({email,from , subject, text });
  }
});

}
