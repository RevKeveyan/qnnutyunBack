require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require('http');
const bodyParser = require("body-parser");

const DB = process.env.DB;
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

  
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`${PORT} Server started`);
});