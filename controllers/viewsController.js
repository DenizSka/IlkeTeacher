module.exports = {

  // Showing error status if the other comments do not work.
  // show404(err, req, res) {
  //   res.sendStatus(404);
  // },

  // show406(err, req, res) {
  //   res.sendStatus(406);
  // },


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

    // publications

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

}


