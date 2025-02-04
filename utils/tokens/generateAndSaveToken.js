import { asyncHandler } from "../../middleware/asyncErrorHandler.js";
import jwt from 'jsonwebtoken'

export const generateAndSaveToken = asyncHandler(async(id,req,res)=>{
        const token = await jwt.sign({id},process.env.SECRet_KEY,{expiresIn:'1d'})
        res.cookie("token",token).status(200).json({success:true,message:"token saved"})
})