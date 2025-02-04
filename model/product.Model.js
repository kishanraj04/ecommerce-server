import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const dimensionsSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
});

const metaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: { type: String, required: true },
  qrCode: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  stock: { type: Number, required: true },
  tags: { type: [String], required: true },
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  weight: { type: Number, required: true },
  dimensions: { type: dimensionsSchema, required: true },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  reviews: { type: [reviewSchema], default: [] },
  returnPolicy: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  meta: { type: metaSchema, required: true },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true },
  // referensing user inside it
  createdBy:{
    type:mongoose.Schema.ObjectId,
    ref:"usermodel",
    required:true
  }
});

// Export the model
export default mongoose.model("Product", productSchema);
