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
            <li v-for="item in cartItems" :key="item.id">
              {{ item.name }} - {{ item.price }}
            </li>
          </ul>
        </div>
  
        <div class="billing-details">
          <h3>Billing Details</h3>
          <!-- Display the total bill -->
          <p>Total Bill: {{ calculateTotal() }}</p>
        </div>
      </div>
  
      <div class="address-form">
        <h2>Enter Your Address</h2>
        <!-- Add your address input fields and form logic here -->
        <!-- For simplicity, you can use standard HTML form elements or any UI library you prefer -->
        <form @submit.prevent="proceedToPayment">
          <!-- Address fields go here -->
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="userAddress" required>
  
          <!-- Additional fields like city, state, etc., can be added as needed -->
  
          <button type="submit">Proceed to Payment</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [], // Populate this with the items from your cart
        userAddress: "", // User's address
      };
    },
    methods: {
      calculateTotal() {
        // Implement the logic to calculate the total bill based on cartItems
        // You might have a computed property for this in your actual application
        return this.cartItems.reduce((total, item) => total + item.price, 0);
      },
      proceedToPayment() {
        // Implement the logic to proceed to the payment page
        // You can use Vue Router to navigate to the payment page
        // Example: this.$router.push("/payment");
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
  