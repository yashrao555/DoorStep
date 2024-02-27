// src/router.js
import VueCookies from "vue-cookies";
// import {jwtDecode} from 'jwt-decode';
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import RegisterAsCustomer from "./views/RegisterAsCustomer.vue";
import RegisterAsRestaurant from "./views/RegisterAsRestaurant.vue";
import LoginPage from "./views/LoginPage.vue";
import LandingPage from "./views/LandingPage.vue";
import RestaurantPage from "./views/RestaurantPage.vue";
import AddToCart from "./components/AddToCart.vue";
import CheckPage from "./views/CheckPage.vue";
import VerifyOTPpage from "./views/VerifyOTPpage.vue";
import VerifyOTPrestaurant from "./views/VerifyOTPrestaurant.vue";
import MyOrders from './views/MyOrders.vue'
import RestaurantDashboard from './views/RestaurantDashboard.vue';

const routes = [
  { path: "/", component: LandingPage },
  { path: "/register", component: HomePage },
  { path: "/register/customer", component: RegisterAsCustomer },
  { path: "/register/restaurant", component: RegisterAsRestaurant },
  { path: "/login", component: LoginPage },
  { path: "/restaurant/:id", component: RestaurantPage },
  { path: "/cart", component: AddToCart,  beforeEnter: guardLoggedIn },
  { path: "/checks", component: CheckPage },
  { path: "/verifyOTP", component: VerifyOTPpage },
  { path: "/verifyRestaurantOTP", component: VerifyOTPrestaurant },
  { path: "/restaurant-dashboard", component: RestaurantDashboard},
  { path: "/myOrders", component: MyOrders, beforeEnter: guardLoggedIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


function guardLoggedIn(to, from, next) {
  const token = VueCookies.get("token");
  
  if (token) {
    // User is logged in, allow access
    next();
  } else {
    // User is not logged in, redirect to login page
    next('/login');
  }
}

// function guardRestaurantLoggedIn(to, from, next) {
//   const token = VueCookies.get('token'); 
//       if(token===null){
//         next('/');
//         return;
//       }
//       const decodedToken = jwtDecode(token);
//       if(decodedToken.restaurantId){
//         next('/restaurant-dashboard');
//       }
//       else{
//         next('/');
//       }
// }
// router.beforeEach(async (to, from, next) => {
//   const check = ["/login", "/register"].reduce(
//     (total, route) => total && route !== to.fullPath,
//     true
//   );
//   check is false when route is login or register
//   if check is false and no token is present, allow
//   if check is false and token is present, dont allow
//   if check is true, and no token is present, dont allow
//   if check is true and token is present, allow
//   console.log(from);
//   console.log(to);
//   console.log(check);
//   const token = VueCookies.get("token");
//   console.log(token);
//   if (token == null || token == undefined) {
//     if (check) next(from.path);
//     else next();
//   } else {
//     if (check) next();
//     else next(from.fullPath);
//   }
// });

export default router;
