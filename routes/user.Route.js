import express from 'express'
import {  signUpUser } from '../controller/user.controller.js'
import { signInUser } from '../auth/loginUser.js'
import { directLogin } from '../auth/directLoin.js'
import { logoutUser } from '../auth/logoutUser.js'

const userRouter = express.Router()


// signup user
userRouter.post('/signUp',signUpUser)

// signIn user
userRouter.get('/signIn',signInUser)

// direct login
userRouter.get('/direct-login',directLogin)

// logout user
userRouter.post('/logout-user',logoutUser)

export default userRouter