const express = require('express');
const auth = express.Router();
const {signIn,logIn} = require('../controller/auth-controller');

auth.post('/signin', signIn);
auth.get('/login/:username/:password',logIn);

module.exports={
    auth
}