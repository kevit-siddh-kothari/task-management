const express = require('express');
const {fileUpload} = require('../controller/upload-files-controller');
const fileRouter = express.Router();

fileRouter.post('/me/avatar',fileUpload);

module.exports = {
    fileRouter
}