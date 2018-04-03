const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');
// execute pgp with our db config, so a connection is made.
const db = pgp(dbConfig);


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
