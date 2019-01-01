// This is a factory for creating data structures

exports.makeStruct = function (className, fields) {
    if (Array.isArray(fields)) {

	return class {
            constructor(name) {
		this.name = className;
		this.fields = fields;
		this.data = new Object();
		for (var i = 0; i < this.fields.length; i++) {
		    var fieldname = this.fields[i];
		    this.data[fieldname] = "";
		}
	    };

	    dump() {
		console.log("class name is: " + this.name);
		for (var i = 0; i < this.fields.length; i++) {
		    var fieldname = this.fields[i];
		    console.log(fieldname + " is " + this.data[fieldname]);
		}
	    };

	    load_json(json) {
		var jsonobj = JSON.parse(json);
		for (var key in jsonobj) {
		    if (jsonobj.hasOwnProperty(key)) {
			this.set(key, jsonobj[key]);
		    }
		}
	    };

	    get_json() {
		return JSON.stringify(this.data, null, 4);
	    };

	    // in arrays we need to get the raw object to make proper json
	    get_plain_obj() {
		return this.data;
	    }

	    set(fieldname, value) {
		var wasset = false;
		for (var i = 0; i < this.fields.length; i++) {
		    if (this.fields[i] == fieldname) {
			this.data[fieldname] = value;
			wasset = true;
		    }
		}
		if (!wasset) {
		    throw("in struct/set key " + fieldname + "not valid");
		};
	    };

	    get(fieldname) {
		for (var i = 0; i < this.fields.length; i++) {
		    if (this.fields[i] == fieldname) {
			return this.data[fieldname];
		    }
		}
		return "";
	    };

	}
    } else {
	throw("makeStruct takes an array of field names as an argument");
    }
}
