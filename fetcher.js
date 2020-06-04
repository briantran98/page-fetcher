const request = require('request');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const fetcher = () => {
  arg = process.argv.slice(2);
  const path = arg[1];
  let doneReading = false;
  let buffer;
  request(arg[0], (error, response, body) => {
    if (error) throw `could not open file: ${error}`; // Print the error if one occurred
    console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
    buffer = new Buffer(body); // Print the HTML for the Google homepage.
    if (response.statusCode === 200) {
      exists(path, buffer);
    }
  });
};

const exists = (path, content) => {
  fs.stat(path, (err, stats) => {
    if (err) throw `couldn't check if file exist: ${err}`;
    if (stats.isFile()) {
      rl.question('File already exisits! Would you like to overwrite file? [y/n]', (answer) => {
        if (answer === 'y') {
          rl.close();
          downloadContent(path, content)
        }
        rl.close();
      });
    }
  });
};

const downloadContent = (path, content) => {
  fs.open(path, 'w', (err, fd) => {
    if (err) throw `could not open file: ${err}`;
    console.log(`test`)
    fs.write(fd, content, (err, bytes) => {
      if (err) throw `couldn't open file ${err}`
      fs.close(fd, () => {
        console.log(`Downloaded and saved ${bytes} bytes to ${path}`)
      })
    })
  });
}

fetcher();