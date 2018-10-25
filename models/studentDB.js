
const databaseClient = require('./initilize');
const db = databaseClient.getClient();



module.exports = {

  findAll() {
    return db.many(`
      SELECT *
        FROM students
      ORDER BY id
    `);
  },

  findById(id) {
    return db.oneOrNone(`
      SELECT * FROM students
      WHERE id = $1
  `, id);
  },

  save(student) {
    //using pgpromise to SAVE ONE row, producing a new id
    return db.one(`
      INSERT
      INTO students
        (examname, examdate, firstname, lastname, examresult)
      VALUES ($/examname/, $/examdate/, $/firstname/, $/lastname/, $/examresult/)
      RETURNING *
      `, student)
  },

  update(student) {
    return db.one(`
      UPDATE students
      SET
       examname = $/examname/,
       examdate = $/examdate/,
       firstname =  $/firstname/,
       lastname = $/lastname/,
       examresult = $/examresult/
      WHERE id = $/id/
      RETURNING *
      `, student)
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM students
       WHERE id = $1
    `, id);
  }


}
