import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import orderModel from '../model/order.model.js'
import userModel from "../model/userModel.js";
import { updateStock } from "../utils/updateStock/updateStock.js";

// creating order
export const orderTheProduct = asyncHandler(async (req,res)=>{
    const loginUser = req?.user
    console.log(loginUser);
    const data = {...(req?.body ),user:loginUser?._id}
    console.log("data ",data);
    const addedOrder = await orderModel.create(data)

    res.status(200).json({success:true , message:"product order successfull",addedOrder})
})


// get all order
export const getAllOrder = asyncHandler(async (req,res) => {
    const allOrder = await orderModel.find({})
    let totalprice = 0;
    allOrder.map(({totalPrice})=>{
        totalprice+=totalPrice
    })
    if(!allOrder){
        return res.status(204).json({success:true,message:"order not available"})
    }
    else{
        res.status(200).json({success:true,message:"order found","total-order":allOrder.length,allOrder:{totalprice,...allOrder}})
    }
})


// get single order
export const getSingleOrder = asyncHandler(async (req,res) => {
    const {id} = req?.params
    const singleOrder = await orderModel.findOne({_id:id}).populate('user',"name email")
   
    if(!singleOrder){
        return res.status(404).json({success:false , message:"order not found"})
    }else{
        return res.status(200).json({success:true , message:"order found",singleOrder})
    }
})


// get logged in user order
export const getLoggedInUser = asyncHandler(async (req,res) => {
    const myOrder = await orderModel.find({user:req?.user?._id}).populate('user','name email')
    if(!myOrder){
        return res.status(404).json({success:false , message:"order not found"})
    }else{
        return res.status(200).json({success:true , message:"order found",myOrder})
    }
})


// update shipping address
export const updateShippingAddress = asyncHandler(async (req,res) => {
    const order = await orderModel.findOne({_id:req?.params?.orderId})
    
    if(!order){
        return res.status(404).json({success:false,message:"order not found"})
    }

    if(order?.orderStatus=='Delivered')
    {
        return res.status(400).json("product is already delivered")
    }
   
    order.orderStatus = req?.body?.status

    if(req?.body?.status=='Delivered')
    {
        order.deliverAt = Date.now()
    }

    
    order.orderItems.map(async({product,qty})=>{
        await updateStock(product,qty)
    })

    await order.save({validateBeforesave:false})
    res.status(200).json({success:true})
})