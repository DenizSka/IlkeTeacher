
const studentData = require('../models/studentDB');


module.exports = {

  index(req, res, next) {
    studentData.findAll()
      .then((students) => {
        console.log(students);
          res.locals.students = students;
          next();
        })
      .catch(err => next(err));
  },

  getOne(req, res, next) {
    studentData.findById(req.params.id)
      .then((student) => {
        console.log(student);
        res.locals.student = student;
        next();
      })
      .catch(err => next(err));
  },


  create(req, res, next) {
    studentData.save(req.body)
      .then(() => {
        next();
      })
      .catch(err => next(err));
  },


  bosForm(req, res, next) {
    const newStudent = {
      id: null,
      examname: null,
      examdate: null,
      firstname: null,
      lastname: null,
      examresult: null
    };
    res.locals.student = newStudent;
    next();
  },

  update(req, res, next) {
    req.body.id = req.params.id;
    studentData.update(req.body)
    .then((student) => {
      console.log(student, 'after post');
      res.locals.student = student;
      next();
    })
    .catch(err => next(err));
  },

  destroy(req, res, next) {
    studentData.destroy(req.params.id)
      .then((student) => {
        res.locals.student = student;
        next();
      })
      .catch(err => next(err));
  }
};
