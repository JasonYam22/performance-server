const express = require("express")
const router = express.Router()

const User = require("../models/User.model")

router.put("/", (req, res, next) => {
const { username, weight, height, goalWeight, gender} = req.body

    User.findByIdAndUpdate(req.payload._id,{ username, weight, height, goalWeight, gender}, {returnDocument: "after"})
    .select("email username")
    .then((updatedUser) => {
           if (!updatedUser) {
        return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(updatedUser)
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/", (req, res, next) => {
    User.findById(req.payload._id)
    .select ("email username")
    .then((user) => {
     if (!user) {
        return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(user)
    })
.catch((error) => {
    next(error)
})
})

router.delete("/", (req, res, next) => {
    console.log("CURRENT USER ID:", req.payload._id)
    User.findByIdAndDelete(req.payload._id)
    .then((user) => {
           if (!user) {
        return res.status(404).json({message: "User not found"})
        }
 res.status(200).json(user)    
})
.catch((error) => {
    next(error)
})
})

module.exports = router;