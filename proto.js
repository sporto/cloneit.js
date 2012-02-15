/*******************************************************************************
Proto.js
*******************************************************************************/

var Proto = (function(){
	
	var self = {};

	function create(props){

		function f() {}
		f.prototype = this;
		var child = new f();
		child.parent = this;

		for(var prop in props){
			if(props.hasOwnProperty(prop)){
				// f.prototype[prop] = props[prop]
				child[prop] = props[prop];
			}
		}
		return child;


		// function toType(obj) {
		// 	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		// }

	
	}

	self.create = create;

	return self;

}());

//
// CommonJS:
//
if (typeof exports === 'object') {
	exports.Proto = Proto;
}