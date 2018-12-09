exports.version = function() {
    console.log("This is version 1 of the brill data package");
}

// open creates a song object serliased into the passed in directory
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

    // bind the closures to the return object
    api.dump = dumpfn;
    
    
    //
    // define internal functions
    //

    var does_file_exist = function () {
	console.log("checking if file exists");
	false;
    }
    
    //
    // the main execution of the function
    //
    
    // first we check if the song is valid
    // there are two initial criteria
    // * if the song directory doesn't exist we can create it and are good to go
    // * if the song directory contains a song.brill file
    //   we assume it contains a song and try and load it file by file

    if (!does_file_exist(song.directory)) {
	console.log("song doesn't exist lets create it");
    } else {
	console.log("song exists lets read it");
    }
    
    return api;
}
