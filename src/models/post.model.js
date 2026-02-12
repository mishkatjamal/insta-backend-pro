const mongoose = require('mongoose');
const User = require('./user.model');


const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: '',
    },
    imgUrl:{
        type: String,
        required: [true, 'Image URL is required'],
    },
    user:{
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required'],
    }
})

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;