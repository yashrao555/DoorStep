<template>
  <div>
    <!-- Banner Image -->
    <div class="banner">
      <img
        src="https://www.shutterstock.com/image-photo/healthy-meal-diet-plan-daily-260nw-1756843007.jpg"
        alt="Banner Image"
      />
      <div class="banner-text">
        <h1>DoorStep</h1>
        <p>From Our Kitchen To Your Doorstep !</p>
      </div>
    </div>

    <div class="search-bar">
      <input
        v-model="searchTerm"
        @input="searchRestaurants"
        type="text"
        placeholder="Search for restaurants..."
      />
      <button @click="clearSearch">Clear</button>
    </div>

<div v-if="nearbyRestaurants.length>0">
    <h2>Restaurants near you</h2>
    <div class="card-section">
      <div v-for="(row, rowIndex) in rows2" :key="rowIndex" class="card-row">
        <food-cards
          v-for="(card, cardIndex) in row"
          :key="cardIndex"
          :title="card.name"
          :opensAt="card.opens_at"
          :closesAt="card.closes_at"
          :address="card.address"
          :id="card.id"
        />
      </div>
    </div>
  </div>

    <h2>All Restaurants</h2>
    <div class="card-section">
      <div v-for="(row, rowIndex) in rows1" :key="rowIndex" class="card-row">
        <food-cards
          v-for="(card, cardIndex) in row"
          :key="cardIndex"
          :title="card.name"
          :opensAt="card.opens_at"
          :closesAt="card.closes_at"
          :address="card.address"
          :id="card.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FoodCards from "../components/FoodCards.vue";
import { jwtDecode } from "jwt-decode";
export default {
  name: "LandingPage",
  components: {
    FoodCards,
  },
  data() {
    return {
      // Sample card data, you can replace this with your actual data
      restaurants: [],
      nearbyRestaurants: [],
      rows1: [], // Array to store rows of cards
      rows2: [],
      searchTerm: "",
    };
  },
  mounted() {
    this.fetchRestaurants();
    this.fetchUserAddressAndFetchRestaurants();
    // Initialize rows with 4 cards each
  },
  methods: {
    // Helper function to chunk the array into rows
    chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
    },

    async fetchRestaurants() {
      try {
        const response = await axios.get("http://localhost:3000/restaurants"); // Replace with your actual backend URL
        this.restaurants = response.data.data;
        this.rows1 = this.chunkArray(this.restaurants, 5);
        console.log(this.restaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    },

    // Method to search restaurants based on user input
    async searchRestaurants() {
      try {
        const response = await axios.post(
          "http://localhost:3000/restaurants/search",
          {
            name: this.searchTerm,
          }
        );
        this.restaurants = response.data.data;
        this.rows1 = this.chunkArray(this.restaurants, 5);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    },

    // Method to clear the search and fetch all restaurants
    async clearSearch() {
      this.searchTerm = "";
      await this.fetchRestaurants();
    },

    async fetchUserAddressAndFetchRestaurants() {
  const token = this.$cookies.get("token");

  // Check if token is null
  if (!token) {
    console.error("Token is null. User is not authenticated.");
    return;
  }

  const decoded = jwtDecode(token);

  try {
    // Replace 'get-user-address' with your actual endpoint
    const userAddressResponse = await axios.get(
      `http://localhost:3000/get-user-address/${decoded.customerId}`
    );

    // Extract user's address from the response
    const userAddress = userAddressResponse.data.address;

    // Use user's address to fetch coordinates
    const coordinatesResponse = await axios.get(
      `http://localhost:3000/coordinates-from-address?address=${encodeURIComponent(
        userAddress
      )}`
    );

    // Extract latitude and longitude from the response
    const customerLat = coordinatesResponse.data.data.latitude;
    const customerLong = coordinatesResponse.data.data.longitude;

    // Use latitude and longitude to fetch nearby restaurants
    const restaurantsResponse = await axios.get(
      `http://localhost:3000/restaurants/sort-by-distance/${customerLat}/${customerLong}`
    );

    // Update the restaurants data in the component
    this.nearbyRestaurants = restaurantsResponse.data.data;
    this.rows2 = this.chunkArray(this.nearbyRestaurants, 5);
  } catch (error) {
    // Handle errors during API requests
    console.error("Error fetching data:", error);

    // Optionally, you can show a user-friendly error message to the user
    // this.errorMessage = "An error occurred while fetching data. Please try again.";
  }
},
  },
  created() {
    console.log(this.$cookies.get("token"));
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */

.banner {
  position: relative;
  width: 100%;
  height: 60vh; /* Adjust the height as needed */
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.banner-text {
  position: absolute;
  top: 20%;
  left: 20%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffa500;
  font-size: 180%;
}

h1 {
  font-size: 250%;
}

.card-section {
  display: flex;
  flex-wrap: wrap; /* Enable wrapping for cards */
  justify-content: center; /* Center the row of cards horizontally */
  padding: 2rem;
}

.card-row {
  display: flex;
  gap: 1rem;
}

.card {
  width: 18rem;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

.search-bar input {
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar button {
  border: none;
  background-color: #3498db;
  color: #fff;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
