import express from 'express'
import {  getMyProfile, signUpUser, updateMyProfile, updatePassword } from '../controller/user.controller.js'
import { signInUser } from '../auth/loginUser.js'
import { directLogin } from '../auth/directLoin.js'
import { logoutUser } from '../auth/logoutUser.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'

const userRouter = express.Router()


// signup user
userRouter.post('/signUp',signUpUser)

// signIn user
userRouter.get('/signIn',signInUser)

// direct login
userRouter.get('/direct-login',directLogin)

// logout user
userRouter.post('/logout-user',logoutUser)

// get my profile
userRouter.get('/my-profile',isAuthenticated,getMyProfile)

// update password
userRouter.get('/update-password',isAuthenticated,updatePassword)

// update my-profile
userRouter.post('/update/profile',isAuthenticated,updateMyProfile)

export default userRouter