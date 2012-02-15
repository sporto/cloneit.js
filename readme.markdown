Proto.js
============

A minimal utility for creating objects with an inheritance chain

	var Car = Proto.create({
		maxSpeed:100,
		admire:function(){
			return 'Nice Car!';
		},
		getSpecs:function(){
			return "Max speed is " + this.maxSpeed;
		}
	});

	var ferrari = Car.create({
		maxSpeed:250,
		admire:function(){
			return 'Wow, ' + this.parent.admire();
		}
	});

	ferrari.getSpecs();
	//Max speed is 250;

	ferrari.admire();
	// Wow, Nice Car!