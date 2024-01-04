const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username:{
        type:mongoose.SchemaTypes.String,
        required: true
    },
    email:{
        type:mongoose.SchemaTypes.String,
        required: true
    },
    DOB:{
        type:mongoose.SchemaTypes.Date,
        required: true,
    },
    hpassword:{
        type:mongoose.SchemaTypes.String,
        required: true,

    },
    roles:{
        User:{
            type:mongoose.SchemaTypes.Number,
            default:2001
        },
        Editor:{
            type:mongoose.SchemaTypes.Number,
        },
        Admin:{
            type:mongoose.SchemaTypes.Number,
        }
    },
    createdAt:{
        type:mongoose.SchemaTypes.Date,
        required: true,
        default:new Date()
    },
    refreshToken:{
        type:mongoose.SchemaTypes.String
    }
})

module.exports = mongoose.model('user',userModel)