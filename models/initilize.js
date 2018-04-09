//this file is meant to just initiate the pg-promise only once.
const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');
let databaseClient;

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
