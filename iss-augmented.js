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
        var lat1 = searchResults.results[0].geometry.location.lat;
        var lon1 = searchResults.results[0].geometry.location.lng;
      }
      
      request(url, function(err, response) {
        if (err) {
          console.log("Something bad happened", err);
        }
        else {
          var searchResults = JSON.parse(response.body)
          //console.log(searchResults);
          console.log(Math.round(searchResults.iss_position.latitude*100)/100);
          console.log(Math.round(searchResults.iss_position.longitude*100)/100);
          var lat2 = Math.round(searchResults.iss_position.latitude*100)/100;
          var lon2 = Math.round(searchResults.iss_position.longitude*100)/100;
        }
        
        // Distance calculation
        var R = 6371e3; // metres
        var φ1 = lat1.toRadians();
        var φ2 = lat2.toRadians();
        var Δφ = (lat2-lat1).toRadians();
        var Δλ = (lon2-lon1).toRadians();
        
        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        var d = R * c;
        
        console.log("Distance to the iss: " + Math.round(d*100)/100);
        
        });
    });
});



