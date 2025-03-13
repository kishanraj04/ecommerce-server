import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import { wishListModel } from "../model/wishlist.model.js";

// add to wishList
export const addToWishList = asyncHandler(async(req,res)=>{
    const {_id} = req?.user
    const {pid,price} = req?.body
    const inserted_data = await wishListModel.create({userId:_id,productId:pid,price:price})
    
    res.json(inserted_data)

})