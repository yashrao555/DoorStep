<template>
  <div class="scroll-container">
    <div class="registration-container">
      <form class="row g-3" @submit.prevent="validateForm">
        <!-- Customer Registration Form -->
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">{{ $t('registrationC.email') }}</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-control"
            id="inputEmail4"
            :placeholder="$t('registrationC.placeholders.email')"
          />
          <div v-if="formSubmitted && (!formData.email || !validateEmail(formData.email))" class="error-message">
            {{ !formData.email ? $t('registrationC.validation_messages.email_required') : $t('registrationC.validation_messages.invalid_email') }}
          </div>
        </div>

        <div class="col-md-6 ">
          <label for="inputPassword4" class="form-label">{{ $t('registrationC.password') }}</label>
          <input
            v-model="formData.password"
            type="password"
            class="form-control"
            id="inputPassword4"
            :placeholder="$t('registrationC.placeholders.password')"
          />
          <div v-if="formSubmitted && !validatePassword(formData.password)" class="error-message">
            {{ $t('registrationC.validation_messages.password_length') }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="username" class="form-label">{{ $t('registrationC.user_name') }}</label>
          <input v-model="formData.name" type="text" class="form-control" id="username" />
          <div v-if="formSubmitted && !validateUsername(formData.name)" class="error-message">
            {{ $t('registrationC.validation_messages.user_name_required') }}
          </div>
        </div>

        <div class="col-md-4">
          <label for="dob" class="form-label">{{ $t('registrationC.date_of_birth') }}</label>
          <input v-model="formData.dob" type="date" id="dob" class="form-control" />
          <!-- <div v-if="!validateDOB(formData.dob)" class="error-message">
            Date of Birth is required.
          </div> -->
        </div>

        <div class="col-md-2">
          <label for="gender" class="form-label">{{ $t('registrationC.gender') }}</label>
          <select v-model="formData.gender" id="gender" class="form-select">
            <option selected>Choose...</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
          </select>
          <div v-if="formSubmitted && !validateGender(formData.gender)" class="error-message">
            {{ $t('registrationC.validation_messages.gender_required') }}
          </div>
        </div>

        <div class="col-12">
          <label for="inputAddress2" class="form-label">{{ $t('registrationC.address') }}</label>
          <input
            v-model="formData.address"
            type="text"
            class="form-control"
            id="inputAddress2"
            :placeholder="$t('registrationC.placeholders.address')"
          />
          <div v-if="formSubmitted && !validateAddress(formData.address)" class="error-message">
            {{ $t('registrationC.validation_messages.address_required') }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="inputCity" class="form-label">{{ $t('registrationC.city') }}</label>
          <input v-model="formData.city" type="text" class="form-control" id="inputCity" />
          <div v-if="formSubmitted && !validateCity(formData.city)" class="error-message">
            {{ $t('registrationC.validation_messages.city_required') }}
          </div>
        </div>

        <div class="col-md-4">
          <label for="inputState" class="form-label">{{ $t('registrationC.state') }}</label>
          <select v-model="formData.state" id="inputState" class="form-select">
           <option selected>Choose...</option>
              <option>gandhinagar</option>
          </select>
          <div v-if="formSubmitted && !validateState(formData.state)" class="error-message">
            {{ $t('registrationC.validation_messages.state_required') }}
          </div>
        </div>

        <div class="col-md-2">
          <label for="inputZip" class="form-label">{{ $t('registrationC.zip') }}</label>
          <input v-model="formData.zip" type="text" class="form-control" id="inputZip" />
          <div v-if="formSubmitted && !validateZip(formData.zip)" class="error-message">
            {{ $t('registrationC.validation_messages.zip_invalid') }}
          </div>
        </div>


        <div class="col-md-12">
          <label for="contact" class="form-label">{{ $t('registrationC.contact_number') }}</label>
          <input
            v-model="formData.phone"
            type="text"
            class="form-control"
            id="contact"
            :placeholder="$t('registrationC.placeholders.contact_number')"
          />
          <div v-if="formSubmitted &&!validateContact(formData.phone)" class="error-message">
            {{ $t('registrationC.validation_messages.contact_number_invalid') }}
          </div>
        </div>

        <div class="col-md-12">
          <button type="submit" class="btn btn-primary">{{ $t('registrationC.register_button') }}</button>
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
        formData: {
          email: '',
          password: '',
          name: '',
          dob: null,
          gender: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          phone: '',
          // ... other form fields ...
        },
        formSubmitted: false
      };
    },
    methods: {
     async validateForm() {

        this.formSubmitted = true;


        // Add more validation logic if needed
        if (
          this.validateEmail(this.formData.email) &&
          this.validatePassword(this.formData.password) &&
          this.validateUsername(this.formData.name) &&
          this.validateGender(this.formData.gender) &&
          this.validateAddress(this.formData.address) &&
          this.validateCity(this.formData.city) &&
          this.validateState(this.formData.state) &&
          this.validateZip(this.formData.zip) &&
          this.validateContact(this.formData.phone)
        ) {
        try {
          const response = await axios.post('http://localhost:3000/register-user', this.formData);

          // Handle the response from the backend
          console.log(response.data);

          // Optionally, you can perform further actions based on the response
          if (response.data.message) {
            // Registration success
            console.log('User registered successfully.');
            this.$router.push('/verifyOTP');
          } else if (response.data.error) {
            // Registration failed
            console.error('Error registering user:', response.data.error);
          }
        } catch (error) {
          console.error('Failed to make the API request:', error);
        }
      } else {
        console.log('Form is invalid');
      }
      },
      validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      validatePassword(password) {
        return password.length >= 8;
      },
      validateUsername(name) {
        return name.trim() !== '';
      },
      validateGender(gender) {
        return gender !== '';
      },
      validateAddress(address) {
        return address.trim() !== '';
      },
      validateCity(city) {
        return city.trim() !== '';
      },
      validateState(state) {
        return state.trim() !== '';
      },
      validateZip(zip) {
        // Simple ZIP code validation, you can enhance it as needed
        const zipRegex = /^\d{6}$/;
        return zipRegex.test(zip);
      },
      validateContact(phone) {
        // Simple contact number validation, you can enhance it as needed
        const contactRegex = /^[0-9]{10}$/;
        return contactRegex.test(phone);
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
    width: 100%; 
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
  
  .error-message {
    color: red;
    margin-top: 5px;
  }
  </style>
  
  