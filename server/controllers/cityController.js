const express = require('express');
const { getAllCities, createEntry, searchByCity, getCityId, getCityName, getCitiesForRestaurant } = require('../services/cityService');
const RestaurantCity  = require('../models/restaurantcity')
const City = require('../models/city')

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
  const { restaurantId, cityId } = req.body;
    try {
        const result = await createEntry(restaurantId,cityId)
        return res.status(201).json({message:result})

    } catch (error) {
        
        return res.status(500).json({ message: 'Internal server error' });
    }
});

cityController.post('/search-by-city', async (req, res) => {
  const {cityId} = req.body;
    try {
       
      const result = await searchByCity(cityId)
      return res.json(result)
    } catch (error) {
    
      res.status(500).json({ message: 'Internal server error' }); 
    }
  });


  cityController.post('/getCityId', async (req, res) => {
    try {
        const { cityName } = req.body; 
        const { cityId, error } = await getCityId(cityName);

        if (error) {
            return res.status(404).json({ message: error }); 
        }

        res.status(201).json({ cityId });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' }); 
    }
})
cityController.post('/getCityName', async (req, res) => {
  try {
      const { cityId } = req.body; 

      const { cityName, error } = await getCityName(cityId);

      if (error) {
          return res.status(404).json({ message: error }); 
      }

      res.status(201).json({ cityName });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' }); 
  }
});

cityController.get('/cities-for-restaurant', authenticateToken, async (req, res) => {
  try {
      const restaurantId = req.restaurantId;
      const cities = await getCitiesForRestaurant(restaurantId);
      res.status(201).json(cities);
  } catch (error) {
      console.error('Error retrieving cities for restaurant:', error);
      res.status(500).json({ error: error.message });
  }
});

module.exports = cityController