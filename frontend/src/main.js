import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';
import hi from './locales/hi.json'
import App from './App.vue';
import router from './router';
import store from './store';
import cookies from 'vue-cookies';
import axios from 'axios';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

axios.defaults.withCredentials = true;

const i18n = new createI18n({
  locale: 'en', // Set default locale
  messages: {
    en,
    fr,
    hi
    // Add more languages if needed
  },
});

const app = createApp(App);
app.use(ToastPlugin);
app.use(store);
app.use(router);
app.use(cookies);
app.use(i18n); // Integrate VueI18n here
app.mount('#app');
