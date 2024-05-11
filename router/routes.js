const express = require('express');
const router = express.Router();
const userValidator = require('./../middleware/user.validator')

const userController = require('./../controller/user.controller')
router.post('/register', userValidator.validateRegister ,userController.registerUser)
router.post('/login',userValidator.validateLogin, userController.loginUser)

module.exports = router

