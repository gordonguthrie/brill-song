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
	thing.set_array("array1", key1, val1);
	thing.set_array("array2", key2, val2);
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
	thing.set_array("array1", key1, val1);
	thing.set_array("array2", key2, val2);
	expected = '{"objects":[{"key1":33},{"key2":"value2"},{"key3":true}],"arrays":[{"array1":[{"bango":33}]},{"array2":[{"angela":false}]}]}';
	var got = thing.get_json();
	assert.deepEqual(got, expected);
    });
    it("basic create, set and get for composite", function () {
	var obj = {};
	obj.swing = 0;
	obj.emphasis = 0;
	var thing = new HashType("hash",
				 [
				     ["key1", obj, "timing"]
				 ],
				 [
				 ]);
	expected = '{"objects":[{"key1":{"swing":0,"emphasis":0}}]}';
	var got = thing.get_json();
	assert.deepEqual(got, expected);
    });
});

describe("HashType: create, set and get_json, create from json", function () {
    it("basic create, set and get_json", function () {
	var thing = new HashType("hash",
				 [
				 ],
				 [
				     ["array1", "bob", "number"],
				     ["array2", "bill", "boolean"]
				 ]);
	thing.set_array("array1", "key1", 1);
	thing.set_array("array1", "key2", 2);
	thing.set_array("array1", "key3", 3);
	thing.set_array("array2", "keya", false);
	thing.set_array("array2", "keyb", true);
	expected = '{"arrays":[{"array1":[{"key1":1},{"key2":2},{"key3":3}]},{"array2":[{"keya":false},{"keyb":true}]}]}';
	var got = thing.get_json();
	assert.deepEqual(got, expected);
    });
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
	thing.set("key1", 999);
	thing.set("key2", "nine nine nine");
	thing.set("key3", false);
	thing.set_array("array1", "key11", 11);
	thing.set_array("array1", "key22", 22);
	thing.set_array("array1", "key33", 33);
	thing.set_array("array2", "key_a", true);
	thing.set_array("array2", "key_b", false);
	thing.set_array("array2", "key_c", true);
	var expected = thing.get_json();
	var newthing = new HashType("hash", objspec, arrayspec);
	newthing.from_json(expected);
	var got = newthing.get_json();
	assert.deepEqual(got, expected);
    });
    it("json round trip with empty arrays", function () {
	var objspec = [
	    ["key1", 33, "number"],
	    ["key2", "value2", "string"],
	    ["key3", true, "boolean"]
	];
	var arrayspec = [];
	var thing = new HashType("hash", objspec, arrayspec);
	thing.set("key1", 999);
	thing.set("key2", "nine nine nine");
	thing.set("key3", false);
	var expected = thing.get_json();
	var newthing = new HashType("hash", objspec, arrayspec);
	newthing.from_json(expected);
	var got = newthing.get_json();
	assert.deepEqual(got, expected);
    });
    it("full json round trip with empty objects", function () {
	var objspec = [];
	var arrayspec = [
	    ["array1", "bob", "number"],
	    ["array2", "bill", "boolean"]
	];
	var thing = new HashType("hash", objspec, arrayspec);
	var expected = thing.get_json();
	var newthing = new HashType("hash", objspec, arrayspec);
	newthing.from_json(expected);
	var got = newthing.get_json();
	assert.deepEqual(got, expected);
    });
    it("json round trip with composite types", function () {
	var obj = {};
	obj.swing = 0;
	obj.emphasis = 0;
	var objspec = [["key1", obj, "timing"]];
	var thing = new HashType("hash", objspec, []);
	var newtiming = {};
	newtiming.swing = 2;
	newtiming.emphasis = .5;
	thing.set("key1", newtiming);
	var expected = thing.get_json();
	var newthing = new HashType("hash", objspec, []);
	newthing.from_json(expected);
	var got = newthing.get_json();
	assert.deepEqual(got, expected);
    });
});
