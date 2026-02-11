const User = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
const { username, email, password,bio,profileImage } = req.body;


const isUserExistByEmailOrUsername = await User.findOne({$or: [{email}, {username}]});

if(isUserExistByEmailOrUsername){
   return res.status(409).json({message: 'Email or Username already exists'});
}


const hash = crypto.createHash('sha256').update(password).digest('hex');

const user = await User.create({
  username,
  email,
  password: hash,
  bio,
  profileImage});

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

  res.cookie('token', token)
  res.status(201).json({message: 'User registered successfully', 
    user:{
        
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage,
    }
  });
}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await User.findOne({$or: [
        {
            // condition 1: find user by email
            email
        }, 
        {
            // condition 2: find user by username
            username
        }
    ]

})

  if(!user){
    return res.status(404).json({message: 'User not found'});
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex');

  if(hash !== user.password){
    return res.status(401).json({message: 'Invalid credentials'});
  }

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

  res.cookie('token', token)
  res.status(200).json({message: 'Login successful', 
    user:{
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage,
    }
  });
}

module.exports = {
    registerUser,
    loginUser,
}