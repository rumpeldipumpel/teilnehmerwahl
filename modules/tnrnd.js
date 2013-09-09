var TnRnd  = function( tnlist ) {
		
	var len;
	var curridx;
	var rndidxarray;
	//reset( tnlist.length() );
		
	function priv() {
		return;
	};
	
	return {
		reset: function ( input ) {			
			if(input.setlen) { len = setlen; }
			console.log('TnRnd: reset (len='+len+')');
			rndidxarray = generateArray(len, input.inactives);
			curridx = 0;
			this.arrshuffle();			
			console.log(rndidxarray);
		},
		arrshuffle: function() {
			rndidxarray = shuffle(rndidxarray);
		},
		pop: function() {
			var resetflag = false;
			console.log('TnRnd: rndidxarraylen='+rndidxarray.length);
			if( rndidxarray.length < 1 ) { 
				this.reset();
				resetflag = true;
			}
			var elem = rndidxarray.pop();
			console.log('TnRnd: popped element: '+elem);
			return {idx:elem, reseted:resetflag}; 		
		},
		generateArray: function (count, inactives) {
		    var foo = [];
		    for (var i = 0; i < count; i++) {
		    	  if ( $.inArray(i,inactives) ) { continue; }
		        foo.push(i);
		    }
		    return foo;		
		}
	}
}
