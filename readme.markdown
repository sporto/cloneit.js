CloneIt.js
============

A minimal utility for creating objects with an inheritance chain

	// create an object

	var Shape = CloneIt.clone({
		sides 0,
		hasArea: true
	});

	var Rectangle = Shape.clone({
		sides: 4,
		// init function is called when using 'create'
		init: function(x, y){
			this.x = x;
			this.y = y;
		},
		area: function () {
			return this.x * this.y;
		}
	});

	// create an 'instance' using 'create'
	// this call the `init` method
	var rect1 = Rectangle.create(3, 4);

	rect1.area(); //=> 12
	rect1.hasArea; //=> true (call forwarded to parent object)