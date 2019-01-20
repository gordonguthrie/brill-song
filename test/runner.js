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

describe("set/get loop", function () {
    it("should be able to set and get (no arrays) (2b)", function () {
	var sw = new Songwriters2();
	var val = "yardle";
	var path = "bongo";
	set_get_fn(sw, path, val);
    });
});

var set_get_fn = function (sw, path, val) {
    sw.dump();
    sw.set(path, val);
    sw.dump();
    got = sw.get(path);
    assert.deepEqual(got, val);
};
