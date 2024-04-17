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
              placeholder="name@example.com"
              v-model="email"
            />
            <label for="inputEmail4">Email</label>
          </div>
  
          <div class="col-md-6 form-floating">
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="name@example.com"
              v-model="password"
            />
            <label for="inputPassword4">Password</label>
          </div>
  
          <div class="col-md-6">
            <label for="username" class="form-label">Restaurant Name</label>
            <input type="text" class="form-control" id="username" v-model="restaurantName"/>
          </div>
  
          <div class="col-md-4">
            <label for="opensat" class="form-label">Opens At</label>
            <input type="time" id="opensat" class="form-control" v-model="opensAt"/>
          </div>
  
          <div class="col-md-2">
            <label for="closesat" class="form-label">Closes At</label>
            <input type="time" id="closesat" class="form-control" v-model="closesAt"/>
          </div>
  
          <div class="col-12">
            <label for="inputAddress2" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
              v-model="address"
            />
          </div>
  
          <div class="col-md-6">
            <label for="inputCity" class="form-label">City</label>
            <input type="text" class="form-control" id="inputCity" v-model="city"/>
          </div>
  
          <div class="col-md-4">
            <label for="inputState" class="form-label">State</label>
            <select id="inputState" class="form-select" v-model="state">
              <option selected>Choose...</option>
              <option>gandhinagar</option>
            </select>
          </div>
  
          <div class="col-md-2">
            <label for="inputZip" class="form-label">Zip</label>
            <input type="text" class="form-control" id="inputZip" v-model="zip" />
          </div>
  
          <div class="col-md-12 form-floating">
            <input
              type="text"
              class="form-control"
              id="contact"
              placeholder="name@example.com"
              v-model="phone"
            />
            <label for="contact">Contact Number</label>
          </div>
  
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Register</button>
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
  