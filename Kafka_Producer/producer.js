var fs = require("fs");
 console.log("\n *STARTING* \n");
// Get content from file
 var contents = fs.readFileSync("events.json");
// Define to JSON type
 var jsonContent = JSON.parse(contents);
 console.log(jsonContent);
 for(var o in jsonContent)
 {
     console.log(o.id);
 }