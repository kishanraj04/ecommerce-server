import { asyncHandler } from "../middleware/asyncErrorHandler.js";

export const logoutUser = asyncHandler(async(req,res)=>{
    
    res.clearCookie('token')

    res.status(200).json({success:true,message:"user logout"})
    
})