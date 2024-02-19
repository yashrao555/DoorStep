<template>
    <div class="food-item-container">
      <div class="food-item-details">
        <h2 class="food-item-name">{{ foodItem.name }}</h2>
        <!-- <p class="food-item-description">{{ foodItem.description }}</p> -->
        <p class="food-item-price">Price: {{ formattedPrice }}</p>
        <div class="add-to-cart">
          <span class="quantity-button" @click="decrementQuantity">-</span>
          <span class="quantity">{{ quantity }}</span>
          <span class="quantity-button" @click="incrementQuantity">+</span>
          <button class="add-to-cart-button" @click="addToCart">Add to Cart</button>
        </div>
      </div>
      <div class="food-item-image">
        <img :src="foodItem.image_url" alt="Food Item Image" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      foodItem: {
        type: Object,
        required: true,
      },
    },

    data() {
    return {
      quantity: 1,
    };
  },
  computed: {
    formattedPrice() {
      // Format the price based on the quantity
      return (this.foodItem.price * this.quantity).toFixed(2);
    },
  },
  methods: {
    incrementQuantity() {
      // Increase the quantity
      this.quantity++;
    },
    decrementQuantity() {
      // Decrease the quantity, but ensure it doesn't go below 1
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      this.$store.dispatch('addToCart', { foodItem: this.foodItem, quantity: this.quantity });
      console.log(`Added ${this.quantity} ${this.foodItem.name}(s) to the cart.`);
    },
  },

  };
  </script>
  
  <style scoped>
  .food-item-container {
    width: 70vw; /* Set the width to 70% of the viewport width */
    max-width: 600px; /* Set a maximum width if needed */
    margin: 20px auto; /* Center the container horizontally with margin */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
  
  .food-item-details {
  flex-grow: 1;
  padding: 5px; /* Adjust the padding as needed */
  text-align: left;
}

  
  .food-item-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .food-item-description {
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .food-item-price {
    font-size: 16px;
    color: #27ae60;
  }
  
  .food-item-image {
    width: 200px; /* Adjust the width of the image container */
    height: 130px; /* Adjust the height of the image container */
    overflow: hidden;
  }
  
  .food-item-image img {
    width: 100%;
    height:100%;
    object-fit: cover;
  }

  .add-to-cart {
  display: flex;
  align-items: center;
  margin-top: 5px; /* Adjust the margin as needed */
}


.add-to-cart .quantity-button {
   
  color: #0a0101; /* White text */
  border: none;
  border-radius: 50%; /* Rounded border */
  padding: 8px 12px;
  font-size: 20px;
  cursor: pointer;
}

.add-to-cart .quantity {
  margin: 0 10px;
  font-size: 16px;
}

.add-to-cart-button {
  background-color: #27ae60; /* Green color */
  color: #fff; /* White text */
  border: none;
  border-radius: 20px; /* Rounded border */
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;

}
  </style>
  