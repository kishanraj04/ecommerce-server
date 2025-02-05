import { directLogin } from "../auth/directLoin.js";
import userModel from "../model/userModel.js";
import { asyncHandler } from "./asyncErrorHandler.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncHandler(async(req,res,next)=>{
    
   
    const {token} = req.cookies
    const {id} = await jwt.verify(token,process.env.SECRET_KEY)
    const user = await userModel.findOne({_id:id})
    if(!token){
        res.status(401).json({success:false,message:"please login"})
    }
    else{
        req.user = user
        console.log("is authemm 0");
        next()
    }

})