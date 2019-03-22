var assert = require('assert');
var hashtype = require('../hashtype');

var HashType = hashtype.make();

describe("HashType Fails: bad arguments in the hash constructor", function () {
    it("name isn't a string", function () {
	var testfn = function () {
	    var thing = new HashType(32, []);
	};
	var expected = "making a HashType takes a string as the 1st parameter";
	runner(testfn, expected);
    });
    it("non array for objects in the constructor", function () {
	var testfn = function () {
	    var thing = new HashType("name", 43, []);
	};
	var expected = "making a HashType takes an array as the 2nd parameter";
	runner(testfn, expected);
    });
    it("non array for object array in the constructor", function () {
	var testfn = function () {
	    var thing = new HashType("name", [], "banjo");
	};
	var expected = "making a HashType takes an array as the 3rd parameter";
	runner(testfn, expected);
    });
});

// test the objects first

describe("HashType Fails: pass through fails, (invalid types in the hash)", function () {
    it("invalid base type in obj array", function () {
	var testfn = function () {
	    var thing = new HashType("name", [["key", 33, "numberxxx"]], []);
	};
	var expected = "Type numberxxx is not defined";
	runner(testfn, expected);
    });
    it("dodgy field defn in obj array", function () {
	var testfn = function () {
	    var thing = new HashType("name", [[33, "number"]], []);
	};
	var expected = "Type undefined is not defined";
	runner(testfn, expected);
    });
    it("shallow object array passed in", function () {
	var testfn = function () {
	    var thing = new HashType("name", ["key", 33, "number"], []);
	};
	var expected = "Type y is not defined";
	runner(testfn, expected);
    });
    it("no array array array passed in", function () {
	var testfn = function () {
	    var thing = new HashType("name", ["key", 33, "number"]);
	};
	var expected = "making a HashType takes an array as the 3rd parameter";
	runner(testfn, expected);
    });
});

// Now test the object arrays

describe("HashType Fails: pass through fails (invalid types in obj array)",
	 function () {
	     it("invalid base type in obj array", function () {
		 var testfn = function () {
		     var thing = new HashType("name", [], [["name", "key", "numberxxx"]]);
		 };
		 var expected = "Type numberxxx is not defined";
		 runner(testfn, expected);
	     });
	 });

describe("HashType Fails: fail to add to an array", function () {
	     it("try and add to non-existant array", function () {
		 var testfn = function () {
		     var thing = new HashType("name", [], [["array1", "key", "number"]]);
		     thing.set_array("non-existant array", "key", 33);
		 };
		 var expected = "there is no array called non-existant array";
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
