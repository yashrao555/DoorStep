<!-- YourComponent.vue -->

<template>
    <div>
      <!-- <h1>My Orders</h1> -->
      <OrderCard v-for="order in orders" :key="order.order_id" :order="order" @open-modal="openOrderModal"/>
      <OrderDetailModal :orderDetails="selectedOrderDetails" @close-modal="closeOrderModal" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import OrderCard from '../components/OrderCard.vue';
  import OrderDetailModal from '@/components/OrderDetailModal.vue';
  
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
    },
    mounted() {
      this.getAllOrders();
    },
  };
  </script>
  
  <style scoped>
  /* Your component styles */
  </style>
  