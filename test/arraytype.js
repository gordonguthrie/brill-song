var assert = require('assert');
var arraytype = require('../arraytype');

var ArrayType = arraytype.make();

describe("ArrayType: create", function () {
    it("create", function () {
	var thing = new ArrayType("name", "key", "number");
	assert.deepEqual(true, true);
    });
});

describe("ArrayType: create and add", function () {
    it("create and add", function () {
	var thing = new ArrayType("name", "key", "number");
	thing.add("bingo", 33);
	assert.deepEqual(true, true);
    });
    it("create and add 2", function () {
	var thing = new ArrayType("name", "key", "number");
	thing.add("bingo", 33);
	thing.add("pervo", 44);
	assert.deepEqual(true, true);
    });
});

describe("ArrayType: create, add and get", function () {
    it("single addition", function () {
	var thing = new ArrayType("name", "key", "number");
	var key = "bingo";
	var expected = 33;
	thing.add(key, expected);
	var got = thing.get(key);
	assert.deepEqual(got, expected);
    });
    it("poly addition", function () {
	var thing = new ArrayType("name", "key", "number");
	var key = "bingo";
	var expected = 33;
	thing.add("randoo", 55);
	thing.add(key, expected);
	thing.add("pervo", 44);
	var got = thing.get(key);
	assert.deepEqual(got, expected);
    });
});

describe("ArrayType: create, add and get_array", function () {
    it("single addition", function () {
	var thing = new ArrayType("name", "key", "number");
	var key1 = "bingo";
	var val1 = 33;
	var key2 = "bongo";
	var val2 = 44;
	thing.add(key1, val1);
	thing.add(key2, val2);
	var expected = [{bingo: 33}, {bongo: 44}];
	var got = thing.get_array();
	assert.deepEqual(got, expected);
    });
});

describe("ArrayType: create, add and delete", function () {
    it("works after deletion", function () {
	var thing = new ArrayType("name", "key", "number");
	var key = "bingo";
	var expected = 33;
	var deletekey = "pervo";
	thing.add("randoo", 55);
	thing.add(key, expected);
	thing.add(deletekey, 44);
	thing.delete(deletekey);
	var got = thing.get(key);
	assert.deepEqual(got, expected);
    });
});

describe("ArrayType: create, add and get_obj", function () {
    it("simple get_obj", function () {
	var thing = new ArrayType("name", "key", "number");
	thing.add("rando", 55);
	thing.add("bingo", 33);
	thing.add("pervo", 44);
	var expected = {rando: 55, bingo: 33, pervo: 44};
	var got = thing.get_obj();
	assert.deepEqual(got, expected);
    });
});
