<template>
  <div class="restaurant-info-container">
    <div class="restaurant-details">
      <div class="name-address">
        <h1 class="restaurant-name">{{ restaurant.name }}</h1>
        <p class="restaurant-address">{{ restaurant.address }}</p>
        <p class="restaurant-timings">
          Opening Time: {{ restaurant.opens_at }} - Closing Time:
          {{ restaurant.closes_at }}
        </p>
        <p class="restaurant-distance">Distance: {{ distance }} km away</p>
      </div>
      <div class="rating">
        <p class="rating-text">Rating:</p>
        <div class="stars-container">
          <!-- Dynamically generate stars based on the restaurant's rating -->
          <span v-for="star in filledStars" :key="star" class="star"
            >&#9733;</span
          >
          <span v-for="star in emptyStars" :key="star" class="star"
            >&#9734;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
export default {
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  data(){
    return{
      distance:NaN
    }
  },
  mounted(){
    this.calculateDistance();
  },
  methods: {
    async calculateDistance() {
      const token = this.$cookies.get("token");

      // Check if token is null
      if (!token) {
        console.error("Token is null. User is not authenticated.");
        return;
      }

      const decoded = jwtDecode(token);
      try {
        // Fetch latitude and longitude for user's address from an API
        const userAddressResponse = await axios.get(
          `http://localhost:3000/get-user-address/${decoded.customerId}`
        );

        // Extract user's address from the response
        const userAddress = userAddressResponse.data.address;
        console.log('address ', userAddress)

        // Use user's address to fetch coordinates
        const coordinatesResponse = await axios.get(
          `http://localhost:3000/coordinates-from-address?address=${encodeURIComponent(
            userAddress
          )}`
        );

        console.log('coordinates ', coordinatesResponse)

        // Extract latitude and longitude from the response
        const customerLat = coordinatesResponse.data.data.latitude;
        const customerLong = coordinatesResponse.data.data.longitude;

        // Restaurant's latitude and longitude
        const restaurantLocation = {
          lat: this.restaurant.location_lat,
          lon: this.restaurant.location_long,
        };

        console.log('res coordinates ', restaurantLocation)

        // Calculate distance using Haversine formula
        const distance = this.calculateHaversineDistance(
          customerLat,
          customerLong,
          restaurantLocation.lat,
          restaurantLocation.lon
        );
        console.log('distqnce : ',distance.toFixed(2))

        this.distance = distance.toFixed(2); // Return distance rounded to 2 decimal places
      } catch (error) {
        console.error("Error calculating distance:", error);
        return "N/A";
      }
    },

    calculateHaversineDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Earth's radius in kilometers
      const dLat = this.toRad(lat2 - lat1);
      const dLon = this.toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance/100;
    },

    toRad(degrees) {
      return degrees * (Math.PI / 180);
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
