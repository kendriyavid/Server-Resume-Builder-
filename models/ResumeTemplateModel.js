const mongoose = require('mongoose')

const ResumeTemplateModel = new mongoose.Schema({
    name:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    image:{
        type:mongoose.SchemaTypes.String,
        required:true
    }
})

module.exports = mongoose.model("rTempmodel",ResumeTemplateModel)