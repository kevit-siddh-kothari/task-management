const mongoose = require("mongoose");

async function connectMongoDb(connectionUrl) {
  return mongoose
    .connect(connectionUrl)
    .then(() => console.log("Mongodb Connected sucessfully"))
    .catch((err) => console.log("Mongo error", err));
}

module.exports={
    connectMongoDb
};