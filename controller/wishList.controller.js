import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import { wishListModel } from "../model/wishlist.model.js";

// add to wishList
export const addToWishList = asyncHandler(async(req,res)=>{
    console.log("run A");
    const {_id} = req?.user
    const {pid,price} = req?.body
    console.log(_id,pid,price);
    const inserted_data = await wishListModel.create({userId:_id,productId:pid,price:price})
    
    res.status(200).json({success:true,inserted_data})

})

// get all wishList
export const getAllWishListData = asyncHandler(async(req,res)=>{
    console.log("run B");
    const {_id} = req?.user 
    const wishListData = await wishListModel.find({userId:_id})
    if(!wishListData){
        return res.status(404).json({success:false,message:"user not found"})
    }
    res.status(200).json({success:true,message:"data found",wishListData})
})

// remove wishList
export const deleteFromWishList = asyncHandler(async(req,res)=>{
    const {id} = req?.params 
    const deleteResp = await wishListModel.deleteOne({_id:id})
    
    if(!deleteResp){
    return  res.status(409).json({success:false,message:"product is not deleted"})
    }

    res.status(200).json({success:true,message:"product deleted",deleteResp})

})
