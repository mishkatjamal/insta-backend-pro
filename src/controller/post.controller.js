const postsModel = require('../models/post.model');
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require('@imagekit/nodejs');

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function createPost(req, res) {
    console.log(req.body,req.file);
   
    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),"file"), //required
        fileName : req.file.originalname,   //required
})  

res.send(file);
}

module.exports = {
    createPost,
}