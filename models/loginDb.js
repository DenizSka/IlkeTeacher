
const databaseClient = require('./initilize');
const db = databaseClient.getClient();


// WRONG way
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

  // findByEmail(email) {
  //   return db.oneOrNone(`
  //   SELECT * FROM users
  //   WHERE email = '$email'
  // `, email)
  // },


// According to pg-promise's documentation, "Never use ES6 template strings or manual concatenation to generate queries"
// Replaced it with parameterized queries and used promise


  findByEmail(email) {
    return new Promise((resolve, reject) => {
      db
      .oneOrNone('SELECT * FROM users WHERE email = $1', email)
      .then(user => {
        resolve(user);
      })
      .catch(error => {
        // do something with error
        console.error(error);
        reject(error);
      })
    })
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
