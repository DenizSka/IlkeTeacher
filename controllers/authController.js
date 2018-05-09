function ensureLoggedIn(req, res, next) {
  console.log('this is ensure loggedin', req.signedCookies);
  if(req.signedCookies.user_id){
    next();
  }else {
    res.status(401);
    next(new Error('Un-Authorized'));
  }
}

function allowAccess(req, res, next) {
  console.log('this is allow access', req.signedCookies.user_id);
  if(req.signedCookies.user_id == req.params.id){
    next();
  }else {
    res.status(401);
    next(new Error('Un-Authorized'));
  }
}


// Middleware
function isAdmin(req, res, next){
  console.log('user info', req.body.id)
  if(req.body.id == 1){
    next();
  } else {
    res.status(401);
    next(new Error('Un-Authorized'));
  }
}

module.exports ={
  ensureLoggedIn,
  allowAccess,

}
