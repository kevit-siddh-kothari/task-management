const express = require('express')
const auth = express.Router();
const Object = require('../controller/auth-controller')

auth.post('/signin', Object.SignIn)
auth.get('/login/:username/:password',Object.LogIn)

module.exports={
    auth
}