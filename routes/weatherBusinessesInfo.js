const express = require("express");

const weatherBusinessesInfoController = require("../controllers/weatherBusinessesInfo");

const router = express.Router();

router.get(
  "/weather-businesses-info",
  weatherBusinessesInfoController.getWeatherBusinessesInfo
);

module.exports = router;
