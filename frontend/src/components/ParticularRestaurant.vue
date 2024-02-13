<template>
    <div class="restaurant-info-container">
      <div class="restaurant-details">
        <div class="name-address">
          <h1 class="restaurant-name">{{ restaurant.name }}</h1>
          <p class="restaurant-address">{{ restaurant.address }}</p>
          <p class="restaurant-timings">
            Opening Time: {{ restaurant.operating_hours_start }} - Closing Time: {{ restaurant.operating_hours_end }}
          </p>
          <p class="restaurant-distance">Distance: {{ calculateDistance(restaurant.latitude, restaurant.longitude) }} km</p>
        </div>
        <div class="rating">
        <p class="rating-text">Rating:</p>
        <div class="stars-container">
          <!-- Dynamically generate stars based on the restaurant's rating -->
          <span v-for="star in filledStars" :key="star" class="star">&#9733;</span>
          <span v-for="star in emptyStars" :key="star" class="star">&#9734;</span>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      restaurant: {
        type: Object,
        required: true,
      },
    },
    methods: {
      calculateDistance(latitude, longitude) {
        // Assuming the user's location is available in the browser
        const userLatitude = 37.7749; // Replace with actual user's latitude
        const userLongitude = -122.4194; // Replace with actual user's longitude
  
        // Calculate distance (this is a simple calculation, you might want to use a more accurate formula)
        const distance = Math.sqrt(
          Math.pow(userLatitude - latitude, 2) + Math.pow(userLongitude - longitude, 2)
        );
  
        // Return distance in kilometers (you might want to use a more accurate conversion)
        return distance.toFixed(2);
      },
    },
    computed: {
    filledStars() {
      // Calculate the number of filled stars based on the restaurant's rating
      const rating = this.restaurant.rating || 0; // Default to 0 if rating is not provided
      return Array.from({ length: Math.floor(rating) }, (_, index) => index);
    },
    emptyStars() {
      // Calculate the number of empty stars based on the restaurant's rating
      const rating = this.restaurant.rating || 0; // Default to 0 if rating is not provided
      return Array.from({ length: Math.ceil(5 - rating) }, (_, index) => index);
    },
  },
  };
  </script>
  
  <style scoped>
  .restaurant-info-container {
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px; /* Optional: Add margin to separate multiple restaurants */
  }
  
  .restaurant-details {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  
  .name-address {
    text-align: left;
  }
  
  .restaurant-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .restaurant-address {
    font-size: 14px;
  }
  
  .rating {
    text-align: right;
  }
  
  .rating-text {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .stars-container {
    font-size: 24px;
  }
  
  .star {
    color: #f1c40f;
    margin-right: 2px;
  }
  
  .restaurant-timings,
  .restaurant-distance {
    font-size: 14px;
    margin-top: 5px;
    color: #555;
  }
  </style>
  