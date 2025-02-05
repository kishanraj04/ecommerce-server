import { asyncHandler } from '../middleware/asyncErrorHandler.js'
import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import { generateAndSaveToken } from '../utils/tokens/generateAndSaveToken.js'
import { hashPassword } from '../utils/password/createHash.js'

// register user
export const signUpUser = asyncHandler(async(req,res)=>{
    
    const createdUser = await userModel.create(req?.body)
    res.status(200).json({
        sucess:true,
        message:"user created sucess",
        createdUser
    })
})


// get my profile
export const getMyProfile = asyncHandler(async(req,res)=>{
    const user = await req.user
    
    return res.status(200).json({success:true,message:"user found",user})
})


// update password
export const updatePassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword,confirmPassword} = req?.body
    console.log(oldPassword , newPassword , confirmPassword);
    if(newPassword!=confirmPassword)
    {
        return res.status(200).json({success:false , message:"invalid password"})
    }

    const {_id} = (req?.user)
    const user = await userModel.findOne({_id}).select("+password")
    
    
    const isCorrect = await bcrypt.compare(`${oldPassword}`,`${user.password}`)
    
    if(!isCorrect){
        return res.status(401).json({success:false , message:"invalid password"})
    }
    console.log(isCorrect);
   const hash = await hashPassword(newPassword)
   console.log(hash);
   const updateUser = await userModel.findByIdAndUpdate(_id,{$set:{password:hash}})

})

// update profile
export const updateMyProfile = asyncHandler(async(req,res)=>{
    
    const tempPass = (req?.user).password
    const {_id} = req?.user
    const updatedProfileData = req?.body

    const updatedUser = await userModel.findByIdAndUpdate(_id,{$set:{password:tempPass,...updatedProfileData }},{new:true})

    if(updatedUser){
        return res.status(200).json({success:true,message:"user updated successfully",updatedUser})
    }
    
})