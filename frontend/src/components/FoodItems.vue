<template>
  <div class="food-item-container">
    <div class="food-item-details">
      <h2 class="food-item-name">{{ foodItem.name }}</h2>
      <p class="food-item-price">Price: {{ foodItem.price }}</p>
      <div v-if="showQuantityButtons" class="add-to-cart">
        <span class="quantity-button" @click="decrementQuantity">-</span>
        <span class="quantity">{{ quantity }}</span>
        <span class="quantity-button" @click="incrementQuantity">+</span>
      </div>
      <button v-else class="add-to-cart-button" @click="addToCart">Add to Cart</button>
    </div>
    
    <div class="food-item-image">
      <img :src="foodItem.image_url" alt="Food Item Image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      showQuantityButtons : false,
    };
  },
  computed: {
    formattedPrice() {
      // Format the price based on the quantity
      return (this.foodItem.price * this.quantity).toFixed(2);
    },
  },
  methods: {
    addToCart() {
      const token = this.$cookies.get('token');
      axios.post('http://localhost:3000/add-to-cart', {
        restaurant_id: this.foodItem.restaurant_id,
        items: {
          food_item_id: this.foodItem.food_item_id,
          name:this.foodItem.name,
          price:this.foodItem.price,
          // Add other necessary details from your food item
        },
      },{
            headers: {
                Authorization: `${token}`
            }
          })
      .then(response => {
        console.log('res : ',response)
        // this.quantity = response.data.data.items.reduce((total, item) => total + item.quantity, 0);
        this.showQuantityButtons = true;
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
    },

    incrementQuantity() {
      const token = this.$cookies.get('token');
      axios.post('http://localhost:3000/add-to-cart', {
        restaurant_id: this.foodItem.restaurant_id,
        items: {
          food_item_id: this.foodItem.food_item_id,
          name:this.foodItem.name,
          price:this.foodItem.price,
        },
      },{
            headers: {
                Authorization: `${token}`
            }
          })
      .then(this.quantity++)
      .catch(error => {
        console.error('Error updating cart:', error);
      });
    },

    decrementQuantity() {
      const token = this.$cookies.get('token');
  
        axios.post('http://localhost:3000/delete-from-cart', {
          restaurant_id: this.foodItem.restaurant_id,
          items: {
            food_item_id: this.foodItem.food_item_id,
          name:this.foodItem.name,
          price:this.foodItem.price,
          },
        },{
            headers: {
                Authorization: `${token}`
            }
          })
        .then(this.quantity--)
        .catch(error => {
          console.error('Error updating cart:', error);
        });
      
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
  padding: 20px;
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
  height: 100%;
  object-fit: cover;
}

.add-to-cart {
  display: flex;
  align-items: center;
  margin-top: 10px;
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
