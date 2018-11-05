
const databaseClient = require('./initilize');
const db = databaseClient.getClient();



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
        (content, year, author, pdf)
      VALUES ($/content/, $/year/, $/author/, $/pdf/)
      RETURNING *
      `, proje)
  },

  update(proje) {
    return db.one(`
      UPDATE projeler
      SET
       content = $/content/,
       year = $/year/,
       author =  $/author/,
       pdf = $/pdf/
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
