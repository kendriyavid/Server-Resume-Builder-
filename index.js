const express  =require('express')
const app = express()
const userController = require('./controller/userController')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT||3000;
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
mongoose.connect('mongodb://127.0.0.1:27017/')
.then(
    console.log("connected")
)
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use(express.json())
app.use(cookieParser())

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/rn', express.static(path.join(__dirname, '')));


app.use('/register',require('./router/register'))
app.use('/auth',require('./router/auth'))
app.use('/refresh',require('./router/refresh'))
app.use('/logout',require('./router/logout'))
app.use('/form',require('./router/form'))
app.use('/getresune',require('./router/resume'))
app.use('/resumetemplates',require('./router/resumeTemplates'))
app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})

