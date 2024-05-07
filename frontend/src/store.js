import { createStore } from 'vuex';
// import VueCookies from "vue-cookies";
// import createPersistedState from 'vuex-persistedstate';
export default createStore({
  state: {
    displayNavigation: true,
  },
  mutations: {
    hideNavigation(state) {
      state.displayNavigation = false;
    },
    showNavigation(state) {
      state.displayNavigation = true;
    },
  },
  actions: {
    hideNavigation({ commit }) {
      commit('hideNavigation');
    },
    showNavigation({ commit }) {
      commit('showNavigation');
    },
  },
  getters: {
    navigationIsDisplayed: state => state.displayNavigation,
  },
  });

