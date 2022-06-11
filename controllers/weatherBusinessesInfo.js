const axios = require("axios");

const weatherServices = require("../services/weather");
const yelpServices = require("../services/yelp");

exports.getWeatherBusinessesInfo = async (req, res, next) => {
  const { city, countryCode } = req.query;

  try {
    const cityWeather = await weatherServices.getWeatherByLonLat({
      city,
      countryCode,
    });

    const cityBusinesses = await yelpServices.getBusinessesCity({
      city,
      countryCode,
    });

    const result = {
      ...cityWeather,
      ...cityBusinesses,
    };

    return res.status(200).json(result);
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    return res.status(500).json(err);
  }
};
