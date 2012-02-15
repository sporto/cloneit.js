var should = require('should');
var Proto = require('../proto').Proto;

describe('proto', function(){

	var Transport,
			Plane,
			Car,
			Ferrari;

	beforeEach(function(){
		Transport = Proto.create({
			on:false,
			maxSpeed:10,
			speed:0,
			acceleration:10,
			start:function(){
				this.on = true;
			},
			stop:function(){
				this.on = false;
			},
			accelerate:function(){
				if(this.on) this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
				return this;
			}
		});

		Plane = Transport.create({
			fly:function(){
				return true;
			}
		})

		Car = Transport.create({
			doors:4,
			maxSpeed:100,
			acceleration:20,
			admire:function(){
				return 'Nice car!';
			}
		});

		Ferrari = Car.create({
			doors:2,
			maxSpeed:200,
			acceleration:30,
			admire:function(){
				return 'Wow, ' + this.parent.admire();
			}
		});

	});

	it('should have a create method', function(){
		Proto.should.have.property('create');
	});

	describe('Transport', function(){
			
		it('should create a new object', function(){
			Transport.should.have.property('on');
		});

		it('__proto__ should be linked to the parent', function(){
			Transport.__proto__.should.equal(Proto);
		});

		it('should have the create property', function(){
			Transport.should.have.property('create');
		});

	});

	describe('Plane', function(){
		
		it('has a fly function', function(){
			Plane.should.have.property('fly');
			Transport.should.not.have.property('fly');
		})

	});

	describe('Car', function(){
		
		it('should inherit property from parent', function(){
			Car.should.have.property('on');
			Car.on.should.be.false;
		});

		it('should use its own properties over the parent', function(){
			Car.maxSpeed.should.eql(100);
		});

		it('should not override properties on the parent', function(){
			Transport.maxSpeed.should.eql(10);
		});

		it('should not leak properties into the parent', function(){
			Car.should.have.property('doors');
			Transport.should.not.have.property('doors');
		});

		it('should call function on parent', function(){
			Car.should.have.property('start');
			Car.start();
			Car.on.should.be.true;
		});

		it('should not affect the parent', function(){
			Car.start();
			Transport.on.should.be.false;
		});

		it('should accelerate using its own acceleration', function(){
			Car.start();
			Car.accelerate();
			Car.speed.should.eql(20);
			Transport.speed.should.eql(0);
		})

		it('should reach its max speed and no more', function(){
			Car.start();
			for(var a=0; a<20; a++){
				Car.accelerate();
			}
			Car.speed.should.eql(100);
		});

	});

	describe('Ferrari', function(){

		it('should have two doors', function(){
			Ferrari.doors.should.eql(2);
			Car.doors.should.eql(4);
		});

		it('can calls its super', function(){
			Car.admire().should.eql('Nice car!');
			Ferrari.admire().should.eql('Wow, Nice car!');
		});

	});


	
	
});