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
        FROM projeler
      ORDER BY id
    `);
  },

  findById(id) {
    return db.oneOrNone(`
    SELECT * FROM projeler
    WHERE id = $1
  `, id);
  },

  save(proje) {
    //using pgpromise to SAVE ONE row, producing a new id
    return db.one(`
      INSERT
      INTO projeler
        (content,author,genre_type)
      VALUES ($/content/,$/author/,$/genre_type/)
      RETURNING *
      `, proje)
  },

  update(proje) {
    return db.one(`
      UPDATE projeler
      SET
       content = $/content/,
       author =  $/author/,
       genre_type = $/genre_type/
      WHERE id = $/id/
      RETURNING *
      `, proje)
  },

  destroy(id) {
  return db.none(`
    DELETE
      FROM projeler
     WHERE id = $1
  `, id);
  }

}
