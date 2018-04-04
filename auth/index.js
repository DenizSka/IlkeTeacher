const express = require('express');
const router = express.Router();
const User = require('../models/loginDb');


function validUser(users){
  const validEmail = typeof users.email == 'string' &&
                    users.email.trim() != '';

  const validPassword = typeof users.password == 'string' &&
                     users.password.trim() != '' &&
                     users.password.trim().length >= 6;

  return validEmail && validPassword;

}
