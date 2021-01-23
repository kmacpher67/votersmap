// https://www6.ohiosos.gov/ords/f?p=VOTERFTP:DOWNLOAD::FILE:NO:2:P2_PRODUCT_NUMBER:78

const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const { exit } = require('process');
const { pipeline } = require('stream');


var datetimestring = new Date().getTime();
const dest = "Trumbull-" + datetimestring + ".csv";
console.log(dest);
const url = "https://www6.ohiosos.gov/ords/f?p=VOTERFTP:DOWNLOAD::FILE:NO:2:P2_PRODUCT_NUMBER:78";


    console.log('downloading...')
    var file = fs.createWriteStream(dest);

    http.get(url, response => {
        pipeline(
          response,
          file,
          err => {
            if (err)
              console.error('Pipeline failed.', err);
            else
              console.log('Pipeline succeeded.');
          }
        );
      });

    // var request = http.get(url, function(response) {
    //     console.log('response pipe...')
    //     response.pipe(file);
    //     console.log('finishing...')
    //     file.on('finish', function() {
    //         console.log('finishing... close')
    //         file.close(cb);  // close() is async, call cb after close completes.
    //     });
    // }).on('error', function(err) { // Handle errors
    //     console.log("error caught")
    //     fs.unlink(dest); // Delete the file async. (But we don't check the result)
    //     if (cb) cb(err.message);
    // });

    console.log('download = ' );

// const request = http.get("https://www6.ohiosos.gov/ords/f?p=VOTERFTP:DOWNLOAD::FILE:NO:2:P2_PRODUCT_NUMBER:78", function(response) {
//   response.pipe(file);
//   console.log("Trumbull.csv copmleted")
//     file.on('finish', function() {
//         file.close(cb);  // close() is async, call cb after close completes.
//     });
//     }).on('error', function(err) { // Handle errors
//     fs.unlink(dest); // Delete the file async. (But we don't check the result)
//     if (cb) cb(err.message);
//     });

// });