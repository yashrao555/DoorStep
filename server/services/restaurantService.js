const Restaurant  = require('../models/restaurant'); // Adjust the path accordingly

// Service function to fetch all restaurants
const getAllRestaurants = async () => {
  try {
    const restaurants = await Restaurant.findAll();
    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error('Failed to fetch restaurants');
  }
};

const getRestaurantById = async (restaurantId) => {
    try {
      const restaurant = await Restaurant.findByPk(restaurantId);
  
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
  
      return restaurant;
    } catch (error) {
      console.error('Error fetching restaurant by ID:', error);
      throw new Error('Failed to fetch restaurant by ID');
    }
  };

module.exports = { getAllRestaurants,getRestaurantById };