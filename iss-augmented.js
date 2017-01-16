var url = "http://api.open-notify.org/iss-now.json";
var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

var request = require('request');
var prompt = require('prompt');

Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }

// 
// Start the prompt 
// 
prompt.start();

// 
// Get longitute and latitute of geolocation
// 
prompt.get(['location'], function (err, result) {
	// 
	// Log the results. 
	// 
	console.log('Command-line input received:');
	console.log('Enter your location: ' + result.location);
	//console.log(result);
	
	googleURL = googleURL + result.location;
	//console.log(googleURL);
	
	request(googleURL, function(err, response) {
      if (err) {
        console.log("Something bad happened", err);
      }
      else {
        var searchResults = JSON.parse(response.body)
        console.log(searchResults.results[0].geometry.location.lat);
        console.log(searchResults.results[0].geometry.location.lng);
        
      }
    });
	
});

