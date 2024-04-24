<template>
  <div class="cart-page-container">
    <div class="restaurant-info" v-if="restaurant">
        <h2 class="restaurant-name">{{ restaurant.name }}</h2>
      <p class="location">{{ restaurant.address }}</p>
      <p class="restaurant-timings">
        {{ $t('cart.timings') }} : {{ opensAtHours }}:{{ opensAtMinutes }} -
        {{ closesAtHours }}:{{ closesAtMinutes }}
      </p>
      <p class="restaurant-timings">{{ $t('cart.rating') }}: {{ restaurant.rating }}</p>
    </div>
    <div class="restaurant-info" v-else>
      <h2>{{ $t('cart.no_items') }}</h2>
    </div>

    <div class="cart-items" v-if="cartItems.length > 0">
      <div
        v-for="cartItem in cartItems"
        :key="cartItem.id"
        class="cart-item separator-line"
      >
        <div class="item-details">
          <h2 class="food-item-name">{{ cartItem.name }}</h2>
          <div class="quantity-box">
            <span class="quantity-buttons" @click="decrementQuantity(cartItem)"
              >-</span
            >
            <span class="quantity">{{ cartItem.quantity }}</span>
            <span class="quantity-buttons" @click="incrementQuantity(cartItem)"
              >+</span
            >
            <span class="price">{{
              (cartItem.quantity * cartItem.price).toFixed(2)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="buttons-container" v-if="cartItems.length > 0">
      <button class="total-button">{{ $t('cart.total') }} - {{ totalAmount }}</button>
      <button class="confirm-order-button" @click="confirmOrder">
        {{ $t('cart.confirm_order') }}
      </button>
      <button class="clear-cart-button" @click="deleteCart">{{ $t('cart.clear_cart') }}</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import eventBus from '../eventBus.js'
export default {
  data() {
    return {
      restaurant: null,
      cartItems: [],
      totalAmount: 0,
      opensAtHours: "",
      opensAtMinutes: "",
      closesAtHours: "",
      closesAtMinutes: "",
    };
  },
  mounted() {
    // Fetch restaurant data based on the restaurant ID from the route parameter
    // this.$store.dispatch("fetchRestaurantData", this.restaurantId);
    this.fetchCartData();
  },

  watch: {
    restaurant(value) {
      if (value === null) console.log("bbbbbbbbbb");
    },
  },
  methods: {
    async fetchCartData() {
      try {
        const token = this.$cookies.get("token");
        const response = await axios.get("http://localhost:3000/get-cart", {
          headers: {
            Authorization: `${token}`,
          },
        }); // Adjust the URL based on your backend setup
        const cartData = response.data.data;
        console.log("this is my cart data : ", cartData);
        if (cartData) {
          this.cartItems = cartData.items;
          this.totalAmount = cartData.total_amount.toFixed(2);
          // this.totalAmount.toFixed(2);
          console.log("this is cardData : ", cartData);

          // Extract restaurant ID and fetch restaurant details
          const restaurantId = cartData.restaurant_id;
          console.log("res id : ", restaurantId);
          if (restaurantId && this.cartItems.length > 0) {
            this.fetchRestaurantData(restaurantId);
            // this.timeHandler();
          }
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    },

    async fetchRestaurantData(restaurantId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurants/${restaurantId}`
        ); // Adjust the URL based on your backend setup
        const restaurantData = response.data.data;

        // Update the restaurant data in the component
        this.restaurant = restaurantData;
        const timestamp1 = this.restaurant.opens_at;
        const date1 = new Date(timestamp1);

        const timestamp2 = this.restaurant.closes_at;
        const date2 = new Date(timestamp2);

        const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5.5 hours)
        const istDate1 = new Date(date1.getTime() + istOffset);
        const istDate2 = new Date(date2.getTime() + istOffset);

        this.opensAtHours = istDate1.getHours().toString().padStart(2, "0");
        this.opensAtMinutes = istDate1.getMinutes().toString().padStart(2, "0");

        this.closesAtHours = istDate2.getHours().toString().padStart(2, "0");
        this.closesAtMinutes = istDate2
          .getMinutes()
          .toString()
          .padStart(2, "0");
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    },
    async deleteCart() {
      const token = this.$cookies.get("token");
      try {
        const response = await axios.delete(
          "http://localhost:3000/delete-cart",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        this.$toast.success("Cart deleted successfully",{
                position: "top-right",
              });
        console.log("Cart deleted successfully:", response.data);
        this.cartItems = [];
        this.totalAmount = 0;
        this.restaurant = null;
        // Handle any additional logic or UI updates after successful deletion
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    },

    async confirmOrder() {
      try {
        const token = this.$cookies.get("token");
        const decoded = jwtDecode(token);
        console.log(decoded);
        const response = await axios.post(
          "http://localhost:3000/create-order",
          {
            customer_id: decoded.customerId, // Replace with the actual customer_id if available
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        console.log("Order created successfully:", response.data);
        const orderId = response.data.id;
        // console.log('event bus : ',this.$eventBus)
        // this.$eventBus.emit('orderConfirmed', orderId);
        console.log(orderId);

        localStorage.setItem("orderId", orderId);
        this.$router.push("/checks");
      } catch (error) {
        console.error("Error confirming order:", error);
      }
    },

    incrementQuantity(cartItem) {
      const token = this.$cookies.get("token");
      axios
        .post(
          "http://localhost:3000/add-to-cart",
          {
            restaurant_id: this.cartItems.restaurant_id,
            items: {
              id: cartItem.id,
              name: cartItem.name,
              price: cartItem.price,
            },
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          cartItem.quantity++;

          location.reload();
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
        });
    },

    decrementQuantity(cartItem) {
      const token = this.$cookies.get("token");

      axios
        .post(
          "http://localhost:3000/delete-from-cart",
          {
            restaurant_id: this.cartItems.restaurant_id,
            items: {
              id: cartItem.id,
              name: cartItem.name,
              price: cartItem.price,
            },
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          cartItem.quantity--;

          location.reload();
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap");

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
  margin-bottom: 5px;
}

.separator-line {
  /* border-bottom: 5px solid #575555; */
  /* margin: 10px 0; */
  border-bottom: 3px solid #bbb;
  margin: 3rem 70px;
  width: 600px;
}

.food-item-name {
  font-size: 24px;
  /* font-weight: bold; */
  font-family: "Tenor Sans", sans-serif;
  font-weight: bold;
  font-style: normal;
}

.cart-item {
  margin-bottom: 20px;
  padding: 10px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  /* border-radius: 60px; */
  overflow: hidden;
  background-color: #fff;
}

.cart-item:hover {
  transform: scale(1.05);
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
  color: #777;
  margin: 0 10px;
}

.quantity-buttons {
  font-size: 20px;
  cursor: pointer;
  color: #777;
}

.price {
  flex-grow: 1;
  text-align: right;
  font-size: 16px;
  color: #27ae60;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.total-button,
.confirm-order-button,
.clear-cart-button {
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffa500;
}

.restaurant-info {
  text-align: center;
  margin-bottom: 20px;
}

.restaurant-name {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 8px;
  font-family: "Tilt Warp", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "XROT" 0, "YROT" 0;
}

.location {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
}

.restaurant-timings {
  font-size: 16px;
  margin-top: 10px;
  color: #555;
  font-family: "Tenor Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
