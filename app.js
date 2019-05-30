"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes");
// globals variales
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api", api);
module.exports = app;
