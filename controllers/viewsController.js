module.exports = {

  // Showing error status if the other comments do not work.
  // show404(err, req, res) {
  //   res.sendStatus(404);
  // },

  // show406(err, req, res) {
  //   res.sendStatus(406);
  // },

// signup!!!

  // signupFormu(req, res){
  //   res.render('pages/signup');
  // },

  // ekle(req, res) {
  //   res.redirect('/home');
  // },


// login!!!

  // loginFormu(req, res){
  //   res.render('pages/login');
  // },

  // ekle(req, res) {
  //   res.redirect('/home');
  // },




//projects!!
  projeleriGoster(req, res) {
    res.render('projects/project-index', {
      data: res.locals.projeler,
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

  ekle(req, res) {
    res.redirect('/projects');
  },


  projeEditForm(req, res) {
    // console.log('inside of showEditForm function');
    res.render('projects/project-edit', {
      project: res.locals.project,
    });
  },

  projeUpdate(req, res) {
    res.redirect(`/projects/${req.params.id}`);
  },

  projeDelete(req, res) {
   res.redirect('/projects');
   },


// publications!!!

  publiGoster(req, res) {
    res.render('publications/publication-index', {
      pubdata: res.locals.publications,
    });
  },

  onePubli(req, res){
    res.render('publications/publication-single', {
      publication: res.locals.publication,
    });
  },

  publiFormu(req, res){
    res.render('publications/publication-add');
  },

  publiEkle(req, res) {
    res.redirect('/publications');
  },

  publiEditForm(req, res) {
    // console.log('inside of showEditForm function');
    res.render('publications/publication-edit', {
      publication: res.locals.publication,
    });
  },

  publiUpdate(req, res) {
    res.redirect(`/publications/${req.params.id}`);
  },

  handleDelete(req, res) {
   res.redirect('/publications');
   }

}


