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

    <!-- Card Section -->
    <!-- <div class="card-section">
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="card-row">
        <food-cards
          v-for="(card, cardIndex) in row"
          :key="cardIndex"
          :imageSrc="card.imageSrc"
          :altText="card.altText"
          :title="card.title"
          :description="card.description"
          :link="card.link"
          :buttonText="card.buttonText"
        />
      </div>
    </div> -->


    <div class="card-section">
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="card-row">
        <food-cards
          v-for="(card, cardIndex) in row"
          :key="cardIndex"
          :title="card.name"
          :opensAt="card.opens_at"
          :address="card.address"
          :id="card.restaurant_id"
        />
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import FoodCards from '../components/FoodCards.vue';

export default {
  name: "LandingPage",
  components: {
    FoodCards,
  },
  data() {
    return {
      // Sample card data, you can replace this with your actual data
      restaurants: [],
      rows: [], // Array to store rows of cards
    };
  },
  mounted() {
    this.fetchRestaurants();
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
        const response = await axios.get('http://localhost:3000/restaurants'); // Replace with your actual backend URL
        this.restaurants = response.data.data;
        this.rows = this.chunkArray(this.restaurants, 5);
        console.log(this.restaurants)
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    },


  },
  created()
  {
    console.log(this.$cookies.get('token'));
  }
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
</style>
