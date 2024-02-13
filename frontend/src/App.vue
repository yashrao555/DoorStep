<template>
  <div>
    <app-navigation></app-navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import AppNavigation from "./components/AppNavigation.vue";

export default {
  name: "App",
  components: {
    AppNavigation,
  },
};
</script>

<style></style>
