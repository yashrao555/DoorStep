const express = require('express')
const { createOrder, getAllCustomerOrders, getAllRestaurantOrders ,getOrderById, updateOrderStatus} = require('../services/orderService')
const { authenticateToken } = require('../util/verifyToken')

const io = require('../app').io

const orderController = express.Router()

orderController.post('/create-order',authenticateToken,async(req,res)=>{
    const {customer_id} = req.body
    try {
        const result = await createOrder(customer_id);
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

orderController.get('/orders',authenticateToken,async(req,res)=>{
    if(req.customerId){
        try {
            const result = await getAllCustomerOrders(req.customerId)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        try {
            const result = await getAllRestaurantOrders(req.restaurantId)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

// orderController.get('/orders', authenticateToken, async (req, res) => {
//     try {
//       let result;
  
//       if (req.customerId) {
//         result = await getAllCustomerOrders(req.customerId);
//       } else {
//         result = await getAllRestaurantOrders(req.restaurantId);
//       }
  
//       // Emit the updated data to all connected clients
//       io.emit('orders', result);
  
//       res.status(200).json(result);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });
  

orderController.get('/orders/:orderId',async(req,res)=>{
    const {orderId} = req.params
    

    try {
        const result = await getOrderById(orderId)
        return res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=orderController

orderController.post('/orders/:orderId/update-order-status',authenticateToken,async(req,res)=>{
    const {orderId} = req.params
    const {orderStatus} = req.body
    const restaurant_id = req.restaurantId
    
    try{
        if(restaurant_id){
            const result = await updateOrderStatus(orderId,orderStatus)
        return res.status(201).json(result)
        }
        
    }catch(error){
        return res.status(500).json(error)
    }
})