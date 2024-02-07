<template>
    <div>
      <!-- Dynamic Registration Form based on the selected type -->
      <div class="registration-container">
        <form class="row g-3">
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
            <label for="username" class="form-label">Restaurant Name</label>
            <input type="text" class="form-control" id="username" />
          </div>
  
          <div class="col-md-4">
            <label for="opensat" class="form-label">Opens At</label>
            <input type="time" id="opensat" class="form-control" />
          </div>
  
          <div class="col-md-2">
            <label for="closesat" class="form-label">Closes At</label>
            <input type="time" id="closesat" class="form-control"/>
          </div>
  
          <div class="col-12">
            <label for="inputAddress2" class="form-label">Address</label>
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
  </template>
  
  <style scoped>
  .registration-container {
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
  