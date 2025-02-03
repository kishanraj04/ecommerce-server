import express from 'express'
import { signInUser, signUpUser } from '../controller/user.controller.js'

const userRouter = express.Router()


// signup user
userRouter.post('/signUp',signUpUser)

// signIn user
userRouter.get('/signIn',signInUser)


export default userRouter