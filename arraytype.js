const types = require("./types");
const arrayType = require('./arraytype');
const baseType = require('./basetype');

var BaseType = baseType.make();

exports.make = function () {

    return class ArrayType {
	constructor (name, key, type) {

	    if (typeof(name) !== "string") {
		throw("making an ArrayType takes a string as the 1st parameter");
	    };
	    if (typeof(key) !== "string") {
		throw("making an ArrayType takes a string as the 2nd parameter");
	    };

	    // we can only create an thing with a valid type
	    types.is_type_valid(type);

	    this.name = name;
	    this.key = key;
	    this.type = type;
	    this.checkType = types.get_type_check(type);
	    this.map = new Map();
	};

	add(key, value) {
	    if (typeof(key) !== "string") {
		throw("adding an element to an ArrayType takes a string as the 1st parameter");
	    };
	    this.checkType(value);
	    var base = new BaseType(key, value, this.type);
	    this.map.set(key, base);
	};

	get(key) {
	    if (this.map.has(key)) {
		return this.map.get(key).get();
	    } else {
		throw("key " + key + " is not in the array");
	    };
	};

	delete(key) {
	    if (this.map.has(key)) {
		this.map.delete(key);
	    } else {
		throw("key " + key + " is not in the array");
	    };
	};

	get_obj() {
	    var objs = {};
	    for (const k of this.map.keys()) {
		objs[k] = this.map.get(k).get();
	    };
	    return objs;
	};

    };
}
