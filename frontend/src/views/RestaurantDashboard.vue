<template>
    <div>

        <div class="banner">
        <img
          src="https://www.shutterstock.com/image-photo/healthy-meal-diet-plan-daily-260nw-1756843007.jpg"
          alt="Banner Image"
        />
        <div class="banner-text">
          <h1>DoorStep</h1>
          <p>From Our Kitchen To Your Doorstep!</p>
          <h2 @click="openAddModal" class="add-item-link">Add an item?</h2>
        </div>
      </div>
  
      <!-- Card Section -->
      <div class="card-section">
        <div class="food-card" v-for="(foodItem, index) in foodItems" :key="index">
          <img :src="foodItem.image_url" :alt="foodItem.name" />
          <div class="food-details">
            <h3>{{ foodItem.name }}</h3>
            <h5>Price: {{ foodItem.price }}</h5>
            <button class="update-button"  @click="openUpdateModal(foodItem)">Update</button>
            <button class="update-button"  @click="openDeleteModal(foodItem)">Delete</button>
          </div>
        </div>
      </div>

      <AddItemModal
      :showModal="showAddModal"
      :foodItem="selectedFoodItem"
      @closeModal="closeModal"
      @addFoodItem="addFoodItem"
    />

      <UpdateModal
      :showModal="showUpdateModal"
      :foodItem="selectedFoodItem"
      @closeModal="closeModal"
      @updateFoodItem="updateFoodItem"
    />

    <DeleteModal
      :showModal="showDeleteModal"
      :foodItem="selectedFoodItem"
      @closeModal="closeModal"
      @deleteFoodItem="deleteFoodItem"
    />

    </div>
  </template>
  
  <script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
import {jwtDecode} from 'jwt-decode';
import UpdateModal from '@/components/UpdateModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import AddItemModal from '../components/AddItemModal.vue';

export default {
    name: "FoodItems",
    data() {
        return {
            foodItems: [],
            showUpdateModal: false,
            showDeleteModal: false,
            showAddModal: false,
            selectedFoodItem: null,
            restaurantId: null, // Variable to store the restaurant id
        };
    },
    mounted() {
        // Retrieve restaurant id from cookies
        this.restaurantId = VueCookies.get('token') ? this.decodeToken(VueCookies.get('token')).restaurantId : null;
        //console.log('decoded : ',this.decodeToken(VueCookies.get('token')))
        // Fetch food items using the restaurant id
        if (this.restaurantId) {
            this.fetchFoodItems(this.restaurantId);
        }
    },
    methods: {
        // Additional methods if needed
        decodeToken(token) {
            try {
                const decoded = jwtDecode(token);
                return decoded;
            }
            catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        },
        async fetchFoodItems(restaurantId) {
            try {
                const response = await axios.get(`http://localhost:3000/restaurants/${restaurantId}/getAllFoodItems`);
                this.foodItems = response.data.data;
                console.log(this.foodItems);
            }
            catch (error) {
                console.error('Failed to fetch food items:', error);
            }
        },
        openUpdateModal(foodItem) {
            this.selectedFoodItem = foodItem;
            console.log(this.selectedFoodItem)
            this.showUpdateModal = true;
        },
        openDeleteModal(foodItem){
          this.selectedFoodItem = foodItem;
            this.showDeleteModal = true;
        },
        openAddModal(){
         
            this.showAddModal = true;
        },
        
        closeModal() {
            this.showUpdateModal = false;
            this.showDeleteModal= false;
            this.showAddModal=false;
            this.selectedFoodItem = null;
        },

        addFoodItem(FoodItemData) {
            // Call your API to update the food item
          
            const token = this.$cookies.get('token');
            axios.post(`http://localhost:3000/restaurants/addFoodItems`, FoodItemData,{
    headers: {
      Authorization: `${token}`,
    },
  })
                .then(response => {
                // Handle success, e.g., close the modal and refresh the food items
                console.log('res : ',response)
                this.closeModal();
                this.fetchFoodItems(this.restaurantId);
            })
                .catch(error => {
                console.error('Failed to add food item:', error);
                // Handle error as needed
            });
        },

        deleteFoodItem(){
          const foodItemId = this.selectedFoodItem.food_item_id;
            console.log('id :',foodItemId)
            const token = this.$cookies.get('token');
            axios.delete(`http://localhost:3000/restaurants/delete-food-item/${foodItemId}`,{
    headers: {
      Authorization: `${token}`,
    },
  })
                .then(response => {
                // Handle success, e.g., close the modal and refresh the food items
                console.log('res : ',response)
                this.closeModal();
                this.fetchFoodItems(this.restaurantId);
            })
                .catch(error => {
                console.error('Failed to delete food item:', error);
                // Handle error as needed
            });
        },

        updateFoodItem(updatedFoodItemData) {
            // Call your API to update the food item
            const foodItemId = this.selectedFoodItem.food_item_id;
            console.log('id :',foodItemId)
            const token = this.$cookies.get('token');
            axios.put(`http://localhost:3000/restaurants/update-food-item/${foodItemId}`,updatedFoodItemData,{
    headers: {
      Authorization: `${token}`,
    },
  })
                .then(response => {
                // Handle success, e.g., close the modal and refresh the food items
                console.log('res : ',response)
                this.closeModal();
                this.fetchFoodItems(this.restaurantId);
            })
                .catch(error => {
                console.error('Failed to update food item:', error);
                // Handle error as needed
            });
        },
    },
    components: { UpdateModal, DeleteModal, AddItemModal }
};
</script>
  
<style scoped>
/* Add your component-specific styles here */
.banner {
    position: relative;
    width: 100%;
    height: 60vh;
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
.food-card {
  width: calc(33.33% - 140px); /* Adjust the width to fit 3 cards in a row with margin */
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
  overflow: hidden; /* Ensure the image doesn't overflow */
  position: relative; /* Position relative for absolute positioning of button */
}

.food-card img {
  width: 100%;
  height: 220px; /* Set a fixed height for uniformity */
  object-fit: cover; /* Cover the entire card with the image */
}

.food-card:hover {
  transform: scale(1.05);
}

.update-button {
  margin-bottom: 20px; /* Adjust margin from the bottom */
  margin-left: 20%;
  margin-top: 20px;
  transform: translateX(-50%);
  border-radius: 8px; /* Round the button border */
  border-color: #fff;
  background-color: #ffa500; /* Classy shade of orange */
  color: #fff; /* White text for better visibility */
  padding: 8px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.update-button:hover {
  background-color: #e57200; /* Darker shade on hover */
}

h2{
  font-size: 160%;
  cursor: pointer;
}

.card-section {
  display: flex;
  justify-content: space-around; /* Adjust spacing between cards */
  flex-wrap: wrap;
  padding: 2rem;
}

.food-details {
  margin-top: 10px;
}
</style>




  