const express = require('express');
const auth = express.Router();
const {signIn,logIn, logOut} = require('../controller/auth-controller');
const {authentication} = require('../middlewears/auth');

auth.post('/signin', signIn);
auth.get('/login/:username/:password',logIn);
auth.post('/logout',authentication, logOut);

module.exports={
    auth
};