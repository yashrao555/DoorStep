const express = require('express');
const { getAllRestaurants, getRestaurantById, getRestaurantsByName, getRestaurantsByDistance } = require('../services/restaurantService');

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

restaurantController.get('/restaurants/sort-by-distance/:customer_lat/:customer_long', async (req, res) => {
  const customerLat = parseFloat(req.params.customer_lat);
  const customerLong = parseFloat(req.params.customer_long);

  try {
    const sortedRestaurants = await getRestaurantsByDistance(customerLat, customerLong);
    res.json({ message: 'Restaurants sorted by distance', data: sortedRestaurants });
  } catch (error) {
    console.error('Error in restaurantController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});  


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

  restaurantController.post('/restaurants/search',async(req,res)=>{
    const {name} = req.body
    try {
      // Call the service function to get a restaurant by ID
      const restaurants = await getRestaurantsByName(name)
      res.json({ data: restaurants });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }

    
  })

  module.exports = restaurantController