<!-- YourComponent.vue -->

<template>
  <div>
    <!-- <h1>My Orders</h1> -->
    <OrderCard v-for="order in orders" :key="order.id" :order="order" @open-modal="openOrderModal" />
    <OrderDetailModal :orderDetails="selectedOrderDetails" @close-modal="closeOrderModal" />
  </div>
</template>

<script>
import axios from 'axios';
import OrderCard from '../components/OrderCard.vue';
import OrderDetailModal from '@/components/OrderDetailModal.vue';
import io from 'socket.io-client';

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
    };
  },
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
    openOrderModal(orderDetails) {
      this.selectedOrderDetails = orderDetails;
      this.isOrderModalOpen = true;
    },
    closeOrderModal() {
      this.selectedOrderDetails = null;
      this.isOrderModalOpen = false;
    },
    initializeSocket() {
      this.socket = io('http://localhost:3000', {
    transports: ['websocket'],
  });

      // Listen for real-time updates
      this.socket.on('orders', (order) => {
        console.log('emitted event ',order)
        order.items = JSON.parse(order.items)
         this.orders.unshift(order);
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
