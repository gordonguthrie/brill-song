var assert = require('assert');
var typed_data = require('../typed_data');

var name = "array";

var arrayObj1 = new Object();
arrayObj1.name = "lamport";
arrayObj1.type = "string";

var arrayObj2 = new Object();
arrayObj2.name = "refridgerator";
arrayObj2.type = "bool";

var object = new Object();
object.name = "timing";
object.type = "array";
object.array = [arrayObj1, arrayObj2];

var object2 = new Object();
object2.name = "pigboy";
object2.type = "array";
object2.array = [arrayObj1, arrayObj2];

let Hoopla = typed_data.make(name, [object, object2]);

describe("make a class with arrays", function () {
    it('should make a class', function () {
	var sw = new Hoopla();
	assert.deepEqual((sw instanceof Hoopla), true);
    });
});

describe("get an empty variable", function () {
    it("should get an empty string from an array (1)", function () {
	var sw = new Hoopla();
	var path = "timing";
	got = sw.get(path);
	assert.deepEqual(got, "");
    });
});
