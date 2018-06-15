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

//this function is not working.

  // findByEmail(email) {
  //   return db.oneOrNone(`
  //   SELECT * FROM users
  //   WHERE email = '$email'
  // `, email)
  // },

// According to pg-promise's documentation, "Never use ES6 template strings or manual concatenation to generate queries"
// Replaced it with parameterized queries and used promise


  findByEmail(email) {
    // Promise is like event listener. But except A promise can only succeed or fail once.
    // you're less interested in the exact time something became available, and more interested in reacting to the outcome.
    // Promise - do a thing, possibly async,
    return new Promise((resolve, reject) => {
      db
      .oneOrNone('SELECT * FROM pendingusers WHERE email = $1', email)
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


    findByExistingEmail(email) {
    // Promise is like event listener. But except A promise can only succeed or fail once.
    // you're less interested in the exact time something became available, and more interested in reacting to the outcome.
    // Promise - do a thing, possibly async,
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

  save(id) {
    //using pgpromise to SAVE ONE row, producing a new id
    return db.oneOrNone(`
      INSERT
      INTO users (password, repassword, fullname, email)
      SELECT password, repassword, fullname, email FROM pendingusers
      WHERE id = $1;
      `, id)
  },

  findAllPending() {
    return db.many(`
      SELECT *
        FROM pendingusers
      ORDER BY id
    `);
  },

  findPendingById(id) {
    return db.oneOrNone(`
      SELECT * FROM pendingusers
      WHERE id = $1
  `, id);
  },

  save_pending(user) {
    //using pgpromise to SAVE ONE row, producing a new id
    return db.one(`
      INSERT
      INTO pendingusers
        (password, repassword, fullname, role, email)
      VALUES ($/password/, $/repassword/, $/fullname/, 'user', $/email/)
      RETURNING *
      `, user)
  },

  delete_pending_user(id){
  return db.none(`
    DELETE
      FROM pendingusers
     WHERE id = $1
  `, id);
  },



  update(user) {
    return db.one(`
      UPDATE users
      SET
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
