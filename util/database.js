const Sequelize = require('sequelize')

const sequleize = new Sequelize('expense','root','Vaibhav@123',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequleize;