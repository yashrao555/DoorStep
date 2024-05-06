const express = require('express');
const { getAllRestaurants, getRestaurantById, getRestaurantsByName, getRestaurantsByDistance, createOperatingTable, createSpecialOperatingTable } = require('../services/restaurantService');

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

  restaurantController.post('/restaurants/operating-time',async(req,res)=>{
    const result = await createOperatingTable(7,'10:30','18:30','09:30','23:30');
    res.json({data:result});
  })

  restaurantController.post('/restaurants/special-operating-time',async(req,res)=>{
    const result = await createSpecialOperatingTable(7,'05-05-2024','07-05-2024','12:30','16:30');
    res.json({data:result});
  })
  // restaurantController.post('/restaurants/changeTime',async(req,res)=>{
  //   const restaurant=await changeRestaurantTimings(1,'12:30','15:00');
  //   res.json({data:restaurant});
  // })
  module.exports = restaurantController