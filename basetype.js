// Do not call this directly - only indirectly via HashType

var types = require("./types");

exports.make = function () {

    return class BaseType {

	constructor(key, val, type) {

	    // we can only create an thing with a valid type
	    types.is_type_valid(type);

	    // start stashing the stuff
	    this.key = key;
	    this.type = type;
	    this.checkType = types.get_type_check(type);
	    // yeah, but check the type of the value matches the type
	    this.checkType(val);
	    this.value = val;
	};

	set(val) {
	    this.checkType(val);
	    this.value = val;
	};

	get() {
	    return this.value;
	};

	get_type() {
	    return this.type
	};

	get_obj() {
	    var obj = {};
	    obj[this.key] = this.value;
	    return obj;
	};

	dump() {
	    console.log(this.key + ": " + this.value +
			" (of type " + this.type + ")");
	};
    };
}
