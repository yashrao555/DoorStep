const express = require('express')
// const ImageComponent = require('../models/imagecomponent.js')
const multer = require('multer')


const storage = multer.memoryStorage();
const upload = multer({storage: storage, limits: { fileSize: 10 * 1024 * 1024 }  });
const {createTextComponent, getAllTextComponents, getCss, removeElement} = require('../services/webbuilder.js')

const webController = express.Router()



webController.post('/text-builder/:layout_id',upload.array('images[]'),async(req,res)=>{
    const files = req.files
    console.log("hsfjkhsdkjfhsdkjfhksjdhf",files)
   
    const {layout_id} = req.params;
    console.log("layout id :",layout_id);

    try {
        console.log(req.body)
        const internalLayout = JSON.parse(req.body.internalLayout)
        // console.log("internal llll ",internalLayout);
        const result =await createTextComponent(internalLayout,layout_id,files);
        
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

webController.delete('/remove-element',async(req,res)=>{
    const {id} = req.body
    console.log('id',id);
    try {
        const result = await removeElement(id);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
})
module.exports = webController