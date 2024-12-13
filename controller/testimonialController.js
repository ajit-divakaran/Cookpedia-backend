const testimonials = require("../model/testimonialModel")

exports.addTestimonialController = async(req,res)=>{
    const {name, email, message} = req.body
    console.log(req.body)
    try {
        const newTestimonial = new testimonials({
            name,email,message
        })

        await newTestimonial.save()
        res.status(200).json(newTestimonial)

    } catch (error) {
        res.status(401).json(error)
    }
}


//get all feedback 
exports.getAllFeedbackController = async(req,res)=>{
    console.log("Inside getAllFeedBackController")

    try {
        const allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    } catch (err) {
        res.status(401).json(err)
    }
}



//feedback status 
exports.updateFeedbackStatusController = async(req,res)=>{
    console.log("Inside updateFeedbackStatusController")
    const {id} = req.params
    const status = req.query.status
    try {
     const existingFeedback = await testimonials.findById({_id:id})
     existingFeedback.status = status
     await existingFeedback.save()
     res.status(200).json(existingFeedback)
    } catch (err) {
        res.status(401).json(err)
    }
}


// all approved status controller
exports.getAllApprovedFeedbackController = async(req,res)=>{
    console.log("Inside getAllApprovedFeedBackController")

    try {
        const allFeedbacks = await testimonials.find({status:'approved'})
        res.status(200).json(allFeedbacks)
    } catch (err) {
        res.status(401).json(err)
    }
}