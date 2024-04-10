const express = require('express')
const { createOrder, getAllCustomerOrders, getAllRestaurantOrders ,getOrderById, updateOrderStatus, getStaffOrder} = require('../services/orderService')
const { authenticateToken } = require('../util/verifyToken')


const orderController = express.Router()

orderController.post('/create-order',authenticateToken,async(req,res)=>{
    const {customer_id} = req.body
    try {
        const result = await createOrder(customer_id,(order)=>{
            req.app.get('io').emit('orders',order,()=>{
              console.log("event emitteddddd")
            })
        });
        
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

orderController.get('/orders', authenticateToken, async (req, res) => {
    try {
      let result;
  
      if (req.customerId) {
        // Handle customer orders
        result = await getAllCustomerOrders(req.customerId, (orders) => {
          });
      } else {
        // Handle restaurant orders and pass the io instance
        result = await getAllRestaurantOrders(req.restaurantId, (orders) => {       
        });
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  orderController.get('/orders-for-staff',authenticateToken, async (req, res) => {
    try {
   
      if (!req.session.staff) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      if(req.session.staff.role==="Order Manager" || req.session.staff.role==="Owner")
      {
        const result = await getStaffOrder(req,(orders) => {       
        });
        res.status(200).json(result);
      }
      else{
        res.status(401).json('Permission Denied');
      }
      // Fetch orders for staff using session data
      
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

orderController.get('/orders/:orderId',async(req,res)=>{
    const {orderId} = req.params
    

    try {
        const result = await getOrderById(orderId)
        return res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})


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

  module.exports=orderController