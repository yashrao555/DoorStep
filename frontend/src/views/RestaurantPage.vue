<!-- src/components/RestaurantPage.vue -->
<template>
  <div>
    <div v-if="loading" class="loading-spinner"></div>

    <div v-else>
      <div v-if="restaurant" class="restaurant-page">
        <particular-restaurant :restaurant="restaurant"></particular-restaurant>
      </div>

      <div class="food-items-section">
        <hr class="solid1" />
        <h2 class="section-title">Menu</h2>
        <hr class="solid2" />
        <div class="menu-container">
          <div v-for="foodItem in restaurantMenu" :key="foodItem.id">
            <food-items
              :foodItem="foodItem"
              :currentRestaurantId="restaurantId"
              :currentCityId="cityId"
            />
          </div>
        </div>
        <!-- <router-link @click="navigateToPage2" to="/cart" class="go-to-cart-button">Go to Cart</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ParticularRestaurant from "@/components/ParticularRestaurant.vue";
import FoodItems from "@/components/FoodItems.vue";

export default {
  components: {
    ParticularRestaurant,
    FoodItems,
  },
  data() {
    return {
      loading:false,
      restaurant: null,
      restaurantMenu: [],
      restaurantId: 0,
      cityId: 0,
    };
  },
  mounted() {
    this.restaurantId = parseInt(this.$route.params.id1);
    this.cityId = parseInt(this.$route.params.id2);
    console.log("city id is : ", this.cityId);

    this.fetchRestaurantDetails(this.restaurantId);

    this.fetchRestaurantMenu(this.restaurantId);
    // setTimeout(() => {
    //   this.loading = false; 
    // }, 1000);
  },
  methods: {
    async fetchRestaurantDetails(restaurantId) {
      try {
        this.loading=true;
        const response = await axios.get(
          `http://localhost:3000/restaurants/${restaurantId}`
        );
        const { data } = response.data;
        this.restaurant = data;
        console.log(this.restaurant);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
      finally{
        this.loading=false;
      }
    },
    async fetchRestaurantMenu(restaurantId) {
      try {
        this.loading=true;
        // Make an HTTP request to fetch food items from the backend
        const response = await axios.get(
          `http://localhost:3000/restaurants/${restaurantId}/getAllFoodItems`
        );
        const { data } = response.data;
        this.restaurantMenu = data; // Update the restaurantMenu with the fetched data
        console.log("menu ", this.restaurantMenu);
      } catch (error) {
        console.error("Error fetching restaurant menu:", error);
      }
      finally{
        this.loading=false;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Titan+One&display=swap");

/* .scroll-container {
  width: 100vw;
  height: 130vh;
  overflow-y: auto;
} */

.restaurant-page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.food-items-section {
  margin-top: 20px;
  text-align: center;
}

.menu-container {
  /* max-width: 800px;  */
  margin: 0 auto; /* Center the container horizontally */
}

.section-title {
  font-size: 2vw;
  /* font-weight: bold; */
  margin-bottom: 2vh;
  margin-top: 2vh;
  font-family: "Titan One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

hr.solid1 {
  border-top: 3px solid #141212;
  margin-left: 31.5vw;
  width: 15vw;
}

hr.solid2 {
  border-top: 3px solid #141212;
  margin-left: 53vw;
  width: 15vw;
  /* margin-left: 1100px;
  width: 320px;
  margin-bottom: 20px; */
}

.go-to-cart-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #27ae60;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
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
</style>
