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
// Get longitute and latitute of geolocation of city
// 
prompt.get(['location'], function (err, result) {
	
	// 
	// Log the results. 
	// 
	console.log('Command-line input received:');
	console.log('Enter your location: ' + result.location);
  
	googleURL = googleURL + result.location;


	// Get geolocation of city
	request(googleURL, function(err, response) {
      if (err) {
        console.log("Something bad happened", err);
      }
      else {
        var searchResults = JSON.parse(response.body)
        
        var lat1 = Math.round(searchResults.results[0].geometry.location.lat*100)/100;
        var lon1 = Math.round(searchResults.results[0].geometry.location.lng*100)/100;
        
        console.log(result.location + " lat: "+ lat1);
        console.log(result.location + " lon: "+ lon1);
        
      }
      
      
      // Get geolocation of ISS
      request(url, function(err, response) {
        if (err) {
          console.log("Something bad happened", err);
        }
        else {
          var searchResults = JSON.parse(response.body)
  
          var lat2 = Math.round(searchResults.iss_position.latitude*100)/100;
          var lon2 = Math.round(searchResults.iss_position.longitude*100)/100;
        
          console.log("ISS lat: "+ lat2);
          console.log("ISS lon: "+ lon2);
          
        }
        
        
        // Calculate distance
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
        
        // Print distance between two locations
        console.log("Distance to iss: " + Math.round(d*100)/100);
        
        });
    });
});



