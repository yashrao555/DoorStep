<template>
    <div class="order-card" @click="openOrderModal">
      <div class="card-content">
        <h3 class="restaurant-name">{{ name }}</h3>
        <p class="restaurant-address">{{ address }}</p>
  
        <div
          v-for="item in order.items"
          :key="item.food_item_id"
          class="order-item"
        >
          <span>{{ item.name }} ({{ item.quantity }})</span>
        </div>
  
        <p class="order-amount">Total: {{ order.total_amount }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: {
      order: Object,
    },
    data() {
      return {
        name: null,
        address: null,
      };
    },
  
    methods: {
      async getRestaurant() {
        try {
          const restaurantId = this.order.restaurant_id;
          const response = await axios.get(
            `http://localhost:3000/restaurants/${restaurantId}`
          );
          const restaurantData = response.data.data;
            console.log(restaurantData)
          this.address = restaurantData.address;
          this.name = restaurantData.name;
        } catch (error) {
          console.log(error);
        }
      },

      async openOrderModal() {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${this.order.order_id}`);
        const orderDetails = response.data;
        this.$emit('open-modal', orderDetails);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    },
    },
  
    mounted() {
      this.getRestaurant();
    },
  };
  </script>
  
  <style scoped>
.order-card {
  display: flex;
  justify-content: space-between;
  margin: 0 20%;
  padding: 10px;
  box-sizing: border-box;

}

.card-content {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  
 
}

.restaurant-name {
  font-weight: bold;
}

.restaurant-address {
  color: #777;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.order-amount {
  margin-top: 10px;
  font-weight: bold;
  color: #27ae60;
}
</style>
