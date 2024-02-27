
const Order = require('../models/order')
const { getCartByCustomerAndRestaurant } = require('./cartService')

async function createOrder(customer_id){
    const cart = await getCartByCustomerAndRestaurant(customer_id)
    
    const {restaurant_id,items,total_amount} = cart
    console.log(customer_id,restaurant_id,items,total_amount)
     const order= await Order.create({
        customer_id,
        restaurant_id,
        items,
        total_amount,
        status:"Pending"
    })
    console.log(order);
    await cart.destroy()
    // cart.reload()
    return order
}

async function getAllCustomerOrders(id){
    const orders = await Order.findAll({
        where: {
            customer_id:id,
        },
    })
    return orders;
}
async function getAllRestaurantOrders(id){
    const orders = await Order.findAll({
        where: {
            restaurant_id:id,
        },
    })
    return orders;
}

async function getOrderById(order_id){
    console.log(order_id);
    const order = await Order.findOne({
        where:{
            order_id:order_id
        }
    })
    console.log(order);
    return order;
}
module.exports = {createOrder,getAllCustomerOrders,getAllRestaurantOrders,getOrderById}