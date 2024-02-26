const Sequelize = require("sequelize")

const sequelize = new Sequelize("doorstepDB","root","password",{
    dialect:"mysql",
    host:"localhost"
})
module.exports = sequelize