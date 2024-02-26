<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark">
      <a class="navbar-brand" href="/">DoorStep</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a v-if="!isLoggedIn" class="nav-link navbar-brand" href="/register"
              >Register</a
            >
          </li>
          <li class="nav-item">
            <a v-if="!isLoggedIn" class="nav-link navbar-brand" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a v-if="role==='customer'" class="nav-link navbar-brand" href="/cart">My Cart</a>
          </li>
          <li class="nav-item">
            <a v-if="role==='customer'" class="nav-link navbar-brand" href="/register">A Restaurant?</a>
          </li>
          <li class="nav-item">
            <a v-if="role==='restaurant'" class="nav-link navbar-brand" href="/restaurant-dashboard">Restaurant Dashboard</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies';
import {jwtDecode} from 'jwt-decode';
// import { ref } from 'vue';

export default {
  data() {
    return {
      isLoggedIn: false,
       token :null,
       role:null
    };
  },
  mounted() {
    // Use nextTick to ensure the component has rendered before checking the login status
    this.$nextTick(() => {
      this.checkLoginStatus();
    });

    this.checkRole();
  },
  methods: {
    // Mock function to check login status (replace with your actual logic)
    checkLoginStatus() {
      this.token = VueCookies.get('token'); // Check if a token exists in cookies
      this.isLoggedIn = this.token !== null; // Update the component's isLoggedIn state based on token existence
    },

    checkRole(){
      this.token = VueCookies.get('token'); 
      if(this.token===null){
        this.role='customer'
        return;
      }
      const decodedToken = jwtDecode(this.token);
      if(decodedToken.restaurantId){
        this.role='restaurant';
      }
      else{
        this.role='customer'
      }
    }
  },
};
</script>

<style scoped>
.navbar {
  background: #ffa500;
}
</style>
