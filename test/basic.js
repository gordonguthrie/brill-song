var assert = require('assert');
var typed_data = require('../typed_data');

var name = "basic";

var object = new Object();
object.name = "songwriters";
object.type = "string";

var object2 = new Object();
object2.name = "bongo";
object2.type = "jimbo";

let Songwriters = typed_data.make(name, [object]);
let Songwriters2 = typed_data.make(name, [object, object2]);

describe("make a class (no arrays)", function () {
    it('should make a class', function () {
	var sw = new Songwriters();
	assert.deepEqual((sw instanceof Songwriters), true);
    });
    it('should make a class (no arrays) (2)', function () {
	var sw = new Songwriters2();
	assert.deepEqual((sw instanceof Songwriters2), true);
    });
});

describe("get an empty variable (no arrays)", function () {
    it("should get an empty string", function () {
	var sw = new Songwriters();
	var path = "songwriters";
	got = sw.get(path);
	assert.deepEqual(got, "");
    });
    it("should get an empty string (no arrays) (2)", function () {
	var sw = new Songwriters2();
	var path = "songwriters";
	got = sw.get(path);
	assert.deepEqual(got, "");
    });
});

describe("set/get loop", function () {
    it("should be able to set and get (no arrays)", function () {
	var sw = new Songwriters();
	var val = "Gordon Guthrie";
	var path = "songwriters";
	sw.set(path, val);
	got = sw.get(path);
	assert.deepEqual(got, val);
    });
    it("should be able to set and get (no arrays) (2)", function () {
	var sw = new Songwriters2();
	var val = "Gordon Guthrie";
	var path = "songwriters";
	sw.set(path, val);
	got = sw.get(path);
	assert.deepEqual(got, val);
    });
});
