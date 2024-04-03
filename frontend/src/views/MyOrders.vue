<!-- YourComponent.vue -->

<template>
  <div>
    <!-- <div class="filter-dropdown">
      <select v-model="selectedCityId" @change="filterOrdersByCity">
        <option value="">All Cities</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
      </select>
    </div> -->

    <div class="filter-container">
      <label for="city-filter" class="filter-label">Select Branch:</label>
      <div class="filter-dropdown">
        <select
          id="city-filter"
          v-model="selectedCityId"
          @change="filterOrdersByCity"
        >
          <option value="">All Cities</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- <h1>My Orders</h1> -->
    <OrderCard
      v-for="order in filterOrdersByCity()"
      :key="order.id"
      :order="order"
      @open-modal="openOrderModal"
    />
    <OrderDetailModal
      :orderDetails="selectedOrderDetails"
      @close-modal="closeOrderModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import OrderCard from "../components/OrderCard.vue";
import OrderDetailModal from "@/components/OrderDetailModal.vue";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

export default {
  components: {
    OrderCard,
    OrderDetailModal,
  },
  data() {
    return {
      orders: [],
      selectedOrderDetails: null,
      isOrderModalOpen: false,
      socket: null,
      cities: [],
      selectedCityId: "",
    };
  },
  methods: {
    async getAllOrders() {
      const token = this.$cookies.get("token");
      try {
        const response = await axios.get("http://localhost:3000/orders", {
          headers: {
            Authorization: `${token}`,
          },
        });

        this.orders = response.data;
      } catch (error) {
        console.log("Error displaying orders:", error);
      }
    },

    async getCitiesForRestaurant() {
      try {
        const token = this.$cookies.get("token");
        const decoded = jwtDecode(token)
        console.log('decoded ',decoded);
        console.log('lkjhgfds');
        const response = await axios.get(
          "http://localhost:3000/branch-for-restaurant",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        this.cities = response.data;
      
      } catch (error) {
        console.log("Error retrieving cities:", error);
      }
    },

    filterOrdersByCity() {
      // Filter orders based on selected city
      console.log("selected city id ", this.selectedCityId);
      if (this.selectedCityId) {
        console.log("orders ", this.orders);
        return this.orders.filter(
          (order) => order.cityId === this.selectedCityId
        );
      } else {
        return this.orders; // Show all orders if no city is selected
      }
    },

    openOrderModal(orderDetails) {
      this.selectedOrderDetails = orderDetails;
      this.isOrderModalOpen = true;
    },
    closeOrderModal() {
      this.selectedOrderDetails = null;
      this.isOrderModalOpen = false;
    },
    initializeSocket() {
      const token = this.$cookies.get("token");
      const decoded = jwtDecode(token);
      this.socket = io("http://localhost:3000", {
        transports: ["websocket"],
      });

      // Listen for real-time updates
      this.socket.on("orders", (order) => {
        console.log("emitted event ", order);
        if (decoded.restaurantId == order.restaurant_id) {
          order.items = JSON.parse(order.items);
          this.orders.unshift(order);
        }
      });

      this.socket.on("updatedOrderStatus", (updatedOrder) => {
        console.log("emitted event ", updatedOrder);
        console.log("orders ", this.orders);
        const index = this.orders.findIndex(
          (order) => order.id == updatedOrder.orderId
        );
        console.log("index ", index);

        if (index !== -1) {
          // Update the status of the matched order
          this.orders[index].status = updatedOrder.status;
          console.log("orders ", this.orders);
        }
      });
    },
  },
  mounted() {
    this.getAllOrders();
    this.initializeSocket();
    this.getCitiesForRestaurant();
  },
  beforeUnmount() {
    // Close the socket connection when the component is destroyed
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.filter-label {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.filter-dropdown {
  width: 200px; /* Adjust the width as per your preference */
}

.filter-dropdown select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  font-size: 16px;
  outline: none;
}

/* Customize dropdown arrow */
.filter-dropdown select::-ms-expand {
  display: none;
}

.filter-dropdown select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M7 10l5 5 5-5z" /></svg>');
  background-repeat: no-repeat;
  background-position-x: 97%;
  background-position-y: center;
}

/* Styling for dropdown options */
.filter-dropdown select option {
  padding: 10px;
}
</style>
