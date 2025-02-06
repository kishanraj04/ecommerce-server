import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  reviewer: { type: mongoose.Schema.ObjectId, ref: "usermodel" },
});

export const reviewModel = mongoose.model('reviewModel',reviewSchema)