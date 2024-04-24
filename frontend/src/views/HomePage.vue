<template>
  <!-- <div class="scroll-container">
  <div class="row ">
    <div class="col-sm-12 col-lg-6 col-md-6 col-12">
      <img
        src="https://img.myloview.com/stickers/food-order-line-icon-meal-delivery-app-sign-online-catering-service-symbol-minimal-line-illustration-background-food-order-line-icon-pattern-banner-white-web-template-concept-vector-700-280930949.jpg"
        alt="text"
      />
    </div>

      <div class="col-sm-12 col-lg-6 col-md-6 col-12">
        <div class="registration-box">
          <h2 class="register-text ">{{ $t('registration.register_as') }}</h2>
          <div class="button-container">
            <button
              class="register-button"
              @click="redirectTo('/register/customer')"
            >
              {{ $t('registration.customer') }}
            </button>
            <button
              class="register-button"
              @click="redirectTo('/register/restaurant')"
            >
              {{ $t('registration.restaurant') }}
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
</div> -->

  <div class="row custom">

    <div class="col-lg-6 col-md-12 col-sm-12 col-12">
      <img
        src="https://image.slidesdocs.com/responsive-images/background/mobile-food-delivery-application-in-3d-order-food-online-powerpoint-background_3e949beb2e__960_540.jpg"
        alt="text"
      />
    </div>

    <div class="col-lg-6 col-md-12 col-sm-12 col-12">
      <div class="restaurant-div text-center">
        <div class="large-text">
          <span id="partner">Partner</span> with us ?
        </div>
        <button
          @click="redirectTo('/register/restaurant')"
          class="small-text register-button"
        >
          Register as restaurant
        </button>
      </div>

      <div class="customer-div text-center">
        <div class="large-text">
          <span id="partner">Enjoy food</span> at your DoorStep ?
        </div>
        <div
          @click="redirectTo('/register/customer')"
          class="register-button small-text"
        >
          Register as customer
        </div>
      </div>

      <div class="restaurant-div text-center">
        <div class="large-text">
          <span id="partner">Already</span> regsitered ?
        </div>
        <button
          @click="redirectTo('/login')"
          class="small-text register-button"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* Your styles */
</style>


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
.custom {
  margin-top: 15vh;
}

.restaurant-div {
  margin-top: 6vh;
  margin-bottom: 5vh;
  /* margin-left: 15vw; */
  border-radius: 6px;
  /* width: 20vw; */
}

.customer-div {
  margin-top: 3vh;
  margin-bottom: 5vh;
}

img {
  border: 5px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 50vw;
  height: 35vw;
}

.large-text {
  font-size: 2.5vw;
  margin-top: 1vw;
}

.small-text {
  font-size: 1.7vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
}

#partner {
  padding: 9px 9px;
  border-radius: 3px;
  background-color: #ffa500;
  color: #ffffff;
}

/* .scroll-container {
  height: 100vh;
  overflow-y: auto;
} */

/* img {
  margin-top: 30vh;
  margin-left: 25vw;
  height: 50vh;
  width: 50vw;
} */

/* .registration-box {
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
} */

.register-button {
  background-color: white;
  color: #ffa500;
  padding: 10px 20px;
  margin: 10px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5vw;
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

@media (max-width: 992px) {
  img {
    width: 100vw;
    height: 70vw;
  }

  .large-text {
    font-size: 4vw;
  }

  .small-text {
    font-size: 3vw;
  }
}
</style>
