const express = require("express");
const router = require("./routes/router");
const handularErrors = require("./middlewares/handularErrors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(handularErrors);

module.exports = app;