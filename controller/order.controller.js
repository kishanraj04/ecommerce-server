import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import orderModel from '../model/order.model.js'
import productModel from "../model/product.Model.js";
import userModel from "../model/userModel.js";
import { updateStock } from "../utils/updateStock/updateStock.js";

// creating order
export const orderTheProduct = asyncHandler(async (req,res)=>{
    const loginUser = req?.user
    console.log("l u " ,loginUser?._id);
    const data = req?.body
    const createdOrder = await orderModel.create({shippingInfo:data?.shippingInfo,orderItems:data?.orderItems,user:loginUser?._id,paymentInfo:{paymentMethod:"cash",paymentStatus:"pending"},totalPrice:data?.totalPrice})
    console.log(createdOrder);
    const productsWithStock = await Promise.all(
        createdOrder?.orderItems?.map(async ({ pid, qty }) => {
          const product = await productModel.findById(pid, { stock: 1 });
          if(product.stock>=qty){
            product.stock-=qty
            product.save();
          }
        })
      );
      
    res.status(200).json({success:true,createdOrder})
    
})


// get all order
export const getAllOrder = asyncHandler(async (req,res) => {
    const allOrder = await orderModel.find({})
    console.log(allOrder);
    res.status(200).json({success:true,allOrder})
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