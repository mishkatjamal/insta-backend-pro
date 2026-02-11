const e = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: { 
        type: String,
        required: [true, 'Password is required'],
        unique: true,
    },
    bio:{
        type: String,
    },
    profileImage:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    }  
})

const User = mongoose.model('User', userSchema);

module.exports = User;