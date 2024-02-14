// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import RegisterAsCustomer from './views/RegisterAsCustomer.vue';
import RegisterAsRestaurant from './views/RegisterAsRestaurant.vue';
import LoginPage from './views/LoginPage.vue';
import LandingPage from './views/LandingPage.vue';
import RestaurantPage from './views/RestaurantPage.vue';
import AddToCart from './components/AddToCart.vue';
import CheckPage from './views/CheckPage.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/register', component: HomePage },
  { path: '/register/customer', component: RegisterAsCustomer },
  { path: '/register/restaurant', component: RegisterAsRestaurant },
  { path: '/login', component: LoginPage },
  { path: "/restaurant/:id", component:RestaurantPage},
  { path: '/cart', component: AddToCart },
  { path: '/checks', component: CheckPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
