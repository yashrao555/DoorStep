<template>
  <div :key="isLoggedIn">
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
          <!-- <li class="nav-item active">
            <a v-if="!isLoggedIn" class="nav-link navbar-brand" href="/register"
              >Register</a
            >
          </li>
          <li class="nav-item">
            <a v-if="!isLoggedIn" class="nav-link navbar-brand" href="/login"
              >Login</a
            >
          </li> -->

          <li class="nav-item active" v-if="showRegisterButton">
            <router-link class="nav-link navbar-brand" to="/register"
              >Register</router-link
            >
          </li>
          <li class="nav-item" v-if="showLoginButton">
            <router-link class="nav-link navbar-brand" to="/login"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <a
              v-if="role === 'customer'"
              class="nav-link navbar-brand"
              href="/cart"
              >My Cart</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link navbar-brand" href="/myOrders">My Orders</a>
          </li>
          <li class="nav-item">
            <a
              v-if="role === 'customer'"
              class="nav-link navbar-brand"
              href="/register"
              >A Restaurant?</a
            >
          </li>
          <li class="nav-item">
            <a
              v-if="role === 'restaurant'"
              class="nav-link navbar-brand"
              href="/restaurant-dashboard"
              >Restaurant Dashboard</a
            >
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link navbar-brand dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Add Branch
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <!-- <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a> -->

              <ul>
                <li
                  v-for="city in cities"
                  :key="city.id"
                  @click="addBranch(city.id)"
                >
                  {{ city.name }}
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item ml-auto">
            <button
              v-if="showLogoutButton"
              @click="logout"
              class="btn btn-link nav-link navbar-brand"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
// import { ref } from 'vue';

export default {
  data() {
    return {
      isLoggedIn: false,
      token: null,
      role: null,
      showLoginButton: true,
      showRegisterButton: true,
      showDropdown: false,
      cities: [],
    };
  },
  mounted() {
    this.checkLoginStatus();
    this.checkRole();
    this.fetchCities();
  },
  watch: {
    isLoggedIn: function (newVal) {
      // Update the flags based on the login status
      this.showLoginButton = !newVal; // Show the login button if not logged in
      this.showRegisterButton = !newVal; // Show the register button if not logged in
    },
  },
  computed: {
    showLogoutButton() {
      return this.isLoggedIn;
    },
  },

  methods: {

    addBranch(cityId) {
      const decoded  = jwtDecode(this.token)
      // console.log('decoded ',decoded);
      // Call your API to add the branch (restaurant city) to the restaurant
      const restaurantId = decoded.restaurantId; // Assuming you have the restaurantId stored in data
      axios
        .post(`http://localhost:3000/create-entry`, {
          restaurantId,
          cityId
        })
        .then(response => {
          // Handle success, e.g., show a success message
          console.log("Branch added successfully:", response.data);
          alert(response.data.message)
          // Optionally, you can refresh the list of branches (if needed)
          // this.fetchFoodItems(this.restaurantId);
        })
        .catch(error => {
          console.error("Failed to add branch:", error);
          alert('Cannot add same branch again')
          // Handle error as needed
        })
        .finally(() => {
          this.showDropdown = false; // Close the dropdown after adding the branch
        });
    },

    async fetchCities() {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-all-cities"
        );
        this.cities = response.data; // Assuming response.data is an array of cities
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown; // Toggle the dropdown visibility
    },
    // Mock function to check login status (replace with your actual logic)
    checkLoginStatus() {
      this.token = VueCookies.get("token");
      this.setLoggedIn(this.token !== null);
    },

    setLoggedIn(isLoggedIn) {
      this.isLoggedIn = isLoggedIn;
      // Additionally, trigger any necessary logic here, like emitting an event or updating other components.
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

    logout() {
      // Clear token from cookies
      this.$router.push("/");
      VueCookies.remove("token");

      // Update isLoggedIn state
      this.isLoggedIn = false;

      // Redirect to home page or any desired route
    },
  },
};
</script>

<style scoped>
.navbar {
  background: #ffa500;
}
</style>
