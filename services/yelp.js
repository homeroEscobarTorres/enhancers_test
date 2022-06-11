const keys = require("../config/keys");
const axios = require("axios");

const weatherServices = require("../services/weather");

const BASE_URL = "https://api.yelp.com/v3";

const getBusinessesCity = async (req) => {
  const { city, countryCode } = req;

  try {
    const { lat, lon } = await weatherServices.getCityLonLat(city, countryCode);

    const params = {
      latitude: lat,
      longitude: lon,
    };

    const result = await axios.get(BASE_URL + "/businesses/search", {
      headers: { Authorization: `Bearer ${keys.API_KEY_YELP}` },
      params,
    });

    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getBusinessesCity,
};
