const request = require('request');
const fs = require('fs');



const fetcher = () => {
  arg = process.argv.slice(2);
  if(arg[1].split('.').includes('html')) {
    const path = arg[1];
    let buffer;
    request(arg[0], (error, response, body) => {
      if (error) throw `could not open file: ${error}`; // Print the error if one occurred
      console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
      buffer = new Buffer(body); // Print the HTML for the Google homepage.
      if (response.statusCode === 200) {
        downloadContent(path, buffer);
      }
    });
  } else {
    throw `Error not a valid valid path`
  }
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