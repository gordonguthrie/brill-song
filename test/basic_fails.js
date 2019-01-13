var assert = require('assert');
var typed_data = require('../typed_data');

describe("should fail to make a class", function () {
    it("should throw an exception (1)", function () {
	try {
	    var name = "basic_fails";
	    var object = new Object();
	    object.nameeeee = "songwriters";
	    object.type = "string";
	    let Songwriters = typed_data.make(name, [object]);
	    var sw = new Songwriters();
	    throw("should creating a new class should not have succeeded");
	} catch(err) {
	    assert.deepEqual(err, "Damaged object at path ''");
	};
    });
    it("should throw an exception (2)", function () {
	try {
	    var name = "basic_fails";
	    var object = new Object();
	    object.name = "songwriters";
	    object.typeeeeeeee = "string";
	    let Songwriters = typed_data.make(name, [object]);
	    var sw = new Songwriters();
	    throw("should creating a new class should not have succeeded");
	} catch(err) {
	    assert.deepEqual(err, "Damaged object at path ''");
	};
    });
    it("should throw an exception (3)", function () {
	try {
	    var name = "basic_fails";
	    let Songwriters = typed_data.make(name, 123);
	    var sw = new Songwriters();
	    throw("should creating a new class should not have succeeded");
	} catch(err) {
	    assert.deepEqual(err, "The function make takes a string as a name (1st param) and an array of object definitions (2nd param)");
	};
    });
    it("should throw an exception (4)", function () {
	try {
	    var object = new Object();
	    object.name = "songwriters";
	    object.type = "string";
	    let Songwriters = typed_data.make(123, [object]);
	    var sw = new Songwriters();
	    throw("should creating a new class should not have succeeded");
	} catch(err) {
	    assert.deepEqual(err, "The function make takes a string as a name (1st param) and an array of object definitions (2nd param)");
	};
    });
});

describe("should fail to get", function () {
    it("should not be able to get a non-existent field", function () {
	var name = "basic";
	var object = new Object();
	object.name="songwriters"
	object.type="string"
	let Songwriters = typed_data.make(name, [object]);
	var sw = new Songwriters();
	var path = "songwriterssssssssssss";
	try {
	    got = sw.get(path);
	    throw("an exception should have been thrown");
	} catch(err) {
	    var expected = "No property songwriterssssssssssss at path ''";
	    assert.deepEqual(err, expected);
	};
    });
});

describe("should fail to set", function () {
    it("should not be able to set a non-existent field", function () {
	var name = "basic";
	var object = new Object();
	object.name="songwriters";
	object.type="string";
	let Songwriters = typed_data.make(name, [object]);
	var sw = new Songwriters();
	var path = "songwriterssssssssssss";
	try {
	    got = sw.set(path, "banjo");
	    throw("an exception should have been thrown");
	} catch(err) {
	    var expected = "No property songwriterssssssssssss at path ''";
	    assert.deepEqual(err, expected);
	};
    });
    it("should not be able to set the wrong type of variable (1)", function () {
	setFn("songwriters", "string", 1234, "1234 should be a string");
    });
    it("should not be able to set the wrong type of variable (2)", function () {
	setFn("songwriters", "bool", 1234, "1234 should be a boolean");
    });
    it("should not be able to set the wrong type of variable (3)", function () {
	setFn("songwriters", "number", "bangette", "bangette should be a number");
    });
});

var setFn = function (key, type, value, expected) {
    var name = "basic";
    var object = new Object();
    object.name=key;
    object.type=type;
    let Songwriters = typed_data.make(name, [object]);
    var sw = new Songwriters();
    var path = "songwriters";
    try {
	got = sw.set(path, value);
	throw("an exception should have been thrown");
    } catch(err) {
	assert.deepEqual(err, expected);
    };
};
