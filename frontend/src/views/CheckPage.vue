<template>
  <div class="address-payment-page">
    <div class="header">
      <h2>Order Summary</h2>
    </div>

    <div class="order-details">
      <div class="food-items">
        <h3>Your Food Items</h3>
        <!-- Display the list of food items from the cart -->
        <ul>
          <li v-for="item in particularOrder.items" :key="item.food_item_id">
            {{ item.name }} ({{item.quantity}})- {{ item.price }}
          </li>
        </ul>
      </div>

      <div class="billing-details">
        <h3>Billing Details</h3>
        <!-- Display the total bill -->
        <p>Total Bill: {{ particularOrder.total_amount }}</p>
      </div>
    </div>

    <div class="address-form">
      <h2>Enter Your Address</h2>
      <!-- Add your address input fields and form logic here -->
      <!-- For simplicity, you can use standard HTML form elements or any UI library you prefer -->
      <form @submit.prevent="proceedToPayment">
        <!-- Address fields go here -->
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="userAddress" required />

        <!-- Additional fields like city, state, etc., can be added as needed -->

        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import eventBus from "../eventbus";
export default {
  
  data() {
    return {
      particularOrder: {},
      userAddress: "",
      orderId: null,
    };
  },
  mounted() {
    const storedOrderId = localStorage.getItem("orderId");
    if (storedOrderId) {
      this.orderId = storedOrderId;
      this.fetchOrderDetails(); // Use the retrieved orderId
    } else {
      console.log(this.orderId)
    }
  },
  methods: {
    async fetchOrderDetails() {
      console.log("id : ", this.orderId);
      const response = await axios.get(
        `http://localhost:3000/orders/${this.orderId}`
      );
      this.particularOrder=response.data
    },
  },
};
</script>

<style scoped>
/* Add your custom styling for the address-payment-page component */
.address-payment-page {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
}

.order-details {
  margin-top: 20px;
}

.food-items ul {
  list-style: none;
  padding: 0;
}

.billing-details {
  margin-top: 20px;
}

.address-form {
  margin-top: 40px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input {
  padding: 8px;
  margin-bottom: 16px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
