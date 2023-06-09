const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const sequelize = require('./util/database')
const userRoute = require('./route/user')
const expenseRoute = require('./route/expense')
const purchaseRoute = require('./route/purchase')
const premiumuserRoute = require('./route/premiumuser')
const passwordRoute = require('./route/resetpassword')
const User = require('./model/user')
const Expense = require('./model/expense')
const Order = require('./model/orders')
const ForgotPassword = require('./model/forgotpassword')
const DownloadFile = require('./model/downloadfile')
const app = express()


// getting data from client side form 
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(helmet()) 
app.use(compression())
const accessLogStream =  fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(morgan('combined',{stream: accessLogStream}))

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

User.hasMany(ForgotPassword)
ForgotPassword.belongsTo(User)

User.hasMany(DownloadFile,{foreignKey:'userId'})
DownloadFile.belongsTo(User,{foreignKey:'userId'})

sequelize.sync() // {force:true}
.then(() =>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log('server is running on port 3001')
    })
})
.catch(err => console.log(err))
