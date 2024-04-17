<template>
  <div>
    <div v-if="loading" class="loading-spinner"></div>
    <!-- Banner Image -->
    <!-- <div class="banner">
      <img
        src="https://www.shutterstock.com/image-photo/healthy-meal-diet-plan-daily-260nw-1756843007.jpg"
        alt="Banner Image"
      />
      <div class="banner-text">
        <h1>DoorStep</h1>
        <p>From Our Kitchen To Your Doorstep !</p>
      </div>
    </div> -->

    <div v-else class="search-bar text-center row justify-content-md-center">
      <div class="col-lg-6 col-md-12 col-sm-12 col-12">
        <input
          class="my-2"
          v-model="searchTerm"
          @input="searchRestaurants"
          type="text"
          placeholder="Search for restaurants..."
        />
      </div>

      <div class="col-lg-2 col-md-6 col-sm-6 col-6 ">
        <button class="my-2" @click="clearSearch">Clear</button>
      </div>

      <div
        class="filter-dropdown col-lg-4 col-md-6 col-sm-6 col-6"
        v-if="cities.length > 0"
      >
        <select
          class="my-2"
          v-model="selectedCity"
          @change="searchByCity(selectedCity)"
        >
          <option value="">Select a city</option>

          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
      </div>
    </div>

    <hr class="solid" />


    <div class="card-container" v-if="filteredRestaurant.length > 0">
      <h2 class="heading">Restaurants according to selected city</h2>
      <div class="card-section">
        <div v-for="(row, rowIndex) in rows3" :key="rowIndex" class="card-row">
          <food-cards
            v-for="(card, cardIndex) in row"
            :key="cardIndex"
            :title="card.name"
            :opensAt="card.opens_at"
            :closesAt="card.closes_at"
            :address="card.address"
            :id="card.id"
            :cityId="selectedCity"
          />
        </div>
      </div>
    </div>

    <hr v-if="filteredRestaurant.length > 0" class="solid" />

    <div class="card-container" v-if="nearbyRestaurants.length > 0">
      <h2 class="heading">Restaurants near you</h2>
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
            :cityId="currentCityId"
          />
        </div>
      </div>
    </div>
    <hr v-if="nearbyRestaurants.length > 0" class="solid" />

    <!-- <h2>All Restaurants</h2>
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
    </div>  -->
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
      loading: true,
      restaurants: [],
      nearbyRestaurants: [],
      rows1: [], // Array to store rows of cards
      rows2: [],
      rows3: [],
      searchTerm: "",
      cities: [], // Array to store cities fetched from the backend
      selectedCity: "",
      filteredRestaurant: [],
      currentCityId: null,
    };
  },
  mounted() {
    this.fetchRestaurants();
    this.fetchUserAddressAndFetchRestaurants();
    this.fetchCities();
    setTimeout(() => {
      this.loading = false; // Set loading to false when data is loaded
    }, 1000);
    // Initialize rows with 4 cards each
  },
  methods: {
    async fetchCities() {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-all-cities"
        );
        this.cities = response.data; // Assuming your API returns an array of cities
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    },

    async searchByCity(cityId) {
      
      // console.log('city : ',cityName)
      try {
        const response = await axios.post(
          "http://localhost:3000/search-by-city",
          { cityId }
        );
      
        

        // Extract restaurant IDs from the response
        const restaurantIds = response.data.restaurantIds;

        // Fetch restaurant details using restaurant IDs
        await this.fetchRestaurantDetails(restaurantIds);

      } catch (error) {
        console.error("Error searching restaurants by city:", error);
      }
    },

    async fetchRestaurantDetails(restaurantIds) {
      try {
        const promises = restaurantIds.map((restaurantId) =>
          axios.get(`http://localhost:3000/restaurants/${restaurantId}`)
        );

        const responses = await Promise.all(promises);

        // Extract restaurant details from the responses
        const restaurants = responses.map((response) => response.data.data);

        // Update the restaurants data in the component
        this.filteredRestaurant = restaurants;
        console.log("filtered ", this.filteredRestaurant);
        this.rows3 = this.chunkArray(this.filteredRestaurant, 5);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    },

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
        const cityName = userAddressResponse.data.city;

        const cityIdResponse = await axios.post(
          "http://localhost:3000/getCityId",
          { cityName }
        );
        this.currentCityId = cityIdResponse.data.cityId;

        console.log("current city is ", this.currentCityId);

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
      }
    },
  },
  created() {
    console.log(this.$cookies.get("token"));
  },
};
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap'); */
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Kalnia:wght@500&display=swap");

.scroll-container {
  height: 100vh;
  overflow-y: auto;
}

h1 {
  font-size: 250%;
}

.card-container {
  /* margin-left: 180px; */
  /* margin-right: 180px; */
  margin-left: 8vw;
  margin-right: 8vw;
  /* background-color: #0d0c0c; */
  /* width: 80vw; */
}

.card-section {
  display: flex;
  /* flex-wrap: wrap;  */
  /* justify-content: center;  */
  padding: 2rem;
  /* background-color: #3498db; */
}

.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  /* background-color: burlywood; */
}

.search-bar {
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  margin: 4rem 0;
}

.search-bar input {
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 1.5rem;
  margin-left: 8vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 40vw;
  height: 6vh;
  font-size: 22px;
}

.search-bar button {
  border: none;
  background-color: #3498db;
  color: #fff;
  border-radius: 20px;
  /* padding: 0.1rem 0.5rem; */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* width: 5vw; */
  width: 120px;
  height: 6vh;
  font-size: 22px;
  margin-right: 1vh;
}

.filter-dropdown {
  /* margin-right: 0.5rem; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  font-size: 20px;
  /* width: 10vw; */
}

.filter-dropdown select {
  border-radius: 20px;
  padding: 0.5rem;
  /* width: 8vw; */
  width: 150px;
  height: 6vh;
  background-color: #ddd;
  color: #0d0c0c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 33vw;

  /* margin-top: 0.5rem; */
  /* border-radius: 4px; */
}

hr.solid {
  border-top: 3px solid #bbb;
  margin: 3rem 210px;
}

.heading {
  font-family: "Kalnia", serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  margin-left: 30px;
  /* font-size:xx-large; */
}

.loading-spinner {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 400px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 990px) {
  .search-bar input {
    width: 80vw;
  }

  .filter-dropdown select {
    margin:auto
  }
}
</style>
