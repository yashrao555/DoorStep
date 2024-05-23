import VueCookies from "vue-cookies";
import {jwtDecode} from 'jwt-decode';
import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
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
import NotFoundPage from "./views/NotFoundPage.vue"
// import WebBuilder from './components/WebBuilder.vue'
import CanvasPage from "../src/Builder/views/CanvasPage.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/register", component: HomePage },
  { path: "/register/customer", component: RegisterAsCustomer },
  { path: "/register/restaurant", component: RegisterAsRestaurant },
  { path: "/login", component: LoginPage },
  { path: "/restaurant/:id1/:id2", component: RestaurantPage },
  { path: "/cart", component: AddToCart },
  { path: "/checks", component: CheckPage },
  { path: "/verifyOTP", component: VerifyOTPpage },
  { path: "/verifyRestaurantOTP", component: VerifyOTPrestaurant },
  { path: "/restaurant-dashboard", component: RestaurantDashboard},
  { path: "/myOrders", component: MyOrders},
  { path: "/register/staff", component: RegisterStaff},
  {path:"/builder",component:CanvasPage},
  // { path: "/not-found", component: NotFoundPage }, 
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    beforeEnter: (to, from, next) => {
      // Dispatch action to hide navigation
      store.dispatch('hideNavigation');
      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const publicRoutes = ['/login', '/', '/register','/register/customer',"/register/restaurant","/restaurant/:id1/:id2","/verifyOTP","/verifyRestaurantOTP","/builder",'/:pathMatch(.*)*',];

router.beforeEach((to, from, next) => {
  const token = VueCookies.get('token'); 
  console.log(to);
  // Check if token exists
  if (publicRoutes.some(route => {
    const regex = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`);
    return regex.test(to.path);
  })) {
    // Allow access to public routes
    next();
  }
  else if (!token) {
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



export default router;
