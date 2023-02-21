// Require the 'request' and 'fs' modules
const request = require("request");
const fs = require("fs");
const readline = require("readline");

// Get URL and file path arguments from the command line
const url = process.argv[2];
const filePath = process.argv[3];

// If either argument is missing, print an error message and exit the script
if (!url || !filePath) {
  console.error("Usage: node fetcher.js <url> <file-path>");
  process.exit(1);
}

// check if file path already exists
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (!err) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      `${filePath} already exists. Do you want to overwrite (Y/N)?`,
      (answer) => {
        rl.close();
        if (answer.toUpperCase() !== "Y") {
          console.log("Aborting...");
          process.exit(0);
        } else {
          // send GET request to URL
          downloadResources();
        }
      }
    );
  } else {
    // if file doesnt exist, send GET request
    downloadResources();
  }
});

const downloadResources = function () {
  // Send GET request to URL using 'request'
  request(url, (error, response, body) => {
    // print an error message and exit if there was an error
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }

    // print an error message and exit if status code is not 200
    if (response.statusCode !== 200) {
      console.error(`Request failed.\nStatus Code: ${response.statusCode}`);
      return;
    }

    // write the response body to the specified file path with 'fs' if the response is valid.
    fs.writeFile(filePath, body, (err) => {
      // print an error message and exit if there is an error writing file
      if (err) {
        console.error(`Error writing file: ${err.message}`);
        return;
      }

      // get file size
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log(`Erro getting file stats: ${err.message}`);
          return;
        }

        const fileSize = stats.size;
        // print success message
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}.`);
      });
    });
  });
};
