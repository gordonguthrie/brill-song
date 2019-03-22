var types =
    [
	"string",
	"boolean",
	"number"
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
	    if (isNaN(parseInt(val))) {
		console.log(val + " should be a number");
		throw(val + " should be a number");
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
