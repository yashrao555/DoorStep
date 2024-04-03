const express = require('express');
const { registerStaff, getAllStaff, loginStaff, accessProtectedStaffResource } = require('../services/staffService');
const { authenticateToken } = require('../util/verifyToken');

const staffController = express.Router()

staffController.post('/create-staff',authenticateToken,async(req,res)=>{
    const {name,email,password,role,cityId} = req.body;
    try {
        
        if (req.restaurantId)
        {
            const staffData = {
                name,email,password,role,cityId
            }
        
            const result = await registerStaff(staffData);
            return res.status(201).json(result)
        }
    } catch (error) {
        return res.status(500).json(error);
    }
    
        
    
})
staffController.post('/login-staff',async(req,res)=>{
    const {email,password} = req.body;
    try {
        const result = await loginStaff(email,password);
        if (result) {
            res.json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        return res.status(500).json("No")
    }
})
staffController.get('/get-all-staff',authenticateToken,async(req,res)=>{
    try {
        if(req.restaurantId){
            const result = await getAllStaff();
        if (result) {
            res.json(result);
        } else {
            res.status(500).json(result);
        }
        }
        
    } catch (error) {
        return res.status(500).json("No")
    }
})


staffController.get('/protected-staff-resource', authenticateToken, (req, res) => {
    const result = accessProtectedStaffResource(req);

    if (result.message) {
        res.json(result);
    } else {
        res.status(500).json(result);
    }
});

module.exports = staffController