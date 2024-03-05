const express = require('express')
const { createOrder, getAllCustomerOrders, getAllRestaurantOrders ,getOrderById, updateOrderStatus} = require('../services/orderService')
const { authenticateToken } = require('../util/verifyToken')


const orderController = express.Router()

orderController.post('/create-order',authenticateToken,async(req,res)=>{
    const {customer_id} = req.body
    try {
        const result = await createOrder(customer_id,(order)=>{
            req.app.get('io').emit('orders',order)
        });
        
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

// orderController.get('/orders',authenticateToken,async(req,res)=>{
//     if(req.customerId){
//         try {
//             const result = await getAllCustomerOrders(req.customerId)
//             res.status(201).json(result)
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }
//     else{
//         try {
//             const result = await getAllRestaurantOrders(req.restaurantId)
//             console.log("is IO",req.app.get('io'));
//             res.status(201).json(result)
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }
// })
orderController.get('/orders', authenticateToken, async (req, res) => {
    try {
      let result;
  
      if (req.customerId) {
        // Handle customer orders
        result = await getAllCustomerOrders(req.customerId, (orders) => {
            // Emit real-time updates to connected clients
            console.log("Before",orders);
            //req.app.get('io').emit('orders', orders);
            console.log("After",orders);
  
          });
      } else {
        // Handle restaurant orders and pass the io instance
        result = await getAllRestaurantOrders(req.restaurantId, (orders) => {
          // Emit real-time updates to connected clients
          console.log("Before",orders);
          //req.app.get('io').emit('orders', orders);
          console.log("After",orders);

        });
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// Assuming you have 'io' as your WebSocket server instance
// orderController.get('/orders', authenticateToken, async (req, res) => {
//     if (req.customerId) {
//       // Handle customer orders
//       result = await getAllCustomerOrders(req.customerId);
//       res.status(201).json(result)
//     } else {
//       try {
//         const result = await getAllRestaurantOrders(req.restaurantId, req.app.get('io'));
//         res.status(201).json(result);
//       } catch (error) {
//         res.status(500).json(error);
//       }
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

orderController.post('/orders/:orderId/update-order-status', authenticateToken, async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const restaurant_id = req.restaurantId;
  
    try {
      if (restaurant_id) {
        const result = await updateOrderStatus(orderId, orderStatus);
  
        req.app.get('io').emit('updatedOrderStatus', { orderId: orderId, status: orderStatus },()=>{
            console.log("Event emmited");
        });
  
        return res.status(201).json(result);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });