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
		throw(val + " should be a string");
	    };
	};
	break;
    case "boolean":
	return function (val) {
	    if (typeof(val) !== "boolean") {
		throw(val + " should be a boolean");
	    };
	};
	break;
    case "number":
	return function(val) {
	    if (isNaN(parseInt(val))) {
		throw(val + " should be a number");
	    };
	};
	break;
    default:
	throw(type + " is an invalid type");
    };
};

exports.is_type_valid = function (type) {
    for (i = 0; i < types.length; i++) {
	if (types[i] === type) {
	    return true;
	};
    };
    throw("Type " + type + " is not defined");
};
