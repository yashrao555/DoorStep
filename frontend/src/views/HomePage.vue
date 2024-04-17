<template>
    <div class="scroll-container">
  <div class="row ">
    <div class="col-sm-12 col-lg-6 col-md-6 col-12">
      <img
        src="https://img.myloview.com/stickers/food-order-line-icon-meal-delivery-app-sign-online-catering-service-symbol-minimal-line-illustration-background-food-order-line-icon-pattern-banner-white-web-template-concept-vector-700-280930949.jpg"
        alt="text"
      />
    </div>

    <div class="col-sm-12 col-lg-6 col-md-6 col-12">
      <div class="registration-box">
        <h2 class="register-text ">Register as</h2>
        <div class="button-container">
          <button
            class="register-button"
            @click="redirectTo('/register/customer')"
          >
            Customer
          </button>
          <button
            class="register-button"
            @click="redirectTo('/register/restaurant')"
          >
            Restaurant
          </button>
        </div>
      </div>

      <div class="login-container">
        <p class="already-registered-text">Already registered?</p>
        <button class="login-button" @click="redirectTo('/login')">
          Login
        </button>
      </div>
    </div>
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

.scroll-container {
  height: 100vh; 
  overflow-y: auto; 
}


img{
  margin-top: 30vh;
  margin-left: 25vw;
  height: 50vh;
  width:50vw;
}



.registration-box {
  margin-top: 20vh;
  height: 20vh;
  width: 25vw;
  background-color: #ffa500;
  border-radius: 10px;
}

.register-text {
  color: white;
  font-size: 2vw;
  margin-top: 30%;
  margin-left: 7vw;
}

.button-container {
  margin-top: 8vh;
  text-align: center;
}

.register-button {
  background-color: #ffa500;
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1vw;
}

.login-container {
  margin-top: 3vh;
  text-align: center;
  width: 25vw;
  margin-bottom: 22%;
}

.already-registered-text {
  color: #ffa500;
  font-size: 20px;
}

.login-button {
  background-color: #ffa500;
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

@media (max-width: 768px) {

  .registration-box {
  margin-top: 20vh;
  margin-left: 40vw;
  height: 20vh;
  width: 25vw;
  background-color: #ffa500;
  border-radius: 10px;
}

.button-container {
  margin-top: 6vh;
}

.login-container {
  margin-left: 40vw;
}
}
</style>
