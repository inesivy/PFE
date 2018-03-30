
if (Meteor.isClient) {
  //Cettes methodes permettent de changer le mot de passe et l'email
Template.settings.events({
  'submit #change_password': function ( event ) {
    event.preventDefault();
    var old_password    = $( '[name="old_password"]' ).val();
    var  password = $('[name="password"]').val();
    Accounts.changePassword( old_password, password, ( error ) => {
        if ( error ) {
        console.log( error.reason );
        Materialize.toast(error.reason, 4000)
      }
      else{
        Materialize.toast('Password was changed!', 4000) // 4000 is the duration of the toast
        Router.go('/')
      }
   });
 },
 'submit #change_email': function ( event ) {
   event.preventDefault();
   var email    = $( '[name="email"]' ).val();
   if (email) {
  Meteor.call('updateEmail', email, error => {
    if (error){
      console.log(`Error updating email address: {error}`);
       Materialize.toast(error.reason, 4000)
    }
    else{
      Materialize.toast('Email was changed!', 4000) // 4000 is the duration of the toast
      Router.go('/')
    }
  });
}

 }


});


Template.settings.helpers({
   email: function(){
     var user=Meteor.user();
       return user.emails
   }

});
Template.settings.onRendered (function(){
  $("#settings").validate({
          rules: {
              email: {
                  required: true,
                  email:true
              },
              password: {
  				          required: true,
  				          minlength: 5
  			                 },
  			      cpassword: {
            				required: true,
            				minlength: 5,
            				equalTo: "#password"
            			},
                  old_password: {
                        required: true
                             }
              },
          //For custom messages
          messages: {
              password:{
                  required: "Enter a password",
                  minlength: "Enter at least 5 characters"
              },
              cpassword:{
                  required: "Confirm your password",
                  minlength: "Enter at least 5 characters"
              },
              old_password:{
                  required: "Enter a password",
                  minlength: "Enter at least 5 characters"
              }
          },
         errorElement : 'div',
         //On affiche les erreurs
          errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
              $(placement).append(error)
            } else {
              error.insertAfter(element);
            }
          },
       });
});
}
