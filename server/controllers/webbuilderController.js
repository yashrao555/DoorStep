const express = require('express')

const {createTextComponent, getAllTextComponents, getCss} = require('../services/webbuilder.js')

const webController = express.Router()

webController.post('/text-builder',async(req,res)=>{

    try {
        
        const internalLayout = req.body.internalLayout
        const result =await createTextComponent(internalLayout);
        
        return res.status(201).json({result});
    } catch (error) {
        console.log("asdfghjklkjhgfdsasdfgh");
        return res.status(500).json(error);
    }
    
})

webController.get('/get-all-text',async(req,res)=>{
    try {
        const result = await getAllTextComponents();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }
})

webController.get('/get-css',async(req,res)=>{
    try {
        const result = await getCss();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
        
    }
})
module.exports = webController