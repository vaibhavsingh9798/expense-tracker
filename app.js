const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./util/database')
const userRoute = require('./route/user')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/user',userRoute)
app.get('/',(req,res) =>{
    res.send('HomePage')
})

sequelize.sync()
.then(() =>{
    app.listen(3001,()=>{
        console.log('server is running on port 3001')
    })
})
.catch(err => console.log(err))
