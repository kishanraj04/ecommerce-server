import express from 'express'
import {  changeUserRole, deleteUser, getAllUsers, getMyProfile, getSingleUser, getTodayRegisterUser, getUserThisWeek, signUpUser, updateMyProfile, updatePassword, updateUserData } from '../controller/user.controller.js'
import { signInUser } from '../auth/loginUser.js'
import { directLogin } from '../auth/directLoin.js'
import { logoutUser } from '../auth/logoutUser.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { authorizedRoles } from '../middleware/authorizedRoles.js'


const userRouter = express.Router()


// signup user
userRouter.post('/signUp',signUpUser)

// signIn user
userRouter.post('/signIn',signInUser)

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

// delete user --admin
userRouter.delete('/delete/user/:uid',isAuthenticated,authorizedRoles,deleteUser)

// update single user
userRouter.put('/user/update/single',isAuthenticated,authorizedRoles,updateUserData)

// register user in this week --admin
userRouter.get('/user/this-week',isAuthenticated,authorizedRoles,getUserThisWeek)

// today register user
userRouter.get('/user/register-today',isAuthenticated,authorizedRoles,getTodayRegisterUser)

export default userRouter