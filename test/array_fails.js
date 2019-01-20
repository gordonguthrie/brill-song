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

describe("try and get a non-existent path (array funs)", function () {
    it("should throw an exception", function () {
	var sw = new Hoopla();
	var path = "houseboat";
	try {
	    sw.get(path);
	    throw("should have thrown an exception (in this test)");
	} catch (err) {
	    assert.deepEqual(err, "No property houseboat at path ''");
	};
    });
    it("should throw an exception (2)", function () {
	var sw = new Hoopla();
	var path = "timing:hooboy:lamport";
	try {
	    sw.dump();
	    got = sw.get(path);
	    throw("should have thrown an exception (in this test)");
	} catch(err) {
	    assert.deepEqual(err, "No property hooboy at path 'timing'");
	};
    });
});
