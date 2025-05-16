import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    landMark: {
      type: String,
    },
    alternatePhone: {
      type: Number,
    },
  },
  orderItems: [
    {
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      category:{
        type:String,
        required:true,
      },
      pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel",
    required: true,
  },
  paymentInfo: {
    paymentMethod:{
      type: String,
      required:true
    },
    paymentStatus:{
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
  },
  tax: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "processing",
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  date:{
    type:String,
    default:Date.now()
  }
});

export default mongoose.model("orderModel", orderSchema);
