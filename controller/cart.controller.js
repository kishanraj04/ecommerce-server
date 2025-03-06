import mongoose from "mongoose";
import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import { cartModel } from "../model/cart.model.js";
import productModel from "../model/product.Model.js";
import userModel from "../model/userModel.js";
import { isExist } from "../utils/chekEsistingData/isExist.js";

export const addToCart = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const productId = req?.body?.cartProductId;

  let cart = await cartModel.findOne({ userId: userId });
  if (cart) {
    cart.cartItem.push(productId);
    await cart.save();
  } else {
    cart = new cartModel({
      userId: userId,
      cartItem: [productId],
    });
    await cart.save();
  }

  const result = await productModel.findByIdAndUpdate({_id:productId},{$set:{qty:1}})

  console.log(result);
  res
    .status(200)
    .json({ success: true, message: "Product added to cart", cart });
});
