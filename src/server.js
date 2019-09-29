require("dotenv/config");
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");

const port = 3333;
const server = express();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

// this method 'use' its for add a file config in another file
server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || port, () =>
  console.log(`Server running ing localhost:${port}/`)
);
