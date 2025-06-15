const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./Config/db");
const Router = require("./Router/ApiRouter");
const logger = require("./Config/logger.config");
var cookieParser = require("cookie-parser");
const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(cookieParser());
//  Database Connection
db;
app.use((req, res, next) => {
  logger.info(
    `Incoming request: Host:${req.headers.host} ${req.method} ${req.url
    } Body: ${JSON.stringify(req.body)} Params:${JSON.stringify(
      req.params
    )} Query:${JSON.stringify(req.query)}`
  );
  next();
});

app.use("/api", Router);
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at port http://localhost:${process.env.PORT}`
  );
});
