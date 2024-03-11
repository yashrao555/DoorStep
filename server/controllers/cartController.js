const express = require('express')
const {
    getCartByCustomerAndRestaurant,
    updateCart,
    createCart,
    deleteFromCart,
    deleteCart,
  } = require('../services/cartService')
const { authenticateToken } = require('../util/verifyToken')

const cartController = express.Router()

cartController.get('/get-cart',authenticateToken,async(req,res)=>{
    const customer_id = req.customerId
    console.log(customer_id);
    try {
        // Check if a cart for the customer already exists
        const result = await getCartByCustomerAndRestaurant(customer_id)
        console.log(result);
        res.json({ message: 'Cart fetched successfully', data: result });
        
      } catch (error) {
        console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch cart' });
      }
})

cartController.post('/add-to-cart',authenticateToken,async (req, res) => {
  customer_id=req.customerId;
  console.log("CUST",customer_id);
    const {restaurant_id, items } = req.body;
  
    try {
      // Check if a cart for the customer already exists
      const existingCart = await getCartByCustomerAndRestaurant(customer_id);
      // console.log(existingCart);
  
      if (existingCart) {
        // If the cart already exists, update its items and total_amount
        await updateCart(existingCart, items);
        console.log('ec',existingCart)
        res.json({ message: 'Cart updated successfully', data: existingCart });
       } 
      else {
        // If the cart doesn't exist, create a new cart
        const newCartItem = await createCart(customer_id, restaurant_id,items);
        console.log('nci',newCartItem)
        res.json({ message: 'Cart created successfully', data: newCartItem });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  })

  cartController.delete('/delete-cart',authenticateToken,async(req,res)=>{
    const customer_id=req.customerId;

    try {
      const result = await deleteCart(customer_id)
      res.status(201).json(result)
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: 'Failed to delete cart' })
    }
  })

  cartController.post('/delete-from-cart',authenticateToken,async(req,res)=>{
    const customer_id = req.customerId
    const {restaurant_id, items, total_amount } = req.body;
  
    try {
      // Check if a cart for the customer already exists
      const existingCart = await getCartByCustomerAndRestaurant(customer_id);
      // console.log(existingCart);
  
      if (existingCart) {
        // If the cart already exists, update its items and total_amount
        await deleteFromCart(existingCart, items, total_amount);
        res.json({ message: 'Cart updated successfully', data: existingCart });
      } else {
        // If the cart doesn't exist, create a new cart
        const newCartItem = await createCart(customer_id, restaurant_id, items, total_amount);
        res.json({ message: 'Cart created successfully', data: newCartItem });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  })

  module.exports = cartController