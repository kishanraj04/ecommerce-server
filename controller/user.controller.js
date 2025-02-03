import { asyncHandler } from '../middleware/asyncErrorHandler.js'
import userModel from '../model/userModel.js'


// register user
export const signUpUser = asyncHandler((req,res)=>{
       res.end('up')
})


// login user
export const signInUser = asyncHandler( (req,res)=>{
    res.end('in')
})