import { asyncHandler } from "../middleware/asyncErrorHandler.js"
import userModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
import { generateAndSaveToken } from "../utils/tokens/generateAndSaveToken.js"
// login user
export const signInUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({success:false,message:"invalid credentials"})
    }
    const isCorrect = await bcrypt.compare(password,user.password)
    if(isCorrect){
      req.user = user
      return  generateAndSaveToken(user?._id,req,res)
    }
   
})