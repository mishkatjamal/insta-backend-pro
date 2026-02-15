const postsModel = require('../models/post.model');
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require('@imagekit/nodejs');
const { Folders } = require('@imagekit/nodejs/resources.js');
const jwt = require('jsonwebtoken');

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function createPost(req, res) {
    console.log(req.body,req.file);
   
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }
    let decoded = null
    try{
    decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:"user not authorize"
        })
    }

    
    console.log(decoded);
    

    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),"file"), //required
        fileName : req.file.originalname,
        Folders:"insta post"   //required
})  

const post = await postsModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:decoded.id
})

res.status(201).json({
    message:"post created succesfully",
    post
})

}

async function getAllPosts(req,res){

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"user not authorized"
        })
    }

    const userId = decoded.id;

    const posts = await postsModel.find({
        user:userId

    })

    res.status(200).json({
        message:"all posts",
        posts
})
}

async function getUserPosts(req,res){

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }
    let decoded;

    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"user not authorized"
        })
    }

    const userId = decoded.id;
    const postId = req.params.postId;

    const post = await postsModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    let isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:"user not authorized to access this post"
        })
    }

    res.status(200).json({
        message:"post details",
        post
    })
}

module.exports = {
    createPost,
    getAllPosts,
    getUserPosts
}