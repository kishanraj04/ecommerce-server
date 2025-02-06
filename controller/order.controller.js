import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import orderModel from '../model/order.model.js'

export const orderTheProduct = asyncHandler(async (req,res)=>{
    const data = req?.body 
    const addedOrder = await orderModel.create(data)

    res.status(200).json({success:true , message:"product order successfull",addedOrder})
})