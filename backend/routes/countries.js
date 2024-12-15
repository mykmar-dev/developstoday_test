const express = require('express');
const { getAvailableCountries, getCountryInfo } = require('../services/countriesService');
const router = express.Router();

router.get('/available', async (req, res) => {
  try {
    const countries = await getAvailableCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:code', async (req, res) => {
  try {
    const countryCode = req.params.code;
    const countryInfo = await getCountryInfo(countryCode);
    res.json(countryInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;