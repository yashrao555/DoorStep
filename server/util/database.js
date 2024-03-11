const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("gautam-food-demo","foodadmin","$trongPassword0",{
    dialect:"mssql",
    host:"sofy-dev-paassql-server.database.windows.net"
})
module.exports = sequelize