if (Meteor.isClient) {
  Template.users.events({
   'submit #invite': function ( event ) {
     event.preventDefault();
     var email    = $( '[name="email"]' ).val();
     if (email) {
    Meteor.call('inviteUser', email, error => {
      if (error){
        console.log(`Error inviting user: {error}`);
         Materialize.toast(error.reason, 4000)
      }
      else{
        Materialize.toast('User was invited!', 4000) // 4000 is the duration of the toast
        Router.go('/')
      }
    });
  }

   }

  });
}
