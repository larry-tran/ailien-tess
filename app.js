const express = require("express");
const router = express.Router();
const cors = require("cors");
const compression = require("compression");
const favicon = require("serve-favicon");
const logger = require("winston");
const path = require("path");
const tesseract = require("tesseract.js");
require("dotenv").config();

const app = express();
app.use(compression());
app.set("trust proxy", 1);
app.use(favicon(__dirname + "/public/www/favicon.ico"));
app.use(cors());

const server = app.listen(process.env.PORT || 4200, function () {
  logger.info("Server started on port: " + server.address().port);
});

app.get("/convert", (req, res) => {
  tesseract
    .recognize("./para.jpg", "vie")
    .then((out) => res.status(200).send(out.data.text));
});

app.get("/to", (req, res) => {
  res.status(200).send("halo");
});

router.use(
  express.static(
    path.join(
      __dirname,
      process.env["base-dir"] ? process.env["base-dir"] : "./public/www"
    )
  )
);

app.use("/", router);
module.exports = app;
