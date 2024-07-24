const express = require('express');
const userRouters = express.Router();
const {signIn,logIn,logOut,logOutFromAllDevices} = require('../controller/users-controller');
const {authentication} = require('../middlewears/auth');

userRouters.post('/signup', signIn);
userRouters.post('/login',logIn);
userRouters.post('/logout',authentication, logOut);
userRouters.post('/logout-from-alldevices',authentication, logOutFromAllDevices);

module.exports={
    userRouters
};