const mongodb = require("mongodb");
const mongoose = require("mongoose");
const { user } = require("./models/schema");
const {router} = require('./routes/user');
const {auth} = require('./routes/auth');
const express = require("express");
const connection = require('./connection');
const {logReqRes}  =  require('./middlewears/app');
//getting functionalities of express in app
const app = express();

//password :-  Lb6DzHJB97KMuw24   name :- siddhkothari  DkTVtEAZdH1mb3ng


//middlewear - handling req.body
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('read.txt'));


//information nedded for connection to our Mongodb database
const connectionUrl = "mongodb+srv://siddhkothari:DkTVtEAZdH1mb3ng@cluster0.u4umjsm.mongodb.net/Task-App";

//connecting to mongodb
//mongoose.connect returns a promise
connection.connectMongoDb(connectionUrl);

//Routes
app.use('/api/user', router);
app.use('/auth/user',auth);


// * listening our application on port 8000
app.listen(8000, () => console.log("Listening on port 8000"));
