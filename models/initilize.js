// this file is meant to just initiate the pg-promise only once.
const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

let databaseClient;

// According to pg-promise's documentation, "Never use ES6 template strings or manual concatenation to generate queries"
// EX Below:
// const db = pgp(dbConfig);
// module.exports = db;

// Replace it with parameterized queries and used promise.
module.exports = {
 initialize() {
   databaseClient = pgp(dbConfig);
 },

 getClient() {
   if (databaseClient == null) {
     this.initialize();
   }

   return databaseClient;
 }
};
