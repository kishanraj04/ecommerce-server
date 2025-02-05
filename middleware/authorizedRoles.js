import { asyncHandler } from "./asyncErrorHandler.js";

export const authorizedRoles = asyncHandler(async(req,res,next)=>{
    const user = req.user
    if(user.role=='admin')
    {
        console.log("is authoreix 1");
         next()
    }else{
        res.status(401).json({success:false,message:"not a valid tole for this account"})
    }
})