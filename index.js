exports.version = function() {
    console.log("This is version 1 of the brill data package");
}

var fs = require('fs');

// open creates a song object serialised into the passed in directory
// wraps it in a closure and returns an api to it
exports.open = function(dir) {
    var song = {};
    var api = {};
    
    // define data elements
    song.is_valid = false;
    song.directory = dir;

    // define api functions
    var dumpfn = function () {
	console.log("dumping the current song");
	console.log("directory is " + song.directory);
    };

    var dirtyfn = function (dirty) {
	console.log(dirty + " is dirty");
    }

    // bind the closures to the return object
    api.dump = dumpfn;
    api.mark_dirty = dirtyfn;
    
    //
    // define internal functions
    //

    var does_file_exist = function () {
	false;
    };

    var write_file = function(filename, contents) {
	var path = song.directory + "/" + filename + ".brill";
	fs.writeFile(path, contents, (err) => {
	    if(err) {
		alert("error writing file + err.msg")
	    }});
    };
    
    var get_title = function () {
	var segments = song.directory.split('/');
	var length = segments.length;
	var obj = new Object();
	obj.title =  segments[length - 1];
	return JSON.stringify(obj);
    };
    
    var create_title = function () {
	var title = get_title();
	write_file("title", title);
    }

    create_songwriters = function () {
	var songwriters;
	if (settings.hash('songwriters')) {
	    songwriter = settings.get('songwriters');
	} else {
	    songwriters = ""
	}
	var obj = new Object();
	obj.songwriter = songwriter;
	write_file("songwriters", JSON.stringify(obj));
    }
    
    var create_new = function () {
	create_songwriters();
	create_title();
    };
    
    //
    // the main execution of the function
    //
    
    // first we check if the song is valid
    // there are two initial criteria
    // * if the song directory doesn't exist we can create it and are good to go
    // * if the song directory contains a song.brill file
    //   we assume it contains a song and try and load it file by file

    if (!does_file_exist(song.directory)) {
	create_new();
    } else {
	console.log("song exists lets read it");
    }
    
    return api;
}
