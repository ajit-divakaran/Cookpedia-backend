const savedrecipes = require("../model/savedRecipeModel")

exports.addRecipesController = async(req,res)=>{
    const {id, name, cuisine, image} = req.body
    const userId = req.payload

    try{
        const existingRecipe = await savedrecipes.findOne({recipeId:id, userId})
        if(existingRecipe){
            res.status(406).json('Recipe already in your collection')

        }
        else{
            const newRecipe = new savedrecipes({
                recipeId:id,
                recipename:name,
                recipecuisine:cuisine,
                recipeImage:image,
                userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }
    catch(err){
        res.status(401).json(error)
    }
}

exports.getSavedRecipesController = async(req,res) =>{
    const userId = req.payload
    try{
        const allSavedRecipes = await savedrecipes.find({userId})
        res.status(200).json(allSavedRecipes)
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.removeSavedRecipesController = async(req,res) =>{
    const {id} = req.params
    try{
        await savedrecipes.findByIdAndDelete({_id:id})
        res.status(200).json('Deleted')
    }
    catch(err){
        res.status(401).json(err)
    }
}