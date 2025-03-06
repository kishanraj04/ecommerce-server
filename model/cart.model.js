import mongoose from "mongoose";

const cartSchema =  mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
      required: true
  },
  cartItem: [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
        
    }
  ]
}, { timestamps: true });  

export const cartModel = mongoose.model("cartModel", cartSchema);
