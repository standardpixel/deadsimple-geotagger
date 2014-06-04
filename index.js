var cli     = require('cli'),
    fs      = require('fs'),
    gpsUtil = require('gps-util');

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

		console.log('gpsData', gpsData);

	});

});

