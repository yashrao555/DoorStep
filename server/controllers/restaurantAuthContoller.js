const express = require('express');
const { registerRestaurant, verifyRestaurantOTP, loginRestaurant } = require('../services/restaurantAuthService');

const restaurantAuthController = express.Router()

restaurantAuthController.post("/register-restaurant", async (req, res) => {
    const restaurantData = req.body;

    

    const result = await registerRestaurant(restaurantData);
    console.log(result);

    if (result) {
        res.json(result);
    } else {
        res.status(500).json(result);
    }
});

restaurantAuthController.post('/verify-restaurant-otp', async (req, res) => {
    const { email, otp } = req.body;

    const result = await verifyRestaurantOTP(email, otp);

    if (result.message) {
        res.json(result);
    } else {
        res.status(401).json(result);
    }
});

restaurantAuthController.post("/login-restaurant", async (req, res) => {
    const { email, password } = req.body;

    const result = await loginRestaurant(email, password);

    if (result.token) {
        res.json(result);
    } else {
        res.status(401).json(result);
    }
});

module.exports = restaurantAuthController