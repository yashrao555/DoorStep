const express = require('express');
const Customer = require('../models/customer');
const { registerCustomer,verifyOTP,loginCustomer,accessProtectedResource } = require('../services/authService');

const authController = express.Router();

const {authenticateToken} = require('../util/verifyToken')

// ... (other imports)

authController.post('/verify-user-otp', async (req, res) => {
    const { email, otp } = req.body;

    const result = await verifyOTP(email, otp);
    console.log('result is :',result)

    if (result.message) {
        res.json(result);
    } else {
        res.status(401).json(result);
    }
});

authController.post("/register-user", async (req, res) => {
    const userData = req.body;

    const result = await registerCustomer(userData);
    console.log(result);

    if (result) {
        res.json(result);
    } else {
        res.status(500).json(result);
    }
});

authController.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    const result = await loginCustomer(email, password);

    if (result.token) {
        res.json(result);
    } else if(result.error){
        res.json(result);
    }
    else{
        res.status(401).json(result)
    }
});

authController.get('/protected-resource', authenticateToken, (req, res) => {
    const result = accessProtectedResource(req);

    if (result.message) {
        res.json(result);
    } else {
        res.status(500).json(result);
    }
});

authController.get('/get-user-address/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Replace this with your actual database query to get the user's address
    //   const user = await Customer.findById(userId);

      const user = await Customer.findOne({
        where: {
            customer_id: userId,
        },
    });
      const userAddress = `${user.address},${user.city},${user.state},${user.zip}`;
  
      res.json({ address: userAddress });
    } catch (error) {
      console.error('Error fetching user address:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = authController;
