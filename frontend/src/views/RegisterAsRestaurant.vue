<template>
    <div class="scroll-container">
      <!-- Dynamic Registration Form based on the selected type -->
      <div class="registration-container">
        <form class="row g-3" @submit.prevent="registerRestaurant">
          <!-- Customer Registration Form -->
          <div class="col-md-6 form-floating">
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              :placeholder="$t('registrationR.placeholders.email')"
              v-model="email"
            />
            <label for="inputEmail4">{{ $t('registrationR.email') }}</label>
          </div>
  
          <div class="col-md-6 form-floating">
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              :placeholder="$t('registrationR.placeholders.password')"
              v-model="password"
            />
            <label for="inputPassword4">{{ $t('registrationR.password') }}</label>
          </div>
  
          <div class="col-md-6">
            <label for="username" class="form-label">{{ $t('registrationR.restaurant_name') }}</label>
            <input type="text" class="form-control" id="username" v-model="restaurantName"/>
          </div>
  
          <div class="col-md-4">
            <label for="opensat" class="form-label">{{ $t('registrationR.opens_at') }}</label>
            <input type="time" id="opensat" class="form-control" v-model="opensAt"/>
          </div>
  
          <div class="col-md-2">
            <label for="closesat" class="form-label">{{ $t('registrationR.closes_at') }}</label>
            <input type="time" id="closesat" class="form-control" v-model="closesAt"/>
          </div>
  
          <div class="col-12">
            <label for="inputAddress2" class="form-label">{{ $t('registrationR.address') }}</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress2"
              :placeholder="$t('registrationR.placeholders.address')"
              v-model="address"
            />
          </div>
  
          <div class="col-md-6">
            <label for="inputCity" class="form-label">{{ $t('registrationR.city') }}</label>
            <input type="text" class="form-control" id="inputCity" v-model="city"/>
          </div>
  
          <div class="col-md-4">
            <label for="inputState" class="form-label">{{ $t('registrationR.state') }}</label>
            <select id="inputState" class="form-select" v-model="state">
              <option selected>{{ $t('registrationR.placeholders.choose') }}</option>
              <option>{{ $t('registrationR.states.gandhinagar') }}</option>
            </select>
          </div>
  
          <div class="col-md-2">
            <label for="inputZip" class="form-label">{{ $t('registrationR.zip') }}</label>
            <input type="text" class="form-control" id="inputZip" v-model="zip" />
          </div>
  
          <div class="col-md-12 form-floating">
            <input
              type="text"
              class="form-control"
              id="contact"
              :placeholder="$t('registrationR.placeholders.contact_number')"
              v-model="phone"
            />
            <label for="contact">{{ $t('registrationR.contact_number') }}</label>
          </div>
  
          <div class="col-12">
            <button type="submit" class="btn btn-primary">{{ $t('registrationR.register_button') }}</button>
          </div>
        </form>
      </div>
    </div>
  </template>



  <script>
import axios from 'axios';

export default {
  data() {
    return {
          email: '',
          password: '',
          restaurantName: '',
          opensAt: '',
          closesAt: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          phone: '',
    };
  },
  methods: {
    async registerRestaurant() {
      try {
        const response = await axios.post('http://localhost:3000/register-restaurant', {
          name: this.restaurantName,
          opens_at: this.opensAt,
          closes_at: this.closesAt,
          email: this.email,
          phone: this.phone,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          password: this.password,
         // location_lat: this.locationLat,
         // location_long: this.locationLong,
          // Add other fields as needed
        });

        // Handle the response from the backend
        console.log(response.data);

        if (response.data.message) {
          // Registration successful, handle redirection or other actions
          alert(response.data.message);
          this.$router.push('/verifyRestaurantOTP');
        } else if (response.data.error) {
          // Registration failed, display error message
          alert(response.data.error);
        }
      } catch (error) {
        console.error('Failed to make the API request:', error);
      }
    },
  },
};
</script>

  
  <style scoped>

  .scroll-container {
  height: 100vh; 
  overflow-y: auto; 
}


  .registration-container {
    max-width: 800px; /* Set a maximum width for better readability */
    margin: auto; /* Center the form horizontally on the screen */
    margin-top: 200px;
    padding: 20px; /* Add some padding for better spacing */
  }
  
  /* Adjust the layout for larger screens (md and above) */
  @media (max-width: 768px) {
    .registration-container {
      margin-top: 50px;
    }
  }
  
  /* Additional styling for form elements */
  .form-control {
    margin-bottom: 10px; /* Add some space between form controls */
  }
  
  .btn-primary {
    width: 100%; /* Make the button full width */
  }
  
  .registration-type {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .image-wrapper {
    cursor: pointer;
  }
  
  .image-wrapper img {
    width: 50%;
    height:max-content;
  }
  
  /* Optional: Add styles for the button or customize as needed */
  button {
    padding: 10px;
    cursor: pointer;
  }
  </style>
  