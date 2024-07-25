require('dotenv').config();
const { taskRouters } = require("./routes/tasks");
const {  userRouters } = require("./routes/users");
const {fileRouter} = require('./routes/upload-files');
const express = require("express");
const multer = require('multer')
const connection = require("./connection");
const { logReqRes } = require("./middlewears/logs");
const { authentication } = require("./middlewears/auth");

//getting functionalities of express in app
const app = express();

const port = process.env.PORT;

//  multer-(file upload)
const upload = multer({
    dest:'images',
    limits: {
        fileSize: 1000000 //number in bytes
    }
})      

//middlewear - handling req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("read.txt"));

const connectionUrl = "mongodb+srv://siddhkothari:DkTVtEAZdH1mb3ng@cluster0.u4umjsm.mongodb.net/Task-App";
//information nedded for connection to our Mongodb database (   ATLAS - Cloud Database )

//connecting to mongodb
connection.connectMongoDb(connectionUrl);

//Routes
app.use("/api/task", authentication, taskRouters);
app.use("/auth/user",  userRouters);
app.use('/upload', upload.single('avatar'), fileRouter);

// * listening our application on port 8000
app.listen(port, () => console.log(`Listening on port ${port}`));
