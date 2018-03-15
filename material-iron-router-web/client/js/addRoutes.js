if(Meteor.isClient){
  Template.addRoutes.events({
    'submit form': function ( event ) {
      event.preventDefault();
      var address = $( '[name="address"]' ).val();
      var nexthop = $('[name="nexthop"]').val();
      var med = $( '[name="med"]' ).val();
      var local_pref = $('[name="local_pref"]').val();
      var origin  = $( '[name="origin"]' ).val();
      var as_path = $('[name="as_path"]').val();
      var community = $( '[name="community"]' ).val();
      var user = Meteor.userId()
  		HTTP.call( 'POST', 'api/'+user, {

  			data: {
          address : address,
          path : as_path,
          next_hop : nexthop,
          community : community,
          origin : origin,
          local : local_pref,
          med : med
  	   }
     },
       function( error, response ) {
   			if ( error ) {
   				console.log( error );
   			} else {
          if(response.data.error===false){
            document.location.reload(true);
          }
   				console.log( response)
        }

   });
  }
  });

}