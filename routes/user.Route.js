import express from 'express'
import {  signUpUser } from '../controller/user.controller.js'
import { signInUser } from '../auth/loginUser.js'
import { directLogin } from '../auth/directLoin.js'

const userRouter = express.Router()


// signup user
userRouter.post('/signUp',signUpUser)

// signIn user
userRouter.get('/signIn',signInUser)

// direct login
userRouter.get('/direct-login',directLogin)

export default userRouter