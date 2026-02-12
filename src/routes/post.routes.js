const express = require('express');
const postsRouter = express.Router();
const postController = require('../controller/post.controller');
const multer = require('multer');

const upload = multer({storage: multer.memoryStorage()});

// post "api/posts/" - create a post

postsRouter.post('/', upload.single('image'), postController.createPost);

module.exports = postsRouter;
