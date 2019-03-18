const baseType  = require('./basetype');
const arrayType = require('./arraytype');

var set2 = function (mythis, key, val) {
    var base = mythis.objs.get(key);
    base.set(val);
    mythis.objs.set(key, base);
};

var add2 = function (mythis, arrayname, key, value) {
    var array = mythis.arrays.get(arrayname);
    if (array !== undefined) {
	mythis.arrays.get(arrayname).add(key, value);
    } else {
	throw("there is no array called " + arrayname);
    };
};

exports.make = function () {

    return class HashType {
	constructor (name, obj_array, array_array) {
	    if (typeof(name) !== "string") {
		throw("making a HashType takes a string as the 1st parameter");
	    };
	    if (! Array.isArray(obj_array)) {
		throw("making a HashType takes an array as the 2nd parameter");
	    };
	    if (! Array.isArray(array_array)) {
		throw("making a HashType takes an array as the 3rd parameter");
	    };

	    // create the classes we need
	    var BaseType = baseType.make();
	    var ArrayType = arrayType.make()

	    this.name = name

	    // add the objects
	    this.objs = new Map();
	    for (var i = 0; i < obj_array.length; i++) {
		var base = new BaseType(obj_array[i][0],
					obj_array[i][1],
					obj_array[i][2]);
		this.objs.set(obj_array[i][0], base);
	    };

	    // add the arrays of objects
	    this.arrays = new Map();
	    for (var i = 0; i < array_array.length; i++) {
		var array = new ArrayType(array_array[i][0],
					  array_array[i][1],
					  array_array[i][2]);
		this.arrays.set(array_array[i][0], array);
	    };
	};

	set(key, val) {
	    set2(this, key, val);
	};

	add(arrayname, key, value) {
	    add2(this, arrayname, key, value);
	};

	get(key) {
	    return this.objs.get(key).get();
	};

	get_type(key) {
	    var elem = this.objs.get(key);
	    return this.objs.get(key).get_type();
	};

	get_from_array(arrayname, key) {
	    return this.arrays.get(arrayname).get(key);
	};

	get_json() {
	    var obj = {};

	    // first the objects
	    var objs = [];
	    for (const k1 of this.objs.keys()) {
		objs.push(this.objs.get(k1).get_obj());
	    };

	    // now the arrays
	    var arrays = [];
	    for (const k2 of this.arrays.keys()) {
		var a = {};
		a[k2] = this.arrays.get(k2).get_obj();
		arrays.push(a);
	    };

	    // now return the json
	    obj["objects"] = objs;
	    obj["arrays"] = arrays;
	    return JSON.stringify(obj);
	};

	from_json(json) {
	    var obj = JSON.parse(json);
	    for (var i = 0; i < obj.objects.length; i++) {
		var o_key = Object.keys(obj.objects[i])[0];
		var o_val = obj.objects[i][o_key];
		set2(this, o_key, o_val);
	    };
	    for (var i = 0; i < obj.arrays.length; i++) {
		var arrayname = Object.keys(obj.arrays[i])[0];
		var innerobj = obj.arrays[i][arrayname];
		var a_key = Object.keys(innerobj)[0];
		var a_val = innerobj[a_key];
		add2(this, arrayname, a_key, a_val);
	    };
	};
    };
};
