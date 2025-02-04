import { asyncHandler } from '../middleware/asyncErrorHandler.js'
import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import { generateAndSaveToken } from '../utils/tokens/generateAndSaveToken.js'

// register user
export const signUpUser = asyncHandler(async(req,res)=>{
    
    const createdUser = await userModel.create(req?.body)
    res.status(200).json({
        sucess:true,
        message:"user created sucess",
        createdUser
    })
})


