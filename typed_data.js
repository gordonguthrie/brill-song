// this is a factory for creating data structures

exports.make = function(className, objDefinitions) {
    if (typeof className === "string" && typeof objDefinitions === "object") {
	return class {
	    constructor(name) {
		this.name = className;
		this.objDefinitions = objDefinitions;
		this.obj = make_obj(objDefinitions);
	    };

	    dump(msg) {
		console.log(" ");
		if (msg === undefined) {
		    console.log("dumping");
		} else {
		    console.log("dumping: " + msg);
		};
		console.log("class is " + this.name);
		dump_definitions(this.objDefinitions);
		console.log("object is:");
		console.log(this.obj);
		console.log(" ");
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
		var getFn = function (objArray, name) {
		    for (o in objArray) {
			if (objArray[o][name] !== undefined) {
			    return objArray[o][name];
			};
		    };
		throw("getting: no object " + name + " in path " + path);
		};
		return iterate(this.obj, this.objDefinitions, paths, getFn);
	    };

	    set(path, value) {
		var paths = make_paths(path);
		var setFn = function (objArray, name, typeFn) {
		    typeFn(value);
		    for (o in objArray) {
			if (objArray[o][name] !== undefined) {
			    objArray[o][name] = value;
			    return "ok";
			};
		    };
		    throw("setting: no object " + name + " in path" + path);
		};
		iterate(this.obj, this.objDefinitions, paths, setFn);
	    }
	};
    } else {
	throw("The function make takes a string as a name (1st param) and an array of object definitions (2nd param)");
    };
};


// helper classes

var iterate = function (objArray, objDefinitions, paths, iteratorFn) {
//    console.log("in iterate aaaaaaaaa");
//    console.log(objArray);
//    console.log(objDefinitions);
//    console.log(paths);
//    console.log("aaaaaaaaaaaaaaaaaa");
    var ret = iterate2(objArray, objDefinitions, [], paths, iteratorFn);
    return ret;
};

var iterate2 = function(objArray, objDefinitions, oldpath, paths, iteratorFn) {
    var head = paths[0];
    var tail = paths.slice(1);
//    console.log("in iterate 2");
//    console.log(head);
//    console.log(tail);
//    console.log(objArray);
    for (o in objArray) {
	if (objArray[o].hasOwnProperty(head)) {
	    if (tail.length < 1) {
//		console.log("at 1");
		var typeFn = make_type_check_fn(objDefinitions, head);
		return iteratorFn(objArray, head, typeFn);
	    } else {
//		console.log("at 2");
		var newobj = objArray[o][head];
		// not going to work
		var newdef = objDefinitions[head];
		oldpath.push(head);
		return iterate2(newobj, newdef, oldpath, tail, iteratorFn);
	    };
	};
    };
//    console.log("at 3");
    var msg = "No property " + head + " at path '" + oldpath.toString() + "'";
    throw(msg);
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
    var path = "";
    var make_fn = function (objDef, localpath) {
	var obj = new Object();
	obj[objDef['name']] = "";
	return obj;
    };
    emptyObjArray = new Array();
    return make_2(emptyObjArray, objDefinitions, path, make_fn);
};

var make_2 = function (objArray, objDefinitions, path, func) {
    for (o in objDefinitions) {
	var objDef = objDefinitions[o];
	if (typeof objDef == "object") {
	    // we don't iterated down arrays when we create an
	    // empty object
	    if (objDef.hasOwnProperty('name') && objDef.hasOwnProperty('type')) {
		var newObj = func(objDef, path);
		objArray.push(newObj);
	    } else {
		throw("Damaged object at path '" + path +"'");
	    };
	} else {
	    throw("Invalid object definition at '" + path + "'");
	};
    };
    return objArray;
};

var dump_definitions = function (objDefs) {
    console.log("dumping the object defintion");
    for (o in objDefs) {
	console.log(objDefs[o]);
    };
};
