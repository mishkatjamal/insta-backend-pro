const express = require("express")
const userController = require("../controller/user.controller")
const userRouter = express.Router()
const identifyUser = require("../middleware/auth.middleware")

// post 
// user follow api
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

// post 
// user unfollow api
userRouter.post("/unfollow/:username",identifyUser,userController.unFollowUserController)

module.exports = userRouter