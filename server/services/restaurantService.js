const Restaurant  = require('../models/restaurant'); // Adjust the path accordingly
const {Sequelize} = require("sequelize");
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

const getRestaurantsByName = async (name) => {
  try {
    const filteredRestaurants = await Restaurant.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name}%`, // Case-insensitive search
        },
      },
    });
    return filteredRestaurants;
  } catch (error) {
    console.error('Error fetching restaurants by name:', error);
    throw new Error('Failed to fetch restaurants by name');
  }
};

const getRestaurantsByDistance = async(customerLat, customerLong)=>{
  try {
    // Fetch all restaurants
    const allRestaurants = await Restaurant.findAll();

    // Calculate distance for each restaurant
    const restaurantsWithDistance = allRestaurants.map(restaurant => {
      const restaurantLat = parseFloat(restaurant.location_lat);
      const restaurantLong = parseFloat(restaurant.location_long);

      // Use Haversine formula to calculate distance
      const distance = haversineDistance(customerLat, customerLong, restaurantLat, restaurantLong);

      // Add the distance to the restaurant object
      return { ...restaurant.toJSON(), distance };
    });

    // Sort restaurants by distance
    const sortedRestaurants = restaurantsWithDistance.sort((a, b) => a.distance - b.distance);

    return sortedRestaurants;
  } catch (error) {
    console.error('Error sorting restaurants by distance:', error);
    throw new Error('Failed to sort restaurants by distance');
  }
}

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

  

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
  
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
module.exports = { getAllRestaurants,getRestaurantById,getRestaurantsByName,getRestaurantsByDistance };