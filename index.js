//1. import express
const express = require('express')

// 4. import cors
const cors = require('cors')

//7. import router for MVC architecture
const router = require('./router')

// 8. import dotenv and connection of database
require('dotenv').config()
require('./connection')


//2. server create
const cookpediaServer = express()


//5. use cors (use cors before router module/routes)
cookpediaServer.use(cors())

//6. parse the json data
cookpediaServer.use(express.json())

//8. use this router module in express
cookpediaServer.use(router)



//3. Set PORT
const PORT = 4001 || process.env.PORT
cookpediaServer.listen(PORT,()=>{
    console.log(`Server running successfully ${PORT}`)
})

// for base url
cookpediaServer.get('/',(req,res)=>{
    res.status(200).send(`Inside base url get request of the serverurl <br><h1>Hello</h1>`)
})