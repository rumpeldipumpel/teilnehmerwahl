var TnListC  = function( ) {
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
			console.log('TnListC - print members:'+members);
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
			str = '<input type="checkbox" name="checkbox-'+idx;
			str +='" id="checkbox-'+idx+'" class="tncheckbox" '+checked+'/>';
			str+= ' <label for="checkbox-'+idx+'">';
			str+= _tnlist[idx].getName();
			
	/*		str+= '<div class="tnlistcgspan" data-role="controlgroup" data-type="horizontal">';
			str+= '<a href="#" data-role="button" data-icon="plus" ';
			str += 'data-iconpos="left" data-mini="true">Bearbeiten</a>';
			str+= '<a href="#" data-role="button" data-icon="delete" ';
			str += 'data-iconpos="left" data-mini="true">Löschen</a>';
			str += '</div>';*/
			//button data-mini="true" data-inline="true" data-icon="delete"/>';
			
			str+= '</label>';
			
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
		},
		getInactives: function () {
			var list = [];
			for(i=0; i<_tnlist.length; i++) {
				if( ! _tnlist[i].isActive() ){ list.push(i);	}
			}
			return list;
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
