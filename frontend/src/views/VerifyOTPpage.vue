<template>
    <div class="otp-verification-container">
      <div class="otp-box">
        <h2>OTP VERIFICATION</h2>
        <form @submit.prevent="verifyOTP">
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" id="inputEmail" required>
          </div>
          <div class="mb-3">
            <label for="inputOTP" class="form-label">OTP</label>
            <input v-model="otp" type="text" class="form-control" id="inputOTP" required>
          </div>
          <button type="submit" class="btn btn-primary">Verify</button>
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
        otp: '',
      };
    },
    methods: {
      async verifyOTP() {
        try {
          const response = await axios.post('http://localhost:3000/verify-user-otp', {
            email: this.email,
            otp: this.otp,
          });
  
          // Handle the response from the backend
          console.log('response : ',response.data);
  
          if (response.data.message) {
            // Verification successful, navigate to another page
            this.$router.push('/login');
          } else if (response.data.error) {
            // Verification failed
            console.error('Error verifying OTP:', response.data.error);
            // Optionally, show an error message on the frontend
          }
        } catch (error) {
          console.error('Failed to make the API request:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .otp-verification-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .otp-box {
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  /* Additional styling for form elements */
  .form-control {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .btn-primary {
    width: 100%;
  }
  </style>
  