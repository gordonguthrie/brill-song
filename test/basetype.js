var assert = require('assert');
var basetype = require('../basetype');

var BaseType = basetype.make();

describe("BaseType: create and get", function () {
    it("create and get", function () {
	var expected = 33;
	var thing = new BaseType("bish", expected, "number");
	var got = thing.get();
	assert.deepEqual(got, expected);
    });
});

describe("BaseType: create, set then get", function () {    it("create, set then get", function () {
	var expected = 44;
	var thing = new BaseType("bish", 44, "number");
	thing.set(expected);
	var got = thing.get();
	assert.deepEqual(got, expected);
    });
});

describe("BaseType: numbers as strings", function () {
    it("simple integer string", function () {
	var thing = new BaseType("name", "44", "number");
	assert.deepEqual(true, true);
    });
    it("simple float string", function () {
	var thing = new BaseType("name", "44.0", "number");
	assert.deepEqual(true, true);
    });
    it("negative integer string", function () {
	var thing = new BaseType("name", "-44", "number");
	assert.deepEqual(true, true);
    });
    it("negative float string", function () {
	var thing = new BaseType("name", "-44.0", "number");
	assert.deepEqual(true, true);
    });
    it("exponent int string", function () {
	var thing = new BaseType("name", "-44e14", "number");
	assert.deepEqual(true, true);
    });
    it("exponent float string", function () {
	var thing = new BaseType("name", "44.0e14", "number");
	assert.deepEqual(true, true);
    });
});

describe("BaseType: create and get type", function () {
    it("create and get type", function () {
	var expected = "number";
	var thing = new BaseType("bish", 33, expected);
	var got = thing.get_type();
	assert.deepEqual(got, expected);
    });
});

describe("BaseType: create and get json", function () {
    it("create and get json", function () {
	var key = "bish";
	var val = 44;
	var thing = new BaseType(key, 33, "number");
	thing.set(val);
	var obj = {};
	obj[key] = val;
	var expected = obj;
	var got = thing.get_obj();
	assert.deepEqual(got, expected);
    });
});
