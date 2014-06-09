//
// Dead Fucking Simple Geotagger
//
// Arguments:
//   -f (required) ~ A GPX File (~/Documents/file.gpx)
//   -t            ~ Time zone offset (-0700 would make 000 which is GMT, pacific time)
//

'use strict';

var cli      = require('cli'),
    fs       = require('fs'),
    gpsUtil  = require('gps-util'),
    Timeline = require('./models/timeline.js'),
    Content  = require('./models/content.js');

var keyedArgs   = {},
    usageString = 'Usage: > node deadsimple-geotagger -g [path to gpx file]',
    rawGeoData;

cli.main(function(args, options) {

	//
	// Deal with arguments
	//
	args.forEach(function(arg, i) {

		if (arg.substring(0,2) === '--') {
			return keyedArgs[arg.substring(2)] = args[i+1];
		}

		if (arg.substring(0,1) === '-') {
			return keyedArgs[arg.substring(1)] = args[i+1];
		}

	});

	//
	// Check for requierments
	//
	if (!keyedArgs['g']) {
		console.error(usageString);
		process.exit(1);
	}

	//
	// Read GPX file
	//
	if (fs.existsSync(keyedArgs['g'])) {
		rawGeoData = fs.readFileSync(keyedArgs['g'], {encoding:'utf8'});
	} else {
		console.error('The path ' + keyedArgs['g'] + ' is not valid.');
		process.exit(1);
	}

	//
	// Parse GPX file
	//

	gpsUtil.gpxParse(rawGeoData, function(err, gpsData) {

		//
		// Get Flickr data
		//

		//console.log('gpsData', gpsData);
		//console.log('flickrData', content['flickr']);

		//console.log(require('./test-data/flickr-people-photos.json'));

		var timeline = new Timeline(gpsData);

		var content = new Content(require('./test-data/flickr-people-photos.json').photos.photo);

		console.log('content', content.at(0).getType());

	});

});

