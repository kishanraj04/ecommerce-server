import mongoose from "mongoose";
import multer from 'multer'
import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import productSchema from "../model/product.Model.js";
import reviewModel from "../model/review.Schema.js";
import cloudinary from "../utils/cloudinary/cloudinary.js";
import fs from 'fs'
// create a product
export const createProduct = asyncHandler(async (req, res) => {
  const product = await productSchema.insertMany(req.body);

  // if(!product){
  //     return res.status(422).json({sucess:false,message:"product creation failed"})
  // }

  // res.status(201).json({ success: true, message: "Product created successfully", product });
});

// get all product
export const getAllPoduct = asyncHandler(async (req, res) => {
  const product = await productSchema.find({});

  res.status(200).json({ sucess: true, message: "get all product", product });
});

// get single product
export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return next("Invalid object id");
  const product = await productSchema.findOne({ _id: id });
  console.log("id ", id);
  console.log(product);

  if (!product) {
    const error = new Error("Product nottt found");
    error.status = 404;
    return next(error);
  }

  return res
    .status(200)
    .json({ success: true, message: "Product found", product });

  // } catch (error) {
  //    return res.status(500).json({sucess:false,message:error.message})
  // }
});

// delete single product --admin
export const deletSingleProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productSchema.deleteOne({ _id: id });
    if (deleted.deletedCount == 0) {
      return res
        .status(404)
        .json({ sucess: false, message: "product not found" });
    }
    return res
      .status(200)
      .json({ sucess: true, message: "product deleted", deleted });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
});

// update product --admin
export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await productSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updated);
    res.status(200).json({ sucess: true, message: "update product", updated });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
});

// search a product
export const searchProduct = asyncHandler(async (req, res) => {
  const { name } = req.params;
  console.log(name);
  // MongoDB Full-Text Search
  const data = await productSchema.find({
    title: { $regex: name, $options: "i" },
  });

  if (!data.length) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res.status(200).json({
    success: true,
    message: "Searched products",
    data,
  });
});

// price filter
export const priceFilter = asyncHandler(async (req, res) => {
  const { gt, lt } = req.params;
  const data = await productSchema.find({
    price: { $gte: gt, $lte: lt },
  });

  res.status(200).json({
    sucess: true,
    message: "filtered data",
    data,
  });
});

// writin review
export const writeReview = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { rating, comment } = req?.body;
  const user = req?.user;

  const addedReview = await reviewModel.create({
    reviewOn: id,
    rating: rating,
    comment: comment,
    reviewer: user?._id,
  });

  res.status(200).json({ success: true, message: "reviewed", addedReview });
});

// get all review
export const getAllReview = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  const allRevie = await reviewModel.find({ reviewOn: id });

  res
    .status(200)
    .json({ success: true, message: "geted all review", allRevie });
});

// deleting review --admin
export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  const deletedReview = await reviewModel.deleteOne({ _id: id });
  if (deletedReview.deletedCount >= 1) {
    res
      .status(200)
      .json({ success: true, message: "review deleted", deletedReview });
  } else {
    res.status(404).json({ success: false, message: "review not found" });
  }
});

// get category
export const getCategoryProduct = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const data = await productSchema.find({ category: category });
  res.status(200).json({ success: true, data: data });
});

// pagination data
export const handlePagination = asyncHandler(async (req, res) => {
  const { no } = req?.params; // Get page number from params
  const page = parseInt(no) || 0; // Ensure 'no' is a number, default to 0

  const product = await productSchema
    .find({})
    .sort({ createdAt: -1 })
    .skip(page * 20)
    .limit(20);

  res.status(200).json({ success: true, data: product });
});

// filter
export const getFilteredProducts = async (req, res) => {
  try {
    const { categories,price} = req.params;
    const filterCat = JSON.parse(categories)
    const priceRange = JSON.price(price)

    let filter = {};

    if (filterCat.length > 0) {
      filter.category = { $in: filterCat };
    }
    console.log(filter);
    const products = await productSchema.find(filter);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get distince category
export const getDistinceCategory = asyncHandler(async(req,res)=>{
  const response = await productSchema.distinct("category")
  res.status(200).json({success:true,categories:response})
})

// show more product
export const showMoreProduct = asyncHandler(async (req, res) => {
  const { range } = req.params;
  const rangeNum = parseInt(range, 10);

  if (isNaN(rangeNum) || rangeNum <= 0) {
    return res.status(400).json({ message: "Invalid range value" });
  }

  const totalCount = await productSchema.countDocuments();
  

  const products = await productSchema.find().limit(50 * rangeNum);

  if((range*50)>totalCount){
    return res.status(200).json({success:false,message:"product over",products})
  }

  res.status(200).json({ products, totalCount });
});




// create new product
export const createNewProduct = asyncHandler(async (req, res) => {
  const { body, files } = req;

  console.log(files);
  // Thumbnail upload
  const thumbnailResult = await cloudinary.uploader.upload(
    files.thumbnail[0].path,
    { folder: 'products/thumbnail' }
  );
  

  const imageUrls = [];

  for (const img of files.images || []) {
    const result = await cloudinary.uploader.upload(img.path, {
      folder: 'products/images',
    });
    imageUrls.push(result.secure_url);
    
  }

  // Now you can use thumbnailResult.secure_url and imageUrls in your DB save
  const productData = {
    ...body,
    thumbnail: thumbnailResult.secure_url,
    images: imageUrls,
  };

  const createdProduct = await productSchema.create(productData)
  

  res.status(201).json({
    success: true,
    message: 'Product created and uploaded to Cloudinary',
    createProduct,
  });
});
