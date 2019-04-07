var types =
    [
	"string",
	"boolean",
	"number",
	"timing"
    ];

exports.get_type_check = function (type) {

    switch (type) {
    case "string":
	return function (val) {
	    if (typeof(val) !== "string") {
		console.log(val + " should be a string");
		throw(val + " should be a string");
	    };
	};
	break;
    case "boolean":
	return function (val) {
	    if (typeof(val) !== "boolean") {
		console.log(val + " should be a boolean");
		throw(val + " should be a boolean");
	    };
	};
	break;
    case "number":
	return function(val) {
	    if (isNaN(parseInt(val, 10))) {
		console.log(val + " should be a number");
		throw(val + " should be a number");
	    };
	};
	break;
    case "timing":
	return function(obj) {
	    var msg = "should be an object with a 'swing' "
		+ "and an 'emphasis'";
	    if (typeof obj === "object" && obj !== null) {
		if (Object.keys(obj).length !== 2
		    || ! obj.hasOwnProperty("swing")
		    || ! obj.hasOwnProperty("emphasis")) {
		    console.log(msg);
		    console.log(obj);
		    throw(msg);
		}
		is_in_range(obj.swing, 0, 2.0);
		is_in_range(obj.emphasis, 0, 2.0);
	    } else {
		console.log(msg)
		console.log(obj);
		throw(msg);
	    };
	};
	break;
    default:
	console.log(type + " is an invalid type");
	throw(type + " is an invalid type");
    };
};

exports.is_type_valid = function (type) {
    for (i = 0; i < types.length; i++) {
	if (types[i] === type) {
	    return true;
	};
    };
    console.log("Type " + type + " is not defined");
    throw("Type " + type + " is not defined");
};


var is_in_range = function (val, lower, upper) {
    var num = parseFloat(val);
    if (isNaN(num)) {
	console.log(val + " should be a number");
	throw(val + " should be a number");
    };
    if (! (num >= lower && num <= upper)) {
	var msg = num + " should be between " + lower + " and " + upper;
	console.log(msg);
	throw(msg);
    };
};
