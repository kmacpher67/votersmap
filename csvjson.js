const mongodb = require("mongodb").MongoClient;

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";

// csvjson.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const csvtojson = require("csvtojson");

  // .fromFile("/home/kenmac/Downloads/personal/voters/TRUMBULL.txt")
  var dataFileToLoad = "/home/kenmac/personal/nestjs1/smstext/Trumbull-1615307475318.csv";
  console.log('csvtojson() - importing data file dataFileToLoad=' + dataFileToLoad);
csvtojson()
  .fromFile(dataFileToLoad)
  .then(csvData => {
    //console.log(csvData);
    console.log('csvtojson() mongodb.connect( is NEXT! ')

    // trying to replace insertMany with updateMany get error:  TypeError: Update document requires atomic operators 
    // adding upsert: true
    // https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/
    mongodb.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true},
        (err, client) => {
          if (err) throw err;
  
          console.log('mongodb.connect( client going to updateMany db test voters... client=' + client);
          client
            .db("test")
            .collection("trumb20210308")
            .insertMany(csvData, (err, res) => {
              if (err) throw err;
  
              console.log(`insertMany(csvData: ${res.insertedCount} rows`);
              client.close();
            });
        }
      );

  });

