const express  =require('express')
require('dotenv').config(); // Load environment variables
const app = express()
const userController = require('./controller/userController')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT||3000;
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority&appName=Cluster0&tls=true`;
console.log(process.env.MONGO_USERNAME, process.env.MONGO_CLUSTER);
// mongoose.connect(CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tls: true,});
    const db = mongoose.connection;

    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    });
    
    db.once('open', function() {
      console.log('Connected successfully to MongoDB Atlas');
    });
    
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials:true,
// }))

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173/',
];

app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,
}));


app.use(express.json())
app.use(cookieParser())

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/rn', express.static(path.join(__dirname, '')));
app.use('/googlefile',express.static(path.join(__dirname,'')))


app.use('/register',require('./router/register'))
app.use('/auth',require('./router/auth'))
app.use('/refresh',require('./router/refresh'))
app.use('/logout',require('./router/logout'))
app.use('/form',require('./router/form'))
app.use('/getresune',require('./router/resume'))
app.use('/resumetemplates',require('./router/resumeTemplates'))
app.use('/check',require('./router/check'))
// app.use('/harshdeepkv/register', require('./router/register'));
// app.use('/harshdeepkv/auth', require('./router/auth'));
// app.use('/harshdeepkv/refresh', require('./router/refresh'));
// app.use('/harshdeepkv/logout', require('./router/logout'));
// app.use('/harshdeepkv/form', require('./router/form'));
// app.use('/harshdeepkv/getresume', require('./router/resume'));
// app.use('/harshdeepkv/resumetemplates', require('./router/resumeTemplates'));

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})

