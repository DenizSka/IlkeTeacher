//i do not want to start pg promise in each file. In every npm start i get an error saying:
// WARNING: Creating a duplicate database object for the same connection.

const databaseClient = require('./initilize');
const db = databaseClient.getClient();

// In order to avoid the dublicate db creation I added the pg promise command to initilize file. And my plan was
// to call import pg promise when i needed. Below code is me trying to make that happen. This did not work too.
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
