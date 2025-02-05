import express from 'express'
import {  changeUserRole, getAllUsers, getMyProfile, getSingleUser, signUpUser, updateMyProfile, updatePassword } from '../controller/user.controller.js'
import { signInUser } from '../auth/loginUser.js'
import { directLogin } from '../auth/directLoin.js'
import { logoutUser } from '../auth/logoutUser.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { authorizedRoles } from '../middleware/authorizedRoles.js'

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

// get all user
userRouter.get('/all-user',isAuthenticated,authorizedRoles,getAllUsers)

// get single user
userRouter.get('/single/user/:id',isAuthenticated,authorizedRoles,getSingleUser)

// change role for user
userRouter.put('/change-user-role',isAuthenticated,authorizedRoles,changeUserRole)

export default userRouter