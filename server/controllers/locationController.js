const express = require('express');
const { getCoordinatesFromAddress } = require('../services/locationService');

const locationController = express.Router()

locationController.get('/coordinates-from-address',async(req,res)=>{
    const geocodingResult = await getCoordinatesFromAddress('Perungudi');
    const result={
        latitude:geocodingResult[0].latitude,
        longitude:geocodingResult[0].longitude
    }
    res.json({ data: result });
})

  module.exports=locationController