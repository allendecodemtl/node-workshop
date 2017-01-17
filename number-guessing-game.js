var prompt = require('prompt');


function rungame() {
  // 
  // Start the prompt 
  // 
  prompt.start();

  // 
  // Get word from user
  // 
  prompt.get(['number'], function(err, result) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('  number: ' + result.number);

    if (result.number === "1") {
      console.log("You win");
    }
    else {
      console.log("Wrong, try again");
      rungame();
    }
  });
}

rungame();
