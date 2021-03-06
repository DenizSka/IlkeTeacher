module.exports = {

  // Showing error status if the other comments do not work.
  // show404(err, req, res) {
  //   res.sendStatus(404);
  // },

  // show406(err, req, res) {
  //   res.sendStatus(406);
  // },

// signup!!!

  signupFormu(req, res){
    res.render('pages/signup');
  },

  // addsignup(req, res) {
  //   res.render('login/login-single', {
  //     user: newuser,
  //   });
  // },


// login!!!

  loginFormu(req, res){
    res.render('pages/login');
  },

  adminPage(req, res){
    res.render('pages/admin');
  },


  logoutPage(req,res){
    res.render('login/logout');
  },

  // loggedIn(req, res) {
  //   res.redirect(`/login/${req.params.id}`);
  // },

  // showOnePerson(req, res){
  //   res.render('/users/user-single', {
  //     user: req.locals.user,
  //   });
  // },


//pending student:
  pendingStudent(req, res) {
    res.render('pending/pending-userpage', {
      pendingstudents: res.locals.pendingusers,
      });
    },

  // oneAcceptPending(req, res){
  //   res.render('pending/single-pending', {
  //     pendinguser: res.locals.pendinguser,
  //   });
  // },

  // acceptedPending(req, res){
  //   res.render('pending/accepted')
  // },

  pendingPage(req,res){
    res.render('pending/pending-note');
  },

  // handlePandingDelete(req, res) {
  //  res.render('pending/rejected');
  //  },

// students:
  showExams(req, res) {
    res.render('students/exam-index', {
      data: res.locals.students,
      });
    },


  // admin:
  showAdmin(req, res){
    res.render('students/exam-admin', {
      admins: res.locals.students,
    });
  },

  addForm(req, res){
    res.render('students/exam-add');
  },

  showAdminEkle(req, res) {
    res.redirect('/exam-results/admin');
  },

  showEkle(req, res) {
    res.redirect('/exam-results');
  },


  studentEditForm(req, res) {
    res.render('students/exam-edit', {
      student: res.locals.student,
    });
  },

  studentUpdate(req, res) {
    res.redirect('/exam-results/admin');
  },

  studentDelete(req, res) {
   res.redirect('/exam-results/admin');
   },

//projects!!
  projeleriGoster(req, res) {
    res.render('projects/project-index', {
      data: res.locals.projeler,
      });
    },

  projeleriAdminGoster(req, res) {
    res.render('projects/project-admin-index', {
      data: res.locals.projeler,
      });
    },

  showAdminOne(req, res) {
    res.render('projects/project-single-admin', {
      proje: res.locals.proje,
    });
  },

  showOne(req, res){
    res.render('projects/project-single', {
      proje: res.locals.proje,
    });
  },

  eklemeFormu(req, res){
    res.render('projects/project-add');
  },

  proEkle(req, res) {
    res.redirect('/projects/admin');
  },

  projeEditForm(req, res) {
    // console.log('inside of showEditForm function');
    res.render('projects/project-edit', {
      project: res.locals.project,
    });
  },

  projeUpdate(req, res) {
    res.redirect(`/projects/admin/${req.params.id}`);
  },

  projeDelete(req, res) {
   res.redirect('/projects/admin');
   },


// publications!!!

  publiGoster(req, res) {
    res.render('publications/publication-index', {
      pubdata: res.locals.publications,
    });
  },

  publiAdminGoster(req, res) {
    res.render('publications/publication-admin-index', {
      pubdata: res.locals.publications,
    });
  },

  onePubli(req, res){
    res.render('publications/publication-single', {
      publication: res.locals.publication,
    });
  },

  oneAdminPubli(req, res){
    res.render('publications/publication-single-admin', {
      publication: res.locals.publication,
    });
  },

  publiFormu(req, res){
    res.render('publications/publication-add');
  },

  publiEkle(req, res) {
    res.redirect('/publications/admin');
  },

  publiEditForm(req, res) {
    // console.log('inside of showEditForm function');
    res.render('publications/publication-edit', {
      publication: res.locals.publication,
    });
  },

  publiUpdate(req, res) {
    res.redirect(`/publications/admin/${req.params.id}`);
  },

  handleDelete(req, res) {
   res.redirect('/publications/admin');
   }
}


