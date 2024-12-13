const mongoose = require('mongoose')

const savedRecipeSchema = new mongoose.Schema({
    recipeId:{
        type:String,
        required:true
    },
    recipename:{
        type:String,
        required:true
    },
    recipecuisine:{
        type:String,
        required:true
    },
    recipeImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const savedrecipes = mongoose.model('savedrecipes',savedRecipeSchema)
module.exports = savedrecipes