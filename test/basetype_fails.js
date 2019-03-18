var assert = require('assert');
var basetype = require('../basetype');

var BaseType = basetype.make();

describe("BaseType Fails: type fail", function () {
    it("non-existent type", function () {
	var testfn = make_type_test_fn(32, "franjumptious");
	var expected = "Type franjumptious is not defined";
	runner(testfn, expected)
    });
});

describe("BaseType Fails: type mismatch", function () {
    it("don't match string", function () {
	var testfn = make_type_test_fn(32, "string");
	var expected = "32 should be a string";
	runner(testfn, expected)
    });
    it("don't match numbers", function () {
	var testfn = make_type_test_fn("yada", "number");
	var expected = "yada should be a number";
	runner(testfn, expected)
    });
    it("don't match boolean", function () {
	var testfn = make_type_test_fn(32, "boolean");
	var expected = "32 should be a boolean";
	runner(testfn, expected)
    });
});

describe("BaseType Fails: try and set invalid type value", function () {
    it("try and set invalid type value", function () {
	var testfn = function () {
	    var thing = new BaseType("bish", 44, "number");
	    thing.set("banjo");
	};
	runner(testfn, "banjo should be a number");
    });
});

// Internals

runner = function(testfn, expected) {
    try {
	testfn();
	throw("should have thrown an exception (in this test)");
    } catch (err) {
	assert.deepEqual(err, expected)
    };
};

make_type_test_fn = function(value, type) {
    var testfn = function () {
	var thing = new BaseType("name", value, type);
    };
    return testfn;
};
