var assert = require('assert');
var hashtype = require('../hashtype');

var HashType = hashtype.make();

describe("HashType: create and get", function () {
    it("basic create and get", function () {
	var expected = 33;
	var thing = new HashType("hash", [["bish", expected, "number"]], []);
	var got = thing.get("bish");
	assert.deepEqual(got, expected);
    });
    it("HashType: multi create and get", function () {
	var expected = 33;
	var thing = new HashType("hash", [
	    ["bish", expected, "number"],
	    ["bosh", true, "boolean"]
	], []);
	var got = thing.get("bish");
	assert.deepEqual(got, expected);
    });
    it("double specify create and get", function () {
	var expected = 33;
	var thing = new HashType("hash", [
	    ["bish", "original", "string"],
	    ["bosh", true, "boolean"],
	    ["bish", expected, "number"]
	], []);
	var got = thing.get("bish");
	assert.deepEqual(got, expected);
    });
});

describe("HashType: create and get type", function () {
    it("create and get type", function () {
	var expected = "number";
	var thing = new HashType("hash", [["bish", 33, expected]], []);
	var got = thing.get_type("bish");
	assert.deepEqual(got, expected);
    });
});


describe("HashType: create, set and get", function () {
    it("basic create, set and get", function () {
	var expected = 33;
	var thing = new HashType("hash", [["bish", 666, "number"]], []);
	thing.set("bish", expected);
	var got = thing.get("bish");
	assert.deepEqual(got, expected);
    });
    it("multi create, set and get", function () {
	var expected = 33;
	var thing = new HashType("hash", [
	    ["bish", 666, "number"],
	    ["bosh", true, "boolean"]
	], []);
	thing.set("bish", expected);
	var got = thing.get("bish");
	assert.deepEqual(got, expected);
    });
    it("double specify, set create and get", function () {
	var expected = 33;
	var thing = new HashType("hash", [
	    ["bish", "original", "string"],
	    ["bosh", true, "boolean"],
	    ["bish", 666, "number"]
	], []);
	thing.set("bish", expected);
	var got = thing.get("bish");
	assert.deepEqual(got, expected);
    });
});

describe("HashType: create, set and get arrays", function () {
    it("basic create, set and get", function () {
	var thing = new HashType("hash", [], [
	    ["array1", "bob", "number"],
	    ["array2", "bill", "boolean"]
	]);
	var key1 = "bango";
	var val1 = 33;
	var key2 = "angela";
	var val2 = false;
	thing.add("array1", key1, val1);
	thing.add("array2", key2, val2);
	var got = thing.get_from_array("array2", key2);
	assert.deepEqual(got, val2);
    });
});

describe("HashType: create, set and get_json", function () {
    it("basic create, set and get", function () {
	var thing = new HashType("hash",
				 [
				     ["key1", 33, "number"],
				     ["key2", "value2", "string"],
				     ["key3", true, "boolean"]
				 ],
				 [
				     ["array1", "bob", "number"],
				     ["array2", "bill", "boolean"]
				 ]);
	var key1 = "bango";
	var val1 = 33;
	var key2 = "angela";
	var val2 = false;
	thing.add("array1", key1, val1);
	thing.add("array2", key2, val2);
	expected = '{"objects":[{"key1":33},{"key2":"value2"},{"key3":true}],"arrays":[{"array1":{"bango":33}},{"array2":{"angela":false}}]}';
	var got = thing.get_json();
	assert.deepEqual(got, expected);
    });
});

describe("HashType: create, set and get_json, create from json", function () {
    it("full json round trip", function () {
	var objspec = [
	    ["key1", 33, "number"],
	    ["key2", "value2", "string"],
	    ["key3", true, "boolean"]
	];
	var arrayspec = [
	    ["array1", "bob", "number"],
	    ["array2", "bill", "boolean"]
	];
	var thing = new HashType("hash", objspec, arrayspec);
	var key1 = "bango";
	var val1 = 33;
	var key2 = "angela";
	var val2 = false;
	thing.set("key1", 999);
	thing.set("key2", "nine nine nine");
	thing.set("key3", false);
	thing.add("array1", key1, val1);
	thing.add("array2", key2, val2);
	var expected = thing.get_json();
	var newthing = new HashType("hash", objspec, arrayspec);
	newthing.from_json(expected);
	var got = newthing.get_json();
	assert.deepEqual(got, expected);
    });
});
