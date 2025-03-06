import { asyncHandler } from "../middleware/asyncErrorHandler.js";

export const logoutUser = asyncHandler(async(req,res)=>{
    
    res.clearCookie("token", {
        httpOnly: false,
        secure: true,
        sameSite: "None",
    });
    res.status(200).json({ success: true, message: "User logged out" });
    
    
})