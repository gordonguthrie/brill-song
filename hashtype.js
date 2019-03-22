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
	console.log("there is no array called " + arrayname);
	throw("there is no array called " + arrayname);
    };
};

exports.make = function () {

    return class HashType {
	constructor (name, obj_array, array_array) {
	    if (typeof(name) !== "string") {
		console.log("making a HashType takes a string as the 1st parameter");
		console.log(name);
		throw("making a HashType takes a string as the 1st parameter");
	    };
	    if (! Array.isArray(obj_array)) {
		console.log("making a HashType takes an array as the 2nd parameter");
		console.log(obj_array);
		throw("making a HashType takes an array as the 2nd parameter");
	    };
	    if (! Array.isArray(array_array)) {
		console.log("making a HashType takes an array as the 3rd parameter");
		console.log(array_array);
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
//	    console.log("in hashtype set");
//	    console.log(this);
//	    console.log(key);
//	    console.log(val);
	    set2(this, key, val);
	};

	set_array(arrayname, key, val) {
//	    console.log("in hashtype set_array");
//	    console.log(this);
//	    console.log(arrayname);
//	    console.log(key);
//	    console.log(val);
	    add2(this, arrayname, key, val);
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

	get_array(arrayname) {
	    var whole = this.arrays.get(arrayname).get_array();
	    return whole;
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
		var array = [];
		var elems = this.arrays.get(k2).get_array();
		for (var i = 0; i < elems.length; i++) {
		    array.push(elems[i]);
		};
		var a = {}
		a[k2] = array;
		arrays.push(a);
	    };

	    // now return the json
	    if (objs.length !== 0) {
		obj["objects"] = objs;
	    };
	    if (arrays.length !== 0) {
		obj["arrays"] = arrays;
	    };
	    return JSON.stringify(obj);
	};

	from_json(json) {
	    var obj = JSON.parse(json);
	    if (obj.objects !== undefined) {
		for (var i = 0; i < obj.objects.length; i++) {
		    var o_key = Object.keys(obj.objects[i])[0];
		    var o_val = obj.objects[i][o_key];
		    set2(this, o_key, o_val);
		};
	    };
	    if (obj.arrays !== undefined) {
		for (var i = 0; i < obj.arrays.length; i++) {
		    var arrayname = Object.keys(obj.arrays[i])[0];
		    var innerobj = obj.arrays[i][arrayname];
		    for (var j = 0; j < Object.keys(innerobj).length; j++) {
			var index = Object.keys(innerobj)[j];
			var elem = innerobj[index];
			var a_key = Object.keys(elem)[0];
			var a_val = elem[a_key];
			add2(this, arrayname, a_key, a_val);
		    };
		};
	    };
	};

	dump () {
	    console.log(" ");
	    console.log("*****Starts*****");
	    console.log("Dumping " + this.name);
	    console.log(" ");
	    console.log("Values:");
	    for (const k1 of this.objs.keys()) {
		this.objs.get(k1).dump();
	    };
	    console.log(" ");
	    console.log("Array values:");
	    for (const k2 of this.arrays.keys()) {
		console.log("Key: " + k2);
		var a = this.arrays.get(k2);
		a.dump();
	    };
	    console.log("*****Ends*******");
	};
    };
};
