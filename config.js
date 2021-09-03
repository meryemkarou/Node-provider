require('dotenv').config()

const TwitterApi = require('twitter-api-v2').TwitterApi;
const cron = require('node-cron');
const express = require('express');
var Twitter = require('twitter');

//Import MongoClient & connexion à la DB
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'nodeProviderDb';
let db

// créer une instance d'Express
app = express();

var client = new Twitter({
      consumer_key: process.env.api_key,
      consumer_secret: process.env.api_secret_key,
      access_token_key: process.env.access_token,
      access_token_secret: process.env.access_token_secret
});

// Instanciate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi(process.env.bearer_token);
// Tell typescript it's a readonly app
const roClient = twitterClient.readOnly;

//await twitterClient.v2.get('tweets/search/recent', { query: 'nodeJS', max_results: 100 });
//const tweets = twitterClient.get('https://api.twitter.com/2/tweets/search/recent?query=nodeJS&max_results=100');


async function getRequest() {
    return twitterClient.get('https://api.twitter.com/2/tweets/search/recent?query=karoun&max_results=100');
}

(async () => {

    try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();


//var stream = client.stream('statuses/filter', {track: 'plage,tourisme,voyage'});
//stream.on('data', function(event) {
//  console.log(event && event.text);
//});


//tâches à exécuter
cron.schedule('* * * * *', function() {
  console.log('executer la tache chaque minute');

  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    db = client.db(dbName);

    const user = { name: "meryem", address: "Highway 37" };

    db.collection("customers").insertOne(user, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
  });

//  client.get('favorites/list', function(error, tweets, response) {
//    if(error) throw error;
//    console.log(tweets);  // The favorites.
//    console.log(response);  // Raw response object.
//  });

});

app.listen(3000);




