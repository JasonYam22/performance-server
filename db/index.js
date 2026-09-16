const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("connected to the database, yay!")
})
.catch(() => {
  console.log("error connecting to the database")
})