$(function() {

		console.log(tnlist);
		tnwahl = new TnWahlC( );
		tnwahl.set(tnlist);
		
		tnwahl.print();
		for (i=0; i<tnwahl.length(); i++) {
			$('#tnliste').append( tnwahl.getTnListElem(i) );
		}

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

		$('#tngrid').append( genUiGridDivs( tnwahl ) );
		

		$("input[type='checkbox']").checkboxradio();

		var checkboxChangeFn = function ( obj ) {
				var idx = obj.id.split('-');
				idx = idx[ idx.length -1 ];
				if ( $(obj).is(':checked') ) {
					tnwahl.enable( idx ); }
				else { tnwahl.disable( idx ); }			
		}

		// add new member text field input change handler:
		// - create new entry in tnwahl
		// - append new list element / refresh display
		// - add change event handler to new element
		$('#neu').change( function() {
			var newval = $(this).val();
			$(this).val('');
			tnwahl.add( newval );
			lastidx = tnwahl.length()-1;

			$('#tnliste').append( 
				tnwahl.getTnListElem( lastidx )
			 );
			$("input[type='checkbox']").checkboxradio();

			//add checkbox change handler
			$('#checkbox-'+ lastidx ).change( function() {checkboxChangeFn(this);});

		});

		// add change event handler to checkboxes
		$('.tncheckbox').change( function() {checkboxChangeFn(this);});
		$('#export').click( function(e) {
				e.preventDefault();
				ostr = tnwahl.genExportStr();
				window.open("data:application/download;charset=utf-8," + escape(ostr));
		});
});

var tnlist = '';
var tnwahl = 0;

var TnWahlC  = function( ) {
	var _tnlist = [];
	
	function priv() {
		return;
	};
	
	return {
		add: function ( istr ) {
			console.log('adding item ['+istr+'] to list');
			_tnlist.push( new TnC( istr ) );
		},
		set: function( istr ) {
			var items = istr.split(',');
			for (i=0; i<items.length; i++) {
				this.add( items[i] );
			}
		},
		print: function() {
			var members = '';
			for (i=0; i<_tnlist.length; i++) {
				members += _tnlist[i].printstr();
			}
			console.log('TnWahlC - print members:'+members);
		},
		enable: function(id) {
			_tnlist[id].enable();
		},
		disable: function(id) {
			_tnlist[id].disable();
		},
		length: function() {
			return _tnlist.length;
		},
		getName: function (idx ) {
			return _tnlist[ idx ].getName();
		},
		getTnListElem: function( idx ) {
			var checked = '';
			if ( _tnlist[idx].isActive() ) {
				checked = 'checked="checked" ';
			}
			str = '<input type="checkbox" name="checkbox-'+idx+'" id="checkbox-'+idx+'" class="tncheckbox" '+checked+'/>';
			str+= ' <label for="checkbox-'+idx+'">'+_tnlist[idx].getName()+'</label>';
		//	console.log('gen: '+str);
			return $(str);
		},
		genExportStr: function () {
			ostr = 'var tnlist="';
			if( _tnlist.length > 0 ){
				for (i=0; i<_tnlist.length; i++) {
					ostr += '\\\n'+ _tnlist[i].getName() + ',';
				}
				ostr = ostr.slice(0, -1);
			}
			return ostr + '\\\n";';
		}
	};
};



var TnC = function( name ) {
	var name = name;
	var active = true;
	
	return {
		enable: function() {
			console.log('TnC: enabled '+name);
			active = true;		
		},
		disable: function() {
			console.log('TnC: disabled '+name);
			active = false;
		},
		isActive: function() {
			if (active) {return true;}	
			else return false;
		},
		getName: function() {
			return name;		
		},
		printstr: function() {
			var str = '['+name+': active:'+active+']';
			console.log(str);
			return str;
		}
	};
};

