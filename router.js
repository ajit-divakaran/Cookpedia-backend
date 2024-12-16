const express = require('express')

const routes = new express.Router()

const recipeController = require('./controller/recipeController')
const testimonialController = require('./controller/testimonialController')
const userController = require('./controller/userController')
const downloadController = require('./controller/downloadController')
const savedRecipeController = require('./controller/savedRecipeController')
const jwtMiddleware = require('./middleware/jwtmiddleware')

routes.get('/all-recipes',recipeController.getAllRecipesController)

//path to add testimonial
routes.post('/add-testimonial',testimonialController.addTestimonialController)

//path to register
routes.post('/register', userController.registerController)

routes.post('/login', userController.loginController)

// path to view individual recipes

routes.get('/view-recipe/:id',jwtMiddleware, recipeController.viewRecipeController)

//path to download recipe
routes.post('/download-Recipe/:id',jwtMiddleware,downloadController.addDownloadController)

//path to save recipe
routes.post('/save-recipe',jwtMiddleware,savedRecipeController.addRecipesController)

// path to get all saved recipes
routes.get('/get-allsaved-Recipes',jwtMiddleware,savedRecipeController.getSavedRecipesController)

// path to delete the saved recipe item
routes.delete('/delete-savedrecipes/:id',jwtMiddleware,savedRecipeController.removeSavedRecipesController)

//path to get user downloads
routes.get('/user-downloads',jwtMiddleware,downloadController.getUserDownloadListController)

// path to edit profile image of user
routes.post('/edit-user',jwtMiddleware,userController.editUserController)

// all-user:admin
routes.get('/all-users',jwtMiddleware,userController.getAllUsersController)

// all-downloads:admin
routes.get('/download-list',jwtMiddleware,downloadController.getAllDownloadListController)

//all-feedbacks:admin
routes.get('/all-feedback',jwtMiddleware,testimonialController.getAllFeedbackController)

//update-testimony
routes.get("/feedback/:id/update",jwtMiddleware,testimonialController.updateFeedbackStatusController)

//approved-testimony
routes.get("/approved-feedback",testimonialController.getAllApprovedFeedbackController)

//add-recipes:admin
routes.post("/add-recipe",jwtMiddleware,recipeController.addRecipeController)

//edit-recipes:admin
routes.put("/recipe/:id/edit",jwtMiddleware,recipeController.updateRecipeController)

//delete-recipes:admin
routes.delete("/recipe/:id/remove",jwtMiddleware,recipeController.removeRecipeController)


module.exports = routes