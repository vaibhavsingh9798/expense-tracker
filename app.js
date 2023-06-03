const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./util/database')
const userRoute = require('./route/user')
const expenseRoute = require('./route/expense')
const purchaseRoute = require('./route/purchase')
const premiumuserRoute = require('./route/premiumuser')
const passwordRoute = require('./route/password')
const User = require('./model/user')
const Expense = require('./model/expense')
const Order = require('./model/orders')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/expense',expenseRoute)
app.use('/purchase',purchaseRoute)
app.use('/premium',premiumuserRoute)
app.use('/password',passwordRoute)
// app.get('/',(req,res) =>{
//     res.send('HomePage')
// })

User.hasMany(Expense,{ foreignKey: 'userId' })
Expense.belongsTo(User,{ foreignKey: 'userId' })

User.hasMany(Order)
Order.belongsTo(User)

sequelize.sync() // {force:true}
.then(() =>{
    app.listen(3001,()=>{
        console.log('server is running on port 3001')
    })
})
.catch(err => console.log(err))
