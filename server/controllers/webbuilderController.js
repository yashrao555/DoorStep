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

webController.get('/get-all-text/:layout_id',async(req,res)=>{
    const {layout_id} = req.params
    try {
        const result = await getAllTextComponents(layout_id);
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }
})

webController.get('/get-css/:layout_id',async(req,res)=>{
    const {layout_id} = req.params
    try {
        const result = await getCss(layout_id);
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
        
    }
})
module.exports = webController