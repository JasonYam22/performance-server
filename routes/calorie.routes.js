const express = require("express")
const router = express.Router()

const Calorie = require("../models/Calorie.model")

// get all of calories/nutrients that is saved
router.get("/", (req, res, next) => {
    Calorie.find({user: req.payload._id})
    .then((calories) => {
     if (!calories) {
        return res.status(404).json({message: "Meal not found or unauthorized"})
        }
        res.status(200).json(calories)
    })
.catch((error) => {
    next(error)
})
})

// create new meal
router.post("/", (req, res, next) => {
    const { 
       mealName,
       calories,
       protein,
       carbs,
       fat,
       date
     /*    time */
    } = req.body

    Calorie.create({
        user: req.payload._id,
        mealName,
       calories,
       protein,
       carbs,
       fat,
       date
    })
    .then((calories) => {
           if (!calories) {
        return res.status(404).json({message: "Meal not found or unauthorized"})
        }
        res.status(201).json(calories)
    })
    .catch((error) => {
        next(error)
    })
})

// edit existing meal (check for meal ID and user ID)
router.put("/:calorieId", (req, res, next) => {
    Calorie.findOneAndUpdate({_id: req.params.calorieId, user: req.payload._id
    }, 
    req.body,
     {returnDocument:"after"})
    .then((updatedCalorie) => {
           if (!updatedCalorie) {
        return res.status(404).json({message: "Meal not found or unauthorized"})
        }
        res.status(200).json(updatedCalorie)
    })
    .catch((error) => {
        next(error)
    })
})

//delete meal (check for meal ID and user ID)
router.delete("/:calorieId", (req, res, next) => {
    Calorie.findOneAndDelete({_id: req.params.calorieId, user: req.payload._id})
    .then((calorie) => {
           if (!calorie) {
        return res.status(404).json({message: "Meal not found or unauthorized"})
        }
 res.status(200).json(calorie)    
})
.catch((error) => {
    next(error)
})
})

module.exports = router

