import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import jwt from 'jsonwebtoken'
import userModel from "../model/userModel.js";
export const directLogin = asyncHandler(async(req,res)=>{
     const {token} = req.cookies
      console.log("token ",token);
     if(!token){
        return res.status(401).json({success:false,message:"unauthorized access , please login"})
     }
     
     const {id} = await jwt.verify(token,process.env.SECRET_KEY)
     const user = await userModel.findOne({_id:id})

     if(!user){
        return res.status(404).json({success:false,message:"user not found"})
     }
     else{
        return res.status(200).json({success:true,message:"user loged in success",user})
     }
})