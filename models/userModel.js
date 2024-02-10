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
        type:mongoose.SchemaTypes.String,
    },
    resume:{
        fName:{
            type:mongoose.SchemaTypes.String
        },
        lName:{
            type:mongoose.SchemaTypes.String
        },
        profession:{
            type:mongoose.SchemaTypes.String
        },
        city:{
            type:mongoose.SchemaTypes.String
        },
        country:{
            type:mongoose.SchemaTypes.String
        },
        pincode:{
            type:mongoose.SchemaTypes.String
        },
        phone:{
            type:mongoose.SchemaTypes.Number
        },
        schoolName:{
            type:mongoose.SchemaTypes.String
        },
        sLocation:{
            type:mongoose.SchemaTypes.String
        },
        degree:{
            type:mongoose.SchemaTypes.String
        },
        fos:{
            type:mongoose.SchemaTypes.String
        },
        gdate:{
            type:mongoose.SchemaTypes.Date
        },
        title:{
            type:mongoose.SchemaTypes.String
        },
        organiztion:{
            type:mongoose.SchemaTypes.String
        },
        location:{
            type:mongoose.SchemaTypes.String
        },
        startDate:{
            type:mongoose.SchemaTypes.Date
        },
        endDate:{
            type:mongoose.SchemaTypes.Date
        },
        experience:{
            type:mongoose.SchemaTypes.String
        },
        skills:{
            type:mongoose.SchemaTypes.Array
        }
    }
})

module.exports = mongoose.model('user',userModel)