<template>
  <div class="cart-page-container">
    <div class="restaurant-info" v-if = 'restaurant'>
      <h2 class="restaurant-name">{{ restaurant.name }}</h2>
      <p class="location">{{ restaurant.address }}</p>
      <p class="location">
        {{ restaurant.operating_hours_start }} -
        {{ restaurant.operating_hours_end }}
      </p>
      <p class="location">Rating: {{ restaurant.rating }}</p>
    </div>
    <div v-else>
        <h2>NOOOOOOOOOOOOOOOO</h2>
    </div>

    <div class="cart-items">
      <div
        v-for="cartItem in cartItems"
        :key="cartItem.foodItem.food_item_id"
        class="cart-item"
      >
        <div class="item-details">
          <h3>{{ cartItem.foodItem.name }}</h3>
          <div class="quantity-box">
            <span class="quantity-buttons" @click="updateQuantity(cartItem, -1)"
              >-</span
            >
            <span class="quantity">{{ cartItem.quantity }}</span>
            <span class="quantity-buttons" @click="updateQuantity(cartItem, 1)"
              >+</span
            >
            <span class="price">{{ calculateItemPrice(cartItem) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="total-box">
      <p>Total: {{ calculateTotal() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   restaurant: {}, // You should pass the restaurant data from the previous page
      // cartItems: [],
    };
  },
  mounted() {
    // Fetch restaurant data based on the restaurant ID from the route parameter
    this.$store.dispatch("fetchRestaurantData", this.restaurantId);
  },
  computed: {
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    restaurantId() {
      return this.$store.getters.getRestaurantId;
    },

    restaurant() {
      return this.$store.getters.getRestaurant;
    },
  },
  watch: {
    restaurant(value) {
      console.log(value);
      if (value === null) console.log("bhak bhenchod");
    },
  },
  methods: {
    clearCart() {
      this.$store.dispatch("clearCart");
    },
    calculateItemPrice(cartItem) {
      return (cartItem.foodItem.price * cartItem.quantity).toFixed(2);
    },
    calculateTotal() {
      return this.cartItems
        .reduce((total, cartItem) => {
          return total + cartItem.foodItem.price * cartItem.quantity;
        }, 0)
        .toFixed(2);
    },
    updateQuantity(cartItem, change) {
      const newQuantity = cartItem.quantity + change;
      this.$store.dispatch("updateCartItemQuantity", {
        foodItemId: cartItem.foodItem.food_item_id,
        quantity: newQuantity,
      });
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
