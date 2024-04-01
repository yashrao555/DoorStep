const City = require("../models/city.js");



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



  module.exports = { getAllCities };