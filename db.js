const mongoose = require("mongoose");
require("dotenv").config();
// const mongodbUrl = process.env.db_LocalUrl; //local url database
const mongodbUrl = process.env.db_url; //online url database

mongoose.connect(
  mongodbUrl,
     {     //with any version it will able to work
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);



const db = mongoose.connection;

db.on("connected", () => {
  console.log("mongodb connected");
});

db.on("disconnected", () => {
  console.log("mongodb disconnected");
});

db.on("error", () => {
  console.log("some error");
});

module.exports = db;
