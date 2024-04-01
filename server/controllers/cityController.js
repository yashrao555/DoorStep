const express = require('express');
const { getAllCities } = require('../services/cityService');
const RestaurantCity  = require('../models/restaurantcity')
const City = require('../models/city')
// const Order = require('../models/order')
// const RestaurantCity = require('../models/restaurantcity')
const { authenticateToken } = require('../util/verifyToken');

const cityController = express.Router()

cityController.get('/get-all-cities',async(req,res)=>{
    try {
        const result = await getAllCities();
        if (result) {
            res.json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        return res.status(500).json("No")
    }
})

cityController.post('/create-entry', async (req, res) => {
    try {
        const { restaurantId, cityId } = req.body;

        // Check if the entry already exists
        const existingEntry = await RestaurantCity.findOne({ where: { restaurantId, cityId } });
        if (existingEntry) {
            return res.status(400).json({ message: 'Entry already exists' });
            
        }

        // If entry does not exist, create a new entry
        await RestaurantCity.create({ restaurantId, cityId });
        res.status(201).json({ message: 'Branch added successfully' });
    } catch (error) {
        console.error('Error creating entry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

cityController.post('/search-by-city', async (req, res) => {
    try {
      const {cityId} = req.body; // Get the selected city name from the request body
    //   console.log('city name : ',cityName)
  
    //   // Search for the city in the City table
    //   const city = await City.findOne({ where: { name: cityName } });
  
    //   if (!city) {
    //     return res.status(404).json({ message: 'City not found' }); // If city not found, return 404
    //   }
  
    //   // If city found, retrieve the cityId
    //   const cityId = city.id;
  
      // Use the cityId to fetch restaurantIds from the RestaurantCity table
      const restaurantCityEntries = await RestaurantCity.findAll({ where: { cityId } });
  
      // Extract restaurantIds from restaurantCityEntries
      const restaurantIds = restaurantCityEntries.map(entry => entry.restaurantId);
  
      res.json({ restaurantIds });
    } catch (error) {
      console.error('Error searching for restaurants by city:', error);
      res.status(500).json({ message: 'Internal server error' }); // If error occurs, return 500
    }
  });


  cityController.post('/getCityId', async (req, res) => {
    try {
      const {cityName} = req.body; // Get the selected city name from the request body
      console.log('city name : ',cityName)
  
      // Search for the city in the City table
      const city = await City.findOne({ where: { name: cityName } });
  
      if (!city) {
        return res.status(404).json({ message: 'City not found' }); // If city not found, return 404
      }
  
      // If city found, retrieve the cityId
      const cityId = city.id;
  
      // Use the cityId to fetch restaurantIds from the RestaurantCity table
    //   const restaurantCityEntries = await RestaurantCity.findAll({ where: { cityId } });
  
    //   // Extract restaurantIds from restaurantCityEntries
    //   const restaurantIds = restaurantCityEntries.map(entry => entry.restaurantId);
  
      res.json({ cityId });
    } catch (error) {
      console.error('Error getting city id:', error);
      res.status(500).json({ message: 'Internal server error' }); // If error occurs, return 500
    }
  });

  cityController.post('/getCityName', async (req, res) => {
    try {
      const {cityId} = req.body; // Get the selected city name from the request body
    //   console.log('city name : ',cityName)
  
      // Search for the city in the City table
      const city = await City.findOne({ where: { id: cityId } });
  
      if (!city) {
        return res.status(404).json({ message: 'City not found' }); // If city not found, return 404
      }
  
      res.json({ city });
    } catch (error) {
      console.error('Error getting city id:', error);
      res.status(500).json({ message: 'Internal server error' }); // If error occurs, return 500
    }
  });

  cityController.get('/cities-for-restaurant', authenticateToken,async (req, res) => {
    try {
        // console.log('req ',req)
      // Get the current restaurant's ID from the request
      const restaurantId = req.restaurantId; // Assuming you have middleware to extract the restaurant ID from the token
  
      // Find all orders for the current restaurant
      const restaurantCities = await RestaurantCity.findAll({ where: { restaurantId: restaurantId } });
  
      // Extract unique city IDs from the orders
      const cityIds = [...new Set(restaurantCities.map(restaurantCity => restaurantCity.cityId))];
  
      // Find cities corresponding to the city IDs
      const cities = await City.findAll({ where: { id: cityIds } });
  
      res.json(cities);
    } catch (error) {
      console.error('Error retrieving cities for restaurant:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = cityController