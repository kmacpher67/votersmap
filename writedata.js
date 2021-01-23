// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});


const fs = require('fs')

fs.readFile('/home/kenmac/Downloads/personal/voters/TRUMBULL.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data.length)
})
let x=0
const readline = require('readline');
const { exit } = require('process');
const readInterface = readline.createInterface({
    input: fs.createReadStream('/home/kenmac/Downloads/personal/voters/TRUMBULL.txt'),    console: false
});

readInterface.on('line', (input) => {
    console.log(`Received: ${input}`);
    if (x == 0) {
        parseHeaders(input);
    }
    if (x>3) {
        exit(0);
    }

    x=x+1
  });

function  parseHeaders(line1) {


}

console.log("the end")
