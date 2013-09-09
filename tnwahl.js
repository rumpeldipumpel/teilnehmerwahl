$(function() {

		var refreshPage = function (page) {
			page.trigger('pagecreate');
			//page.listview('refresh');
			console.log('refreshed');
			}

		console.log(tnlistdata);
		tnlist = new TnListC( );
		tnlist.set(tnlistdata);
		
		tnlist.print();
		for (i=0; i<tnlist.length(); i++) {
			
			var tnname = tnlist.getName( i );
			tntr_html = ich.tntr( {idx:i, tn_name: tnname } );		
			$('#tn_table').append( tntr_html );



			//$('#wahl').trigger('pagecreate');			
				
			//$('#tn_table').append( tnlist.getTnListElem(i) );
		}
/*
		var genUiGridDivs = function ( obj ) {
			chars = 'abcde'.split('');
			gstr = '';
			for (i=0; i<obj.length(); i++) {
				blockchar = chars[ i%4 ];
				txt = obj.getName( i );
				gstr += '<div class="ui-block-' + blockchar + ' tngridbp">';
				gstr += ''+txt+'</div>';
			}
			console.log('gstr ='+gstr);
			return gstr;
		}

		$('#tngrid').append( genUiGridDivs( tnlist ) );
		*/


		// add new member text field input change handler:
		// - create new entry in tnlist
		// - append new list element / refresh display
		// - add change event handler to new element
		$('#neu').change( function() {
			var newval = $(this).val();
			$(this).val('');
			tnlist.add( newval );
			

		//	$('#tnliste .ui-controlgroup-controls').append( 
			//	tnlist.getTnListElem( lastidx )
			 //);
	
			//add change handler
	//		$('#checkbox-'+ lastidx ).change( function() {checkboxChangeFn(this);});

			refreshPage($('#dataedit'));
		});

		// add change event handler to checkboxes
//		$('.tncheckbox').change( function() {checkboxChangeFn(this);});
		$('#export').click( function(e) {
				e.preventDefault();
				ostr = tnlist.genExportStr();
				window.open("data:text/javascript;charset=utf-8," + escape(ostr));
		});
		 
		
		var rndidx = new TnRnd( tnlist );
		rndidx.reset( 
			{setlen: tnlist.length(), 
			inactives: tnlist.getInactives()
			}
		);
		
		$('#b_tn_name').click( function(e) {
			var idx = rndidx.pop().idx;			
			var tnname = tnlist.getName( idx );
			console.log('set name:'+tnname);			
			$('#b_tn_name').text( tnname ).button('refresh');			
		});
});



var tnlistdata = '';
var tnlist = 0;

