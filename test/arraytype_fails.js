var assert = require('assert');
var arraytype = require('../arraytype');

var ArrayType = arraytype.make();

describe("ArrayType Fails: bad arguments in the array constructor", function () {
    it("name isn't a string", function () {
	var testfn = function () {
	    var thing = new ArrayType(666, "key", "number");
	};
	var expected = "making an ArrayType takes a string as the 1st parameter";
	runner(testfn, expected);
    });
    it("key isn't a string", function () {
	var testfn = function () {
	    var thing = new ArrayType("key", 666, "number");
	};
	var expected = "making an ArrayType takes a string as the 2nd parameter";
	runner(testfn, expected);
    });
    it("invalid type", function () {
	var testfn = function () {
	    var thing = new ArrayType("name", "key", "number666");
	};
	var expected = "Type number666 is not defined";
	runner(testfn, expected);
    });
});

describe("ArrayType Fails: failed to add", function () {
    it("adding with a non-string key", function () {
	var testfn = function () {
	    var thing = new ArrayType("array", "blib", "number");
	    thing.add(666, 33);
	};
	var expected = "adding an element to an ArrayType takes a string as the 1st parameter";
	runner(testfn, expected);
    });
    it("value being added is of the wrong type", function () {
	var testfn = function () {
	    var thing = new ArrayType("array", "blib", "number");
	    thing.add("doobie", "devils spawn");
	};
	var expected = "devils spawn should be a number";
	runner(testfn, expected);
    });
});

describe("ArrayType Fails: failed to get", function () {
    it("getting a non-existent key", function () {
	var testfn = function () {
	    var thing = new ArrayType("array", "blib", "number");
	    thing.add("yerko", 33);
	    thing.get("azrael");
	};
	var expected = "key azrael is not in the array";
	runner(testfn, expected);
    });
});

describe("ArrayType Fails: failed to delete", function () {
    it("deleting a non-existent key", function () {
	var testfn = function () {
	    var thing = new ArrayType("array", "blib", "number");
	    thing.add("yerko", 33);
	    thing.delete("azrael");
	};
	var expected = "key azrael is not in the array";
	runner(testfn, expected);
    });
    it("can't read after delete", function () {
	var deletekey = "pervo";
	var testfn = function () {
	    var thing = new ArrayType("array", "blib", "number");
	    thing.add("yerko", 33);
	    thing.add(deletekey, 66)
	    thing.delete(deletekey);
	    thing.get(deletekey);
	};
	var expected = "key " + deletekey + " is not in the array";
	runner(testfn, expected);
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
