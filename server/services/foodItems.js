const FoodItem = require('../models/fooditem')
const Restaurant = require('../models/restaurant')


const addFoodItem = async (restaurantId, foodItemData) => {
    try {
      // Check if the restaurant with the given ID exists
      const restaurant = await Restaurant.findByPk(restaurantId);
  
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
  
      // Create a new FoodItem associated with the specified Restaurant
      const newFoodItem = await FoodItem.create({
        ...foodItemData,
        restaurant_id: restaurantId,
      });
  
      console.log('New FoodItem created:', newFoodItem.toJSON());
  
      return newFoodItem;
    } catch (error) {
      console.error('Error adding FoodItem:', error);
      throw error; // Propagate the error to the calling function or route handler
    }
  };

  const updateFoodItem = async (food_item_id, updatedFoodItemData) => {
    try {
      // Check if the FoodItem with the given ID exists
      const existingFoodItem = await FoodItem.findByPk(food_item_id);
  
      if (!existingFoodItem) {
        throw new Error('FoodItem not found');
      }
  
      // Update the existing FoodItem data
      await existingFoodItem.update({
        ...updatedFoodItemData
       
      });
  
      console.log('FoodItem updated successfully:', existingFoodItem.toJSON());
  
      return existingFoodItem;
    } catch (error) {
      console.error('Error updating FoodItem:', error);
      throw error; // Propagate the error to the calling function or route handler
    }
  };
  
  const deleteFoodItem = async (food_item_id) => {
    try {
      // Check if the FoodItem with the given ID exists
      const existingFoodItem = await FoodItem.findByPk(food_item_id)
  
      if (!existingFoodItem) {
        throw new Error('FoodItem not found');
      }
  
      // Delete the FoodItem
      const deletedItem = await existingFoodItem.destroy();
  
     
  
      return deletedItem;
    } catch (error) {
      console.error('Error deleting FoodItem:', error);
      throw error; // Propagate the error to the calling function or route handler
    }
  };
  

  const getFoodItemsByRestaurantId = async (restaurantId) => {
    try {
      console.log("RestId",restaurantId);
      // Find all FoodItems with the specified restaurant_id
      const foodItems = await FoodItem.findAll({
        where: {
          restaurant_id: restaurantId,
        },
      });
  
      return foodItems;
    } catch (error) {
      console.error('Error fetching FoodItems:', error);
      throw new Error('Failed to fetch FoodItems');
    }
  };
  

  module.exports = { addFoodItem ,getFoodItemsByRestaurantId,updateFoodItem,deleteFoodItem};