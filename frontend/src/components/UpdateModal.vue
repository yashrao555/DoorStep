<template>
    <div v-if="showModal" class="modal-container">
      <div class="modal-box">
        <h2>Update Food Item</h2>
  
        <!-- Your form fields for updating food items -->
        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="updatedFoodItemData.name" id="name" placeholder="Name" class="rounded-input" />
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input v-model="updatedFoodItemData.price" id="price" placeholder="Price" class="rounded-input" />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="updatedFoodItemData.description" id="description" placeholder="Description" class="rounded-input"></textarea>
        </div>
        <div class="form-group">
          <label for="image_url">Image URL:</label>
          <input v-model="updatedFoodItemData.image_url" id="image_url" placeholder="Image URL" class="rounded-input" />
        </div>
  
        <button class="update-button" @click="updateFoodItem">Update</button>
        <button class="close-button" @click="closeModal">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: Boolean,
      foodItem: Object,
    },
    data() {
      return {
        updatedFoodItemData: {
          name: '',
          price: '',
          description: '',
          image_url: '',
        },
      };
    },
    watch: {
      foodItem: {
        immediate: true,
        handler(newVal) {
          // Update the form fields with the data of the selected food item
          if (newVal) {
            this.updatedFoodItemData.name = newVal.name || '';
            this.updatedFoodItemData.price = newVal.price || '';
            this.updatedFoodItemData.description = newVal.description || '';
            this.updatedFoodItemData.image_url = newVal.image_url || '';
          }
        },
      },
    },
    methods: {
      closeModal() {
        this.$emit('closeModal');
      },
  
      updateFoodItem() {
        this.$emit('updateFoodItem', this.updatedFoodItemData);
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-box {
    background: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  textarea,
  .rounded-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd; /* Soft border color */
    border-radius: 8px; /* Rounded borders */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
    margin-top: 5px;
  }
  
  textarea {
    resize: vertical;
  }
  
  .update-button,
  .close-button {
    background-color: #ffa500;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .close-button {
    background-color: #666;
  }
  </style>
  