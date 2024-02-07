const express = require('express');

const { registerCustomer,verifyOTP,loginCustomer,accessProtectedResource } = require('../services/authService');

const authController = express.Router();

const {authenticateToken} = require('../util/verifyToken')

// ... (other imports)

authController.post('/verify-user-otp', async (req, res) => {
    const { email, otp } = req.body;

    const result = await verifyOTP(email, otp);

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
    } else {
        res.status(401).json(result);
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

module.exports = authController;
