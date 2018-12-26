var fs = require('fs');
const classFactory = require('./struct');
//const compiler = require('./compiler');

//
// Define constants
//
// We represent a song by various data structures
// these are 1-level objects which are represented on disk
// in json
//
// These constants are arrays of field definitions
//
const titleFields = ["title"];
const songwritersFields = ["songwriters"];
const timingFields = ["bpm", "beats_to_the_bar"];

//
// generic version function
//
exports.version = function() {
    return "This is version 1 of brill-song";
}

//
// the function open creates a song object serialised into the passed in
// directory. It wraps it in a closure and returns an api to it
//
exports.open = function(dir, songwriters) {
    var song = {};
    var api = {};

    // define some classes to contain information
    let Title = classFactory.makeStruct("title", titleFields);
    let Songwriters = classFactory.makeStruct("songwriters", songwritersFields);
    let Timing = classFactory.makeStruct("timing", timingFields);
    
    // define data elements
    song.is_valid = false;
    song.directory = dir;
    song.title = new Title("title");
    song.songwriters = new Songwriters("songwriters");
    song.timing = new Timing("timing");
    
    // set the data we have
    song.songwriters.set("songwriters", songwriters);
    
    // define api functions
    var dumpfn = function () {
	console.log("dumping the current song****************");
	console.log("directory   : " + song.directory);
	song.title.dump();
	song.songwriters.dump();
	console.log("dump end********************************");
    };

    var getFn = function(component, field) {
	var comp = song[component];
	return comp.get(field);
    }

    var setFn = function(val, component, field) {
	var comp = song[component];
	comp.set(field, val);
	write(component);
    }

    var compileFn = function() {
	console.log("compile the song into ruby");
	var contents = "make contents";
	var title = make_ruby(song.title.get("title"));
	write_file("/src/" + title, contents, ".rb");
    }
    
    // bind the closures to the return object
    api.dump = dumpfn;
    api.get = getFn;
    api.set = setFn;
    api.compile = compileFn;
    
    //
    // define internal functions
    //

    var write = function (component) {
	var contents = song[component];
	write_file(component, contents.get_json(), ".brill");
    };

    var does_file_exist = function (file) {
	var path = song.directory + "/" + file + ".brill";
 	try {
	    fs.accessSync(path, fs.constants.F_OK);
	    return true;
	} catch(err) {
	    return false;
	};
    };

    var write_file = function(filename, contents, filetype) {
	var path = song.directory + "/" + filename + filetype;
	fs.writeFile(path, contents, (err) => {
	    if(err) {
		console.log("error writing file: " + path + " giving " + err.msg)
	    }});
    };

    var read_file = function(filename) {
	var path = song.directory + "/" + filename + ".brill";
	return fs.readFileSync(path, 'utf-8', (err, data) => {
	    if (err) {
		console.log("file " + path + " does not exist");
	    }
	});
    };

    var make_ruby = function (string) {
	return string.toLowerCase()
	    .replace(/ /g, "_")
	    .replace(/[^a-zA-Z0-9_]/g, "");
    };
    
    var get_title = function () {
	var segments = song.directory.split('/');
	var length = segments.length;
	var title = segments[length - 1];
	song.title.set("title", title);
	return song.title.get_json();
    };
    
    var create_title = function () {
	var title = get_title();
	write_file("title", title, ".brill");
    }

    var create_songwriters = function () {
	var contents = song.songwriters.get_json();
	write_file("songwriters", contents, ".brill");
    }

    var create_timing = function () {
	write_file("timing", song.timing.get_json(), ".brill");
    }

    var create_src_dir = function () {
	fs.mkdirSync(song.directory + "/src");
    }
    
    var create_new = function () {
	create_title();
	create_songwriters();
	create_timing();
	// now make the compile output directory
	create_src_dir();
	song.is_valid = true;
    };

    var read_title = function () {
	var json = read_file("title");
	song.title.load_json(json);
    }

    var read_songwriters = function () {
	var json = read_file("songwriters");
	song.songwriters.load_json(json);
    }

    var read_timing = function () {
	var json = read_file("timing");
	song.timing.load_json(json);
    }
    
    var read_song = function () {
	read_title();
	read_songwriters();
	read_timing();
    }
    
    //
    // the main execution of the function
    //
    
    // first we check if the song is valid
    // there are two initial criteria
    // * if the song directory doesn't exist we can create it and are good to go
    // * if the song directory contains a title.brill file
    //   we assume it contains a song and try and load it file by file

    if (!does_file_exist("title")) {
	create_new();
    } else {
	read_song();
    };
    
    return api;
}

exports.sandbox = function () {
    let Banjo = classFactory.makeStruct("banjo", ["bobby", "jumpers"]);
    var myclass = new Banjo("ergo");
    var myobj = new Object();
    myobj.bobby = "rando";
    myobj.jumpers = "brando";
    var json = JSON.stringify(myobj);
    console.log("json is " + json);
    myclass.dump();
    myclass.load_json_into_class(json);
    myclass.dump();
    console.log(myclass.get_json());
}
