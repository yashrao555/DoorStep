<template>
  <div class="cart-page-container">
    <div class="restaurant-info" v-if = 'restaurant'>
      <h2 class="restaurant-name">{{ restaurant.name }}</h2>
      <p class="location">{{ restaurant.address }}</p>
      <p class="location">
        {{ restaurant.opens_at }} -
        {{ restaurant.closes_at }}
      </p>
      <p class="location">Rating: {{ restaurant.rating }}</p>
    </div>
    <div class="restaurant-info" v-else>
        <h2>No Items to display</h2>
    </div>

    <div class="cart-items" v-if="cartItems.length > 0">
      <div
        v-for="cartItem in cartItems"
        :key="cartItem.food_item_id"
        class="cart-item"
      >
        <div class="item-details">
          <h3>{{ cartItem.name }}</h3>
          <div class="quantity-box">
            <span class="quantity-buttons"
              >-</span
            >
            <span class="quantity">{{ cartItem.quantity }}</span>
            <span class="quantity-buttons" 
              >+</span
            >
            <span class="price">{{ cartItem.quantity*cartItem.price }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="total-box" v-if="cartItems.length > 0">
      <p>Total: {{ totalAmount }}</p>
    </div>
    <button class="total-box" @click="deleteCart" v-if="cartItems.length > 0">
      <p>Clear Cart</p>
    </button>

  
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      restaurant: null,
      cartItems: [],
      totalAmount: 0,
    };
  },
  mounted() {
    // Fetch restaurant data based on the restaurant ID from the route parameter
    // this.$store.dispatch("fetchRestaurantData", this.restaurantId);
    this.fetchCartData();
  },
  // computed: {
  //   cartItems() {
  //     return this.$store.getters.getCartItems;
  //   },
  //   restaurantId() {
  //     return this.$store.getters.getRestaurantId;
  //   },

  //   restaurant() {
  //     return this.$store.getters.getRestaurant;
  //   },
  // },
  watch: {
    restaurant(value) {
      if (value === null) console.log("bbbbbbbbbb");
    },
  },
  methods: {
    async fetchCartData() {
      try {
        const token = this.$cookies.get('token');
        const response = await axios.get('http://localhost:3000/get-cart',{
            headers: {
                Authorization: `${token}`
            }
          }); // Adjust the URL based on your backend setup
        const cartData = response.data.data;
        if(cartData){this.cartItems = cartData.items;
        this.totalAmount = cartData.total_amount;
        console.log('this is cardData : ',cartData)

        // Extract restaurant ID and fetch restaurant details
        const restaurantId = cartData.restaurant_id;
        console.log('res id : ',restaurantId)
        if (restaurantId) {
          this.fetchRestaurantData(restaurantId);
        }}
        

      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    },
    async fetchRestaurantData(restaurantId) {
      try {
        const response = await axios.get(`http://localhost:3000/restaurants/${restaurantId}`); // Adjust the URL based on your backend setup
        const restaurantData = response.data.data;
        
        // Update the restaurant data in the component
        this.restaurant = restaurantData;
        console.log('restaurant : ',this.restaurant)
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    },
    async deleteCart(){
      const token = this.$cookies.get('token');
      try {
        const response = await axios.delete('http://localhost:3000/delete-cart', {
          headers: {
            Authorization: `${token}`,
          },
        });

        console.log('Cart deleted successfully:', response.data);
        // Handle any additional logic or UI updates after successful deletion

      }catch(error){
        console.error('Error clearing cart:', error);
      }
    },
  },
};
</script>

<style scoped>
.cart-page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  margin-top: 60px; /* Adjust as needed */
}

.cart-header {
  text-align: center;
  margin-bottom: 20px;
}

.separator-line {
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.cart-items {
  /* Add styles for cart items container */
}

.cart-item {
  margin-bottom: 20px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.item-details {
  /* Add styles for item details */
}

.quantity-box {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity {
  font-size: 18px;
  font-weight: bold;
  margin: 0 10px;
}

.quantity-buttons {
  font-size: 20px;
  cursor: pointer;
}

.price {
  flex-grow: 1;
  text-align: right;
  font-size: 16px;
  color: #27ae60;
}

.total-box {
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #27ae60;
  color: #fff;
  font-size: 18px;
}

.restaurant-info {
  text-align: center;
  margin-bottom: 20px;
}

.restaurant-name {
  font-size: 24px;
  font-weight: bold;
}

.location {
  font-size: 14px;
  color: #555;
}
</style>
