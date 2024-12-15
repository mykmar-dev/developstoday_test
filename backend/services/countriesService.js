const axios = require("axios");

async function getAvailableCountries() {
  const response = await axios.get(`${process.env.BASE_URL}/AvailableCountries`);
  return response.data;
}

let populationResponse, flagsResponse;

async function getCachedData() {
  if (!populationResponse || !flagsResponse) {
    [populationResponse, flagsResponse] = await Promise.all([
      axios.get(`${process.env.BASE_URL2}/countries/population`),
      axios.get(`${process.env.BASE_URL2}/countries/flag/images`),
    ]);
  }
  return {
    populationResponse: populationResponse.data.data,
    flagsResponse: flagsResponse.data.data,
  };
}

async function getCountryInfo(code) {
  const countryResponse = await axios.get(`${process.env.BASE_URL}/CountryInfo/${code}`);

  const countryData = countryResponse.data;
  const cache = await getCachedData();
  const populationData = cache.populationResponse.find(
    (c) => c.country === countryData.commonName
  );
  const flagData = cache.flagsResponse.find(
    (c) => c.name === countryData.commonName
  );
  return {
    countryData,
    populationData,
    flagData,
  };
}

module.exports = { getAvailableCountries, getCountryInfo };
