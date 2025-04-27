import mongoose from "mongoose";

const address_schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: [Number,"please enter digit"],
    required: true,
  },
  pincode: {
    type:  [Number,"please enter digit"],
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
  landmark: {
    type: String,
    required: true,
  },
  alternatecontact: {
    type:  [Number,"please enter digit"],
    required: true,
  },
  addressType:{
    type:String,
    required:true
  }
});

export const addressmodel = mongoose.model("addressmodel", address_schema);
