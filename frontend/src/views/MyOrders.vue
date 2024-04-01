<!-- YourComponent.vue -->

<template>
  <div>

    <div class="filter-dropdown">
      <select v-model="selectedCityId" @change="filterOrdersByCity">
        <option value="">All Cities</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
      </select>
    </div>
    <!-- <h1>My Orders</h1> -->
    <OrderCard v-for="order in filterOrdersByCity()" :key="order.id" :order="order" @open-modal="openOrderModal" />
    <OrderDetailModal :orderDetails="selectedOrderDetails" @close-modal="closeOrderModal" />
  </div>
</template>

<script>
import axios from 'axios';
import OrderCard from '../components/OrderCard.vue';
import OrderDetailModal from '@/components/OrderDetailModal.vue';
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';

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
      selectedCityId: '',
      // filteredOrders:[]
    };
  },
  // computed: {
  //   filteredOrders() {
  //     // Initially, display all orders
  //     return this.orders;
  //   },
  // },
  methods: {
    async getAllOrders() {
      const token = this.$cookies.get('token');
      try {
        const response = await axios.get('http://localhost:3000/orders', {
          headers: {
            Authorization: `${token}`,
          },
        });

        this.orders = response.data;
      } catch (error) {
        console.log('Error displaying orders:', error);
      }
    },

    async getCitiesForRestaurant() {
      try {
        const token = this.$cookies.get("token");
        const response = await axios.get('http://localhost:3000/cities-for-restaurant', {
            headers: {
              Authorization: `${token}`,
            },
          });
        this.cities = response.data;
      } catch (error) {
        console.log('Error retrieving cities:', error);
      }
    },

    filterOrdersByCity() {
      // Filter orders based on selected city
      console.log('selected city id ',this.selectedCityId);
      if (this.selectedCityId) {
        console.log('orders ',this.orders);
        return this.orders.filter(order => order.cityId === this.selectedCityId);
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
      const token = this.$cookies.get('token')
      const decoded = jwtDecode(token)
      this.socket = io('http://localhost:3000', {
    transports: ['websocket'],
  });

      // Listen for real-time updates
      this.socket.on('orders', (order) => {
        console.log('emitted event ',order)
        if(decoded.restaurantId == order.restaurant_id){
          order.items = JSON.parse(order.items)
          this.orders.unshift(order);
        }
        
      });

       this.socket.on('updatedOrderStatus', (updatedOrder) => {
        console.log('emitted event ', updatedOrder);
        console.log('orders ',this.orders)
        const index = this.orders.findIndex((order) => order.id == updatedOrder.orderId);
        console.log('index ',index)

        if (index !== -1) {
          // Update the status of the matched order
          this.orders[index].status = updatedOrder.status;
          console.log('orders ',this.orders)
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
/* Your component styles */
</style>
