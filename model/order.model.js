import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    alternatePhone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    landMark: {
      type: String,
    },
  },
  orderItems:[
    {
     name:{
        type:String,
        required:true
     },
     price:{
        type:Number,
        required:true
     },
     qty:{
        type:Number,
        required:true
     },
     product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true
     }
    }
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"usermodel",
    required:true
  },
  paymentInfo:{
    paymentId:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    }
  },
  paidAt:{
    type:Date,
    required:true
  },
  itemPrice:{
    type:Number,
    required:true,
    default:0
  },
  tax:{
    type:Number,
    required:true,
    default:0
  },
  shippingPrice:{
    type:Number,
    required:true,
    default:0
  },
  totalPrice:{
    type:Number,
    required:true,
    default:0
  },
  orderStatus:{
    type:String,
    required:true,
    default:"processing"
  },
  deliveredAt:{
    type:Date
  },
  createdAt:{
    type:Date,
    default:Date.now
  }

});

export default mongoose.model('orderModel',orderSchema)