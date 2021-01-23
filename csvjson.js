const mongodb = require("mongodb").MongoClient;

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";


// csvjson.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nest', {useNewUrlParser: true, useUnifiedTopology: true});




const csvtojson = require("csvtojson");

csvtojson()
  .fromFile("/home/kenmac/Downloads/personal/voters/TRUMBULL.txt")
  .then(csvData => {
    //console.log(csvData);





    mongodb.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
          if (err) throw err;
  
          client
            .db("test")
            .collection("voters")
            .insertMany(csvData, (err, res) => {
              if (err) throw err;
  
              console.log(`Inserted: ${res.insertedCount} rows`);
              client.close();
            });
        }
      );

  });

