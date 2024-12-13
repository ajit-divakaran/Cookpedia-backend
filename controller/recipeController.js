const recipes = require("../model/recipesModel")

exports.getAllRecipesController = async(req,res) =>{
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.viewRecipeController = async(req,res)=>{
    const {id} = req.params
    try {
        const Existingrecipe = await recipes.findOne({_id:id})
        res.status(200).json(Existingrecipe)
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.addRecipeController = async(req,res)=>{
    console.log("Inside addRecipeController")
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,tags,image,mealType} = req.body

    try {
        const existingRecipe = await recipes.findOne({name})
        if(existingRecipe){
            res.status(406).json("Recipe alraedy exist in our collection")
        }
        else{
            const newRecipe = new recipes({
                name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,tags,image,mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}