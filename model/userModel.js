const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },
    profileImg:{
        type:String,
        default:""
    }
})

const users = mongoose.model('users',userSchema);

module.exports = users