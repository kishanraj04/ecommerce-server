import mongoose from "mongoose";
import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import { cartModel } from "../model/cart.model.js";


export const addToCart = asyncHandler(async (req, res) => {
  
      const userId = req?.user?._id; // Extracting user ID from request
      const { productId,qty } = req.body; // Expecting an array of cart items
      console.log(userId , productId , qty);

      if (!userId) {
          return res.status(401).json({ success: false, message: "Unauthorized: User ID is required" });
      }
      
      const cartItem = await cartModel.findOne({userId:userId,productId:productId})
      if(cartItem){
        cartItem.qty+=1
        cartItem.save()
        return res.status(200).json({success:true,message:"product qty updated",cartItem})
      }
      const resp = await cartModel.create({userId:userId,productId:productId,qty})
      res.status(200).json({success:true,message:"product add in the cart",resp})

    }
);

// delete from cart
export const deleteCartItem = asyncHandler(async (req, res) => {
  const {id} = req?.params
  console.log("i ",id);
  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const updated = await cartModel.deleteOne({productId:id})

  console.log("Updated Document:", updated);
  res.status(200).json({success:true, message: "field removed", updated });
});



// get item from cart
export const getItemFromCart = asyncHandler(async (req, res) => {
  const uid = req?.params?.uid;
  console.log("uid ",uid);
  if (!uid) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const cartItem = await cartModel.find({ userId: uid });

  res.status(200).json({success:true, cartItem });
});


// increase item qty
export const increaseItemQtys = asyncHandler(async(req,res)=>{
    const {id} = req?.params
    
    const updatedCartProduct = await cartModel.updateOne(
      {productId : id }, 
      { $inc: { qty: 1 } },
      { new: true }
    );
    
    if(!updatedCartProduct){
      return res.status(404).json({success:false , message:"product is not found"})
    }
    res.status(200).json({success:true , message:"qty incresed",updatedCartProduct})

})


//  decrease item qty
export const decreaseItemQty = asyncHandler(async(req,res)=>{
  const {pid} = req?.params
  console.log(pid);
    const updatedCartProduct = await cartModel.updateOne(
      {productId : pid }, 
      { $inc: { qty: -1 } },
      { new: true }
    );
    
    if(!updatedCartProduct){
      return res.status(404).json({success:false , message:"product is not found"})
    }
    res.status(200).json({success:true , message:"qty incresed",updatedCartProduct})

})