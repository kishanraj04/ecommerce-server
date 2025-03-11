import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    qty: {
      type: Number,
      default: 1,
      required: true,
    },
    price:{
      type:Number,
      default:0,
      required:true
    }
  },
  { timestamps: true }
);

export const cartModel = mongoose.model("cartModel", cartSchema);
