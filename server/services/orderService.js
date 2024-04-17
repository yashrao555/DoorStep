
const Customer = require('../models/customer')
const Order = require('../models/order')
const Restaurant = require('../models/restaurant')
const { transporter } = require('../util/mail')
const { getCartByCustomerAndRestaurant } = require('./cartService')


const options = {
    timeZone: 'Asia/Kolkata', // Set the desired timezone
    hour12: false, // Use 24-hour format
  };
  

async function createOrder(customer_id,callback){
    const cart = await getCartByCustomerAndRestaurant(customer_id)
    
    let {restaurant_id,items,total_amount,cityId} = cart;
    let restaurant;
     restaurant = await Restaurant.findOne({
        where:{
            id:restaurant_id
        }
    })

    // Current time in UTC
const currentUTCTime = new Date();

// Convert current UTC time to IST
const currentISTTime = new Date(currentUTCTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));


// Convert opens_at and closes_at times to IST

const time1 = extractTime(restaurant.opens_at);
const time2 = extractTime(restaurant.closes_at);
const currentISTTimeFormatted = formatTime(currentISTTime);
console.log(time1,time2,currentISTTimeFormatted);

// Compare with the current IST time
if (currentISTTimeFormatted >= time1 && currentISTTimeFormatted <= time2) {
    console.log('The current time is within the opening hours.');
    items = JSON.stringify(items)

     const order= await Order.create({
        customer_id,
        restaurant_id,
        items,
        total_amount,
        status:"Pending",
        cityId
    })

    const user = await Customer.findOne({
        where: {
            id:customer_id,
        },
        
    })
    restaurant = await Restaurant.findOne({
        where:{
            id:restaurant_id
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
    callback(order)

    return order
     
} else {
    console.log('The current time is outside the opening hours.');
    return error;
}

 
    console.log(restaurant.opens_at,restaurant.closes_at);
        


    
}

async function getAllCustomerOrders(id,callback) {
    const orders = await Order.findAll({
      where: {
        customer_id: id,
      },
      order: [['createdAt', 'DESC']],
    });
    const parsedOrders = orders.map(order => {
        order.items = JSON.parse(order.items);
        return order;
    });

    // Emit real-time updates to connected clients
    callback(parsedOrders);

    return parsedOrders;
  }
//   async function getAllRestaurantOrders(id, io) {
//     const orders = await Order.findAll({
//       where: {
//         restaurant_id: id,
//       },
//     });
  
//     // Emit real-time updates to connected clients
//     console.log(io);
//     io.emit('restaurantOrdersUpdate', orders);
  
//     return orders;
//   }
async function getAllRestaurantOrders(id, callback) {
    const orders = await Order.findAll({
        where: {
            restaurant_id: id,
        },
        order: [['createdAt', 'DESC']],
    });

    // Parse the stringified JSON array in each order's items
    const parsedOrders = orders.map(order => {
        order.items = JSON.parse(order.items);
        return order;
    });

    // Emit real-time updates to connected clients
    callback(parsedOrders);

    return parsedOrders;
}

// async function getStaffOrder(req){
//     console.log('sessipon in staff ',req.session);
//     const cityIds = JSON.parse(req.session.staff.cityId)
//     // console.log("orders",typeof(cityIds),cityIds[0]);
//     const orders = await Order.findAll({
//         where: {
//             cityId:cityIds,
//             restaurant_id:req.session.staff.restaurant_id
//           }
//     })
    
// return orders;
// }
async function getStaffOrder(req, callback) {
    try {
        console.log('session in staff:', req.session);
        const cityIds = JSON.parse(req.session.staff.cityId);
        const orders = await Order.findAll({
            where: {
                cityId: cityIds,
                restaurant_id: req.session.staff.restaurant_id
            }
        });
        
        // Parse the stringified JSON array in each order's items
        const parsedOrders = orders.map(order => {
            order.items = JSON.parse(order.items);
            return order;
        });
        
        // Emit real-time updates to connected clients
        callback(parsedOrders);

        return parsedOrders;
    } catch (error) {
        console.error('Error fetching staff orders:', error);
        return [];
    }
}

async function getOrderById(order_id){
    console.log(order_id);
    const order = await Order.findOne({
        where:{
        id:order_id
        }
    })
    console.log(order);
    order.items = JSON.parse(order.items)
    return order;
}

async function updateOrderStatus(order_id,status){
    console.log("entered");
    const order = await Order.findOne({
        where:{
            id:order_id
        }
    })

    order.status=status;
    await order.save();


    if (order.status==='Approved'){

        const restaurant = await Restaurant.findOne({
            where:{
            id:order.restaurant_id
            }
        })

        const user = await Customer.findOne({
            where: {
                id:order.customer_id,
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

const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const extractTime = (utcTimeString) => {
    const utcTime = new Date(utcTimeString);
    const hours = utcTime.getUTCHours().toString().padStart(2, '0');
    const minutes = utcTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = utcTime.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

module.exports = {createOrder,getAllCustomerOrders,getAllRestaurantOrders,getOrderById,updateOrderStatus,getStaffOrder}