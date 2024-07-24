const { taskRouters } = require("./routes/tasks");
const {  userRouters } = require("./routes/users");
const express = require("express");
const connection = require("./connection");
const { logReqRes } = require("./middlewears/logs");
const { authentication } = require("./middlewears/auth");

//getting functionalities of express in app
const app = express();

//password :-  Lb6DzHJB97KMuw24   name :- siddhkothari  DkTVtEAZdH1mb3ng

// app.use((req,res,next)=>{
//     res.status(503).send('Site under Maintinance !')
// })

//middlewear - handling req.body
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("read.txt"));

//information nedded for connection to our Mongodb database (   ATLAS - Cloud Database)
const connectionUrl = "mongodb+srv://siddhkothari:DkTVtEAZdH1mb3ng@cluster0.u4umjsm.mongodb.net/Task-App";

//connecting to mongodb
connection.connectMongoDb(connectionUrl);

//Routes
app.use("/api/task", authentication, taskRouters);
app.use("/auth/user",  userRouters);

// * listening our application on port 8000
app.listen(8000, () => console.log("Listening on port 8000"));
