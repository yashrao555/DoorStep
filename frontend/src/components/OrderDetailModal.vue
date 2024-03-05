<!-- OrderModal.vue -->

<template>
  <div v-if="orderDetails" class="order-modal">
    {{ orderDetails }}
    <div v-if="role === 'restaurant'">
      <div class="form-group">
        <label for="status" class="form-label">Status</label>
        <select v-model="status" id="status" class="form-select">
          <option selected>Choose...</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>
      </div>
      <button @click="updateStatus" class="close-button">Update</button>
    </div>
    <button @click="closeModal" class="close-button">Close</button>
  </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import VueCookies from "vue-cookies";
export default {
  data() {
    return {
      status: "",
      role: "",
      token: null,
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
      console.log(this.status)
      const token = this.$cookies.get("token");
      const response = await axios.post(`http://localhost:3000/orders/${this.orderDetails.order_id}/update-order-status`,{
        orderStatus:this.status
      },
      {
            headers: {
              Authorization: `${token}`,
            },
          })
      this.closeModal()

      console.log('response after update : ',response)
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
  },
  mounted(){
    this.checkRole();
  }
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

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}

.form-label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}
</style>