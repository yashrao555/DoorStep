<template>
  <div :key="isLoggedIn">
    <nav class="navbar navbar-expand-lg navbar-dark ">
      <a class="navbar-brand fs-1 ms-5" href="/">{{ $t('navbar.doorstep') }}</a>
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
              >{{ $t('navbar.register') }}</router-link
            >
          </li>
          <li class="nav-item" v-if="showLoginButton">
            <router-link class="nav-link navbar-brand fs-4" to="/login"
              >{{ $t('navbar.login') }}</router-link
            >
          </li>
          <li class="nav-item">
            <a
              v-if="role === 'customer'"
              class="nav-link navbar-brand fs-4"
              href="/cart"
              >{{ $t('navbar.my_cart') }}</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link navbar-brand fs-4" href="/myOrders">{{ $t('navbar.my_orders') }}</a>
          </li>
          <li class="nav-item">
            <a
              v-if="role === 'customer'"
              class="nav-link navbar-brand fs-4"
              href="/register"
              >{{ $t('navbar.a_restaurant') }}</a
            >
          </li>
          <li class="nav-item">
            <a
              v-if="role === 'restaurant'"
              class="nav-link navbar-brand fs-4"
              href="/restaurant-dashboard"
              >{{ $t('navbar.restaurant_dashboard') }}</a
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
              {{ $t('navbar.add_branch') }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <ul>
                <li v-for="city in cities" :key="city.id" @click="addBranch(city.id)">
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
              {{ $t('navbar.logout') }}
            </button>
          </li>
          <li class="nav-item">
            <select v-model="selectedLanguage" @change="switchLanguage">
              <option v-for="(lang, index) in supportedLanguages" :key="index" :value="lang">
                {{ lang }}
              </option>
            </select>
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
      supportedLanguages: ['en', 'fr','hi'], // Add more languages if needed
      selectedLanguage: 'en', // Default language
    };
  },
  mounted() {
    this.checkLoginStatus();
    this.checkRole();
    this.fetchCities();
  },
  watch: {
    isLoggedIn: function (newVal) {
      this.showLoginButton = !newVal;
      this.showRegisterButton = !newVal;
    },
    selectedLanguage(newVal) {
      this.$i18n.locale = newVal;
    },
  },
  computed: {
    showLogoutButton() {
      return this.isLoggedIn;
    },
  },
  methods: {
    addBranch(cityId) {
      const decoded  = jwtDecode(this.token);
      const restaurantId = decoded.restaurantId;
      axios
        .post(`http://localhost:3000/create-entry`, {
          restaurantId,
          cityId
        }, {
          headers: {
            Authorization: `${this.token}`,
          },
        })
        .then(response => {
          console.log("Branch added successfully:", response.data);
          alert(response.data.message);
        })
        .catch(error => {
          console.error("Failed to add branch:", error);
          alert('Cannot add same branch again');
        })
        .finally(() => {
          this.showDropdown = false;
        });
    },
    async fetchCities() {
      try {
        const response = await axios.get("http://localhost:3000/get-all-cities");
        this.cities = response.data;
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    checkLoginStatus() {
      this.token = VueCookies.get("token");
      this.setLoggedIn(this.token !== null);
    },
    setLoggedIn(isLoggedIn) {
      this.isLoggedIn = isLoggedIn;
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
      this.$router.push("/");
      VueCookies.remove("token");
      this.isLoggedIn = false;
    },
    switchLanguage() {
      this.$i18n.locale = this.selectedLanguage;
    },
  },
};
</script>

<style scoped>
.navbar {
  background: #ffa500;
  box-shadow: 0 2px 4px rgba(253, 247, 247, 0.951) !important;
}

.ms-5 {
  margin-left: 10vw!important;
}
</style>
