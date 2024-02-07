// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import RegisterAsCustomer from './views/RegisterAsCustomer.vue';
import RegisterAsRestaurant from './views/RegisterAsRestaurant.vue';
import LoginPage from './views/LoginPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/register/customer', component: RegisterAsCustomer },
  { path: '/register/restaurant', component: RegisterAsRestaurant },
  { path: '/login', component: LoginPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
