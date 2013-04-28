var assert =   require('chai').assert;
var CloneIt =  require('../cloneit');

describe('cloneit', function(){

	'use strict';

	var Shape,
			Rectangle,
			//Triangle,
			rectangle;
			//triangle;

	beforeEach(function(){

		Shape = CloneIt.clone({
			sides: 0,
			kind :'Shape',
			hasArea: true,
			init: function () {
			
			},
			identify: function(){
				return this.kind;
			}
		});

		Rectangle = Shape.clone({
			sides: 4,
			kind: 'Rectangle',
			init: function (x, y) {
				this.x = x;
				this.y = y;
			}
		});

		rectangle = Rectangle.create(2, 3);

	});

	it('has a clone method', function(){
		assert.isFunction(CloneIt.clone);
	});

	it('has a create method', function(){
		assert.isFunction(CloneIt.create);
	});

	describe('Shape', function(){

		it('has a clone method', function(){
			assert.isFunction(Shape.clone);
		});

		it('has a create method', function(){
			assert.isFunction(Shape.create);
		});

		it('__proto__ is linked to the CloneIt', function(){
			assert.equal(Shape.__proto__, CloneIt);
		});

		it('has the given methods', function () {
			assert.isFunction(Shape.identify);
		});

		it('has the given properties', function () {
			assert.equal(Shape.kind, 'Shape');
		});

	});

	describe('Rectangle', function () {
		it('doesnt override properties on the parent', function(){
			assert.equal(Shape.kind, 'Shape');
		});
	});

	describe('rectangle', function () {
		
		it('inherits property from parent', function () {
			assert.equal(rectangle.hasArea, true);
		});

		it('inherits methods from parent', function () {
			assert.equal(rectangle.identify(), 'Rectangle');
		});

		it('creates an instance', function () {
			assert.equal(rectangle.__proto__, Rectangle);
		});

		it('passes the params', function () {
			assert.equal(rectangle.x, 2);
			assert.equal(rectangle.y, 3);
		});

	});

	
	
});