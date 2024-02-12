const express = require('express');
const { addFoodItem,getFoodItemsByRestaurantId } = require('../services/foodItems');
const { authenticateToken } = require('../util/verifyToken');

const foodController = express.Router()

foodController.post('/restaurants/addFoodItems', authenticateToken,async (req, res) => {
    const restaurantId  = req.restaurantId;
    const foodItemData = req.body;
    console.log(req.restaurantId);
  
    try {
      const newFoodItem = await addFoodItem(restaurantId, foodItemData);
      res.json({ message: 'FoodItem added successfully', data: newFoodItem });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to add FoodItem' });
    }
  });

  foodController.get('/restaurants/:restaurantId/getAllFoodItems',async(req,res)=>{
    const restaurantId  = req.params.restaurantId;
  
    try {
      const allFoodItems = await getFoodItemsByRestaurantId(restaurantId);
      res.json({ message: 'FoodItems fetched successfully', data: allFoodItems });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to fetch FoodItems' });
    }
  })

  module.exports = foodController