import { asyncHandler } from "../middleware/asyncErrorHandler.js"
import userModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
import { generateAndSaveToken } from "../utils/tokens/generateAndSaveToken.js"
// login user
export const signInUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    
    if(!user){
      return res.status(404).json({success:false,message:"user not found"})
    }
    const isCorrect = await bcrypt.compare(password,user.password)
    console.log(isCorrect,password);
    if(isCorrect){
      req.user = user
      return  generateAndSaveToken(user?._id,req,res)
    }
    else{
        return res.status(401).json({status:false,message:"invalid credentials"})
    }
})