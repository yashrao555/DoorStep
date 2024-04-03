const City = require("../models/city.js");
const RestaurantCity = require("../models/restaurantcity.js");
const Staff = require("../models/staff.js");



const getAllCities = async () => {
    try {
      // Retrieve all staff members from the database
      const allCities = await City.findAll();
  
      // Return the retrieved staff members
      return allCities;
    } catch (error) {
      console.error("Error retrieving cities:", error);
      throw new Error("Failed to retrieve cities");
    }
  };

const createEntry = async(restaurantId,cityId)=>{
  const existingEntry = await RestaurantCity.findOne({ where: { restaurantId, cityId } });
        if (existingEntry) {
            return error;
            
        }

        // If entry does not exist, create a new entry
        const result = await RestaurantCity.create({ restaurantId, cityId });
        return result;
}

const searchByCity = async(cityId)=>{
  const restaurantCityEntries = await RestaurantCity.findAll({ where: { cityId } });
  
  // Extract restaurantIds from restaurantCityEntries
  const restaurantIds = restaurantCityEntries.map(entry => entry.restaurantId);

  return ({ restaurantIds });
}

async function getCityId(cityName) {
  try {
      // Search for the city in the City table
      const city = await City.findOne({ where: { name: cityName } });

      if (!city) {
          return { error: 'City not found' }; // If city not found, return an error
      }

      // If city found, retrieve the cityId
      const cityId = city.id;

      return { cityId };
  } catch (error) {
      console.error('Error getting city id:', error);
      return { error: 'Internal server error' }; // If error occurs, return an error
  }
}

async function getCityName(cityId) {
  try {
      // Search for the city in the City table
      const city = await City.findOne({ where: { id: cityId } });

      if (!city) {
          return { error: 'City not found' }; // If city not found, return an error
      }

      return { cityName: city.name };
  } catch (error) {
      console.error('Error getting city name:', error);
      return { error: 'Internal server error' }; // If error occurs, return an error
  }
}


async function getCitiesForRestaurant(restaurantId) {
  try {
      const restaurantCities = await RestaurantCity.findAll({ where: { restaurantId } });
      const cityIds = [...new Set(restaurantCities.map(restaurantCity => restaurantCity.cityId))];
      const cities = await City.findAll({ where: { id: cityIds } });
      return cities;
  } catch (error) {
      throw new Error('Internal server error');
  }
}


async function getBranchForRestaurant(staffId) {
  try {
    console.log('kjhgfdsa');
      const staff = await Staff.findOne({ where: { id:staffId } });

      const cityIds = JSON.parse(staff.cityId) 
      console.log('city ids ',typeof(cityIds));
      //const cityIds = [...new Set(restaurantCities.map(restaurantCity => restaurantCity.cityId))];
      const cities = await City.findAll({ where: { id: cityIds } });
      return cities;
  } catch (error) {
      throw new Error('Internal server error');
  }
}


  module.exports = { getAllCities,createEntry,searchByCity,getCityId,getCityName,getCitiesForRestaurant,getBranchForRestaurant };