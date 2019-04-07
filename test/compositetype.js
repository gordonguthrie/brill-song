var assert = require('assert');
var basetype = require('../basetype');

var BaseType = basetype.make();

describe("BaseType: create and get", function () {
    it("create and get", function () {
	var obj = {};
	obj.swing = 0;
	obj.emphasis = 0;
	var expected = obj;
	var thing = new BaseType("bish", expected, "timing");
	var got = thing.get();
	assert.deepEqual(got, expected);
    });
});

describe("BaseType: create, set then get", function () {
    it("create, set then get", function () {
	var orig = {};
	orig.swing = 1;
	orig.emphasis = 1;
	var thing = new BaseType("bish", orig, "timing");
	var obj = {};
	obj.swing = 0;
	obj.emphasis = 0;
	var expected = obj;
	thing.set(expected);
	var got = thing.get();
	assert.deepEqual(got, expected);
    });
});
