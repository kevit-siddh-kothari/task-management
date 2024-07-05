const mongodb = require("mongodb");
const mongoose = require("mongoose");
const { user } = require("./schema");
const express = require("express");
const MongoClient = mongodb.MongoClient;

//getting functionalities of express in app
const app = express();

//middlewear - handling req.body
app.use(express.urlencoded({ extended: false }));

//information nedded for connection to our Mongodb database
const connectionUrl = "mongodb://127.0.0.1:27017/task-app";
const databaseName = "task-manager";

//connecting to mongodb
//mongoose.connect returns a promise
mongoose
  .connect(connectionUrl)
  .then(() => console.log("Mongodb Connected sucessfully"))
  .catch((err) => console.log("Mongo error", err));

//Routes

// * Post Request
app.post("/user", async (req, res) => {
  const body = req.body;
  await user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    jobTitle: body.jobTitle,
  });
  res.status(200).json(body);
});

// * Get Request
app.get("/user", async (req, res) => {
  const a = await user.find();
  res.status(200).json(a);
});
app.get("/user/:na", async (req, res) => {
  const { na } = req.params;
  const data = await user.find({ firstName: na });
  console.log(data);
  res.status(200).json(data);
});

// * Delete Request
app.delete("/user", async (req, res) => {
  await user.deleteMany({});
  res.status(200).send(`Data Deleted Sucessfully`);
});
app.delete("/user/:na", async (req, res) => {
  const { na } = req.params;
  await user.deleteOne({ firstName: na });
  res.send("Data Deleted");
});

// * Patch Request
app.patch('/user/:na', async (req,res) => {
  const { na } = req.params;
  let data = await user.findOne({ firstName: na });
  const body = req.body
  console.log(req.body)
  for(a in body){
     data[a]=body[a]
  }
  await data.save()
  res.send('Data Updated sucessfully')
})

// * listening our application on port 8000
app.listen(8000, () => console.log("Listening on port 8000"));
