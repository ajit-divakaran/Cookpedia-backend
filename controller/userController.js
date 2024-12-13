// register
const bcrypt = require('bcrypt');
const users = require("../model/userModel")
const jwt = require("jsonwebtoken")

exports.registerController = async(req,res)=>{
    const {username, email, password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json('Account already exists')

        }
        else{
            const encryptPassword = await bcrypt.hash(password,10)
            console.log(encryptPassword)
            const newUser = new users({
                username,
                email,
                password:encryptPassword
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.loginController = async(req,res)=>{
    const {email, password} = req.body

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            const match = await bcrypt.compare(password,existingUser.password)
            console.log(match)
            if(match == true){
                const token = jwt.sign({userId:existingUser._id},'secretkey')
                res.status(200).json({existingUser,token})
            }
            else{
                res.status(404).json('Invalid Password')
            }
        }
        else{
            res.status(406).json('Invalid email id')

        }
    }
    catch(err){
        res.status(401).json(error)
    }
}

exports.editUserController = async(req,res)=>{
    console.log("Inside Edit User Controller")
    const userId = req.payload;
    const {profilePic} = req.body
    try {
        const existingUser = await users.findById({_id:userId})
        existingUser.profileImg = profilePic
        await existingUser.save()
        console.log(existingUser)
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all users
exports.getAllUsersController = async(req,res)=>{
    console.log("Inside getAllUsersController");
    try {
        const allUsers = await users.find({"role":"user"})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
}