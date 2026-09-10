const express = require("express")
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model")
const isAuthenticated = require("../middlewares/isAuthenticated")

// POST "/api/auth/signup" => receive user credentials and create the document in the DB
router.post("/signup", async(req, res, next) => {
  // console.log(req.body)
  const {email, password, username} = req.body
  
  // server validators
  // email and password are required
  if (!email || !password) {
    res.status(400).json({errorMessage: "both email and password are mandatory"})
    return 
  }

  // password strength
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (passwordRegex.test(password) === false) {
    res.status(400).json({errorMessage: "password not strong enough. needs at least 8 characters, one uppercase, one lowercase and one number", field: "password"})
    return 
  }

  // email has a valid structure. SKIP.

  // (optional)
  // also username is required
  // username could also be unique
  // the email exist, tested by sending an email with an email send provider
  // max length for string properties

  try {

    // email should be unique
    const foundUser = await User.findOne( { email: email } )
    if (foundUser) {
      res.status(400).json({errorMessage: "User already exists with this email"})
      return 
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    await User.create({
      email: email,
      password: hashedPassword,
      username: username
    })
    
    res.sendStatus(201)
    
  } catch (error) {
    next(error)
  }

})

// POST "/api/auth/login" => validate user credentials and create the JWT
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({ errorMessage: "Email is mandatory" });
    return;
  }
  if (!password) {
  res.status(400).json({ errorMessage: "Password is mandatory" });
    return;
  }
 
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "User not found" });
      return;
    }

    const passwordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!passwordCorrect) {
      res.status(400).json({ errorMessage: "Invalid password" });
      return;
    }

    // generate the Token JWT
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username
    /*   role: foundUser.role */
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "7d"
    })

    res.status(200).json( { authToken, payload } )

  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => received the token, and validates it and will send to the FE who the owner of the token it.
router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json({ payload: req.payload })
})

module.exports = router