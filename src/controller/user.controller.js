const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")



async function followUserController(req,res){
const followerUserName = req.user.username
const followeeUserName = req.params.username

if (followeeUserName === followerUserName) {
    return res.status(400).json({
        message:"you can not follow you self"
    })
}


const isUserExist = await userModel.findOne({
    username:followeeUserName
})
if(!isUserExist){
    return res.status(400).json({
        message:"user not exist"
    })
}

const isalreadyFollow = await followModel.findOne({
    follower:followerUserName,
    followee:followeeUserName
})
if(isalreadyFollow){
    return res.status(200).json({
        message:`you already follow ${followeeUserName}`
    })
}
const followRecord = await followModel.create({
    follower:followerUserName,
    followee:followeeUserName
})

res.json({
    message:`you are following ${followeeUserName}`,
    follow:followRecord
})
}

async function unFollowUserController(req,res){
const followerUserName = req.user.username
const followeeUserName = req.params.username

const isUserFollowing = await followModel.findOne({
    follower:followerUserName,
    followee:followeeUserName
})

if(!isUserFollowing){
    return res.status(200).json({
        message:`you are not following ${followerUserName}`
    })
}
await followModel.findByIdAndDelete(isUserFollowing._id)
res.status(200).json({
    message:`you are unfollow ${followeeUserName}`
})
}

module.exports = {
followUserController,
unFollowUserController
}