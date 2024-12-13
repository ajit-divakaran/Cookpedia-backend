const downloads = require('../model/downloadModel')

exports.addDownloadController = async(req,res) =>{
    const {id} = req.params

    const {name, cuisine} = req.body

    try{
        const existingRecipe = await downloads.findOne({recipeId:id})
        console.log(existingRecipe)
        if(existingRecipe){
            existingRecipe.count+=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }
        else{
            const newRecipe = new downloads({
                recipeId:id,
                recipename:name,
                recipecuisine:cuisine,
                count:1
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.getUserDownloadListController = async (req, res)=>{
    console.log("Inside getUserDownloadListController");
    //get userid from jwtmiddleware
    const userId = req.userId
    // find documents with userid from model
    try{
    const allUserDownloads = await downloads.find({userId})
    res.status(200).json(allUserDownloads)
    }catch(err){
    res.status(401).json(err)
    }
    }


exports.getAllDownloadListController = async (req, res)=>{
    console.log("Inside getAllDownloadListController");
    // find documents with userid from model
    try{
    const allDownloads = await downloads.find()
    res.status(200).json(allDownloads)
    }catch(err){
    res.status(401).json(err)
    }
    }


