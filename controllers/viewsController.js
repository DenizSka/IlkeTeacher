module.exports = {

  // Showing error status if the other comments do not work.
  show404(err, req, res) {
    res.sendStatus(404);
  },

  show406(err, req, res) {
    res.sendStatus(406);
  },


  projeleriGoster(req, res) {
    res.render('projeler/proje-index', {
      data: res.locals.projeler,
      });
    },

    showOne(req, res){
      res.render('projeler/bir-proje', {
        proje: res.locals.proje,
      });
    }
}
