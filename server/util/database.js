const Sequelize = require("sequelize")

const sequelize = new Sequelize("doorstepDB","root","MyNewPass",{
    dialect:"mysql",
    host:"localhost"
})
module.exports = sequelize