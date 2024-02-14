const express = require("express");
const cors = require('cors')

const dotenv = require('dotenv')

const authController = require('./controllers/authController');
const restaurantAuthController = require("./controllers/restaurantAuthContoller");
const foodController = require('./controllers/foodItemController')
const restaurantController = require('./controllers/restaurantController')
const cartController = require('./controllers/cartController')
const app = express();
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




const sequelize = require("./util/database");








app.listen(3000, () => {
  sequelize
    .sync()
    .then(() => {
      console.log("Database and tables synced");
    })
    .catch((err) => {
      console.error("Error syncing database:", err);
    });
});
