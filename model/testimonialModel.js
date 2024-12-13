const mongoose = require('mongoose')

const testiSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    message:{
        required:true,
        type:String
    },
    status:{
        required:true,
        type:String,
        default:'pending'
    }
})
const testimonials = mongoose.model("testimonials",testiSchema)

module.exports = testimonials