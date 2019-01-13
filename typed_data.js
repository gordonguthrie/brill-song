// this is a factory for creating data structures

exports.make = function(className, objDefinitions) {
    if (typeof className === "string" && typeof objDefinitions === "object") {
	return class {
	    constructor(name) {
		this.name = className;
		this.objDefinitions = objDefinitions;
		this.obj = make_obj(objDefinitions);
	    };

	    dump() {
		console.log("dumping");
		console.log(this);
	    };

	    load_json(json) {
		console.log("in load json");
		console.log(json);
	    };

	    get_json(path) {
		console.log("in get_json with path of " + path);
	    };

	    get(path) {
		var paths = make_paths(path);
		var getFn = function (obj, name) {
		    return obj[name];
		};
		return iterate(this.obj, this.objDefinitions, paths, getFn);
	    };

	    set(path, value) {
		var paths = make_paths(path);
		var setFn = function (obj, name, typeFn) {
		    typeFn(value);
		    obj[name] = value;
		    return "ok";
		};
		iterate(this.obj, this.objDefinitions, paths, setFn);
	    }
	};
    } else {
	throw("The function make takes a string as a name (1st param) and an array of object definitions (2nd param)");
    };
};


// helper classes

var iterate = function (obj, objDefinitions, paths, iteratorFn) {
    return iterate2(obj, objDefinitions, [], paths, iteratorFn);
};

var iterate2 = function(obj, objDefinitions, oldpath, paths, iteratorFn) {
    var head = paths[0];
    var tail = paths.slice(1);
    if (obj.hasOwnProperty(head)) {
	if (tail.length < 1) {
	    var typeFn = make_type_check_fn(objDefinitions, head);
	    return iteratorFn(obj, head, typeFn);
	} else {
	    var newobj = obj[head];
	    // not going to work
	    var newdef = objDefinitions[head];
	    oldpath.push(head);
	    return iterate2(newobj, newdef, oldpath, tail, iteratorFn);
	};
    } else {
	throw("No property " + head + " at path '" + oldpath.toString() + "'");
    };
};

var make_type_check_fn = function (objArray, key) {
    var type;
    for (var i = 0; i < objArray.length; i++) {
	if (objArray[i].name === key) {
	    type = objArray[i].type
	};
    };
    // this function should thrown an exception if the type doesn't match
    var fn = function (value) {
	switch (type) {
	case "string":
	    if (typeof(value) !== "string") {
		throw(value + " should be a string");
	    };
	    break;
	case "bool":
	    if (typeof(value) !== "boolean") {
		throw(value + " should be a boolean");
	    };
	    break;
	case "number":
	    if (isNaN(parseInt(value, 10))) {
		throw(value + " should be a number");
	    };
	    break;
	default:
	};
    };
    return fn;
};

    var make_paths = function (path) {
    var array = path.split(":");
    return array;
};

var make_obj = function (objDefinitions) {
    var objClosure = new Object();
    var path = "";
    var make_fn = function (objDef, localpath) {
	objClosure[objDef['name']] = "";
	return objClosure;
    };
    return make_2(objDefinitions, path, make_fn);
};

var make_2 = function (objDefinitions, path, func) {
    for (o in objDefinitions) {
	var objDef = objDefinitions[0];
	if (typeof objDef == "object") {
	    if (objDef.hasOwnProperty('name') && objDef.hasOwnProperty('type')) {
		if (objDef['type'] === "array") {
		    if (objDef.hasOwnProperty('array')) {
			var newpath;
			if (path === "") {
			    newpath = objDef['name'];
			} else {
			    newpath = path + "." + objDef['name'];
			};
			return make_2(objDef['array'], newpath, func);
		    } else {
			throw("Damaged array at path '" + path +"'");
		    };
		} else {
		    return func(objDef, path);
		};
	    } else {
		throw("Damaged object at path '" + path +"'");
	    };
	} else {
	    throw("Invalid object definition at '" + path + "'");
	};
    };
};
