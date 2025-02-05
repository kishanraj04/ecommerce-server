import { asyncHandler } from "../../middleware/asyncErrorHandler.js";
import bcrypt from 'bcrypt'

export const hashPassword = async(password)=>{

    const hash = await bcrypt.hash(password,10)
    return hash

}