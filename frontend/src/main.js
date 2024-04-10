import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import cookies from 'vue-cookies';
import axios from 'axios';
<<<<<<< Updated upstream
axios.defaults.withCredentials=true;
=======
axios.defaults.withCredentials = true;
>>>>>>> Stashed changes
createApp(App).use(store).use(router).use(cookies).mount('#app');
