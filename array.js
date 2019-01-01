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
		console.log("Dumping array*****************");
		console.log("dump " + this.name);
		console.log(this);
		console.log("******************************");
	    };

	    load_json(json) {
		var jsonobj = JSON.parse(json);
		for (var f in jsonobj[this.className]) {
		    this.add(f);
		    this.data[f].load_json(jsonobj[f]);
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

	    get_array(key) {
		if (this.data[key] !== undefined) {
		    return this.data[key];
		} else {
		    throw("in array/get_array key " + key + " doesn't exist");
		};
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
