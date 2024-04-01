// src/router.js
import VueCookies from "vue-cookies";
import {jwtDecode} from 'jwt-decode';
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
import RegisterStaff from "./views/RegisterStaff.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/register", component: HomePage },
  { path: "/register/customer", component: RegisterAsCustomer },
  { path: "/register/restaurant", component: RegisterAsRestaurant },
  { path: "/login", component: LoginPage },
  { path: "/restaurant/:id1/:id2", component: RestaurantPage },
  // { path: "/cart", component: AddToCart,  beforeEnter: guardLoggedIn },
  { path: "/cart", component: AddToCart },
  { path: "/checks", component: CheckPage },
  { path: "/verifyOTP", component: VerifyOTPpage },
  { path: "/verifyRestaurantOTP", component: VerifyOTPrestaurant },
  // { path: "/restaurant-dashboard", component: RestaurantDashboard, beforeEnter: guardRestaurantLoggedIn},
  // { path: "/myOrders", component: MyOrders, beforeEnter: guardRestaurantLoggedIn },
  // { path: "/register/staff", component: RegisterStaff, beforeEnter: guardLoggedIn },
  { path: "/restaurant-dashboard", component: RestaurantDashboard},
  { path: "/myOrders", component: MyOrders},
  { path: "/register/staff", component: RegisterStaff},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// function guardLoggedIn(to, from, next) {
//   const token = VueCookies.get("token");
  
//   if (token) {
//     // User is logged in, allow access
//     next();
//   } else {
//     // User is not logged in, redirect to login page
//     next('/login');
//   }
// }

// function guardRestaurantLoggedIn(to, from, next) {
//   const token = VueCookies.get('token'); 
      
//       const decodedToken = jwtDecode(token);
//       console.log('this is dt : ',decodedToken)
//       if(decodedToken.staffId){
//         if(decodedToken.role === 'order manager'){
//           next('/myOrders');
//         }
//         else if(decodedToken.role === 'Item Manager'){
//           next();
//         }
//         else{
//           next();
//         }
//       }
//       else{
//         next();
//       }
const publicRoutes = ['/login', '/', '/register','/register/customer',"/register/restaurant","/restaurant/:id1/:id2","/verifyOTP","/verifyRestaurantOTP",];

router.beforeEach((to, from, next) => {
  const token = VueCookies.get('token'); 

  // Check if token exists
  if (publicRoutes.includes(to.path)) {
    // Allow access to public routes
    next();
  } else if (!token) {
    // Redirect to login if token is null or undefined
    next('/login');
  }  else {
    // Decode the token
    const decoded = jwtDecode(token);

    // Check if decoded token has staffId
    if (decoded.staffId) {
      // Check the role and redirect accordingly
      if (decoded.role === 'order manager' && to.path !== '/myOrders') {
        next('/myOrders');
      } else if (decoded.role === 'Item Manager' && to.path !== '/restaurant-dashboard') {
        next('/restaurant-dashboard');
      } else {
        // Allow access to the requested route
        next();
      }
    } else {
      // Redirect to login if staffId is not present
      next();
    }
  }
});


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
