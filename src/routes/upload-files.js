const express = require('express');
const {fileUpload, fileDelete, fileView} = require('../controller/files-controller');
const fileRouter = express.Router();
const {upload} = require('../services/file-upload-services');

fileRouter.post('/me/avatar',upload.single('avatar'), fileUpload);
fileRouter.get('/user/:id/avatar', fileView)
fileRouter.delete('/me/avatar', fileDelete)

module.exports = {
    fileRouter
}