
//i do not want to start pg promise in each file. In every npm start i get an error saying:
// WARNING: Creating a duplicate database object for the same connection.

const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');
// execute pgp with our db config, so a connection is made.
const db = pgp(dbConfig);


// In order to avoid the dublicate db creation I added the pg promise command to initilize file. And my plan was
// to call import pg promise when i needed. Below code is me trying to make that happen. This did not work too.

// import db from './initilize.js';
// const db = require('./initilize.js');
// const pgp = db.$config.pgp;

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
        FROM users
      ORDER BY id
    `);
  },

  findById(id) {
    return db.oneOrNone(`
    SELECT * FROM users
    WHERE id = $1
  `, id);
  },

//this function is not working. The purpose of this function is to take the email that the client wrote in to the sign up form page,
// and check if that email exists in the users table I created in the database.
  findByEmail(email) {
    return db.oneOrNone(`
    SELECT * FROM users
    WHERE email = '$email'
  `, email)
  },

  save(user) {
    //using pgpromise to SAVE ONE row, producing a new id
    return db.one(`
      INSERT
      INTO users
        (username, password, repassword, fullname, email)
      VALUES ($/username/, $/password/, $/repassword/, $/fullname/, $/email/)
      RETURNING *
      `, user)
  },

  update(user) {
    return db.one(`
      UPDATE users
      SET
       username = $/username/,
       password =  $/password/,
       repassword =  $/repassword/,
       fullname = $/fullname/,
       email = $/email/,
      WHERE id = $/id/
      RETURNING *
      `, user)
  },

  destroy(id) {
  return db.none(`
    DELETE
      FROM users
     WHERE id = $1
  `, id);
  }

}
