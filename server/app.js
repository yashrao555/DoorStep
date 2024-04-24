const express = require("express");
const session = require('express-session')
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv')


const authController = require('./controllers/authController');
const restaurantAuthController = require("./controllers/restaurantAuthContoller");
const foodController = require('./controllers/foodItemController')
const restaurantController = require('./controllers/restaurantController')
const cartController = require('./controllers/cartController')
const orderController = require("./controllers/orderController");
const locationController = require("./controllers/locationController");
const staffController = require("./controllers/staffController");
const cityController = require('./controllers/cityController')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io);
// ... (other middleware and route setups)




const corsOptions = {
    origin:true,
    credentials:true
};

dotenv.config()
app.use(cors(corsOptions));
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000 // 1 hour in milliseconds
  }
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/dist')));



app.use(authController)
app.use(restaurantAuthController)
app.use(foodController)
app.use(restaurantController)
app.use(cartController)
app.use(orderController)
app.use(locationController)
app.use(staffController)
app.use(cityController)

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