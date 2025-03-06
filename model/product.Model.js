import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  qty: {
    type: Number,
    default: 0,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  stock: { type: Number, required: true },
  tags: [{ type: String }],
  brand: { type: String },
  sku: { type: String },
  weight: { type: Number },
  dimensions: {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
  },
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String },
  reviews: [
    {
      rating: { type: Number, min: 0, max: 5 },
      comment: { type: String },
      date: { type: Date, default: Date.now },
      reviewerName: { type: String },
      reviewerEmail: { type: String },
    },
  ],
  returnPolicy: { type: String },
  minimumOrderQuantity: { type: Number },
  meta: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    barcode: { type: String },
    qrCode: { type: String },
  },
  images: [{ type: String }],
  thumbnail: { type: String },
});

// Export the model
export default mongoose.model("Product", productSchema);
