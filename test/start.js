const expect = require("chai").expect;

const weatherServices = require("../services/weather");
const yelpServices = require("../services/yelp");
const weatherBusinessesInfoController = require("../controllers/weatherBusinessesInfo");

describe("Weather Service", () => {
  it("Should get city latitude and longitude correctly", async () => {
    const city = "torino";
    const countryCode = "IT";

    const correctLat = 45.0677551;
    const correctLon = 7.6824892;

    try {
      const result = await weatherServices.getCityLonLat(city, countryCode);

      expect(result).to.be.an("object");
      expect(result.lat).to.be.an("number");
      expect(result.lon).to.be.an("number");

      expect(result.lat).to.equal(correctLat);
      expect(result.lon).to.equal(correctLon);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  it("Should get city weather by latitude and longitude correctly", async () => {
    const city = "torino";
    const countryCode = "IT";

    const correctLat = 45.0678;
    const correctLon = 7.6825;

    try {
      const result = await weatherServices.getWeatherByLonLat({
        city,
        countryCode,
      });

      expect(result).to.be.an("object");

      expect(result.coord).to.be.an("object");
      expect(result.coord.lat).to.be.an("number");
      expect(result.coord.lon).to.be.an("number");

      expect(result.weather).to.be.an("array");
      expect(result.base).to.be.an("string");
      expect(result.main).to.be.an("object");
      expect(result.visibility).to.be.an("number");
      expect(result.wind).to.be.an("object");
      expect(result.clouds).to.be.an("object");
      expect(result.dt).to.be.an("number");
      expect(result.sys).to.be.an("object");
      expect(result.timezone).to.be.an("number");
      expect(result.id).to.be.an("number");
      expect(result.name).to.be.an("string");
      expect(result.cod).to.be.an("number");

      expect(result.coord.lat).to.equal(correctLat);
      expect(result.coord.lon).to.equal(correctLon);

      expect(result.timezone).to.equal(7200);
      expect(result.id).to.equal(3165524);
      expect(result.name).to.equal("Turin");
      expect(result.cod).to.equal(200);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
});

describe("Yelp Service", () => {
  it("Should get city businesses by latitude and longitude correctly", async () => {
    const city = "torino";
    const countryCode = "IT";

    const correctLat = 45.0677551;
    const correctLon = 7.6824892;

    try {
      const result = await yelpServices.getBusinessesCity({
        city,
        countryCode,
      });

      expect(result).to.be.an("object");
      expect(result.businesses).to.be.an("array");
      expect(result.total).to.be.an("number");
      expect(result.region).to.be.an("object");
      expect(result.region.center).to.be.an("object");
      expect(result.region.center.latitude).to.be.an("number");
      expect(result.region.center.longitude).to.be.an("number");

      expect(result.region.center.latitude).to.equal(correctLat);
      expect(result.region.center.longitude).to.equal(correctLon);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
});

describe("Controller", () => {
  it("Should get city weather and businesses by city name and country code correctly", async () => {
    const city = "torino";
    const countryCode = "IT";

    const req = {
      query: {
        city,
        countryCode,
      },
    };

    const res = {
      statusCode: 500,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        return data;
      },
    };

    const correctLatW = 45.0678;
    const correctLonW = 7.6825;

    const correctLatY = 45.0677551;
    const correctLonY = 7.6824892;

    try {
      const result =
        await weatherBusinessesInfoController.getWeatherBusinessesInfo(
          req,
          res,
          () => {}
        );

      expect(result).to.be.an("object");

      //WEATHER OBJECT
      expect(result.coord).to.be.an("object");
      expect(result.coord.lat).to.be.an("number");
      expect(result.coord.lon).to.be.an("number");

      expect(result.weather).to.be.an("array");
      expect(result.base).to.be.an("string");
      expect(result.main).to.be.an("object");
      expect(result.visibility).to.be.an("number");
      expect(result.wind).to.be.an("object");
      expect(result.clouds).to.be.an("object");
      expect(result.dt).to.be.an("number");
      expect(result.sys).to.be.an("object");
      expect(result.timezone).to.be.an("number");
      expect(result.id).to.be.an("number");
      expect(result.name).to.be.an("string");
      expect(result.cod).to.be.an("number");

      expect(result.coord.lat).to.equal(correctLatW);
      expect(result.coord.lon).to.equal(correctLonW);

      expect(result.timezone).to.equal(7200);
      expect(result.id).to.equal(3165524);
      expect(result.name).to.equal("Turin");
      expect(result.cod).to.equal(200);

      //YELP OBJECT
      expect(result.businesses).to.be.an("array");
      expect(result.total).to.be.an("number");
      expect(result.region).to.be.an("object");
      expect(result.region.center).to.be.an("object");
      expect(result.region.center.latitude).to.be.an("number");
      expect(result.region.center.longitude).to.be.an("number");

      expect(result.region.center.latitude).to.equal(correctLatY);
      expect(result.region.center.longitude).to.equal(correctLonY);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
});
