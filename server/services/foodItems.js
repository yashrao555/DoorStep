const FoodItem = require('../models/foodItem')
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

  const getFoodItemsByRestaurantId = async (restaurantId) => {
    try {
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
  

  module.exports = { addFoodItem ,getFoodItemsByRestaurantId};