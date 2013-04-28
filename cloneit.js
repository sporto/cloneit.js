/*******************************************************************************
CloneIt.js
*******************************************************************************/

(function (root) {

	'use strict';

	var CloneIt = {
		mixin: function (other) {
			for (var k in other) {
				if (other.hasOwnProperty(k)) {
					this[k] = other[k];
				}
			}
		},
		clone: function (other) {
			var obj = Object.create(this);
			obj.mixin(other);
			return obj;
		},
		create: function () {
			var obj = this.clone({});
			obj.init.apply(obj, arguments);
			return obj;
		},
		init: function () {

		}
	};


	// CommonJS:
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = CloneIt;
		}
	}

	
	root.CloneIt = CloneIt;
	
}(this));