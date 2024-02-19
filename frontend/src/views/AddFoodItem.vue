<template>
    <div class="container">
      <div class="card">
        <h2>Add Food Items</h2>
        <div class="input-group">
          <label for="name">Food Item Name:</label>
          <input type="text" id="name" v-model="foodItem.name">
        </div>
        <div class="input-group">
          <label for="price">Price:</label>
          <input type="number" id="price" v-model="foodItem.price">
        </div>
        <div class="input-group">
          <label for="description">Description:</label>
          <input type="text" id="description" v-model="foodItem.description">
        </div>
        <div class="input-group">
          <label for="image_url">Image URL:</label>
          <input type="text" id="image_url" v-model="foodItem.image_url">
        </div>
        <button class="btn" @click="addFoodItem">Add Item</button>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
  export default {
    data() {
      return {
        foodItem: {
          name: '',
          price: '',
          description: '',
          image_url: '',
        },
      };
    },
    methods: {
      async addFoodItem() {
        try {
          // Make a request to your backend API
          const token = this.$cookies.get('token');
          console.log(token);
        const response = await axios.post('http://localhost:3000/restaurants/addFoodItems',this.foodItem,  {
            headers: {
                Authorization: `${token}`
            }
          });
  
          // Handle the response
          console.log(response.data);
          alert('Food item added successfully!');
        } catch (error) {
          console.error(error);
          alert('Failed to add food item.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin: 20px;
  }
  
  .card {
    background-color: #ffa500;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .input-group {
    margin-bottom: 10px;
  }
  
  .input-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .btn {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  