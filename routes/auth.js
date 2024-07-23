const express = require('express');
const auth = express.Router();
const {signIn,logIn,logOut,logOutAll} = require('../controller/auth-controller');
const {authentication} = require('../middlewears/auth');

auth.post('/signin', signIn);
auth.get('/login/:username/:password',logIn);
auth.post('/logout',authentication, logOut);
auth.post('/logoutall',authentication, logOutAll);

module.exports={
    auth
};