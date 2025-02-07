import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import orderModel from '../model/order.model.js'
import userModel from "../model/userModel.js";

// creating order
export const orderTheProduct = asyncHandler(async (req,res)=>{
    const loginUser = req?.user
    console.log(loginUser);
    const data = {...(req?.body ),user:loginUser?._id}
    const addedOrder = await orderModel.create(data)

    res.status(200).json({success:true , message:"product order successfull",addedOrder})
})


// get all order
export const getAllOrder = asyncHandler(async (req,res) => {
    const allOrder = await orderModel.find({})
    if(!allOrder){
        return res.status(204).json({success:true,message:"order not available"})
    }
    else{
        res.status(200).json({success:true,message:"order found","total-order":allOrder.length,allOrder})
    }
})


// get single order
export const getSingleOrder = asyncHandler(async (req,res) => {
    const {id} = req?.params
    const singleOrder = await orderModel.findOne({_id:id}).populate('user',"name email")
    console.log("so ",singleOrder);
   
    if(!singleOrder){
        return res.status(404).json({success:false , message:"order not found"})
    }else{
        return res.status(200).json({success:true , message:"order found",singleOrder})
    }
})