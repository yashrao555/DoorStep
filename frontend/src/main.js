import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import cookies from 'vue-cookies';
import axios from 'axios';
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
axios.defaults.withCredentials=true;
createApp(App).use(ToastPlugin).use(store).use(router).use(cookies).mount('#app');
