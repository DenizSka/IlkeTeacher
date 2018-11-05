// function ensureLoggedIn(req, res, next) {
//   console.log('this is ensure loggedin', req.signedCookies);
//   console.log(req);
//   if(req.signedCookies.user_id){
//     next();
//   }else {
//     res.status(401);
//     next(new Error('Un-Authorized'));
//   }
// }


function requireLogin (req, res, next) {
  console.log('this is requireLogin', req.session.user);
  if (!req.session.user) {
    res.status(401);
    next(new Error('Un-Authorized'));
  } else {
    next();
  }
}


// function allowAccess(req, res, next) {
//   console.log('this is allow access', req.signedCookies.user_id);
//   if(req.signedCookies.user_id == req.params.id){
//     next();
//   }else {
//     res.status(401);
//     next(new Error('Un-Authorized'));
//   }
// }


// Middleware
// function isAdmin(req, res, next){
//   console.log('user info', req.body.id)
//   if(req.body.id == 1){
//     next();
//   } else {
//     res.status(401);
//     next(new Error('Un-Authorized'));
//   }
// }

module.exports ={

  requireLogin

}
