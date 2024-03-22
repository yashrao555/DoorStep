const express = require('express');
const { registerStaff, getAllStaff } = require('../services/staffService');

const staffController = express.Router()

staffController.post('/create-staff',async(req,res)=>{
    const {name,email,password,role} = req.body;
    const staffData = {
        name,email,password,role
    }

    const result = await registerStaff(staffData);
    if (result) {
        res.json(result);
    } else {
        res.status(500).json(result);
    }
})
staffController.get('/get-all-staff',async(req,res)=>{
    try {
        const result = await getAllStaff();
        if (result) {
            res.json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        return res.status(500).json("No")
    }
})

staffController.post('/login-staff',async(req,res)=>{
    
})
module.exports = staffController