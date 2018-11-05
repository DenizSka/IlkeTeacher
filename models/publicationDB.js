
const databaseClient = require('./initilize');
const db = databaseClient.getClient();


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
        (content, year, author, pdf)
      VALUES ($/content/, $/year/, $/author/,$/pdf/)
      RETURNING *
      `, publication)
  },

  update(publication) {
    return db.one(`
    UPDATE publications
    SET
       content = $/content/,
       year = $/year/,
       author =  $/author/,
       pdf = $/pdf/
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
