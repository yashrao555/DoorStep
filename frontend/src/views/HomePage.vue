<template>
  <div class="container">
    <div class="registration-box">
      <h2 class="register-text">Register as</h2>
      <div class="button-container">
        <button class="register-button" @click="redirectTo('/register/customer')">Customer</button>
        <button class="register-button" @click="redirectTo('/register/restaurant')">Restaurant</button>
      </div>
    </div>

    <div class="login-container">
      <p class="already-registered-text">Already registered?</p>
      <button class="login-button" @click="redirectTo('/login')">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirectTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
/* .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
} */

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of the viewport */
  margin-top:3%;
  background: url('https://img.myloview.com/stickers/food-order-line-icon-meal-delivery-app-sign-online-catering-service-symbol-minimal-line-illustration-background-food-order-line-icon-pattern-banner-white-web-template-concept-vector-700-280930949.jpg') center no-repeat; /* Replace with the path to your image */
}

.registration-box {
  text-align: center;
  padding: 20px;
  background-color: #ffa500; /* Classy shade of orange */
  border-radius: 10px;
  margin-left: 300px;
  margin-bottom: 3%;
  margin-top: 10%;
}

.register-text {
  color: white;
}

.button-container {
  margin-top: 20px;
}

.register-button {
  background-color: #ffa500; /* Classy shade of orange */
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-container {
  text-align: center;
  margin-left: 300px;
  margin-bottom: 22%;
}

.already-registered-text {
  color: #ffa500; /* Classy shade of orange */
  font-size: 20px;
}

.login-button {
  background-color: #ffa500; /* Classy shade of orange */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.registration-container {
  max-width: 600px;
  margin-top: 20px;
}
</style>
