const Restaurant = require("../models/restaurant");

const OperatingHours = require("../models/operating_hours");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const SpecialOperatingHours = require("../models/special_operating_hours");
// Service function to fetch all restaurants
// const getAllRestaurants = async () => {
//   try {
//     const restaurants = await Restaurant.findAll();
//     return restaurants;
//   } catch (error) {
//     console.error('Error fetching restaurants:', error);
//     throw new Error('Failed to fetch restaurants');
//   }
// };

const getAllRestaurants = async () => {
  try {
    // Get current time
    const currentTime = new Date();

    // Extract current time in the format HH:MM:SS
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();
    const currentTimeString = `${currentHours}:${currentMinutes}:${currentSeconds}`;

    // Find restaurants where the current time is between opens_at and closes_at
    const restaurants = await Restaurant.findAll({
      where: {
        opens_at: {
          [Op.lte]: currentTimeString, // opens_at <= current time
        },
        closes_at: {
          [Op.gte]: currentTimeString, // closes_at >= current time
        },
      },
    });

    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw new Error("Failed to fetch restaurants");
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
    console.error("Error fetching restaurants by name:", error);
    throw new Error("Failed to fetch restaurants by name");
  }
};

const getRestaurantsByDistance = async (customerLat, customerLong) => {
  try {
    // Fetch all restaurants
    const allRestaurants = await Restaurant.findAll();

    // Calculate distance for each restaurant
    const restaurantsWithDistance = allRestaurants.map((restaurant) => {
      const restaurantLat = parseFloat(restaurant.location_lat);
      const restaurantLong = parseFloat(restaurant.location_long);

      // Use Haversine formula to calculate distance
      const distance = haversineDistance(
        customerLat,
        customerLong,
        restaurantLat,
        restaurantLong
      );

      // Add the distance to the restaurant object
      return { ...restaurant.toJSON(), distance };
    });

    // Sort restaurants by distance
    const sortedRestaurants = restaurantsWithDistance.sort(
      (a, b) => a.distance - b.distance
    );

    return sortedRestaurants;
  } catch (error) {
    console.error("Error sorting restaurants by distance:", error);
    throw new Error("Failed to sort restaurants by distance");
  }
};

const getRestaurantById = async (restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const sHours = await SpecialOperatingHours.findOne({
      where: {
        restaurant_id: restaurantId,
      },
    })

    const hours = await OperatingHours.findOne({
      where: {
        restaurant_id: restaurantId,
      },
    });

    if(sHours){
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      const firstDate = new Date(formattedDate)
      const secondDate = new Date(sHours.start_date)
      const thirdDate = new Date(sHours.end_date)
      if(firstDate>=secondDate && firstDate<=thirdDate)
        {
          console.log("Inside");
          restaurant.opens_at=convertISOToSequelizeDateTime(sHours.opening_time);
          restaurant.closes_at=convertISOToSequelizeDateTime(sHours.closing_time);
        }
        await restaurant.save()

        if (thirdDate < currentDate) {
          // Delete the record
          await sHours.destroy();
        }
        return restaurant;
    }

    else{

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Get the current day name
    const currentDate = new Date();
    // const currentDayName = daysOfWeek[currentDate.getDay()];

    if (currentDate.getDay() >= 0 && currentDate.getDay() <= 4) {
      restaurant.opens_at = convertISOToSequelizeDateTime(hours.weekday_opening_time);
      restaurant.closes_at = convertISOToSequelizeDateTime(hours.weekday_closing_time);
    } else {
      restaurant.opens_at = hours.weekend_opening_time;
      restaurant.closes_at = hours.weekend_closing_time;
    }

    await restaurant.save()
    return restaurant;
    }
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    throw new Error("Failed to fetch restaurant by ID");
  }
};

//  const changeRestaurantTimings  = async(restaurantId,new_opens_at,new_closes_at)=>{
//   try {
//     const restaurant = await Restaurant.findByPk(restaurantId);

//       if (!restaurant) {
//         throw new Error('Restaurant not found');
//       }

//       console.log(extractTimeFromTimestamp(restaurant.opens_at));
//       console.log(extractTimeFromTimestamp(restaurant.closes_at));

//       restaurant.old_opens_at=convertISOToSequelizeDateTime(restaurant.opens_at);
//       restaurant.old_closes_at=convertISOToSequelizeDateTime(restaurant.closes_at);

//       restaurant.opens_at=convertISOToSequelizeDateTime(convertTimeToISOString(new_opens_at));
//       restaurant.closes_at=convertISOToSequelizeDateTime(convertTimeToISOString(new_closes_at));

//       await restaurant.save()

//       delayAndRestoreTime(restaurantId);
//       return "Success";
//   } catch (error) {
//     return error;
//   }
//  }

const createOperatingTable = async (
  restaurantId,
  weekday_opening_time,
  weekday_closing_time,
  weekend_opening_time,
  weekend_closing_time
) => {
  try {
    const res = await OperatingHours.create({
      restaurant_id: restaurantId,
      weekday_opening_time,
      weekday_closing_time,
      weekend_opening_time,
      weekend_closing_time,
    });
    return res;
  } catch (error) {}
};

const createSpecialOperatingTable=async(restaurantId,from_date,to_date,opens_at,closes_at)=>{

  const res = await SpecialOperatingHours.create({
    restaurant_id:restaurantId,
    start_date:from_date,
    end_date:to_date,
    opening_time:opens_at,
    closing_time:closes_at
  })

  return res;

}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

async function delayAndRestoreTime(restaurantId) {
  await new Promise((resolve) => setTimeout(resolve, 1000 * 30)); // Wait for 30 seconds

  // Your logic to restore time values

  const restaurant = await Restaurant.findByPk(restaurantId);

  restaurant.opens_at = convertISOToSequelizeDateTime(restaurant.old_opens_at);
  restaurant.closes_at = convertISOToSequelizeDateTime(
    restaurant.old_closes_at
  );
  restaurant.old_opens_at = null;
  restaurant.old_closes_at = null;

  await restaurant.save();

  console.log("Callback function executed after 30 seconds.");
}

function extractTimeFromTimestamp(timestamp) {
  const date = new Date(timestamp);

  // Extract hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the time (e.g., "12:30")
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}

function convertTimeToISOString(timeString) {
  const epochDate = "1970-01-01"; // Epoch date string
  const datetimeString = `${epochDate}T${timeString}:00.000Z`; // Concatenate time with epoch date
  const date = new Date(datetimeString); // Create Date object
  return date.toISOString(); // Convert to ISO 8601 format
}

function convertISOToSequelizeDateTime(isoString) {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantsByName,
  getRestaurantsByDistance,
  createOperatingTable,
  createSpecialOperatingTable
};
