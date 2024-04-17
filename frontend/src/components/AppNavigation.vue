<template>
  <div   :key="isLoggedIn">
    <nav class="navbar navbar-expand-lg navbar-dark ">
      <a class="navbar-brand fs-1 ms-5" href="/">DoorStep</a>
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
        <ul class="navbar-nav ms-auto text-center "> 

          <li class="nav-item active" v-if="showRegisterButton">
            <router-link class="nav-link navbar-brand fs-4" to="/register"
              >Register</router-link
            >
          </li>
          <li class="nav-item" v-if="showLoginButton">
            <router-link class="nav-link navbar-brand fs-4" to="/login"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <a
              v-if="role === 'customer'"
              class="nav-link navbar-brand fs-4"
              href="/cart"
              >My Cart</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link navbar-brand fs-4" href="/myOrders">My Orders</a>
          </li>
          <li class="nav-item">
            <a
              v-if="role === 'customer'"
              class="nav-link navbar-brand fs-4"
              href="/register"
              >A Restaurant?</a
            >
          </li>
          <li class="nav-item">
            <a
              v-if="role === 'restaurant'"
              class="nav-link navbar-brand fs-4"
              href="/restaurant-dashboard"
              >Restaurant Dashboard</a
            >
          </li>

          <li class="nav-item dropdown">
            <a
              v-if="role === 'restaurant'"
              class="nav-link navbar-brand dropdown-toggle fs-4"
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
              class="btn btn-link nav-link navbar-brand fs-4"
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
        .post(`http://localhost:3000/create-entry`,{
          restaurantId,
          cityId
        },{
            headers: {
              Authorization: `${this.token}`,
            },
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
  /* width: 100% !important; */
  background: #ffa500;
  box-shadow: 0 2px 4px rgba(253, 247, 247, 0.951) !important;
}

.ms-5{
  margin-left: 10vw!important;
}
</style>
