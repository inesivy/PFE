
if(Meteor.isClient){
	var table;
	Template.add_button_routes.events({
		'click button': function(event){
			Modal.show('addRoutes')
		}
	});

  Template.showRoutes.onRendered(function(){
		var user = Meteor.userId()
		HTTP.call( 'GET', 'api/'+user, function( error, response ) {
			if ( error ) {
				console.log( error );
			} else {
				console.log( response.data)
				//Création de la DataTable pour afficher les routes
		       table=$('#showRoutes').DataTable({
						 //"bLengthChange": false, //used to hide the property
		          data : response.data,
							"oLanguage": {
			      "sStripClasses": "",
			      "sSearch": "",
			      "sSearchPlaceholder": "Enter Keywords Here",
			      "sInfo": "_START_ -_END_ of _TOTAL_",
			      "sLengthMenu": '<span>Rows per page:</span><select class="browser-default">' +
			        '<option value="10">10</option>' +
			        '<option value="20">20</option>' +
			        '<option value="30">30</option>' +
			        '<option value="40">40</option>' +
			        '<option value="50">50</option>' +
			        '<option value="-1">All</option>' +
			        '</select></div>'
			    },

						columns: [
							{ data: "Address" },
							{ data: "Path" },
							{ data: "NextHop" },
							{ data: "Origin" },
							{ data: "Community" },
							{ data: "LocalPreference" },
							{ data: "Med" },
              { data: "CreatedAt" }
						]

		      }),
					$('#showRoutes tbody').on( 'click', 'tr', function () {
			 if ( $(this).hasClass('selected') ) {
					 $(this).removeClass('selected');
			 }
			 else {
					 table.$('tr.selected').removeClass('selected');
					 $(this).addClass('selected');
			 }
	 } ),
	 //On verifie qu'on a bien selectionné la route pour la modifier
	 $('#edit_button_routes').on( 'click', function () {
     console.log("okok")
		 var selectedRoute = table.row('.selected').data();
		 console.log(selectedRoute)
		 if(selectedRoute==undefined){
					alert("Choisissez une route");
		 }
		 else{
			 Modal.show('editRoutes')
		 }

} ),
//On verifie qu'on a bien selectionné la route pour la supprimer
		$('#delete_button_routes').on( 'click', function () {
			var selectedRoute = table.row('.selected').data();
 		 console.log(selectedRoute)
 		 if(selectedRoute==undefined){
 					alert("Choisissez une route");
 		 }
		 else{
			 if(confirm("Voulez-vous vraiment supprimer cette route?")) {
 			var selectedRouteId = table.row('.selected').data()._id;
 			var user = Meteor.userId();
 		 HTTP.call( 'DELETE', 'api/'+user+'/'+selectedRouteId, function( error, response ) {
 			 if ( error ) {
 				 console.log( error );
 			 } else {
 				 if(response.data.error===false){
 					 table.row('.selected').remove().draw( false );
 				 }
 				 console.log( response );
 			 }
 			});
 		 }
		 }
	 }),
	 //Cette  methode permet de mettre à jour la route apres avoir validé le formulaire
	Template.editRoutes.events({
		'submit form': function ( event ) {
			event.preventDefault();
			var address    = $( '[name="address"]' ).val();
			var nexthop = $('[name="nexthop"]').val();
			var med  = $( '[name="med"]').val();
			var local_pref = $('[name="local_pref"]').val();
			var origin    = $('input[name=origin]:checked').val();//$('[name="origin"]' ).val();
			var as_path = $('[name="as_path"]').val();
			var community = $('[name="community"]' ).val();
			var user = Meteor.userId();
			var selectedRouteId = table.row('.selected').data()._id;
			HTTP.call( 'PUT', 'api/'+user+'/'+selectedRouteId, {

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

	 })

 }

}),
//Cette methode permet de recupperer la route selectionnée dans le formulaire afin de la modifier
	Template.editRoutes.helpers({
			 address: function(){
				 console.log(table.row('.selected').data());
					 return table.row('.selected').data().Address
			 },
			 nexthop: function(){
					 return table.row('.selected').data().NextHop
			 },
			 med: function(){
				 return table.row('.selected').data().Med
			 },
			 local_pref: function(){
				 return table.row('.selected').data().LocalPreference
			 },
			 origin: function(){
				 return table.row('.selected').data().Origin
			 },
			 as_path: function(){
				 return table.row('.selected').data().Path
			 },
			 community: function(){
				return table.row('.selected').data().Community
			 }
	});


			}
		});


  });

}
