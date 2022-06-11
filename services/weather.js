const keys = require("../config/keys");
const axios = require("axios");
const _ = require("lodash");

const BASE_URL = "https://api.openweathermap.org";

const getCityLonLat = async (city, countryCode) => {
  const params = {
    q: `${city},${countryCode}`,
    appid: keys.APP_ID_WEATHER,
    /* optional: Number of the locations in the API response (up to 5 results can be returned in the API response) */
    limit: 1,
  };

  try {
    const result = await axios.get(BASE_URL + "/geo/1.0/direct", { params });

    if (!result.data || result.data.length === 0) {
      throw {
        status: 400,
        message:
          "No results were found for the city entered, please check the city and country code",
      };
    }

    return _.head(result.data);
  } catch (error) {
    throw error;
  }
};

const getWeatherByLonLat = async (req) => {
  const { city, countryCode } = req;

  try {
    const { lat, lon } = await getCityLonLat(city, countryCode);

    const params = {
      lat,
      lon,
      appid: keys.APP_ID_WEATHER,
    };
    const result = await axios.get(BASE_URL + "/data/2.5/weather", { params });

    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getCityLonLat,
  getWeatherByLonLat,
};
