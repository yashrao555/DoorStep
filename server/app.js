const express = require("express");
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors')

const dotenv = require('dotenv')


const authController = require('./controllers/authController');
const restaurantAuthController = require("./controllers/restaurantAuthContoller");
const foodController = require('./controllers/foodItemController')
const restaurantController = require('./controllers/restaurantController')
const cartController = require('./controllers/cartController')
const orderController = require("./controllers/orderController");
const locationController = require("./controllers/locationController");
const staffController = require("./controllers/staffController");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io);
// ... (other middleware and route setups)




const corsOptions = {
    origin:true,
    credentials:true
}
dotenv.config()
app.use(cors(corsOptions));
app.use(express.json());

app.use(authController)
app.use(restaurantAuthController)
app.use(foodController)
app.use(restaurantController)
app.use(cartController)
app.use(orderController)
app.use(locationController)
app.use(staffController)

const sequelize = require("./util/database");


server.listen(3000, () => {
  sequelize
    .sync()
    .then(() => {
      console.log("Database and tables synced");

    })
    .catch((err) => {
      console.error("Error syncing database:", err);
    });
});


module.exports = { io };