const express = require('express');
const postsRouter = express.Router();
const postController = require('../controller/post.controller');

const multer = require('multer');

const upload = multer({storage: multer.memoryStorage()});

// post "api/posts/" - create a post

postsRouter.post('/', upload.single('image'), postController.createPost);

// get all posts "api/posts/" - get all posts

postsRouter.get("/", postController.getAllPosts);

// get all posts of a user "api/posts/user" - get all posts of a user which is belongs to the token
postsRouter.get("/details/:postId", postController.getUserPosts);

module.exports = postsRouter;
