<template>
  <div v-if="orderDetails" class="order-modal">
    <div class="restaurant-details">
      <h2 class="restaurant-name">{{ name }}</h2>
      <p class="restaurant-address">{{ address }}</p>
    </div>

    <div class="order-items">
      <div v-for="(item, index) in orderDetails.items" :key="index" class="item">
        <p class="item-name">{{ item.name }}</p>
        <p class="item-details">
          <span class="quantity">Quantity: {{ item.quantity }}</span>
          <span class="price">{{ item.price }}</span>
        </p>
      </div>
    </div>

    <div v-if="role === 'restaurant'" class="form-group">
      <label for="status" class="form-label">Status</label>
      <select v-model="status" id="status" class="form-select">
        <option selected>Choose...</option>
        <option>Pending</option>
        <option>Approved</option>
        <option>Completed</option>
        <option>Rejected</option>
      </select>
    </div>
    <p class="total-amount">Status: {{ tempStatus||orderDetails.status }}</p>
    <p class="total-amount">Total Amount: {{ orderDetails.total_amount }}</p>

    <button @click="updateStatus" class="update-button" v-if="role === 'restaurant'">Update Status</button>

    <button @click="closeModal" class="close-button">Close</button>
  </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import VueCookies from "vue-cookies";
import io from 'socket.io-client';
export default {
  data() {
    return {
      status: "",
      role: "",
      token: null,
      name: null,
      address: null,
      tempStatus:null,
    };
  },
  props: {
    orderDetails: Object,
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },

    async updateStatus() {
      const token = this.$cookies.get("token");
      console.log(this.orderDetails.order_id)
      const response = await axios.post(`http://localhost:3000/orders/${this.orderDetails.order_id}/update-order-status`,{
        orderStatus:this.status
      },{
            headers: {
              Authorization: `${token}`,
            },
          })
      this.closeModal()

      console.log('response after update : ',response)
    },

    async getRestaurant(orderDetails) {
        try {
          // const decoded = jwtDecode(this.token)
          const restaurantId = orderDetails.restaurant_id;
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


    checkRole() {
      
      this.token = VueCookies.get("token");
      if (this.token === null) {
        this.role = "customer";
        return;
      }
      const decodedToken = jwtDecode(this.token);
      if (decodedToken.restaurantId) {
        this.role = "restaurant";
      } else {
        this.role = "customer";
      }
    },

    initializeSocket() {
      this.socket = io('http://localhost:3000', {
    transports: ['websocket'],
  });

       this.socket.on('updatedOrderStatus', (updatedOrder) => {
        console.log('emitted event ', updatedOrder);
          // Update the status of the matched order
          this.tempStatus = updatedOrder.status;
        
      });
    },
  },
  mounted(){
    this.checkRole();
    this.initializeSocket();
    // this.getRestaurant();
  },
   beforeUnmount() {
    // Close the socket connection when the component is destroyed
    if (this.socket) {
      this.socket.close();
    }
  },
  watch: {
  orderDetails: {
    handler: 'getRestaurant',
    immediate: true, // Call getRestaurant immediately when the component is created
  },
},

};
</script>

<style scoped>

.order-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
}

.restaurant-details {
  text-align: center;
  margin-bottom: 20px;
}

.restaurant-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.restaurant-address {
  font-size: 16px;
  color: #555;
}

.order-items {
  margin-bottom: 20px;
}

.item {
  margin-bottom: 15px;
}

.item-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.item-details {
  font-size: 14px;
  color: #555;
}

.quantity {
  margin-right: 10px;
}

.price {
  font-weight: bold;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
}

.form-label {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.form-select {
  padding: 10px;
  font-size: 16px;
}

.total-amount {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.update-button {
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  background-color: #27ae60;
  color: #fff;
  margin-bottom: 20px;
}

.close-button {
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  background-color: #e74c3c;
  color: #fff;
}

</style>
