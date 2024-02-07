<template>
  <div>
    <div class="registration-type">
      <div class="image-wrapper1" @click="setRegistrationType('customer')">
        <img src="https://img.lovepik.com/original_origin_pic/18/09/19/7d049e337a8653bb85e8bf0833afd3e5.png_wh860.png" alt="Customer Image" />
      </div>
      <h2>Register as?</h2>
      <div class="image-wrapper" @click="setRegistrationType('restaurant')">
        <img src="data:image/jpeg;base64,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kP2nxS4VaNVl1YU3IAFckkKSABy5ub9knOz9kqE5xqglqhstesos1RmXmq4A5pHRAB2VQpV6L06NJGtUW600U2Kg9A36b+09c201w2eFqU3UuQM989Wo4F1sLK7EXv0ibGAIiIAiIgCIiAIiIBh7Za2HrGwNqVQ2YAjRCRcHQjslqlwfwiKEGGoWUBRekhNgLC5I1l/alE1KNVF1ZqbqO9lIGveZSdmU/wBKt/qMR/uQDjnHZgaVGpRFKmiBi7HIoW5K016Bu5g06yT0mcxn0Nwn4F08bXppUDmmFdgzPWezcwEE8oCOi2ttDpvmB/8AyHB9Y+Vf/fgHNeK+glTG8m6qyNTyEMAQQ9fDo2h6crML7xefQPmTC/2ah/lU/CQzZ3F9SwWIptRBOZSGKmqtgtfDuec1VrHKrWtY6aSa+bKf6Vb/AFGI/wByAWNl4CktOrQFJBS5SoCmVcpDWYgraxHOt3ADonv9HcH/AGTD/wCTT8JkbOwvJB11sXZhmZmJBA3sxJO47zMuAYOF2NhqTB6eHoo4vZkporC+hsQL7pnREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA/9k=" alt="Restaurant Image" />
      </div>
    </div>


    <div>
      <!-- Dynamic Registration Form based on the selected type -->
      <div class="registration-container">
        <form class="row g-3">
          <template v-if="registrationType === 'customer'">
            <!-- Customer Registration Form -->
            <div class="col-md-6 form-floating">
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="name@example.com"
            />
            <label for="inputEmail4">Email</label>
          </div>

          <div class="col-md-6 form-floating">
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="name@example.com"
            />
            <label for="inputPassword4">Password</label>
          </div>

          <div class="col-md-6">
            <label for="username" class="form-label">User Name</label>
            <input type="text" class="form-control" id="username" />
          </div>

          <div class="col-md-4">
            <label for="dob" class="form-label">Date Of Birth</label>
            <select id="dob" class="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>

          <div class="col-md-2">
            <label for="gender" class="form-label">Gender</label>
            <input type="text" class="form-control" id="gender" />
          </div>

          <div class="col-12">
            <label for="inputAddress2" class="form-label">Address 2</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>

          <div class="col-md-6">
            <label for="inputCity" class="form-label">City</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>

          <div class="col-md-4">
            <label for="inputState" class="form-label">State</label>
            <select id="inputState" class="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>

          <div class="col-md-2">
            <label for="inputZip" class="form-label">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div>

          <div class="col-md-12 form-floating">
            <input
              type="text"
              class="form-control"
              id="contact"
              placeholder="name@example.com"
            />
            <label for="contact">Contact Number</label>
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
            <!-- ... (Other customer registration form fields) ... -->
          </template>

          <template v-else-if="registrationType === 'restaurant'">
            <!-- Restaurant Registration Form -->
            <div>
              <label for="restaurantName">Restaurant Name</label>
              <input type="text" id="restaurantName" class="form-control" />
            </div>
            <!-- ... (Other restaurant registration form fields) ... -->
          </template>
        </form>
      </div>
    </div>


  </div>
  <!-- <div>
    <div class="registration-type">
      <h2>Register as?</h2>
      <button @click="toggleRegistrationType">{{ registrationType === 'customer' ? 'Restaurant' : 'Customer' }}</button>
    </div>

    <div v-if="registrationType === 'customer'">
      <div class="registration-container">
        <form class="row g-3">
          <div class="col-md-6 form-floating">
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="name@example.com"
            />
            <label for="inputEmail4">Email</label>
          </div>

          <div class="col-md-6 form-floating">
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="name@example.com"
            />
            <label for="inputPassword4">Password</label>
          </div>

          <div class="col-md-6">
            <label for="username" class="form-label">User Name</label>
            <input type="text" class="form-control" id="username" />
          </div>

          <div class="col-md-4">
            <label for="dob" class="form-label">Date Of Birth</label>
            <select id="dob" class="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>

          <div class="col-md-2">
            <label for="gender" class="form-label">Gender</label>
            <input type="text" class="form-control" id="gender" />
          </div>

          <div class="col-12">
            <label for="inputAddress2" class="form-label">Address 2</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>

          <div class="col-md-6">
            <label for="inputCity" class="form-label">City</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>

          <div class="col-md-4">
            <label for="inputState" class="form-label">State</label>
            <select id="inputState" class="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>

          <div class="col-md-2">
            <label for="inputZip" class="form-label">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div>

          <div class="col-md-12 form-floating">
            <input
              type="text"
              class="form-control"
              id="contact"
              placeholder="name@example.com"
            />
            <label for="contact">Contact Number</label>
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>

    <div v-else-if="registrationType === 'restaurant'">
     
      <div class="registration-container">
        <form class="row g-3">
         
        </form>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "TheRegister",
  data() {
    return {
      registrationType: null, // Initial type is customer
    };
  },
  methods: {
    setRegistrationType(type) {
      // Set the registration type when an image is clicked
      this.registrationType = type;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .bgclass{
  margin: 0;
  padding: 0;
  background-image: url('https://wallpapers.com/images/hd/stylish-black-head-like-pattern-948y1zvm58tmd4fy.jpg'); 
  background-size:contain;
  background-position: center;
} */
.registration-container {
  /* background-image: url('https://watermark.lovepik.com/photo/40026/7474.jpg_wh1200.jpg'); Relative path to the image in the assets folder */
  /* background-size: cover; */
  /* background-position: center; */
  max-width: 600px; /* Set a maximum width for better readability */
  margin: auto; /* Center the form horizontally on the screen */
  margin-top: 200px;
  padding: 20px; /* Add some padding for better spacing */
}

/* Adjust the layout for larger screens (md and above) */
@media (min-width: 768px) {
  .registration-container {
    max-width: 800px; /* Increase the maximum width for larger screens */
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
