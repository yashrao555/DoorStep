const express = require('express');
const { getAllRestaurants, getRestaurantById } = require('../services/restaurantService');

const restaurantController = express.Router()


restaurantController.get('/restaurants',async (req, res) => {
    try {
      // Call the service function to get all restaurants
      const restaurants = await getAllRestaurants();
  
      res.json({ data: restaurants });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  )

  restaurantController.get('/restaurants/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;
  
    try {
      // Call the service function to get a restaurant by ID
      const restaurant = await getRestaurantById(restaurantId);
  
      res.json({ data: restaurant });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  })

  module.exports = restaurantController