const express = require("express");
const bodyParser = require("body-parser");

const weatherBusinessesInfoRoutes = require("./routes/weatherBusinessesInfo");

const app = express();

// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/enhancers", weatherBusinessesInfoRoutes);

app.listen(8080);
