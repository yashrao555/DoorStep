<template>
  <div class="custom-container ">

    <div v-if="displayNavigation" class="nav-container">
      <app-navigation></app-navigation>
    </div>

    <div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import AppNavigation from "./components/AppNavigation.vue";
import { mapGetters } from 'vuex';

export default {
  name: "App",
  components: {
    AppNavigation,
  },
  computed: {
    ...mapGetters(['navigationIsDisplayed']),
    displayNavigation() {
      return this.navigationIsDisplayed;
    },
  },
};
</script>

<style scoped>
.custom-container{
  overflow: auto !important;
  width: 100vw !important;
  height: 100vh !important;
}

.nav-container{
  width:100%;
}

</style>
