<template>
  <div>
    <div v-if="loading" class="loading-spinner"></div>
    <div v-else >
    <h1 class="order-heading">Orders</h1>

    <div class="filter-container" v-if="cities.length>0">
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
      loading:false,
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
      const decoded = jwtDecode(token);
      try {
      this.loading=true; 
      console.log('loading : ',this.loading);
      
      if(decoded.customerId || decoded.restaurantId){
        const response = await axios.get("http://localhost:3000/orders", {
          headers: {
            Authorization: `${token}`,
          },
        });
        

        this.orders = response.data;
      }
      else if(decoded.staffId){
        const response = await axios.get("http://localhost:3000/orders-for-staff", {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log('dedcoded ',decoded);

        this.orders = response.data;
        // this.orders.items = JSON.parse(this.orders.items)
        console.log("order for staff ",this.orders)

      }
      }
       catch (error) {
        console.log("Error displaying orders:", error);
      }
      finally{
        this.loading=false;
      }
    },

    async getCitiesForRestaurant() {
      try {
        this.loading=true;
        const token = this.$cookies.get("token");
        const decoded = jwtDecode(token);
        console.log("decoded ", decoded);
        console.log("lkjhgfds");
        if (decoded.staffId) {
          const response = await axios.get(
            "http://localhost:3000/branch-for-restaurant",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          this.cities = response.data;
        }
        else if(decoded.restaurantId){
          const response = await axios.get(
          "http://localhost:3000/cities-for-restaurant",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        this.cities = response.data;
        }
        else{
          this.cities=[]
        }
      } catch (error) {
        console.log("Error retrieving cities:", error);
      }
      finally{
        this.loading=false;
      }
    },

    filterOrdersByCity() {
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

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap');

.order-heading{
  margin:2rem 900px;
  font-family: "Cormorant Garamond", serif;
  font-weight: 700;
  font-style: normal;
  font-size: 55px;
}

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

.loading-spinner {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 400px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
