const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/performance-api")
.then(() => {
  console.log("connected to the database, yay!")
})
.catch(() => {
  console.log("error connecting to the database")
})