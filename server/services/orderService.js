
const Customer = require('../models/customer')
const Order = require('../models/order')
const Restaurant = require('../models/restaurant')
const { transporter } = require('../util/mail')
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

    const user = await Customer.findOne({
        where: {
            customer_id:customer_id,
        },
        
    })
    const restaurant = await Restaurant.findOne({
        where:{
            restaurant_id:restaurant_id
        }
    })

    const mailOptions = {
        from: "yrao@argusoft.com",
        to: restaurant.email,
        subject: "Order Received",
        text: `Order has been received from ${user.name} `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error("Error sending Mail:", error);
            return { error: "Failed to send Mail" };
        } else {
            console.log("Mail sent successfully:", info.response);
            return { message: "Order Placed. Mail sent successfully." };
        }
    });
    await cart.destroy()

    return order
}

async function getAllCustomerOrders(id) {
    const orders = await Order.findAll({
      where: {
        customer_id: id,
      },
      order: [['createdAt', 'DESC']],
    });
  
    return orders;
  }
  
  async function getAllRestaurantOrders(id) {
    const orders = await Order.findAll({
      where: {
        restaurant_id: id,
      },
      order: [['createdAt', 'DESC']], 
    });
  
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

async function updateOrderStatus(order_id,status){
    const order = await Order.findOne({
        where:{
            order_id:order_id
        }
    })

    order.status=status;
    await order.save();


    if (order.status==='Approved'){

        const restaurant = await Restaurant.findOne({
            where:{
                restaurant_id:order.restaurant_id
            }
        })

        const user = await Customer.findOne({
            where: {
                customer_id:order.customer_id,
            },
            
        })
        const mailOptions = {
            from: restaurant.email,
            to: user.email,
            subject: `Order Accepetd`,
            text: `Order Accepeted by ${restaurant.name}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending Mail:", error);
                return { error: "Failed to send Mail" };
            } else {
                console.log("Mail sent successfully:", info.response);
                return { message: "Order Placed. Mail sent successfully." };
            }
        });
    }
    return order.status;


}
module.exports = {createOrder,getAllCustomerOrders,getAllRestaurantOrders,getOrderById,updateOrderStatus}