const express = require('express');
const authRouter = express.Router();
const authRegister = require('../controller/auth.controller');


// * @route POST /api/auth/register
authRouter.post('/register', authRegister.registerUser);

//* post /api/auth/login
authRouter.post('/login', authRegister.loginUser);

module.exports = authRouter;