const express  =require('express')
const app = express()
const userController = require('./controller/userController')
const PORT = process.env.PORT||3000;
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/')
.then(
    console.log("connected")
)
app.use(cors({
    origin:"http://localhost:5173",
}))

app.use(express.json())
app.use('/register',require('./router/register'))
app.use('/auth',require('./router/auth'))

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})

