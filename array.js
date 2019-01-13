// this is a factory for creating arrays of data structures
const classFactory = require('./struct');

exports.makeArray = function (className, fields) {
    if (Array.isArray(fields)) {

	return class {
	    constructor(name) {
		this.name = className + "Array";
		this.objecttype = className;
		this.fields = fields;
		this.data = [];
	    };

	    dump() {
		console.log("aaaaaaaaaaaaaaaaa starts");
		console.log("array name " + this.name);
		console.log("array contains things of type "
			    + this.objecttype);
		console.log("ooooooooooooooo starts");
		for (var d in this.data) {
		    this.data[d].dump();
		};
		console.log("ooooooooooooooo ends");
		console.log("aaaaaaaaaaaaaaaaa end");
	    };

	    load_json(json) {
		var jsonobj = JSON.parse(json);
		var type = this.objecttype;
		var payload = jsonobj[type];
		for (var p in payload) {
		    this.add(p);
		    var json = JSON.stringify(payload[p]);
		    this.data[p].load_json(json);
		};
	    };

	    get_json() {
		// need to iterate over the contents and convert them to json
		// and insert them in to a new array
		// which we then convert to json
		var array = new Object();
		for (var k in this.data) {
		    if (this.data.hasOwnProperty(k)) {
			array[k]=this.data[k].get_plain_obj();
		    };
		};
		var obj = new Object();
		obj[this.objecttype] = array;
		return JSON.stringify(obj, null, 4);
	    };

	    add(key) {
		if (this.data[key] === undefined) {
		    let Obj = classFactory.makeStruct(this.objecttype, this.fields);
		    var myobj = new Obj(this.objecttype);
		    this.data[key] = myobj;
		} else {
		    throw("in array/add key " + key + " already exists");
		};
	    };

	    set(key, fieldname, value) {
		if (this.data[key] !== undefined) {
		    this.data[key].set(fieldname, value);
		} else {
		    throw("in array/set key " + key + " doesn't exist");
		};
	    };

	    get_array() {
		return this.data;
	    };

	    get(key, fieldname) {
		if (this.data[key] !== undefined) {
		    return this.data[key].get(fieldname);
		} else {
		    throw("in array/get key " + key + " doesn't exist");
		};
	    };
	}
    } else {
	throw("makeArray takes an array of field names as an argument");
    }
}
