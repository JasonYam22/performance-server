const express = require("express")
const router = express.Router()

const Activity = require("../models/Activity.model")

// get full collection of physical activity
router.get("/", (req, res, next) => {
    Activity.find({user: req.payload._id})
    .then((activities) => {
        if (!activies) {
        return res.status(404).json({message: "Activity not found or unauthorized"})
        }
        res.status(200).json(activities)
    })
.catch((error) => {
    next(error)
})
})

// create a new running/steps session
router.post("/", (req, res, next) => {
    const { 
        title,
        distance,
        duration,
        caloriesBurned,
        date,
     /*    time */
    } = req.body

    Activity.create({
        user: req.payload._id,
      title,
        distance,
        duration,
        caloriesBurned,
        date,
    })
    .then((activities) => {
            if (!activies) {
        return res.status(404).json({message: "Activity not found or unauthorized"})
        }
        res.status(201).json(activities)
    })
    .catch((error) => {
        next(error)
    })
})

// get single activity
router.get("/:activiyId", (req, res, next) => {
    Activity.findOne({_id: req.params.activiyId, user: req.payload._id})
    .then((activity) => {
        if (!activity) {
        return res.status(404).json({message: "Activity not found or unauthorized"})
        }
        res.status(200).json(activity)
    })
    .catch((error) => {
        next(error)
    })
})

// edit activity
router.put("/:activiyId", (req, res, next) => {
    Activity.findOneAndUpdate({_id: req.params.activiyId, user: req.payload._id}, req.body, 
    {returnDocument:"after"})
    .then((updatedActivity) => {
         if (!updatedActivity) {
        return res.status(404).json({message: "Activity not found or unauthorized"})
        }
        res.status(200).json(updatedActivity)
    })
    .catch((error) => {
        next(error)
    })
})

//delete activiy
router.delete("/:activiyId", (req, res, next) => {
    Activity.findOneAndDelete({_id: req.params.activiyId,user: req.payload._id})
    .then((activity) => {
         if (!activity) {
        return res.status(404).json({message: "Activity not found or unauthorized"})
        }
 res.status(200).json(activity)    
})
.catch((error) => {
    next(error)
})
})

module.exports = router

