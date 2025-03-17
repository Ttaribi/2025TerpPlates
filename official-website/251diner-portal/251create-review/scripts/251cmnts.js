const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://mtaribi18:Yewaboma4!@tmt.r7y7civ.mongodb.net/';

// Database Name
const dbName = 'terpPlates';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

db.terpPlates.userComments.insert({'name':'doodoo'}, {'review': '251 is nice'});