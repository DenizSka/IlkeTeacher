// this file is meant to just initiate the pg-promise only once.
const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');
let databaseClient;

// wrong:
// const db = pgp(dbConfig);
// module.exports = db;


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
