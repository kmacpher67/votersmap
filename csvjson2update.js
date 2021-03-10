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
var rowsProcessed = 0;
var emptyDocument = 0;
var docExists = 0;
var MAXROWS = 99999;
var changedVoters = [];
var insertVoters = [];
var processed = false;
var processedVoterUpdate = false;
var updatedRecords = 0;
const NOW_ISO_DATE = new Date().toISOString();

csvtojson().fromFile(dataFileToLoad).then(csvData => {
    //console.log(csvData);
    console.log('csvtojson() mongodb.connect( is NEXT! ' + csvData.length)
    updateAllVoters(filterByVotersFromCSVData(csvData));
    });

function filterByVotersFromCSVData(csvData) {
    console.log('filterByVotersFromCSVData(csvData) { size length ' + csvData.length);
    // return csvData.filter(voter => voter.CITY == 'WARREN CITY' && !Boolean(voter.lastUpdate) );
    return csvData.filter(voter => !Boolean(voter.lastUpdate) );
}

function updateAllVoters(voters) {
    console.log('async function updateAllVoters(voters) { = ' + voters.length )
    // trying to replace insertMany with updateMany get error:  TypeError: Update document requires atomic operators 
    // adding upsert: true
    // https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/

    try {

        mongodb.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true},
            (err, client) => {
              if (err) throw err;
      
              var db = client.db("test");
            
              var votersCollection = db.collection('voters').initializeUnorderedBulkOp({useLegacyOps: true});
              var voterCollection = client.db("test").collection('voters');

              console.log('mongodb.connect( client going to updateMany db test voters... votersCollection=' + votersCollection);
              const session = client.startSession();
              console.log('before loop on changedVoter length client is connected=' + client.isConnected());

              const transactionOptions = {
                        readPreference: 'primary',
                        readConcern: { level: 'local' },
                        writeConcern: { w: 'majority' },
                        upsert: true,
                        setDefaultsOnInsert: true 
                    };
                    console.log('mongodb.connect( client .. session=' + session);

                    if (voters.length<MAXROWS) {
                        MAXROWS = voters.length;
                        console.log('voters.length lt < MAXROWS ' + MAXROWS);
                    }
                    //voters.length
                    for (i = 0; i < MAXROWS; i++) {
                        // rowsProcessed=rowsProcessed+1;
                        voter = voters[i];
                        changedVoters.push(voter);
                        //console.log(`voters.forEach( (voter ) => ${rowsProcessed} && voterid= ${voter.SOS_VOTERID}  ADDR ${voter.RESIDENTIAL_ADDRESS1} `);
                        var transactionResult = false;
                        // console.log('transactionResults forEach: anonymous callback function voter = ' + voter.RESIDENTIAL_ADDRESS1);
                        
                        //client.db("test").collection('voters')
                        voterCollection.findOne(voter,  function(err, document) { 
                            // console.log("document = " + document);
                            rowsProcessed=rowsProcessed+1;
                            if (err) {
                                console.log(err);
                            }
                            if (document && null != document.RESIDENTIAL_ADDRESS1 ) {
                                docExists=docExists+1;
                                var removeIndex = changedVoters.findIndex(function(item, i){
                                    return item.SOS_VOTERID === document.SOS_VOTERID;
                                  });
                                changedVoters.splice(removeIndex,1)
                                //console.log('docExists remove from changedVoters '+changedVoters.length+' - rowsProcessed='+rowsProcessed+ 'document.RESIDENTIAL_ADDRESS1='+document.RESIDENTIAL_ADDRESS1);
                            } else {
                                emptyDocument=emptyDocument+1;
                                // console.log(voter);
                                //console.log('changevoter.len='+changedVoters.length+' emptyDocument='+ emptyDocument + ',is updateVoter(=' + voter.SOS_VOTERID + ' addr=' + voter.RESIDENTIAL_ADDRESS1);
                                // console.log('"SOS_VOTERID":"'+ voter.SOS_VOTERID + '","RESIDENTIAL_ADDRESS1":"' + voter.RESIDENTIAL_ADDRESS1+'"');
                            }
                        });

                    }//voters.forEach voter 

                    console.log('READY, setTimeout(function() {');
                    setInterval(function() {
                        console.log('setInterval(function()rowsProcessed=' + rowsProcessed + ',emptyDocument=' +  emptyDocument + ',docExists=' + docExists +' client.isConnect'  + client.isConnected());

                        if (docExists + emptyDocument === MAXROWS) {

                            if (!processedVoterUpdate ) {
                                console.log('processing UPDATES processedVoterUpdate changedVoters.length=' + changedVoters.length);
                                // changedVoters
                                console.log('voterCollection.writeConcern=' + voterCollection.writeConcern);
                                
                                if (changedVoters.length >0 ) {
                                    changedVoters.forEach( (newvoter ) => {
                                        // updateVoter(newvoter, votersCollection);
                                        // bulk attempt is it faster?
                                        // bulkUpdateVoter(voter, votersCollection);
                                        var bulkwriteResults = bulkWriteVoter(newvoter, voterCollection);
                                        console.log('bulk update  ' + newvoter.SOS_VOTERID + ' result=' + JSON.stringify(bulkwriteResults ));
                                        // if (Object.keys(bulkwriteResults).length === 0) {
                                        //     newvoter.createDate = NOW_ISO_DATE;
                                        //     newvoter.lastUpdate = NOW_ISO_DATE;
                                        //     // insertVoters = changedVoters.filter(voter => voter.SOS_VOTERID === newvoter.SOS_VOTERID );
                                        //     insertVoters.push(newvoter);
                                            
                                        // }
                                        
                                    });// for forEach

                                    //voterCollection.bulkWrite.apply()
                                    //console.log('bulkwriteResults insertVoters '+NOW_ISO_DATE+' length = ' + insertVoters.length);
                                    // if (insertVoters.length>0) {
                                    //     //processNewVotersInsert(insertVoters, voterCollection);
                                    // }
                                    
                                } else {
                                    console.log('there are no changed voters')
                                }

                                processedVoterUpdate=true;
                                processed=true;
                            }

                            if (!processed) {
                                console.log(' should be done by now. emptyDocument'+ emptyDocument +'  docExists =' + docExists + ' bulk.length= ' + votersCollection.length);
                                // votersCollection.execute().then(result => {
                                //     setTimeout(function() {
                                //         console.log('BULK client.close(); processed ' +processed+' = ' + JSON.stringify(result,null,3));
                                //         console.log(' execute ..  + client.isConnected()='  + client.isConnected());
                                //         if (result.nModified > emptyDocument-1) {
                                //             client.close();

                                //         }
                                //     }, emptyDocument*10);
                                //     processed=true;
                                // })
                                // .catch(error => {
                                //     console.log('error in bulk execute=' +error);
                                // });

                            }
                        }
                        console.log('updatedRecords = ' + updatedRecords);
                        if (processed && updatedRecords === changedVoters.length && processedVoterUpdate) {         
                            client.close();
                            exit();
                        }
                    }, 9999);

                    // setTimeout(function() {
                    //     console.log('setTimeout(function() MAXROWS*3) if processed then clearInterval(); processed=' + processed);
                    //     if (processed) {
                    //         console.log('processed clearInterval... lets see if it stops' + processed)
                    //         clearInterval();
                    //     }
                    // }, 35000);
                
            }
          );


    } catch(e){
        console.log('csvData.forEach( (voter ) update  catch(e)=' + e);
    } finally {
        console.log('csvData.forEach( (voter ) update finally...');
    }
  }// update all Function 


function updateVoter(voter, voterCollection) {

    try {

    // mongodb.connect(
    //     url,
    //     { useNewUrlParser: true, useUnifiedTopology: true},
    //     (err, client) => {
    //         if (err) throw err;
    //         var db = client.db("test");
    console.log('voterCollection.isConnected()' + voterCollection.isConnected());
                voterCollection.updateOne({ SOS_VOTERID: voter.SOS_VOTERID}, processVoterIntoSetUpdateObject(voter), {upsert: true} );
    //         console.log('bulk updateVoter(voter){ ' + voter.SOS_VOTERID + ' addr=' + voter.RESIDENTIAL_ADDRESS1);
    //     });

    } catch(e){
        console.log('csvData.forEach( (voter ) update  catch(e)=' + e);
    }

}

function processVoterIntoSetUpdateObject(voter) {

    // var newvalues = {"$set":{}}; // { $set: {geometry: voter.SOS_VOTERID}};
    var newvalues = { $set: {lastUpdate: NOW_ISO_DATE }}; // { $set: {geometry: voter.SOS_VOTERID}};
    // newvalues.$set.totalVotes = changedVoters[i].totalVotes;
    
    // console.log(JSON.stringify(newvalues));

    Object.keys(voter).forEach(function(key) {
        //console.log('Key : ' + key + ', Value : ' + voter[key] + JSON.stringify(voter[key]) )
        newvalues.$set[key] = voter[key] ;
      })

    return newvalues;
}

function bulkUpdateVoter(voter, votersCollection) {
   // var newvalues = { $set: {lastUpdate: new Date().toISOString()}}; 
   // processVoterIntoSetUpdateObject(voter) 

    votersCollection.find({ SOS_VOTERID: voter.SOS_VOTERID}).upsert().update(processVoterIntoSetUpdateObject(voter));
    //votersCollection.findOneAndUpdate({ SOS_VOTERID: voter.SOS_VOTERID},newvalues)

    // votersCollection.execute().then(result => {
    //         console.log('result = ' + JSON.stringify(result,null,3));
    //         console.log(' execute ..  + client.isConnected()='  + client.isConnected());
    //         transactionResult=true;
    // });

}

async function bulkWriteVoter(voter, voterCollection) {
//  https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite/
//     const collection = context.services.get("mongodb-atlas").db("master").collection("fb_posts");


    var changeVoterData = processVoterIntoSetUpdateObject(voter);

    return await voterCollection.bulkWrite(
        [{ updateOne :
            {
                "filter": { SOS_VOTERID: voter.SOS_VOTERID},
                "update": changeVoterData, 
                "upsert": true
            }
        }]).then(function(results) {
            updatedRecords = updatedRecords +1;
            console.log('bulkWriteVoter voterCollection.bulkWrite(' + JSON.stringify(results)); // Use this to debug
          });

}

function processNewVotersInsert(insertVoters, voterCollection) {

    mongodb.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true},
        (err, client) => {
          if (err) throw err;
  
          console.log('processNewVotersInsert(insertVoters'+insertVoters.length+' mongodb.connect insertMany client=' + client.isConnected());
          client
            .db("test")
            .collection("voters")
            .insertMany(insertVoters, (err, res) => {
              if (err) {
                console.log('processNewVotersInsert ERROR=' + err);
                throw err;
              } 
  
              console.log(`processNewVotersInsert(insertVoters (insertVoters: ${res.insertedCount} rows`);
              client.close();
            });
        }
      );

}