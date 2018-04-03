const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');
// execute pgp with our db config, so a connection is made.
const db = pgp(dbConfig);
// const db = require('./initilize.js');
// const pgp = db.$config.pgp;

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

  update(publication) {
    return db.one(`
    UPDATE publications
    SET
    content = $/content/,
    author =  $/author/,
    genre_type = $/genre_type/
    WHERE id = $/id/
    RETURNING *
    `, publication)
  },

  destroy(id) {
  return db.none(`
    DELETE
      FROM publications
     WHERE id = $1
  `, id);
  }
}
