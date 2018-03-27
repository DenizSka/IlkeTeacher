const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');
// execute pgp with our db config, so a connection is made.
const db = pgp(dbConfig);


module.exports = {

  findAll() {
    return db.many(`
      SELECT *
        FROM publications
      ORDER BY id
    `);
  },


  findById(id) {
    return db.oneOrNone(`
    SELECT * FROM publications
    WHERE id = $1
  `, id);
  },

  save(publication) {
    //using pgpromise to SAVE ONE row, producing a new id
    return db.one(`
      INSERT
      INTO publications
        (content,author,genre_type)
      VALUES ($/content/,$/author/,$/genre_type/)
      RETURNING *
      `, publication)
  },

}
