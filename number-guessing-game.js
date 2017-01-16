var prompt = require('prompt');

  // 
  // Start the prompt 
  // 
  prompt.start();
 
  // 
  // Get word from user
  // 
  prompt.get(['word'], function (err, result) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('  word: ' + result.word);
    
    if (result.word === "test"){
        console.log("You win");
    } else {
        console.log("Wrong, try again");
    }
    
    
  });