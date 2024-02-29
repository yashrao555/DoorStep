import { createStore } from 'vuex';
import VueCookies from "vue-cookies";
// import createPersistedState from 'vuex-persistedstate';
export default createStore({
  state: {
    isLoggedIn: false,
    role: null,
  },
  mutations: {
    setLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setRole(state, role) {
      state.role = role;
    },
  },
  actions: {
    login({ commit }, { role }) {
      // VueCookies.set('token', token);
      commit('setLoggedIn', true);
      commit('setRole', role);
    },
    logout({ commit }) {
      VueCookies.remove('token');
      commit('setLoggedIn', false);
      commit('setRole', null);
    },
  },
  });

