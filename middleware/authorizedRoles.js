import { asyncHandler } from "./asyncErrorHandler.js";

export const authorizedRoles = asyncHandler(async(req,res,next)=>{
    const user = req.user
    if(!user?.role){
        res.status(401).json({success:false,message:"please login with admin email id"})
    }
    if(user.role=='admin')
    {
         next()
    }else{
        res.status(401).json({success:false,message:"not a valid tole for this account"})
    }
})