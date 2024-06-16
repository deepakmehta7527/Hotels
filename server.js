const express = require("express");
const app = express();
const db = require("./db");
const bodyparser = require("body-parser"); //it directly convert client json data into object format then we can perform operation
app.use(bodyparser.json()); //after convert into object store "req.body"

const personRouter=require("./routes/personRoutes");
const menuRouter=require("./routes/menuRoutes");
require('dotenv').config();

const port=process.env.port;
app.use("/person",personRouter);
app.use("/menu",menuRouter);



app.listen(port, () => {
  console.log("port running 3000");
});

