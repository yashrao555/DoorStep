const express = require('express');
const { addFoodItem,getFoodItemsByRestaurantId, updateFoodItem, deleteFoodItem } = require('../services/foodItems');
const { authenticateToken } = require('../util/verifyToken');

const foodController = express.Router()

foodController.post('/restaurants/addFoodItems', authenticateToken,async (req, res) => {
    const restaurantId  = req.restaurantId;
    const foodItemData = req.body;
    
  
    try {
      const newFoodItem = await addFoodItem(restaurantId, foodItemData);
      res.json({ message: 'FoodItem added successfully', data: newFoodItem });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to add FoodItem' });
    }
  });

  foodController.put('/restaurants/update-food-item/:food_item_id',authenticateToken,async(req,res)=>{
    const food_item_id=req.params.food_item_id
    const updatedFoodItemData = req.body;
    try {
      const updatedItem =await updateFoodItem(food_item_id,updatedFoodItemData)
      res.json({ message: 'FoodItem updated successfully', data: updatedItem });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update FoodItem' });
    }
  })

  foodController.delete('/restaurants/delete-food-item/:food_item_id', authenticateToken, async (req, res) => {
    const food_item_id = req.params.food_item_id;
  
    try {
      const deletedItem = await deleteFoodItem(food_item_id);
      res.json({ message: 'FoodItem deleted successfully', data: deletedItem });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete FoodItem' });
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