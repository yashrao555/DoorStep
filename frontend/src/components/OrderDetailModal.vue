<!-- OrderModal.vue -->

<template>
    <div v-if="orderDetails" class="order-modal">
      {{ orderDetails }}
      <button @click="closeModal" class="close-button">Close</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      orderDetails: Object,
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your styles for OrderModal */
  .order-modal {
    /* Style your modal, center it on the screen */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  
  .close-button {
    /* Style your close button */
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    background-color: #3498db;
    color: #fff;
  }
  </style>
  