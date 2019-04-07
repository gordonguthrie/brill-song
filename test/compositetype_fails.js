var assert = require('assert');
var basetype = require('../basetype');

var BaseType = basetype.make();

describe("BaseType: duff create", function () {
    it("timing is a number", function () {
	var testfn = function () {
	    var duffobj = 3
	    var thing = new BaseType("bish", duffobj, "timing");
	};
	var expected = "should be an object with a 'swing' and an 'emphasis'";
	runner(testfn, expected);
    });
});

describe("BaseType: duff set", function () {
    it("try and put a number in", function () {
	var testfn = function () {
	    var orig = {};
	    orig.swing = 1;
	    orig.emphasis = 1;
	    var duff = 3;
	    var thing = new BaseType("bish", orig, "timing");
	    thing.set(duff);
	};
	var expected = "should be an object with a 'swing' and an 'emphasis'";
	runner(testfn, expected);
    });
    it("out of band value (1)", function () {
	var testfn = function () {
	    var orig = {};
	    orig.swing = 1;
	    orig.emphasis = 1;
	    var duff = {};
	    duff.swing = 3;
	    duff.emphasis = 0.5;
	    var thing = new BaseType("bish", orig, "timing");
	    thing.set(duff);
	};
	var expected = "3 should be between 0 and 2";
	runner(testfn, expected);
    });
    it("out of band value (2)", function () {
	var testfn = function () {
	    var orig = {};
	    orig.swing = 1;
	    orig.emphasis = 1;
	    var duff = {};
	    duff.swing = 2;
	    duff.emphasis = -0.5;
	    var thing = new BaseType("bish", orig, "timing");
	    thing.set(duff);
	};
	var expected = "-0.5 should be between 0 and 2";
	runner(testfn, expected);
    });
    it("misformed object", function () {
	var testfn = function () {
	    var orig = {};
	    orig.swing = 1;
	    orig.emphasis = 1;
	    var duff = {};
	    duff.swing = "xx";
	    duff.emphasis = -0.5;
	    var thing = new BaseType("bish", orig, "timing");
	    thing.set(duff);
	};
	var expected = "xx should be a number";
	runner(testfn, expected);
    });
});

runner = function(testfn, expected) {
    try {
	testfn();
	throw("should have thrown an exception (in this test)");
    } catch (err) {
	assert.deepEqual(err, expected)
    };
};
