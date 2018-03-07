//import { $ } from 'meteor/jquery';
//import dataTablesBootstrap from 'datatables.net-bs';
//import 'datatables.net-bs/css/dataTables.bootstrap.css';
//dataTablesBootstrap(window, $);
//dataTablesBootstrap(window, $);
//dataTablesBootstrap(window, $);
//import Tabular from 'meteor/aldeed:tabular';
//import { Template } from 'meteor/templating';
//import moment from 'moment';
//import { Meteor } from 'meteor/meteor';
//import { Books } from './collections/Books';
//import { Books } from './collections/Books';
//new Tabular.Table({
//  name: "Books",
//  collection: Books,
//  columns: [
//    {data: "title", title: "Title"},
//    {data: "author", title: "Author"},
//    {data: "copies", title: "Copies Available"},
//    {
//      data: "lastCheckedOut",
//      title: "Last Checkout",
//      render: function (val, type, doc) {
//        if (val instanceof Date) {
//          return moment(val).calendar();
//        } else {
//          return "Never";
//        }
//      }
//    },
//    {data: "summarytitle: "Summary"},
//    {
//      tmpl: Meteor.isClient && Template.bookCheckOutCell
//    }
//  ]
//  <link rel="stylesheet" type="text/css" href="/DataTables/datatables.css">
//  <link rel="stylesheet" type="text/css" href="/DataTables/datatables.css">
//<script type="text/javascript" charset="utf8" src="/DataTables/datatables.js"></script>
//});
if(Meteor.isClient){
	Template.add_button_routes.events({
		'click button': function(event){
			Modal.show('addRoutes')
		}
	})
  Template.showRoutes.onRendered(function(){
      var data = [
          ['Data 1', 'Data 2', 'Data 3', 'Data 4'],
          ['Data 1', 'Data 2', 'Data 3', 'Data 4']
      ];

      $('#showRoutes').DataTable({
          data : data,
          columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ]
      });
  });

}


/*import moment from 'moment';
import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';


Teplate.showRoutes.onCreated(function(){
    datatables(window, $);
    datatables_bs(window, $);

    // rest of your code
});
Template.body.onRendered(function(){
    var data = [
        ['Data 1', 'Data 2', 'Data 3', 'Data 4'],
        ['Data 1', 'Data 2', 'Data 3', 'Data 4']
    ];

    $('#mytable').DataTable({
        data : data
    });
});

Template.showRoutes.onRendered(function(){
    // Setup - add a text input to each footer cell
    $('#showRoutes tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );

    // DataTable
    var table = $('#showRoutes').DataTable();

    // Apply the search
    table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
});
*/
