
if(Meteor.isClient){
    var route="";
    var med_word="";
    var nexthop_word="";
    var local_pref_word="";
    var origin_word="";
    var as_path_word="";
    var community_word="";
    //On recuppere les champs du formulaire
  Template.addRoutes.events({
    'submit form': function ( event ) {
      event.preventDefault();
      var address = $( '[name="address"]' ).val();
      var nexthop = $('[name="nexthop"]').val();
      var med = $( '[name="med"]' ).val();
      var local_pref = $('[name="local_pref"]').val();
      var origin  = $('input[name=origin]:checked').val();//$( '[name="origin"]' ).val();
      var as_path = $('[name="as_path"]').val();
      var community = $( '[name="community"]' ).val();
      var user = Meteor.userId();
        console.log(address)

      if(address!==''){
          route="route";
      }
      if(nexthop!==''){
         nexthop_word="next-hop";
      }
        if(med!==''){
            med_word="med";
        }
        if(local_pref!==''){
            local_pref_word="local-preference";
        }
        if(origin!==''){
            origin_word="origin";
        }
        if(as_path!==''){
            as_path_word="as-path";
            as_path="["+as_path+"]";
        }
        if(community!==''){
            community_word="community";
            community="["+community+"]";
        }
//Envoyer seulement les attributs defini à exaBGP
        HTTP.call( 'POST', 'http://localhost:5001/', {

                data: {
                    "command" : "announce "+route+" "+address+" "+nexthop_word+" "+nexthop+" "+local_pref_word+" "+
                    local_pref+" "+origin_word+" "+origin+" "+as_path_word+" "+as_path+" "+community_word+" "+community
                }
            },
            function( error, response ) {
                if ( error ) {
                    console.log( error );
                } else {
                    if(response.data.error===false){

                    }
                    console.log( response)
                }

            }),
  //Envoyer HTTP requete à API
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
